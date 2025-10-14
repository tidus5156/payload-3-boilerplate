import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    propertyOwners: [
      { name: 'Why Choose Allay', href: '/property-owners#why-choose' },
      { name: 'Our Process', href: '/our-process' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Free Rental Analysis', href: '/contact' },
      { name: 'Testimonials', href: '/testimonials' },
    ],
    residents: [
      { name: 'Resident Portal', href: '/residents#portal' },
      { name: 'Pay Rent Online', href: '/residents#pay-rent' },
      { name: 'Maintenance Requests', href: '/residents#maintenance' },
      { name: 'Resident Resources', href: '/residents#resources' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/about#team' },
      { name: 'Areas We Serve', href: '/areas-we-serve' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
  }

  return (
    <footer className="bg-deepNavy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div>
              <div className="text-2xl font-heading font-bold mb-4">
                <span className="text-white">Allay</span>
                <span className="text-warmGold"> PM</span>
              </div>
              <p className="font-body text-lightGray mb-6 leading-relaxed">
                Professional property management services for Metro Atlanta. Stress less, earn more.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-lightGray">
                  <Phone className="w-4 h-4 text-warmGold" />
                  <a href="tel:+14045550100" className="hover:text-warmGold transition-colors">
                    (404) 555-0100
                  </a>
                </div>
                <div className="flex items-center gap-2 text-lightGray">
                  <Mail className="w-4 h-4 text-warmGold" />
                  <a href="mailto:info@allaypm.com" className="hover:text-warmGold transition-colors">
                    info@allaypm.com
                  </a>
                </div>
                <div className="flex items-start gap-2 text-lightGray">
                  <MapPin className="w-4 h-4 text-warmGold mt-1 flex-shrink-0" />
                  <span>123 Main Street<br />Atlanta, GA 30303</span>
                </div>
              </div>
            </div>

            {/* Property Owners Links */}
            <div>
              <h3 className="font-heading text-lg font-bold mb-4 text-white">Property Owners</h3>
              <ul className="space-y-2">
                {footerLinks.propertyOwners.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-body text-lightGray hover:text-warmGold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Residents Links */}
            <div>
              <h3 className="font-heading text-lg font-bold mb-4 text-white">Residents</h3>
              <ul className="space-y-2">
                {footerLinks.residents.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-body text-lightGray hover:text-warmGold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-heading text-lg font-bold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-body text-lightGray hover:text-warmGold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="font-body text-sm text-lightGray">
              © {currentYear} Allay Property Management. All rights reserved.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lightGray hover:text-warmGold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lightGray hover:text-warmGold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lightGray hover:text-warmGold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex gap-4">
              <Link href="/privacy" className="font-body text-sm text-lightGray hover:text-warmGold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="font-body text-sm text-lightGray hover:text-warmGold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* RE/MAX Attribution */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="font-body text-xs text-lightGray">
              Allay Property Management is affiliated with RE/MAX Metro Atlanta
              <br />
              Each office is independently owned and operated.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
