export const homepageData = {
  title: 'Home',
  slug: 'home',
  metaTitle: 'Allay Property Management | Stress Less. Earn More. | Metro Atlanta',
  metaDescription: 'Professional property management for Metro Atlanta rental properties. Guaranteed rent, quality tenants, 24/7 support. Get your free rental analysis today.',
  hero: {
    headline: 'Stress Less. Earn More.',
    subheadline: 'Full-service property management for Metro Atlanta rental properties. Maximize your returns while we handle everything.',
    primaryCTA: {
      text: 'Get Free Rental Analysis',
      url: '/contact',
    },
    secondaryCTA: {
      text: 'View Our Services',
      url: '/services',
    },
    trustBar: [
      { text: '500+ Properties Managed' },
      { text: '98% Tenant Satisfaction' },
      { text: '12-Month Rent Guarantee' },
      { text: 'RE/MAX Backed' },
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
  status: 'published',
}
