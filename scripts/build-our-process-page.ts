import { getPayload } from 'payload'
import config from '@payload-config'

const buildOurProcessPage = async () => {
  const payload = await getPayload({ config })

  console.log('🔨 Building Our Process page...')

  try {
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'our-process',
        },
      },
    })

    const processLayout = [
      {
        blockType: 'processTimeline',
        heading: 'Your Path to Stress-Free Property Management',
        subheading:
          'A proven, step-by-step system that consistently delivers results in 4-6 weeks',
        steps: [
          {
            title: 'Free Consultation & Rental Analysis',
            description:
              'Schedule a 20-30 minute call to discuss your property and goals. We provide a comprehensive market analysis with recommended rental rates, income projections, and optimization suggestions—all completely free with no obligation.',
            icon: 'phone',
          },
          {
            title: 'Property Evaluation & Preparation',
            description:
              'In-person walkthrough with detailed condition assessment and professional photography. We recommend cost-effective improvements that maximize your rental income and provide expected ROI on each suggestion.',
            icon: 'home',
          },
          {
            title: 'Agreement & Marketing Launch',
            description:
              'Review and sign our straightforward management agreement electronically. We immediately create compelling listings and syndicate to 30+ sites including Zillow and Realtor.com with professional photos and optimized descriptions.',
            icon: 'check',
          },
          {
            title: 'Showings & Tenant Screening',
            description:
              'We coordinate all property showings, screen inquiries, and collect applications. Comprehensive credit checks, criminal background, eviction history, employment verification, and rental history. Only top-qualified residents approved.',
            icon: 'users',
          },
          {
            title: 'Lease Signing & Move-In',
            description:
              'Georgia-compliant lease preparation with custom addendums, electronic signatures, security deposit collection, and coordinated move-in with detailed photo documentation.',
            icon: 'clipboard',
          },
          {
            title: 'Ongoing Management & Support',
            description:
              'Monthly rent collection via ACH auto-pay, 24/7 maintenance coordination, quarterly inspections, detailed financial reporting, and complete peace of mind. We handle everything while you receive consistent income.',
            icon: 'calendar',
          },
        ],
        layout: 'vertical',
        spacing: 'normal',
      },
      {
        blockType: 'iconGrid',
        heading: 'What Makes Our Process Different',
        subheading: 'Results you can count on, backed by guarantees',
        columns: 'three',
        items: [
          {
            icon: 'clock',
            iconColor: 'warmGold',
            title: '30-Day Lease Guarantee',
            description:
              "If we don't lease your property within 30 days, we reduce our management fee by 50% until it's leased. We put our money where our mouth is.",
          },
          {
            icon: 'shield',
            iconColor: 'sageGreen',
            title: 'Rigorous Screening',
            description:
              'Credit score minimum, 3x income verification, criminal background, eviction history, rental references. We only place top-tier residents.',
          },
          {
            icon: 'home',
            iconColor: 'skyBlue',
            title: '12-Month Tenant Guarantee',
            description:
              'If our placed resident leaves within 12 months, we find the next one completely free. No leasing fee, no charges.',
          },
          {
            icon: 'check',
            iconColor: 'warmGold',
            title: 'Fast Response Time',
            description:
              'Under 2 hours during business days for all inquiries. 24/7 emergency maintenance hotline for residents and urgent owner matters.',
          },
          {
            icon: 'users',
            iconColor: 'sageGreen',
            title: 'Local Expertise',
            description:
              'Deep Atlanta market knowledge means optimal pricing, faster leasing, and better resident retention. We know what works in each neighborhood.',
          },
          {
            icon: 'dollar',
            iconColor: 'skyBlue',
            title: 'Transparent Pricing',
            description:
              'No hidden fees, no maintenance markup, no surprise charges. What we quote is exactly what you pay. Period.',
          },
        ],
      },
      {
        blockType: 'heroCTA',
        headline: 'Ready to Get Started?',
        subheadline:
          'Begin your journey to stress-free property ownership today. Schedule your free consultation and rental analysis—no obligation, no pressure.',
        primaryCTA: {
          text: 'Schedule Free Consultation',
          url: '/contact',
        },
        secondaryCTA: {
          text: 'See Our Pricing',
          url: '/pricing',
        },
        backgroundColor: 'deepNavy',
      },
    ]

    const pageData = {
      title: 'Our Process - How It Works | Allay Property Management',
      slug: 'our-process',
      hero: {
        type: 'mediumImpact',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h1',
                children: [
                  {
                    type: 'text',
                    text: 'From Vacant to Profitable in 4-6 Weeks',
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Our proven 6-step process consistently delivers faster leasing, better residents, and higher returns than self-management or typical property managers.',
                  },
                ],
              },
            ],
          },
        },
        links: [
          {
            link: {
              type: 'custom',
              url: '/contact',
              label: 'Get Started',
              appearance: 'primary',
            },
          },
          {
            link: {
              type: 'custom',
              url: '#process',
              label: 'See the Process',
              appearance: 'outline',
            },
          },
        ],
      },
      layout: processLayout,
      _status: 'published',
    }

    let result
    if (existingPages.docs.length > 0) {
      result = await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: pageData,
      })
      console.log('✅ Our Process page updated successfully!')
    } else {
      result = await payload.create({
        collection: 'pages',
        data: pageData,
      })
      console.log('✅ Our Process page created successfully!')
    }

    console.log(`   Page ID: ${result.id}`)
    console.log(`   Slug: ${result.slug}`)
    console.log(`   Total blocks: ${result.layout?.length || 0}`)

    console.log('\n✨ Our Process page is ready at /our-process')
  } catch (error) {
    console.error('❌ Error building Our Process page:', error)
    process.exit(1)
  }

  process.exit(0)
}

buildOurProcessPage()
