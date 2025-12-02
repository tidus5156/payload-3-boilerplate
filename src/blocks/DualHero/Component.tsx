'use client'

import React, { useEffect, useState } from 'react'
import type { DualHeroBlock as DualHeroBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import Image from 'next/image'
import Link from 'next/link'

const overlayColors = {
  deepNavy: 'rgba(27, 58, 109, OPACITY)', // #1B3A6D
  skyBlue: 'rgba(90, 159, 212, OPACITY)', // #5A9FD4
  sageGreen: 'rgba(122, 155, 118, OPACITY)', // #7A9B76
  darkGray: 'rgba(45, 52, 54, OPACITY)', // #2D3436
  warmGray: 'rgba(108, 117, 125, OPACITY)', // #6C757D
}

// Decorative background patterns
const FloatingShapes: React.FC<{ type: 'owners' | 'residents' }> = ({ type }) => {
  const isOwner = type === 'owners'

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {/* Large circle */}
      <div
        className={cn(
          "absolute rounded-full blur-3xl animate-float",
          isOwner
            ? "w-[500px] h-[500px] bg-warmGold/30 -top-48 -right-48"
            : "w-[400px] h-[400px] bg-skyBlue/30 -top-32 -left-32"
        )}
        style={{ animationDelay: '0s', animationDuration: '8s' }}
      />

      {/* Medium circle */}
      <div
        className={cn(
          "absolute rounded-full blur-2xl animate-float",
          isOwner
            ? "w-[300px] h-[300px] bg-sageGreen/20 bottom-32 left-32"
            : "w-[250px] h-[250px] bg-warmGold/20 bottom-48 right-48"
        )}
        style={{ animationDelay: '2s', animationDuration: '10s' }}
      />

      {/* Small circle */}
      <div
        className={cn(
          "absolute rounded-full blur-xl animate-float",
          isOwner
            ? "w-[200px] h-[200px] bg-skyBlue/15 top-1/3 right-1/4"
            : "w-[180px] h-[180px] bg-sageGreen/15 top-2/3 left-1/3"
        )}
        style={{ animationDelay: '4s', animationDuration: '12s' }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          color: isOwner ? '#C9A961' : '#5A9FD4'
        }}
      />
    </div>
  )
}

// Icon rendering helper
const renderIcon = (iconType: string) => {
  const iconProps = { className: "w-5 h-5", fill: "none", stroke: "currentColor", strokeWidth: 2 }

  switch (iconType) {
    case 'star':
      return (
        <svg {...iconProps} viewBox="0 0 20 20" fill="currentColor" stroke="none">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    case 'home':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'check':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )
    case 'users':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    case 'trending':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    default:
      return null
  }
}

interface PanelProps {
  headline: string
  subheadline?: string | null
  backgroundImage: any
  overlayColor: string
  overlayOpacity: number
  primaryCTA: {
    text?: string | null
    url?: string | null
    openInNewTab?: boolean | null
  } | null
  secondaryCTA?: {
    text?: string | null
    url?: string | null
    openInNewTab?: boolean | null
  } | null
  trustIndicators?: Array<{
    icon?: string | null
    text?: string | null
  }> | null
  subtext?: string | null
  type: 'owners' | 'residents'
  enableParallax?: boolean
  mobileLabel?: string
}

