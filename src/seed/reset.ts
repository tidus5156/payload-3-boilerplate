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

const reset = async () => {
  try {
    console.log('DEBUG - process.env.PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET?.substring(0, 10) + '...')

    // Dynamically import config after env vars are loaded
    const { default: config } = await import('@payload-config')
    const payload = await getPayload({ config })

    console.log('🗑️  Starting database reset...\n')
    console.log('⚠️  WARNING: This will delete ALL data from your database!\n')

    const collections = [
      'pages',
      'posts',
      'media',
      'categories',
      'users',
      'comments',
      'properties',
      'neighborhoods',
      'contact-submissions',
      'testimonials',
      'team-members',
    ]

    for (const collection of collections) {
      try {
        console.log(`🗑️  Deleting all documents from "${collection}"...`)

        // Get all documents
        const { docs } = await payload.find({
          collection: collection as any,
          limit: 1000,
        })

        // Delete each document
        for (const doc of docs) {
          await payload.delete({
            collection: collection as any,
            id: doc.id,
          })
        }

        console.log(`   ✅ Deleted ${docs.length} documents from "${collection}"\n`)
      } catch (error) {
        console.error(`   ❌ Error deleting from "${collection}":`, error.message)
      }
    }

    console.log('✅ Database reset completed!\n')
    console.log('💡 You can now run npm run seed to reseed the database.\n')

    process.exit(0)
  } catch (error) {
    console.error('❌ Fatal error during database reset:', error)
    process.exit(1)
  }
}

reset()
