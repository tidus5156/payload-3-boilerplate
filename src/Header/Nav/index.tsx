'use client'

import React, { useState, useRef, useEffect } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/cn'

export const HeaderNav: React.FC<{ header: HeaderType; isTransparent?: boolean }> = ({ header, isTransparent = false }) => {
  const navItems = header?.navItems || []
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([])

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
              onMouseEnter={() => setOpenDropdown(i)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setOpenDropdown(isOpen ? null : i)
                  }
                }}
                className={cn(
                  'flex items-center gap-1 text-sm font-medium transition-all duration-300',
                  isTransparent
                    ? 'text-white hover:text-warmGold'
                    : 'text-foreground hover:text-primary',
                  isOpen && (isTransparent ? 'text-warmGold' : 'text-primary')
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
                  className="absolute left-0 pt-2"
                  style={{ top: '100%' }}
                >
                  <div
                    className="min-w-64 bg-white border border-lightGray rounded-lg shadow-xl z-50"
                    role="menu"
                  >
                    <div className="py-2">
                      {navItem.children!.map((childItem, childIndex) => (
                        <div key={childIndex} className="px-1">
                          <CMSLink
                            {...childItem.link}
                            appearance="link"
                            className="block px-4 py-2.5 text-sm text-charcoal hover:bg-lightGray hover:text-skyBlue rounded-md transition-colors whitespace-nowrap"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        }

        return (
          <CMSLink
            key={i}
            {...navItem.link}
            appearance="link"
            className={cn(
              "text-sm font-medium transition-all duration-300",
              isTransparent ? "text-white hover:text-warmGold" : ""
            )}
          />
        )
      })}

      {/* CTA Button - Get Free Analysis */}
      <Link
        href="/contact"
        className={cn(
          "px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap ml-2",
          isTransparent
            ? "bg-warmGold text-deepNavy hover:bg-warmGoldLight hover:shadow-warmGold/50"
            : "bg-warmGold text-deepNavy hover:bg-warmGoldLight"
        )}
      >
        Get Free Analysis
      </Link>
    </nav>
  )
}
