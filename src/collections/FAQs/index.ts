import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'featured', 'order'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'What is your tenant screening process?',
      },
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      admin: {
        description: 'Provide a detailed answer to the question',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          defaultValue: 'general',
          options: [
            { label: 'General', value: 'general' },
            { label: 'Pricing & Fees', value: 'pricing' },
            { label: 'Services', value: 'services' },
            { label: 'Leasing & Tenants', value: 'leasing' },
            { label: 'Maintenance & Repairs', value: 'maintenance' },
            { label: 'Legal & Compliance', value: 'legal' },
          ],
          admin: {
            width: '50%',
            description: 'Categorize for easier filtering',
          },
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: {
            width: '50%',
            description: 'Lower numbers appear first',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show in featured/homepage FAQ sections',
            width: '50%',
          },
        },
        {
          name: 'published',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Make visible on the website',
            width: '50%',
          },
        },
      ],
    },
  ],
  timestamps: true,
}
