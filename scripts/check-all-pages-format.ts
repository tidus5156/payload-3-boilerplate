import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔍 Checking all pages for Slate format...\n');

const pages = await payload.find({
  collection: 'pages',
  limit: 100,
  draft: true,
});

let slateCount = 0;
let lexicalCount = 0;

for (const page of pages.docs) {
  if (page.hero?.richText) {
    const isSlate = Array.isArray(page.hero.richText) && page.hero.richText.some((node: any) => node.children && !node.type);
    const isLexical = page.hero.richText.root && page.hero.richText.root.type === 'root';

    const format = isSlate ? 'SLATE' : isLexical ? 'LEXICAL' : 'UNKNOWN';

    if (isSlate) slateCount++;
    if (isLexical) lexicalCount++;

    console.log(`${format === 'SLATE' ? '❌' : '✅'} Page ${page.id}: ${page.title} - ${format}`);
  } else {
    console.log(`⚪ Page ${page.id}: ${page.title} - No hero richText`);
  }
}

console.log(`\n📊 Summary: ${slateCount} pages with SLATE, ${lexicalCount} pages with LEXICAL`);
process.exit(0);
