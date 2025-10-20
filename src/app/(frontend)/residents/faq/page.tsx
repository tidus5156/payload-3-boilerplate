import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Faq } from '@/payload-types'
import { serializeLexical } from '@/components/RichText/serialize'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function ResidentsFAQPage() {
  const payload = await getPayload({ config })

  // Fetch FAQs relevant to residents/tenants
  const { docs: residentFAQs } = await payload.find({
    collection: 'faqs',
    where: {
      and: [
        {
          published: {
            equals: true,
          },
        },
        {
          category: {
            in: ['leasing', 'maintenance', 'legal'],
          },
        },
      ],
    },
    sort: '-featured,order',
    limit: 200,
  })

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1B3A6D] to-[#2D5A8F] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Resident FAQs</h1>
            <p className="text-xl text-white/90 mb-8">
              Common questions about renting with Allay Property Management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/properties"
                className="inline-block bg-[#C9A961] text-[#1B3A6D] font-semibold px-8 py-4 rounded-md hover:bg-[#B8985F] transition-colors"
              >
                Search Properties
              </a>
              <a
                href="/residents/apply"
                className="inline-block bg-white/10 text-white border-2 border-white font-semibold px-8 py-4 rounded-md hover:bg-white/20 transition-colors"
              >
                Apply Online
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Leasing FAQs */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-[#1B3A6D] mb-8">
                Leasing & Applications
              </h2>
              <div className="space-y-4">
                {residentFAQs
                  .filter((faq) => faq.category === 'leasing')
                  .map((faq, index) => (
                    <FAQItem key={faq.id} faq={faq} index={index} />
                  ))}
              </div>
              {residentFAQs.filter((faq) => faq.category === 'leasing').length === 0 && (
                <p className="text-center text-[#6C757D] py-8">
                  No leasing FAQs available at this time.
                </p>
              )}
            </div>

            {/* Maintenance FAQs */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-[#1B3A6D] mb-8">
                Maintenance & Repairs
              </h2>
              <div className="space-y-4">
                {residentFAQs
                  .filter((faq) => faq.category === 'maintenance')
                  .map((faq, index) => (
                    <FAQItem key={faq.id} faq={faq} index={index} />
                  ))}
              </div>
              {residentFAQs.filter((faq) => faq.category === 'maintenance').length === 0 && (
                <p className="text-center text-[#6C757D] py-8">
                  No maintenance FAQs available at this time.
                </p>
              )}
            </div>

            {/* Legal/Lease FAQs */}
            <div>
              <h2 className="text-3xl font-bold text-[#1B3A6D] mb-8">Lease & Legal</h2>
              <div className="space-y-4">
                {residentFAQs
                  .filter((faq) => faq.category === 'legal')
                  .map((faq, index) => (
                    <FAQItem key={faq.id} faq={faq} index={index} />
                  ))}
              </div>
              {residentFAQs.filter((faq) => faq.category === 'legal').length === 0 && (
                <p className="text-center text-[#6C757D] py-8">
                  No legal FAQs available at this time.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-[#1B3A6D]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Find Your Next Home?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Browse our available properties or contact us to learn more about renting with Allay
              Property Management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/properties"
                className="inline-block bg-[#C9A961] text-[#1B3A6D] font-semibold px-8 py-4 rounded-md hover:bg-[#B8985F] transition-colors"
              >
                View Properties
              </a>
              <a
                href="https://app.tenantcloud.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white/10 text-white border-2 border-white font-semibold px-8 py-4 rounded-md hover:bg-white/20 transition-colors"
              >
                Resident Portal Login
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FAQItem({ faq, index }: { faq: Faq; index: number }) {
  return (
    <details className="group bg-white rounded-lg border border-gray-200 hover:border-[#5A9FD4] transition-colors overflow-hidden">
      <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1B3A6D] pr-4">{faq.question}</h3>
        <svg
          className="w-6 h-6 text-[#5A9FD4] transition-transform group-open:rotate-180 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-6 pb-5 pt-2">
        <div className="prose prose-sm max-w-none text-[#6C757D]">
          {serializeLexical({ nodes: faq.answer?.root?.children })}
        </div>
      </div>
    </details>
  )
}

export async function generateMetadata() {
  return {
    title: 'Resident FAQs | Allay Property Management',
    description:
      'Get answers to common renter questions about applications, lease terms, maintenance requests, rent payment, and more in Metro Atlanta.',
    openGraph: {
      title: 'Resident FAQs | Allay Property Management',
      description:
        'Common questions answered for renters and residents in Allay-managed properties across Metro Atlanta.',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Allay Property Management - Resident FAQs',
        },
      ],
    },
  }
}
