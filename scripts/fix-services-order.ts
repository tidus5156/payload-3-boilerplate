import { getPayload } from 'payload'
import config from '../src/payload.config.js'
import { sql } from 'drizzle-orm'

async function fixServicesOrder() {
  const payload = await getPayload({ config })

  console.log('🔧 Adding order column to services table...')

  try {
    // Add missing columns using raw SQL
    console.log('   Adding order column...')
    await payload.db.drizzle.execute(
      sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS "order" integer DEFAULT 0 NOT NULL;`,
    )

    console.log('   Adding slug_lock column...')
    await payload.db.drizzle.execute(
      sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS slug_lock boolean DEFAULT false;`,
    )

    console.log('   Adding featured column...')
    await payload.db.drizzle.execute(
      sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;`,
    )

    console.log('   Adding published column...')
    await payload.db.drizzle.execute(
      sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS published boolean DEFAULT true;`,
    )

    console.log('✅ Successfully added all missing columns')

    // Now check the services
    console.log('\n🔍 Checking services...')

    const services = await payload.find({
      collection: 'services',
      limit: 1,
    })

    console.log(`   Found ${services.totalDocs} service(s)`)
    console.log('\n🔄 Updating existing services with default order values...')

    // Update existing services to have order values
    const allServices = await payload.find({
      collection: 'services',
      limit: 100,
    })

    for (let i = 0; i < allServices.docs.length; i++) {
      const service = allServices.docs[i]
      if (service.order === undefined || service.order === null) {
        await payload.update({
          collection: 'services',
          id: service.id,
          data: {
            order: i,
          },
        })
        console.log(`   Updated "${service.name}" with order: ${i}`)
      }
    }

    console.log('\n✅ Services collection fixed!')
    console.log('   You can now visit /admin/collections/services')
  } catch (error) {
    console.error('❌ Error:', error)
  }

  process.exit(0)
}

fixServicesOrder()
