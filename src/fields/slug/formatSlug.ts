import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    // Check if slug lock is enabled (true = auto-update from title, false = manual edit mode)
    // Default to true for backwards compatibility
    const slugLock = data?.slugLock ?? originalDoc?.slugLock ?? true

    // Only auto-generate slug when creating new documents
    if (operation === 'create') {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    } else if (operation === 'update') {
      // On updates: preserve existing slug from originalDoc if it exists
      // Only regenerate if BOTH conditions are true:
      // 1. Lock is enabled (user wants auto-updating)
      // 2. No existing slug in both data and originalDoc
      const existingSlug = data?.slug || originalDoc?.slug

      if (!existingSlug && slugLock) {
        const fallbackData = data?.[fallback] || data?.[fallback]

        if (fallbackData && typeof fallbackData === 'string') {
          return formatSlug(fallbackData)
        }
      } else if (existingSlug && !data?.slug) {
        // Preserve the existing slug if it's not in the update data
        return existingSlug
      }
    }

    return value
  }
