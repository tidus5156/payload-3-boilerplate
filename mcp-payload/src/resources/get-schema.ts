import type { Payload } from 'payload'

export async function getSchemaResource(payload: Payload, collectionSlug: string) {
  try {
    const collection = payload.config.collections.find((c) => c.slug === collectionSlug)

    if (!collection) {
      throw new Error(`Collection "${collectionSlug}" not found`)
    }

    const schema = {
      slug: collection.slug,
      labels: collection.labels,
      fields: collection.fields.map((field: any) => ({
        name: field.name,
        type: field.type,
        label: field.label,
        required: field.required,
        admin: field.admin,
        ...(field.type === 'relationship' && {
          relationTo: field.relationTo,
        }),
        ...(field.type === 'select' && {
          options: field.options,
        }),
        ...(field.type === 'blocks' && {
          blocks: field.blocks?.map((block: any) => ({
            slug: block.slug,
            labels: block.labels,
          })),
        }),
      })),
      admin: collection.admin,
      timestamps: collection.timestamps,
      access: Object.keys(collection.access || {}),
    }

    return {
      contents: [
        {
          uri: `payload://schema/${collectionSlug}`,
          mimeType: 'application/json',
          text: JSON.stringify(schema, null, 2),
        },
      ],
    }
  } catch (error: any) {
    throw new Error(`Failed to get schema for ${collectionSlug}: ${error.message}`)
  }
}
