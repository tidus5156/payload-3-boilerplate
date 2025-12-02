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
      className="relative -mt-20 flex items-center justify-center text-white overflow-hidden"
      data-theme="dark"
      style={{
        minHeight: 'calc(var(--hero-high-impact-height, 100vh) + 80px)',
        clipPath: 'ellipse(100% 100% at 50% 0%)',
        paddingBottom: '3rem'
      }}
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center pt-20">
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
      <div className="absolute inset-0 select-none">
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="object-cover"
            priority={true}
            loading="eager"
            resource={media}
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-b"
          style={{
            background: `linear-gradient(to bottom, rgba(27, 58, 109, var(--hero-overlay-opacity, 0.6)), rgba(27, 58, 109, calc(var(--hero-overlay-opacity, 0.6) - 0.2)))`
          }}
        />
      </div>
    </div>
  )
}
