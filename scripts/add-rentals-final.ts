import { getPayload } from 'payload'
import config from '../src/payload.config'

const addRentalsMenu = async () => {
  const payload = await getPayload({ config })

  console.log('🔄 Adding "Rentals" menu item to header navigation...\n')

  try {
    const header = await payload.findGlobal({
      slug: 'header',
    })

    // Check if Rentals already exists
    const rentalsExists = header.navItems?.some((item: any) => item.link?.label === 'Rentals')

    if (rentalsExists) {
      console.log('ℹ️  "Rentals" menu item already exists!')
      process.exit(0)
    }

    // Find the index of Property Owners
    const propertyOwnersIndex = header.navItems?.findIndex(
      (item: any) => item.link?.label === 'Property Owners',
    )

    if (propertyOwnersIndex === -1 || propertyOwnersIndex === undefined) {
      console.error('❌ Could not find Property Owners menu item')
      process.exit(1)
    }

    // Create new navItems array with Rentals inserted
    const updatedNavItems = [...(header.navItems || [])]

    // Insert after Property Owners (preserving all existing structure with IDs)
    updatedNavItems.splice(propertyOwnersIndex + 1, 0, {
      link: {
        type: 'custom',
        newTab: null,
        label: 'Rentals',
        url: '/properties',
      },
      children: [],
    })

    // Update the header (Payload will auto-generate ID for the new item)
    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: updatedNavItems,
      },
    })

    console.log('✅ "Rentals" menu item added successfully!')
    console.log('\n📋 New navigation order:')
    console.log('   1. Services')
    console.log('   2. Property Owners')
    console.log('   3. Rentals  ← NEW!')
    console.log('   4. Residents')
    console.log('   5. About')
    console.log('   6. Resources')
    console.log('   7. Contact')
    console.log('\n✨ Navigate to /properties to see available rental listings!')

    process.exit(0)
  } catch (error: any) {
    console.error('❌ Error adding Rentals menu:', error.message)
    if (error.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.data.errors, null, 2))
    }
    process.exit(1)
  }
}

addRentalsMenu()
