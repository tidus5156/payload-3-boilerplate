import React from 'react'
import type { HeroCTABlock as HeroCTABlockType } from '@/payload-types'
import { Button } from '@/components/ui'
import Link from 'next/link'

const backgroundColors = {
  deepNavy: 'bg-deepNavy',
  skyBlue: 'bg-skyBlue',
  warmGold: 'bg-warmGold',
  lightGray: 'bg-lightGray',
}

const textColors = {
  deepNavy: 'text-white',
  skyBlue: 'text-white',
  warmGold: 'text-deepNavy',
  lightGray: 'text-deepNavy',
}

export const HeroCTABlock: React.FC<HeroCTABlockType> = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundColor = 'deepNavy',
}) => {
  const bgClass = backgroundColors[backgroundColor as keyof typeof backgroundColors] || backgroundColors.deepNavy
  const textClass = textColors[backgroundColor as keyof typeof textColors] || textColors.deepNavy

  return (
    <section className={`py-16 lg:py-24 ${bgClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold ${textClass} mb-6`}>
            {headline}
          </h2>

          {/* Subheadline */}
          {subheadline && (
            <p className={`font-body text-lg sm:text-xl ${textClass === 'text-white' ? 'text-lightGray' : 'text-warmGray'} mb-10 max-w-2xl mx-auto`}>
              {subheadline}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryCTA?.text && primaryCTA?.url && (
              <Link href={primaryCTA.url}>
                <Button
                  variant={backgroundColor === 'deepNavy' || backgroundColor === 'skyBlue' ? 'primary' : 'secondary'}
                  size="lg"
                  className="min-w-[200px]"
                >
                  {primaryCTA.text}
                </Button>
              </Link>
            )}
            {secondaryCTA?.text && secondaryCTA?.url && (
              <Link href={secondaryCTA.url}>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[200px]"
                >
                  {secondaryCTA.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
