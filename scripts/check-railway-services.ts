import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

const servicesPage = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'services' } },
  limit: 1
});

if (servicesPage.docs.length > 0) {
  const page = servicesPage.docs[0];
  console.log('✅ Services page EXISTS on Railway!');
  console.log('ID:', page.id);
  console.log('Slug:', page.slug);
  console.log('Title:', page.title);
  console.log('Status:', page._status);
  console.log('Layout blocks:', page.layout?.length || 0);
} else {
  console.log('❌ Services page does NOT exist on Railway');
}

process.exit(0);
