import type { Payload } from 'payload'

export async function deleteDocumentTool(payload: Payload, args: any) {
  const { collection, id } = args

  if (!collection) {
    throw new Error('collection parameter is required')
  }

  if (!id) {
    throw new Error('id parameter is required')
  }

  try {
    const result = await payload.delete({
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
    throw new Error(`Failed to delete document ${id} in ${collection}: ${error.message}`)
  }
}
