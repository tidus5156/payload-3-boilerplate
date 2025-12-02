import { getPayload } from 'payload'
import config from '../src/payload.config'

const updateHeaderNav = async () => {
  const payload = await getPayload({ config })

  console.log('🔄 Updating header navigation to use nested URLs...\n')

  try {
    // Get current header
    const header = await payload.findGlobal({
      slug: 'header',
    })

    console.log('Current header navItems:', JSON.stringify(header.navItems, null, 2))

    // Update the navItems with new nested URLs
    const updatedNavItems = header.navItems?.map((item: any) => {
      if (item.link?.label === 'Property Owners') {
        return {
          ...item,
          children: item.children?.map((child: any) => {
            // Update nested URLs
            if (child.link?.url === '/owners-process') {
              return {
                ...child,
                link: {
                  ...child.link,
                  url: '/owners/process',
                },
              }
            }
            if (child.link?.url === '/owners-pricing') {
              return {
                ...child,
                link: {
                  ...child.link,
                  url: '/owners/pricing',
                },
              }
            }
            if (child.link?.url === '/owners-testimonials') {
              return {
                ...child,
                link: {
                  ...child.link,
                  url: '/owners/testimonials',
                },
              }
            }
            return child
          }),
        }
      }
      return item
    })

    // Update the header
    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: updatedNavItems,
      },
    })

    console.log('✅ Header navigation updated successfully!')
    console.log('\nUpdated URLs:')
    console.log('  /owners-process → /owners/process')
    console.log('  /owners-pricing → /owners/pricing')
    console.log('  /owners-testimonials → /owners/testimonials')
  } catch (error) {
    console.error('❌ Error updating header:', error)
    process.exit(1)
  }

  process.exit(0)
}

updateHeaderNav()
