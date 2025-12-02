import { getPayload } from 'payload'
import config from '@payload-config'

const rebuildServicesPage = async () => {
  const payload = await getPayload({ config })

  console.log('🔄 Rebuilding Services page with ServicesGrid...')

  try {
    // Find the services page
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'services',
        },
      },
    })

    if (pages.docs.length === 0) {
      console.log('❌ No page found with slug "services"')
      process.exit(1)
    }

    const page = pages.docs[0]
    console.log(`✓ Found page: ${page.title} (ID: ${page.id})`)

    // Define the new layout with ServicesGrid blocks
    const newLayout = [
      // First ServicesGrid - Core Services (3 cards)
      {
        blockType: 'servicesGrid',
        heading: 'Core Property Management Services',
        subheading:
          'Comprehensive management solutions that maximize your rental income and minimize your headaches.',
        services: [
          {
            icon: 'home',
            title: 'Property Marketing & Advertising',
            description:
              'Professional marketing that attracts quality residents and minimizes vacancy. We handle everything from photography to syndication across 30+ listing sites.',
            features: [
              { feature: 'Professional photography & virtual tours' },
              { feature: 'Syndication to Zillow, Realtor.com, and 30+ sites' },
              { feature: 'Rental rate optimization and market analysis' },
              { feature: 'Competitive positioning and listing optimization' },
              { feature: 'Showing coordination and lead management' },
            ],
            ctaText: 'Get Free Rental Analysis',
            ctaUrl: '/contact',
          },
          {
            icon: 'users',
            title: 'Resident Screening & Placement',
            description:
              'Rigorous screening process that ensures only qualified, reliable residents. Our comprehensive vetting protects your investment and reduces turnover.',
            features: [
              { feature: 'Credit report analysis & score verification' },
              { feature: 'Criminal background checks' },
              { feature: 'Eviction history search' },
              { feature: 'Employment & income verification (3x rent minimum)' },
              { feature: 'Rental history & previous landlord references' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/contact',
          },
          {
            icon: 'file',
            title: 'Lease Preparation & Execution',
            description:
              'Georgia-compliant lease agreements that protect your interests. We handle all documentation, signatures, and move-in coordination.',
            features: [
              { feature: 'Georgia-specific lease agreements' },
              { feature: 'Custom addendums and disclosures' },
              { feature: 'Electronic signature platform' },
              { feature: 'Security deposit handling and documentation' },
              { feature: 'Move-in checklist and photo documentation' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/contact',
          },
        ],
      },
      // Second ServicesGrid - Financial & Maintenance (3 cards)
      {
        blockType: 'servicesGrid',
        heading: 'Financial & Maintenance Services',
        subheading:
          'Streamlined rent collection and proactive maintenance coordination that protects your property value.',
        services: [
          {
            icon: 'dollar',
            title: 'Rent Collection',
            description:
              'Automated rent collection with consistent enforcement. We handle everything from ACH setup to late fee management, ensuring steady cash flow.',
            features: [
              { feature: 'Online payment portal with auto-pay options' },
              { feature: 'ACH, credit card, and multiple payment methods' },
              { feature: 'Late fee enforcement and collection' },
              { feature: 'Delinquency management and notices' },
              { feature: 'Monthly owner distributions and reporting' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/contact',
          },
          {
            icon: 'tool',
            title: 'Maintenance Coordination',
            description:
              '24/7 emergency support with a network of licensed, insured contractors. We handle repairs quickly and cost-effectively while protecting your investment.',
            features: [
              { feature: '24/7 emergency maintenance hotline' },
              { feature: 'Vetted network of licensed contractors' },
              { feature: 'Cost-effective repair coordination' },
              { feature: 'Quality assurance and follow-up' },
              { feature: 'Preventive maintenance programs' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/contact',
          },
          {
            icon: 'home',
            title: 'Property Inspections',
            description:
              'Regular inspections that identify issues early and protect your property value. Complete photo documentation keeps you informed.',
            features: [
              { feature: 'Move-in inspection with photo documentation' },
              { feature: 'Quarterly drive-by inspections' },
              { feature: 'Detailed annual interior inspections' },
              { feature: 'Move-out inspection and damage assessment' },
              { feature: 'Preventive maintenance recommendations' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/contact',
          },
        ],
      },
      // Third ServicesGrid - Compliance & Communication (4 cards)
      {
        blockType: 'servicesGrid',
        heading: 'Compliance & Resident Relations',
        subheading:
          'Expert legal compliance and professional resident communication that reduces risk and increases retention.',
        services: [
          {
            icon: 'file',
            title: 'Financial Reporting',
            description:
              'Comprehensive financial tracking and transparent reporting. Access your property performance data anytime through our owner portal.',
            features: [
              { feature: '24/7 online owner portal access' },
              { feature: 'Monthly financial statements' },
              { feature: 'Detailed transaction history' },
              { feature: 'Annual tax documents (1099s)' },
              { feature: 'Budget forecasting and expense tracking' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/contact',
          },
          {
            icon: 'file',
            title: 'Legal Compliance & Evictions',
            description:
              'Stay compliant with Georgia landlord-tenant laws. We handle legal matters, lease enforcement, and eviction coordination if necessary.',
            features: [
              { feature: 'Fair Housing compliance expertise' },
              { feature: 'Georgia landlord-tenant law adherence' },
              { feature: 'Lease enforcement and violation notices' },
              { feature: 'Eviction coordination and legal support' },
              { feature: 'Complete documentation and record keeping' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/contact',
          },
          {
            icon: 'users',
            title: 'Resident Communication & Relations',
            description:
              'Professional communication that keeps residents satisfied and reduces turnover. Happy residents take better care of your property.',
            features: [
              { feature: '24/7 resident support and communication' },
              { feature: 'Maintenance request management' },
              { feature: 'Lease renewal negotiations' },
              { feature: 'Conflict resolution and mediation' },
              { feature: 'Move-out coordination and communication' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/contact',
          },
          {
            icon: 'file',
            title: 'Lease Renewals',
            description:
              'Proactive lease renewal strategy that maximizes retention while keeping rents competitive. We handle all negotiations and paperwork.',
            features: [
              { feature: 'Market analysis for renewal rates' },
              { feature: 'Proactive renewal outreach (90 days prior)' },
              { feature: 'Negotiation and rate optimization' },
              { feature: 'Lease modification and documentation' },
              { feature: 'Minimal vacancy periods between leases' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/contact',
          },
        ],
      },
      // Keep existing Pricing Comparison block (find it in current layout)
      ...(page.layout?.filter((block: any) => block.blockType === 'pricingComparison') || []),
      // Keep existing CTA block (find it in current layout)
      ...(page.layout?.filter((block: any) => block.blockType === 'callToAction') || []),
    ]

    // Update the page
    const result = await payload.update({
      collection: 'pages',
      id: page.id,
      data: {
        layout: newLayout,
      },
    })

    console.log('\n✅ Services page rebuilt successfully!')
    console.log(`   Total blocks: ${result.layout?.length || 0}`)

    if (result.layout) {
      const servicesGridBlocks = result.layout.filter((b: any) => b.blockType === 'servicesGrid')
      console.log(`   ServicesGrid blocks: ${servicesGridBlocks.length}`)

      let totalServices = 0
      servicesGridBlocks.forEach((block: any) => {
        totalServices += block.services?.length || 0
      })
      console.log(`   Total services: ${totalServices}`)
    }

    console.log('\n✨ Services page now using design system components!')
  } catch (error) {
    console.error('❌ Error rebuilding Services page:', error)
    process.exit(1)
  }

  process.exit(0)
}

rebuildServicesPage()
