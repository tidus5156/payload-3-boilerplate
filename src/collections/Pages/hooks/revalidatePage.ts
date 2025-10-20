import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

    payload.logger.info(`Revalidating page at path: ${path}`)

    try {
      revalidatePath(path)
    } catch (error) {
      // Revalidation may fail when running outside Next.js context (e.g., seed scripts)
      payload.logger.warn(`Could not revalidate path ${path}: ${error}`)
    }
  }

  // If the page was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

    payload.logger.info(`Revalidating old page at path: ${oldPath}`)

    try {
      revalidatePath(oldPath)
    } catch (error) {
      // Revalidation may fail when running outside Next.js context (e.g., seed scripts)
      payload.logger.warn(`Could not revalidate path ${oldPath}: ${error}`)
    }
  }

  return doc
}
