import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'featured', 'order'],
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
      return !!user
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Full-Service Property Management',
          },
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
          admin: {
            description: 'Order in which services appear (lower numbers first)',
          },
        },
      ],
    },
    ...slugField(),
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Building/Network', value: 'building' },
        { label: 'Users/People', value: 'users' },
        { label: 'Clipboard/Checklist', value: 'clipboard' },
        { label: 'Megaphone/Marketing', value: 'megaphone' },
        { label: 'Wrench/Tools', value: 'wrench' },
        { label: 'Chart/Analytics', value: 'chart' },
        { label: 'Dollar/Money', value: 'dollar' },
        { label: 'Shield/Security', value: 'shield' },
        { label: 'Home/House', value: 'home' },
        { label: 'Calendar', value: 'calendar' },
      ],
      admin: {
        description: 'Icon to display with this service',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: {
        placeholder: 'Complete property management services from marketing to maintenance...',
        description: '1-2 sentences for cards and previews',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      required: true,
      admin: {
        description: 'Detailed description for the service detail page',
      },
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: "What's included in this service",
      },
    },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
      admin: {
        description: 'Key benefits of this service',
      },
    },
    {
      name: 'pricingNote',
      type: 'textarea',
      admin: {
        placeholder: 'Starting at $X/month or X% of monthly rent',
        description: 'Optional pricing information',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero image for service detail page',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Feature on homepage',
          },
        },
        {
          name: 'published',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Published and visible to public',
          },
        },
      ],
    },
  ],
  timestamps: true,
}
