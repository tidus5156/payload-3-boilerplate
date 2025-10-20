import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { Check } from 'lucide-react'
import { cn } from '@/utilities/cn'

import type { Service } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const params = services.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Service({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/services/' + slug
  const service = await queryServiceBySlug({ slug })

  if (!service) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {/* Hero Section */}
      {service.heroImage && typeof service.heroImage === 'object' && (
        <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
          <Media
            resource={service.heroImage}
            fill
            imgClassName="object-cover"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deepNavy/70 to-deepNavy/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white text-center">
                {service.name}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Service name if no hero image */}
          {(!service.heroImage || typeof service.heroImage !== 'object') && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-deepNavy mb-8">
              {service.name}
            </h1>
          )}

          {/* Full Description */}
          {service.fullDescription && (
            <div className="mb-12">
              <RichText content={service.fullDescription} enableGutter={false} />
            </div>
          )}

          {/* Features Section */}
          {service.features && service.features.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-heading font-bold text-deepNavy mb-6">
                What&apos;s Included
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.features.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-lightGray/50 hover:bg-lightGray transition-colors"
                  >
                    <Check className="w-6 h-6 text-warmGold flex-shrink-0 mt-1" />
                    <span className="text-charcoal">{item.feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits Section */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-heading font-bold text-deepNavy mb-6">
                Key Benefits
              </h2>
              <div className="space-y-6">
                {service.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-6 rounded-xl border border-lightGray",
                      "bg-white shadow-soft hover:shadow-card-hover",
                      "transition-all duration-300"
                    )}
                  >
                    <h3 className="text-xl font-heading font-bold text-deepNavy mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-warmGray leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Note */}
          {service.pricingNote && (
            <div className="mb-12 p-6 rounded-xl bg-gradient-to-br from-warmGold/10 to-skyBlue/10 border border-warmGold/20">
              <h3 className="text-xl font-heading font-bold text-deepNavy mb-3">
                Pricing
              </h3>
              <p className="text-charcoal leading-relaxed">
                {service.pricingNote}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <CallToActionBlock
        links={[
          {
            link: {
              type: 'custom',
              label: 'Get Started',
              url: '/contact',
              appearance: 'primary',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'View All Services',
              url: '/services',
              appearance: 'secondary',
            },
          },
        ]}
        richText={{
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [
                  {
                    text: 'Ready to Get Started?',
                  },
                ],
                tag: 'h2',
              },
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'Contact us today to learn more about this service and how we can help maximize your property investment.',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        }}
      />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const service = await queryServiceBySlug({ slug })

  return generateMeta({ doc: service })
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
