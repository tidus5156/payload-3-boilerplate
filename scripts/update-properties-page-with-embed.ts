import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔄 Updating properties page to use HTML embed...\n');

const propertyListingEmbed = `<div class="bg-white">
  <!-- Property Listing Embed Placeholder -->
  <div class="bg-white rounded-lg border-2 border-blue-400 p-8">
    <div class="text-center py-12">
      <div class="text-6xl mb-4">🏠</div>
      <h3 class="text-2xl font-bold text-blue-900 mb-4">Property Listings Coming Soon</h3>
      <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
        We're integrating our property management system to display real-time availability.
        In the meantime, please contact us to see current listings.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/contact" class="inline-block bg-yellow-600 text-blue-900 font-semibold px-8 py-4 rounded-md hover:bg-yellow-500 transition-colors">
          Contact Us About Availability
        </a>
        <a href="/residents/apply" class="inline-block bg-blue-500 text-white font-semibold px-8 py-4 rounded-md hover:bg-blue-600 transition-colors">
          Apply Online
        </a>
      </div>
    </div>
  </div>

  <!-- Browse by Neighborhood -->
  <div class="mt-16 py-16 bg-gray-50 rounded-lg">
    <div class="max-w-4xl mx-auto px-8">
      <h2 class="text-3xl font-bold text-blue-900 mb-4 text-center">Browse by Neighborhood</h2>
      <p class="text-lg text-gray-600 mb-8 text-center">
        We manage properties across Metro Atlanta. Explore our service areas to learn more about each neighborhood.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/areas-we-serve" class="inline-block bg-blue-900 text-white font-semibold px-8 py-4 rounded-md hover:bg-blue-800 transition-colors text-center">
          View All Neighborhoods
        </a>
      </div>
    </div>
  </div>

  <!-- Help Section -->
  <div class="mt-16 text-center py-16 bg-white">
    <h2 class="text-3xl font-bold text-blue-900 mb-4">Questions About Our Properties?</h2>
    <p class="text-lg text-gray-600 mb-8">Our team is ready to help you find your perfect home in Atlanta.</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/residents/faq" class="inline-block bg-white text-blue-900 border-2 border-blue-400 font-semibold px-8 py-4 rounded-md hover:bg-gray-50 transition-colors">
        View Resident FAQs
      </a>
      <a href="tel:+14045550123" class="inline-block bg-blue-900 text-white font-semibold px-8 py-4 rounded-md hover:bg-blue-800 transition-colors">
        Call (404) 555-0123
      </a>
    </div>
  </div>
</div>`;

await payload.update({
  collection: 'pages',
  where: { slug: { equals: 'properties' } },
  data: {
    layout: [
      // Property Listing Embed Block
      {
        blockType: 'htmlEmbed',
        embedLabel: 'Property Listing Placeholder',
        embedCode: propertyListingEmbed,
        containerMaxWidth: 'container',
      },
      // Why Rent with Allay Section (keep this)
      {
        blockType: 'iconGrid',
        heading: 'Why Rent with Allay',
        subheading: 'More than just a place to live',
        columns: 'two',
        items: [
          {
            icon: 'tool',
            iconColor: 'skyBlue',
            title: 'Responsive Maintenance',
            description: '24/7 emergency line with fast, professional repairs when you need them.',
          },
          {
            icon: 'dollar',
            iconColor: 'warmGold',
            title: 'Easy Online Payments',
            description: 'Multiple payment options with convenient auto-pay available.',
          },
          {
            icon: 'users',
            iconColor: 'sageGreen',
            title: 'Helpful Team',
            description: 'Real people who care about your experience and respond quickly.',
          },
          {
            icon: 'home',
            iconColor: 'skyBlue',
            title: 'Quality Properties',
            description: 'Well-maintained homes in great Atlanta neighborhoods.',
          },
        ],
      },
      // CTA Section (keep this)
      {
        blockType: 'heroCTA',
        headline: 'Ready to Apply?',
        subheadline: 'Contact us to learn about current availability and start your application.',
        primaryCTA: {
          text: 'Start Your Application',
          url: '/residents/apply',
        },
        secondaryCTA: {
          text: 'Contact Us',
          url: '/contact',
        },
        backgroundColor: 'deepNavy',
      },
    ],
  },
});

console.log('✅ Properties page updated with HTML embed!');
console.log('   View at: http://localhost:3000/properties\n');

process.exit(0);
