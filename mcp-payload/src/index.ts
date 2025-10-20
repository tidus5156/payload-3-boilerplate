#!/usr/bin/env node

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

// We'll import the config from the parent project
// This requires the MCP server to be run from the project root
let payload: Payload

// Tool implementations
import { createDocumentTool } from './tools/create-document.js'
import { updateDocumentTool } from './tools/update-document.js'
import { queryDocumentsTool } from './tools/query-documents.js'
import { findDocumentTool } from './tools/find-document.js'
import { deleteDocumentTool } from './tools/delete-document.js'
import { uploadMediaTool } from './tools/upload-media.js'
import { updateGlobalTool } from './tools/update-global.js'
import { findGlobalTool } from './tools/find-global.js'

// Resource implementations
import { listCollectionsResource } from './resources/list-collections.js'
import { getSchemaResource } from './resources/get-schema.js'

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

// Initialize Payload
async function initializePayload() {
  try {
    // Import config dynamically from parent project
    const configPath = process.env.PAYLOAD_CONFIG_PATH || '../src/payload.config.ts'
    const { default: config } = await import(configPath)

    payload = await getPayload({ config })
    console.error('Payload initialized successfully')
  } catch (error) {
    console.error('Failed to initialize Payload:', error)
    throw error
  }
}

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'payload_create_document',
        description: 'Create a new document in a Payload collection (Pages, Posts, Media, Categories, Users, Comments, Properties, Neighborhoods, Testimonials, TeamMembers)',
        inputSchema: {
          type: 'object',
          properties: {
            collection: {
              type: 'string',
              description: 'The collection name (e.g., "pages", "posts", "media")',
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
        description: 'Query documents from a Payload collection with optional filters, sorting, and pagination',
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
            page: {
              type: 'number',
              description: 'Page number for pagination (default: 1)',
            },
            sort: {
              type: 'string',
              description: 'Field to sort by (prefix with - for descending, e.g., "-createdAt")',
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
        name: 'payload_upload_media',
        description: 'Upload a media file to the Media collection',
        inputSchema: {
          type: 'object',
          properties: {
            filePath: {
              type: 'string',
              description: 'Absolute path to the file to upload',
            },
            alt: {
              type: 'string',
              description: 'Alt text for the image (optional)',
            },
          },
          required: ['filePath'],
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
    switch (name) {
      case 'payload_create_document':
        return await createDocumentTool(payload, args)
      case 'payload_update_document':
        return await updateDocumentTool(payload, args)
      case 'payload_query_documents':
        return await queryDocumentsTool(payload, args)
      case 'payload_find_document':
        return await findDocumentTool(payload, args)
      case 'payload_delete_document':
        return await deleteDocumentTool(payload, args)
      case 'payload_upload_media':
        return await uploadMediaTool(payload, args)
      case 'payload_update_global':
        return await updateGlobalTool(payload, args)
      case 'payload_find_global':
        return await findGlobalTool(payload, args)
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

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'payload://collections',
        name: 'List all collections',
        description: 'Get a list of all available Payload collections with their configurations',
        mimeType: 'application/json',
      },
      {
        uri: 'payload://schema/{collection}',
        name: 'Collection schema',
        description: 'Get the field schema for a specific collection',
        mimeType: 'application/json',
      },
    ],
  }
})

// Handle resource reads
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params

  try {
    if (uri === 'payload://collections') {
      return await listCollectionsResource(payload)
    } else if (uri.startsWith('payload://schema/')) {
      const collection = uri.replace('payload://schema/', '')
      return await getSchemaResource(payload, collection)
    } else {
      throw new Error(`Unknown resource: ${uri}`)
    }
  } catch (error: any) {
    return {
      contents: [
        {
          uri,
          mimeType: 'text/plain',
          text: `Error: ${error.message}`,
        },
      ],
    }
  }
})

// Start the server
async function main() {
  await initializePayload()

  const transport = new StdioServerTransport()
  await server.connect(transport)

  console.error('Payload MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
