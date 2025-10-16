import React from 'react'
import { cn } from '@/utilities/cn'

/**
 * Skip to content link for keyboard navigation
 * Allows users to bypass navigation and jump directly to main content
 */
export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className={cn(
        'sr-only focus:not-sr-only',
        'focus:absolute focus:top-4 focus:left-4 focus:z-50',
        'focus:px-6 focus:py-3 focus:rounded',
        'focus:bg-warmGold focus:text-deepNavy',
        'focus:font-semibold focus:shadow-lg',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'transition-all'
      )}
    >
      Skip to main content
    </a>
  )
}
