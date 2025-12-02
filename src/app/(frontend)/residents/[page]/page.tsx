import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Page as PageType } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      where: {
        slug: {
          like: 'residents-',
        },
      },
      select: {
        slug: true,
      },
    })

    const params = pages.docs?.map(({ slug }) => {
      // Convert "residents-apply" to "apply"
      const page = slug?.replace('residents-', '') || ''
      return { page }
    }).filter(({ page }) => page !== '')

    return params || []
  } catch (error) {
    console.warn('Could not generate static params for residents pages:', error)
    return []
  }
}

type Args = {
  params: Promise<{
    page: string
  }>
}

export default async function ResidentsPage({ params: paramsPromise }: Args) {
  const { page } = await paramsPromise
  const url = `/residents/${page}`
  const slug = `residents-${page}`

  const pageData = await queryPageBySlug({
    slug,
  })

  if (!pageData) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = pageData

  return (
    <article className="pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { page } = await paramsPromise
  const slug = `residents-${page}`
  
  const pageData = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: pageData })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
