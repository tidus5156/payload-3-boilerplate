'use client'

import React from 'react'
import type { ProcessTimelineBlock as ProcessTimelineBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { typography, spacing } from '@/utilities/typography'
import { Phone, Calendar, Clipboard, CheckCircle, Users, Home } from 'lucide-react'

const iconMap = {
  phone: Phone,
  calendar: Calendar,
  clipboard: Clipboard,
  check: CheckCircle,
  users: Users,
  home: Home,
}

const spacingClasses = {
  compact: spacing.sectionCompact,
  normal: spacing.section,
  spacious: spacing.sectionSpacious,
}

export const ProcessTimelineBlock: React.FC<ProcessTimelineBlockType> = ({
  heading,
  subheading,
  steps,
  layout = 'vertical',
  spacing: spacingProp = 'normal',
}) => {
  return (
    <section
      className={cn(
        spacingClasses[spacingProp as keyof typeof spacingClasses],
        'bg-white relative overflow-hidden'
      )}
      aria-labelledby={heading ? 'process-heading' : undefined}
    >
      {/* Decorative background elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-warmGold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-skyBlue/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {(heading || subheading) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {heading && (
              <h2 id="process-heading" className={typography.h2}>
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

        {layout === 'vertical' ? (
          <div className="max-w-3xl mx-auto">
            <ol className="relative border-l-2 border-warmGold ml-6" role="list">
              {steps?.map((step, index) => {
                const Icon = step.icon ? iconMap[step.icon as keyof typeof iconMap] : null
                const isLast = index === steps.length - 1

                return (
                  <li key={index} className={cn('mb-10 ml-8', isLast && 'mb-0')}>
                    <div className="absolute -left-5 flex items-center justify-center w-10 h-10 bg-warmGold rounded-full ring-4 ring-background">
                      {Icon ? (
                        <Icon className="w-5 h-5 text-deepNavy" aria-hidden="true" />
                      ) : (
                        <span
                          className="font-bold text-deepNavy"
                          aria-label={`Step ${index + 1}`}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <h3 className={cn(typography.h4, 'mb-2')}>{step.title}</h3>
                    <p className={cn(typography.body, 'text-muted-foreground')}>
                      {step.description}
                    </p>
                  </li>
                )
              })}
            </ol>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-2">
            {steps?.map((step, index) => {
              const Icon = step.icon ? iconMap[step.icon as keyof typeof iconMap] : null
              const isLast = index === steps.length - 1

              return (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-warmGold rounded-full mb-4">
                      {Icon ? (
                        <Icon className="w-8 h-8 text-deepNavy" aria-hidden="true" />
                      ) : (
                        <span
                          className="text-2xl font-bold text-deepNavy"
                          aria-label={`Step ${index + 1}`}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <h3 className={cn(typography.h4, 'mb-2 text-base')}>{step.title}</h3>
                    <p className={cn(typography.small, 'text-muted-foreground')}>
                      {step.description}
                    </p>
                  </div>
                  {!isLast && (
                    <div className="hidden lg:flex items-center justify-center">
                      <div className="w-full h-0.5 bg-warmGold" aria-hidden="true"></div>
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
