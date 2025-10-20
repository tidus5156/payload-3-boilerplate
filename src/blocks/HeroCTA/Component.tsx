import React from 'react'
import type { HeroCTABlock as HeroCTABlockType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/cn'

const backgroundColors = {
  deepNavy: 'bg-gradient-to-br from-deepNavy via-deepNavy to-skyBlue/20 text-white',
  skyBlue: 'bg-gradient-to-br from-skyBlue to-skyBlue/80 text-white',
  warmGold: 'bg-gradient-to-br from-warmGold to-warmGoldLight text-deepNavy',
  lightGray: 'bg-gray-100 text-gray-900',
}

export const HeroCTABlock: React.FC<HeroCTABlockType> = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundColor = 'deepNavy',
}) => {
  return (
    <div className={cn(
      'py-20 px-4 relative overflow-hidden',
      backgroundColors[backgroundColor as keyof typeof backgroundColors] || backgroundColors.deepNavy
    )}>
      {/* Animated floating orbs for deepNavy background */}
      {backgroundColor === 'deepNavy' && (
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-10 right-20 w-96 h-96 bg-warmGold/40 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 left-20 w-80 h-80 bg-skyBlue/50 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '1.5s', animationDuration: '4s' }}
          />
        </div>
      )}

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {headline && (
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {headline}
            </h2>
          )}

          {subheadline && (
            <p className="text-xl mb-10 text-white/95">
              {subheadline}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA?.text && primaryCTA?.url && (
              <CMSLink
                type="custom"
                url={primaryCTA.url}
                label={primaryCTA.text}
                appearance="primary"
                size="lg"
              />
            )}

            {secondaryCTA?.text && secondaryCTA?.url && (
              <CMSLink
                type="custom"
                url={secondaryCTA.url}
                label={secondaryCTA.text}
                appearance="secondary"
                size="lg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
