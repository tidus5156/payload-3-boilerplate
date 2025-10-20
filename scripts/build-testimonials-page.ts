import { getPayload } from 'payload'
import config from '@payload-config'

const buildTestimonialsPage = async () => {
  const payload = await getPayload({ config })

  console.log('🔨 Building Testimonials page...')

  try {
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'testimonials',
        },
      },
    })

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
        layout: 'grid-3',
        backgroundColor: 'lightGray',
        spacing: 'normal',
        enableAnimations: true,
        stats: [
          {
            number: '98',
            suffix: '%',
            label: 'Average Occupancy Rate',
            sublabel: 'Industry average is 92%',
            icon: 'trending',
            animateCounter: true,
          },
          {
            number: '12',
            label: 'Average Days to Lease',
            sublabel: 'Self-managed properties average 45 days',
            icon: 'home',
            animateCounter: true,
          },
          {
            number: '96',
            suffix: '%',
            label: 'Client Retention Rate',
            sublabel: 'Owners stay with us year after year',
            icon: 'heart',
            animateCounter: true,
          },
          {
            number: '150',
            suffix: '+',
            label: 'Properties Under Management',
            sublabel: 'Across Metro Atlanta',
            icon: 'home',
            animateCounter: true,
          },
          {
            number: '15',
            label: 'Years Combined Experience',
            sublabel: 'Deep Atlanta market expertise',
            icon: 'award',
            animateCounter: true,
          },
          {
            prefix: '$',
            number: '12',
            suffix: 'M+',
            label: 'Rent Collected Annually',
            sublabel: 'For our property owner clients',
            icon: 'trending',
            animateCounter: true,
          },
        ],
      },
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
                    children: [
                      {
                        type: 'text',
                        text: "Don't Just Take Our Word For It",
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: "We're proud of the relationships we've built with property owners across Metro Atlanta. Here's what they have to say about working with Allay Property Management:",
                      },
                    ],
                  },
                  {
                    type: 'heading',
                    tag: 'h3',
                    children: [
                      {
                        type: 'text',
                        text: 'See Reviews on Third-Party Platforms',
                      },
                    ],
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
                            text: 'Google Reviews: 4.9 stars (50+ reviews)',
                            format: 1,
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Facebook: 5.0 stars (30+ reviews)',
                            format: 1,
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Yelp: 4.8 stars (20+ reviews)',
                            format: 1,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'These independent reviews reflect our commitment to excellence and the trust property owners place in us to manage their investments.',
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
        headline: 'Join 150+ Satisfied Property Owners',
        subheadline:
          'Experience the Allay difference. Get your free rental analysis today and see why property owners choose us.',
        primaryCTA: {
          text: 'Get Started',
          url: '/contact',
        },
        secondaryCTA: {
          text: 'See Our Process',
          url: '/our-process',
        },
        backgroundColor: 'deepNavy',
      },
    ]

    const pageData = {
      title: 'Testimonials - Property Owner Reviews | Allay Property Management',
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
                children: [
                  {
                    type: 'text',
                    text: 'Real Results from Real Atlanta Property Owners',
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "Don't just take our word for it—hear from the owners who trust us with their investments.",
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
              url: '#testimonials',
              label: 'Read Reviews',
              appearance: 'outline',
            },
          },
        ],
      },
      layout: testimonialsLayout,
      _status: 'published',
    }

    let result
    if (existingPages.docs.length > 0) {
      result = await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: pageData,
      })
      console.log('✅ Testimonials page updated successfully!')
    } else {
      result = await payload.create({
        collection: 'pages',
        data: pageData,
      })
      console.log('✅ Testimonials page created successfully!')
    }

    console.log(`   Page ID: ${result.id}`)
    console.log(`   Slug: ${result.slug}`)
    console.log(`   Total blocks: ${result.layout?.length || 0}`)

    console.log('\n✨ Testimonials page is ready at /testimonials')
  } catch (error) {
    console.error('❌ Error building Testimonials page:', error)
    process.exit(1)
  }

  process.exit(0)
}

buildTestimonialsPage()
