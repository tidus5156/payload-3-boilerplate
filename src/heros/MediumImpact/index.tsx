import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

// Helper function to render icon SVGs
const renderIcon = (iconType: string) => {
  const iconProps = { className: "w-5 h-5 text-warmGold" }

  switch (iconType) {
    case 'star':
      return (
        <svg {...iconProps} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    case 'home':
      return (
        <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'check':
      return (
        <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    case 'users':
      return (
        <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    case 'trending':
      return (
        <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    default:
      return null
  }
}

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText, trustIndicators }) => {
  return (
    <div
      className={`relative ${media ? 'bg-deepNavy' : ''}`}
      style={media ? {
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4rem), 0 100%)',
      } : undefined}
    >
      {/* Background Image with Overlay */}
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 z-0">
          <Media
            className="h-full w-full object-cover"
            imgClassName="h-full w-full object-cover"
            priority
            resource={media}
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-deepNavy/90 via-deepNavy/75 to-deepNavy/60" />

          {/* Animated floating orbs for parallax effect */}
          <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute top-20 left-20 w-96 h-96 bg-warmGold/30 rounded-full blur-3xl animate-float" />
            <div
              className="absolute bottom-40 right-40 w-80 h-80 bg-skyBlue/40 rounded-full blur-3xl animate-float"
              style={{ animationDelay: '1s', animationDuration: '4s' }}
            />
            <div
              className="absolute top-1/2 left-1/3 w-64 h-64 bg-warmGoldLight/20 rounded-full blur-2xl animate-float"
              style={{ animationDelay: '2s', animationDuration: '5s' }}
            />
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className={`relative ${media ? 'py-20 md:py-28 lg:py-36' : 'py-16 md:py-20'}`}>

        {/* Content Container */}
        <div className="container relative z-10">
          <div className="max-w-3xl hero-content">
            {richText && (
              <RichText
                className={`mb-8 ${media ? 'text-white' : ''}`}
                content={richText}
                enableGutter={false}
              />
            )}

            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                {links.map(({ link }, i) => {
                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      className={i === 0 ? 'inline-flex btn-shimmer hover:shadow-glow-gold' : 'inline-flex btn-shimmer'}
                    />
                  )
                })}
              </div>
            )}

            {/* Trust Indicators */}
            {media && Array.isArray(trustIndicators) && trustIndicators.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-6 md:gap-8">
                {trustIndicators.map((indicator, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-warmGold/20 flex items-center justify-center">
                      {renderIcon(indicator.icon)}
                    </div>
                    <span className="text-sm md:text-base font-semibold text-white">{indicator.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
