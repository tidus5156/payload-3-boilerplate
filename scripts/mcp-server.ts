#!/usr/bin/env tsx

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { getPayload } from 'payload'
import type { Payload } from 'payload'
import configPromise from '../src/payload.config.js'

let payload: Payload | null = null
let payloadInitializing = false
let payloadError: Error | null = null

const server = new Server(
  {
    name: 'payload-cms',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  },
)

// Initialize Payload in background
async function initializePayload() {
  if (payloadInitializing || payload) return

  payloadInitializing = true
  console.error('[MCP] Starting Payload initialization...')

  try {
    const config = await configPromise
    payload = await getPayload({ config })
    console.error('[MCP] ✅ Payload initialized successfully')
  } catch (error) {
    payloadError = error as Error
    console.error('[MCP] ❌ Failed to initialize Payload:', error)
  } finally {
    payloadInitializing = false
  }
}

// Check if Payload is ready
function ensurePayloadReady() {
  if (payloadError) {
    throw new Error(`Payload initialization failed: ${payloadError.message}`)
  }
  if (!payload) {
    throw new Error('Payload is still initializing. Please wait a moment and try again.')
  }
  return payload
}

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'payload_create_document',
        description: 'Create a new document in a Payload collection',
        inputSchema: {
          type: 'object',
          properties: {
            collection: {
              type: 'string',
              description: 'The collection name (e.g., "pages", "posts", "testimonials")',
            },
            data: {
              type: 'object',
              description: 'The document data as JSON',
            },
          },
          required: ['collection', 'data'],
        },
      },
      {
        name: 'payload_update_document',
        description: 'Update an existing document in a Payload collection',
        inputSchema: {
          type: 'object',
          properties: {
            collection: {
              type: 'string',
              description: 'The collection name',
            },
            id: {
              type: 'string',
              description: 'The document ID',
            },
            data: {
              type: 'object',
              description: 'The updated document data as JSON',
            },
          },
          required: ['collection', 'id', 'data'],
        },
      },
      {
        name: 'payload_query_documents',
        description: 'Query documents from a Payload collection',
        inputSchema: {
          type: 'object',
          properties: {
            collection: {
              type: 'string',
              description: 'The collection name',
            },
            where: {
              type: 'object',
              description: 'Query filters (optional)',
            },
            limit: {
              type: 'number',
              description: 'Number of documents to return (default: 10)',
            },
          },
          required: ['collection'],
        },
      },
      {
        name: 'payload_find_document',
        description: 'Find a single document by ID from a Payload collection',
        inputSchema: {
          type: 'object',
          properties: {
            collection: {
              type: 'string',
              description: 'The collection name',
            },
            id: {
              type: 'string',
              description: 'The document ID',
            },
          },
          required: ['collection', 'id'],
        },
      },
      {
        name: 'payload_delete_document',
        description: 'Delete a document from a Payload collection',
        inputSchema: {
          type: 'object',
          properties: {
            collection: {
              type: 'string',
              description: 'The collection name',
            },
            id: {
              type: 'string',
              description: 'The document ID',
            },
          },
          required: ['collection', 'id'],
        },
      },
      {
        name: 'payload_update_global',
        description: 'Update global settings (e.g., "settings", "header", "footer")',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'The global slug (e.g., "settings", "header", "footer")',
            },
            data: {
              type: 'object',
              description: 'The updated global data as JSON',
            },
          },
          required: ['slug', 'data'],
        },
      },
      {
        name: 'payload_find_global',
        description: 'Retrieve global settings (e.g., "settings", "header", "footer")',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'The global slug (e.g., "settings", "header", "footer")',
            },
          },
          required: ['slug'],
        },
      },
    ],
  }
})

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    const payloadInstance = ensurePayloadReady()

    switch (name) {
      case 'payload_create_document': {
        const { collection, data } = args as any
        const result = await payloadInstance.create({
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
      }
      case 'payload_update_document': {
        const { collection, id, data } = args as any
        const result = await payloadInstance.update({
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
      }
      case 'payload_query_documents': {
        const { collection, where, limit = 10 } = args as any
        const result = await payloadInstance.find({
          collection,
          where,
          limit,
        })
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        }
      }
      case 'payload_find_document': {
        const { collection, id } = args as any
        const result = await payloadInstance.findByID({
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
      }
      case 'payload_delete_document': {
        const { collection, id } = args as any
        const result = await payloadInstance.delete({
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
      }
      case 'payload_update_global': {
        const { slug, data } = args as any
        const result = await payloadInstance.updateGlobal({
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
      }
      case 'payload_find_global': {
        const { slug } = args as any
        const result = await payloadInstance.findGlobal({
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
      }
      default:
        throw new Error(`Unknown tool: ${name}`)
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    }
  }
})

// Start the server
async function main() {
  console.error('[MCP] Starting MCP server...')

  // Connect to transport FIRST (so Claude Code gets handshake immediately)
  const transport = new StdioServerTransport()
  await server.connect(transport)

  console.error('[MCP] ✅ MCP Server connected and ready')
  console.error('[MCP] Initializing Payload in background...')

  // Initialize Payload in background (non-blocking)
  initializePayload().catch((error) => {
    console.error('[MCP] ❌ Background Payload initialization failed:', error)
  })
}

main().catch((error) => {
  console.error('[MCP] ❌ Fatal error:', error)
  process.exit(1)
})
