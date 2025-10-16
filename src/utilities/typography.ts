/**
 * Typography system for consistent text styling across the application
 * Based on Tailwind's typography plugin and custom brand fonts
 */

export const typography = {
  // Display text - for hero sections and major headings
  display: 'font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight',

  // Headings
  h1: 'font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight',
  h2: 'font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
  h3: 'font-heading text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug',
  h4: 'font-heading text-xl md:text-2xl font-semibold leading-snug',
  h5: 'font-heading text-lg md:text-xl font-semibold leading-normal',
  h6: 'font-heading text-base md:text-lg font-semibold leading-normal',

  // Body text variants
  lead: 'font-body text-xl md:text-2xl leading-relaxed', // Intro paragraphs
  body: 'font-body text-base md:text-lg leading-relaxed', // Regular paragraphs
  bodyLarge: 'font-body text-lg md:text-xl leading-relaxed',
  bodySmall: 'font-body text-sm md:text-base leading-normal',

  // Utility text
  small: 'font-body text-sm leading-normal',
  caption: 'font-body text-xs md:text-sm text-muted-foreground leading-tight',
  overline: 'font-body text-xs uppercase tracking-wide font-semibold',

  // Labels
  label: 'font-body text-sm font-medium leading-none',
  labelLarge: 'font-body text-base font-medium leading-none',

  // Code
  code: 'font-mono text-sm',
  codeInline: 'font-mono text-sm px-1.5 py-0.5 rounded bg-muted',
}

/**
 * Spacing system for consistent vertical rhythm
 */
export const spacing = {
  // Section spacing (vertical padding)
  section: 'py-16 md:py-24 lg:py-32',
  sectionCompact: 'py-12 md:py-16 lg:py-20',
  sectionSpacious: 'py-20 md:py-28 lg:py-36',
  sectionXL: 'py-24 md:py-32 lg:py-40',

  // Container spacing (horizontal padding)
  container: 'px-4 md:px-6 lg:px-8',
  containerNarrow: 'px-6 md:px-8 lg:px-12',
  containerWide: 'px-4 md:px-6 lg:px-4',

  // Gap utilities
  gap: {
    xs: 'gap-2 md:gap-3',
    sm: 'gap-4 md:gap-6',
    md: 'gap-8 md:gap-12',
    lg: 'gap-12 md:gap-16 lg:gap-24',
    xl: 'gap-16 md:gap-20 lg:gap-28',
  },

  // Stack spacing (for vertical stacks)
  stack: {
    xs: 'space-y-2',
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
    xl: 'space-y-12',
  },
}

/**
 * Max width containers for content
 */
export const maxWidth = {
  prose: 'max-w-prose', // ~65ch - ideal reading width
  sm: 'max-w-sm', // 384px
  md: 'max-w-md', // 448px
  lg: 'max-w-lg', // 512px
  xl: 'max-w-xl', // 576px
  '2xl': 'max-w-2xl', // 672px
  '3xl': 'max-w-3xl', // 768px
  '4xl': 'max-w-4xl', // 896px
  '5xl': 'max-w-5xl', // 1024px
  '6xl': 'max-w-6xl', // 1152px
  '7xl': 'max-w-7xl', // 1280px
  full: 'max-w-full',
  screen: 'max-w-screen-2xl',
}
