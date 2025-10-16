'use client'

import React, { useEffect, useState } from 'react'
import type { StatisticsBlock as StatisticsBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { typography, spacing } from '@/utilities/typography'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Home, Users, Star, Award, TrendingUp, CheckCircle, Heart, Shield } from 'lucide-react'

const iconMap = {
  home: Home,
  users: Users,
  star: Star,
  award: Award,
  trending: TrendingUp,
  check: CheckCircle,
  heart: Heart,
  shield: Shield,
}

const backgroundColors = {
  transparent: '',
  lightGray: 'bg-lightGray',
  deepNavy: 'bg-deepNavy text-white',
  skyBlueLight: 'bg-skyBlue/10',
}

const layoutClasses = {
  'grid-2': 'grid-cols-1 md:grid-cols-2',
  'grid-3': 'grid-cols-1 md:grid-cols-3',
  'grid-4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}

const spacingClasses = {
  compact: spacing.sectionCompact,
  normal: spacing.section,
  spacious: spacing.sectionSpacious,
}

const CountUp: React.FC<{
  end: number
  duration?: number
  enabled: boolean
  inView: boolean
}> = ({ end, duration = 2000, enabled, inView }) => {
  const [count, setCount] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!enabled || prefersReducedMotion || !inView) {
      setCount(end)
      return
    }

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, enabled, prefersReducedMotion, inView])

  return <>{count}</>
}

export const StatisticsBlock: React.FC<StatisticsBlockType> = ({
  heading,
  subheading,
  stats,
  layout = 'grid-4',
  backgroundColor = 'transparent',
  spacing: spacingProp = 'normal',
  enableAnimations = true,
}) => {
  const [inView, setInView] = useState(false)
  const ref = React.useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={cn(
        spacingClasses[spacingProp as keyof typeof spacingClasses],
        backgroundColors[backgroundColor as keyof typeof backgroundColors]
      )}
      aria-labelledby={heading ? 'statistics-heading' : undefined}
    >
      <div className="container">
        {(heading || subheading) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {heading && (
              <h2 id="statistics-heading" className={typography.h2}>
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={cn(typography.body, 'mt-4 text-muted-foreground')}>
                {subheading}
              </p>
            )}
          </div>
        )}

        <div
          className={cn(
            'grid gap-8 md:gap-12',
            layoutClasses[layout as keyof typeof layoutClasses]
          )}
        >
          {stats?.map((stat, index) => {
            const Icon = stat.icon ? iconMap[stat.icon as keyof typeof iconMap] : null
            const numericValue = parseInt(stat.number || '0', 10)

            return (
              <div
                key={index}
                className={cn(
                  "group relative text-center p-8 pb-12 rounded-2xl",
                  "bg-white/80 backdrop-blur-sm border border-gray-100",
                  "shadow-soft hover:shadow-card-hover",
                  "hover:-translate-y-3 hover:scale-[1.02]",
                  "transition-all duration-500",
                  "overflow-visible",
                  // Staggered entrance animation
                  "opacity-0 translate-y-8",
                  inView && "animate-fade-in-up"
                )}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'forwards'
                }}
                role="group"
                aria-label={`${stat.label} statistic`}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-warmGold/5 via-transparent to-skyBlue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden -z-10" />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>

                {Icon && (
                  <div className="flex justify-center mb-6 relative">
                    <div className="relative">
                      {/* Circular progress ring */}
                      <svg className="w-24 h-24 -rotate-90">
                        {/* Background circle */}
                        <circle
                          cx="48"
                          cy="48"
                          r="44"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-gray-100"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="48"
                          cy="48"
                          r="44"
                          stroke="url(#gradient-gold)"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                          style={{
                            strokeDasharray: '276',
                            strokeDashoffset: inView ? '0' : '276',
                          }}
                        />
                        <defs>
                          <linearGradient id="gradient-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#C9A961" />
                            <stop offset="100%" stopColor="#E8D7B3" />
                          </linearGradient>
                        </defs>
                      </svg>
                      {/* Icon in center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Glow ring effect */}
                        <div className="absolute w-16 h-16 rounded-full bg-warmGold/20 blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
                        <div className="relative p-4 rounded-full bg-gradient-gold group-hover:scale-110 transition-transform duration-500 shadow-glow-gold">
                          <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Number with gradient text */}
                <div className={cn(
                  'font-heading font-bold tracking-tight',
                  'text-4xl sm:text-5xl',
                  'bg-gradient-accent bg-clip-text text-transparent',
                  'mb-3 !leading-normal py-3'
                )}>
                  {stat.prefix}
                  {stat.animateCounter && enableAnimations ? (
                    <CountUp end={numericValue} enabled={true} inView={inView} />
                  ) : (
                    stat.number
                  )}
                  {stat.suffix}
                </div>

                {/* Label */}
                <div className={cn(typography.h4, 'font-semibold text-deepNavy mb-1')}>
                  {stat.label}
                </div>

                {/* Sublabel */}
                {stat.sublabel && (
                  <div className={cn(typography.small, 'text-muted-foreground')}>
                    {stat.sublabel}
                  </div>
                )}

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
