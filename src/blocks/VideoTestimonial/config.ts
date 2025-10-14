import type { Block } from 'payload'

export const VideoTestimonial: Block = {
  slug: 'videoTestimonial',
  interfaceName: 'VideoTestimonialBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Hear From Our Clients',
    },
    {
      name: 'testimonial',
      type: 'relationship',
      relationTo: 'testimonials',
      required: true,
      hasMany: false,
      admin: {
        description: 'Select a testimonial with a video URL',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Video Left, Text Right', value: 'left' },
        { label: 'Video Right, Text Left', value: 'right' },
        { label: 'Video Full Width', value: 'full' },
      ],
    },
  ],
}
