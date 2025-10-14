import nodemailer from 'nodemailer'

export interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

// Create reusable transporter
let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporter) {
    return transporter
  }

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  // If SMTP is not configured, log and return null
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.warn('SMTP not configured. Email notifications will not be sent.')
    return null
  }

  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort),
    secure: parseInt(smtpPort) === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  return transporter
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const transporter = getTransporter()

  if (!transporter) {
    console.warn('Email not sent - SMTP not configured')
    return false
  }

  try {
    const defaultFrom = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@example.com'

    const info = await transporter.sendMail({
      from: options.from || defaultFrom,
      to: options.to,
      subject: options.subject,
      html: options.html,
    })

    console.log('Email sent successfully:', info.messageId)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

// Email templates
export function generateContactFormEmail(data: {
  name: string
  email: string
  phone?: string | null
  message: string
  submittedAt: string
  ipAddress: string
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #2D3436; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1B3A6D; color: #fff; padding: 20px; text-align: center; }
        .content { background-color: #fff; padding: 30px; border: 1px solid #F5F7FA; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #1B3A6D; margin-bottom: 5px; }
        .value { color: #2D3436; }
        .footer { text-align: center; padding: 20px; color: #6C757D; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          ${data.phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #F5F7FA;">
          <div class="field">
            <div class="label">Submitted:</div>
            <div class="value">${new Date(data.submittedAt).toLocaleString('en-US', {
              dateStyle: 'long',
              timeStyle: 'short',
            })}</div>
          </div>
          <div class="field">
            <div class="label">IP Address:</div>
            <div class="value">${data.ipAddress}</div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from your Allay Property Management website contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function generateRentalAnalysisEmail(data: {
  name: string
  email: string
  phone: string
  propertyAddress: string
  bedrooms: number
  bathrooms: number
  propertyType: string
  currentStatus: string
  message?: string | null
  submittedAt: string
  ipAddress: string
}): string {
  const propertyTypeLabels: Record<string, string> = {
    'single-family': 'Single Family Home',
    'townhouse': 'Townhouse',
    'condo': 'Condominium',
    'multi-family': 'Multi-Family',
    'other': 'Other',
  }

  const statusLabels: Record<string, string> = {
    'vacant': 'Vacant',
    'owner-occupied': 'Owner Occupied',
    'rented': 'Currently Rented',
    'other': 'Other',
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #2D3436; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #C9A961; color: #1B3A6D; padding: 20px; text-align: center; }
        .content { background-color: #fff; padding: 30px; border: 1px solid #F5F7FA; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #1B3A6D; margin-bottom: 5px; }
        .value { color: #2D3436; }
        .property-details { background-color: #F5F7FA; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #6C757D; font-size: 12px; }
        .priority { background-color: #C9A961; color: #1B3A6D; padding: 10px; text-align: center; font-weight: 600; margin-bottom: 20px; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">🏠 New Rental Analysis Request</h1>
        </div>
        <div class="content">
          <div class="priority">⚡ HIGH PRIORITY LEAD ⚡</div>

          <h2 style="color: #1B3A6D; margin-top: 0;">Contact Information</h2>
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>

          <h2 style="color: #1B3A6D; margin-top: 30px;">Property Details</h2>
          <div class="property-details">
            <div class="field">
              <div class="label">Address:</div>
              <div class="value"><strong>${data.propertyAddress}</strong></div>
            </div>
            <div class="field">
              <div class="label">Bedrooms / Bathrooms:</div>
              <div class="value">${data.bedrooms} bed / ${data.bathrooms} bath</div>
            </div>
            <div class="field">
              <div class="label">Property Type:</div>
              <div class="value">${propertyTypeLabels[data.propertyType]}</div>
            </div>
            <div class="field" style="margin-bottom: 0;">
              <div class="label">Current Status:</div>
              <div class="value">${statusLabels[data.currentStatus]}</div>
            </div>
          </div>

          ${data.message ? `
          <h2 style="color: #1B3A6D; margin-top: 30px;">Additional Notes</h2>
          <div class="field">
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
          ` : ''}

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #F5F7FA;">
          <div class="field">
            <div class="label">Submitted:</div>
            <div class="value">${new Date(data.submittedAt).toLocaleString('en-US', {
              dateStyle: 'long',
              timeStyle: 'short',
            })}</div>
          </div>
          <div class="field">
            <div class="label">IP Address:</div>
            <div class="value">${data.ipAddress}</div>
          </div>
        </div>
        <div class="footer">
          <p>This is a rental analysis request from your Allay Property Management website.</p>
          <p><strong>Action Required:</strong> Please follow up within 24 hours.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function generateAutoReplyEmail(name: string, formType: 'contact' | 'rental-analysis'): string {
  const isRentalAnalysis = formType === 'rental-analysis'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #2D3436; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1B3A6D; color: #fff; padding: 30px; text-align: center; }
        .logo { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 700; margin: 0; }
        .tagline { font-size: 14px; color: #C9A961; margin-top: 5px; }
        .content { background-color: #fff; padding: 40px 30px; border: 1px solid #F5F7FA; }
        .button { display: inline-block; background-color: #C9A961; color: #1B3A6D; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-weight: 600; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #6C757D; font-size: 12px; }
        .contact-info { background-color: #F5F7FA; padding: 20px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">Allay Property Management</h1>
          <p class="tagline">Stress Less. Earn More.</p>
        </div>
        <div class="content">
          <h2 style="color: #1B3A6D; margin-top: 0;">Thank You, ${name}!</h2>
          <p>We've received your ${isRentalAnalysis ? 'rental analysis request' : 'message'} and truly appreciate you reaching out to Allay Property Management.</p>

          ${isRentalAnalysis ? `
          <p>Our team is already reviewing your property details and will prepare a comprehensive rental analysis for you. You can expect to hear from us within <strong>24 hours</strong> with:</p>
          <ul>
            <li>Estimated rental income based on current market data</li>
            <li>Comparable properties in your neighborhood</li>
            <li>Vacancy rate and demand analysis</li>
            <li>Recommendations to maximize your rental income</li>
          </ul>
          ` : `
          <p>Our team will review your message and get back to you within <strong>24 hours</strong>.</p>
          `}

          <div class="contact-info">
            <p style="margin-top: 0;"><strong>In the meantime, feel free to reach us directly:</strong></p>
            <p style="margin: 5px 0;">📞 <a href="tel:+14045550100" style="color: #5A9FD4; text-decoration: none;">(404) 555-0100</a></p>
            <p style="margin: 5px 0;">📧 <a href="mailto:info@allaypm.com" style="color: #5A9FD4; text-decoration: none;">info@allaypm.com</a></p>
            <p style="margin: 5px 0 0 0;">📍 123 Peachtree Street NE, Suite 500, Atlanta, GA 30303</p>
          </div>

          <p>Thank you for considering Allay Property Management for your property management needs!</p>

          <p style="margin-bottom: 0;">Best regards,<br>
          <strong>The Allay Property Management Team</strong></p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Allay Property Management. All rights reserved.</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
