import React from 'react'
import type { ServicesGridBlock as ServicesGridBlockType } from '@/payload-types'
import { Home, Key, Wrench, DollarSign, Users, FileText } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { Check } from 'lucide-react'

const iconMap = {
  home: Home,
  key: Key,
  tool: Wrench,
  dollar: DollarSign,
  users: Users,
  file: FileText,
}

export const ServicesGridBlock: React.FC<ServicesGridBlockType> = ({ heading, subheading, services }) => {
  return (
    <div className="container my-16">
      {(heading || subheading) && (
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
          {subheading && <p className="text-lg text-muted-foreground">{subheading}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services?.map((service, index) => {
          const Icon = service.icon ? iconMap[service.icon as keyof typeof iconMap] : null

          return (
            <div
              key={index}
              className="flex flex-col p-8 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
            >
              {Icon && (
                <div className="mb-6 p-4 rounded-lg bg-primary/10 w-fit">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
              )}

              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>

              {service.features && service.features.length > 0 && (
                <ul className="space-y-3 mb-6 flex-grow">
                  {service.features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item.feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {service.ctaText && service.ctaUrl && (
                <CMSLink
                  type="custom"
                  url={service.ctaUrl}
                  label={service.ctaText}
                  appearance="outline"
                  className="mt-auto"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
