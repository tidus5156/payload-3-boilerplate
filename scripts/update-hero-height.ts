import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const updateHeroHeight = async () => {
  const payload = await getPayload({ config });

  // Find the home page
  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
  });

  if (pages.docs.length === 0) {
    console.log('❌ Home page not found');
    process.exit(1);
  }

  const homePage = pages.docs[0];
  console.log('📄 Found home page:', homePage.id);

  // Update the DualHero block minHeight
  const updatedLayout = homePage.layout.map((block: any) => {
    if (block.blockType === 'dualHero') {
      console.log('🔧 Updating DualHero minHeight from', block.minHeight, 'to 100vh');
      return {
        ...block,
        minHeight: '100vh',
      };
    }
    return block;
  });

  // Update the page
  await payload.update({
    collection: 'pages',
    id: homePage.id,
    data: {
      layout: updatedLayout,
    },
  });

  console.log('✅ Successfully updated hero height!');
  process.exit(0);
};

updateHeroHeight();
