import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitize HTML to prevent XSS attacks
 * @param dirty - The dirty HTML string to sanitize
 * @param options - DOMPurify configuration options
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHtml(
  dirty: string,
  options?: {
    allowedTags?: string[]
    allowedAttributes?: Record<string, string[]>
    allowLinks?: boolean
  },
): string {
  if (!dirty) return ''

  const defaultConfig: DOMPurify.Config = {
    ALLOWED_TAGS: options?.allowedTags || [
      'p',
      'br',
      'strong',
      'em',
      'u',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'blockquote',
    ],
    ALLOWED_ATTR: options?.allowedAttributes || {},
  }

  // Add link support if requested
  if (options?.allowLinks) {
    defaultConfig.ALLOWED_TAGS = [...(defaultConfig.ALLOWED_TAGS || []), 'a']
    defaultConfig.ALLOWED_ATTR = {
      ...defaultConfig.ALLOWED_ATTR,
      a: ['href', 'target', 'rel'],
    }
    // Automatically add rel="noopener noreferrer" to external links
    defaultConfig.ADD_ATTR = ['target', 'rel']
  }

  return DOMPurify.sanitize(dirty, defaultConfig)
}

/**
 * Sanitize plain text input to remove potentially dangerous characters
 * @param text - The text to sanitize
 * @returns Sanitized text string
 */
export function sanitizeText(text: string): string {
  if (!text) return ''

  return text
    .trim()
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove control characters (except newline, tab, carriage return)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
}

/**
 * Sanitize email addresses
 * @param email - The email to sanitize
 * @returns Sanitized email string
 */
export function sanitizeEmail(email: string): string {
  if (!email) return ''

  return sanitizeText(email)
    .toLowerCase()
    .replace(/[^\w\s@.+-]/gi, '')
}

/**
 * Sanitize phone numbers (keep only digits, spaces, hyphens, parentheses, plus)
 * @param phone - The phone number to sanitize
 * @returns Sanitized phone string
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return ''

  return sanitizeText(phone).replace(/[^0-9\s\-()+ ]/g, '')
}

/**
 * Sanitize URLs to prevent javascript: and data: URIs
 * @param url - The URL to sanitize
 * @returns Sanitized URL string or empty string if invalid
 */
export function sanitizeUrl(url: string): string {
  if (!url) return ''

  const sanitized = sanitizeText(url).trim()

  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:']
  const lowerUrl = sanitized.toLowerCase()

  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      console.warn(`Blocked dangerous URL protocol: ${protocol}`)
      return ''
    }
  }

  // Validate URL format
  try {
    new URL(sanitized)
    return sanitized
  } catch {
    // If not a valid URL, check if it's a relative path
    if (sanitized.startsWith('/') || sanitized.startsWith('#')) {
      return sanitized
    }
    console.warn('Invalid URL format:', sanitized)
    return ''
  }
}

/**
 * Sanitize an object by sanitizing all string values
 * @param obj - The object to sanitize
 * @param options - Sanitization options
 * @returns New object with sanitized values
 */
export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  options?: {
    sanitizeHtmlFields?: string[]
    emailFields?: string[]
    phoneFields?: string[]
    urlFields?: string[]
  },
): T {
  if (!obj || typeof obj !== 'object') return obj

  const sanitized = { ...obj }

  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      // Apply specific sanitization based on field type
      if (options?.sanitizeHtmlFields?.includes(key)) {
        sanitized[key] = sanitizeHtml(value)
      } else if (options?.emailFields?.includes(key)) {
        sanitized[key] = sanitizeEmail(value)
      } else if (options?.phoneFields?.includes(key)) {
        sanitized[key] = sanitizePhone(value)
      } else if (options?.urlFields?.includes(key)) {
        sanitized[key] = sanitizeUrl(value)
      } else {
        // Default: sanitize as plain text
        sanitized[key] = sanitizeText(value)
      }
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === 'string'
          ? sanitizeText(item)
          : typeof item === 'object'
            ? sanitizeObject(item, options)
            : item,
      )
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value, options)
    }
  }

  return sanitized
}

/**
 * Strip all HTML tags from a string
 * @param html - The HTML string to strip
 * @returns Plain text with all HTML removed
 */
export function stripHtml(html: string): string {
  if (!html) return ''

  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] })
}

/**
 * Escape HTML entities to prevent XSS
 * @param text - The text to escape
 * @returns Escaped text safe for HTML rendering
 */
export function escapeHtml(text: string): string {
  if (!text) return ''

  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
  }

  return text.replace(/[&<>"'/]/g, (char) => htmlEntities[char] || char)
}
