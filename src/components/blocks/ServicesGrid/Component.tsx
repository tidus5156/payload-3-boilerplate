import React from 'react'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@/components/ui'
import Link from 'next/link'
import { Home, Key, Wrench, DollarSign, Users, FileText } from 'lucide-react'

const iconMap = {
  home: Home,
  key: Key,
  tool: Wrench,
  dollar: DollarSign,
  users: Users,
  file: FileText,
}

export const ServicesGridBlock: React.FC<any> = ({
  heading,
  subheading,
  services,
}) => {
  return (
    <section className="py-16 lg:py-24 bg-lightGray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(heading || subheading) && (
          <div className="text-center mb-12 lg:mb-16">
            {heading && (
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-deepNavy mb-4">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="font-body text-lg sm:text-xl text-warmGray max-w-3xl mx-auto">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Home

            return (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-skyBlue text-white mb-4">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <CardTitle className="font-heading text-2xl text-deepNavy">
                    {service.title}
                  </CardTitle>
                  {service.description && (
                    <CardDescription className="font-body text-base text-warmGray">
                      {service.description}
                    </CardDescription>
                  )}
                </CardHeader>

                {service.features && service.features.length > 0 && (
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-2 font-body text-sm text-charcoal"
                        >
                          <svg
                            className="w-5 h-5 text-sageGreen flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{feature.feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}

                {service.ctaText && service.ctaUrl && (
                  <CardFooter>
                    <Link href={service.ctaUrl} className="w-full">
                      <Button variant="outline" className="w-full">
                        {service.ctaText}
                      </Button>
                    </Link>
                  </CardFooter>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
