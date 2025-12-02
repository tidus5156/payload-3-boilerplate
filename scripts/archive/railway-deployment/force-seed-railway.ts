#!/usr/bin/env tsx

/**
 * Force Seed Railway Database
 *
 * Skips existing content checks and seeds fresh data
 * Use when schema mismatches prevent normal seed script
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'

const forceSeed = async () => {
  const payload = await getPayload({ config })

  console.log('🌱 Force seeding Railway database...\n')

  // Import seed data
  const { settingsData } = await import('../src/seed/settings')
  const { teamMembersData } = await import('../src/seed/team')
  const { testimonialsData } = await import('../src/seed/testimonials')
  const { allNeighborhoodsData } = await import('../src/seed/neighborhoods')
  const { categoriesData } = await import('../src/seed/categories')
  const { homepageData } = await import('../src/seed/pages/homepage')
  const { headerData } = await import('../src/seed/header')

  // 1. Seed Settings Global
  console.log('📋 Seeding Settings...')
  try {
    await payload.updateGlobal({
      slug: 'settings',
      data: settingsData,
    })
    console.log('✅ Settings seeded\n')
  } catch (error: any) {
    console.error('❌ Error seeding settings:', error.message)
  }

  // 2. Seed Team Members
  console.log('👥 Seeding Team Members...')
  let teamCount = 0
  for (const member of teamMembersData) {
    try {
      await payload.create({
        collection: 'team-members',
        data: member as any,
      })
      console.log(`   ✓ ${member.name}`)
      teamCount++
    } catch (error: any) {
      console.log(`   ⚠ Skipped ${member.name}: ${error.message}`)
    }
  }
  console.log(`✅ ${teamCount} team members seeded\n`)

  // 3. Seed Testimonials
  console.log('⭐ Seeding Testimonials...')
  let testimonialCount = 0
  for (const testimonial of testimonialsData) {
    try {
      await payload.create({
        collection: 'testimonials',
        data: testimonial as any,
      })
      testimonialCount++
    } catch (error: any) {
      console.log(`   ⚠ Skipped testimonial: ${error.message}`)
    }
  }
  console.log(`✅ ${testimonialCount} testimonials seeded\n`)

  // 4. Seed Neighborhoods
  console.log('🏘️  Seeding Neighborhoods...')
  let neighborhoodCount = 0
  for (const neighborhood of allNeighborhoodsData) {
    try {
      await payload.create({
        collection: 'neighborhoods',
        data: neighborhood as any,
      })
      neighborhoodCount++
    } catch (error: any) {
      console.log(`   ⚠ Skipped ${neighborhood.name}: ${error.message}`)
    }
  }
  console.log(`✅ ${neighborhoodCount} neighborhoods seeded\n`)

  // 5. Seed Categories
  console.log('📁 Seeding Categories...')
  let categoryCount = 0
  for (const category of categoriesData) {
    try {
      await payload.create({
        collection: 'categories',
        data: category as any,
      })
      categoryCount++
    } catch (error: any) {
      console.log(`   ⚠ Skipped category: ${error.message}`)
    }
  }
  console.log(`✅ ${categoryCount} categories seeded\n`)

  // 6. Seed Homepage
  console.log('🏠 Seeding Homepage...')
  try {
    await payload.create({
      collection: 'pages',
      data: homepageData as any,
    })
    console.log('✅ Homepage seeded\n')
  } catch (error: any) {
    console.error(`❌ Error seeding homepage: ${error.message}\n`)
  }

  // 7. Seed Header Navigation
  console.log('🧭 Seeding Header Navigation...')
  try {
    await payload.updateGlobal({
      slug: 'header',
      data: headerData,
    })
    console.log('✅ Header navigation seeded\n')
  } catch (error: any) {
    console.error(`❌ Error seeding header: ${error.message}\n`)
  }

  console.log('🎉 Force seed completed!\n')
  console.log('📊 Summary:')
  console.log(`   - Team Members: ${teamCount}`)
  console.log(`   - Testimonials: ${testimonialCount}`)
  console.log(`   - Neighborhoods: ${neighborhoodCount}`)
  console.log(`   - Categories: ${categoryCount}`)
  console.log('\n✨ Railway database is ready!\n')

  process.exit(0)
}

forceSeed().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
