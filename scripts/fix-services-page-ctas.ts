import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔧 Fixing services page CTAs...\n');

// Update the services page to remove the ctaUrl from all services
const servicesPage = await payload.findByID({
  collection: 'pages',
  id: 36,
});

if (!servicesPage) {
  console.log('❌ Services page not found');
  process.exit(1);
}

// Update each ServicesGrid block to remove ctaUrl
const updatedLayout = servicesPage.layout.map((block: any) => {
  if (block.blockType === 'servicesGrid' && block.services) {
    return {
      ...block,
      services: block.services.map((service: any) => ({
        ...service,
        ctaText: undefined,
        ctaUrl: undefined,
      })),
    };
  }
  return block;
});

await payload.update({
  collection: 'pages',
  id: 36,
  data: {
    layout: updatedLayout,
  },
});

console.log('✅ Removed all CTA links from services page');
console.log('   Services now display without Learn More buttons\n');

process.exit(0);
