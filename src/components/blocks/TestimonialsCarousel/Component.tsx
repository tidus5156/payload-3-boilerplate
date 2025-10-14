'use client'

import React from 'react'
import type { Testimonial } from "@/payload-types"
import { Card, CardContent } from '@/components/ui'
import { Media } from '@/components/Media'
import { Star } from 'lucide-react'

export const TestimonialsCarouselBlock: React.FC<any> = ({
  heading,
  subheading,
  testimonials,
}) => {
  // In a real implementation, you'd fetch testimonials here if not provided
  // For now, we'll just render what's provided
  const testimonialsToRender = Array.isArray(testimonials)
    ? (testimonials.filter((t) => typeof t !== 'string') as Testimonial[])
    : []

  if (testimonialsToRender.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(heading || subheading) && (
          <div className="text-center mb-12 lg:mb-16">
            {heading && (
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-deepNavy mb-4">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="font-body text-lg sm:text-xl text-warmGray max-w-3xl mx-auto">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsToRender.map((testimonial, index) => (
            <Card key={testimonial.id || index} className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warmGold text-warmGold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body text-base text-charcoal italic mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-lightGray">
                  {testimonial.clientPhoto && typeof testimonial.clientPhoto !== 'string' && (
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Media
                        resource={testimonial.clientPhoto}
                        className="w-full h-full object-cover"
                        imgClassName="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-heading font-semibold text-deepNavy">
                      {testimonial.clientName}
                    </p>
                    {testimonial.neighborhood && (
                      <p className="font-body text-sm text-warmGray">
                        {testimonial.propertyType && `${testimonial.propertyType} in `}
                        {testimonial.neighborhood}
                      </p>
                    )}
                    {testimonial.numberOfProperties && testimonial.numberOfProperties > 1 && (
                      <p className="font-body text-xs text-warmGray">
                        {testimonial.numberOfProperties} properties managed
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
