'use client'

import React from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Variants } from '@/utilities/animations'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
  delay?: number
}

/**
 * Wrapper component for scroll-triggered animations
 * Respects user's motion preferences
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  delay = 0,
}) => {
  const prefersReducedMotion = useReducedMotion()
  const [inView, setInView] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!ref.current || prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [prefersReducedMotion])

  // If user prefers reduced motion, render without animation
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  // Simple CSS animation approach (lighter than Framer Motion for basic cases)
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
