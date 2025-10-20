import { getPayload } from 'payload'
import config from '@payload-config'

const ownerFAQs = [
  {
    question: 'What areas of Atlanta do you serve?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We manage properties throughout Metro Atlanta including Buckhead, Midtown, Decatur, Sandy Springs, Roswell, Alpharetta, Johns Creek, Marietta, Smyrna, Dunwoody, Brookhaven, and surrounding areas. We cover all of North Atlanta, East Atlanta, West Atlanta, and South Atlanta neighborhoods. If your property is in the Metro Atlanta area, we can help!',
              },
            ],
          },
        ],
      },
    },
    category: 'general',
    featured: true,
  },
  {
    question: 'How long does it take to lease my property?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Our average time to lease is 15-25 days from the day we start marketing. Most properties receive applications within the first week. If we don\'t lease your property within 30 days of active marketing, we reduce our management fee by 50% until it\'s leased—that\'s our 30-day lease guarantee.',
              },
            ],
          },
        ],
      },
    },
    category: 'leasing',
    featured: true,
  },
  {
    question: 'What is your tenant screening process?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We conduct comprehensive screening on every applicant: credit report review (minimum 620 score), criminal background check, eviction history search, employment verification, income verification (minimum 3x monthly rent), rental history from previous landlords, and identity verification. Only applicants who meet all our strict criteria are approved.',
              },
            ],
          },
        ],
      },
    },
    category: 'leasing',
    featured: true,
  },
  {
    question: 'Do I have to make repairs before listing my property?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Not necessarily. During our property evaluation, we\'ll recommend repairs that will maximize your rental income and minimize vacancy time. Some repairs are required (safety issues, code violations), while others are optional improvements that can command higher rent. We provide cost-benefit analysis so you can make informed decisions.',
              },
            ],
          },
        ],
      },
    },
    category: 'services',
    featured: false,
  },
  {
    question: 'How do you determine the right rental price?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We conduct a comprehensive market analysis comparing your property to recently leased comparable properties in your neighborhood. We analyze size, condition, location, amenities, school districts, and current market demand. Our goal is to find the optimal price that maximizes your income while minimizing vacancy time.',
              },
            ],
          },
        ],
      },
    },
    category: 'services',
    featured: true,
  },
  {
    question: 'What if my tenant damages the property?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We conduct a detailed move-out inspection with photo documentation and compare it to the move-in condition. Repair costs for tenant-caused damage are deducted from their security deposit. If damages exceed the deposit, we pursue the tenant for the balance through our collections process. You\'re never responsible for tenant-caused damage.',
              },
            ],
          },
        ],
      },
    },
    category: 'maintenance',
    featured: false,
  },
  {
    question: 'Do you handle emergency maintenance calls?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Yes. We provide a 24/7 emergency hotline for residents to report urgent issues like water leaks, no heat/AC in extreme weather, electrical hazards, or security concerns. We can authorize emergency repairs up to your pre-approved threshold (typically $500) without contacting you first. For larger repairs, we\'ll contact you immediately for approval.',
              },
            ],
          },
        ],
      },
    },
    category: 'maintenance',
    featured: false,
  },
  {
    question: 'Can I see financial reports anytime?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Absolutely. Your owner portal provides 24/7 access to detailed financial statements, transaction history, maintenance records, inspection reports, lease documents, and more. You also receive monthly financial statements via email showing all income and expenses for the month.',
              },
            ],
          },
        ],
      },
    },
    category: 'services',
    featured: false,
  },
  {
    question: 'What happens if my tenant breaks the lease early?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Our lease agreements include early termination clauses that protect you financially. Typically, the tenant is responsible for rent until we find a replacement tenant or until the lease end date (whichever comes first). We immediately begin remarketing the property to minimize vacancy. Any unpaid rent comes from their security deposit.',
              },
            ],
          },
        ],
      },
    },
    category: 'legal',
    featured: false,
  },
  {
    question: 'Are management fees tax deductible?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Yes! Property management fees are 100% tax deductible as a business expense for your rental property. We provide detailed annual financial statements and 1099 forms to make tax filing simple. Consult your tax advisor for specific guidance on your situation.',
              },
            ],
          },
        ],
      },
    },
    category: 'general',
    featured: false,
  },
]

