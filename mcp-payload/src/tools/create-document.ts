import type { Payload } from 'payload'

export async function createDocumentTool(payload: Payload, args: any) {
  const { collection, data } = args

  if (!collection) {
    throw new Error('collection parameter is required')
  }

  if (!data) {
    throw new Error('data parameter is required')
  }

  try {
    const result = await payload.create({
      collection,
      data,
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
    throw new Error(`Failed to create document in ${collection}: ${error.message}`)
  }
}
