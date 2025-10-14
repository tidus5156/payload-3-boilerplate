import React from 'react'
import type { PricingComparisonBlock as PricingComparisonBlockType } from '@/payload-types'
import { Check, X } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/cn'

export const PricingComparisonBlock: React.FC<PricingComparisonBlockType> = ({ heading, subheading, plans }) => {
  return (
    <div className="container my-16">
      {(heading || subheading) && (
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
          {subheading && <p className="text-lg text-muted-foreground">{subheading}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans?.map((plan, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-col p-8 rounded-lg border bg-card',
              plan.highlighted
                ? 'border-primary shadow-xl scale-105 relative'
                : 'border-border'
            )}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Recommended
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              {plan.description && (
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
              )}
              <div className="mt-4">
                <span className="text-5xl font-bold">{plan.price}</span>
                {plan.priceDescription && (
                  <span className="text-muted-foreground ml-2">{plan.priceDescription}</span>
                )}
              </div>
            </div>

            {plan.features && plan.features.length > 0 && (
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {item.included ? (
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    )}
                    <span className={cn(
                      'text-sm',
                      !item.included && 'text-muted-foreground line-through'
                    )}>
                      {item.feature}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {plan.ctaText && plan.ctaUrl && (
              <CMSLink
                type="custom"
                url={plan.ctaUrl}
                label={plan.ctaText}
                appearance={plan.highlighted ? 'default' : 'outline'}
                className="w-full"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
