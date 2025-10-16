import type { Block } from 'payload'

export const Statistics: Block = {
  slug: 'statistics',
  interfaceName: 'StatisticsBlock',
  labels: {
    singular: 'Statistics Block',
    plural: 'Statistics Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      admin: {
        description: 'Main heading for the statistics section',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 2,
      maxRows: 6,
      required: true,
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Number',
          required: true,
          admin: {
            description: 'The statistic number (e.g., 500, 98)',
          },
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix',
          admin: {
            description: 'Optional suffix (+, %, K, etc.)',
            placeholder: '+',
          },
        },
        {
          name: 'prefix',
          type: 'text',
          label: 'Prefix',
          admin: {
            description: 'Optional prefix ($, etc.)',
            placeholder: '$',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          admin: {
            description: 'Description of the statistic',
          },
        },
        {
          name: 'sublabel',
          type: 'text',
          label: 'Sublabel',
          admin: {
            description: 'Additional context (optional)',
          },
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Home', value: 'home' },
            { label: 'Users', value: 'users' },
            { label: 'Star', value: 'star' },
            { label: 'Award', value: 'award' },
            { label: 'TrendingUp', value: 'trending' },
            { label: 'CheckCircle', value: 'check' },
            { label: 'Heart', value: 'heart' },
            { label: 'Shield', value: 'shield' },
          ],
        },
        {
          name: 'animateCounter',
          type: 'checkbox',
          label: 'Animate Counter',
          defaultValue: true,
          admin: {
            description: 'Animate the number counting up on scroll',
          },
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'grid-4',
      options: [
        { label: '2 Columns', value: 'grid-2' },
        { label: '3 Columns', value: 'grid-3' },
        { label: '4 Columns', value: 'grid-4' },
      ],
      admin: {
        description: 'Number of columns in the grid',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'transparent',
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'Light Gray', value: 'lightGray' },
        { label: 'Deep Navy', value: 'deepNavy' },
        { label: 'Sky Blue (Light)', value: 'skyBlueLight' },
      ],
    },
    {
      name: 'spacing',
      type: 'select',
      label: 'Vertical Spacing',
      defaultValue: 'normal',
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Normal', value: 'normal' },
        { label: 'Spacious', value: 'spacious' },
      ],
    },
    {
      name: 'enableAnimations',
      type: 'checkbox',
      label: 'Enable Animations',
      defaultValue: true,
      admin: {
        description: 'Disable for accessibility or performance',
      },
    },
  ],
}
