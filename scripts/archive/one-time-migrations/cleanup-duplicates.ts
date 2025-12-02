#!/usr/bin/env tsx

/**
 * Cleanup Duplicate Content in Local Database
 *
 * This script removes duplicate entries from collections that were seeded multiple times,
 * while preserving one unique entry of each item.
 *
 * Usage:
 *   DATABASE_URI="postgresql://user:password@localhost:5432/allay_pm" pnpm tsx scripts/cleanup-duplicates.ts
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'

const cleanupDuplicates = async () => {
  const payload = await getPayload({ config })

  console.log('🧹 Cleaning up duplicate content in local database...\n')
  console.log('=' .repeat(60))

  let totalRemoved = 0

  // TEAM MEMBERS - Keep unique by name
  try {
    console.log('\n👥 Cleaning Team Members...')
    const team = await payload.find({
      collection: 'team-members',
      limit: 1000,
      pagination: false,
    })

    const seenNames = new Set<string>()
    const toDelete: string[] = []

    team.docs.forEach((member: any) => {
      if (seenNames.has(member.name)) {
        toDelete.push(member.id)
      } else {
        seenNames.add(member.name)
      }
    })

    for (const id of toDelete) {
      await payload.delete({
        collection: 'team-members',
        id,
      })
    }

    console.log(`   ✓ Removed ${toDelete.length} duplicate team members`)
    console.log(`   ℹ️  Kept ${seenNames.size} unique team members`)
    totalRemoved += toDelete.length
  } catch (error: any) {
    console.log(`   ⚠️  Skipped team-members: ${error.message}`)
  }

  // TESTIMONIALS - Keep unique by clientName
  try {
    console.log('\n⭐ Cleaning Testimonials...')
    const testimonials = await payload.find({
      collection: 'testimonials',
      limit: 1000,
      pagination: false,
    })

    const seenClients = new Set<string>()
    const toDelete: string[] = []

    testimonials.docs.forEach((t: any) => {
      if (seenClients.has(t.clientName)) {
        toDelete.push(t.id)
      } else {
        seenClients.add(t.clientName)
      }
    })

    for (const id of toDelete) {
      await payload.delete({
        collection: 'testimonials',
        id,
      })
    }

    console.log(`   ✓ Removed ${toDelete.length} duplicate testimonials`)
    console.log(`   ℹ️  Kept ${seenClients.size} unique testimonials`)
    totalRemoved += toDelete.length
  } catch (error: any) {
    console.log(`   ⚠️  Skipped testimonials: ${error.message}`)
  }

  // NEIGHBORHOODS - Keep unique by name
  try {
    console.log('\n🏘️  Cleaning Neighborhoods...')
    const neighborhoods = await payload.find({
      collection: 'neighborhoods',
      limit: 1000,
      pagination: false,
    })

    const seenNeighborhoods = new Set<string>()
    const toDelete: string[] = []

    neighborhoods.docs.forEach((n: any) => {
      if (seenNeighborhoods.has(n.name)) {
        toDelete.push(n.id)
      } else {
        seenNeighborhoods.add(n.name)
      }
    })

    for (const id of toDelete) {
      await payload.delete({
        collection: 'neighborhoods',
        id,
      })
    }

    console.log(`   ✓ Removed ${toDelete.length} duplicate neighborhoods`)
    console.log(`   ℹ️  Kept ${seenNeighborhoods.size} unique neighborhoods`)
    totalRemoved += toDelete.length
  } catch (error: any) {
    console.log(`   ⚠️  Skipped neighborhoods: ${error.message}`)
  }

  // CATEGORIES - Keep unique by title
  try {
    console.log('\n📁 Cleaning Categories...')
    const categories = await payload.find({
      collection: 'categories',
      limit: 1000,
      pagination: false,
    })

    const seenCategories = new Set<string>()
    const toDelete: string[] = []

    categories.docs.forEach((cat: any) => {
      if (seenCategories.has(cat.title)) {
        toDelete.push(cat.id)
      } else {
        seenCategories.add(cat.title)
      }
    })

    for (const id of toDelete) {
      await payload.delete({
        collection: 'categories',
        id,
      })
    }

    console.log(`   ✓ Removed ${toDelete.length} duplicate categories`)
    console.log(`   ℹ️  Kept ${seenCategories.size} unique categories`)
    totalRemoved += toDelete.length
  } catch (error: any) {
    console.log(`   ⚠️  Skipped categories: ${error.message}`)
  }

  // FAQS - Keep unique by question
  try {
    console.log('\n❓ Cleaning FAQs...')
    const faqs = await payload.find({
      collection: 'faqs',
      limit: 1000,
      pagination: false,
    })

    const seenQuestions = new Set<string>()
    const toDelete: string[] = []

    faqs.docs.forEach((faq: any) => {
      if (seenQuestions.has(faq.question)) {
        toDelete.push(faq.id)
      } else {
        seenQuestions.add(faq.question)
      }
    })

    for (const id of toDelete) {
      await payload.delete({
        collection: 'faqs',
        id,
      })
    }

    console.log(`   ✓ Removed ${toDelete.length} duplicate FAQs`)
    console.log(`   ℹ️  Kept ${seenQuestions.size} unique FAQs`)
    totalRemoved += toDelete.length
  } catch (error: any) {
    console.log(`   ⚠️  Skipped faqs: ${error.message}`)
  }

  console.log('\n' + '='.repeat(60))
  console.log(`\n✅ Cleanup complete! Removed ${totalRemoved} duplicate entries.\n`)

  // Run final audit
  console.log('📊 Final Content Count:\n')

  const pages = await payload.find({ collection: 'pages', limit: 1000 })
  console.log(`   📄 Pages: ${pages.totalDocs}`)

  const posts = await payload.find({ collection: 'posts', limit: 1000 })
  console.log(`   📝 Posts: ${posts.totalDocs}`)

  const teamFinal = await payload.find({ collection: 'team-members', limit: 1000 })
  console.log(`   👥 Team Members: ${teamFinal.totalDocs}`)

  const testimonialsFinal = await payload.find({ collection: 'testimonials', limit: 1000 })
  console.log(`   ⭐ Testimonials: ${testimonialsFinal.totalDocs}`)

  const neighborhoodsFinal = await payload.find({ collection: 'neighborhoods', limit: 1000 })
  console.log(`   🏘️  Neighborhoods: ${neighborhoodsFinal.totalDocs}`)

  const categoriesFinal = await payload.find({ collection: 'categories', limit: 1000 })
  console.log(`   📁 Categories: ${categoriesFinal.totalDocs}`)

  const faqsFinal = await payload.find({ collection: 'faqs', limit: 1000 })
  console.log(`   ❓ FAQs: ${faqsFinal.totalDocs}`)

  const media = await payload.find({ collection: 'media', limit: 1000 })
  console.log(`   🖼️  Media: ${media.totalDocs}`)

  console.log('\n✨ Database is now clean and ready for migration!\n')

  process.exit(0)
}

cleanupDuplicates()
