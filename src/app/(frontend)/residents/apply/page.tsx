import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply Online | Allay Property Management',
  description:
    'Apply for a rental property with Allay Property Management. Quick and easy online application process for Metro Atlanta rental homes.',
  openGraph: {
    title: 'Apply for a Rental Property | Allay Property Management',
    description: 'Submit your rental application online. Fast, secure, and easy application process.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Allay Property Management - Apply Online',
      },
    ],
  },
}

export default function ResidentsApplyPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1B3A6D] to-[#2D5A8F] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Apply Online</h1>
            <p className="text-xl text-white/90 mb-8">
              Complete your rental application quickly and securely. Most applications are
              processed within 24-48 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Application Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Application Requirements */}
            <div className="mb-12 bg-[#F5F7FA] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-[#1B3A6D] mb-6">Before You Apply</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#1B3A6D] mb-3">
                    What You&apos;ll Need:
                  </h3>
                  <ul className="space-y-2 text-[#6C757D]">
                    <li className="flex items-start">
                      <span className="text-[#7A9B76] mr-2">✓</span>
                      Valid government-issued ID
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#7A9B76] mr-2">✓</span>
                      Proof of income (pay stubs, tax returns, etc.)
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#7A9B76] mr-2">✓</span>
                      Employment verification
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#7A9B76] mr-2">✓</span>
                      Rental history (previous landlord contact info)
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#7A9B76] mr-2">✓</span>
                      Application fee ($50 per applicant)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1B3A6D] mb-3">
                    Application Requirements:
                  </h3>
                  <ul className="space-y-2 text-[#6C757D]">
                    <li className="flex items-start">
                      <span className="text-[#7A9B76] mr-2">✓</span>
                      Credit score of 600 or higher
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#7A9B76] mr-2">✓</span>
                      Monthly income 3x the rent amount
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#7A9B76] mr-2">✓</span>
                      Positive rental history
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#7A9B76] mr-2">✓</span>
                      No recent evictions
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#7A9B76] mr-2">✓</span>
                      Clean criminal background
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Application Embed Placeholder */}
            <div className="bg-white rounded-lg border-2 border-[#5A9FD4] p-8">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-2xl font-bold text-[#1B3A6D] mb-4">
                  Application Form Coming Soon
                </h3>
                <p className="text-[#6C757D] mb-6 max-w-2xl mx-auto">
                  We&apos;re setting up our online application system. In the meantime, please contact
                  us directly to apply for a property.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-block bg-[#C9A961] text-[#1B3A6D] font-semibold px-8 py-4 rounded-md hover:bg-[#B8985F] transition-colors"
                  >
                    Contact Us to Apply
                  </a>
                  <a
                    href="/properties"
                    className="inline-block bg-[#5A9FD4] text-white font-semibold px-8 py-4 rounded-md hover:bg-[#4A8FC4] transition-colors"
                  >
                    View Available Properties
                  </a>
                </div>
              </div>

              {/*
                TODO: Replace the above placeholder with actual application embed code when available
                Example embed structure:

                <HTMLEmbedClient
                  embedCode={`
                    <iframe
                      src="YOUR_APPLICATION_FORM_URL"
                      width="100%"
                      height="1200px"
                      frameborder="0"
                    ></iframe>
                  `}
                />
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1B3A6D] mb-4">Need Help with Your Application?</h2>
            <p className="text-lg text-[#6C757D] mb-8">
              Our team is here to assist you through the application process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/residents/faq"
                className="inline-block bg-white text-[#1B3A6D] border-2 border-[#5A9FD4] font-semibold px-8 py-4 rounded-md hover:bg-[#F5F7FA] transition-colors"
              >
                View Resident FAQs
              </a>
              <a
                href="tel:+14045550123"
                className="inline-block bg-[#1B3A6D] text-white font-semibold px-8 py-4 rounded-md hover:bg-[#2D5A8F] transition-colors"
              >
                Call (404) 555-0123
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
