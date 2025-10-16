import React from 'react'
import { cn } from '@/utilities/cn'
import { spacing } from '@/utilities/typography'

type SectionBackgroundVariant =
  | 'white'                    // Clean white background
  | 'light-orbs'              // Light gray with decorative orbs
  | 'gradient-orbs'           // Gradient with decorative orbs
  | 'dark-gradient-orbs'      // Dark gradient with animated orbs
  | 'subtle-orbs'             // White with subtle orbs

type SectionSpacing = 'compact' | 'normal' | 'spacious'

interface SectionProps {
  children: React.ReactNode
  background?: SectionBackgroundVariant
  spacing?: SectionSpacing
  className?: string
  id?: string
  'aria-labelledby'?: string
}

/**
 * Section wrapper component that applies consistent background patterns and spacing
 *
 * @example
 * <Section background="light-orbs" spacing="spacious">
 *   <div className="container">
 *     <SectionHeader heading="Our Services" subheading="What we offer" />
 *     {content}
 *   </div>
 * </Section>
 */
export const Section: React.FC<SectionProps> = ({
  children,
  background = 'white',
  spacing: spacingProp = 'normal',
  className,
  ...props
}) => {
  const spacingClasses = {
    compact: spacing.sectionCompact,
    normal: spacing.section,
    spacious: spacing.sectionSpacious,
  }

  const backgroundClasses = {
    'white': 'bg-white',
    'light-orbs': 'bg-gradient-to-b from-white to-lightGray/50',
    'gradient-orbs': 'bg-gradient-to-br from-lightGray via-white to-lightGray',
    'dark-gradient-orbs': 'bg-gradient-to-br from-deepNavy via-deepNavy to-skyBlue/20 text-white',
    'subtle-orbs': 'bg-white',
  }

  const needsOrbs = background !== 'white'
  const hasAnimatedOrbs = background === 'dark-gradient-orbs'

  return (
    <section
      className={cn(
        spacingClasses[spacingProp],
        backgroundClasses[background],
        needsOrbs && 'relative overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Decorative Orbs */}
      {background === 'light-orbs' && (
        <>
          <div className="absolute top-0 left-0 w-72 h-72 bg-warmGold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-skyBlue/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </>
      )}

      {background === 'gradient-orbs' && (
        <>
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-skyBlue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-warmGold/10 rounded-full blur-3xl" />
        </>
      )}

      {background === 'dark-gradient-orbs' && (
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-10 right-20 w-96 h-96 bg-warmGold/40 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 left-20 w-80 h-80 bg-skyBlue/50 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '1.5s', animationDuration: '4s' }}
          />
        </div>
      )}

      {background === 'subtle-orbs' && (
        <>
          <div className="absolute top-10 right-10 w-72 h-72 bg-warmGold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-skyBlue/5 rounded-full blur-3xl" />
        </>
      )}

      {/* Content (with z-index if orbs present) */}
      {needsOrbs ? (
        <div className="relative z-10">{children}</div>
      ) : (
        children
      )}
    </section>
  )
}

/**
 * Standard section header component
 *
 * @example
 * <SectionHeader
 *   heading="Our Services"
 *   subheading="We provide comprehensive property management solutions"
 *   underline
 * />
 */
export const SectionHeader: React.FC<{
  heading?: string
  subheading?: string
  underline?: boolean
  className?: string
}> = ({ heading, subheading, underline = false, className }) => {
  if (!heading && !subheading) return null

  return (
    <div className={cn('text-center mb-12 lg:mb-16 max-w-3xl mx-auto', className)}>
      {heading && (
        <h2 className={cn(
          'font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4',
          underline && 'relative inline-block'
        )}>
          {heading}
          {underline && (
            <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-gold rounded-full" />
          )}
        </h2>
      )}
      {subheading && (
        <p className="font-body text-lg sm:text-xl text-warmGray mt-6">
          {subheading}
        </p>
      )}
    </div>
  )
}
