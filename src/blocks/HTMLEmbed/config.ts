import type { Block } from 'payload'

export const HTMLEmbed: Block = {
  slug: 'htmlEmbed',
  interfaceName: 'HTMLEmbedBlock',
  fields: [
    {
      name: 'embedLabel',
      type: 'text',
      label: 'Label (Internal Use)',
      admin: {
        description: 'Optional label to help identify this embed in the CMS (not displayed on frontend)',
        placeholder: 'e.g., "Property Listing Widget" or "Application Form"',
      },
    },
    {
      name: 'embedCode',
      type: 'textarea',
      label: 'HTML/JavaScript Embed Code',
      required: true,
      admin: {
        description: 'Paste the full HTML and/or JavaScript embed code provided by your third-party service',
        rows: 10,
        placeholder: '<div>...</div>\n<script>...</script>',
      },
    },
    {
      name: 'containerMaxWidth',
      type: 'select',
      label: 'Container Width',
      defaultValue: 'full',
      options: [
        {
          label: 'Full Width (100%)',
          value: 'full',
        },
        {
          label: 'Container (max-width)',
          value: 'container',
        },
        {
          label: 'Narrow (prose width)',
          value: 'narrow',
        },
      ],
      admin: {
        description: 'Control how wide the embed appears on the page',
      },
    },
  ],
  labels: {
    plural: 'HTML Embeds',
    singular: 'HTML Embed',
  },
}
