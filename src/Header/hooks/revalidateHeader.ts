import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating header`)

  try {
    revalidateTag('global_header')
  } catch (error) {
    // Revalidation may fail when running outside Next.js context (e.g., seed scripts)
    payload.logger.warn(`Could not revalidate header: ${error}`)
  }

  return doc
}
