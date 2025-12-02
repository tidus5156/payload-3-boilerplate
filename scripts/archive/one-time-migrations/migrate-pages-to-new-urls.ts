import { getPayload } from 'payload'
import config from '../src/payload.config'

const migratePages = async () => {
  const payload = await getPayload({ config })

  console.log('🔄 Migrating pages to new URL structure...\n')

  const migrations = [
    {
      oldSlug: 'our-process',
      newSlug: 'owners/process',
      name: 'Our Process',
    },
    {
      oldSlug: 'property-owners',
      newSlug: 'owners',
      name: 'Property Owners',
    },
    {
      oldSlug: 'testimonials',
      newSlug: 'owners/testimonials',
      name: 'Testimonials',
    },
  ]

  for (const migration of migrations) {
    try {
      // Find the page by old slug
      const { docs } = await payload.find({
        collection: 'pages',
        where: {
          slug: {
            equals: migration.oldSlug,
          },
        },
        limit: 1,
      })

      if (docs.length === 0) {
        console.log(`⚠️  Page not found: /${migration.oldSlug}`)
        continue
      }

      const page = docs[0]

      // Update the slug
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: {
          slug: migration.newSlug,
        },
      })

      console.log(`✅ Migrated: /${migration.oldSlug} → /${migration.newSlug}`)
    } catch (error) {
      console.error(`❌ Error migrating ${migration.name}:`, error)
    }
  }

  console.log('\n✨ Page migration complete!')
  process.exit(0)
}

migratePages()
