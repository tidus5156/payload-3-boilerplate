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

    // Import seed data
    const { settingsData } = await import('@/seed/settings')
    const { teamMembersData } = await import('@/seed/team')
    const { testimonialsData } = await import('@/seed/testimonials')
    const { allNeighborhoodsData } = await import('@/seed/neighborhoods')
    const { faqsData } = await import('@/seed/faqs')
    const { homepageData } = await import('@/seed/pages/homepage')
    const { headerData } = await import('@/seed/header')

    const results = {
      settings: false,
      teamMembers: 0,
      testimonials: 0,
      neighborhoods: 0,
      faqs: 0,
      homepage: false,
      header: false,
    }

    // 1. Seed Settings
    try {
      await payload.updateGlobal({
        slug: 'settings',
        data: settingsData,
      })
      results.settings = true
    } catch (error) {
      console.error('Error seeding settings:', error)
    }

    // 2. Seed Team Members
    for (const member of teamMembersData) {
      try {
        await payload.create({
          collection: 'team-members',
          data: member as any,
        })
        results.teamMembers++
      } catch (error) {
        console.error('Error creating team member:', error)
      }
    }

    // 3. Seed Testimonials
    for (const testimonial of testimonialsData) {
      try {
        await payload.create({
          collection: 'testimonials',
          data: testimonial as any,
        })
        results.testimonials++
      } catch (error) {
        console.error('Error creating testimonial:', error)
      }
    }

    // 4. Seed Neighborhoods
    for (const neighborhood of allNeighborhoodsData) {
      try {
        await payload.create({
          collection: 'neighborhoods',
          data: neighborhood as any,
        })
        results.neighborhoods++
      } catch (error) {
        console.error('Error creating neighborhood:', error)
      }
    }

    // 5. Seed FAQs
    for (const faq of faqsData) {
      try {
        await payload.create({
          collection: 'faqs',
          data: faq as any,
        })
        results.faqs++
      } catch (error) {
        console.error('Error creating FAQ:', error)
      }
    }

    // 6. Seed Homepage
    try {
      await payload.create({
        collection: 'pages',
        data: homepageData as any,
      })
      results.homepage = true
    } catch (error) {
      console.error('Error seeding homepage:', error)
    }

    // 7. Seed Header
    try {
      await payload.updateGlobal({
        slug: 'header',
        data: headerData as any,
      })
      results.header = true
    } catch (error) {
      console.error('Error seeding header:', error)
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with Allay Property Management content!',
      results: {
        settings: results.settings ? '✅' : '❌',
        teamMembers: `${results.teamMembers} created`,
        testimonials: `${results.testimonials} created`,
        neighborhoods: `${results.neighborhoods} created`,
        faqs: `${results.faqs} created`,
        homepage: results.homepage ? '✅' : '❌',
        header: results.header ? '✅' : '❌',
      },
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
