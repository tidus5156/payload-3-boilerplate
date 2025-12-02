import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

// Create residents-faq page with basic FAQ block (configure filtering in admin panel)
const page = await payload.create({
  collection: 'pages',
  data: {
    title: 'Resident FAQs | Allay Property Management',
    slug: 'residents-faq',
    _status: 'published',
    hero: {
      type: 'lowImpact',
      richText: [
        {
          children: [
            {
              type: 'h1',
              children: [{ text: 'Resident FAQs' }]
            }
          ],
        },
        {
          children: [
            {
              text: 'Get answers to common questions about renting with Allay Property Management.'
            }
          ],
        },
      ],
    },
    layout: [
      {
        blockType: 'faqAccordion',
        heading: 'Frequently Asked Questions for Residents',
        subheading: 'Common questions about applications, lease terms, maintenance requests, and more.',
        limit: 50,
        defaultExpanded: true,
        allowMultiple: false,
        backgroundColor: 'white',
        spacing: 'normal',
      }
    ],
  },
});

console.log('✅ Created residents-faq page:', page.id);
console.log('📝 Please configure category filters in the admin panel at /admin/collections/pages/' + page.id);
console.log('🔗 Route will be available at: /residents/faq');
process.exit(0);
