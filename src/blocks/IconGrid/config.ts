import type { Block } from 'payload'

export const IconGrid: Block = {
  slug: 'iconGrid',
  interfaceName: 'IconGridBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        placeholder: 'Why Choose Allay?',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        placeholder: 'We combine local expertise with RE/MAX resources to maximize your rental income.',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Shield (Protection)', value: 'shield' },
            { label: 'Dollar Sign (Revenue)', value: 'dollar' },
            { label: 'Clock (Fast Service)', value: 'clock' },
            { label: 'Users (Tenant Screening)', value: 'users' },
            { label: 'Home (Property Care)', value: 'home' },
            { label: 'Phone (24/7 Support)', value: 'phone' },
            { label: 'Check (Quality)', value: 'check' },
            { label: 'Star (Excellence)', value: 'star' },
            { label: 'Tool (Maintenance)', value: 'tool' },
            { label: 'File (Documentation)', value: 'file' },
            { label: 'Lock (Security)', value: 'lock' },
            { label: 'Map Pin (Local)', value: 'map' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Guaranteed Rent',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            placeholder: 'We guarantee rent for 12 months with our exclusive tenant protection program.',
          },
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: 'three',
      options: [
        { label: '2 Columns', value: 'two' },
        { label: '3 Columns', value: 'three' },
        { label: '4 Columns', value: 'four' },
      ],
    },
  ],
}
