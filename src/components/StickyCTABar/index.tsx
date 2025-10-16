'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/cn'
import { Button } from '@/components/ui/button'
import { Phone, Mail, X } from 'lucide-react'

interface StickyCTABarProps {
  settings?: {
    stickyCTABar?: {
      enabled?: boolean | null
      heading?: string | null
      subheading?: string | null
      primaryButtonText?: string | null
      primaryButtonUrl?: string | null
      secondaryButtonText?: string | null
      secondaryButtonUrl?: string | null
    }
  }
}

export const StickyCTABar: React.FC<StickyCTABarProps> = ({ settings }) => {
  const config = settings?.stickyCTABar || {
    enabled: true,
    heading: 'Ready to get started?',
    subheading: 'Get your free consultation today',
    primaryButtonText: 'Call Now',
    primaryButtonUrl: 'tel:+14045550100',
    secondaryButtonText: 'Email Us',
    secondaryButtonUrl: '/contact',
  }
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 50% of viewport
      const scrolled = window.scrollY > window.innerHeight * 0.5
      setIsVisible(scrolled && !isDismissed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  if (!config.enabled || !isVisible) return null

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 bg-deepNavy text-white shadow-2xl',
        'transform transition-transform duration-300',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
      role="complementary"
      aria-label="Contact options"
    >
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm md:text-base">{config.heading}</div>
            <div className="text-xs md:text-sm opacity-90">
              {config.subheading}
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <Button variant="primary" size="lg" asChild className="whitespace-nowrap">
              <a href={config.primaryButtonUrl || '#'}>
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">{config.primaryButtonText || 'Call'}</span>
                <span className="sm:hidden">Call</span>
              </a>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              asChild
              className="hidden sm:inline-flex whitespace-nowrap"
            >
              <a href={config.secondaryButtonUrl || '#'}>
                <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                {config.secondaryButtonText || 'Email'}
              </a>
            </Button>
          </div>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-2 hover:bg-white/10 rounded transition-colors shrink-0"
            aria-label="Dismiss contact bar"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
