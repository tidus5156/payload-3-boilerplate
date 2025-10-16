'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { MobileNav } from './MobileNav'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <HeaderNav header={header} />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav header={header} />
          </div>
        </div>
      </div>
    </header>
  )
}
