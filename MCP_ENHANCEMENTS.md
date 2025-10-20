# Payload CMS MCP Server Enhancements

## Summary

The Payload CMS MCP server has been enhanced with full CRUD operations for both documents and globals.

## Available Tools

### Document Operations

#### 1. `payload_create_document`
Create a new document in any Payload collection.

**Parameters:**
- `collection` (required): Collection slug (e.g., "pages", "posts", "testimonials")
- `data` (required): Document data object

**Example:**
```json
{
  "collection": "testimonials",
  "data": {
    "author": "John Doe",
    "content": "Great service!",
    "rating": 5
  }
}
```

#### 2. `payload_update_document`
Update an existing document by ID.

**Parameters:**
- `collection` (required): Collection slug
- `id` (required): Document ID
- `data` (required): Partial data object to update

**Example:**
```json
{
  "collection": "testimonials",
  "id": "65f4c3a2b1c9d8e7f6a5b4c3",
  "data": {
    "rating": 4
  }
}
```

#### 3. `payload_query_documents`
Query documents with filters, pagination, and sorting.

**Parameters:**
- `collection` (required): Collection slug
- `where` (optional): Query filters
- `limit` (optional): Number of results (default: 10)

**Example:**
```json
{
  "collection": "testimonials",
  "where": {
    "rating": {
      "greater_than": 3
    }
  },
  "limit": 5
}
```

#### 4. `payload_find_document`
Find a single document by ID.

**Parameters:**
- `collection` (required): Collection slug
- `id` (required): Document ID

**Example:**
```json
{
  "collection": "testimonials",
  "id": "65f4c3a2b1c9d8e7f6a5b4c3"
}
```

#### 5. `payload_delete_document`
Delete a document by ID.

**Parameters:**
- `collection` (required): Collection slug
- `id` (required): Document ID

**Example:**
```json
{
  "collection": "testimonials",
  "id": "65f4c3a2b1c9d8e7f6a5b4c3"
}
```

### Global Operations

#### 6. `payload_update_global`
Update global settings (header, footer, settings).

**Parameters:**
- `slug` (required): Global slug (e.g., "settings", "header", "footer")
- `data` (required): Partial data object to update

**Example:**
```json
{
  "slug": "settings",
  "data": {
    "siteName": "Allay Property Management",
    "phoneNumber": "(404) 555-0123"
  }
}
```

#### 7. `payload_find_global`
Retrieve global settings.

**Parameters:**
- `slug` (required): Global slug

**Example:**
```json
{
  "slug": "header"
}
```

## Implementation Details

### Files Modified

1. **`/scripts/mcp-server.ts`** (Primary MCP server used by Claude Code)
   - Added 5 new tools: update_document, find_document, delete_document, update_global, find_global
   - Implemented handlers for all new tools
   - Follows the same error handling patterns as existing tools

2. **`/mcp-payload/src/index.ts`** (Alternative comprehensive implementation)
   - Enhanced with global tools
   - Updated tool imports and handlers

3. **`/mcp-payload/src/tools/update-global.ts`** (New)
   - Tool implementation for updating globals
   - Uses `payload.updateGlobal()` API

4. **`/mcp-payload/src/tools/find-global.ts`** (New)
   - Tool implementation for retrieving globals
   - Uses `payload.findGlobal()` API

### Error Handling

All tools follow consistent error handling:
- Parameter validation before API calls
- Descriptive error messages
- Proper error propagation to MCP client

### Type Safety

- All tools use TypeScript with proper Payload types
- Runtime parameter validation
- Type-safe Payload API calls

## Usage with Claude Code

The MCP server is configured in `.mcp.json` and will automatically be available in Claude Code. The tools can be used to:

- Create and manage content (pages, posts, testimonials, etc.)
- Update existing documents
- Query and filter collections
- Manage global settings (header, footer, site settings)
- Delete documents when needed

## Available Collections

- Pages
- Posts
- Media
- Categories
- Users
- Comments
- Properties
- Neighborhoods
- Testimonials
- TeamMembers
- FAQs
- FormSubmissions
- Services

## Available Globals

- `settings` - Site-wide settings (contact info, social media, branding)
- `header` - Navigation menu configuration
- `footer` - Footer content and links

## Environment Variables

The MCP server requires these environment variables (configured in `.mcp.json`):

- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Payload secret key
- `NEXT_PUBLIC_SERVER_URL` - Public server URL

## Next Steps

To use the enhanced MCP server:

1. Restart Claude Code to reload the MCP server configuration
2. The new tools will be automatically available
3. Use them to interact with your Payload CMS instance

## Testing

You can test the tools by:

1. Querying existing documents: `payload_query_documents`
2. Finding a specific document: `payload_find_document`
3. Updating a document: `payload_update_document`
4. Creating new content: `payload_create_document`
5. Managing globals: `payload_find_global`, `payload_update_global`
