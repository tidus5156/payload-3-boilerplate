import { getPayload } from 'payload'
import config from '@payload-config'

const rebuildPropertyOwnersPage = async () => {
  const payload = await getPayload({ config })

  console.log('🔄 Rebuilding Property Owners page with complete CLAUDE.md specs...')

  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'property-owners',
        },
      },
    })

    if (pages.docs.length === 0) {
      console.log('❌ No property-owners page found')
      process.exit(1)
    }

    const page = pages.docs[0]
    console.log(`✓ Found page: ${page.title} (ID: ${page.id})`)

    // Complete layout with all required sections
    const newLayout = [
      // Section 1: Why Hire a Property Manager (Comparison)
      {
        blockType: 'iconGrid',
        heading: 'Self-Managing vs Professional Management',
        subheading: 'See the difference professional property management makes',
        columns: 'two',
        items: [
          {
            icon: 'home',
            iconColor: 'skyBlue',
            title: 'When You Self-Manage',
            description:
              'Late-night maintenance calls. Tenant screening uncertainty. Legal compliance risks. Marketing challenges. Inconsistent rent collection. Time consumption. Stress and worry about every decision.',
          },
          {
            icon: 'shield',
            iconColor: 'sageGreen',
            title: 'With Allay Property Management',
            description:
              '24/7 emergency hotline. Rigorous screening process. Complete legal protection. Professional marketing. Guaranteed rent collection. Zero time investment. Complete peace of mind.',
          },
        ],
      },

      // Section 2: The Allay Promise (Guarantees)
      {
        blockType: 'iconGrid',
        heading: 'The Allay Promise',
        subheading: 'Our guarantees protect your investment and give you confidence',
        columns: 'three',
        items: [
          {
            icon: 'clock',
            iconColor: 'warmGold',
            title: '30-Day Lease Guarantee',
            description:
              'Your property leased within 30 days or we reduce our fees. We stand behind our marketing and leasing expertise.',
          },
          {
            icon: 'shield',
            iconColor: 'warmGold',
            title: '12-Month Rent Guarantee',
            description:
              'If our resident leaves within 12 months, we find the next one free. We only place quality, long-term residents.',
          },
          {
            icon: 'dollar',
            iconColor: 'warmGold',
            title: 'Transparent Pricing Guarantee',
            description:
              'What we quote is what you pay. No hidden fees, no surprise charges, no fine print. Period.',
          },
          {
            icon: 'phone',
            iconColor: 'sageGreen',
            title: 'Response Time Guarantee',
            description:
              'We respond to all owner inquiries within 2 hours during business days. You\'ll never be left wondering.',
          },
          {
            icon: 'check',
            iconColor: 'sageGreen',
            title: 'Quality Workmanship Guarantee',
            description:
              'All maintenance and repairs are completed by licensed, insured contractors. We stand behind all work.',
          },
        ],
      },

      // Section 3: Owner Portal Demo
      {
        blockType: 'iconGrid',
        heading: 'Your Investment Dashboard',
        subheading:
          'Access everything you need 24/7 through our comprehensive owner portal',
        columns: 'three',
        items: [
          {
            icon: 'file',
            iconColor: 'skyBlue',
            title: 'Monthly Financial Statements',
            description:
              'Detailed income and expense reports delivered automatically. Track every dollar with complete transparency.',
          },
          {
            icon: 'home',
            iconColor: 'skyBlue',
            title: 'Property Performance',
            description:
              'Real-time occupancy status, maintenance history, and property condition updates at your fingertips.',
          },
          {
            icon: 'tool',
            iconColor: 'skyBlue',
            title: 'Maintenance Requests',
            description:
              'View all maintenance requests, approvals, and work order status. Complete photo documentation included.',
          },
          {
            icon: 'file',
            iconColor: 'sageGreen',
            title: 'Document Library',
            description:
              'Access leases, inspections, notices, and all important documents anytime, anywhere.',
          },
          {
            icon: 'phone',
            iconColor: 'sageGreen',
            title: 'Communication Center',
            description:
              'Direct messaging with your property manager. Review all correspondence in one place.',
          },
          {
            icon: 'dollar',
            iconColor: 'sageGreen',
            title: 'Payment History',
            description:
              'Complete transaction history and 1099 tax documents. Everything you need for tax season.',
          },
        ],
      },

      // Section 4: How We Maximize Your Income
      {
        blockType: 'iconGrid',
        heading: '5 Ways We Increase Your Rental Income',
        subheading: 'Strategic property management that maximizes returns',
        columns: 'three',
        items: [
          {
            icon: 'dollar',
            iconColor: 'warmGold',
            title: 'Optimal Pricing Strategy',
            description:
              'Market analysis and data-driven pricing ensure you get top dollar without extended vacancies. We know exactly what residents will pay.',
          },
          {
            icon: 'clock',
            iconColor: 'warmGold',
            title: 'Reduced Vacancy',
            description:
              'Fast leasing (average 15 days) plus proactive renewals mean your property stays occupied and generating income.',
          },
          {
            icon: 'users',
            iconColor: 'skyBlue',
            title: 'Better Residents',
            description:
              'Rigorous screening reduces turnover and property damage. Quality residents stay longer and take better care of your investment.',
          },
          {
            icon: 'tool',
            iconColor: 'skyBlue',
            title: 'Preventive Maintenance',
            description:
              'Small fixes prevent big expenses. Regular inspections catch issues early, protecting your property value and reducing costs.',
          },
          {
            icon: 'home',
            iconColor: 'sageGreen',
            title: 'Professional Appeal',
            description:
              'Professional photos, virtual tours, and marketing attract premium residents willing to pay more for quality.',
          },
        ],
      },

      // Section 5: Tax Benefits
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
                        text: 'Property Management is Tax Deductible',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Property management fees are 100% tax deductible as a business expense. This reduces your taxable rental income and can result in significant tax savings. Our monthly statements clearly document all deductible expenses for easy tax preparation.',
                      },
                    ],
                  },
                  {
                    type: 'heading',
                    tag: 'h3',
                    children: [
                      {
                        type: 'text',
                        text: 'Other Deductible Expenses We Document:',
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
                            text: 'Maintenance and repairs',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Marketing and advertising costs',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Legal and professional fees',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Insurance premiums',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Utilities (if owner-paid)',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'HOA fees',
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
                        text: 'We provide detailed annual tax documentation including 1099 forms. Always consult your tax advisor for specific guidance on your situation.',
                        format: 2, // italic
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },

      // Section 6: What to Expect Timeline
      {
        blockType: 'processTimeline',
        heading: 'Your Journey with Allay',
        subheading: 'From consultation to consistent cash flow in 4-6 weeks',
        steps: [
          {
            title: 'Free Consultation & Analysis',
            description:
              'Schedule a 20-30 minute call to discuss your property and goals. We provide a comprehensive rental market analysis showing your income potential at no cost or obligation.',
            icon: 'phone',
          },
          {
            title: 'Property Evaluation & Agreement',
            description:
              'Our team conducts a thorough inspection to assess condition, identify needed repairs, and determine optimal rental pricing. Review and sign the management agreement.',
            icon: 'clipboard',
          },
          {
            title: 'Marketing & Leasing',
            description:
              'Professional photography, listing creation, showings, applicant screening, and lease signing. Average time to lease: 15 days.',
            icon: 'calendar',
          },
          {
            title: 'Ongoing Management',
            description:
              'Sit back and relax while we handle rent collection, maintenance coordination, inspections, renewals, and everything else. You just watch the deposits hit your account.',
            icon: 'check',
          },
        ],
        layout: 'horizontal',
      },

      // Section 7: Owner Resources (Downloadable Guides)
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
                        text: 'Helpful Resources for Property Owners',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Download our free guides to help you make informed decisions about your rental property investment.',
                      },
                    ],
                  },
                  {
                    type: 'heading',
                    tag: 'h3',
                    children: [
                      {
                        type: 'text',
                        text: 'Available Guides:',
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
                            text: '"Atlanta Property Owner\'s Tax Guide" - Maximize your deductions and understand tax implications',
                            format: 1, // bold
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: '"Understanding Georgia Landlord-Tenant Law" - Know your rights and responsibilities',
                            format: 1,
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: '"Maximizing Your Rental Property ROI" - Proven strategies to increase returns',
                            format: 1,
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: '"Property Maintenance Checklist" - Seasonal maintenance to protect your investment',
                            format: 1,
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: '"First-Time Property Owner\'s Guide" - Everything you need to know to get started',
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
                        text: 'Contact us to request these resources or download them from your owner portal.',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },

      // Section 8: Success Stories
      {
        blockType: 'testimonialsCarousel',
        heading: 'Real Results from Real Owners',
        subheading:
          'See how Allay Property Management has helped Atlanta property owners increase income and reduce stress',
        showOnlyFeatured: true,
        limit: 6,
      },

      // Section 9: Final CTA
      {
        blockType: 'heroCTA',
        headline: 'Ready to Experience Stress-Free Property Management?',
        subheadline:
          'Get your free rental analysis and discover what your property could earn with professional management. No obligation. Just expert advice.',
        primaryCTA: {
          text: 'Get Free Rental Analysis',
          url: '/contact',
        },
        secondaryCTA: {
          text: 'Call (404) 555-0100',
          url: 'tel:+14045550100',
        },
        backgroundColor: 'deepNavy',
      },
    ]

    // Update the page (include hero to fix validation error)
    const result = await payload.update({
      collection: 'pages',
      id: page.id,
      data: {
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
                      text: 'Maximize Your Rental Income with Professional Management',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Everything you need to know about professional property management in Atlanta. Make smarter decisions about your rental investment.',
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
                label: 'Get Free Rental Analysis',
                appearance: 'primary',
              },
            },
            {
              link: {
                type: 'custom',
                url: '/services',
                label: 'View Our Services',
                appearance: 'outline',
              },
            },
          ],
        },
        layout: newLayout,
      },
    })

    console.log('\n✅ Property Owners page rebuilt successfully!')
    console.log(`   Total blocks: ${result.layout?.length || 0}`)

    if (result.layout) {
      const blockTypes = result.layout.map((b: any) => b.blockType)
      console.log('\n   Block breakdown:')
      const counts: Record<string, number> = {}
      blockTypes.forEach((type: string) => {
        counts[type] = (counts[type] || 0) + 1
      })
      Object.entries(counts).forEach(([type, count]) => {
        console.log(`     - ${type}: ${count}`)
      })
    }

    console.log('\n✨ Property Owners page now complete with all CLAUDE.md sections!')
  } catch (error) {
    console.error('❌ Error rebuilding Property Owners page:', error)
    process.exit(1)
  }

  process.exit(0)
}

rebuildPropertyOwnersPage()
