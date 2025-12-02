import { getPayload } from 'payload'
import config from '../src/payload.config.js'

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

    // Simple service data with Lexical format
    const servicesData = [
      {
        name: 'Full-Service Property Management',
        slug: 'full-service-property-management',
        icon: 'building',
        order: 0,
        featured: true,
        published: true,
        shortDescription:
          'Complete property management from marketing to maintenance. We handle everything from tenant placement to rent collection, maintenance coordination, and financial reporting.',
        fullDescription: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Our comprehensive full-service property management takes care of every aspect of your rental property. From the moment you sign with us, you can relax knowing that your investment is in expert hands.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        features: [
          { feature: 'Professional photography and marketing' },
          { feature: 'Comprehensive tenant screening' },
          { feature: 'Monthly rent collection with ACH' },
          { feature: '24/7 maintenance coordination' },
          { feature: 'Quarterly property inspections' },
          { feature: 'Detailed financial reporting' },
        ],
        pricingNote: '8% of monthly rent (minimum $150/month)',
      },
      {
        name: 'Tenant Placement Services',
        slug: 'tenant-placement',
        icon: 'users',
        order: 1,
        featured: true,
        published: true,
        shortDescription:
          'Professional tenant screening and placement services. We find qualified tenants quickly while you handle ongoing management.',
        fullDescription: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Our tenant placement service is perfect for experienced property owners who prefer to manage day-to-day operations but want expert help finding quality tenants.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        features: [
          { feature: 'Professional property marketing' },
          { feature: 'Rigorous tenant screening' },
          { feature: 'Lease preparation and execution' },
          { feature: '30-day placement guarantee' },
        ],
        pricingNote: 'One-time fee: 50% of first month rent',
      },
      {
        name: 'Maintenance Coordination',
        slug: 'maintenance-coordination',
        icon: 'wrench',
        order: 2,
        featured: true,
        published: true,
        shortDescription:
          '24/7 maintenance coordination with vetted contractors. Fast response times and quality workmanship guaranteed.',
        fullDescription: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'We coordinate all maintenance requests through our network of vetted, reliable contractors who provide quality work at competitive prices.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        features: [
          { feature: '24/7 emergency hotline' },
          { feature: 'Vetted contractor network' },
          { feature: 'Quality control and follow-up' },
          { feature: 'Transparent pricing' },
        ],
        pricingNote: 'Included with full-service management',
      },
    ]

    const services: any[] = []
    for (const service of servicesData) {
      try {
        console.log(`Creating: ${service.name}...`)
        const created = await payload.create({
          collection: 'services',
          data: service as any,
        })
        services.push(created)
        console.log(`✅ Created: ${service.name} (ID: ${created.id})`)
      } catch (error: any) {
        console.error(`❌ Error creating ${service.name}:`)
        console.error(error.message || error)
      }
    }

    console.log(`\n🎉 Successfully seeded ${services.length} service(s)!`)
    console.log('   Visit /admin/collections/services to view them.\n')
  } catch (error: any) {
    console.error('❌ Error seeding services:')
    console.error(error.message || error)
  }

  process.exit(0)
}

seedServices()
