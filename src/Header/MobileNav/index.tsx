'use client'

import React, { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'

export const MobileNav: React.FC<{ header: HeaderType; isTransparent?: boolean }> = ({ header, isTransparent = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const navItems = header?.navItems || []

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className={cn(isTransparent && !isOpen && "text-white hover:text-white hover:bg-white/10")}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className={cn("h-6 w-6", isTransparent && "text-white")} />}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu */}
          <nav
            id="mobile-menu"
            className={cn(
              'fixed top-[72px] left-0 right-0 bg-background border-b border-border shadow-lg z-50 max-h-[calc(100vh-72px)] overflow-y-auto',
              'transform transition-transform duration-300',
              isOpen ? 'translate-y-0' : '-translate-y-full'
            )}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="container py-6 flex flex-col gap-2">
              {navItems.map((navItem, i) => {
                const hasChildren = navItem.children && navItem.children.length > 0
                const isExpanded = expandedItems.includes(i)

                if (hasChildren) {
                  return (
                    <div key={i} className="border-b border-border last:border-0">
                      <button
                        onClick={() => toggleExpanded(i)}
                        className="w-full flex items-center justify-between py-3 text-lg font-medium hover:text-primary transition-colors"
                        aria-expanded={isExpanded}
                      >
                        <span>{navItem.link?.label}</span>
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 transition-transform',
                            isExpanded && 'rotate-180'
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      {isExpanded && (
                        <div className="pl-4 pb-3 flex flex-col gap-2">
                          {navItem.children!.map((childItem, childIndex) => (
                            <div key={childIndex} onClick={() => setIsOpen(false)}>
                              <CMSLink
                                {...childItem.link}
                                appearance="link"
                                className="block py-2 text-base hover:text-primary transition-colors"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <div
                    key={i}
                    onClick={() => setIsOpen(false)}
                    className="border-b border-border last:border-0 py-3"
                  >
                    <CMSLink
                      {...navItem.link}
                      appearance="link"
                      className="text-lg font-medium"
                    />
                  </div>
                )
              })}
            </div>
          </nav>
        </>
      )}
    </>
  )
}
