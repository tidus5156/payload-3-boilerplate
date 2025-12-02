'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/cn'

import type { Header, Setting } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { MobileNav } from './MobileNav'

interface HeaderClientProps {
  header: Header
  settings: Setting
  transparentMode?: boolean // Enable transparent overlay mode for hero sections
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header, settings, transparentMode }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  // Auto-enable transparent mode for homepage or when hero sets dark theme
  const shouldUseTransparentMode = transparentMode !== undefined
    ? transparentMode
    : pathname === '/' || headerTheme === 'dark'

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Scroll detection for transparent mode
  useEffect(() => {
    if (!shouldUseTransparentMode) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100)
    }

    handleScroll() // Check initial position
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [shouldUseTransparentMode])

  // Extract logo from settings
  const logoMedia = typeof settings?.logo === 'object' && settings.logo !== null ? settings.logo : null
  const logoUrl = logoMedia?.url || null
  const siteName = settings?.siteName || 'Allay Property Management'

  // Determine header styles based on transparent mode and scroll state
  const isTransparent = shouldUseTransparentMode && !isScrolled

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent backdrop-blur-sm"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center transition-opacity duration-300 hover:opacity-80">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={siteName}
                width={193}
                height={34}
                priority
                className={cn(
                  "h-8 w-auto max-w-[12rem] transition-all duration-300",
                  isTransparent && "brightness-0 invert"
                )}
              />
            ) : (
              <Logo
                loading="eager"
                priority="high"
                className={cn(
                  "transition-all duration-300",
                  isTransparent ? "brightness-0 invert" : "invert dark:invert-0"
                )}
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <HeaderNav header={header} isTransparent={isTransparent} />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav header={header} isTransparent={isTransparent} />
          </div>
        </div>
      </div>
    </header>
  )
}
