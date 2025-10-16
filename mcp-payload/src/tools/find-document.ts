import type { Payload } from 'payload'

export async function findDocumentTool(payload: Payload, args: any) {
  const { collection, id } = args

  if (!collection) {
    throw new Error('collection parameter is required')
  }

  if (!id) {
    throw new Error('id parameter is required')
  }

  try {
    const result = await payload.findByID({
      collection,
      id,
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
    throw new Error(`Failed to find document ${id} in ${collection}: ${error.message}`)
  }
}
