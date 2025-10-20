import React from 'react'
import type { HTMLEmbedBlock as HTMLEmbedBlockProps } from '@/payload-types'
import { HTMLEmbedClient } from './Component.client'

export const HTMLEmbedBlock: React.FC<HTMLEmbedBlockProps> = ({
  embedCode,
  containerMaxWidth = 'full',
}) => {
  if (!embedCode) return null

  // Map container width option to Tailwind classes
  const widthClasses = {
    full: 'w-full',
    container: 'container mx-auto',
    narrow: 'max-w-prose mx-auto',
  }

  return (
    <div className={widthClasses[containerMaxWidth] || widthClasses.full}>
      <HTMLEmbedClient embedCode={embedCode} />
    </div>
  )
}
