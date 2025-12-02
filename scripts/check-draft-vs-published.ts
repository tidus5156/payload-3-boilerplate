import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔍 Checking draft vs published data for Page 39...\n');

// Get published version
const published = await payload.findByID({
  collection: 'pages',
  id: 39,
  draft: false,
});

// Get draft version
const draft = await payload.findByID({
  collection: 'pages',
  id: 39,
  draft: true,
});

console.log('PUBLISHED VERSION:');
console.log('  Status:', published._status);
if (published.hero?.richText) {
  const isSlate = Array.isArray(published.hero.richText);
  const isLexical = published.hero.richText.root?.type === 'root';
  console.log('  Hero format:', isSlate ? 'SLATE' : isLexical ? 'LEXICAL' : 'UNKNOWN');
  console.log('  Preview:', JSON.stringify(published.hero.richText).substring(0, 100));
}

console.log('\nDRAFT VERSION:');
console.log('  Status:', draft._status);
if (draft.hero?.richText) {
  const isSlate = Array.isArray(draft.hero.richText);
  const isLexical = draft.hero.richText.root?.type === 'root';
  console.log('  Hero format:', isSlate ? 'SLATE' : isLexical ? 'LEXICAL' : 'UNKNOWN');
  console.log('  Preview:', JSON.stringify(draft.hero.richText).substring(0, 100));
}

process.exit(0);
