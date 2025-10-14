import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'order'],
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
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'David Patterson',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Founder & CEO',
          },
        },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Professional headshot (square format recommended)',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      admin: {
        description: 'Team member biography (2-3 paragraphs)',
      },
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        {
          name: 'certification',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Certified Property Manager (CPM)',
          },
        },
      ],
      admin: {
        initCollapsed: true,
        description: 'Professional certifications and credentials',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          admin: {
            placeholder: 'david@allaypm.com',
          },
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            placeholder: '(404) 555-0100',
          },
        },
      ],
    },
    {
      name: 'linkedin',
      type: 'text',
      admin: {
        placeholder: 'https://linkedin.com/in/davidpatterson',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
        position: 'sidebar',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show on website',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
