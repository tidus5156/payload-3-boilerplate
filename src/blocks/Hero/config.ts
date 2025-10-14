import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Stress Less. Earn More.',
      },
    },
    {
      name: 'subheadline',
      type: 'textarea',
      admin: {
        placeholder: 'Full-service property management for Metro Atlanta rental properties.',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero background image',
      },
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Get Free Rental Analysis',
        },
        {
          name: 'url',
          type: 'text',
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
          defaultValue: 'Learn More',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/services',
        },
      ],
    },
    {
      name: 'trustBar',
      type: 'array',
      maxRows: 5,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          admin: {
            placeholder: '500+ Properties Managed',
          },
        },
      ],
      admin: {
        description: 'Trust indicators shown below hero',
      },
    },
  ],
}
