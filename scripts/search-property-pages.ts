import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔍 Searching for property-related pages...\n');

const allPages = await payload.find({
  collection: 'pages',
  limit: 100,
  select: {
    id: true,
    slug: true,
    title: true,
    _status: true,
  },
});

console.log(`Total pages in database: ${allPages.totalDocs}\n`);

// Search for pages with property/rental/available related slugs
const propertyRelated = allPages.docs.filter(p =>
  p.slug && (
    p.slug.includes('propert') ||
    p.slug.includes('rental') ||
    p.slug.includes('available') ||
    p.slug.includes('search')
  )
);

if (propertyRelated.length > 0) {
  console.log('📄 Property/rental-related pages found:');
  propertyRelated.forEach(p => {
    const status = p._status === 'published' ? '✅' : '📝';
    console.log(`   ${status} ID:${p.id} | slug: "${p.slug}" | ${p.title}`);
  });
} else {
  console.log('❌ No property/rental-related pages found');
}

console.log('\n📋 All pages in database:');
allPages.docs.forEach(p => {
  const status = p._status === 'published' ? '✅' : '📝';
  console.log(`   ${status} ID:${p.id} | slug: "${p.slug}" | ${p.title}`);
});

process.exit(0);
