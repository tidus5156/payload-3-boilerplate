import React from 'react'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const HeroBlock: React.FC<any> = ({
  headline,
  subheadline,
  backgroundImage,
  primaryCTA,
  secondaryCTA,
  trustBar,
}) => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {backgroundImage && typeof backgroundImage !== 'string' && (
        <div className="absolute inset-0 z-0">
          <Media
            resource={backgroundImage}
            className="w-full h-full object-cover"
            imgClassName="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deepNavy/90 to-deepNavy/70" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {headline}
          </h1>

          {/* Subheadline */}
          {subheadline && (
            <p className="font-body text-xl sm:text-2xl md:text-3xl text-lightGray mb-10 max-w-3xl mx-auto">
              {subheadline}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {primaryCTA?.text && primaryCTA?.url && (
              <Link href={primaryCTA.url}>
                <Button variant="primary" size="lg" className="min-w-[240px]">
                  {primaryCTA.text}
                </Button>
              </Link>
            )}
            {secondaryCTA?.text && secondaryCTA?.url && (
              <Link href={secondaryCTA.url}>
                <Button variant="outline" size="lg" className="min-w-[240px]">
                  {secondaryCTA.text}
                </Button>
              </Link>
            )}
          </div>

          {/* Trust Bar */}
          {trustBar && trustBar.length > 0 && (
            <div className="flex flex-wrap gap-8 justify-center items-center text-white/90">
              {trustBar.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-warmGold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-body text-sm sm:text-base font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
