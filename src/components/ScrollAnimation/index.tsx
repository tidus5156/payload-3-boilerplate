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
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        !isVisible && 'opacity-0',
        isVisible && `animate-${animation}`,
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
