import type { Block } from 'payload'

export const ServicesGrid: Block = {
  slug: 'servicesGrid',
  interfaceName: 'ServicesGridBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Our Services',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 12,
      admin: {
        description: 'Maximum number of services to display',
      },
    },
    {
      name: 'featuredOnly',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Only show featured services',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'Learn More',
      admin: {
        description: 'CTA button text for each service card',
      },
    },
  ],
}
