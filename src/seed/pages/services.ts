export const servicesPageData = {
  title: 'Our Services',
  slug: 'services',
  metaTitle: 'Property Management Services | Full-Service & Tenant Placement | Allay PM',
  metaDescription: 'Comprehensive Atlanta property management services including full-service management, tenant placement, and maintenance coordination. Expert service you can trust.',
  hero: {
    type: 'lowImpact',
    richText: {
      root: {
        type: 'root',
        children: [
            type: 'heading',
            children: [
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Comprehensive Atlanta Property Management Services',
                version: 1,
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
            type: 'paragraph',
            children: [
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Everything you need to maximize income and minimize headaches',
                version: 1,
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  layout: [
    // Service 1: Property Marketing & Advertising
    {
      blockType: 'content',
      columns: [
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                  type: 'heading',
                  tag: 'h3',
                  children: [{ type: 'text', text: 'Property Marketing & Advertising' }],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'First impressions matter. Our professional marketing approach ensures your property stands out in a competitive market, attracting high-quality residents who value and respect your investment.',
                  ],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'We leverage professional photography, compelling property descriptions, and strategic pricing to maximize your rental income. Our listings are syndicated to over 30 major rental platforms including Zillow, Realtor.com, Apartments.com, and more.',
                  ],
                  type: 'heading',
                  tag: 'h4',
                  children: [{ type: 'text', text: "What's Included:" }],
                  type: 'list',
                  listType: 'bullet',
                  tag: 'ul',
                  children: [
                    { type: 'listitem', children: [{ type: 'text', text: 'Professional photography and virtual tours' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Compelling listing copy optimized for search' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Syndication to 30+ major rental websites' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Competitive rental rate analysis' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Social media promotion' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Property showing coordination' }] },
                  ],
              ],
      ],
    },

    // Service 2: Resident Screening & Placement
    {
      blockType: 'content',
      columns: [
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                  type: 'heading',
                  tag: 'h3',
                  children: [{ type: 'text', text: 'Resident Screening & Placement' }],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'Finding the right residents is crucial to protecting your investment. Our rigorous screening process goes beyond basic credit checks to evaluate the whole picture, ensuring only qualified, responsible residents are approved.',
                  ],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'We verify employment, income, rental history, and conduct thorough background checks. Our screening standards require income of at least 3x monthly rent, positive rental references, and clean criminal and eviction records.',
                  ],
                  type: 'heading',
                  tag: 'h4',
                  children: [{ type: 'text', text: "What's Included:" }],
                  type: 'list',
                  listType: 'bullet',
                  tag: 'ul',
                  children: [
                    { type: 'listitem', children: [{ type: 'text', text: 'Credit report analysis and scoring' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Criminal background checks' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Eviction history search' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Employment and income verification' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Rental history verification' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Previous landlord references' }] },
                  ],
              ],
      ],
    },

    // Service 3: Lease Preparation & Execution
    {
      blockType: 'content',
      columns: [
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                  type: 'heading',
                  tag: 'h3',
                  children: [{ type: 'text', text: 'Lease Preparation & Execution' }],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'A solid lease agreement is your first line of defense. We use Georgia-compliant lease agreements that clearly define expectations, protect your rights, and minimize disputes.',
                  ],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'Our leases are regularly updated to reflect current laws and include all required disclosures. We handle all move-in documentation, including security deposits, and ensure residents understand their responsibilities.',
                  ],
                  type: 'heading',
                  tag: 'h4',
                  children: [{ type: 'text', text: "What's Included:" }],
                  type: 'list',
                  listType: 'bullet',
                  tag: 'ul',
                  children: [
                    { type: 'listitem', children: [{ type: 'text', text: 'Georgia-compliant lease agreements' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Custom addendums for property-specific rules' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Electronic signature process' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Security deposit collection and accounting' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Move-in checklist and inspection' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Lease explanation for residents' }] },
                  ],
              ],
      ],
    },

    // Service 4: Rent Collection
    {
      blockType: 'content',
      columns: [
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                  type: 'heading',
                  tag: 'h3',
                  children: [{ type: 'text', text: 'Rent Collection' }],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'Consistent, on-time rent collection is critical to your cash flow. Our automated systems make paying rent easy for residents while ensuring you receive your income reliably every month.',
                  ],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'Residents can pay online via ACH, credit card, or other convenient methods. Late fees are automatically enforced per your lease terms, and we handle all delinquency management professionally and in compliance with Georgia law.',
                  ],
                  type: 'heading',
                  tag: 'h4',
                  children: [{ type: 'text', text: "What's Included:" }],
                  type: 'list',
                  listType: 'bullet',
                  tag: 'ul',
                  children: [
                    { type: 'listitem', children: [{ type: 'text', text: 'Online payment portal for residents' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'ACH auto-pay setup' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Multiple payment options' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Automatic late fee enforcement' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Delinquency management' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Monthly distributions to owners' }] },
                  ],
              ],
      ],
    },

    // Service 5: Maintenance Coordination
    {
      blockType: 'content',
      columns: [
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                  type: 'heading',
                  tag: 'h3',
                  children: [{ type: 'text', text: 'Maintenance Coordination' }],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'Property maintenance doesn\'t wait for business hours. Our 24/7 emergency hotline ensures urgent issues are addressed immediately, while our vetted contractor network delivers quality repairs at competitive prices.',
                  ],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'We coordinate all repairs, from minor fixes to major projects. You\'ll be notified of all issues and approve any repairs over $500. We never mark up contractor costs—you pay only what the contractor charges.',
                  ],
                  type: 'heading',
                  tag: 'h4',
                  children: [{ type: 'text', text: "What's Included:" }],
                  type: 'list',
                  listType: 'bullet',
                  tag: 'ul',
                  children: [
                    { type: 'listitem', children: [{ type: 'text', text: '24/7 emergency maintenance hotline' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Network of licensed, insured contractors' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Cost-effective repairs (no markup)' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Owner approval for repairs over $500' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Preventive maintenance programs' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Quality control on all work' }] },
                  ],
              ],
      ],
    },

    // Service 6: Property Inspections
    {
      blockType: 'content',
      columns: [
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                  type: 'heading',
                  tag: 'h3',
                  children: [{ type: 'text', text: 'Property Inspections' }],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'Regular inspections protect your investment by identifying issues early, before they become costly problems. We document everything with photos and provide detailed reports.',
                  ],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'Our inspection schedule includes move-in, quarterly drive-by inspections, detailed annual interior inspections, and thorough move-out inspections. You\'ll always know the condition of your property.',
                  ],
                  type: 'heading',
                  tag: 'h4',
                  children: [{ type: 'text', text: "What's Included:" }],
                  type: 'list',
                  listType: 'bullet',
                  tag: 'ul',
                  children: [
                    { type: 'listitem', children: [{ type: 'text', text: 'Move-in inspection with photo documentation' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Quarterly drive-by inspections' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Detailed annual interior inspections' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Move-out inspection with photo documentation' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Issue identification and recommendations' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Preventive maintenance suggestions' }] },
                  ],
              ],
      ],
    },

    // Service 7: Financial Reporting
    {
      blockType: 'content',
      columns: [
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                  type: 'heading',
                  tag: 'h3',
                  children: [{ type: 'text', text: 'Financial Reporting' }],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'Complete financial transparency is essential. Our detailed monthly statements show all income and expenses, giving you a clear picture of your property\'s performance.',
                  ],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'Access your owner portal 24/7 to view statements, track expenses, and download reports. At tax time, we provide all the documentation you need, including 1099s and detailed transaction histories.',
                  ],
                  type: 'heading',
                  tag: 'h4',
                  children: [{ type: 'text', text: "What's Included:" }],
                  type: 'list',
                  listType: 'bullet',
                  tag: 'ul',
                  children: [
                    { type: 'listitem', children: [{ type: 'text', text: 'Monthly owner statements' }] },
                    { type: 'listitem', children: [{ type: 'text', text: '24/7 online owner portal access' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Detailed transaction history' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Annual tax documents (1099s)' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Budget forecasting' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Expense tracking and categorization' }] },
                  ],
              ],
      ],
    },

    // Service 8: Legal Compliance & Evictions
    {
      blockType: 'content',
      columns: [
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                  type: 'heading',
                  tag: 'h3',
                  children: [{ type: 'text', text: 'Legal Compliance & Evictions' }],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'Georgia landlord-tenant law is complex and constantly changing. We stay current on all legal requirements, ensuring your property management stays compliant with Fair Housing laws and state regulations.',
                  ],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'While evictions are rare thanks to our thorough screening, when necessary, we handle the process professionally and efficiently. We coordinate with attorneys, file required notices, and protect your legal rights throughout.',
                  ],
                  type: 'heading',
                  tag: 'h4',
                  children: [{ type: 'text', text: "What's Included:" }],
                  type: 'list',
                  listType: 'bullet',
                  tag: 'ul',
                  children: [
                    { type: 'listitem', children: [{ type: 'text', text: 'Fair Housing compliance' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Georgia landlord-tenant law expertise' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Lease enforcement' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Eviction coordination (if needed)' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Legal consultation network' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Complete documentation and records' }] },
                  ],
              ],
      ],
    },

    // Service 9: Resident Communication & Relations
    {
      blockType: 'content',
      columns: [
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                  type: 'heading',
                  tag: 'h3',
                  children: [{ type: 'text', text: 'Resident Communication & Relations' }],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'Happy residents stay longer, take better care of your property, and pay rent on time. We provide responsive, professional communication that builds positive relationships while maintaining appropriate boundaries.',
                  ],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'Residents can reach us 24/7 for emergencies and during business hours for routine matters. We handle maintenance requests promptly, address concerns professionally, and work to resolve conflicts fairly.',
                  ],
                  type: 'heading',
                  tag: 'h4',
                  children: [{ type: 'text', text: "What's Included:" }],
                  type: 'list',
                  listType: 'bullet',
                  tag: 'ul',
                  children: [
                    { type: 'listitem', children: [{ type: 'text', text: '24/7 resident support' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Maintenance request management' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Lease renewal negotiations' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Conflict resolution' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Move-out coordination' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Resident satisfaction focus' }] },
                  ],
              ],
      ],
    },

    // Service 10: Lease Renewals
    {
      blockType: 'content',
      columns: [
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                  type: 'heading',
                  tag: 'h3',
                  children: [{ type: 'text', text: 'Lease Renewals' }],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'Resident retention is the key to profitability. Every turnover costs you money in vacancy, cleaning, repairs, and marketing. We proactively work to renew quality residents at market rates.',
                  ],
                  type: 'paragraph',
                  children: [
                      type: 'text',
                      text: 'We begin the renewal process 90 days before lease expiration, conducting market analysis to determine appropriate renewal rates. We negotiate professionally, balancing your income goals with resident retention.',
                  ],
                  type: 'heading',
                  tag: 'h4',
                  children: [{ type: 'text', text: "What's Included:" }],
                  type: 'list',
                  listType: 'bullet',
                  tag: 'ul',
                  children: [
                    { type: 'listitem', children: [{ type: 'text', text: 'Market analysis for renewal rates' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Proactive renewal outreach' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Professional negotiation' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Lease modifications if needed' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Minimal vacancy periods' }] },
                    { type: 'listitem', children: [{ type: 'text', text: 'Renewal incentive strategies' }] },
                  ],
              ],
      ],
    },

    // Comparison Section
    {
      blockType: 'pricingComparison',
      heading: 'Choose Your Service Level',
      subheading: 'Select the management option that fits your needs and experience level.',
      plans: [
          name: 'Tenant Placement Only',
          price: '50%',
          priceDescription: 'of first month\'s rent',
          description: 'Perfect for experienced owners who prefer self-management.',
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
          name: 'Full-Service Management',
          price: '8%',
          priceDescription: 'of monthly rent',
          description: 'Complete hands-off property management.',
          features: [
            { feature: 'Everything in Tenant Placement', included: true },
            { feature: 'Monthly rent collection', included: true },
            { feature: 'Maintenance coordination', included: true },
            { feature: 'Financial reporting & accounting', included: true },
            { feature: '24/7 emergency support', included: true },
            { feature: 'Regular property inspections', included: true },
            { feature: 'Lease renewals', included: true },
            { feature: '12-month rent guarantee', included: true },
          ],
          highlighted: true,
          ctaText: 'Get Started',
          ctaUrl: '/contact',
      ],
    },

    // Final CTA
    {
      blockType: 'cta',
      richText: {
        root: {
          type: 'root',
          children: [
              type: 'heading',
              children: [
                  type: 'text',
                  text: 'Not Sure Which Service is Right for You?',
              ],
              tag: 'h2',
              type: 'paragraph',
              children: [
                  type: 'text',
                  text: 'Schedule a free consultation to discuss your property and investment goals. We\'ll help you choose the service level that maximizes your ROI.',
              ],
          ],
      },
      links: [
          link: {
            type: 'custom',
            url: '/contact',
            label: 'Schedule Free Consultation',
            appearance: 'primary',
      ],
    },
  ],
  _status: 'published',
}
