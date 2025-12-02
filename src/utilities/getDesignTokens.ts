import type { Settings } from '@/payload-types'

export interface DesignTokens {
  colors: {
    deepNavy: string
    skyBlue: string
    warmGold: string
    sageGreen: string
    charcoal: string
    warmGray: string
    lightGray: string
  }
  typography: {
    headingFont: string
    bodyFont: string
  }
  heroDefaults: {
    highImpactHeight: string
    mediumImpactHeight: string
    overlayOpacity: string
    mediumImpactOverlayOpacity: string
  }
  visualEffects: {
    enableGlowEffects: boolean
    enableShimmerEffects: boolean
    enableSmoothScrolling: boolean
  }
}

/**
 * Extracts design tokens from Settings global
 * Returns default values if settings are not configured
 */
export function getDesignTokens(settings: Settings | null): DesignTokens {
  try {
    if (!settings) {
      return getDefaultTokens()
    }

    return {
      colors: {
        deepNavy: settings?.colorPalette?.deepNavy || '#1B3A6D',
        skyBlue: settings?.colorPalette?.skyBlue || '#5A9FD4',
        warmGold: settings?.colorPalette?.warmGold || '#C9A961',
        sageGreen: settings?.colorPalette?.sageGreen || '#7A9B76',
        charcoal: settings?.colorPalette?.charcoal || '#2D3436',
        warmGray: settings?.colorPalette?.warmGray || '#6C757D',
        lightGray: settings?.colorPalette?.lightGray || '#F5F7FA',
      },
      typography: {
        headingFont: settings?.typography?.headingFont || 'Montserrat',
        bodyFont: settings?.typography?.bodyFont || 'Open Sans',
      },
      heroDefaults: {
        highImpactHeight: settings?.heroDefaults?.highImpactHeight || '100vh',
        mediumImpactHeight: settings?.heroDefaults?.mediumImpactHeight || '65vh',
        overlayOpacity: settings?.heroDefaults?.overlayOpacity || '60',
        mediumImpactOverlayOpacity: settings?.heroDefaults?.mediumImpactOverlayOpacity || '45',
      },
      visualEffects: {
        enableGlowEffects: settings?.visualEffects?.enableGlowEffects ?? true,
        enableShimmerEffects: settings?.visualEffects?.enableShimmerEffects ?? true,
        enableSmoothScrolling: settings?.visualEffects?.enableSmoothScrolling ?? true,
      },
    }
  } catch (error) {
    // Return defaults if extraction fails
    console.error('Failed to extract design tokens:', error)
    return getDefaultTokens()
  }
}

/**
 * Returns default design tokens
 */
function getDefaultTokens(): DesignTokens {
  return {
    colors: {
      deepNavy: '#1B3A6D',
      skyBlue: '#5A9FD4',
      warmGold: '#C9A961',
      sageGreen: '#7A9B76',
      charcoal: '#2D3436',
      warmGray: '#6C757D',
      lightGray: '#F5F7FA',
    },
    typography: {
      headingFont: 'Montserrat',
      bodyFont: 'Open Sans',
    },
    heroDefaults: {
      highImpactHeight: '100vh',
      mediumImpactHeight: '65vh',
      overlayOpacity: '60',
      mediumImpactOverlayOpacity: '45',
    },
    visualEffects: {
      enableGlowEffects: true,
      enableShimmerEffects: true,
      enableSmoothScrolling: true,
    },
  }
}

/**
 * Converts design tokens to CSS variables string
 */
export function tokensToCSS(tokens: DesignTokens): string {
  return `
    --color-deep-navy: ${tokens.colors.deepNavy};
    --color-sky-blue: ${tokens.colors.skyBlue};
    --color-warm-gold: ${tokens.colors.warmGold};
    --color-sage-green: ${tokens.colors.sageGreen};
    --color-charcoal: ${tokens.colors.charcoal};
    --color-warm-gray: ${tokens.colors.warmGray};
    --color-light-gray: ${tokens.colors.lightGray};

    --font-heading: ${tokens.typography.headingFont}, sans-serif;
    --font-body: ${tokens.typography.bodyFont}, sans-serif;

    --hero-high-impact-height: ${tokens.heroDefaults.highImpactHeight};
    --hero-medium-impact-height: ${tokens.heroDefaults.mediumImpactHeight};
    --hero-overlay-opacity: ${parseInt(tokens.heroDefaults.overlayOpacity) / 100};
    --hero-medium-impact-overlay-opacity: ${parseInt(tokens.heroDefaults.mediumImpactOverlayOpacity) / 100};

    --effect-glow: ${tokens.visualEffects.enableGlowEffects ? '1' : '0'};
    --effect-shimmer: ${tokens.visualEffects.enableShimmerEffects ? '1' : '0'};
  `.trim()
}
