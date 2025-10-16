import type { Payload } from 'payload'
import fs from 'fs'
import path from 'path'

export async function uploadMediaTool(payload: Payload, args: any) {
  const { filePath, alt } = args

  if (!filePath) {
    throw new Error('filePath parameter is required')
  }

  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`)
    }

    // Read file buffer
    const fileBuffer = fs.readFileSync(filePath)
    const fileName = path.basename(filePath)

    // Create file object for Payload
    const file = {
      data: fileBuffer,
      mimetype: getMimeType(fileName),
      name: fileName,
      size: fileBuffer.length,
    }

    // Upload to Media collection
    const result = await payload.create({
      collection: 'media',
      data: {
        alt: alt || fileName,
      },
      file,
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
    throw new Error(`Failed to upload media: ${error.message}`)
  }
}

function getMimeType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase()
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
  }
  return mimeTypes[ext] || 'application/octet-stream'
}
