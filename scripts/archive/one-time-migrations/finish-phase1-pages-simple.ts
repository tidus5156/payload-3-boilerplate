import { getPayload } from 'payload'
import config from '@payload-config'

const finishPages = async () => {
  const payload = await getPayload({ config })

  console.log('🚀 Creating remaining Phase 1 pages (simplified)...\n')

  // CONTACT PAGE
  try {
    console.log('Building Contact page...')
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Contact - Get Started with Allay Property Management',
        slug: 'contact',
        hero: {
          type: 'mediumImpact',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h1',
                  children: [{ type: 'text', text: 'Let\'s Talk About Your Property' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Get your free rental analysis and discover what your property could earn with professional management.',
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
                url: '#contact-form',
                label: 'Get Free Analysis',
                appearance: 'primary',
              },
            },
          ],
        },
        layout: [
          {
            blockType: 'formBlock',
            form: null,
            enableIntro: true,
            introContent: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    tag: 'h2',
                    children: [{ type: 'text', text: 'Request Your Free Rental Analysis' }],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Fill out the form below and we\'ll contact you within 2 hours during business days with a comprehensive market analysis for your property.',
                      },
                    ],
                  },
                ],
              },
            },
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
                        children: [{ type: 'text', text: 'Contact Information' }],
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'Phone: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: '(404) 555-0123',
                          },
                        ],
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'Email: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'info@allaypm.com',
                          },
                        ],
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'Office Hours: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Monday-Friday 9AM-6PM, Saturday 10AM-2PM',
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
        ],
        _status: 'published',
      },
    })
    console.log('✅ Contact page created')
  } catch (error) {
    console.error('❌ Error:', error)
  }

  // FOR RESIDENTS PAGE
  try {
    console.log('Building For Residents page...')
    await payload.create({
      collection: 'pages',
      data: {
        title: 'For Residents - Find Your Atlanta Home',
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
                  children: [{ type: 'text', text: 'Find Your Perfect Atlanta Home' }],
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
                url: '#search',
                label: 'Search Properties',
                appearance: 'primary',
              },
            },
          ],
        },
        layout: [
          {
            blockType: 'archive',
            populateBy: 'collection',
            relationTo: 'properties',
            limit: 12,
            categories: [],
          },
          {
            blockType: 'iconGrid',
            heading: 'Why Rent with Allay',
            subheading: 'More than just a place to live',
            columns: 'two',
            items: [
              {
                icon: 'tool',
                iconColor: 'skyBlue',
                title: 'Responsive Maintenance',
                description: '24/7 emergency line with fast, professional repairs when you need them.',
              },
              {
                icon: 'dollar',
                iconColor: 'warmGold',
                title: 'Easy Online Payments',
                description: 'Multiple payment options with convenient auto-pay available.',
              },
              {
                icon: 'users',
                iconColor: 'sageGreen',
                title: 'Helpful Team',
                description: 'Real people who care about your experience and respond quickly.',
              },
              {
                icon: 'home',
                iconColor: 'skyBlue',
                title: 'Quality Properties',
                description: 'Well-maintained homes in great Atlanta neighborhoods.',
              },
            ],
          },
        ],
        _status: 'published',
      },
    })
    console.log('✅ For Residents page created')
  } catch (error) {
    console.error('❌ Error:', error)
  }

  console.log('\n🎉 Phase 1 pages complete!')
  process.exit(0)
}

finishPages()
