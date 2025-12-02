// Seed data for homepage with DualHero block
export const homepageDualHeroData = {
  title: 'Home',
  slug: 'home',
  _status: 'published',
  metaTitle: 'Allay Property Management | Atlanta Rental Property Experts',
  metaDescription: 'Professional property management for Metro Atlanta. Expert care for property owners and quality homes for residents. Get your free rental analysis today.',

  // Use layout blocks instead of hero field
  layout: [
    // DualHero Block - Main hero section
    {
      blockType: 'dualHero',
      leftPanel: {
        headline: 'Your Atlanta Property. In Expert Hands.',
        subheadline: 'Local expertise. Transparent service. Properties managed with the attention yours deserves.',
        // backgroundImage: will need to be set after media upload
        overlayColor: 'deepNavy',
        overlayOpacity: 75,
        primaryCTA: {
          text: 'Get Free Analysis',
          url: '/contact',
          openInNewTab: false,
        },
        secondaryCTA: {
          text: 'Our Services',
          url: '/services',
          openInNewTab: false,
        },
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
      rightPanel: {
        headline: 'Find Your Perfect Home',
        subheadline: 'Quality rentals across Metro Atlanta',
        // backgroundImage: will need to be set after media upload
        overlayColor: 'skyBlue',
        overlayOpacity: 65,
        primaryCTA: {
          text: 'Search Properties',
          url: '/properties',
          openInNewTab: false,
        },
        subtext: 'View 120+ Available Homes',
      },
      mobileLabels: {
        ownerLabel: 'PROPERTY OWNERS',
        residentLabel: 'LOOKING FOR A HOME?',
      },
      desktopSplit: '60-40',
      minHeight: '100vh', // Component auto-converts to calc(100vh + 80px) to compensate for -80px margin
      mobileLayout: 'stack',
      showScrollIndicator: true,
      enableParallax: false,
    },

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
      layout: 'three-column',
      showCTAs: true,
      // Services will be pulled from the Services collection
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
      showFeaturedOnly: true,
      limit: 6,
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
}
