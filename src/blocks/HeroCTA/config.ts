import type { Block } from 'payload'

export const HeroCTA: Block = {
  slug: 'heroCTA',
  interfaceName: 'HeroCTABlock',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Ready to Maximize Your Rental Income?',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      defaultValue: 'Get a free rental analysis and discover how much more you could be earning.',
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'Get Free Analysis',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          defaultValue: '/contact',
        },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Call Us: (404) 555-0100',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: 'tel:+14045550100',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'deepNavy',
      options: [
        { label: 'Deep Navy', value: 'deepNavy' },
        { label: 'Sky Blue', value: 'skyBlue' },
        { label: 'Warm Gold', value: 'warmGold' },
        { label: 'Light Gray', value: 'lightGray' },
      ],
    },
  ],
}
