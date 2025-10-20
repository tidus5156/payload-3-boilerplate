import { getPayload } from 'payload'
import config from '@payload-config'

const buildPricingPage = async () => {
  const payload = await getPayload({ config })

  console.log('🔨 Building Pricing page...')

  try {
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'pricing',
        },
      },
    })

    const pricingLayout = [
      // Section 2: Detailed Pricing Breakdown (PricingComparison)
      {
        blockType: 'pricingComparison',
        heading: 'Choose Your Service Level',
        subheading: 'Flexible options to match your needs and investment goals',
        plans: [
          {
            name: 'Full-Service Management',
            price: '$150/month or 8%',
            priceDescription: 'whichever you prefer',
            description: 'Complete hands-off property management with everything included. No hidden fees ever.',
            features: [
              { feature: 'Unlimited property marketing & advertising', included: true },
              { feature: 'Comprehensive tenant screening & placement', included: true },
              { feature: 'Lease preparation & execution', included: true },
              { feature: 'Monthly rent collection (ACH auto-pay)', included: true },
              { feature: '24/7 maintenance coordination', included: true },
              { feature: 'Property inspections (move-in, quarterly, move-out)', included: true },
              { feature: 'Detailed financial reporting & owner portal', included: true },
              { feature: 'Legal compliance & eviction support', included: true },
              { feature: 'Tenant communication & relations', included: true },
              { feature: 'Annual lease renewal negotiations', included: true },
              { feature: 'Setup/onboarding fees', included: false },
              { feature: 'Maintenance markup', included: false },
              { feature: 'Cancellation fees', included: false },
            ],
            highlighted: true,
            ctaText: 'Get Custom Quote',
            ctaUrl: '/contact',
          },
          {
            name: 'Tenant Placement Only',
            price: '75%',
            priceDescription: 'of first month rent (one-time)',
            description: 'Professional tenant placement, then you manage day-to-day operations yourself.',
            features: [
              { feature: 'Professional property marketing', included: true },
              { feature: 'Property showings & inquiries', included: true },
              { feature: 'Comprehensive tenant screening', included: true },
              { feature: 'Lease preparation & execution', included: true },
              { feature: 'Move-in coordination', included: true },
              { feature: 'Security deposit handling', included: true },
              { feature: '30-day tenant guarantee', included: true },
              { feature: 'Ongoing rent collection', included: false },
              { feature: 'Maintenance coordination', included: false },
              { feature: 'Property inspections', included: false },
              { feature: 'Financial reporting', included: false },
              { feature: 'Legal/eviction support', included: false },
            ],
            highlighted: false,
            ctaText: 'Learn More',
            ctaUrl: '/contact',
          },
        ],
      },

      // Section 3: What We DON'T Charge For
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
                        text: "What Other Property Managers Charge That We Don't",
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Many property management companies nickel-and-dime owners with hidden fees. We believe in complete transparency. Here are fees you\'ll NEVER see on your Allay invoice:',
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
                            text: '❌ Setup/onboarding fees ($200-500 at other companies)',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: '❌ Advertising/marketing fees ($100-300 at other companies)',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: '❌ Monthly portal/technology fees ($10-25/month at other companies)',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: '❌ Maintenance markups (10-20% markup at other companies)',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: '❌ Inspection fees ($75-150 per inspection at other companies)',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: '❌ Lease renewal processing fees ($150-300 at other companies)',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: '❌ Cancellation/early termination fees (3-6 months fees at other companies)',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: '❌ Administrative fees for simple tasks',
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
                        text: 'What we quote is what you pay. Period.',
                        format: 1,
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },

      // Section 4: Our Pricing Guarantees (IconGrid)
      {
        blockType: 'iconGrid',
        heading: 'Our Pricing Promises',
        subheading: 'Guarantees that protect your investment and your wallet',
        columns: 'two',
        items: [
          {
            icon: 'shield',
            iconColor: 'sageGreen',
            title: 'No Hidden Fees Guarantee',
            description:
              'What we quote is exactly what you pay. No surprise charges, no fine print, no creative billing. Complete transparency in every invoice.',
          },
          {
            icon: 'dollar',
            iconColor: 'warmGold',
            title: 'No Setup Charges',
            description:
              'Getting started is completely free. No onboarding fees, no setup costs, no initial charges. Your first payment is when we start managing your property.',
          },
          {
            icon: 'check',
            iconColor: 'skyBlue',
            title: 'No Cancellation Penalty',
            description:
              'Simple 30-day notice, that\'s it. No termination fees, no penalties, no hassle. We earn your business every month through great service, not contracts.',
          },
          {
            icon: 'tool',
            iconColor: 'sageGreen',
            title: 'No Maintenance Markup',
            description:
              'You pay exactly what the contractor charges—not a penny more. Many managers add 10-20% markups. We believe that\'s dishonest, so we don\'t do it.',
          },
          {
            icon: 'clock',
            iconColor: 'warmGold',
            title: '30-Day Lease Guarantee',
            description:
              'If we don\'t lease your property within 30 days, we reduce our management fee by 50% until it\'s leased. We put our money where our mouth is.',
          },
          {
            icon: 'home',
            iconColor: 'skyBlue',
            title: '12-Month Tenant Guarantee',
            description:
              'If our placed tenant leaves within 12 months, we find the next one completely free. No leasing fee, no charges—just our commitment to quality screening.',
          },
        ],
      },

      // Section 5: ROI Explanation
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
                        text: 'Is Professional Property Management Worth It?',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'Many property owners wonder if hiring a property manager makes financial sense. Let\'s look at the real numbers:',
                      },
                    ],
                  },
                  {
                    type: 'heading',
                    tag: 'h3',
                    children: [
                      {
                        type: 'text',
                        text: 'What Self-Management Really Costs:',
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
                            text: 'Your Time: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Average 10-15 hours/month per property. At $50/hour value, that\'s $500-750/month',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Longer Vacancy: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Self-managed properties average 45 days vacant vs. our 12 days = ~$4,000 lost income/year',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Bad Tenant Costs: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'One bad placement can cost $5,000-15,000 in lost rent, legal fees, and damages',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Missed Deductions: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Poor record-keeping means lost tax deductions worth $500-2,000/year',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Legal Mistakes: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Fair housing violations, improper evictions, and lease errors = potential $10,000+ liability',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'heading',
                    tag: 'h3',
                    children: [
                      {
                        type: 'text',
                        text: 'What Professional Management Delivers:',
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
                            text: 'Cost: ~$150-200/month ($1,800-2,400/year)',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Savings: $6,000-10,000/year in faster leasing, better tenants, tax optimization, legal protection',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Time Back: 120-180 hours/year to focus on your career, family, or finding more deals',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Net Benefit: $4,000-8,000/year increase in actual returns',
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
                        text: 'Property management isn\'t an expense—it\'s an investment that pays for itself many times over.',
                        format: 1,
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },

      // Section 6: Pricing FAQs (FAQAccordion) - using filter for now, will seed FAQ documents later
      {
        blockType: 'faqAccordion',
        heading: 'Pricing Questions Answered',
        subheading: 'Everything you need to know about our fees and billing',
        filterByCategory: ['pricing'],
        showFeaturedOnly: false,
        limit: 10,
        defaultExpanded: true,
        allowMultiple: false,
      },

      // Section 7: Final CTA
      {
        blockType: 'heroCTA',
        headline: 'Ready to See What Your Property Could Earn?',
        subheadline:
          'Get your free rental analysis and customized pricing quote. No obligation, no pressure—just expert advice on maximizing your Atlanta property investment.',
        primaryCTA: {
          text: 'Get Free Rental Analysis',
          url: '/contact',
        },
        secondaryCTA: {
          text: 'Schedule Pricing Call',
          url: '/contact',
        },
        backgroundColor: 'deepNavy',
      },
    ]

    const pageData = {
      title: 'Transparent Pricing - Allay Property Management',
      slug: 'pricing',
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
                    text: 'Transparent Pricing. No Hidden Fees. Ever.',
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'See exactly what you\'ll pay before you commit. Simple, honest pricing with no surprises—just professional property management that actually increases your ROI.',
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
              label: 'Get Custom Quote',
              appearance: 'primary',
            },
          },
          {
            link: {
              type: 'custom',
              url: '#pricing-details',
              label: 'View Pricing Details',
              appearance: 'outline',
            },
          },
        ],
      },
      layout: pricingLayout,
      _status: 'published',
    }

    let result
    if (existingPages.docs.length > 0) {
      result = await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: pageData,
      })
      console.log('✅ Pricing page updated successfully!')
    } else {
      result = await payload.create({
        collection: 'pages',
        data: pageData,
      })
      console.log('✅ Pricing page created successfully!')
    }

    console.log(`   Page ID: ${result.id}`)
    console.log(`   Slug: ${result.slug}`)
    console.log(`   Total blocks: ${result.layout?.length || 0}`)

    console.log('\n✨ Pricing page is ready at /pricing')
  } catch (error) {
    console.error('❌ Error building Pricing page:', error)
    process.exit(1)
  }

  process.exit(0)
}

buildPricingPage()
