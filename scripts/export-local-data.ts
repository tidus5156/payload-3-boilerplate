#!/usr/bin/env tsx

/**
 * Export Local Database Content to JSON
 *
 * Usage:
 *   DATABASE_URI="postgresql://user:password@localhost:5432/allay_pm" pnpm tsx scripts/export-local-data.ts
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'
import { writeFileSync } from 'fs'
import { join } from 'path'

const COLLECTIONS_TO_EXPORT = [
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

const exportLocalData = async () => {
  const payload = await getPayload({ config })

  console.log('📤 Exporting local database content...\n')

  const exportData: Record<string, any[]> = {}

  for (const collection of COLLECTIONS_TO_EXPORT) {
    try {
      const result = await payload.find({
        collection: collection as any,
        limit: 1000,
        pagination: false,
      })
      exportData[collection] = result.docs
      console.log(`  ✓ Exported ${result.docs.length} ${collection}`)
    } catch (error) {
      console.log(`  ⚠ Skipped ${collection} (doesn't exist or error)`)
    }
  }

  // Export globals (header, settings, etc.)
  const globals: Record<string, any> = {}

  try {
    const header = await payload.findGlobal({ slug: 'header' })
    globals.header = header
    console.log(`  ✓ Exported header global`)
  } catch (error) {
    console.log(`  ⚠ Skipped header global`)
  }

  try {
    const settings = await payload.findGlobal({ slug: 'settings' })
    globals.settings = settings
    console.log(`  ✓ Exported settings global`)
  } catch (error) {
    console.log(`  ⚠ Skipped settings global`)
  }

  // Write to file
  const outputPath = join(process.cwd(), 'migration-data.json')
  writeFileSync(
    outputPath,
    JSON.stringify(
      {
        collections: exportData,
        globals,
        exportedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  )

  console.log(`\n✅ Export complete! Data saved to: migration-data.json`)
  console.log(`\n📊 Export Summary:`)

  Object.entries(exportData).forEach(([collection, docs]) => {
    if (docs.length > 0) {
      console.log(`   • ${collection}: ${docs.length} documents`)
    }
  })

  console.log(`\n💡 Next step: Run import script on Railway database`)

  process.exit(0)
}

exportLocalData()
