import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

const page = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'residents-apply' } },
  limit: 1,
});

if (page.docs.length > 0) {
  const applyPage = page.docs[0];
  console.log('📄 Apply Online Page\n');

  if (applyPage.layout) {
    const embedBlocks = applyPage.layout.filter((block: any) => block.blockType === 'htmlEmbed');

    embedBlocks.forEach((embed: any, i: number) => {
      console.log(`\n=== Embed ${i + 1}: ${embed.embedLabel} ===`);
      console.log('\nFull embed code:');
      console.log(embed.embedCode);
      console.log('\nContainer width:', embed.containerMaxWidth);
    });
  }
}

process.exit(0);
