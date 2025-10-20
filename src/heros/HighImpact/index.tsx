'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white overflow-hidden"
      data-theme="dark"
      style={{
        clipPath: 'ellipse(100% 100% at 50% 0%)',
        paddingBottom: '3rem'
      }}
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center pt-[10.4rem]">
        <div className="max-w-[36.5rem] text-center">
          {richText && <RichText className="mb-6" content={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="object-cover"
            priority={true}
            loading="eager"
            resource={media}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-deepNavy/60 to-deepNavy/40" />
      </div>
    </div>
  )
}
