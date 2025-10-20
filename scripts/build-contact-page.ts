import { getPayload } from 'payload'
import config from '@payload-config'

const buildContactPage = async () => {
  const payload = await getPayload({ config })

  console.log('🔨 Building Contact page...')

  try {
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'contact',
        },
      },
    })

    const contactLayout = [
      {
        blockType: 'content',
        columns: [
          {
            size: 'twoThirds',
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
                        text: 'Get Your Free Rental Analysis',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: "Ready to see what your property could earn? We'll provide a comprehensive market analysis showing exactly what your property should rent for in today's Atlanta market—completely free with no obligation.",
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: "Contact us today to schedule your free consultation. We'll discuss your property, answer all your questions, and show you how Allay Property Management can maximize your rental income while minimizing your stress.",
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            size: 'oneThird',
            richText: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    tag: 'h3',
                    children: [
                      {
                        type: 'text',
                        text: 'Quick Response',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'We respond to all inquiries within 2 hours during business days. Need help now? Call us directly!',
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
        heading: 'Contact Information',
        subheading: 'Get in touch with our team',
        columns: 'two',
        items: [
          {
            icon: 'phone',
            iconColor: 'skyBlue',
            title: 'Call Us',
            description:
              'Phone: (404) 555-0123\n\nMonday-Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed\n\n24/7 Emergency Maintenance Line Available',
          },
          {
            icon: 'file',
            iconColor: 'warmGold',
            title: 'Email Us',
            description:
              'General Inquiries: info@allaypm.com\n\nOwner Support: owners@allaypm.com\n\nResident Support: residents@allaypm.com\n\nTypical response time: Under 2 hours',
          },
          {
            icon: 'map',
            iconColor: 'sageGreen',
            title: 'Visit Our Office',
            description:
              'Allay Property Management\nc/o RE/MAX Metro Atlanta\n[Office Address]\nAtlanta, GA 30000\n\nOffice Hours: Monday-Friday 9AM-6PM\nSaturday by appointment',
          },
          {
            icon: 'clock',
            iconColor: 'skyBlue',
            title: 'Schedule a Consultation',
            description:
              "Prefer to meet in person or over video? Schedule a free consultation at your convenience. We'll discuss your property and show you how we can help maximize your investment.",
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
                        text: 'What to Expect When You Contact Us',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: "When you reach out to Allay Property Management, here's what happens next:",
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
                            text: 'Quick Response: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: "We'll get back to you within 2 hours during business days to schedule a convenient time to talk.",
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Initial Consultation: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: "A 20-30 minute phone or video call where we learn about your property, your goals, and answer all your questions. No pressure, no obligation.",
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Free Rental Analysis: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'We provide a comprehensive market analysis showing what your property should rent for, expected annual income, and optimization recommendations.',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Property Evaluation: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: "If you decide to move forward, we'll schedule an in-person walkthrough to assess condition and take professional photos.",
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Get Started: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: "Review our simple management agreement, and we'll immediately begin marketing your property to find the perfect resident.",
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
                        text: 'The entire process from first contact to signed lease typically takes 4-6 weeks.',
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
        headline: 'Ready to Get Started?',
        subheadline:
          "Let's talk about your property. Call us at (404) 555-0123 or email info@allaypm.com to schedule your free consultation and rental analysis.",
        primaryCTA: {
          text: 'Call (404) 555-0123',
          url: 'tel:+14045550123',
        },
        secondaryCTA: {
          text: 'Email Us',
          url: 'mailto:info@allaypm.com',
        },
        backgroundColor: 'deepNavy',
      },
    ]

    const pageData = {
      title: 'Contact Us - Get Started | Allay Property Management',
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
                children: [
                  {
                    type: 'text',
                    text: "Let's Talk About Your Property",
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Get your free rental analysis and discover what your property could earn with professional management. No obligation, no pressure—just expert advice.',
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
              url: 'tel:+14045550123',
              label: 'Call (404) 555-0123',
              appearance: 'primary',
            },
          },
          {
            link: {
              type: 'custom',
              url: 'mailto:info@allaypm.com',
              label: 'Email Us',
              appearance: 'outline',
            },
          },
        ],
      },
      layout: contactLayout,
      _status: 'published',
    }

    let result
    if (existingPages.docs.length > 0) {
      result = await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: pageData,
      })
      console.log('✅ Contact page updated successfully!')
    } else {
      result = await payload.create({
        collection: 'pages',
        data: pageData,
      })
      console.log('✅ Contact page created successfully!')
    }

    console.log(`   Page ID: ${result.id}`)
    console.log(`   Slug: ${result.slug}`)
    console.log(`   Total blocks: ${result.layout?.length || 0}`)

    console.log('\n✨ Contact page is ready at /contact')
  } catch (error) {
    console.error('❌ Error building Contact page:', error)
    process.exit(1)
  }

  process.exit(0)
}

buildContactPage()
