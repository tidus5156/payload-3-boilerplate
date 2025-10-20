import React from 'react'
import type { TrustBadgesBlock as TrustBadgesBlockType } from '@/payload-types'
import { Shield, Award, CheckCircle, Star, Building2, FileText, Users, Lock } from 'lucide-react'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'
import { typography, spacing } from '@/utilities/typography'

const iconMap = {
  shield: Shield,
  award: Award,
  check: CheckCircle,
  star: Star,
  building: Building2,
  certificate: FileText,
  users: Users,
  lock: Lock,
}

const backgroundColors = {
  transparent: '',
  lightGray: 'bg-lightGray',
  white: 'bg-white',
  deepNavy: 'bg-deepNavy text-white',
}

const gridClasses = {
  two: 'grid-cols-1 sm:grid-cols-2',
  three: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  four: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  six: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
}

const spacingClasses = {
  compact: spacing.sectionCompact,
  normal: spacing.section,
  spacious: spacing.sectionSpacious,
}

export const TrustBadgesBlock: React.FC<TrustBadgesBlockType> = ({
  heading,
  subheading,
  badges,
  layout = 'grid',
  columns = 'four',
  backgroundColor = 'lightGray',
  spacing: spacingProp = 'normal',
}) => {
  if (!badges || badges.length === 0) {
    return null
  }

  const isDark = backgroundColor === 'deepNavy'

  return (
    <section
      className={cn(
        spacingClasses[spacingProp as keyof typeof spacingClasses],
        backgroundColors[backgroundColor as keyof typeof backgroundColors]
      )}
      aria-labelledby={heading ? 'trust-badges-heading' : undefined}
    >
      <div className="container">
        {(heading || subheading) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {heading && (
              <h2
                id="trust-badges-heading"
                className={cn(typography.h2, isDark && 'text-white')}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={cn(typography.body, 'mt-4', isDark ? 'text-gray-300' : 'text-muted-foreground')}>
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Grid Layout */}
        {layout === 'grid' && (
          <div
            className={cn(
              'grid gap-6',
              gridClasses[columns as keyof typeof gridClasses]
            )}
          >
            {badges.map((badge, index) => {
              const IconComponent = iconMap[badge.icon as keyof typeof iconMap] || Shield

              return (
                <div
                  key={index}
                  className={cn(
                    "group relative p-6 rounded-xl text-center",
                    "border transition-all duration-300",
                    isDark
                      ? "bg-white/10 border-white/20 hover:bg-white/20"
                      : "bg-white border-lightGray shadow-soft hover:shadow-card-hover hover:-translate-y-1"
                  )}
                >
                  {/* Logo or Icon */}
                  <div className="flex justify-center mb-4">
                    {badge.logo && typeof badge.logo === 'object' ? (
                      <div className="relative w-16 h-16">
                        <Media
                          resource={badge.logo}
                          imgClassName="object-contain"
                          fill
                        />
                      </div>
                    ) : (
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center",
                        "bg-gradient-gold shadow-glow-gold",
                        "group-hover:scale-110 transition-transform duration-300"
                      )}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className={cn(
                    typography.h5,
                    "font-bold mb-2",
                    isDark ? "text-white" : "text-deepNavy"
                  )}>
                    {badge.title}
                  </h3>

                  {/* Description */}
                  {badge.description && (
                    <p className={cn(
                      "text-sm leading-relaxed",
                      isDark ? "text-gray-300" : "text-warmGray"
                    )}>
                      {badge.description}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Horizontal Row Layout */}
        {layout === 'row' && (
          <div className="flex flex-wrap justify-center gap-8">
            {badges.map((badge, index) => {
              const IconComponent = iconMap[badge.icon as keyof typeof iconMap] || Shield

              return (
                <div
                  key={index}
                  className={cn(
                    "group flex items-center gap-4 p-4 rounded-xl",
                    "min-w-[250px] max-w-[350px]",
                    "border transition-all duration-300",
                    isDark
                      ? "bg-white/10 border-white/20 hover:bg-white/20"
                      : "bg-white border-lightGray shadow-soft hover:shadow-card-hover"
                  )}
                >
                  {/* Logo or Icon */}
                  {badge.logo && typeof badge.logo === 'object' ? (
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Media
                        resource={badge.logo}
                        imgClassName="object-contain"
                        fill
                      />
                    </div>
                  ) : (
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                      "bg-gradient-gold shadow-glow-gold"
                    )}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={cn(
                      "text-sm font-bold mb-1",
                      isDark ? "text-white" : "text-deepNavy"
                    )}>
                      {badge.title}
                    </h3>
                    {badge.description && (
                      <p className={cn(
                        "text-xs",
                        isDark ? "text-gray-300" : "text-warmGray"
                      )}>
                        {badge.description}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Compact Icons Only Layout */}
        {layout === 'compact' && (
          <div className="flex flex-wrap justify-center items-center gap-8">
            {badges.map((badge, index) => {
              const IconComponent = iconMap[badge.icon as keyof typeof iconMap] || Shield

              return (
                <div
                  key={index}
                  className="group flex flex-col items-center gap-3"
                  title={badge.description || badge.title}
                >
                  {/* Logo or Icon */}
                  {badge.logo && typeof badge.logo === 'object' ? (
                    <div className="relative w-20 h-20 grayscale hover:grayscale-0 transition-all duration-300">
                      <Media
                        resource={badge.logo}
                        imgClassName="object-contain"
                        fill
                      />
                    </div>
                  ) : (
                    <div className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center",
                      "bg-gradient-gold shadow-glow-gold",
                      "group-hover:scale-110 transition-transform duration-300"
                    )}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  )}

                  {/* Title */}
                  <p className={cn(
                    "text-xs font-medium text-center",
                    isDark ? "text-white" : "text-charcoal"
                  )}>
                    {badge.title}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
