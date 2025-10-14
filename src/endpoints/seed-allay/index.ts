import type { Payload, PayloadRequest } from 'payload'
import { settingsData } from '@/seed/settings'
import { teamMembersData } from '@/seed/team'
import { testimonialsData } from '@/seed/testimonials'
import { allNeighborhoodsData } from '@/seed/neighborhoods'
import { categoriesData } from '@/seed/categories'
import { homepageData } from '@/seed/pages/homepage'

export const seedAllay = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  try {
    payload.logger.info('🌱 Starting Allay Property Management seed...')

    // Check if database is already seeded
    const existingPages = await payload.find({
      collection: 'pages',
      limit: 1,
    })

    if (existingPages.totalDocs > 0) {
      payload.logger.info('⚠️  Database appears to already be seeded.')
      payload.logger.info('   Allay seed will add content but not clear existing data.')
    }

    // 1. Seed Settings Global
    payload.logger.info('📋 Seeding Allay Settings...')
    await payload.updateGlobal({
      slug: 'settings',
      data: settingsData,
    })
    payload.logger.info('✅ Settings seeded')

    // 2. Seed Team Members
    payload.logger.info('👥 Seeding Team Members...')
    const teamMembers: any[] = []
    for (const member of teamMembersData) {
      try {
        const created = await payload.create({
          collection: 'team-members',
          data: member as any,
        })
        teamMembers.push(created)
        payload.logger.info(`   - Created: ${member.name}`)
      } catch (error) {
        payload.logger.error(`   ❌ Error creating ${member.name}:`, error)
      }
    }
    payload.logger.info(`✅ ${teamMembers.length} team members seeded`)

    // 3. Seed Testimonials
    payload.logger.info('⭐ Seeding Testimonials...')
    const testimonials: any[] = []
    for (const testimonial of testimonialsData) {
      try {
        const created = await payload.create({
          collection: 'testimonials',
          data: testimonial as any,
        })
        testimonials.push(created)
      } catch (error) {
        payload.logger.error(`   ❌ Error creating testimonial:`, error)
      }
    }
    payload.logger.info(`✅ ${testimonials.length} testimonials seeded`)

    // 4. Seed Neighborhoods
    payload.logger.info('🏘️  Seeding Neighborhoods...')
    const neighborhoods: any[] = []
    for (const neighborhood of allNeighborhoodsData) {
      try {
        const created = await payload.create({
          collection: 'neighborhoods',
          data: neighborhood as any,
        })
        neighborhoods.push(created)
        payload.logger.info(`   - Created: ${neighborhood.name}`)
      } catch (error) {
        payload.logger.error(`   ❌ Error creating ${neighborhood.name}:`, error)
      }
    }
    payload.logger.info(`✅ ${neighborhoods.length} neighborhoods seeded`)

    // 5. Seed Categories
    payload.logger.info('📁 Seeding Categories...')
    const categories: any[] = []
    for (const category of categoriesData) {
      try {
        const created = await payload.create({
          collection: 'categories',
          data: category as any,
        })
        categories.push(created)
      } catch (error) {
        payload.logger.error(`   ❌ Error creating category:`, error)
      }
    }
    payload.logger.info(`✅ ${categories.length} categories seeded`)

    // 6. Seed Homepage
    payload.logger.info('🏠 Seeding Allay Homepage...')
    try {
      const createdPage = await payload.create({
        collection: 'pages',
        data: homepageData as any,
      })
      payload.logger.info('✅ Allay Homepage seeded with ID:', createdPage.id)
    } catch (error: any) {
      payload.logger.error('❌ Error seeding homepage:')
      payload.logger.error('Error message:', error.message)
      payload.logger.error('Error stack:', error.stack)
      payload.logger.error('Full error:', JSON.stringify(error, null, 2))
      throw error
    }

    payload.logger.info('🎉 Allay Property Management seed completed!')
    payload.logger.info('📊 Summary:')
    payload.logger.info(`   - Settings: ✅`)
    payload.logger.info(`   - Team Members: ${teamMembers.length}`)
    payload.logger.info(`   - Testimonials: ${testimonials.length}`)
    payload.logger.info(`   - Neighborhoods: ${neighborhoods.length}`)
    payload.logger.info(`   - Categories: ${categories.length}`)
    payload.logger.info(`   - Pages: 1 (Homepage)`)
    payload.logger.info('✨ Your Allay Property Management site is ready for production!')
  } catch (error) {
    payload.logger.error('❌ Error during Allay seed:', error)
    throw error
  }
}
