import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@payload-config'

interface NeighborhoodPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })

    const neighborhoods = await payload.find({
      collection: 'neighborhoods',
      limit: 1000,
    })

    return neighborhoods.docs.map((neighborhood) => ({
      slug: neighborhood.slug,
    }))
  } catch (error) {
    console.warn('Could not generate static params for neighborhoods:', error)
    return []
  }
}

export async function generateMetadata({ params }: NeighborhoodPageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const neighborhoods = await payload.find({
    collection: 'neighborhoods',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const neighborhood = neighborhoods.docs[0]

  if (!neighborhood) {
    return {
      title: 'Neighborhood Not Found',
    }
  }

  return {
    title: `${neighborhood.name} Property Management | Allay Property Management`,
    description: neighborhood.metaDescription || `Expert property management services in ${neighborhood.name}, Georgia. Local expertise backed by RE/MAX resources.`,
  }
}

export default async function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const neighborhoods = await payload.find({
    collection: 'neighborhoods',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const neighborhood = neighborhoods.docs[0]

  if (!neighborhood) {
    notFound()
  }

  return (
    <article className="pb-24">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-deepNavy via-deepNavy to-skyBlue py-16 md:py-20">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
              {neighborhood.name} Property Management
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Expert property management services in {neighborhood.name}, Georgia
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-warmGold text-deepNavy font-semibold rounded hover:bg-warmGoldHover transition-colors"
              >
                Get Free Rental Analysis
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Neighborhood */}
      {neighborhood.description && (
        <div className="container py-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-deepNavy mb-6">
            About {neighborhood.name}
          </h2>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: JSON.stringify(neighborhood.description) }} />
        </div>
      )}

      {/* Market Data */}
      {neighborhood.marketData && (
        <div className="bg-lightGray py-16">
          <div className="container">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-deepNavy mb-8 text-center">
              {neighborhood.name} Rental Market Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {neighborhood.marketData.averageRent1BR && (
                <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                  <div className="text-3xl font-bold text-warmGold mb-2">
                    ${neighborhood.marketData.averageRent1BR.toLocaleString()}
                  </div>
                  <div className="text-warmGray">1 Bedroom</div>
                </div>
              )}
              {neighborhood.marketData.averageRent2BR && (
                <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                  <div className="text-3xl font-bold text-warmGold mb-2">
                    ${neighborhood.marketData.averageRent2BR.toLocaleString()}
                  </div>
                  <div className="text-warmGray">2 Bedroom</div>
                </div>
              )}
              {neighborhood.marketData.averageRent3BR && (
                <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                  <div className="text-3xl font-bold text-warmGold mb-2">
                    ${neighborhood.marketData.averageRent3BR.toLocaleString()}
                  </div>
                  <div className="text-warmGray">3 Bedroom</div>
                </div>
              )}
              {neighborhood.marketData.averageRent4BR && (
                <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                  <div className="text-3xl font-bold text-warmGold mb-2">
                    ${neighborhood.marketData.averageRent4BR.toLocaleString()}
                  </div>
                  <div className="text-warmGray">4+ Bedroom</div>
                </div>
              )}
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {neighborhood.marketData.averageVacancyRate !== null && (
                <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                  <div className="text-3xl font-bold text-sageGreen mb-2">
                    {neighborhood.marketData.averageVacancyRate}%
                  </div>
                  <div className="text-warmGray">Average Vacancy Rate</div>
                </div>
              )}
              {neighborhood.marketData.averageDaysOnMarket && (
                <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                  <div className="text-3xl font-bold text-skyBlue mb-2">
                    {neighborhood.marketData.averageDaysOnMarket}
                  </div>
                  <div className="text-warmGray">Avg. Days on Market</div>
                </div>
              )}
              {neighborhood.marketData.propertiesManaged && (
                <div className="bg-white p-6 rounded-lg shadow-soft text-center">
                  <div className="text-3xl font-bold text-deepNavy mb-2">
                    {neighborhood.marketData.propertiesManaged}
                  </div>
                  <div className="text-warmGray">Properties We Manage</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Schools */}
      {neighborhood.topSchools && neighborhood.topSchools.length > 0 && (
        <div className="container py-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-deepNavy mb-8">
            Top-Rated Schools in {neighborhood.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhood.topSchools.map((school: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-soft border border-lightGray">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading text-lg font-semibold text-deepNavy flex-1">
                    {school.schoolName}
                  </h3>
                  {school.rating && (
                    <div className="bg-warmGold text-white px-3 py-1 rounded-full text-sm font-bold ml-2">
                      {school.rating}/10
                    </div>
                  )}
                </div>
                {school.schoolType && (
                  <div className="text-sm text-warmGray capitalize">{school.schoolType}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Commute Times */}
      {neighborhood.commuteTimes && (
        <div className="bg-lightGray py-16">
          <div className="container">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-deepNavy mb-8">
              Commute Times from {neighborhood.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {neighborhood.commuteTimes.commuteToMidtown && (
                <div className="bg-white p-6 rounded-lg shadow-soft">
                  <div className="text-warmGray mb-2">To Midtown</div>
                  <div className="text-2xl font-bold text-deepNavy">
                    {neighborhood.commuteTimes.commuteToMidtown}
                  </div>
                </div>
              )}
              {neighborhood.commuteTimes.commuteToDowntown && (
                <div className="bg-white p-6 rounded-lg shadow-soft">
                  <div className="text-warmGray mb-2">To Downtown</div>
                  <div className="text-2xl font-bold text-deepNavy">
                    {neighborhood.commuteTimes.commuteToDowntown}
                  </div>
                </div>
              )}
              {neighborhood.commuteTimes.commuteToAirport && (
                <div className="bg-white p-6 rounded-lg shadow-soft">
                  <div className="text-warmGray mb-2">To Airport</div>
                  <div className="text-2xl font-bold text-deepNavy">
                    {neighborhood.commuteTimes.commuteToAirport}
                  </div>
                </div>
              )}
              {neighborhood.commuteTimes.commuteToPerimeterMall && (
                <div className="bg-white p-6 rounded-lg shadow-soft">
                  <div className="text-warmGray mb-2">To Perimeter</div>
                  <div className="text-2xl font-bold text-deepNavy">
                    {neighborhood.commuteTimes.commuteToPerimeterMall}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="container py-16">
        <div className="bg-gradient-to-br from-deepNavy to-skyBlue rounded-2xl p-12 text-center text-white">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Maximize Your {neighborhood.name} Property?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get your free rental analysis and discover what your property could earn
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-warmGold text-deepNavy font-semibold rounded-lg hover:bg-warmGoldHover transition-colors"
          >
            Get Free Rental Analysis
          </a>
        </div>
      </div>
    </article>
  )
}
