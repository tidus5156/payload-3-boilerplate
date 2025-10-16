'use client'

import React, { useState, useRef, useEffect } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/cn'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown !== null) {
        const ref = dropdownRefs.current[openDropdown]
        if (ref && !ref.contains(event.target as Node)) {
          setOpenDropdown(null)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openDropdown])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <nav className="flex gap-3 items-center" role="navigation" aria-label="Desktop navigation">
      {navItems.map((navItem, i) => {
        const hasChildren = navItem.children && navItem.children.length > 0
        const isOpen = openDropdown === i

        if (hasChildren) {
          return (
            <div
              key={i}
              className="relative"
              ref={(el) => {
                dropdownRefs.current[i] = el
              }}
            >
              <button
                onClick={() => setOpenDropdown(isOpen ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setOpenDropdown(isOpen ? null : i)
                  }
                }}
                className={cn(
                  'flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary',
                  isOpen ? 'text-primary' : 'text-foreground'
                )}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                {navItem.link?.label}
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform',
                    isOpen && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50"
                  role="menu"
                >
                  <div className="py-1">
                    {navItem.children!.map((childItem, childIndex) => (
                      <div key={childIndex} className="px-1" onClick={() => setOpenDropdown(null)}>
                        <CMSLink
                          {...childItem.link}
                          appearance="link"
                          className="block px-3 py-2 text-sm hover:bg-accent rounded-sm transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        }

        return <CMSLink key={i} {...navItem.link} appearance="link" />
      })}
      <Link href="/search" aria-label="Search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" aria-hidden="true" />
      </Link>
    </nav>
  )
}
