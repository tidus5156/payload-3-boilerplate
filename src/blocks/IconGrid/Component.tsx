import React from 'react'
import type { IconGridBlock } from '@/payload-types'
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
  MapPin
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

export const IconGridBlock: React.FC<IconGridBlock> = ({ heading, subheading, items, columns = 'three' }) => {
  const gridCols = {
    two: 'md:grid-cols-2',
    three: 'md:grid-cols-3',
    four: 'md:grid-cols-4',
  }

  return (
    <div className="container my-16">
      {(heading || subheading) && (
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
          {subheading && <p className="text-lg text-muted-foreground">{subheading}</p>}
        </div>
      )}

      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
        {items?.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap]

          return (
            <div
              key={index}
              className="flex flex-col items-start p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
            >
              {Icon && (
                <div className="mb-4 p-3 rounded-lg bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
