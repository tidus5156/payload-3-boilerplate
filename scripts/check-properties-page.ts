import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔍 Checking for properties page...\n');

const propertiesPage = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'properties' } },
  limit: 1
});

if (propertiesPage.docs.length > 0) {
  const page = propertiesPage.docs[0];
  console.log('✅ Properties page EXISTS');
  console.log('   ID:', page.id);
  console.log('   Slug:', page.slug);
  console.log('   Title:', page.title);
  console.log('   Status:', page._status);
} else {
  console.log('❌ Properties page does NOT exist in database');
  console.log('   The /properties route needs to be created');
}

process.exit(0);
