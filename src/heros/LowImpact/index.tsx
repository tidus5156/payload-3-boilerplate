import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container pt-32 pb-8">
      <div className="max-w-[48rem] hero-content-light">
        {children || (richText && <RichText content={richText} enableGutter={false} enableProse={false} />)}
      </div>
    </div>
  )
}
