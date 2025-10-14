import { getPayload } from 'payload'
import config from '@payload-config'
import { settingsData } from './settings'
import { teamMembersData } from './team'
import { testimonialsData } from './testimonials'
import { allNeighborhoodsData } from './neighborhoods'
import { categoriesData } from './categories'
import { homepageData } from './pages/homepage'

const seed = async () => {
  try {
    const payload = await getPayload({ config })

    console.log('🌱 Starting database seed...\n')

    // 1. Seed Settings Global
    console.log('📋 Seeding Settings...')
    await payload.updateGlobal({
      slug: 'settings',
      data: settingsData,
    })
    console.log('✅ Settings seeded\n')

    // 2. Seed Team Members
    console.log('👥 Seeding Team Members...')
    const teamMembers = []
    for (const member of teamMembersData) {
      const created = await payload.create({
        collection: 'team-members',
        data: member,
      })
      teamMembers.push(created)
      console.log(`   - Created: ${member.name}`)
    }
    console.log(`✅ ${teamMembers.length} team members seeded\n`)

    // 3. Seed Testimonials
    console.log('⭐ Seeding Testimonials...')
    const testimonials = []
    for (const testimonial of testimonialsData) {
      const created = await payload.create({
        collection: 'testimonials',
        data: testimonial,
      })
      testimonials.push(created)
    }
    console.log(`✅ ${testimonials.length} testimonials seeded\n`)

    // 4. Seed Neighborhoods
    console.log('🏘️  Seeding Neighborhoods...')
    const neighborhoods = []
    for (const neighborhood of allNeighborhoodsData) {
      const created = await payload.create({
        collection: 'neighborhoods',
        data: neighborhood,
      })
      neighborhoods.push(created)
      console.log(`   - Created: ${neighborhood.name}`)
    }
    console.log(`✅ ${neighborhoods.length} neighborhoods seeded\n`)

    // 5. Seed Categories
    console.log('📁 Seeding Categories...')
    const categories = []
    for (const category of categoriesData) {
      const created = await payload.create({
        collection: 'categories',
        data: category,
      })
      categories.push(created)
    }
    console.log(`✅ ${categories.length} categories seeded\n`)

    // 6. Seed Homepage
    console.log('🏠 Seeding Homepage...')
    await payload.create({
      collection: 'pages',
      data: homepageData,
    })
    console.log('✅ Homepage seeded\n')

    // 7. Seed Sample Blog Posts
    console.log('📝 Seeding Sample Blog Posts...')
    const samplePosts = [
      {
        title: 'Metro Atlanta Rental Market Update - Q1 2024',
        slug: 'metro-atlanta-rental-market-update-q1-2024',
        category: categories[0].id, // Market Updates
        excerpt: 'A comprehensive look at rental trends, pricing, and vacancy rates across Metro Atlanta neighborhoods.',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  { type: 'text', text: 'The Metro Atlanta rental market continues to show strong fundamentals in early 2024...' },
                ],
              },
            ],
          },
        },
        author: teamMembers[0].id,
        publishedDate: new Date().toISOString(),
        readTime: 5,
        status: 'published',
      },
      {
        title: '10 Essential Tips for First-Time Landlords',
        slug: '10-essential-tips-first-time-landlords',
        category: categories[1].id, // Owner Tips
        excerpt: 'Everything you need to know before renting out your first property, from screening tenants to handling maintenance.',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  { type: 'text', text: 'Becoming a landlord for the first time can be both exciting and overwhelming...' },
                ],
              },
            ],
          },
        },
        author: teamMembers[1].id,
        publishedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        readTime: 8,
        status: 'published',
      },
    ]

    for (const post of samplePosts) {
      await payload.create({
        collection: 'posts',
        data: post,
      })
      console.log(`   - Created: ${post.title}`)
    }
    console.log(`✅ ${samplePosts.length} blog posts seeded\n`)

    console.log('🎉 Database seed completed successfully!\n')
    console.log('📊 Summary:')
    console.log(`   - Settings: ✅`)
    console.log(`   - Team Members: ${teamMembers.length}`)
    console.log(`   - Testimonials: ${testimonials.length}`)
    console.log(`   - Neighborhoods: ${neighborhoods.length}`)
    console.log(`   - Categories: ${categories.length}`)
    console.log(`   - Pages: 1 (Homepage)`)
    console.log(`   - Blog Posts: ${samplePosts.length}`)
    console.log('\n✨ Your Allay Property Management site is ready!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seed()
