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
    <section className="py-16 lg:py-24 bg-white">
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

        {/* Grid */}
        <div className={`grid ${gridClasses[columns]} gap-8 lg:gap-12`}>
          {items?.map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home

            return (
              <div
                key={index}
                className="group text-center p-6 rounded-lg hover:bg-lightGray transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-skyBlue/10 text-skyBlue mb-6 group-hover:bg-skyBlue group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-8 h-8" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-deepNavy mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-body text-base text-warmGray leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
