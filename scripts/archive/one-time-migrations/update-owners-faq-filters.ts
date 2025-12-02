import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

// Update owners-faq page with category filters
const page = await payload.update({
  collection: 'pages',
  id: 33,
  data: {
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

console.log('✅ Updated owners-faq page with category filters');
console.log('📝 Filtering FAQs by categories: general, pricing, services, legal');
console.log('🔗 View page at: http://localhost:3000/owners/faq');
process.exit(0);
