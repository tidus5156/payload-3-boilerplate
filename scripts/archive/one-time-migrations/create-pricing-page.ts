import { getPayload } from 'payload'
import config from '../src/payload.config'

const createPricingPage = async () => {
  const payload = await getPayload({ config })

  console.log('🔄 Creating pricing page...\n')

  try {
    const pricingPage = await payload.create({
      collection: 'pages',
      data: {
        title: 'Transparent Pricing - No Hidden Fees | Allay Property Management',
        slug: 'owners-pricing',
        _status: 'published',
        meta: {
          title: 'Pricing & Fees - Transparent Property Management | Allay',
          description:
            'See exactly what you\'ll pay with Allay Property Management. Simple, honest pricing with no hidden fees. Compare our rates and get a custom quote for your Atlanta rental property.',
        },
        hero: {
          type: 'mediumImpact',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  children: [
                    {
                      type: 'text',
                      text: 'Transparent Pricing. No Hidden Fees. Ever.',
                    },
                  ],
                  tag: 'h1',
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'See exactly what you\'ll pay before you commit. Simple, honest pricing for Atlanta property management.',
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
                label: 'Get Custom Quote',
                url: '/contact',
                appearance: 'primary',
              },
            },
          ],
        },
        layout: [
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
                        children: [
                          {
                            type: 'text',
                            text: 'Simple, Honest Pricing',
                          },
                        ],
                        tag: 'h2',
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'We believe in complete transparency. What we quote is what you pay—no surprises, no hidden fees, no fine print.',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        children: [
                          {
                            type: 'text',
                            text: 'Full-Service Property Management',
                          },
                        ],
                        tag: 'h3',
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'Monthly Management Fee: 8% of monthly rent collected',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        children: [
                          {
                            type: 'text',
                            text: 'What\'s Included:',
                          },
                        ],
                        tag: 'h4',
                      },
                      {
                        type: 'list',
                        listType: 'bullet',
                        children: [
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'Unlimited property marketing and advertising',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'Comprehensive tenant screening and placement',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'Professional lease preparation and execution',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'Monthly rent collection with auto-pay',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '24/7 emergency maintenance coordination',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'Regular property inspections with photo documentation',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'Detailed monthly financial reporting',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '24/7 owner portal access',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'Legal compliance and eviction support',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'Annual tax documentation (1099 forms)',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        children: [
                          {
                            type: 'text',
                            text: 'Additional Fees',
                          },
                        ],
                        tag: 'h3',
                      },
                      {
                        type: 'list',
                        listType: 'bullet',
                        children: [
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'Leasing Fee: 50% of first month\'s rent (one-time, only when we place a new tenant)',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'Lease Renewal Fee: $150 (optional, only if lease is renewed)',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'Eviction Coordination: $400 (rare, only if needed)',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        children: [
                          {
                            type: 'text',
                            text: 'What We Don\'t Charge For',
                          },
                        ],
                        tag: 'h3',
                      },
                      {
                        type: 'list',
                        listType: 'bullet',
                        children: [
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '✓ Setup/onboarding: FREE',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '✓ Marketing materials and photography: FREE',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '✓ Owner portal access: FREE',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '✓ Monthly financial reports: FREE',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '✓ Maintenance markup: NONE (you pay contractor prices only)',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '✓ Cancellation fees: NONE (30-day notice)',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        children: [
                          {
                            type: 'text',
                            text: 'Tenant Placement Only',
                          },
                        ],
                        tag: 'h2',
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'One-Time Fee: 50% of first month\'s rent',
                          },
                        ],
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'Perfect for experienced owners who want to self-manage but need help finding quality tenants.',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        children: [
                          {
                            type: 'text',
                            text: 'Included:',
                          },
                        ],
                        tag: 'h4',
                      },
                      {
                        type: 'list',
                        listType: 'bullet',
                        children: [
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '✓ Professional property marketing',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '✓ Property showings coordination',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '✓ Comprehensive tenant screening',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '✓ Lease preparation and signing',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '✓ Move-in coordination',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '✓ 30-day lease guarantee',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        children: [
                          {
                            type: 'text',
                            text: 'Our Pricing Guarantees',
                          },
                        ],
                        tag: 'h2',
                      },
                      {
                        type: 'list',
                        listType: 'number',
                        children: [
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'No Hidden Fees: What we quote is what you pay',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'No Setup Charges: Get started free',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'No Cancellation Penalty: 30-day notice, that\'s it',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: 'No Maintenance Markup: You pay contractor prices only',
                              },
                            ],
                          },
                          {
                            type: 'listitem',
                            children: [
                              {
                                type: 'text',
                                text: '30-Day Lease Guarantee: Property leased in 30 days or we reduce fees',
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
        ],
      },
    })

    console.log('✅ Pricing page created successfully!')
    console.log('   ID:', pricingPage.id)
    console.log('   Slug:', pricingPage.slug)
    console.log('   URL: /owners-pricing')
  } catch (error) {
    console.error('❌ Error creating pricing page:', error)
    process.exit(1)
  }

  process.exit(0)
}

createPricingPage()
