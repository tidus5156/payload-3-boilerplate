'use client'

import React, { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string
          callback?: (token: string) => void
          'error-callback'?: () => void
          'expired-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
          size?: 'normal' | 'compact'
        },
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

interface TurnstileProps {
  sitekey?: string
  onSuccess: (token: string) => void
  onError?: () => void
  onExpire?: () => void
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'compact'
}

export const Turnstile: React.FC<TurnstileProps> = ({
  sitekey,
  onSuccess,
  onError,
  onExpire,
  theme = 'light',
  size = 'normal',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Use environment variable if sitekey not provided
  const effectiveSitekey = sitekey || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    // If no sitekey, don't load Turnstile
    if (!effectiveSitekey) {
      console.warn('Turnstile sitekey not configured. CAPTCHA will be skipped.')
      setError('CAPTCHA not configured')
      return
    }

    // Load Turnstile script
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true

    script.onload = () => {
      setIsLoaded(true)
    }

    script.onerror = () => {
      console.error('Failed to load Turnstile script')
      setError('Failed to load CAPTCHA')
      onError?.()
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup: remove widget and script
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [effectiveSitekey, onError])

  useEffect(() => {
    if (!isLoaded || !containerRef.current || !window.turnstile || !effectiveSitekey) {
      return
    }

    // Render Turnstile widget
    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: effectiveSitekey,
        callback: (token: string) => {
          onSuccess(token)
        },
        'error-callback': () => {
          setError('CAPTCHA verification failed')
          onError?.()
        },
        'expired-callback': () => {
          setError('CAPTCHA expired. Please try again.')
          onExpire?.()
        },
        theme,
        size,
      })
    } catch (err) {
      console.error('Error rendering Turnstile:', err)
      setError('Failed to render CAPTCHA')
      onError?.()
    }

    return () => {
      // Cleanup widget on unmount
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
      }
    }
  }, [isLoaded, effectiveSitekey, onSuccess, onError, onExpire, theme, size])

  // Don't render anything if no sitekey
  if (!effectiveSitekey) {
    return null
  }

  if (error) {
    return (
      <div className="text-sm text-red-600 p-2 bg-red-50 rounded border border-red-200">
        {error}
      </div>
    )
  }

  return <div ref={containerRef} className="turnstile-widget" />
}

export default Turnstile
