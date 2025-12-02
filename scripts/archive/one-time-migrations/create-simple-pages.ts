import { getPayload } from 'payload'
import config from '@payload-config'

const run = async () => {
  const payload = await getPayload({ config })

  try {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Contact Us - Get Started',
        slug: 'contact',
        _status: 'published',
      },
    })
    console.log('✅ Contact page created')
  } catch (e) {
    console.log('Contact page may already exist')
  }

  try {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'For Residents - Find Your Home',
        slug: 'residents',
        _status: 'published',
      },
    })
    console.log('✅ Residents page created')
  } catch (e) {
    console.log('Residents page may already exist')
  }

  process.exit(0)
}

run()
