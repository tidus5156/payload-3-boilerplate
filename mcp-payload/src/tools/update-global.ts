import type { Payload } from 'payload'

export async function updateGlobalTool(payload: Payload, args: any) {
  const { slug, data } = args

  if (!slug) {
    throw new Error('slug parameter is required')
  }

  if (!data) {
    throw new Error('data parameter is required')
  }

  try {
    const result = await payload.updateGlobal({
      slug,
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
    throw new Error(`Failed to update global ${slug}: ${error.message}`)
  }
}
