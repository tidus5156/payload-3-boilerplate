import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔍 Checking for page versions with Slate data...\n');

// Check the properties page specifically
const page = await payload.findByID({
  collection: 'pages',
  id: 39,
  draft: true, // Include draft data
});

console.log('Properties Page (ID 39):');
console.log('  Title:', page.title);
console.log('  Status:', page._status);
console.log('  Has versions:', page._versions ? 'Yes' : 'No');

if (page.hero?.richText) {
  const richTextStr = JSON.stringify(page.hero.richText).substring(0, 200);
  console.log('  Hero richText preview:', richTextStr);

  // Check if it's Slate format (has 'children' array at root)
  const isSlate = Array.isArray(page.hero.richText) && page.hero.richText.some((node: any) => node.children && !node.type);
  const isLexical = page.hero.richText.root && page.hero.richText.root.type === 'root';

  console.log('  Format:', isSlate ? 'SLATE (needs migration)' : isLexical ? 'LEXICAL (good)' : 'UNKNOWN');
}

// Check versions
const versions = await payload.findVersions({
  collection: 'pages',
  where: {
    parent: {
      equals: 39,
    },
  },
  limit: 10,
  sort: '-updatedAt',
});

console.log('\n📄 Page Versions:', versions.totalDocs);

if (versions.docs.length > 0) {
  console.log('\nRecent versions:');
  versions.docs.forEach((v: any, i: number) => {
    console.log(`  Version ${i + 1}:`);
    console.log(`    Updated: ${v.updatedAt}`);
    console.log(`    Status: ${v.version._status}`);

    if (v.version.hero?.richText) {
      const isSlate = Array.isArray(v.version.hero.richText);
      const isLexical = v.version.hero?.richText?.root;
      console.log(`    Hero format: ${isSlate ? 'SLATE' : isLexical ? 'LEXICAL' : 'UNKNOWN'}`);
    }
  });
}

process.exit(0);
