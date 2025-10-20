import { getPayload } from 'payload'
import config from '@payload-config'

const buildAboutPage = async () => {
  const payload = await getPayload({ config })

  console.log('🔨 Building About Us page...')

  try {
    // Check if About page exists
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'about',
        },
      },
    })

    const aboutLayout = [
      // Section 2: Our Story
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
                        text: 'How Allay Property Management Was Born',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: "Growing up in Atlanta, we witnessed firsthand how rental property ownership can be both incredibly rewarding and frustratingly complex. Too many property owners were stuck managing properties themselves—fielding late-night maintenance calls, dealing with difficult residents, and constantly worrying about legal compliance. Others hired property managers who overpromised and underdelivered, with hidden fees and poor communication making ownership more stressful than it needed to be.",
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'We founded Allay Property Management on a simple belief: property ownership should create financial freedom, not consume your time and energy. Our name reflects our mission—to allay the worries and stress of property ownership while maximizing your investment returns.',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: "By combining deep Atlanta market expertise with the powerful resources of RE/MAX Metro Atlanta, we've built a property management company that delivers results other managers simply can't match. Complete transparency in pricing. Guaranteed leasing timelines. Proactive communication. And most importantly, genuine care for your investment success.",
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: "Today, we manage properties across Metro Atlanta for owners who value professionalism, honesty, and results. Every decision we make is guided by one question: 'Is this what's best for our property owners?' That commitment has earned us a client retention rate that sets the standard in our industry.",
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },

      // Section 3: Our Team (TeamGrid block)
      {
        blockType: 'teamGrid',
        heading: 'Meet the Allay Team',
        subheading:
          'Experienced professionals dedicated to maximizing your investment and minimizing your stress',
        displayAll: true,
      },

      // Section 4: RE/MAX Connection
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
                        text: 'The RE/MAX Metro Atlanta Advantage',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: 'As part of RE/MAX Metro Atlanta, we offer exclusive advantages that independent property managers simply cannot provide:',
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
                            text: 'Powerful Network: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Access to thousands of real estate agents who can refer quality residents and investment properties',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Market Intelligence: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: "Real-time market data and trends from RE/MAX's comprehensive Atlanta market research",
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Technology Platform: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Cutting-edge property management software, marketing tools, and owner/resident portals',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Professional Resources: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Legal support, continuing education, and industry best practices from the RE/MAX network',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Complete Investment Solution: ',
                            format: 1,
                          },
                          {
                            type: 'text',
                            text: 'Seamless transition when you want to buy more properties or sell—one trusted partner for your entire real estate journey',
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
                        text: 'This powerful combination of local expertise and national resources means better residents, faster leasing, higher returns, and complete peace of mind for our property owners.',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },

      // Section 5: Our Values (IconGrid)
      {
        blockType: 'iconGrid',
        heading: 'What We Stand For',
        subheading: 'The principles that guide every decision we make',
        columns: 'three',
        items: [
          {
            icon: 'shield',
            iconColor: 'sageGreen',
            title: 'Integrity',
            description:
              "We do what's right, even when no one is watching. Your trust is our most valuable asset, and we protect it with unwavering honesty in every interaction.",
          },
          {
            icon: 'dollar',
            iconColor: 'skyBlue',
            title: 'Transparency',
            description:
              'No hidden fees. No surprises. Complete honesty. You deserve to know exactly what you\'re paying for and how your property is performing—always.',
          },
          {
            icon: 'check',
            iconColor: 'warmGold',
            title: 'Excellence',
            description:
              "We don't settle for 'good enough.' From resident screening to property maintenance, we hold ourselves to the highest standards in every aspect of property management.",
          },
          {
            icon: 'phone',
            iconColor: 'skyBlue',
            title: 'Communication',
            description:
              "You'll always know what's happening with your property. We respond within 2 hours during business days and keep you informed proactively, not just when you ask.",
          },
          {
            icon: 'home',
            iconColor: 'sageGreen',
            title: 'Local Commitment',
            description:
              "We're invested in Atlanta's success. Supporting local communities, understanding neighborhood dynamics, and building lasting relationships is core to who we are.",
          },
          {
            icon: 'tool',
            iconColor: 'warmGold',
            title: 'Results-Driven',
            description:
              'Your ROI is our scoreboard. We measure our success by your financial returns, property condition, and stress reduction—not by how many properties we manage.',
          },
        ],
      },

      // Section 6: Community Involvement
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
                        text: 'Giving Back to Atlanta',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: "Atlanta isn't just where we work—it's our home. We believe in actively contributing to the communities we serve:",
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
                            text: 'Annual support for Atlanta-area affordable housing initiatives',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Active participation in local neighborhood associations and improvement projects',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Sponsorship of local youth sports and educational programs',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Volunteer work with Atlanta Community Food Bank and Habitat for Humanity',
                          },
                        ],
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Educational workshops for first-time property owners and real estate investors',
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
                        text: 'When you partner with Allay, you\'re supporting a company that reinvests in making Atlanta a better place to live and invest.',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },

      // Section 7: Certifications & Memberships (TrustBadges)
      {
        blockType: 'trustBadges',
        heading: 'Professional Credentials',
        subheading: 'Industry recognition and professional memberships',
        badges: [
          {
            title: 'NARPM Member',
            icon: 'certificate',
            description: 'National Association of Residential Property Managers',
          },
          {
            title: 'Georgia Real Estate License',
            icon: 'shield',
            description: 'Licensed and bonded in the State of Georgia',
          },
          {
            title: 'RE/MAX Metro Atlanta',
            icon: 'building',
            description: 'Part of the RE/MAX network',
          },
          {
            title: 'BBB Accredited',
            icon: 'award',
            description: 'Better Business Bureau A+ Rating',
          },
          {
            title: 'Atlanta Board of Realtors',
            icon: 'users',
            description: 'Member in good standing',
          },
          {
            title: 'Georgia Association of Realtors',
            icon: 'star',
            description: 'State-level professional membership',
          },
        ],
      },

      // Section 8: Final CTA
      {
        blockType: 'heroCTA',
        headline: 'Ready to Work with a Team That Truly Cares About Your Investment?',
        subheadline:
          "Experience the Allay difference. Get your free rental analysis and discover what professional property management can do for your Atlanta investment property.",
        primaryCTA: {
          text: 'Get Started Today',
          url: '/contact',
        },
        secondaryCTA: {
          text: 'Schedule a Call',
          url: '/contact',
        },
        backgroundColor: 'deepNavy',
      },
    ]

    const pageData = {
      title: 'About Allay Property Management',
      slug: 'about',
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
                    text: 'Atlanta Property Management with Heart',
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Local expertise, national resources, and a genuine commitment to your success. Meet the team protecting Atlanta property investments since day one.',
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
              url: '/pricing',
              label: 'View Pricing',
              appearance: 'outline',
            },
          },
        ],
      },
      layout: aboutLayout,
      _status: 'published',
    }

    let result
    if (existingPages.docs.length > 0) {
      // Update existing page
      result = await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: pageData,
      })
      console.log('✅ About Us page updated successfully!')
    } else {
      // Create new page
      result = await payload.create({
        collection: 'pages',
        data: pageData,
      })
      console.log('✅ About Us page created successfully!')
    }

    console.log(`   Page ID: ${result.id}`)
    console.log(`   Slug: ${result.slug}`)
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

    console.log('\n✨ About Us page is ready at /about')
  } catch (error) {
    console.error('❌ Error building About Us page:', error)
    process.exit(1)
  }

  process.exit(0)
}

buildAboutPage()
