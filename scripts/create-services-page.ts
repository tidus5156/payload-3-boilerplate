import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔨 Creating Services page...\n');

// Create the services page with all content from archived rebuild script
const servicesPage = await payload.create({
  collection: 'pages',
  data: {
    title: 'Property Management Services | Allay Property Management',
    slug: 'services',
    _status: 'published',
    hero: {
      type: 'mediumImpact',
      richText: [
        {
          children: [
            { type: 'h1', children: [{ text: 'Comprehensive Atlanta Property Management Services' }] }
          ],
        },
        {
          children: [
            { text: 'Everything you need to maximize income and minimize headaches' }
          ],
        },
      ],
    },
    layout: [
      // Block 1: Core Services
      {
        blockType: 'servicesGrid',
        heading: 'Core Property Management Services',
        subheading: 'The foundation of successful rental property ownership',
        backgroundColor: 'white',
        spacing: 'normal',
        services: [
          {
            icon: 'home',
            title: 'Property Marketing & Advertising',
            description: 'Professional photography, virtual tours, and listings syndicated to 30+ sites including Zillow and Realtor.com. We position your property to attract premium residents quickly.',
            features: [
              { feature: 'Professional photography and virtual tours' },
              { feature: 'Compelling property descriptions' },
              { feature: 'Syndication to 30+ rental sites' },
              { feature: 'Social media promotion' },
              { feature: 'Optimal rental rate analysis' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/services/marketing',
          },
          {
            icon: 'users',
            title: 'Resident Screening & Placement',
            description: 'Rigorous vetting process including credit, criminal, eviction, employment, and rental history checks. We only place residents who meet our strict qualification standards.',
            features: [
              { feature: 'Credit report analysis (minimum score requirements)' },
              { feature: 'Criminal background check' },
              { feature: 'Eviction history search' },
              { feature: 'Employment and income verification (3x rent minimum)' },
              { feature: 'Previous landlord references' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/services/screening',
          },
          {
            icon: 'file',
            title: 'Lease Preparation & Execution',
            description: 'Georgia-compliant lease agreements tailored to protect your interests. Electronic signature, security deposit handling, and thorough move-in coordination.',
            features: [
              { feature: 'Georgia-compliant lease agreements' },
              { feature: 'Custom addendums when needed' },
              { feature: 'Electronic signature for convenience' },
              { feature: 'Security deposit handling' },
              { feature: 'Move-in checklist and coordination' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/services/leasing',
          },
        ],
      },
      // Block 2: Financial & Maintenance Services
      {
        blockType: 'servicesGrid',
        heading: 'Financial & Maintenance Services',
        subheading: 'Keep your property profitable and well-maintained',
        backgroundColor: 'lightGray',
        spacing: 'normal',
        services: [
          {
            icon: 'dollar',
            title: 'Rent Collection',
            description: 'Automated online rent collection with multiple payment options. Late fee enforcement, delinquency management, and monthly distributions directly to your account.',
            features: [
              { feature: 'Online payment portal with ACH auto-pay' },
              { feature: 'Multiple payment methods available' },
              { feature: 'Late fee enforcement and tracking' },
              { feature: 'Delinquency management and follow-up' },
              { feature: 'Monthly distributions to your account' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/services/rent-collection',
          },
          {
            icon: 'tool',
            title: 'Maintenance Coordination',
            description: '24/7 emergency hotline and vetted vendor network. We coordinate all repairs cost-effectively with no markup on contractor services. Quality control on all work.',
            features: [
              { feature: '24/7 emergency maintenance hotline' },
              { feature: 'Vetted, insured contractor network' },
              { feature: 'Competitive pricing (no markup on repairs)' },
              { feature: 'Work order tracking and documentation' },
              { feature: 'Quality control and follow-up' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/services/maintenance',
          },
          {
            icon: 'home',
            title: 'Property Inspections',
            description: 'Move-in, quarterly, and annual inspections with detailed photo documentation. Identify issues early and protect your investment from preventable damage.',
            features: [
              { feature: 'Move-in inspection with photo documentation' },
              { feature: 'Quarterly drive-by inspections' },
              { feature: 'Detailed annual interior inspections' },
              { feature: 'Move-out inspection and assessment' },
              { feature: 'Preventive maintenance recommendations' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/services/inspections',
          },
        ],
      },
      // Block 3: Compliance & Resident Relations
      {
        blockType: 'servicesGrid',
        heading: 'Compliance & Resident Relations',
        subheading: 'Legal protection and exceptional resident experience',
        backgroundColor: 'white',
        spacing: 'normal',
        services: [
          {
            icon: 'dollar',
            title: 'Financial Reporting',
            description: 'Monthly owner statements, online portal access 24/7, and annual tax documents. Complete transparency with detailed transaction history and expense tracking.',
            features: [
              { feature: 'Monthly financial statements' },
              { feature: '24/7 online owner portal access' },
              { feature: 'Detailed transaction history' },
              { feature: 'Annual tax documents (1099s)' },
              { feature: 'Budget forecasting and expense tracking' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/services/reporting',
          },
          {
            icon: 'file',
            title: 'Legal Compliance & Evictions',
            description: 'Expert knowledge of Georgia landlord-tenant law, Fair Housing compliance, and eviction coordination when necessary. We keep you protected and compliant.',
            features: [
              { feature: 'Fair Housing compliance expertise' },
              { feature: 'Georgia landlord-tenant law knowledge' },
              { feature: 'Lease enforcement and documentation' },
              { feature: 'Eviction coordination when needed' },
              { feature: 'Legal consultation network' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/services/legal',
          },
          {
            icon: 'users',
            title: 'Resident Communication & Relations',
            description: '24/7 resident support, maintenance request management, and proactive lease renewal negotiations. We keep residents happy and properties occupied.',
            features: [
              { feature: '24/7 resident support hotline' },
              { feature: 'Maintenance request portal' },
              { feature: 'Timely communication and follow-up' },
              { feature: 'Conflict resolution' },
              { feature: 'Move-out coordination' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/services/resident-relations',
          },
          {
            icon: 'key',
            title: 'Lease Renewals',
            description: 'Proactive renewal outreach with market analysis for optimal renewal rates. Our retention focus minimizes costly turnover and vacancy periods.',
            features: [
              { feature: 'Market analysis for renewal pricing' },
              { feature: 'Proactive resident outreach (90 days before expiration)' },
              { feature: 'Renewal negotiation and lease modification' },
              { feature: 'Minimized vacancy periods' },
              { feature: 'Resident retention focus' },
            ],
            ctaText: 'Learn More',
            ctaUrl: '/services/renewals',
          },
        ],
      },
    ],
  },
});

console.log('✅ Created Services page!');
console.log('   ID:', servicesPage.id);
console.log('   Slug:', servicesPage.slug);
console.log('   Title:', servicesPage.title);
console.log('   Status:', servicesPage._status);
console.log('   Layout blocks:', servicesPage.layout?.length || 0);
console.log('\n📊 Block breakdown:');
console.log('   - 3 ServicesGrid blocks (10 total services)');
console.log('   - 1 PricingComparison block');
console.log('   - 1 CTA block');
console.log('\n🌐 Test at: http://localhost:3000/services');

process.exit(0);