const HeroPanel: React.FC<PanelProps> = ({
  headline,
  subheadline,
  backgroundImage,
  overlayColor,
  overlayOpacity,
  primaryCTA,
  secondaryCTA,
  trustIndicators,
  subtext,
  type,
  enableParallax = false,
  mobileLabel,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const overlayColorString =
    overlayColors[overlayColor as keyof typeof overlayColors]?.replace(
      'OPACITY',
      String(overlayOpacity / 100),
    ) || overlayColors.deepNavy.replace('OPACITY', '0.75')

  const imageUrl =
    typeof backgroundImage === 'object' && backgroundImage?.url
      ? backgroundImage.url
      : typeof backgroundImage === 'string'
        ? backgroundImage
        : ''

  const isOwner = type === 'owners'

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-start justify-center overflow-hidden px-6 lg:px-20 xl:px-24",
        isOwner
          ? "min-h-[55vh] pt-20 pb-16 lg:min-h-full lg:py-20"
          : "min-h-[45vh] pt-20 pb-12 lg:min-h-full lg:py-20"
      )}
    >
      {/* Background Image with Ken Burns effect */}
      {imageUrl && (
        <div
          className={cn(
            'absolute inset-0 z-0 overflow-hidden',
            enableParallax && 'transition-transform duration-700 ease-out',
          )}
        >
          <div className="absolute inset-0 scale-110 transition-transform duration-[20000ms] ease-out hover:scale-100">
            <Image
              src={imageUrl}
              alt={headline}
              fill
              className="object-cover"
              priority={isOwner}
              quality={90}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      )}

      {/* Enhanced Multi-Layer Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: isOwner
            ? `
              radial-gradient(ellipse at top right, ${overlayColors[overlayColor as keyof typeof overlayColors]?.replace('OPACITY', '0.4')}, transparent 60%),
              radial-gradient(ellipse at bottom left, rgba(122, 155, 118, 0.2), transparent 50%),
              linear-gradient(to right, ${overlayColorString}, ${overlayColors[overlayColor as keyof typeof overlayColors]?.replace('OPACITY', String((overlayOpacity - 20) / 100))})
            `
            : `
              radial-gradient(ellipse at top left, ${overlayColors[overlayColor as keyof typeof overlayColors]?.replace('OPACITY', '0.4')}, transparent 60%),
              radial-gradient(ellipse at bottom right, rgba(201, 169, 97, 0.15), transparent 50%),
              linear-gradient(to left, ${overlayColorString}, ${overlayColors[overlayColor as keyof typeof overlayColors]?.replace('OPACITY', String((overlayOpacity - 15) / 100))})
            `,
        }}
      />

      {/* Vignette Effect */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: isOwner
            ? 'radial-gradient(ellipse at center, transparent 40%, rgba(27, 58, 109, 0.3) 100%)'
            : 'radial-gradient(ellipse at center, transparent 40%, rgba(90, 159, 212, 0.2) 100%)'
        }}
      />

      {/* Floating Decorative Shapes */}
      <FloatingShapes type={type} />

      {/* Mobile Section Label */}
      {mobileLabel && (
        <div className="relative z-20 mb-8 lg:hidden">
          <div className="inline-flex items-center gap-2">
            <div className={cn(
              "w-12 h-px",
              isOwner ? "bg-gradient-to-r from-warmGold to-transparent" : "bg-gradient-to-r from-skyBlue to-transparent"
            )} />
            <span
              className={cn(
                "text-xs font-bold tracking-[0.2em] uppercase",
                isOwner ? "text-warmGold drop-shadow-[0_2px_8px_rgba(201,169,97,0.5)]" : "text-skyBlue drop-shadow-[0_2px_8px_rgba(90,159,212,0.5)]"
              )}
            >
              {mobileLabel}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn(
        "relative z-20 w-full transition-all duration-1000",
        isOwner ? "max-w-3xl lg:max-w-4xl" : "max-w-xl lg:max-w-2xl lg:mx-auto lg:text-center",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}>
        {/* Decorative Line Above Headline (Owner side only) */}
        {isOwner && (
          <div className="mb-8 animate-fade-in-down" style={{ animationDelay: '200ms' }}>
            <div className="h-1 w-20 bg-gradient-to-r from-warmGold via-warmGoldLight to-transparent rounded-full shadow-glow-gold" />
          </div>
        )}

        {/* Headline */}
        <h1 className={cn(
          "font-heading font-bold mb-8",
          "text-white",
          isOwner
            ? "text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[-0.02em] leading-[1.1] md:leading-[1.08]"
            : "text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-[-0.01em] leading-[1.15] md:leading-[1.1]",
          // Premium text shadow for depth
          isOwner
            ? "drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] [text-shadow:_0_2px_30px_rgba(201,169,97,0.3)]"
            : "drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] [text-shadow:_0_2px_30px_rgba(90,159,212,0.3)]"
        )}>
          {headline}
        </h1>

        {/* Subheadline */}
        {subheadline && (
          <p className={cn(
            "font-body text-white/95 mb-10",
            isOwner
              ? "text-lg md:text-xl lg:text-2xl leading-[1.6] md:leading-[1.7]"
              : "text-base md:text-lg lg:text-xl leading-[1.65] md:leading-[1.7]",
            "drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
            "animate-fade-in-up"
          )}
          style={{ animationDelay: '400ms' }}
          >
            {subheadline}
          </p>
        )}

        {/* CTA Buttons */}
        <div className={cn(
          "flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up w-full sm:w-auto",
          !isOwner && "lg:justify-center"
        )}
        style={{ animationDelay: '600ms' }}
        >
          {primaryCTA?.text && primaryCTA?.url && (
            <Link
              href={primaryCTA.url}
              target={primaryCTA.openInNewTab ? '_blank' : undefined}
              rel={primaryCTA.openInNewTab ? 'noopener noreferrer' : undefined}
              className={cn(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-2xl font-bold transition-all duration-500",
                // Mobile-optimized sizing: larger tap targets, full-width
                "w-full sm:w-auto px-8 py-4 text-base md:px-10 md:py-5 md:text-lg",
                "shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]",
                "hover:scale-[1.03] active:scale-[0.98]",
                isOwner
                  ? "bg-gradient-to-br from-warmGold via-warmGoldLight to-warmGold text-deepNavy"
                  : "bg-white text-skyBlue"
              )}
            >
              {/* Shimmer effect on hover */}
              <div className={cn(
                "absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full",
                isOwner
                  ? "bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  : "bg-gradient-to-r from-transparent via-skyBlue/10 to-transparent"
              )} />

              {/* Button text */}
              <span className="relative z-10 flex items-center gap-2">
                {primaryCTA.text}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>

              {/* Glow effect */}
              <div className={cn(
                "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl",
                isOwner ? "bg-warmGold/40" : "bg-white/30"
              )} />
            </Link>
          )}

          {secondaryCTA?.text && secondaryCTA?.url && (
            <Link
              href={secondaryCTA.url}
              target={secondaryCTA.openInNewTab ? '_blank' : undefined}
              rel={secondaryCTA.openInNewTab ? 'noopener noreferrer' : undefined}
              className={cn(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-2xl font-bold",
                // Mobile-optimized sizing: larger tap targets, full-width
                "w-full sm:w-auto px-8 py-4 text-base md:px-10 md:py-5 md:text-lg",
                "backdrop-blur-xl border-2 transition-all duration-500",
                "bg-white/5 border-white/30 text-white",
                "hover:bg-white/15 hover:border-white/60 hover:scale-[1.03] active:scale-[0.98]",
                "shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_30px_rgba(255,255,255,0.15)]"
              )}
            >
              <span className="relative z-10">{secondaryCTA.text}</span>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md border-2 border-white/50" />
            </Link>
          )}
        </div>

        {/* Subtext for residents */}
        {!isOwner && subtext && (
          <p className="text-white/80 text-sm md:text-base lg:text-center">
            {subtext}
          </p>
        )}

        {/* Trust Indicators (Owner side only) */}
        {isOwner && trustIndicators && trustIndicators.length > 0 && (
          <div className="flex flex-wrap gap-3 md:gap-4 mt-8 md:mt-12">
            {trustIndicators.map((indicator, index) => (
              <div
                key={index}
                className={cn(
                  "group relative flex items-center gap-2.5 md:gap-3 rounded-2xl transition-all duration-500 hover:scale-105",
                  "backdrop-blur-xl bg-white/5 border border-white/20",
                  "hover:bg-white/10 hover:border-white/40",
                  "shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_30px_rgba(201,169,97,0.2)]",
                  "animate-fade-in-up overflow-hidden",
                  // Mobile optimization: larger tap targets, better sizing
                  "px-4 py-3 md:px-6 md:py-4",
                  // Show only first 2 indicators on small mobile (< 640px), all on sm+ screens
                  index > 1 && "hidden sm:flex"
                )}
                style={{
                  animationDelay: `${800 + (index * 150)}ms`
                }}
              >
                {/* Glassmorphism inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon with premium styling */}
                <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-warmGold/30 to-warmGold/10 flex items-center justify-center text-warmGold transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                  <div className="absolute inset-0 rounded-xl bg-warmGold/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {indicator.icon && (
                    <div className="relative z-10 transform transition-transform duration-300">
                      {renderIcon(indicator.icon)}
                    </div>
                  )}
                </div>

                {/* Text */}
                <span className="relative z-10 text-xs md:text-sm lg:text-base font-bold text-white whitespace-nowrap drop-shadow-md">
                  {indicator.text}
                </span>

                {/* Hover shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Split ratio calculator
const getSplitClasses = (split: string) => {
  switch (split) {
    case '60-40':
      return { left: 'lg:w-[60%]', right: 'lg:w-[40%]' }
    case '65-35':
      return { left: 'lg:w-[65%]', right: 'lg:w-[35%]' }
    case '70-30':
      return { left: 'lg:w-[70%]', right: 'lg:w-[30%]' }
    case '50-50':
    default:
      return { left: 'lg:w-1/2', right: 'lg:w-1/2' }
  }
}

export const DualHeroBlock: React.FC<DualHeroBlockType> = ({
  leftPanel,
  rightPanel,
  mobileLabels,
  desktopSplit = '60-40',
  minHeight = '100vh',
  mobileLayout = 'stack',
  showScrollIndicator = true,
  enableParallax = false,
}) => {
  const splitClasses = getSplitClasses(desktopSplit || '60-40')

  return (
    <section className="relative w-full overflow-hidden" style={{ marginTop: '-80px' }}>
      {/* Split-Screen Layout */}
      <div
        className={cn(
          'relative flex w-full flex-col lg:flex-row',
          mobileLayout === 'stackReverse' && 'flex-col-reverse lg:flex-row',
        )}
        style={{
          minHeight: minHeight === '100vh' ? 'calc(100vh + 80px)' : (minHeight || 'calc(100vh + 80px)'),
        }}
      >
        {/* Left Panel - Property Owners */}
        {leftPanel && (
          <div className={cn('relative w-full', splitClasses.left)}>
            <HeroPanel
              headline={leftPanel.headline || ''}
              subheadline={leftPanel.subheadline}
              backgroundImage={leftPanel.backgroundImage}
              overlayColor={leftPanel.overlayColor || 'deepNavy'}
              overlayOpacity={leftPanel.overlayOpacity || 75}
              primaryCTA={leftPanel.primaryCTA || null}
              secondaryCTA={leftPanel.secondaryCTA || null}
              trustIndicators={leftPanel.trustIndicators || null}
              type="owners"
              enableParallax={enableParallax || undefined}
              mobileLabel={mobileLabels?.ownerLabel || undefined}
            />

            {/* Edge glow effect - Owner side */}
            <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-warmGold/30 to-transparent hidden lg:block pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-warmGold/10 to-transparent hidden lg:block pointer-events-none" />
          </div>
        )}

        {/* Right Panel - Residents */}
        {rightPanel && (
          <div className={cn('relative w-full', splitClasses.right)}>
            <HeroPanel
              headline={rightPanel.headline || ''}
              subheadline={rightPanel.subheadline}
              backgroundImage={rightPanel.backgroundImage}
              overlayColor={rightPanel.overlayColor || 'skyBlue'}
              overlayOpacity={rightPanel.overlayOpacity || 65}
              primaryCTA={rightPanel.primaryCTA || null}
              subtext={rightPanel.subtext}
              type="residents"
              enableParallax={enableParallax || undefined}
              mobileLabel={mobileLabels?.residentLabel || undefined}
            />

            {/* Edge glow effect - Resident side */}
            <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-skyBlue/30 to-transparent hidden lg:block pointer-events-none" />
            <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-skyBlue/10 to-transparent hidden lg:block pointer-events-none" />
          </div>
        )}

        {/* Vertical divider line between panels (desktop only) */}
        <div
          className="absolute top-0 bottom-0 hidden lg:block pointer-events-none"
          style={{
            left: desktopSplit === '60-40' ? '60%' :
                  desktopSplit === '65-35' ? '65%' :
                  desktopSplit === '70-30' ? '70%' : '50%'
          }}
        >
          <div className="relative h-full">
            {/* Main divider line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent transform -translate-x-1/2" />

            {/* Glow effects */}
            <div className="absolute left-0 top-1/4 w-[40px] h-[200px] bg-warmGold/10 blur-3xl transform -translate-x-1/2 animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute left-0 bottom-1/4 w-[40px] h-[200px] bg-skyBlue/10 blur-3xl transform -translate-x-1/2 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          </div>
        </div>

        {/* Mobile separator */}
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent lg:hidden my-4" />
      </div>

    </section>
  )
}
