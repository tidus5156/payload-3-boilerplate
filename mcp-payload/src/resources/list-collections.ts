import type { Payload } from 'payload'

export async function listCollectionsResource(payload: Payload) {
  try {
    const collections = payload.config.collections.map((collection) => ({
      slug: collection.slug,
      labels: collection.labels,
      fields: collection.fields.length,
      admin: {
        useAsTitle: collection.admin?.useAsTitle,
        defaultColumns: collection.admin?.defaultColumns,
      },
    }))

    return {
      contents: [
        {
          uri: 'payload://collections',
          mimeType: 'application/json',
          text: JSON.stringify(collections, null, 2),
        },
      ],
    }
  } catch (error: any) {
    throw new Error(`Failed to list collections: ${error.message}`)
  }
}
