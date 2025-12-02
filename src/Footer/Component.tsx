import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footer?.navItems || []
  const copyrightText = footer?.copyrightText || '© 2025 Allay Property Management'

  return (
    <footer className="bg-deepNavy text-white">
      {/* Main Footer Content */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Property Owners */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Property Owners</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/property-owners"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Why Choose Us
              </Link>
              <Link
                href="/services"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Our Services
              </Link>
              <Link
                href="/pricing"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Pricing & Fees
              </Link>
              <Link
                href="/owners/process"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Our Process
              </Link>
              <Link
                href="/testimonials"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Testimonials
              </Link>
              <Link
                href="/contact"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Get Started
              </Link>
            </nav>
          </div>

          {/* Column 2: Residents */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Residents</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/properties"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Search Properties
              </Link>
              <Link
                href="/residents/apply"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Apply Online
              </Link>
              <Link
                href="/residents/pay-rent"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Pay Rent Online
              </Link>
              <Link
                href="/residents/maintenance"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Submit Maintenance
              </Link>
              <Link
                href="/residents"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Resident Resources
              </Link>
            </nav>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/about"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                About Allay
              </Link>
              <Link
                href="/about#team"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Our Team
              </Link>
              <Link
                href="/areas-we-serve"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Areas We Serve
              </Link>
              <Link
                href="/blog"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Blog & Resources
              </Link>
              <Link
                href="/contact"
                className="text-white/80 hover:text-warmGold transition-colors text-sm"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Connect</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="tel:4045550100"
                className="text-white/80 hover:text-warmGold transition-colors flex items-center gap-2"
              >
                <span className="text-warmGold">📞</span>
                (404) 555-0100
              </a>

              <a
                href="mailto:info@allaypm.com"
                className="text-white/80 hover:text-warmGold transition-colors flex items-center gap-2"
              >
                <span className="text-warmGold">✉️</span>
                info@allaypm.com
              </a>

              <div className="text-white/80 flex items-start gap-2">
                <span className="text-warmGold mt-1">📍</span>
                <div>
                  <div>3495 Piedmont Road NE, Suite 1100</div>
                  <div>Atlanta, Georgia 30305</div>
                </div>
              </div>

              <div className="text-white/80 mt-2">Monday-Friday: 9:00 AM - 6:00 PM</div>

              {/* Social Media Icons */}
              <div className="flex gap-3 mt-4">
                <a
                  href="https://facebook.com/allaypropertymanagement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-warmGold transition-colors text-xl"
                  aria-label="Facebook"
                >
                  📘
                </a>
                <a
                  href="https://instagram.com/allaypm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-warmGold transition-colors text-xl"
                  aria-label="Instagram"
                >
                  📷
                </a>
                <a
                  href="https://linkedin.com/company/allay-property-management"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-warmGold transition-colors text-xl"
                  aria-label="LinkedIn"
                >
                  💼
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          {/* Copyright and Legal Links */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="text-white/70 text-sm">{copyrightText}</div>

            <nav className="flex flex-wrap gap-4">
              <Link
                href="/terms"
                className="text-white/70 hover:text-warmGold transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-white/70 hover:text-warmGold transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/accessibility"
                className="text-white/70 hover:text-warmGold transition-colors text-sm"
              >
                Accessibility
              </Link>
            </nav>
          </div>

          {/* SEO Service Areas Bar */}
          <div className="text-white/50 text-xs leading-relaxed pt-4 border-t border-white/5">
            Serving: Atlanta, Buckhead, Virginia-Highland, Midtown, Decatur, Sandy Springs,
            Roswell, Alpharetta, Johns Creek, Marietta, Smyrna, Dunwoody, Brookhaven, Chamblee,
            Doraville, Tucker, Stone Mountain, Lithonia, Snellville, Lawrenceville, Duluth, Suwanee,
            Cumming, Canton, Woodstock, Kennesaw, Acworth, East Point, College Park, Fayetteville,
            Peachtree City
          </div>
        </div>
      </div>
    </footer>
  )
}
