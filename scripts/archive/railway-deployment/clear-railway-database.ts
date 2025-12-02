#!/usr/bin/env tsx

/**
 * Clear Railway Database
 *
 * Removes all content to prepare for fresh seed
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'

const COLLECTIONS_TO_CLEAR = [
  'pages',
  'posts',
  'media',
  'categories',
  'team-members',
  'testimonials',
  'neighborhoods',
  'faqs',
  'services',
  'properties',
  'form-submissions',
  'users',
]

const clearDatabase = async () => {
  const payload = await getPayload({ config })

  console.log('🗑️  Clearing Railway database...\n')

  for (const collection of COLLECTIONS_TO_CLEAR) {
    try {
      const docs = await payload.find({
        collection: collection as any,
        limit: 1000,
        pagination: false,
      })

      if (docs.totalDocs === 0) {
        console.log(`  ⏭  ${collection}: No documents to delete`)
        continue
      }

      console.log(`  🗑️  Deleting ${docs.totalDocs} ${collection}...`)

      for (const doc of docs.docs) {
        await payload.delete({
          collection: collection as any,
          id: doc.id,
        })
      }

      console.log(`  ✓ Cleared ${collection}`)
    } catch (error: any) {
      console.log(`  ⚠ Skipped ${collection}: ${error.message}`)
    }
  }

  console.log('\n✅ Database cleared!\n')
  console.log('💡 Next step: Run production seed script\n')

  process.exit(0)
}

clearDatabase()
