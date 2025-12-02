import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

// Load environment variables FIRST using dotenv
dotenvConfig({ path: resolve(process.cwd(), '.env') })

// Verify critical env vars are loaded
if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET is not set in environment variables')
}
if (!process.env.DATABASE_URI) {
  throw new Error('DATABASE_URI is not set in environment variables')
}

import { getPayload } from 'payload'
import { settingsData } from './settings'
import { teamMembersData } from './team'
import { testimonialsData } from './testimonials'
import { allNeighborhoodsData } from './neighborhoods'
import { categoriesData } from './categories'
import { homepageData } from './pages/homepage'
import { headerData } from './header'
import { footerData } from './footer'
import { servicesData } from './services'

const productionSeed = async () => {
  try {
    // Dynamically import config after env vars are loaded
    const { default: config } = await import('@payload-config')
    const payload = await getPayload({ config })

    console.log('🌱 Starting production database seed...\n')

    // Check if database is already seeded
    const existingPages = await payload.find({
      collection: 'pages',
      limit: 1,
    })

    if (existingPages.totalDocs > 0) {
      console.log('⚠️  Database appears to already be seeded.')
      console.log('   To prevent duplicates, production seed will not run.')
      console.log('   Use npm run seed:reset if you need to reseed the database.\n')
      process.exit(0)
    }

    // Check for team members
    const existingTeam = await payload.find({
      collection: 'team-members',
      limit: 1,
    })

    if (existingTeam.totalDocs > 0) {
      console.log('⚠️  Team members already exist. Skipping production seed.\n')
      process.exit(0)
    }

    console.log('✅ Database appears empty. Proceeding with seed...\n')

    // 1. Seed Settings Global
    console.log('📋 Seeding Settings...')
    try {
      await payload.updateGlobal({
        slug: 'settings',
        data: settingsData,
      })
      console.log('✅ Settings seeded\n')
    } catch (error) {
      console.error('❌ Error seeding settings:', error)
    }

    // 2. Seed Team Members
    console.log('👥 Seeding Team Members...')
    const teamMembers: any[] = []
    for (const member of teamMembersData) {
      try {
        const created = await payload.create({
          collection: 'team-members',
          data: member as any,
        })
        teamMembers.push(created)
        console.log(`   - Created: ${member.name}`)
      } catch (error) {
        console.error(`   ❌ Error creating ${member.name}:`, error)
      }
    }
    console.log(`✅ ${teamMembers.length} team members seeded\n`)

    // 3. Seed Testimonials
    console.log('⭐ Seeding Testimonials...')
    const testimonials: any[] = []
    for (const testimonial of testimonialsData) {
      try {
        const created = await payload.create({
          collection: 'testimonials',
          data: testimonial as any,
        })
        testimonials.push(created)
      } catch (error) {
        console.error(`   ❌ Error creating testimonial:`, error)
      }
    }
    console.log(`✅ ${testimonials.length} testimonials seeded\n`)

    // 4. Seed Neighborhoods
    console.log('🏘️  Seeding Neighborhoods...')
    const neighborhoods: any[] = []
    for (const neighborhood of allNeighborhoodsData) {
      try {
        const created = await payload.create({
          collection: 'neighborhoods',
          data: neighborhood as any,
        })
        neighborhoods.push(created)
        console.log(`   - Created: ${neighborhood.name}`)
      } catch (error) {
        console.error(`   ❌ Error creating ${neighborhood.name}:`, error)
      }
    }
    console.log(`✅ ${neighborhoods.length} neighborhoods seeded\n`)

    // 5. Seed Categories
    console.log('📁 Seeding Categories...')
    const categories: any[] = []
    for (const category of categoriesData) {
      try {
        const created = await payload.create({
          collection: 'categories',
          data: category as any,
        })
        categories.push(created)
      } catch (error) {
        console.error(`   ❌ Error creating category:`, error)
      }
    }
    console.log(`✅ ${categories.length} categories seeded\n`)

    // 6. Seed Services
    console.log('🛠️  Seeding Services...')
    const services: any[] = []
    for (const service of servicesData) {
      try {
        const created = await payload.create({
          collection: 'services',
          data: service as any,
        })
        services.push(created)
        console.log(`   - Created: ${service.name}`)
      } catch (error) {
        console.error(`   ❌ Error creating ${service.name}:`, error)
      }
    }
    console.log(`✅ ${services.length} services seeded\n`)

    // 7. Seed Homepage
    console.log('🏠 Seeding Homepage...')
    let homepageDoc: any
    try {
      homepageDoc = await payload.create({
        collection: 'pages',
        data: homepageData as any,
      })
      console.log('✅ Homepage seeded\n')
    } catch (error) {
      console.error('❌ Error seeding homepage:', error)
    }

    // 7. Seed Header Navigation
    console.log('🧭 Seeding Header Navigation...')
    try {
      await payload.updateGlobal({
        slug: 'header',
        data: headerData as any,
      })
      console.log('✅ Header navigation seeded\n')
    } catch (error) {
      console.error('❌ Error seeding header navigation:', error)
    }

    // 8. Seed Footer
    console.log('🦶 Seeding Footer...')
    try {
      await payload.updateGlobal({
        slug: 'footer',
        data: footerData as any,
      })
      console.log('✅ Footer seeded\n')
    } catch (error) {
      console.error('❌ Error seeding footer:', error)
    }

    console.log('🎉 Production database seed completed successfully!\n')
    console.log('📊 Summary:')
    console.log(`   - Settings: ✅`)
    console.log(`   - Team Members: ${teamMembers.length}`)
    console.log(`   - Testimonials: ${testimonials.length}`)
    console.log(`   - Neighborhoods: ${neighborhoods.length}`)
    console.log(`   - Categories: ${categories.length}`)
    console.log(`   - Services: ${services.length}`)
    console.log(`   - Pages: 1 (Homepage)`)
    console.log(`   - Header Navigation: ✅`)
    console.log(`   - Footer: ✅`)
    console.log('\n✨ Your Allay Property Management site is ready for production!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Fatal error during production seed:', error)
    process.exit(1)
  }
}

productionSeed()
