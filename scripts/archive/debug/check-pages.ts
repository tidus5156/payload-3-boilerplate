import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });
const pages = await payload.find({
  collection: 'pages',
  limit: 100,
  sort: 'slug'
});

console.log('📄 All Pages in Database:\n');
pages.docs.forEach(p => {
  const padded = (p.slug + ' '.repeat(25)).slice(0, 25);
  console.log('  ✓', padded, '|', p.title);
});
console.log('\nTotal:', pages.totalDocs, 'pages');
process.exit(0);
