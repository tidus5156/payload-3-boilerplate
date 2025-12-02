import { getPayload } from 'payload'
import config from '@payload-config'
import { servicesPageData } from '../src/seed/pages/services'

const updateServicesPage = async () => {
  const payload = await getPayload({ config })

  console.log('🔄 Updating Services page...')

  try {
    // Find the services page
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'services',
        },
      },
    })

    if (pages.docs.length === 0) {
      console.log('❌ No page found with slug "services"')
      process.exit(1)
    }

    const page = pages.docs[0]
    console.log(`✓ Found page: ${page.title} (ID: ${page.id})`)

    // Update the page with new hero and layout
    const result = await payload.update({
      collection: 'pages',
      id: page.id,
      data: servicesPageData,
    })

    console.log('\n✅ Services page updated successfully!')
    console.log(`   Page title: ${result.title}`)
    console.log(`   URL: /${result.slug}`)
    console.log(`   Hero type: ${result.hero?.type}`)
    console.log(`   Layout blocks: ${result.layout?.length || 0}`)

    if (result.layout) {
      console.log('\n📋 Content blocks added:')
      result.layout.forEach((block: any, index: number) => {
        console.log(`   ${index + 1}. ${block.blockType}`)
      })
    }
  } catch (error) {
    console.error('❌ Error updating Services page:', error)
    process.exit(1)
  }

  process.exit(0)
}

updateServicesPage()
