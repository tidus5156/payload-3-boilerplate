import { getPayload } from 'payload';
import { convertSlateToLexical } from '@payloadcms/richtext-lexical/migrate';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔄 Manually migrating pages from Slate to Lexical...\n');

// Pages that need migration
const pageIds = [39, 36, 34, 33, 31];

for (const pageId of pageIds) {
  try {
    console.log(`\nMigrating Page ${pageId}...`);

    // Get current page data
    const page = await payload.findByID({
      collection: 'pages',
      id: pageId,
      draft: false,
    });

    console.log(`  Title: ${page.title}`);

    // Check if hero richText needs migration
    if (page.hero?.richText && Array.isArray(page.hero.richText)) {
      console.log('  Hero richText is in Slate format, converting...');

      // Convert Slate to Lexical
      const lexicalData = convertSlateToLexical({ slateData: page.hero.richText });

      // Update page with Lexical data
      await payload.update({
        collection: 'pages',
        id: pageId,
        data: {
          hero: {
            ...page.hero,
            richText: lexicalData,
          },
        },
      });

      console.log('  ✅ Hero richText converted to Lexical');
    } else if (page.hero?.richText?.root) {
      console.log('  ✅ Hero richText already in Lexical format');
    } else {
      console.log('  ⚠️  No hero richText found');
    }
  } catch (error) {
    console.error(`  ❌ Error migrating Page ${pageId}:`, error.message);
  }
}

console.log('\n✅ Manual migration complete!');
process.exit(0);
