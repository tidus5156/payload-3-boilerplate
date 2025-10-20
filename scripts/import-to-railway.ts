#!/usr/bin/env tsx

/**
 * Import Data to Railway Database
 *
 * Usage:
 *   DATABASE_URI="your-railway-connection-string" PAYLOAD_SECRET="your-secret" pnpm tsx scripts/import-to-railway.ts
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'
import { readFileSync } from 'fs'
import { join } from 'path'

const importToRailway = async () => {
  // Read exported data
  const dataPath = join(process.cwd(), 'migration-data.json')

  let exportData: any

  try {
    const fileContent = readFileSync(dataPath, 'utf-8')
    exportData = JSON.parse(fileContent)
  } catch (error: any) {
    console.error('❌ Error: Could not read migration-data.json')
    console.error('   Make sure you ran export-local-data.ts first')
    process.exit(1)
  }

  console.log('📥 Importing data to Railway database...\n')
  console.log(`📅 Data exported at: ${exportData.exportedAt}\n`)

  const payload = await getPayload({ config })

  const collections = exportData.collections || {}

  // Import collections in order (to preserve relationships)
  const IMPORT_ORDER = [
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

  for (const collection of IMPORT_ORDER) {
    const docs = collections[collection]
    if (!docs || docs.length === 0) continue

    console.log(`\n📦 Importing ${docs.length} ${collection}...`)

    let successCount = 0
    let skipCount = 0

    for (const doc of docs) {
      try {
        // Remove internal Payload fields and version info
        const { id, createdAt, updatedAt, _status, ...cleanDoc } = doc

        // Check if already exists (skip if so)
        try {
          const existing = await payload.findByID({
            collection: collection as any,
            id: id,
          })
          if (existing) {
            console.log(`    ⏭ Skipped ${collection}/${id} (already exists)`)
            skipCount++
            continue
          }
        } catch (e) {
          // Doesn't exist, proceed with creation
        }

        await payload.create({
          collection: collection as any,
          data: {
            ...cleanDoc,
            id, // Preserve original ID
            _status: _status || 'published',
          },
        })
        console.log(`    ✓ Created ${collection}/${id}`)
        successCount++
      } catch (error: any) {
        console.log(`    ⚠ Failed ${collection}/${doc.id}: ${error.message}`)
        skipCount++
      }
    }

    console.log(
      `   Summary: ${successCount} created, ${skipCount} skipped/failed out of ${docs.length} total`,
    )
  }

  // Import globals
  if (exportData.globals) {
    console.log('\n🌐 Importing globals...')

    if (exportData.globals.header) {
      try {
        await payload.updateGlobal({
          slug: 'header',
          data: exportData.globals.header,
        })
        console.log('   ✓ Updated header global')
      } catch (error: any) {
        console.log(`   ⚠ Failed to update header: ${error.message}`)
      }
    }

    if (exportData.globals.settings) {
      try {
        await payload.updateGlobal({
          slug: 'settings',
          data: exportData.globals.settings,
        })
        console.log('   ✓ Updated settings global')
      } catch (error: any) {
        console.log(`   ⚠ Failed to update settings: ${error.message}`)
      }
    }
  }

  console.log('\n✅ Import complete!')
  console.log('\n📝 Next steps:')
  console.log('  1. Test your Railway deployment')
  console.log('  2. Verify all content migrated correctly')
  console.log('  3. Update your local .env to use Railway DB if desired\n')

  process.exit(0)
}

importToRailway()
