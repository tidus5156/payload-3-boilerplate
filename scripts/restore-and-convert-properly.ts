import { getPayload } from 'payload';
import { convertSlateToLexical } from '@payloadcms/richtext-lexical/migrate';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔄 Restoring pages from Slate versions and converting properly...\n');

// Pages that need restoration
const pageIds = [39, 36, 34, 33, 31];

for (const pageId of pageIds) {
  try {
    console.log(`\nProcessing Page ${pageId}...`);

    // Get versions to find Slate data
    const versions = await payload.findVersions({
      collection: 'pages',
      where: { parent: { equals: pageId } },
      limit: 10,
      sort: '-updatedAt',
    });

    // Find a version with Slate format
    const slateVersion = versions.docs.find((v: any) => Array.isArray(v.version.hero?.richText));

    if (!slateVersion) {
      console.log(`  ⚠️  No Slate version found, skipping`);
      continue;
    }

    console.log(`  Found Slate data in version`);
    console.log(`  Title: ${slateVersion.version.title}`);

    const slateData = slateVersion.version.hero.richText;

    // Convert Slate to Lexical
    console.log('  Converting Slate to Lexical...');
    const lexicalData = convertSlateToLexical({ slateData });

    console.log('  Lexical output:', JSON.stringify(lexicalData).substring(0, 200));

    // Update page with proper Lexical data
    await payload.update({
      collection: 'pages',
      id: pageId,
      data: {
        hero: {
          ...slateVersion.version.hero,
          richText: lexicalData,
        },
      },
    });

    console.log('  ✅ Page updated with content');
  } catch (error: any) {
    console.error(`  ❌ Error processing Page ${pageId}:`, error.message);
  }
}

console.log('\n✅ Restoration complete!');
process.exit(0);
