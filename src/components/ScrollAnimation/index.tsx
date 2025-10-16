'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/cn'

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'scale-in' | 'slide-in-left' | 'slide-in-right'
  delay?: number
  duration?: number
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className,
  animation = 'fade-in-up',
  delay = 0,
  duration = 600,
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          setTimeout(() => {
            setShouldAnimate(true)
          }, delay)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        shouldAnimate && `animate-${animation}`,
        className
      )}
      style={{
        animationDuration: `${duration}ms`,
        animationFillMode: 'both',
      }}
    >
      {children}
    </div>
  )
}
