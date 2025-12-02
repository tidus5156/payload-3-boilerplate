import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenvConfig({ path: resolve(process.cwd(), '.env') })

import { getPayload } from 'payload'
import { homepageData } from '../src/seed/pages/homepage'

const fixHomepageImages = async () => {
  try {
    console.log('🔧 Fixing homepage image references...\n')

    const { default: config } = await import('@payload-config')
    const payload = await getPayload({ config })

    // Find the homepage
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
    })

    if (pages.docs.length === 0) {
      console.log('❌ Homepage not found')
      process.exit(1)
    }

    const homepage = pages.docs[0]
    console.log(`✓ Found homepage (ID: ${homepage.id})\n`)

    // Update homepage with clean data (no media references)
    await payload.update({
      collection: 'pages',
      id: homepage.id,
      data: {
        ...homepageData,
        // Ensure no broken media references
        hero: {
          ...homepageData.hero,
          media: undefined, // Remove any media reference
        },
      },
    })

    console.log('✅ Homepage updated successfully!\n')
    console.log('📋 Changes:')
    console.log('   - Removed any broken media/image references')
    console.log('   - Updated with clean seed data')
    console.log('\n✨ You can now restart the dev server without image errors!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error fixing homepage:', error)
    process.exit(1)
  }
}

fixHomepageImages()
