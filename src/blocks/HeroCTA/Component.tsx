import React from 'react'
import type { HeroCTABlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/cn'

const backgroundColors = {
  deepNavy: 'bg-slate-900 text-white',
  skyBlue: 'bg-blue-500 text-white',
  warmGold: 'bg-amber-500 text-white',
  lightGray: 'bg-gray-100 text-gray-900',
}

export const HeroCTABlock: React.FC<HeroCTABlock> = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundColor = 'deepNavy',
}) => {
  return (
    <div className={cn(
      'py-20 px-4',
      backgroundColors[backgroundColor as keyof typeof backgroundColors] || backgroundColors.deepNavy
    )}>
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {headline && (
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {headline}
            </h2>
          )}

          {subheadline && (
            <p className="text-xl mb-10 opacity-90">
              {subheadline}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA?.text && primaryCTA?.url && (
              <CMSLink
                type="custom"
                url={primaryCTA.url}
                label={primaryCTA.text}
                appearance="default"
                size="lg"
                className={cn(
                  backgroundColor === 'lightGray'
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-white text-slate-900 hover:bg-gray-100'
                )}
              />
            )}

            {secondaryCTA?.text && secondaryCTA?.url && (
              <CMSLink
                type="custom"
                url={secondaryCTA.url}
                label={secondaryCTA.text}
                appearance="outline"
                size="lg"
                className={cn(
                  backgroundColor === 'lightGray'
                    ? 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
                    : 'border-white text-white hover:bg-white hover:text-slate-900'
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
