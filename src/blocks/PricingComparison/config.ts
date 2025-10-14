import type { Block } from 'payload'

export const PricingComparison: Block = {
  slug: 'pricingComparison',
  interfaceName: 'PricingComparisonBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Simple, Transparent Pricing',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue: 'No hidden fees. No surprises. Just great service.',
    },
    {
      name: 'plans',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Full Service Management',
          },
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          admin: {
            placeholder: '8%',
            description: 'Price display (e.g., "8%", "$99/mo")',
          },
        },
        {
          name: 'priceDescription',
          type: 'text',
          admin: {
            placeholder: 'of monthly rent',
          },
        },
        {
          name: 'description',
          type: 'textarea',
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
            {
              name: 'included',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Highlight as recommended plan',
          },
        },
        {
          name: 'ctaText',
          type: 'text',
          defaultValue: 'Get Started',
        },
        {
          name: 'ctaUrl',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },
  ],
}
