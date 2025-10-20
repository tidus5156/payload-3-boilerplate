import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'trustIndicators',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => ['mediumImpact', 'highImpact'].includes(type),
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Star', value: 'star' },
            { label: 'Home', value: 'home' },
            { label: 'Shield', value: 'shield' },
            { label: 'Check', value: 'check' },
            { label: 'Users', value: 'users' },
            { label: 'Trending', value: 'trending' },
          ],
          required: true,
        },
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      label: 'Trust Indicators',
      maxRows: 4,
    },
  ],
  label: false,
}
