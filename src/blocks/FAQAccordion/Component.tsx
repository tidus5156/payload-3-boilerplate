import React from 'react'
import type { FAQAccordionBlock as FAQAccordionBlockType, Faq } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cn } from '@/utilities/cn'
import { typography, spacing } from '@/utilities/typography'
import RichText from '@/components/RichText'
import { FAQAccordionClient } from './ComponentClient'

const backgroundColors = {
  transparent: '',
  lightGray: 'bg-lightGray',
  white: 'bg-white',
}

const spacingClasses = {
  compact: spacing.sectionCompact,
  normal: spacing.section,
  spacious: spacing.sectionSpacious,
}

export const FAQAccordionBlock: React.FC<FAQAccordionBlockType> = async ({
  heading,
  subheading,
  faqs: selectedFaqs,
  filterByCategory,
  showFeaturedOnly = false,
  limit = 10,
  defaultExpanded = true,
  allowMultiple = false,
  backgroundColor = 'transparent',
  spacing: spacingProp = 'normal',
}) => {
  const payload = await getPayload({ config: configPromise })

  let faqs: Faq[] = []

  // If specific FAQs are selected, use those
  if (selectedFaqs && selectedFaqs.length > 0) {
    faqs = selectedFaqs.filter((faq): faq is Faq => typeof faq === 'object')
  } else {
    // Otherwise, query FAQs based on filters
    const query: any = {
      published: { equals: true },
    }

    if (showFeaturedOnly) {
      query.featured = { equals: true }
    }

    if (filterByCategory && filterByCategory.length > 0) {
      query.category = { in: filterByCategory }
    }

    const result = await payload.find({
      collection: 'faqs',
      where: query,
      limit: limit || 10,
      sort: 'order',
    })

    faqs = result.docs
  }

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <section
      className={cn(
        spacingClasses[spacingProp as keyof typeof spacingClasses],
        backgroundColors[backgroundColor as keyof typeof backgroundColors]
      )}
      aria-labelledby={heading ? 'faq-heading' : undefined}
    >
      <div className="container max-w-4xl">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 id="faq-heading" className={typography.h2}>
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={cn(typography.body, 'mt-4 text-muted-foreground')}>
                {subheading}
              </p>
            )}
          </div>
        )}

        <FAQAccordionClient
          faqs={faqs}
          defaultExpanded={defaultExpanded ?? true}
          allowMultiple={allowMultiple ?? false}
        />
      </div>
    </section>
  )
}
