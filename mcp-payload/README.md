# Payload CMS MCP Server

Model Context Protocol (MCP) server for Payload CMS integration with Claude Code. This server provides direct API access to your Payload collections, allowing Claude to create, read, update, and delete content programmatically.

## Features

### Tools

- **payload_create_document** - Create new documents in any collection
- **payload_update_document** - Update existing documents
- **payload_query_documents** - Query documents with filters, sorting, and pagination
- **payload_find_document** - Find a single document by ID
- **payload_delete_document** - Delete documents
- **payload_upload_media** - Upload files to the Media collection

### Resources

- **collections_list** - List all available Payload collections with their configurations
- **collection_schema** - Get the field schema for a specific collection

## Installation

### 1. Install Dependencies

From the `mcp-payload` directory:

```bash
npm install
```

### 2. Build the MCP Server

```bash
npm run build
```

This will compile the TypeScript code to JavaScript in the `build/` directory.

### 3. Configure Claude Code

Add the MCP server to your Claude Code configuration. The configuration file location varies by system:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

Add this configuration:

```json
{
  "mcpServers": {
    "payload-cms": {
      "command": "node",
      "args": [
        "/Users/harrisonthornhill/github/payload-3-boilerplate/mcp-payload/build/index.js"
      ],
      "env": {
        "DATABASE_URI": "postgresql://your-database-connection-string",
        "PAYLOAD_SECRET": "your-payload-secret",
        "PAYLOAD_CONFIG_PATH": "/Users/harrisonthornhill/github/payload-3-boilerplate/src/payload.config.ts"
      }
    }
  }
}
```

**Important**: Update the paths and environment variables to match your setup:
- Replace the absolute path in `args` with your actual project path
- Set `DATABASE_URI` to your PostgreSQL connection string (same as in your `.env`)
- Set `PAYLOAD_SECRET` to match your Payload secret (same as in your `.env`)
- Set `PAYLOAD_CONFIG_PATH` to the absolute path of your `payload.config.ts`

### 4. Restart Claude Code

After updating the configuration, restart Claude Code for the changes to take effect.

### 5. Verify Installation

Once Claude Code restarts, the MCP server should appear in the sidebar under "MCP Servers" as "payload-cms". You can toggle it on/off from there.

## Usage Examples

### Create a New Page

```typescript
// Claude will use this tool automatically
payload_create_document({
  collection: "pages",
  data: {
    title: "About Us",
    slug: "about-us",
    _status: "published",
    hero: {
      type: "lowImpact",
      richText: [
        {
          children: [
            {
              text: "Welcome to our About page"
            }
          ]
        }
      ]
    },
    layout: []
  }
})
```

### Query Published Posts

```typescript
payload_query_documents({
  collection: "posts",
  where: {
    _status: { equals: "published" }
  },
  limit: 10,
  sort: "-publishedAt"
})
```

### Upload an Image

```typescript
payload_upload_media({
  filePath: "/absolute/path/to/image.jpg",
  alt: "Hero image for homepage"
})
```

### List All Collections

```typescript
// Access via resource
payload://collections
```

### Get Schema for a Collection

```typescript
// Access via resource
payload://schema/pages
```

## Architecture

```
mcp-payload/
├── src/
│   ├── index.ts              # Main MCP server
│   ├── tools/                # Tool implementations
│   │   ├── create-document.ts
│   │   ├── update-document.ts
│   │   ├── query-documents.ts
│   │   ├── find-document.ts
│   │   ├── delete-document.ts
│   │   └── upload-media.ts
│   └── resources/            # Resource implementations
│       ├── list-collections.ts
│       └── get-schema.ts
├── build/                    # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## How It Works

1. **MCP Server**: Runs as a separate process that Claude Code communicates with via stdio
2. **Payload Connection**: Uses Payload's Local API (`getPayload()`) to connect to your database
3. **Tool Calls**: When Claude needs to interact with your CMS, it calls the appropriate tool
4. **Direct Database Access**: Bypasses the HTTP API for faster, more reliable operations

## Benefits

- **No REST API calls** - Direct database access is faster and more reliable
- **Same database** - Works with your existing Payload database (local or Railway)
- **Type-safe** - Uses Payload's TypeScript types
- **Real-time** - Claude can work with live data as you build
- **Powerful queries** - Full access to Payload's query syntax

## Troubleshooting

### MCP Server Not Appearing in Sidebar

1. Check that the configuration file exists and is valid JSON
2. Verify all paths are absolute and correct
3. Restart Claude Code
4. Check Claude Code logs for errors

### Connection Errors

1. Verify `DATABASE_URI` is correct and accessible
2. Ensure `PAYLOAD_SECRET` matches your configuration
3. Check that `PAYLOAD_CONFIG_PATH` points to the correct file
4. Make sure the database is running and accessible

### Build Errors

1. Ensure all dependencies are installed: `npm install`
2. Check TypeScript version compatibility
3. Verify Node.js version (requires Node 16+)

## Development

### Rebuild After Changes

```bash
npm run build
```

### Test the Server

You can test the MCP server by checking the Claude Code console after it connects. The server will log "Payload initialized successfully" when ready.

## Security Notes

- The MCP server has full access to your Payload database
- It runs with the same permissions as your main application
- Environment variables (including DATABASE_URI) are passed securely
- The server only accepts connections from Claude Code via stdio

## License

MIT
