import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

// Create owners-faq page with FAQAccordion block
const page = await payload.create({
  collection: 'pages',
  data: {
    title: 'Property Owner FAQs | Allay Property Management',
    slug: 'owners-faq',
    _status: 'published',
    hero: {
      type: 'lowImpact',
      richText: [
        {
          children: [
            {
              type: 'h1',
              children: [{ text: 'Property Owner FAQs' }]
            }
          ],
        },
        {
          children: [
            {
              text: 'Get answers to common questions about our property management services, pricing, and processes.'
            }
          ],
        },
      ],
    },
    layout: [
      {
        blockType: 'faqAccordion',
        heading: 'Frequently Asked Questions for Property Owners',
        subheading: 'Find answers to the most common questions about our services, pricing, and property management processes.',
        filterByCategory: ['general', 'pricing', 'services', 'legal'],
        showFeaturedOnly: false,
        limit: 50,
        defaultExpanded: true,
        allowMultiple: false,
        backgroundColor: 'white',
        spacing: 'normal',
      }
    ],
  },
});

console.log('✅ Created owners-faq page:', page.slug);
process.exit(0);
