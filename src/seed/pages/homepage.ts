export const homepageData = {
  title: 'Home',
  slug: 'home',
  metaTitle: 'Allay Property Management | Stress Less. Earn More. | Metro Atlanta',
  metaDescription: 'Professional property management for Metro Atlanta rental properties. Guaranteed rent, quality tenants, 24/7 support. Get your free rental analysis today.',
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
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Stress Less. Earn More.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Full-service property management for Metro Atlanta rental properties. Maximize your returns while we handle everything.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    links: [
      {
        link: {
          type: 'custom',
          url: '/contact',
          label: 'Get Free Rental Analysis',
          appearance: 'default',
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
    trustIndicators: [
      {
        icon: 'star',
        text: '4.9/5 Rating',
      },
      {
        icon: 'home',
        text: '500+ Properties',
      },
      {
        icon: 'shield',
        text: 'RE/MAX Backed',
      },
    ],
  },
  layout: [
    // Icon Grid - Why Choose Allay
    {
      blockType: 'iconGrid',
      heading: 'Why Property Owners Choose Allay',
      subheading: 'We combine local expertise with RE/MAX resources to deliver exceptional results for your investment properties.',
      columns: 'three',
      items: [
        {
          icon: 'shield',
          title: '12-Month Rent Guarantee',
          description: 'We guarantee rent payments for 12 months with our exclusive tenant protection program. Your income is secured from day one.',
        },
        {
          icon: 'dollar',
          title: 'Maximize Your Returns',
          description: 'Strategic pricing, minimal vacancies, and cost-effective maintenance mean more money in your pocket every month.',
        },
        {
          icon: 'users',
          title: 'Quality Tenant Screening',
          description: 'Rigorous background checks, credit verification, and rental history analysis ensure only the best tenants for your property.',
        },
        {
          icon: 'clock',
          title: '24/7 Emergency Support',
          description: 'Round-the-clock emergency maintenance coordination protects your property and keeps residents satisfied.',
        },
        {
          icon: 'file',
          title: 'Transparent Reporting',
          description: 'Detailed monthly financial statements and online portal access keep you informed about every aspect of your investment.',
        },
        {
          icon: 'home',
          title: 'Property Care Excellence',
          description: 'Regular inspections, preventative maintenance, and quality repairs preserve your property value over the long term.',
        },
      ],
    },
    // Services Grid
    {
      blockType: 'servicesGrid',
      heading: 'Complete Property Management Solutions',
      subheading: 'From tenant placement to maintenance coordination, we handle every detail of property management.',
      services: [
        {
          icon: 'home',
          title: 'Full-Service Management',
          description: 'Complete management of your rental property from marketing to move-out.',
          features: [
            { feature: 'Professional photography & marketing' },
            { feature: 'Tenant screening & placement' },
            { feature: 'Rent collection & financial reporting' },
            { feature: 'Maintenance coordination' },
            { feature: 'Property inspections' },
            { feature: 'Lease renewals & enforcement' },
          ],
          ctaText: 'Learn More',
          ctaUrl: '/services#full-service',
        },
        {
          icon: 'key',
          title: 'Tenant Placement Only',
          description: 'Need help finding the perfect tenant? We handle the entire placement process.',
          features: [
            { feature: 'Professional listing & marketing' },
            { feature: 'Showings & applications' },
            { feature: 'Comprehensive tenant screening' },
            { feature: 'Lease preparation & signing' },
            { feature: '30-day placement guarantee' },
          ],
          ctaText: 'Learn More',
          ctaUrl: '/services#tenant-placement',
        },
        {
          icon: 'tool',
          title: 'Maintenance Coordination',
          description: 'Leverage our network of licensed contractors for reliable, cost-effective repairs.',
          features: [
            { feature: '24/7 emergency coordination' },
            { feature: 'Licensed & insured contractors' },
            { feature: 'Competitive pricing' },
            { feature: 'Quality assurance' },
            { feature: 'Preventative maintenance programs' },
          ],
          ctaText: 'Learn More',
          ctaUrl: '/services#maintenance',
        },
      ],
    },
    // Statistics Block
    {
      blockType: 'statistics',
      heading: 'Proven Results for Property Owners',
      subheading: 'Our data-driven approach delivers measurable results that maximize your return on investment.',
      stats: [
        {
          number: '98',
          suffix: '%',
          label: 'Rent Collection Rate',
          icon: 'trending',
          animateCounter: true,
        },
        {
          number: '15',
          label: 'Average Days to Lease',
          icon: 'check',
          animateCounter: true,
        },
        {
          number: '500',
          suffix: '+',
          label: 'Properties Managed',
          icon: 'home',
          animateCounter: true,
        },
        {
          number: '4.9',
          suffix: '/5',
          label: 'Client Satisfaction',
          icon: 'star',
          animateCounter: true,
        },
      ],
      layout: 'grid-4',
      backgroundColor: 'skyBlueLight',
      spacing: 'normal',
      enableAnimations: true,
    },
    // Process Timeline
    {
      blockType: 'processTimeline',
      heading: 'Getting Started is Simple',
      subheading: 'From initial consultation to your first rent check, we make the onboarding process seamless.',
      steps: [
        {
          title: 'Free Rental Analysis',
          description: 'Schedule a consultation to discuss your property and investment goals. We\'ll provide a comprehensive rental market analysis at no cost.',
          icon: 'phone',
        },
        {
          title: 'Property Inspection',
          description: 'Our team conducts a thorough inspection to assess condition, identify any needed repairs, and determine optimal rental pricing.',
          icon: 'clipboard',
        },
        {
          title: 'Marketing & Leasing',
          description: 'We create professional listings, coordinate showings, screen applicants, and secure qualified tenants quickly.',
          icon: 'calendar',
        },
        {
          title: 'Ongoing Management',
          description: 'Sit back and relax while we handle rent collection, maintenance, inspections, and everything else.',
          icon: 'check',
        },
      ],
      layout: 'vertical',
    },
    // Testimonials Carousel
    {
      blockType: 'testimonialsCarousel',
      heading: 'What Property Owners Say',
      subheading: 'Join hundreds of satisfied property owners who have discovered stress-free property management.',
      showOnlyFeatured: true,
      limit: 6,
    },
    // Pricing Comparison
    {
      blockType: 'pricingComparison',
      heading: 'Simple, Transparent Pricing',
      subheading: 'No hidden fees. No surprises. Just great service at a fair price.',
      plans: [
        {
          name: 'Tenant Placement',
          price: '50%',
          priceDescription: 'of first month\'s rent',
          description: 'One-time fee for professional tenant placement services.',
          features: [
            { feature: 'Professional marketing & photography', included: true },
            { feature: 'Unlimited showings', included: true },
            { feature: 'Comprehensive tenant screening', included: true },
            { feature: 'Lease preparation & signing', included: true },
            { feature: '30-day placement guarantee', included: true },
            { feature: 'Ongoing management', included: false },
          ],
          highlighted: false,
          ctaText: 'Get Started',
          ctaUrl: '/contact',
        },
        {
          name: 'Full Management',
          price: '8%',
          priceDescription: 'of monthly rent',
          description: 'Complete property management with no additional fees.',
          features: [
            { feature: 'Everything in Tenant Placement', included: true },
            { feature: 'Monthly rent collection', included: true },
            { feature: 'Maintenance coordination', included: true },
            { feature: 'Financial reporting & accounting', included: true },
            { feature: '24/7 emergency support', included: true },
            { feature: 'Property inspections', included: true },
            { feature: 'Lease renewals', included: true },
            { feature: '12-month rent guarantee', included: true },
          ],
          highlighted: true,
          ctaText: 'Get Started',
          ctaUrl: '/contact',
        },
      ],
    },
    // FAQ Accordion
    {
      blockType: 'faqAccordion',
      heading: 'Frequently Asked Questions',
      subheading: 'Get answers to common questions about our property management services.',
      faqs: [
        {
          question: 'What is included in your 8% management fee?',
          answer: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Our 8% fee covers everything: tenant placement, rent collection, maintenance coordination, monthly financial reports, lease enforcement, property inspections, 24/7 emergency support, and our 12-month rent guarantee. There are no hidden fees or additional charges.',
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          question: 'How quickly can you find a tenant for my property?',
          answer: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Our average time to lease is just 15 days. We use professional photography, strategic pricing, and multi-platform marketing to attract qualified tenants quickly. Most properties receive showing requests within 48 hours of listing.',
                    },
                  ],
                },
              ],
            },
          },
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
                      text: 'We conduct comprehensive background checks including credit reports, criminal history, eviction history, employment verification, income verification (minimum 3x rent), and rental history with previous landlords. Only applicants who meet our strict criteria are approved.',
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          question: 'How does the 12-month rent guarantee work?',
          answer: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'We guarantee you\'ll receive rent payments for the first 12 months. If a tenant defaults, we cover the payment while handling the eviction process. This exclusive program protects your cash flow and gives you peace of mind from day one.',
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          question: 'Who handles maintenance requests?',
          answer: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'We coordinate all maintenance through our network of licensed, insured contractors. Tenants submit requests through our portal, we assess urgency, get quotes, obtain your approval (for non-emergency repairs over $500), and oversee completion. Emergency repairs are handled 24/7.',
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          question: 'Can I use my own contractors for repairs?',
          answer: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Absolutely! While we have preferred contractors who offer competitive pricing and quick response times, you\'re welcome to use your own vendors. We\'ll coordinate with them just as we would with our network.',
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
      defaultExpanded: true,
      allowMultiple: false,
      backgroundColor: 'white',
      spacing: 'normal',
    },
    // Final CTA
    {
      blockType: 'heroCTA',
      headline: 'Ready to Maximize Your Rental Income?',
      subheadline: 'Get a free rental analysis and discover how much more you could be earning with professional property management.',
      primaryCTA: {
        text: 'Get Free Analysis',
        url: '/contact',
      },
      secondaryCTA: {
        text: 'Call (404) 555-0100',
        url: 'tel:+14045550100',
      },
      backgroundColor: 'deepNavy',
    },
  ],
  _status: 'published',
}
