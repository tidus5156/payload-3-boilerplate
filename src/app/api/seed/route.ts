import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: Request) {
  try {
    // Simple protection - check for a secret token in the query params
    const url = new URL(request.url)
    const token = url.searchParams.get('token')

    // Get the secret from environment (use PAYLOAD_SECRET as the seed token)
    if (!token || token !== process.env.PAYLOAD_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }

    const payload = await getPayload({ config })

    // Check if data already exists
    const existingSettings = await payload.findGlobal({
      slug: 'settings',
    })

    if (existingSettings?.siteName) {
      return NextResponse.json({
        message: 'Database already seeded. Settings global already exists.',
        data: { siteName: existingSettings.siteName },
      })
    }

    // Import and run seed data
    const { seedSettings } = await import('@/seed/settings')
    const { seedTeamMembers } = await import('@/seed/team')
    const { seedTestimonials } = await import('@/seed/testimonials')
    const { seedNeighborhoods } = await import('@/seed/neighborhoods')
    const { seedFAQs } = await import('@/seed/faqs')
    const { seedHomepage } = await import('@/seed/pages/homepage')
    const { seedHeader } = await import('@/seed/header')

    // Seed in order
    console.log('🌱 Seeding Settings...')
    await seedSettings(payload)

    console.log('🌱 Seeding Team Members...')
    await seedTeamMembers(payload)

    console.log('🌱 Seeding Testimonials...')
    await seedTestimonials(payload)

    console.log('🌱 Seeding Neighborhoods...')
    await seedNeighborhoods(payload)

    console.log('🌱 Seeding FAQs...')
    await seedFAQs(payload)

    console.log('🌱 Seeding Homepage...')
    await seedHomepage(payload)

    console.log('🌱 Seeding Header...')
    await seedHeader(payload)

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with Allay Property Management content!',
      seeded: [
        'Settings Global',
        'Team Members',
        'Testimonials',
        'Neighborhoods',
        'FAQs',
        'Homepage',
        'Header Navigation',
      ],
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      {
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
