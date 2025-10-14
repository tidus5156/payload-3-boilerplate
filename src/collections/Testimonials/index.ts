import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'neighborhood', 'rating', 'featured'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      return !!user
    },
    update: ({ req: { user } }) => {
      return !!user
    },
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'clientName',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Sarah Johnson',
          },
        },
        {
          name: 'rating',
          type: 'number',
          required: true,
          min: 1,
          max: 5,
          defaultValue: 5,
          admin: {
            description: 'Star rating (1-5)',
          },
        },
      ],
    },
    {
      name: 'clientPhoto',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional client headshot',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'propertyType',
          type: 'select',
          options: [
            { label: 'Single Family Home', value: 'single-family' },
            { label: 'Condo', value: 'condo' },
            { label: 'Townhome', value: 'townhome' },
            { label: 'Multi-Family', value: 'multi-family' },
          ],
          admin: {
            placeholder: 'Type of property they own',
          },
        },
        {
          name: 'neighborhood',
          type: 'text',
          admin: {
            placeholder: 'Buckhead',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'numberOfProperties',
          type: 'number',
          min: 1,
          defaultValue: 1,
          admin: {
            description: 'Number of properties managed',
          },
        },
        {
          name: 'clientSince',
          type: 'number',
          admin: {
            placeholder: '2020',
            description: 'Year they became a client',
          },
        },
      ],
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: {
        placeholder: 'Working with Allay has been transformative for my rental property business...',
        description: 'The testimonial quote (2-4 sentences recommended)',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        placeholder: 'https://youtube.com/watch?v=xxxxx',
        description: 'Optional video testimonial URL (YouTube, Vimeo)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show in featured testimonials (homepage, carousels)',
      },
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Approved for public display',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
