import { getPayload } from 'payload'
import config from '../src/payload.config.js'
import { servicesData } from '../src/seed/services'

async function seedServices() {
  const payload = await getPayload({ config })

  console.log('🛠️  Seeding Services Collection...\n')

  try {
    // Check if services already exist
    const existingServices = await payload.find({
      collection: 'services',
      limit: 1,
    })

    if (existingServices.totalDocs > 0) {
      console.log('⚠️  Services already exist in database.')
      console.log(`   Found ${existingServices.totalDocs} existing service(s).`)
      console.log('   Skipping seed to prevent duplicates.\n')
      process.exit(0)
    }

    const services: any[] = []
    for (const service of servicesData) {
      try {
        const created = await payload.create({
          collection: 'services',
          data: service as any,
        })
        services.push(created)
        console.log(`✅ Created: ${service.name}`)
      } catch (error) {
        console.error(`❌ Error creating ${service.name}:`, error)
      }
    }

    console.log(`\n🎉 Successfully seeded ${services.length} service(s)!`)
    console.log('   Visit /admin/collections/services to view them.\n')
  } catch (error) {
    console.error('❌ Error seeding services:', error)
  }

  process.exit(0)
}

seedServices()
