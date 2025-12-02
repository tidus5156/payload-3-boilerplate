import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔍 Checking for services page...\n');

const servicesPage = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'services' } },
  limit: 1
});

if (servicesPage.docs.length > 0) {
  const page = servicesPage.docs[0];
  console.log('✅ Services page EXISTS');
  console.log('   ID:', page.id);
  console.log('   Slug:', page.slug);
  console.log('   Title:', page.title);
  console.log('   Status:', page._status);
  console.log('   Layout blocks:', page.layout?.length || 0);
} else {
  console.log('❌ Services page does NOT exist');
}

console.log('\n📄 All pages with slug containing "service":');
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

const servicePages = allPages.docs.filter(p => p.slug && p.slug.includes('service'));
servicePages.forEach(p => {
  console.log(`   ${p._status === 'published' ? '✅' : '📝'} ID:${p.id} | slug:"${p.slug}" | ${p.title}`);
});

process.exit(0);
