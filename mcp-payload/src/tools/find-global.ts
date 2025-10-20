import type { Payload } from 'payload'

export async function findGlobalTool(payload: Payload, args: any) {
  const { slug } = args

  if (!slug) {
    throw new Error('slug parameter is required')
  }

  try {
    const result = await payload.findGlobal({
      slug,
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
    throw new Error(`Failed to find global ${slug}: ${error.message}`)
  }
}
