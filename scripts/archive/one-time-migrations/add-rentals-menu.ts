import { getPayload } from 'payload'
import config from '../src/payload.config'

const addRentalsMenu = async () => {
  const payload = await getPayload({ config })

  console.log('🔄 Adding "Rentals" menu item to header navigation...\n')

  try {
    const header = await payload.findGlobal({
      slug: 'header',
    })

    // Find the index of the Property Owners menu item
    const propertyOwnersIndex = header.navItems?.findIndex(
      (item: any) => item.link?.label === 'Property Owners',
    )

    if (propertyOwnersIndex === -1 || propertyOwnersIndex === undefined) {
      console.error('❌ Could not find Property Owners menu item')
      process.exit(1)
    }

    // Check if Rentals already exists
    const rentalsExists = header.navItems?.some((item: any) => item.link?.label === 'Rentals')

    if (rentalsExists) {
      console.log('ℹ️  Rentals menu item already exists, skipping...')
      process.exit(0)
    }

    // Create new navItems array with Rentals inserted after Property Owners
    const updatedNavItems = [...(header.navItems || [])]

    // Remove id fields to let Payload auto-generate them
    const cleanedNavItems = updatedNavItems.map((item: any) => {
      const { id, ...itemWithoutId } = item
      return {
        ...itemWithoutId,
        children: item.children?.map((child: any) => {
          const { id: childId, ...childWithoutId } = child
          return childWithoutId
        }) || [],
      }
    })

    // Insert the new Rentals menu item
    cleanedNavItems.splice(propertyOwnersIndex + 1, 0, {
      link: {
        type: 'custom',
        newTab: null,
        label: 'Rentals',
        url: '/properties',
      },
      children: [],
    })

    // Update the header
    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: cleanedNavItems,
      },
    })

    console.log('✅ "Rentals" menu item added successfully!')
    console.log('   Position: Between "Property Owners" and "Residents"')
    console.log('   URL: /properties\n')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error adding Rentals menu:', error)
    process.exit(1)
  }
}

addRentalsMenu()
