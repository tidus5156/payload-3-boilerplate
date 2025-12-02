#!/usr/bin/env tsx

/**
 * Migrate Content from Local DB to Railway DB
 *
 * Usage:
 *   RAILWAY_DATABASE_URI="your-railway-connection-string" pnpm tsx scripts/migrate-to-railway.ts
 *
 * Optional: Set LOCAL_DATABASE_URI if different from default
 *   LOCAL_DATABASE_URI="your-local-db" RAILWAY_DATABASE_URI="your-railway-db" pnpm tsx scripts/migrate-to-railway.ts
 *
 * This script:
 * 1. Exports all content from local database
 * 2. Imports it to Railway database
 * 3. Preserves IDs and relationships
 */

import { getPayload } from 'payload'
import configPromise from '../src/payload.config.js'

// Get database URIs from environment variables
const LOCAL_DB = process.env.LOCAL_DATABASE_URI || 'postgresql://user:password@localhost:5432/allay_pm'
const RAILWAY_DB = process.env.RAILWAY_DATABASE_URI

if (!RAILWAY_DB) {
  console.error('❌ Error: RAILWAY_DATABASE_URI environment variable is required')
  console.error('   Set it before running: RAILWAY_DATABASE_URI="your-railway-connection-string" pnpm tsx scripts/migrate-to-railway.ts')
  process.exit(1)
}

// Collections to migrate (in order to preserve relationships)
const COLLECTIONS_TO_MIGRATE = [
  'users',
  'media',
  'categories',
  'team-members',
  'testimonials',
  'neighborhoods',
  'faqs',
  'services',
  'pages',
  'posts',
  'properties',
  'form-submissions',
]

async function exportFromLocal() {
  console.log('📤 Exporting from local database...')

  // Override DATABASE_URI temporarily
  process.env.DATABASE_URI = LOCAL_DB
  const config = await configPromise
  const payload = await getPayload({ config })

  const data: Record<string, any[]> = {}

  for (const collection of COLLECTIONS_TO_MIGRATE) {
    try {
      const result = await payload.find({
        collection: collection as any,
        limit: 1000,
        pagination: false,
      })
      data[collection] = result.docs
      console.log(`  ✓ Exported ${result.docs.length} ${collection}`)
    } catch (error) {
      console.log(`  ⚠ Skipped ${collection} (doesn't exist or error)`)
    }
  }

  return data
}

async function importToRailway(data: Record<string, any[]>) {
  console.log('\n📥 Importing to Railway database...')

  // Override DATABASE_URI for Railway
  process.env.DATABASE_URI = RAILWAY_DB

  // Need to get a fresh config with new DATABASE_URI
  const { default: freshConfig } = await import('../src/payload.config.js?t=' + Date.now())
  const payload = await getPayload({ config: freshConfig })

  for (const collection of COLLECTIONS_TO_MIGRATE) {
    const docs = data[collection]
    if (!docs || docs.length === 0) continue

    console.log(`\n  Importing ${docs.length} ${collection}...`)

    for (const doc of docs) {
      try {
        // Remove internal Payload fields
        const { id, createdAt, updatedAt, ...cleanDoc } = doc

        await payload.create({
          collection: collection as any,
          data: {
            ...cleanDoc,
            id, // Preserve original ID
          },
        })
        console.log(`    ✓ Created ${collection}/${id}`)
      } catch (error: any) {
        console.log(`    ⚠ Skipped ${collection}/${doc.id}: ${error.message}`)
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting migration from Local → Railway\n')

  try {
    const data = await exportFromLocal()
    await importToRailway(data)

    console.log('\n✅ Migration complete!')
    console.log('\n📝 Next steps:')
    console.log('  1. Test your Railway deployment')
    console.log('  2. Update your .env to use Railway DB if needed')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

main()
