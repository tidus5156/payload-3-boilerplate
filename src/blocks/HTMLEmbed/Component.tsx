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
  } as const

  // Handle null/undefined containerMaxWidth
  const width = containerMaxWidth || 'full'
  const className = widthClasses[width as keyof typeof widthClasses] || widthClasses.full

  return (
    <div className={className}>
      <HTMLEmbedClient embedCode={embedCode} />
    </div>
  )
}
