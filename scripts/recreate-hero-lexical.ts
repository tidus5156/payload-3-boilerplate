import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

console.log('🔄 Recreating hero sections with proper Lexical format...\n');

// Page 39: Properties
console.log('Updating Page 39 (Properties)...');
await payload.update({
  collection: 'pages',
  id: 39,
  data: {
    hero: {
      type: 'mediumImpact',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Available Rental Properties in Metro Atlanta',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'heading',
              version: 1,
              tag: 'h1',
            },
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Quality homes professionally managed by Allay Property Management. Browse our current listings and find your perfect Atlanta rental.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  },
});
console.log('✅ Page 39 updated');

// Page 36: Services
console.log('\nUpdating Page 36 (Services)...');
await payload.update({
  collection: 'pages',
  id: 36,
  data: {
    hero: {
      type: 'mediumImpact',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Comprehensive Atlanta Property Management Services',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'heading',
              version: 1,
              tag: 'h1',
            },
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Everything you need to maximize income and minimize headaches',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  },
});
console.log('✅ Page 36 updated');

// Page 34: Resident FAQs
console.log('\nUpdating Page 34 (Resident FAQs)...');
await payload.update({
  collection: 'pages',
  id: 34,
  data: {
    hero: {
      type: 'lowImpact',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Resident FAQs',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'heading',
              version: 1,
              tag: 'h1',
            },
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Answers to common questions for current and prospective residents',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  },
});
console.log('✅ Page 34 updated');

// Page 33: Owner FAQs
console.log('\nUpdating Page 33 (Property Owner FAQs)...');
await payload.update({
  collection: 'pages',
  id: 33,
  data: {
    hero: {
      type: 'lowImpact',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Property Owner FAQs',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'heading',
              version: 1,
              tag: 'h1',
            },
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Everything you need to know about professional property management in Atlanta',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  },
});
console.log('✅ Page 33 updated');

// Page 31: Apply Online
console.log('\nUpdating Page 31 (Apply Online)...');
await payload.update({
  collection: 'pages',
  id: 31,
  data: {
    hero: {
      type: 'mediumImpact',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Apply Online',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'heading',
              version: 1,
              tag: 'h1',
            },
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Start your application to rent with Allay Property Management',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  },
});
console.log('✅ Page 31 updated');

console.log('\n✅ All pages updated with proper Lexical format!');
process.exit(0);
