import { getPayload } from 'payload'
import config from '../src/payload.config'

async function updateHomepageWithDualHero() {
  const payload = await getPayload({ config })

  try {
    // Find the homepage
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
      limit: 1,
    })

    if (pages.docs.length === 0) {
      console.log('❌ Homepage not found. Creating new homepage...')

      const newPage = await payload.create({
        collection: 'pages',
        data: {
          title: 'Home',
          slug: 'home',
          _status: 'published',
          layout: [
            {
              blockType: 'dualHero',
              leftPanel: {
                headline: 'Your Atlanta Property. In Expert Hands.',
                subheadline: 'Local expertise. Transparent service. Properties managed with the attention yours deserves.',
                overlayColor: 'deepNavy',
                overlayOpacity: 75,
                primaryCTA: {
                  text: 'Get Free Analysis',
                  url: '/contact',
                  openInNewTab: false,
                },
                secondaryCTA: {
                  text: 'Our Services',
                  url: '/services',
                  openInNewTab: false,
                },
                trustIndicators: [
                  {
                    icon: 'star',
                    text: '4.9/5 Rating',
                  },
                  {
                    icon: 'home',
                    text: '500+ Properties',
                  },
                  {
                    icon: 'shield',
                    text: 'RE/MAX Backed',
                  },
                ],
              },
              rightPanel: {
                headline: 'Find Your Perfect Home',
                subheadline: 'Quality rentals across Metro Atlanta',
                overlayColor: 'skyBlue',
                overlayOpacity: 65,
                primaryCTA: {
                  text: 'Search Properties',
                  url: '/properties',
                  openInNewTab: false,
                },
                subtext: 'View 120+ Available Homes',
              },
              mobileLabels: {
                ownerLabel: 'PROPERTY OWNERS',
                residentLabel: 'LOOKING FOR A HOME?',
              },
              desktopSplit: '60-40',
              minHeight: '85vh',
              mobileLayout: 'stack',
              showScrollIndicator: true,
              enableParallax: false,
            },
          ],
        },
      })

      console.log('✅ Created new homepage with DualHero block!')
      console.log(`   Page ID: ${newPage.id}`)
      return
    }

    const homepage = pages.docs[0]
    console.log(`📄 Found homepage: "${homepage.title}" (ID: ${homepage.id})`)

    // Check if it already has a dualHero block
    const hasDualHero = homepage.layout?.some((block: any) => block.blockType === 'dualHero')

    if (hasDualHero) {
      console.log('ℹ️  Homepage already has a DualHero block. Updating it...')
    } else {
      console.log('➕ Adding DualHero block to homepage...')
    }

    // Update the homepage - replace first block with DualHero or add if no blocks
    const updatedLayout = [
      {
        blockType: 'dualHero',
        leftPanel: {
          headline: 'Your Atlanta Property. In Expert Hands.',
          subheadline: 'Local expertise. Transparent service. Properties managed with the attention yours deserves.',
          overlayColor: 'deepNavy',
          overlayOpacity: 75,
          primaryCTA: {
            text: 'Get Free Analysis',
            url: '/contact',
            openInNewTab: false,
          },
          secondaryCTA: {
            text: 'Our Services',
            url: '/services',
            openInNewTab: false,
          },
          trustIndicators: [
            {
              icon: 'star',
              text: '4.9/5 Rating',
            },
            {
              icon: 'home',
              text: '500+ Properties',
            },
            {
              icon: 'shield',
              text: 'RE/MAX Backed',
            },
          ],
        },
        rightPanel: {
          headline: 'Find Your Perfect Home',
          subheadline: 'Quality rentals across Metro Atlanta',
          overlayColor: 'skyBlue',
          overlayOpacity: 65,
          primaryCTA: {
            text: 'Search Properties',
            url: '/properties',
            openInNewTab: false,
          },
          subtext: 'View 120+ Available Homes',
        },
        mobileLabels: {
          ownerLabel: 'PROPERTY OWNERS',
          residentLabel: 'LOOKING FOR A HOME?',
        },
        desktopSplit: '60-40',
        minHeight: '85vh',
        mobileLayout: 'stack',
        showScrollIndicator: true,
        enableParallax: false,
      },
      // Keep the rest of the existing layout blocks
      ...(homepage.layout || []).slice(hasDualHero ? 1 : 0),
    ]

    await payload.update({
      collection: 'pages',
      id: homepage.id,
      data: {
        layout: updatedLayout,
      },
    })

    console.log('✅ Successfully updated homepage with DualHero block!')
    console.log('   View at: http://localhost:3000/')
    console.log('   Edit at: http://localhost:3000/admin/collections/pages/' + homepage.id)
  } catch (error) {
    console.error('❌ Error updating homepage:', error)
    throw error
  } finally {
    process.exit(0)
  }
}

updateHomepageWithDualHero()
