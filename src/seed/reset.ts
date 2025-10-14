import { getPayload } from 'payload'
import config from '@payload-config'

const reset = async () => {
  try {
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
