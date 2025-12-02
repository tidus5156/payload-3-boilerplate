import { homepageData } from '../src/seed/pages/homepage'

const updateHomepage = async () => {
  try {
    console.log('🏠 Updating homepage via API...\n')

    // First, get the existing homepage
    const getPagesResponse = await fetch('http://localhost:3000/api/pages?where[slug][equals]=home&limit=1')
    const pagesData = await getPagesResponse.json()

    if (!pagesData.docs || pagesData.docs.length === 0) {
      console.log('❌ Homepage not found')
      process.exit(1)
    }

    const homepage = pagesData.docs[0]
    console.log(`📄 Found homepage with ID: ${homepage.id}`)

    // Update the homepage layout
    const updateResponse = await fetch(`http://localhost:3000/api/pages/${homepage.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        layout: homepageData.layout,
      }),
    })

    if (!updateResponse.ok) {
      const error = await updateResponse.text()
      console.error('❌ Failed to update homepage:', error)
      process.exit(1)
    }

    const updatedPage = await updateResponse.json()
    console.log('✅ Homepage updated successfully!\n')
    console.log('📊 New blocks added:')
    console.log('   - Statistics Block (Proven Results for Property Owners)')
    console.log('   - Process Timeline Block (Getting Started is Simple)')
    console.log('   - FAQ Accordion Block (Frequently Asked Questions)')

    // Update header navigation
    console.log('\n🧭 Updating header navigation...')
    const headerResponse = await fetch('http://localhost:3000/api/globals/header', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    })

    if (headerResponse.ok) {
      console.log('✅ Header navigation updated!\n')
    }

    console.log('🎉 All updates completed successfully!')
    console.log('   Refresh your browser to see the changes.\n')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

updateHomepage()
