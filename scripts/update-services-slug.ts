import { getPayload } from 'payload'
import config from '@payload-config'

const updateServicesSlug = async () => {
  const payload = await getPayload({ config })

  console.log('Finding services page...')

  try {
    // Find the page with slug 'our-services'
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'our-services',
        },
      },
    })

    if (pages.docs.length === 0) {
      console.log('No page found with slug "our-services"')
      process.exit(0)
    }

    const page = pages.docs[0]
    console.log(`Found page: ${page.title} (ID: ${page.id})`)

    // Update the slug to 'services'
    const result = await payload.update({
      collection: 'pages',
      id: page.id,
      data: {
        slug: 'services',
      },
    })

    console.log(`✅ Page slug updated from 'our-services' to 'services'`)
    console.log(`   Page title: ${result.title}`)
    console.log(`   New URL: /${result.slug}`)
  } catch (error) {
    console.error('Error updating page slug:', error)
  }

  process.exit(0)
}

updateServicesSlug()
