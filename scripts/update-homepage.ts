import { getPayload } from 'payload'
import config from '@payload-config'
import { homepageData } from '../src/seed/pages/homepage'
import * as fs from 'fs'
import * as path from 'path'

// Load .env file manually
const envPath = path.join(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && !key.startsWith('#')) {
      const value = valueParts.join('=').trim()
      if (value && !process.env[key]) {
        process.env[key] = value
      }
    }
  })
}

const updateHomepage = async () => {
  try {
    const payload = await getPayload({ config })

    console.log('🏠 Updating homepage with new blocks...\n')

    // Find the existing homepage
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
      limit: 1,
    })

    if (existingPages.docs.length === 0) {
      console.log('❌ Homepage not found. Creating new homepage...')
      await payload.create({
        collection: 'pages',
        data: homepageData as any,
      })
      console.log('✅ Homepage created successfully!\n')
    } else {
      const homepage = existingPages.docs[0]
      console.log(`📄 Found homepage with ID: ${homepage.id}`)

      // Update the homepage with new layout
      await payload.update({
        collection: 'pages',
        id: homepage.id,
        data: {
          layout: homepageData.layout as any,
        },
      })

      console.log('✅ Homepage updated successfully!\n')
      console.log('📊 New blocks added:')
      console.log('   - Statistics Block (Proven Results for Property Owners)')
      console.log('   - Process Timeline Block (Getting Started is Simple)')
      console.log('   - FAQ Accordion Block (Frequently Asked Questions)')
    }

    // Also update header navigation if needed
    console.log('\n🧭 Updating header navigation...')
    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Home',
              url: '/',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Services',
              url: '/services',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'About',
              url: '/about',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Contact',
              url: '/contact',
            },
          },
        ],
      },
    })
    console.log('✅ Header navigation updated!\n')

    console.log('🎉 All updates completed successfully!')
    console.log('   Refresh your browser to see the changes.\n')

    process.exit(0)
  } catch (error) {
    console.error('❌ Fatal error during homepage update:', error)
    process.exit(1)
  }
}

updateHomepage()
