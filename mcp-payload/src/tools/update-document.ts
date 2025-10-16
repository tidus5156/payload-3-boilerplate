import type { Payload } from 'payload'

export async function updateDocumentTool(payload: Payload, args: any) {
  const { collection, id, data } = args

  if (!collection) {
    throw new Error('collection parameter is required')
  }

  if (!id) {
    throw new Error('id parameter is required')
  }

  if (!data) {
    throw new Error('data parameter is required')
  }

  try {
    const result = await payload.update({
      collection,
      id,
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
    throw new Error(`Failed to update document ${id} in ${collection}: ${error.message}`)
  }
}
