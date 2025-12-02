import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

// First, fetch the current page
const currentPage = await payload.findByID({
  collection: 'pages',
  id: 33,
});

console.log('📄 Current page:', currentPage.title);
console.log('🔍 Current layout blocks:', currentPage.layout?.length || 0);

// Update the existing FAQ block with category filters
const updatedLayout = currentPage.layout?.map((block: any) => {
  if (block.blockType === 'faqAccordion') {
    return {
      ...block,
      filterByCategory: ['general', 'pricing', 'services', 'legal'],
    };
  }
  return block;
}) || [];

// Update the page
const page = await payload.update({
  collection: 'pages',
  id: 33,
  data: {
    layout: updatedLayout,
  },
});

console.log('✅ Updated owners-faq page with category filters');
console.log('📝 Filtering FAQs by categories: general, pricing, services, legal');
console.log('🔗 View page at: http://localhost:3000/owners/faq');
process.exit(0);