const residentFAQs = [
  {
    question: 'How do I apply for a rental property?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Browse our available properties, schedule a showing, then complete our online application. You\'ll need to provide personal information, employment details, rental history, and authorize background and credit checks. The application fee is $50 per adult applicant. We typically respond within 24-48 hours.',
              },
            ],
          },
        ],
      },
    },
    category: 'leasing',
    featured: true,
  },
  {
    question: 'What are your application requirements?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We require: minimum credit score of 620, verifiable income of at least 3x monthly rent, positive rental history from previous landlords, clean criminal background check, stable employment history, and no recent evictions. We want to help you qualify—contact us if you have questions about your specific situation.',
              },
            ],
          },
        ],
      },
    },
    category: 'leasing',
    featured: true,
  },
  {
    question: 'When is rent due and how do I pay?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Rent is due on the 1st of each month with a grace period until the 5th. You can pay online through your resident portal via ACH (free), debit card, or credit card. We also offer convenient auto-pay so you never miss a payment. Late fees apply after the 5th per your lease agreement.',
              },
            ],
          },
        ],
      },
    },
    category: 'general',
    featured: true,
  },
  {
    question: 'How do I submit a maintenance request?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Log into your resident portal and submit a maintenance request 24/7. Include photos if possible and describe the issue in detail. For true emergencies (water leaks, no heat/AC, electrical hazards, security issues), call our 24/7 emergency hotline immediately at the number provided in your welcome packet.',
              },
            ],
          },
        ],
      },
    },
    category: 'maintenance',
    featured: true,
  },
  {
    question: 'Are pets allowed?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Many of our properties are pet-friendly! Pet policies vary by property and owner preference. Check the individual property listing or ask during your showing. Pet-friendly properties typically require a pet deposit ($250-500) and monthly pet rent ($25-50 per pet). Breed and size restrictions may apply.',
              },
            ],
          },
        ],
      },
    },
    category: 'general',
    featured: true,
  },
  {
    question: 'Do I need renters insurance?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Yes, all residents are required to maintain renters insurance with minimum $100,000 liability coverage. This protects your personal belongings and provides liability protection. Renters insurance is very affordable (typically $15-30/month) and can usually be added to your existing auto insurance policy for additional savings.',
              },
            ],
          },
        ],
      },
    },
    category: 'legal',
    featured: false,
  },
  {
    question: 'Can I have roommates?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Yes, but all adults (18+) who will be living in the property must complete applications and pass our screening process. Each adult will be added to the lease as a tenant and will be jointly and severally liable for rent. Everyone on the lease has equal rights and responsibilities.',
              },
            ],
          },
        ],
      },
    },
    category: 'leasing',
    featured: false,
  },
  {
    question: 'What utilities am I responsible for?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'This varies by property and will be clearly stated in your lease. Typically, tenants are responsible for electricity, gas, water/sewer, trash, internet, and cable. Some properties include certain utilities. Always check your lease for specific details about utility responsibilities.',
              },
            ],
          },
        ],
      },
    },
    category: 'general',
    featured: false,
  },
  {
    question: 'Can I paint or make changes to the property?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Any alterations to the property require written approval from your property manager. This includes painting, installing fixtures, removing fixtures, wall anchors for TVs, etc. Small nail holes for hanging pictures are generally acceptable. Request approval before making any changes to avoid security deposit deductions.',
              },
            ],
          },
        ],
      },
    },
    category: 'general',
    featured: false,
  },
  {
    question: 'How do I renew my lease?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We\'ll contact you 90 days before your lease ends to discuss renewal options. We\'ll present the new rental rate (based on current market conditions) and new lease terms. If you wish to renew, simply sign the renewal lease electronically—it\'s that simple. If not renewing, you\'ll need to provide proper notice per your lease terms (typically 60 days).',
              },
            ],
          },
        ],
      },
    },
    category: 'leasing',
    featured: false,
  },
  {
    question: 'What if I need to break my lease early?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Review your lease for early termination clauses. Generally, you\'re responsible for rent until the lease ends or we find a replacement tenant (whichever comes first). We work with you to re-market the property quickly to minimize your financial obligation. Some circumstances (military deployment, job relocation) may have special provisions.',
              },
            ],
          },
        ],
      },
    },
    category: 'legal',
    featured: false,
  },
  {
    question: 'How do I get my security deposit back?',
    answer: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Leave the property in the same condition as move-in (normal wear and tear excepted), clean thoroughly, complete all requested repairs, provide proper notice, and return all keys and access devices. We\'ll conduct a move-out inspection and return your deposit within 30 days per Georgia law, minus any deductions for damages or unpaid charges. You\'ll receive an itemized statement.',
              },
            ],
          },
        ],
      },
    },
    category: 'legal',
    featured: false,
  },
]

const seedOwnerResidentFAQs = async () => {
  const payload = await getPayload({ config })

  console.log('📋 Seeding Owner and Resident FAQs...\n')

  let created = 0
  let updated = 0
  let skipped = 0

  // Seed Owner FAQs
  console.log('👤 Processing Owner FAQs...')
  for (const faq of ownerFAQs) {
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
            published: true,
          },
        })
        console.log(`✅ Updated: ${faq.question}`)
        updated++
      } else {
        await payload.create({
          collection: 'faqs',
          data: {
            ...faq,
            published: true,
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

  // Seed Resident FAQs
  console.log('\n🏠 Processing Resident FAQs...')
  for (const faq of residentFAQs) {
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
            published: true,
          },
        })
        console.log(`✅ Updated: ${faq.question}`)
        updated++
      } else {
        await payload.create({
          collection: 'faqs',
          data: {
            ...faq,
            published: true,
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
  console.log(
    `   Total: ${ownerFAQs.length + residentFAQs.length} (${ownerFAQs.length} owner + ${residentFAQs.length} resident)`,
  )
  console.log(`\n✨ Owner and Resident FAQs seeded successfully!`)

  process.exit(0)
}

seedOwnerResidentFAQs()
