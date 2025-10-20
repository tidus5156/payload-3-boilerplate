import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenvConfig({ path: resolve(process.cwd(), '.env') })

import { getPayload } from 'payload'

const updateHeaderNav = async () => {
  try {
    const { default: config } = await import('@payload-config')
    const payload = await getPayload({ config })

    console.log('🧭 Updating Header Navigation...\n')

    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Services',
              url: '/services',
            },
            children: [
              {
                link: {
                  type: 'custom',
                  label: 'Full-Service Property Management',
                  url: '/services#full-service',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Tenant Placement Services',
                  url: '/services#tenant-placement',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Lease Renewal Services',
                  url: '/services#lease-renewal',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Property Marketing',
                  url: '/services#property-marketing',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Maintenance Coordination',
                  url: '/services#maintenance',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Financial Reporting',
                  url: '/services#financial-reporting',
                },
              },
            ],
          },
          {
            link: {
              type: 'custom',
              label: 'Property Owners',
              url: '/property-owners',
            },
            children: [
              {
                link: {
                  type: 'custom',
                  label: 'Why Choose Allay',
                  url: '/property-owners#why-choose',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Our Process',
                  url: '/our-process',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Pricing & Fees',
                  url: '/pricing',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Owner Portal',
                  url: '/owner-portal',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Testimonials',
                  url: '/testimonials',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'FAQs for Owners',
                  url: '/faqs#owners',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Get Started',
                  url: '/contact',
                },
              },
            ],
          },
          {
            link: {
              type: 'custom',
              label: 'Residents',
              url: '/residents',
            },
            children: [
              {
                link: {
                  type: 'custom',
                  label: 'Search Available Properties',
                  url: '/properties',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Apply Online',
                  url: '/residents#apply',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Resident Portal Login',
                  url: '/resident-portal',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Pay Rent Online',
                  url: '/residents#pay-rent',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Submit Maintenance Request',
                  url: '/residents#maintenance',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Resident Resources',
                  url: '/residents#resources',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'FAQs for Residents',
                  url: '/faqs#residents',
                },
              },
            ],
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
              label: 'Resources',
              url: '/resources',
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

    console.log('✅ Header navigation updated successfully!\n')
    console.log('📋 Navigation structure:')
    console.log('   - Services (6 items)')
    console.log('   - Property Owners (7 items)')
    console.log('   - Residents (7 items)')
    console.log('   - About')
    console.log('   - Resources')
    console.log('   - Contact')
    console.log('\n✨ Navigation now matches CLAUDE.md specifications!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating header navigation:', error)
    process.exit(1)
  }
}

updateHeaderNav()
