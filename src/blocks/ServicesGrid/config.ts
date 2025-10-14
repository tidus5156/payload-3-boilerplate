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
      name: 'services',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Full-Service Management',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Home', value: 'home' },
            { label: 'Key', value: 'key' },
            { label: 'Tool', value: 'tool' },
            { label: 'Dollar', value: 'dollar' },
            { label: 'Users', value: 'users' },
            { label: 'File', value: 'file' },
          ],
          defaultValue: 'home',
        },
        {
          name: 'ctaText',
          type: 'text',
          admin: {
            placeholder: 'Learn More',
          },
        },
        {
          name: 'ctaUrl',
          type: 'text',
          admin: {
            placeholder: '/services',
          },
        },
      ],
    },
  ],
}
