import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { z } from 'zod'
import {
  sendEmail,
  generateContactFormEmail,
  generateRentalAnalysisEmail,
  generateAutoReplyEmail,
} from '@/lib/email'

// Validation schemas
const contactFormSchema = z.object({
  formType: z.literal('contact'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  turnstileToken: z.string().optional(),
})

const rentalAnalysisFormSchema = z.object({
  formType: z.literal('rental-analysis'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  propertyAddress: z.string().min(5, 'Property address is required'),
  bedrooms: z.number().min(0).max(20),
  bathrooms: z.number().min(0).max(20),
  propertyType: z.enum(['single-family', 'townhouse', 'condo', 'multi-family', 'other']),
  currentStatus: z.enum(['vacant', 'owner-occupied', 'rented', 'other']),
  message: z.string().optional(),
  turnstileToken: z.string().optional(),
})

// Cloudflare Turnstile verification
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not configured, skipping verification')
    return true // Skip verification in development if not configured
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return false
  }
}

// Simple in-memory rate limiting (for production, use Redis or a dedicated solution)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, maxRequests: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip)
    }
  }
}, 60000) // Clean up every minute

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Rate limiting check
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate form type
    if (!body.formType || !['contact', 'rental-analysis'].includes(body.formType)) {
      return NextResponse.json(
        { error: 'Invalid form type' },
        { status: 400 }
      )
    }

    // Validate based on form type
    const schema = body.formType === 'contact' ? contactFormSchema : rentalAnalysisFormSchema
    const validationResult = schema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Verify Turnstile CAPTCHA if token provided
    if (data.turnstileToken) {
      const isValid = await verifyTurnstile(data.turnstileToken, ip)
      if (!isValid) {
        return NextResponse.json(
          { error: 'CAPTCHA verification failed. Please try again.' },
          { status: 400 }
        )
      }
    }

    // Get Payload instance
    const payload = await getPayload({ config })

    // Prepare submission data
    const submissionData: any = {
      formType: data.formType,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      status: 'new',
      submittedAt: new Date().toISOString(),
      metadata: {
        ipAddress: ip,
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    }

    // Add form-specific fields
    if (data.formType === 'contact') {
      submissionData.message = data.message
    } else if (data.formType === 'rental-analysis') {
      submissionData.message = data.message || null
      submissionData.propertyInfo = {
        address: data.propertyAddress,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        propertyType: data.propertyType,
        currentStatus: data.currentStatus,
      }
    }

    // Save to database
    const submission = await payload.create({
      collection: 'contact-submissions',
      data: submissionData,
    })

    // Send email notifications
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@allaypm.com'

    try {
      // Send notification to admin
      if (data.formType === 'contact') {
        await sendEmail({
          to: notificationEmail,
          subject: `New Contact Form Submission from ${data.name}`,
          html: generateContactFormEmail({
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            message: data.message,
            submittedAt: submissionData.submittedAt,
            ipAddress: ip,
          }),
        })
      } else {
        await sendEmail({
          to: notificationEmail,
          subject: `🏠 New Rental Analysis Request - ${data.propertyAddress}`,
          html: generateRentalAnalysisEmail({
            name: data.name,
            email: data.email,
            phone: data.phone,
            propertyAddress: data.propertyAddress,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            propertyType: data.propertyType,
            currentStatus: data.currentStatus,
            message: data.message || null,
            submittedAt: submissionData.submittedAt,
            ipAddress: ip,
          }),
        })
      }

      // Send auto-reply to user
      await sendEmail({
        to: data.email,
        subject: 'Thank you for contacting Allay Property Management',
        html: generateAutoReplyEmail(data.name, data.formType),
      })
    } catch (emailError) {
      console.error('Error sending email notifications:', emailError)
      // Don't fail the request if email fails
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us! We will get back to you within 24 hours.',
        submissionId: submission.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form submission error:', error)

    return NextResponse.json(
      {
        error: 'An error occurred while processing your request. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
