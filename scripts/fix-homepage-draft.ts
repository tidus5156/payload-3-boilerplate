import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔧 Fixing homepage draft data...\n');

// Get the published version (which is correct)
const published = await payload.findByID({
  collection: 'pages',
  id: 21,
  draft: false,
});

console.log('Published version links:');
console.log(JSON.stringify(published.hero?.links, null, 2));

// Update the draft to match the published version
await payload.update({
  collection: 'pages',
  id: 21,
  data: {
    hero: {
      ...published.hero,
      // This will restore the correct link structure
    },
  },
  draft: true,
});

console.log('\n✅ Fixed! The draft now matches the published version.');
console.log('\nYou can now edit the homepage in the CMS without errors.');
console.log('Remember: When changing from "Custom URL" to "Internal link", you must select a page!');

process.exit(0);
