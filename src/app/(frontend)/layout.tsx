import type { Metadata } from 'next'

import { cn } from 'src/utilities/cn'
import { Montserrat } from 'next/font/google'
import { Open_Sans } from 'next/font/google'
import React from 'react'

// Allay Property Management fonts
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { SkipToContent } from '@/components/SkipToContent'
import { StickyCTABar } from '@/components/StickyCTABar'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getDesignTokens, tokensToCSS } from '@/utilities/getDesignTokens'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const settings = await getCachedGlobal('settings', 1)()
  const designTokens = getDesignTokens(settings)
  const cssVariables = tokensToCSS(designTokens)

  return (
    <html
      className={cn(montserrat.variable, openSans.variable)}
      lang="en"
      suppressHydrationWarning
      style={{
        // @ts-ignore - CSS variables as inline style
        ...Object.fromEntries(
          cssVariables.split('\n')
            .map(line => line.trim())
            .filter(line => line && line.includes(':'))
            .map(line => {
              const [key, value] = line.split(':').map(s => s.trim())
              return [key, value.replace(';', '')]
            })
        )
      }}
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={cn(openSans.className, 'font-body')}>
        <Providers>
          <SkipToContent />
          <LivePreviewListener />

          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <StickyCTABar settings={settings as any} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
