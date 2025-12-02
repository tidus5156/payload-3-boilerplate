import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function cleanupAndAddDualHero() {
  const payload = await getPayload({ config })

  console.log('🧹 Step 1: Deleting empty draft pages...')

  // Delete pages ID 40 and 41 (empty drafts)
  try {
    await payload.delete({ collection: 'pages', id: '40' })
    console.log('✅ Deleted page ID 40')
  } catch (e) {
    console.log('⚠️  Page ID 40 not found or already deleted')
  }

  try {
    await payload.delete({ collection: 'pages', id: '41' })
    console.log('✅ Deleted page ID 41')
  } catch (e) {
    console.log('⚠️  Page ID 41 not found or already deleted')
  }

  console.log('\n📝 Step 2: Would you like to add DualHero to homepage?')
  console.log('   This will ADD the DualHero block at the TOP of the homepage.')
  console.log('   Your existing blocks will remain below it.')
  console.log('\n   Run this script with ADD_DUALHERO=true to proceed.')

  if (process.env.ADD_DUALHERO === 'true') {
    console.log('\n🏗️  Adding DualHero block to homepage...')

    const homepage = await payload.findByID({
      collection: 'pages',
      id: '21',
    })

    if (!homepage) {
      console.error('❌ Homepage not found!')
      process.exit(1)
    }

    // Get a media image for the backgrounds (we'll use existing media)
    const media = await payload.find({
      collection: 'media',
      limit: 2,
    })

    const leftImage = media.docs[0]?.id || null
    const rightImage = media.docs[1]?.id || null

    // Create the DualHero block data
    const dualHeroBlock = {
      blockType: 'dualHero',
      leftPanel: {
        headline: 'Maximize Your Rental Income',
        backgroundImage: leftImage,
        overlayColor: 'deepNavy',
        overlayOpacity: 30,
        primaryCTA: {
          text: 'Get Free Analysis',
          url: '/contact',
          openInNewTab: false,
        },
        secondaryLink: {
          text: 'Learn more ↓',
          url: '#benefits',
        },
      },
      rightPanel: {
        headline: 'Find Your Perfect Home',
        backgroundImage: rightImage,
        overlayColor: 'sageGreen',
        overlayOpacity: 30,
        primaryCTA: {
          text: 'Search Properties',
          url: '/properties',
          openInNewTab: false,
        },
        secondaryLink: {
          text: 'Learn more ↓',
          url: '#benefits',
        },
      },
      minHeight: '85vh',
      mobileLayout: 'stack',
      showScrollIndicator: true,
      enableParallax: false,
    }

    // Add DualHero at the beginning of the layout array
    const updatedLayout = [dualHeroBlock, ...(homepage.layout || [])]

    await payload.update({
      collection: 'pages',
      id: '21',
      data: {
        layout: updatedLayout,
      },
    })

    console.log('✅ DualHero block added to homepage!')
    console.log('   Visit http://localhost:3000 to see it!')
  }

  process.exit(0)
}

cleanupAndAddDualHero()
