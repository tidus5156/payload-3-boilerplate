import React from 'react'
import type { TestimonialsCarouselBlock as TestimonialsCarouselBlockType, Testimonial } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { StarRating } from './StarRating'

export const TestimonialsCarouselBlock: React.FC<TestimonialsCarouselBlockType> = async ({
  heading,
  subheading,
  testimonials: selectedTestimonials,
  showOnlyFeatured = true,
  limit = 6,
}) => {
  const payload = await getPayload({ config: configPromise })

  let testimonials: Testimonial[] = []

  // If specific testimonials are selected, use those
  if (selectedTestimonials && selectedTestimonials.length > 0) {
    testimonials = selectedTestimonials.filter((t): t is Testimonial => typeof t === 'object')
  } else {
    // Otherwise, query testimonials based on showOnlyFeatured setting
    const query: any = {
      approved: { equals: true },
    }

    if (showOnlyFeatured) {
      query.featured = { equals: true }
    }

    const result = await payload.find({
      collection: 'testimonials',
      where: query,
      limit: limit || 6,
      sort: '-createdAt',
    })

    testimonials = result.docs
  }

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <div className="container my-16">
      {(heading || subheading) && (
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
          {subheading && <p className="text-lg text-muted-foreground">{subheading}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
          >
            {/* Rating Stars */}
            <StarRating rating={testimonial.rating || 5} />

            {/* Quote */}
            <blockquote className="text-base mb-6 flex-grow">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Client Info */}
            <div className="flex items-start gap-3 pt-4 border-t border-border">
              <div className="flex-grow">
                <div className="font-semibold">{testimonial.clientName}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.neighborhood && <span>{testimonial.neighborhood}</span>}
                  {testimonial.propertyType && testimonial.neighborhood && <span> • </span>}
                  {testimonial.propertyType && (
                    <span className="capitalize">
                      {testimonial.propertyType.replace('-', ' ')}
                    </span>
                  )}
                </div>
                {testimonial.numberOfProperties && testimonial.numberOfProperties > 1 && (
                  <div className="text-sm text-muted-foreground">
                    {testimonial.numberOfProperties} properties
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
