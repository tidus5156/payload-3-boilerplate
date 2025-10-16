/**
 * Accessibility utility functions for WCAG compliance
 */

/**
 * Calculate relative luminance of an RGB color
 * Used for contrast ratio calculations
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const v = val / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Calculate contrast ratio between two colors
 * Returns a number between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return 0

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Validate if color contrast meets WCAG standards
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param level - 'AA' or 'AAA'
 * @param isLargeText - Whether text is large (18pt+ or 14pt+ bold)
 * @returns boolean
 */
export function validateColorContrast(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false,
): boolean {
  const ratio = getContrastRatio(foreground, background)

  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7
  }

  // AA level
  return isLargeText ? ratio >= 3 : ratio >= 4.5
}

/**
 * Announce a message to screen readers without visual display
 * Useful for dynamic content updates
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  if (typeof document === 'undefined') return

  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Get accessible label for a form field
 */
export function getAccessibleLabel(id: string, label: string, required: boolean = false): {
  htmlFor: string
  children: string
} {
  return {
    htmlFor: id,
    children: `${label}${required ? ' (required)' : ''}`,
  }
}

/**
 * Generate unique ID for form fields
 */
export function generateFieldId(name: string): string {
  return `field-${name}-${Math.random().toString(36).substr(2, 9)}`
}
