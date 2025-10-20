'use client'
import React, { useEffect, useRef } from 'react'

type Props = {
  embedCode: string
}

export const HTMLEmbedClient: React.FC<Props> = ({ embedCode }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !embedCode) return

    // Clear any existing content
    containerRef.current.innerHTML = ''

    // Create a temporary container to parse the embed code
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = embedCode

    // Extract script tags and inject them properly
    const scriptTags = tempDiv.querySelectorAll('script')
    const nonScriptContent = tempDiv.innerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

    // Add non-script HTML content
    containerRef.current.innerHTML = nonScriptContent

    // Execute scripts in order
    scriptTags.forEach((oldScript) => {
      const newScript = document.createElement('script')

      // Copy attributes
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value)
      })

      // Copy inline script content and wrap in IIFE to prevent variable collisions
      if (oldScript.textContent) {
        // Wrap inline scripts in an IIFE to create a new scope
        newScript.textContent = `(function() { ${oldScript.textContent} })();`
      }

      // Append to container to execute
      containerRef.current?.appendChild(newScript)
    })

    // Cleanup function
    return () => {
      // Remove any dynamically added scripts to prevent memory leaks
      const scripts = containerRef.current?.querySelectorAll('script')
      scripts?.forEach((script) => script.remove())
    }
  }, [embedCode])

  return <div ref={containerRef} className="html-embed-container" />
}
