import { getPayload } from 'payload'
import config from '@payload-config'

const buildAllRemainingPages = async () => {
  const payload = await getPayload({ config })

  console.log('🚀 Building all remaining Phase 1 pages...\n')

  // OUR PROCESS PAGE
  try {
    console.log('Building Our Process page...')
    const processLayout = [
      {
        blockType: 'processTimeline',
        heading: 'Your Path to Stress-Free Property Management',
        subheading: 'A proven, step-by-step system that consistently delivers results in 4-6 weeks',
        steps: [
          {
            title: 'Free Consultation & Rental Analysis',
            description: 'Schedule a 20-30 minute call to discuss your property and goals. We provide a comprehensive market analysis with recommended rental rates, income projections, and optimization suggestions—all completely free with no obligation.',
            icon: 'phone',
            timeline: 'Days 1-3',
          },
          {
            title: 'Property Evaluation & Preparation',
            description: 'In-person walkthrough with detailed condition assessment and professional photography. We recommend cost-effective improvements that maximize your rental income and provide expected ROI on each suggestion.',
            icon: 'home',
            timeline: 'Days 4-7',
          },
          {
            title: 'Agreement & Marketing Launch',
            description: 'Review and sign our straightforward management agreement electronically. We immediately create compelling listings and syndicate to 30+ sites including Zillow and Realtor.com with professional photos and optimized descriptions.',
            icon: 'check',
            timeline: 'Days 8-10',
          },
          {
            title: 'Showings & Applications',
            description: 'We coordinate all property showings, screen inquiries, and collect applications. Prospective residents get quick responses while you stay completely hands-off.',
            icon: 'users',
            timeline: 'Days 11-25',
          },
          {
            title: 'Rigorous Tenant Screening',
            description: 'Comprehensive credit checks, criminal background, eviction history, employment and income verification (3x rent minimum), rental history, and previous landlord references. Only top-qualified residents approved.',
            icon: 'shield',
            timeline: 'Days 26-28',
          },
          {
            title: 'Lease Signing & Move-In',
            description: 'Georgia-compliant lease preparation with custom addendums, electronic signatures, security deposit collection, and coordinated move-in with detailed photo documentation.',
            icon: 'tool',
            timeline: 'Days 29-35',
          },
          {
            title: 'Ongoing Management',
            description: 'Monthly rent collection via ACH auto-pay, 24/7 maintenance coordination, quarterly inspections, detailed financial reporting, and complete peace of mind. We handle everything while you receive consistent income.',
            icon: 'dollar',
            timeline: 'Day 36+',
          },
        ],
        layout: 'vertical',
      },
      {
        blockType: 'heroCTA',
        headline: 'Ready to Get Started?',
        subheadline: 'Begin your journey to stress-free property ownership today. Schedule your free consultation and rental analysis—no obligation, no pressure.',
        primaryCTA: {
          text: 'Schedule Free Consultation',
          url: '/contact',
        },
        secondaryCTA: {
          text: 'Download Process Guide',
          url: '/contact',
        },
        backgroundColor: 'deepNavy',
      },
    ]

    await payload.create({
      collection: 'pages',
      data: {
        title: 'Our Process - How It Works',
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
                  children: [{ type: 'text', text: 'From Vacant to Profitable in 4-6 Weeks' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Our proven 7-step process consistently delivers faster leasing, better residents, and higher returns than self-management or typical property managers.',
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
          ],
        },
        layout: processLayout,
        _status: 'published',
      },
    })
    console.log('✅ Our Process page created\n')
  } catch (error) {
    console.error('❌ Error creating Process page:', error)
  }

  // TESTIMONIALS PAGE
  try {
    console.log('Building Testimonials page...')
    const testimonialsLayout = [
      {
        blockType: 'testimonialsCarousel',
        heading: 'What Property Owners Are Saying',
        subheading: 'Real results from real Atlanta property owners who trust Allay',
        showAll: true,
      },
      {
        blockType: 'statistics',
        heading: 'By the Numbers',
        subheading: 'Results that speak for themselves',
        stats: [
          {
            value: '98%',
            label: 'Average Occupancy Rate',
            description: 'Industry average is 92%',
          },
          {
            value: '12',
            label: 'Average Days to Lease',
            description: 'Self-managed properties average 45 days',
          },
          {
            value: '96%',
            label: 'Client Retention Rate',
            description: 'Owners stay with us year after year',
          },
          {
            value: '150+',
            label: 'Properties Under Management',
            description: 'Across Metro Atlanta',
          },
          {
            value: '15',
            label: 'Years Combined Experience',
            description: 'Deep Atlanta market expertise',
          },
          {
            value: '$12M+',
            label: 'Rent Collected Annually',
            description: 'For our property owner clients',
          },
        ],
      },
      {
        blockType: 'heroCTA',
        headline: 'Join 150+ Satisfied Property Owners',
        subheadline: 'Experience the Allay difference. Get your free rental analysis today.',
        primaryCTA: {
          text: 'Get Started',
          url: '/contact',
        },
        backgroundColor: 'deepNavy',
      },
    ]

    await payload.create({
      collection: 'pages',
      data: {
        title: 'Testimonials - Property Owner Reviews',
        slug: 'testimonials',
        hero: {
          type: 'mediumImpact',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h1',
                  children: [{ type: 'text', text: 'Real Results from Real Atlanta Property Owners' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Don\'t just take our word for it—hear from the owners who trust us with their investments.',
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
          ],
        },
        layout: testimonialsLayout,
        _status: 'published',
      },
    })
    console.log('✅ Testimonials page created\n')
  } catch (error) {
    console.error('❌ Error creating Testimonials page:', error)
  }

  // BLOG/RESOURCES ARCHIVE PAGE
  try {
    console.log('Building Blog Archive page...')
    const blogLayout = [
      {
        blockType: 'archive',
        populateBy: 'collection',
        relationTo: 'posts',
        limit: 10,
        categories: [],
      },
    ]

    await payload.create({
      collection: 'pages',
      data: {
        title: 'Resources - Atlanta Rental Market Insights',
        slug: 'resources',
        hero: {
          type: 'mediumImpact',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h1',
                  children: [{ type: 'text', text: 'Atlanta Rental Market Insights & Owner Resources' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Expert advice to help you make smarter investment decisions and maximize your rental property returns.',
                    },
                  ],
                },
              ],
            },
          },
        },
        layout: blogLayout,
        _status: 'published',
      },
    })
    console.log('✅ Blog Archive page created\n')
  } catch (error) {
    console.error('❌ Error creating Blog Archive page:', error)
  }

  // AREAS WE SERVE MAIN PAGE
  try {
    console.log('Building Areas We Serve page...')
    const areasLayout = [
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            richText: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    tag: 'h2',
                    children: [{ type: 'text', text: 'Comprehensive Metro Atlanta Coverage' }],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Allay Property Management serves property owners across Metro Atlanta with deep local expertise in every neighborhood. From Buckhead to Decatur, Sandy Springs to Stone Mountain, we know the unique characteristics, rental markets, and resident preferences in each area.',
                      },
                    ],
                  },
                  {
                    type: 'heading',
                    tag: 'h3',
                    children: [{ type: 'text', text: 'Why Local Expertise Matters' }],
                  },
                  {
                    type: 'list',
                    tag: 'ul',
                    listType: 'bullet',
                    children: [
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Accurate rental pricing based on neighborhood micro-markets',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Understanding of local school districts and their impact on rental demand',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Knowledge of commute patterns and resident preferences by area',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Established relationships with local contractors and vendors',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Familiarity with neighborhood HOAs, regulations, and community standards',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
      {
        blockType: 'heroCTA',
        headline: 'Explore Our Neighborhood Pages',
        subheadline: 'Click on any neighborhood to see detailed market data, school information, and properties we manage in that area.',
        primaryCTA: {
          text: 'View All Neighborhoods',
          url: '/contact',
        },
        backgroundColor: 'lightGray',
      },
    ]

    await payload.create({
      collection: 'pages',
      data: {
        title: 'Areas We Serve - Metro Atlanta Property Management',
        slug: 'areas-we-serve',
        hero: {
          type: 'mediumImpact',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h1',
                  children: [{ type: 'text', text: 'Property Management Across Metro Atlanta' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Local expertise in 40+ neighborhoods and communities throughout Atlanta, Buckhead, Decatur, Sandy Springs, Roswell, and beyond.',
                    },
                  ],
                },
              ],
            },
          },
        },
        layout: areasLayout,
        _status: 'published',
      },
    })
    console.log('✅ Areas We Serve page created\n')
  } catch (error) {
    console.error('❌ Error creating Areas page:', error)
  }

  console.log('\n🎉 All Phase 1 core pages created successfully!')
  process.exit(0)
}

buildAllRemainingPages()
