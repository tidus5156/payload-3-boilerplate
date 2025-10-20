import type { Block } from 'payload'

export const TrustBadgesBlock: Block = {
  slug: 'trustBadges',
  interfaceName: 'TrustBadgesBlock',
  labels: {
    singular: 'Trust Badges Block',
    plural: 'Trust Badges Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      admin: {
        placeholder: 'Trusted & Certified',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      admin: {
        placeholder: 'Backed by industry-leading certifications and partnerships',
      },
    },
    {
      name: 'badges',
      type: 'array',
      label: 'Badges',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Badge Title',
              required: true,
              admin: {
                placeholder: 'RE/MAX Backed',
                width: '50%',
              },
            },
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              required: true,
              options: [
                { label: 'Shield/Protection', value: 'shield' },
                { label: 'Award/Achievement', value: 'award' },
                { label: 'Check/Verified', value: 'check' },
                { label: 'Star/Rating', value: 'star' },
                { label: 'Building/Organization', value: 'building' },
                { label: 'Certificate', value: 'certificate' },
                { label: 'Users/Community', value: 'users' },
                { label: 'Lock/Security', value: 'lock' },
              ],
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          admin: {
            placeholder: 'Access to RE/MAX resources and nationwide network',
          },
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Badge Logo/Image',
          admin: {
            description: 'Optional logo or badge image (will replace icon if provided)',
          },
        },
      ],
      admin: {
        initCollapsed: true,
        description: 'Add trust badges, certifications, and credentials',
      },
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Horizontal Row', value: 'row' },
        { label: 'Compact Icons Only', value: 'compact' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Grid Columns',
      defaultValue: 'four',
      options: [
        { label: '2 Columns', value: 'two' },
        { label: '3 Columns', value: 'three' },
        { label: '4 Columns', value: 'four' },
        { label: '6 Columns', value: 'six' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData.layout === 'grid',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'lightGray',
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'Light Gray', value: 'lightGray' },
        { label: 'White', value: 'white' },
        { label: 'Deep Navy', value: 'deepNavy' },
      ],
    },
    {
      name: 'spacing',
      type: 'select',
      label: 'Spacing',
      defaultValue: 'normal',
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Normal', value: 'normal' },
        { label: 'Spacious', value: 'spacious' },
      ],
    },
  ],
}
