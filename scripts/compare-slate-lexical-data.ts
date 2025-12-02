import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

// Get Page 39 current data
const page = await payload.findByID({
  collection: 'pages',
  id: 39,
  draft: false,
});

console.log('Current Page 39 hero richText:');
console.log(JSON.stringify(page.hero.richText, null, 2));

// Get a version with Slate data
const versions = await payload.findVersions({
  collection: 'pages',
  where: { parent: { equals: 39 } },
  limit: 10,
  sort: '-updatedAt',
});

const slateVersion = versions.docs.find((v: any) => Array.isArray(v.version.hero?.richText));

if (slateVersion) {
  console.log('\n\nOriginal Slate data from version:');
  console.log(JSON.stringify(slateVersion.version.hero.richText, null, 2));
}

process.exit(0);
