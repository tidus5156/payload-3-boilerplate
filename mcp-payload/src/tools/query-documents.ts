import type { Payload } from 'payload'

export async function queryDocumentsTool(payload: Payload, args: any) {
  const { collection, where, limit = 10, page = 1, sort } = args

  if (!collection) {
    throw new Error('collection parameter is required')
  }

  try {
    const result = await payload.find({
      collection,
      where,
      limit,
      page,
      sort,
    })

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    }
  } catch (error: any) {
    throw new Error(`Failed to query documents in ${collection}: ${error.message}`)
  }
}
