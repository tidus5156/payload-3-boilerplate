import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔧 Fixing properties page slug...\n');

await payload.update({
  collection: 'pages',
  id: 39,
  data: {
    slug: 'properties',
  },
});

console.log('✅ Updated slug to "properties"');
console.log('   URL: http://localhost:3000/properties\n');

process.exit(0);
