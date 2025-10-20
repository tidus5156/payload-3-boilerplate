import { getPayload } from 'payload'
import config from '@payload-config'

const buildResidentsPage = async () => {
  const payload = await getPayload({ config })

  console.log('🔨 Building For Residents page...')

  try {
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'residents',
        },
      },
    })

    const residentsLayout = [
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
                        text: 'Quality Properties in Great Atlanta Neighborhoods',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Browse our available rental properties across Metro Atlanta. All properties are professionally managed, well-maintained, and located in desirable neighborhoods with great schools and amenities.',
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
        blockType: 'iconGrid',
        heading: 'Why Rent with Allay',
        subheading: 'More than just a place to live—a better rental experience',
        columns: 'two',
        items: [
          {
            icon: 'tool',
            iconColor: 'skyBlue',
            title: 'Responsive Maintenance',
            description:
              '24/7 emergency hotline with fast, professional repairs when you need them. Submit requests online and track progress in real-time.',
          },
          {
            icon: 'dollar',
            iconColor: 'warmGold',
            title: 'Easy Online Payments',
            description:
              'Multiple payment options including auto-pay for your convenience. Never worry about late fees with automated rent collection.',
          },
          {
            icon: 'users',
            iconColor: 'sageGreen',
            title: 'Helpful Team',
            description:
              'Real people who care about your experience and respond quickly. We treat our residents like neighbors, not numbers.',
          },
          {
            icon: 'home',
            iconColor: 'skyBlue',
            title: 'Quality Properties',
            description:
              'Well-maintained homes in great Atlanta neighborhoods. Regular inspections ensure your property stays in excellent condition.',
          },
        ],
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'half',
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
                        text: 'How to Apply',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Our application process is simple and transparent:',
                      },
                    ],
                  },
                  {
                    type: 'list',
                    tag: 'ol',
                    listType: 'number',
                    children: [
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Find Your Home: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Browse available properties and schedule a showing',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Apply Online: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Complete our simple digital application',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Quick Approval: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Hear back within 24-48 hours',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Move In: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Sign your lease and get your keys',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            size: 'half',
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
                        text: 'Application Requirements',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: "We're transparent about what we look for:",
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
                            text: 'Credit Score: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Minimum 620',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Income: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: '3x monthly rent (verifiable)',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Rental History: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Positive references required',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Background: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Clean criminal record',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Employment: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Stable work history',
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
                        text: 'Questions about qualifying? Contact us—we want to help!',
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
        blockType: 'iconGrid',
        heading: 'Resident Resources',
        subheading: 'Everything you need at your fingertips',
        columns: 'three',
        items: [
          {
            icon: 'phone',
            iconColor: 'skyBlue',
            title: 'Resident Portal',
            description:
              'Pay rent online, submit maintenance requests, view account history, and access important documents 24/7.',
          },
          {
            icon: 'tool',
            iconColor: 'warmGold',
            title: 'Maintenance Requests',
            description:
              'Submit maintenance requests online anytime. Track progress and get updates. 24/7 emergency line for urgent issues.',
          },
          {
            icon: 'star',
            iconColor: 'sageGreen',
            title: 'Lease Renewals',
            description:
              'Love your home? We make lease renewals simple and straightforward. Contact us 90 days before your lease ends.',
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
                        text: 'Frequently Asked Questions',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Quick answers to common questions from residents:',
                      },
                    ],
                  },
                  {
                    type: 'heading',
                    tag: 'h3',
                    children: [
                      {
                        type: 'text',
                        text: 'When is rent due?',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Rent is due on the 1st of each month. We offer a grace period until the 5th, after which late fees apply per your lease agreement.',
                      },
                    ],
                  },
                  {
                    type: 'heading',
                    tag: 'h3',
                    children: [
                      {
                        type: 'text',
                        text: 'Do you accept pets?',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: "Many of our properties are pet-friendly! Pet policies vary by property, so please ask about the specific home you're interested in. Pet deposits and monthly pet fees apply.",
                      },
                    ],
                  },
                  {
                    type: 'heading',
                    tag: 'h3',
                    children: [
                      {
                        type: 'text',
                        text: 'How do I submit a maintenance request?',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Log into your resident portal to submit maintenance requests 24/7. For emergencies (water leaks, no heat/AC, security issues), call our emergency line immediately.',
                      },
                    ],
                  },
                  {
                    type: 'heading',
                    tag: 'h3',
                    children: [
                      {
                        type: 'text',
                        text: 'Do I need renters insurance?',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: "Yes, all residents are required to maintain renters insurance with minimum liability coverage. This protects your personal belongings and provides liability coverage. It's typically very affordable ($15-30/month).",
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
        headline: 'Ready to Find Your Next Home?',
        subheadline:
          'Browse our available properties or contact us to learn more about renting with Allay Property Management.',
        primaryCTA: {
          text: 'Contact Us',
          url: '/contact',
        },
        secondaryCTA: {
          text: 'Resident Portal Login',
          url: 'https://app.tenantcloud.com',
        },
        backgroundColor: 'deepNavy',
      },
    ]

    const pageData = {
      title: 'For Residents - Find Your Atlanta Home | Allay Property Management',
      slug: 'residents',
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
                    text: 'Find Your Perfect Atlanta Home',
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Quality properties managed by people who care. Browse available rentals and apply online today.',
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
              label: 'Contact Us',
              appearance: 'primary',
            },
          },
          {
            link: {
              type: 'custom',
              url: 'https://app.tenantcloud.com',
              label: 'Resident Login',
              appearance: 'outline',
            },
          },
        ],
      },
      layout: residentsLayout,
      _status: 'published',
    }

    let result
    if (existingPages.docs.length > 0) {
      result = await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: pageData,
      })
      console.log('✅ For Residents page updated successfully!')
    } else {
      result = await payload.create({
        collection: 'pages',
        data: pageData,
      })
      console.log('✅ For Residents page created successfully!')
    }

    console.log(`   Page ID: ${result.id}`)
    console.log(`   Slug: ${result.slug}`)
    console.log(`   Total blocks: ${result.layout?.length || 0}`)

    console.log('\n✨ For Residents page is ready at /residents')
  } catch (error) {
    console.error('❌ Error building For Residents page:', error)
    process.exit(1)
  }

  process.exit(0)
}

buildResidentsPage()
