import type { Block } from 'payload'

export const ProcessTimeline: Block = {
  slug: 'processTimeline',
  interfaceName: 'ProcessTimelineBlock',
  labels: {
    singular: 'Process Timeline',
    plural: 'Process Timelines',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 3,
      maxRows: 6,
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Step Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Phone', value: 'phone' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Clipboard', value: 'clipboard' },
            { label: 'CheckCircle', value: 'check' },
            { label: 'Users', value: 'users' },
            { label: 'Home', value: 'home' },
          ],
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout Style',
      defaultValue: 'vertical',
      options: [
        { label: 'Vertical Timeline', value: 'vertical' },
        { label: 'Horizontal Steps', value: 'horizontal' },
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
  ],
}
