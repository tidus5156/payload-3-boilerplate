import React from 'react'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@/components/ui'
import Link from 'next/link'
import { Home, Key, Wrench, DollarSign, Users, FileText, ArrowRight, Check } from 'lucide-react'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { cn } from '@/utilities/cn'

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
    <section className="py-20 lg:py-32 bg-gradient-to-br from-lightGray via-white to-lightGray relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-skyBlue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-warmGold/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        {(heading || subheading) && (
          <ScrollAnimation animation="fade-in-down" className="text-center mb-16 lg:mb-20">
            {heading && (
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-deepNavy mb-4 relative inline-block">
                {heading}
                <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-gold rounded-full" />
              </h2>
            )}
            {subheading && (
              <p className="font-body text-lg sm:text-xl text-warmGray max-w-3xl mx-auto mt-6">
                {subheading}
              </p>
            )}
          </ScrollAnimation>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services?.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Home
            const isPopular = index === 1 // Middle card is featured

            return (
              <ScrollAnimation
                key={index}
                animation="fade-in-up"
                delay={index * 150}
              >
                <div className={cn(
                  "group relative h-full flex flex-col rounded-2xl bg-white border",
                  isPopular ? "border-warmGold shadow-glow-gold" : "border-gray-100 shadow-soft",
                  "hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                )}>
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute -right-12 top-6 rotate-45 bg-gradient-gold text-white text-xs font-bold py-1 px-12 shadow-lg">
                      POPULAR
                    </div>
                  )}

                  {/* Gradient accent on top */}
                  <div className={cn(
                    "absolute top-0 left-0 right-0 h-1 bg-gradient-accent transform origin-left",
                    "scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  )} />

                  <div className="p-8 flex-grow flex flex-col">
                    {/* Icon */}
                    <div className={cn(
                      "relative inline-flex items-center justify-center w-16 h-16 mb-6",
                      "rounded-xl bg-gradient-navy shadow-lg",
                      "group-hover:scale-110 transition-transform duration-500"
                    )}>
                      <IconComponent className="w-8 h-8 text-white relative z-10" />
                      <div className="absolute inset-0 bg-gradient-navy opacity-50 blur-lg rounded-xl" />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl lg:text-3xl font-bold text-deepNavy mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    {service.description && (
                      <p className="font-body text-base text-warmGray mb-6 leading-relaxed">
                        {service.description}
                      </p>
                    )}

                    {/* Features */}
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-3 mb-8 flex-grow">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-3 font-body text-sm text-charcoal"
                          >
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sageGreen/10 flex items-center justify-center mt-0.5">
                              <Check className="w-3 h-3 text-sageGreen" strokeWidth={3} />
                            </div>
                            <span className="leading-relaxed">{feature.feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* CTA Button */}
                    {service.ctaText && service.ctaUrl && (
                      <Link href={service.ctaUrl} className="mt-auto">
                        <Button
                          variant={isPopular ? "default" : "outline"}
                          className={cn(
                            "w-full group/btn relative overflow-hidden",
                            isPopular && "bg-gradient-gold hover:shadow-glow-gold"
                          )}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {service.ctaText}
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </span>
                          {isPopular && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                          )}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}
