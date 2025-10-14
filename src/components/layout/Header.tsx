'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Menu, X, ChevronDown } from 'lucide-react'

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    {
      name: 'Services',
      href: '/services',
      dropdown: [
        { name: 'Full-Service Management', href: '/services#full-service' },
        { name: 'Tenant Placement', href: '/services#tenant-placement' },
        { name: 'Maintenance Coordination', href: '/services#maintenance' },
      ],
    },
    {
      name: 'Property Owners',
      href: '/property-owners',
      dropdown: [
        { name: 'Why Choose Us', href: '/property-owners#why-choose' },
        { name: 'Our Process', href: '/our-process' },
        { name: 'Pricing', href: '/pricing' },
      ],
    },
    {
      name: 'Residents',
      href: '/residents',
      dropdown: [
        { name: 'Resident Portal', href: '/residents#portal' },
        { name: 'Maintenance Requests', href: '/residents#maintenance' },
        { name: 'Pay Rent', href: '/residents#pay-rent' },
      ],
    },
    { name: 'About', href: '/about' },
    { name: 'Areas We Serve', href: '/areas-we-serve' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-2xl font-heading font-bold">
              <span className="text-deepNavy">Allay</span>
              <span className="text-warmGold"> PM</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="font-body text-base text-deepNavy hover:text-skyBlue transition-colors duration-200 flex items-center gap-1"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 font-body text-sm text-deepNavy hover:bg-lightGray hover:text-skyBlue transition-colors duration-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button variant="primary" size="md">
                Get Free Analysis
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-deepNavy hover:text-skyBlue transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-lightGray">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2 font-body text-base text-deepNavy hover:text-skyBlue transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-4 space-y-2 mt-2">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block py-1 font-body text-sm text-warmGray hover:text-skyBlue transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  Get Free Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
