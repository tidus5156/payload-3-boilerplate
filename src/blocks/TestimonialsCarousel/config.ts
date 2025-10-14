import type { Block } from 'payload'

export const TestimonialsCarousel: Block = {
  slug: 'testimonialsCarousel',
  interfaceName: 'TestimonialsCarouselBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'What Our Clients Say',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: {
        description: 'Leave empty to show all featured testimonials',
      },
    },
    {
      name: 'showOnlyFeatured',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Only show testimonials marked as featured',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 20,
      admin: {
        description: 'Maximum number of testimonials to show',
      },
    },
  ],
}
