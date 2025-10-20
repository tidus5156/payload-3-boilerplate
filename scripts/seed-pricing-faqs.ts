import { getPayload } from 'payload'
import config from '@payload-config'

const pricingFAQs = [
  {
    question: 'What are your property management fees?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Our full-service property management fee is 8-10% of monthly rent (or a flat monthly rate for lower-rent properties). This includes unlimited marketing, tenant screening, lease preparation, rent collection, maintenance coordination, inspections, financial reporting, and legal compliance. We also charge a one-time leasing fee of 50% of first month\'s rent when we place a new tenant.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: true,
  },
  {
    question: 'Are there any setup or onboarding fees?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'No. We do not charge any setup fees, onboarding fees, or administrative fees to start managing your property. Your only costs are the monthly management fee and the one-time leasing fee when we place a tenant.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: true,
  },
  {
    question: 'Do you mark up maintenance and repairs?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'No. You pay the contractor\'s actual invoice price with zero markup. We believe in complete transparency—we make our money from management fees, not hidden markups on repairs. All invoices are passed through to you at cost.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: true,
  },
  {
    question: 'What if my property sits vacant?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'You only pay management fees on collected rent. If your property is vacant, you pay nothing for that month. However, we offer a 30-day lease guarantee: if we don\'t lease your property within 30 days of active marketing, we reduce our management fee by 50% until it\'s leased.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: true,
  },
  {
    question: 'How much is the leasing fee?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Our leasing fee is 50% of the first month\'s rent, charged one time when we successfully place a qualified tenant. This covers professional photography, listing creation and syndication, property showings, application processing, comprehensive tenant screening, lease preparation, and move-in coordination.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'What about lease renewals?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Lease renewals are $150 or 25% of one month\'s rent (whichever is less). This covers market analysis to determine appropriate renewal rent, negotiation with the existing tenant, lease document preparation, and renewal coordination. If the tenant renews at the same rate with no changes, there is no renewal fee.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'Are there cancellation or termination fees?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'No. Our management agreement requires only 30 days written notice to terminate, with no cancellation penalty or early termination fee. We believe in earning your business every month through excellent service, not trapping you in a contract.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: true,
  },
  {
    question: 'Do you charge for property inspections?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'No. All property inspections are included in your monthly management fee: move-in inspection with photo documentation, quarterly drive-by inspections, detailed annual interior inspections, and move-out inspection. No additional charges.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'What if I need to evict a tenant?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We coordinate the eviction process for $350, which covers notice preparation, court filing coordination, documentation, and communication with your attorney. You are responsible for actual attorney fees and court costs, which typically range from $800-1,500 total. Evictions are rare with our rigorous screening process.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'How do I receive my rental income?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We distribute owner proceeds via ACH direct deposit by the 10th of each month (or the next business day). You receive rent collected minus any approved expenses (repairs, management fees, etc.). You can view detailed financial statements 24/7 through your online owner portal.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'Do you offer tenant placement only (no ongoing management)?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Yes. Our tenant placement service costs 75% of first month\'s rent (one-time fee) and includes everything needed to find and place a qualified tenant: professional marketing, screening, lease preparation, and move-in coordination. After placement, you handle ongoing management yourself.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'What is included in the monthly management fee?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Everything needed to manage your property: rent collection and enforcement, tenant communication, 24/7 maintenance coordination, property inspections, financial reporting, online owner and tenant portals, lease enforcement, legal compliance, vendor management, emergency response, and lease renewal negotiation.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'Can I choose a percentage or flat fee?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Yes. For most properties, we offer a choice between a percentage of monthly rent (8-10% depending on property value) or a flat monthly fee. Flat fees work well for higher-value properties where a percentage would exceed the value of services provided. We\'ll recommend the option that makes most sense for your situation.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'Do you charge for coordinating contractors?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'No. Coordinating maintenance and repairs is included in your monthly management fee. We obtain multiple bids for major work, schedule repairs, supervise contractor work, and ensure quality completion—all at no additional charge beyond the contractor\'s actual invoice.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'What if the tenant damages my property?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We deduct repair costs from the tenant\'s security deposit and pursue the tenant for any amounts exceeding the deposit. There are no additional fees for handling security deposit deductions or pursuing tenant-caused damage claims.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'How do you handle emergency repairs?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We maintain a 24/7 emergency hotline and can authorize emergency repairs up to $500 without prior approval (you set your threshold). For urgent issues over your threshold, we contact you immediately for approval. Emergency coordination is included in your management fee—you only pay the contractor\'s actual cost.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'Do multi-property discounts exist?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Yes. We offer volume discounts for owners with multiple properties: 3-5 properties receive 5% discount on management fees, 6-10 properties receive 10% discount, 10+ properties receive custom pricing. Contact us to discuss portfolio management pricing.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'What payment methods do you accept from owners?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We automatically deduct fees from collected rent before distributing proceeds to you, so you never need to pay us separately. If you need to pay for a specific service (like initial property preparation), we accept ACH transfer, check, or credit card.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'Is there a minimum contract period?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'No. While our management agreement is structured as annual, you can terminate with 30 days written notice at any time with no penalty. We don\'t believe in forcing owners to stay—we earn your continued business through excellent service.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
  {
    question: 'Do you charge extra for pet-friendly properties?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'No. Managing pet-friendly properties costs the same as non-pet properties. However, we do recommend pet deposits and monthly pet rent, which you keep to offset potential pet-related damage. We help you set competitive pet policies that maximize your rental pool while protecting your investment.',
              },
            ],
          },
        ],
      },
    },
    category: 'pricing',
    featured: false,
  },
]

const seedPricingFAQs = async () => {
  const payload = await getPayload({ config })

  console.log('💰 Seeding pricing FAQs...\n')

  let created = 0
  let updated = 0
  let skipped = 0

  for (const faq of pricingFAQs) {
    try {
      const existing = await payload.find({
        collection: 'faqs',
        where: {
          question: {
            equals: faq.question,
          },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'faqs',
          id: existing.docs[0].id,
          data: {
            ...faq,
            _status: 'published',
          },
        })
        console.log(`✅ Updated: ${faq.question}`)
        updated++
      } else {
        await payload.create({
          collection: 'faqs',
          data: {
            ...faq,
            _status: 'published',
          },
        })
        console.log(`✅ Created: ${faq.question}`)
        created++
      }
    } catch (error) {
      console.error(`❌ Error with "${faq.question}":`, error)
      skipped++
    }
  }

  console.log(`\n📊 Summary:`)
  console.log(`   Created: ${created}`)
  console.log(`   Updated: ${updated}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Total: ${pricingFAQs.length}`)
  console.log(`\n✨ Pricing FAQs seeded successfully!`)
  console.log(`   These FAQs will appear on the Pricing page`)

  process.exit(0)
}

seedPricingFAQs()
