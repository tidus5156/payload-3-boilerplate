import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔍 Searching for htmlEmbed blocks...\n');

const pages = await payload.find({
  collection: 'pages',
  limit: 100,
});

let foundEmbeds = false;

for (const page of pages.docs) {
  if (page.layout) {
    const embeds = page.layout.filter((block: any) => block.blockType === 'htmlEmbed');
    if (embeds.length > 0) {
      foundEmbeds = true;
      console.log(`📄 ${page.title} (slug: ${page.slug})`);
      embeds.forEach((embed: any, i: number) => {
        console.log(`   Embed ${i + 1}: ${embed.embedLabel || '(no label)'}`);
        console.log(`   Code preview: ${embed.embedCode?.substring(0, 150)}...\n`);
      });
    }
  }
}

if (!foundEmbeds) {
  console.log('❌ No htmlEmbed blocks found in any pages');
}

process.exit(0);
