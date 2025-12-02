import React from 'react'
import type { ServicesGridBlock as ServicesGridBlockType } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ServicesGridClient } from './Component.client'

export const ServicesGridBlock: React.FC<ServicesGridBlockType> = async ({
  heading,
  subheading,
  limit = 6,
  featuredOnly = false,
  ctaText = 'Learn More',
}) => {
  const payload = await getPayload({ config })

  // Query services from the database
  const servicesQuery = await payload.find({
    collection: 'services',
    where: {
      published: {
        equals: true,
      },
      ...(featuredOnly && {
        featured: {
          equals: true,
        },
      }),
    },
    sort: 'order',
    limit: limit || undefined,
    depth: 0,
  })

  // Map collection services to component format
  const services = servicesQuery.docs.map((service) => ({
    title: service.name,
    description: service.shortDescription,
    features: service.features || [],
    icon: service.icon,
    ctaText: ctaText || 'Learn More',
    ctaUrl: `/services/${service.slug || ''}`,
    slug: service.slug || '',
  }))

  return (
    <ServicesGridClient
      heading={heading}
      subheading={subheading}
      services={services}
    />
  )
}
