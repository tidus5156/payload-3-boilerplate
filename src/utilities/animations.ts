/**
 * Reusable animation configurations for Framer Motion
 * These follow accessibility best practices and respect user motion preferences
 */

export type Variants = {
  hidden: object
  visible: object
}

/**
 * Fade in from opacity 0 to 1
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/**
 * Fade in and slide up from bottom
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/**
 * Fade in and slide down from top
 */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/**
 * Fade in and slide from left
 */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/**
 * Fade in and slide from right
 */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/**
 * Scale in from 95% to 100%
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

/**
 * Container variant for staggered children animations
 * Use with child elements that have fadeInUp or similar variants
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/**
 * Stagger with faster timing
 */
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

/**
 * Slide in from bottom (no fade)
 */
export const slideUp: Variants = {
  hidden: { y: 30 },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

/**
 * Bounce animation for attention-grabbing elements
 */
export const bounce: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
}

/**
 * Duration presets for consistent timing
 */
export const duration = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
}

/**
 * Easing presets
 */
export const easing = {
  easeOut: [0.4, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.6, 1],
  spring: { type: 'spring', stiffness: 260, damping: 20 },
}
