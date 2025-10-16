import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const FAQAccordion: Block = {
  slug: 'faqAccordion',
  interfaceName: 'FAQAccordionBlock',
  labels: {
    singular: 'FAQ Accordion',
    plural: 'FAQ Accordions',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      admin: {
        description: 'Main heading for the FAQ section',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      label: 'FAQs',
      hasMany: true,
      admin: {
        description: 'Select specific FAQs to display, or leave empty to use filters',
      },
    },
    {
      name: 'filterByCategory',
      type: 'select',
      label: 'Filter by Category',
      hasMany: true,
      admin: {
        description: 'Show only FAQs from selected categories (only if no specific FAQs selected)',
      },
      options: [
        { label: 'General', value: 'general' },
        { label: 'Pricing & Fees', value: 'pricing' },
        { label: 'Services', value: 'services' },
        { label: 'Leasing & Tenants', value: 'leasing' },
        { label: 'Maintenance & Repairs', value: 'maintenance' },
        { label: 'Legal & Compliance', value: 'legal' },
      ],
    },
    {
      name: 'showFeaturedOnly',
      type: 'checkbox',
      label: 'Show Featured Only',
      defaultValue: false,
      admin: {
        description: 'Show only FAQs marked as featured (only if no specific FAQs selected)',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Maximum FAQs',
      defaultValue: 10,
      min: 1,
      max: 50,
      admin: {
        description: 'Maximum number of FAQs to display',
      },
    },
    {
      name: 'defaultExpanded',
      type: 'checkbox',
      label: 'First Item Expanded by Default',
      defaultValue: true,
      admin: {
        description: 'Open the first FAQ item when the page loads',
      },
    },
    {
      name: 'allowMultiple',
      type: 'checkbox',
      label: 'Allow Multiple Open',
      defaultValue: false,
      admin: {
        description: 'Allow multiple FAQ items to be open at the same time',
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
