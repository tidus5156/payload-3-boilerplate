import type { Block } from 'payload'

export const TeamGridBlock: Block = {
  slug: 'teamGrid',
  interfaceName: 'TeamGridBlock',
  labels: {
    singular: 'Team Grid Block',
    plural: 'Team Grid Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      admin: {
        placeholder: 'Meet Our Team',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      admin: {
        placeholder: 'Experienced professionals dedicated to maximizing your property investment',
      },
    },
    {
      name: 'teamMembers',
      type: 'relationship',
      relationTo: 'team-members',
      hasMany: true,
      admin: {
        description: 'Select specific team members to display. Leave empty to show all active members.',
      },
    },
    {
      name: 'showAllActive',
      type: 'checkbox',
      label: 'Show All Active Members',
      defaultValue: true,
      admin: {
        description: 'If checked, displays all active team members (sorted by order)',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Maximum Members to Show',
      defaultValue: 6,
      min: 1,
      max: 20,
      admin: {
        description: 'Maximum number of team members to display',
      },
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Grid Columns',
      defaultValue: 'three',
      options: [
        { label: '2 Columns', value: 'two' },
        { label: '3 Columns', value: 'three' },
        { label: '4 Columns', value: 'four' },
      ],
    },
    {
      name: 'showBio',
      type: 'checkbox',
      label: 'Show Bio',
      defaultValue: false,
      admin: {
        description: 'Display team member biographies',
      },
    },
    {
      name: 'showContact',
      type: 'checkbox',
      label: 'Show Contact Information',
      defaultValue: false,
      admin: {
        description: 'Display email and phone',
      },
    },
    {
      name: 'showLinkedIn',
      type: 'checkbox',
      label: 'Show LinkedIn Links',
      defaultValue: true,
      admin: {
        description: 'Display LinkedIn profile links',
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
        { label: 'White', value: 'white' },
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
