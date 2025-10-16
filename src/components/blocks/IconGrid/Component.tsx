import React from 'react'

import {
  Shield,
  DollarSign,
  Clock,
  Users,
  Home,
  Phone,
  Check,
  Star,
  Wrench,
  FileText,
  Lock,
  MapPin,
} from 'lucide-react'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { cn } from '@/utilities/cn'

const iconMap = {
  shield: Shield,
  dollar: DollarSign,
  clock: Clock,
  users: Users,
  home: Home,
  phone: Phone,
  check: Check,
  star: Star,
  tool: Wrench,
  file: FileText,
  lock: Lock,
  map: MapPin,
}

export const IconGridBlock: React.FC<any> = ({
  heading,
  subheading,
  items,
  columns = 'three',
}) => {
  const gridClasses = {
    two: 'grid-cols-1 md:grid-cols-2',
    three: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    four: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-lightGray/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-warmGold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-skyBlue/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

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

        {/* Grid */}
        <div className={`grid ${gridClasses[columns]} gap-8 lg:gap-10`}>
          {items?.map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home

            return (
              <ScrollAnimation
                key={index}
                animation="fade-in-up"
                delay={index * 100}
              >
                <div
                  className={cn(
                    "group relative text-center p-8 rounded-2xl bg-white",
                    "border border-gray-100 shadow-soft",
                    "hover:shadow-card-hover hover:-translate-y-2",
                    "transition-all duration-500 ease-out",
                    "overflow-hidden"
                  )}
                >
                  {/* Gradient accent border on hover */}
                  <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10" style={{ padding: '1px' }}>
                    <div className="w-full h-full bg-white rounded-2xl" />
                  </div>

                  {/* Icon */}
                  <div className={cn(
                    "relative inline-flex items-center justify-center w-20 h-20 mb-6",
                    "rounded-2xl bg-gradient-gold",
                    "group-hover:scale-110 group-hover:rotate-6",
                    "transition-all duration-500 ease-out",
                    "shadow-lg group-hover:shadow-glow-gold"
                  )}>
                    <IconComponent className="w-10 h-10 text-white relative z-10" />
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-gold opacity-50 blur-xl rounded-2xl group-hover:opacity-75 transition-opacity duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl lg:text-2xl font-bold text-deepNavy mb-4 group-hover:text-warmGoldDark transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-base text-warmGray leading-relaxed">
                    {item.description}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}
