import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

// Get the homepage
const homepage = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'home' } },
  limit: 1,
  draft: false,
});

if (homepage.docs.length > 0) {
  const page = homepage.docs[0];
  console.log('Homepage (Published):');
  console.log('  ID:', page.id);
  console.log('  Title:', page.title);
  console.log('  Status:', page._status);
  console.log('  Slug:', page.slug);
  console.log('  Hero links:');
  console.log(JSON.stringify(page.hero?.links, null, 2));
}

// Check draft version
const homepageDraft = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'home' } },
  limit: 1,
  draft: true,
});

if (homepageDraft.docs.length > 0) {
  const page = homepageDraft.docs[0];
  console.log('\n\nHomepage (Draft):');
  console.log('  ID:', page.id);
  console.log('  Status:', page._status);
  console.log('  Hero links:');
  console.log(JSON.stringify(page.hero?.links, null, 2));
}

process.exit(0);
