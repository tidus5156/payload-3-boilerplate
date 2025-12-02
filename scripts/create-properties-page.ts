import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🏠 Creating Properties page...\n');

const propertiesPage = await payload.create({
  collection: 'pages',
  data: {
    title: 'Available Rental Properties | Allay Property Management',
    slug: 'properties',
    _status: 'published',
    hero: {
      type: 'mediumImpact',
      richText: [
        {
          children: [
            {
              type: 'h1',
              children: [{ text: 'Available Rental Properties in Metro Atlanta' }],
            },
          ],
        },
        {
          children: [
            {
              text: 'Quality homes professionally managed by Allay Property Management. Browse our current listings and find your perfect Atlanta rental.',
            },
          ],
        },
      ],
      links: [
        {
          link: {
            type: 'custom',
            url: '/residents/apply',
            label: 'Apply Online',
            appearance: 'default',
          },
        },
        {
          link: {
            type: 'custom',
            url: '/search',
            label: 'Advanced Search',
            appearance: 'outline',
          },
        },
      ],
    },
    layout: [
      // Property Archive Block
      {
        blockType: 'archive',
        populateBy: 'collection',
        relationTo: 'properties',
        limit: 12,
        categories: [],
      },
      // Why Rent with Allay Section
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
      // CTA Section
      {
        blockType: 'heroCTA',
        headline: 'Ready to Apply?',
        subheadline: 'Found a property you love? Complete our simple online application and hear back within 24-48 hours.',
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

console.log('✅ Properties page created!');
console.log('   ID:', propertiesPage.id);
console.log('   Slug:', propertiesPage.slug);
console.log('   URL: http://localhost:3000/properties\n');

process.exit(0);
