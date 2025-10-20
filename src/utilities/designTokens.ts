/**
 * Allay Property Management Design System
 * Centralized design tokens for consistency across the application
 */

export const colors = {
  // Primary Colors
  deepNavy: '#1B3A6D',
  skyBlue: '#5A9FD4',

  // Accent Colors
  warmGold: '#C9A961',
  warmGoldHover: '#B8985F',
  warmGoldDark: '#9A7D3C',
  warmGoldLight: '#E8D7B3',
  sageGreen: '#7A9B76',

  // Neutrals
  charcoal: '#2D3436',
  warmGray: '#6C757D',
  lightGray: '#F5F7FA',
  white: '#FFFFFF',
} as const

export const typography = {
  fontFamilies: {
    heading: ['Montserrat', 'Poppins', 'sans-serif'],
    body: ['Open Sans', 'Inter', 'sans-serif'],
  },

  sizes: {
    h1: {
      mobile: '32px',
      tablet: '42px',
      desktop: '48px',
    },
    h2: {
      mobile: '28px',
      tablet: '32px',
      desktop: '36px',
    },
    h3: {
      mobile: '24px',
      tablet: '28px',
      desktop: '28px',
    },
    h4: {
      mobile: '20px',
      tablet: '22px',
      desktop: '22px',
    },
    body: '16px',
    bodyLarge: '18px',
  },

  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },

  weights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
} as const

export const spacing = {
  section: {
    mobile: '3rem',
    desktop: '5rem',
  },
  container: {
    padding: {
      mobile: '1rem',
      tablet: '2rem',
      desktop: '2rem',
    },
  },
  card: {
    padding: '2rem',
    gap: '1.5rem',
  },
} as const

export const buttons = {
  primary: {
    bg: colors.warmGold,
    color: colors.deepNavy,
    hoverBg: colors.warmGoldHover,
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: typography.weights.bold,
    borderRadius: '6px',
  },
  secondary: {
    bg: colors.skyBlue,
    color: colors.white,
    hoverBg: colors.deepNavy,
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: typography.weights.bold,
    borderRadius: '6px',
  },
  ghost: {
    bg: 'transparent',
    color: colors.skyBlue,
    border: `2px solid ${colors.skyBlue}`,
    hoverBg: colors.skyBlue,
    hoverColor: colors.white,
    padding: '14px 30px', // Slightly less to account for border
    fontSize: '16px',
    fontWeight: typography.weights.bold,
    borderRadius: '6px',
  },
} as const

export const shadows = {
  card: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  cardHover: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
  glowGold: '0 0 20px rgba(201, 169, 97, 0.3)',
  glowNavy: '0 0 20px rgba(27, 58, 109, 0.3)',
} as const

export const borderRadius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  full: '9999px',
} as const

// Design token access function for type safety
export function getColor(colorName: keyof typeof colors): string {
  return colors[colorName]
}

export function getButton(buttonType: keyof typeof buttons) {
  return buttons[buttonType]
}
