# Development Workflow

## Quick Start

### Local Development (Fast!)

1. **Start PostgreSQL** (Docker)
   ```bash
   docker compose up -d
   ```

2. **Start Dev Server**
   ```bash
   pnpm dev
   ```

3. **Use Claude Code MCP** to create content
   - Claude can now create content directly in your database via MCP tools
   - No manual seeding needed!
   - Changes appear immediately at `http://localhost:3002`

### Creating Content

**With Claude Code MCP (Recommended):**
```
You: "Claude, create 5 testimonials for the homepage"
Claude: [uses payload_create_document tool]
        → Creates directly in local database

You: Refresh http://localhost:3002
     → See new content immediately!
```

**Manual via Admin Panel:**
- Go to `http://localhost:3002/admin`
- Create/edit content through UI
- Changes save to local database

### Deploying to Railway

When you're ready to deploy:

1. **Migrate Content to Railway**
   ```bash
   pnpm migrate:railway
   ```
   This exports all content from local DB and imports to Railway DB.

2. **Deploy Code** (Railway auto-deploys from git)
   ```bash
   git add .
   git commit -m "Add new content"
   git push
   ```

3. **Done!**
   Your Railway site now has all the content you created locally.

## Available Commands

### Development
- `pnpm dev` - Start dev server (port 3000, 3001, or 3002)
- `pnpm build` - Production build
- `pnpm lint` - Check code quality

### Database
- `pnpm seed:production` - Seed with Allay default content (one-time)
- `pnpm seed:reset` - Clear database and reseed
- `pnpm migrate:railway` - Export local → Import to Railway

### Content Generation
- Use Claude Code with Payload MCP (automatic)
- Or use admin panel at `/admin`

## Environment Variables

### Local Development (.env)
```bash
DATABASE_URI=postgresql://user:password@localhost:5432/allay_pm
```

### Railway (set in Railway dashboard)
```bash
DATABASE_URI=postgresql://[railway-url]/railway
PAYLOAD_SECRET=[your-secret]
```

## Workflow Tips

✅ **DO:**
- Develop locally with fast PostgreSQL connection
- Use Claude Code MCP for rapid content creation
- Test everything locally before deploying
- Migrate content to Railway when ready

❌ **DON'T:**
- Connect local dev directly to Railway DB (slow!)
- Reseed database for small content changes
- Edit seed files for content updates (use MCP or admin panel)

## Troubleshooting

### MCP Not Showing Up
1. Quit Claude Code completely (Cmd+Q)
2. Reopen Claude Code
3. Wait 30 seconds for MCP to initialize
4. Check sidebar for "payload-cms"

### Database Connection Issues
```bash
# Restart PostgreSQL
docker compose restart

# Check if running
docker ps | grep postgres
```

### Content Not Appearing
1. Check if database is running
2. Restart dev server (`pnpm dev`)
3. Clear browser cache
4. Check `/admin` to verify content exists

## Claude Code MCP Tools

Once MCP is connected, Claude can use:

- `payload_create_document` - Create pages, posts, testimonials, etc.
- `payload_query_documents` - Query existing content
- `payload_update_document` - Update existing content
- `payload_delete_document` - Delete content

**Example:**
```
You: "Create a new page called 'About Us' with a hero section"
Claude: [uses payload_create_document with pages collection]
You: Refresh browser → See new page at /about-us
```
