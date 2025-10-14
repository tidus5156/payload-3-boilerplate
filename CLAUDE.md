# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Payload CMS V3 website builder boilerplate designed for deployment on Railway with PostgreSQL database support. It's a full-stack Next.js application combining a headless CMS backend with a production-ready frontend website.

## Development Commands

### Essential Commands
- `pnpm dev` or `npm run dev` - Start development server (runs Next.js with Payload admin)
- `pnpm build` or `npm run build` - Build for production (runs migrations then builds Next.js)
- `pnpm start` or `npm run start` - Start production server
- `pnpm lint` or `npm run lint` - Run ESLint
- `pnpm lint:fix` or `npm run lint:fix` - Run ESLint and auto-fix issues

### Payload-Specific Commands
- `pnpm payload` or `npm run payload` - Access Payload CLI
- `pnpm generate:types` or `npm run generate:types` - Generate TypeScript types from Payload collections
- `pnpm generate:importmap` or `npm run generate:importmap` - Generate import map for admin UI
- `pnpm dev:prod` or `npm run dev:prod` - Clean build and start (removes .next directory first)

### Package Management
- `pnpm ii` or `npm run ii` - Install dependencies (ignores workspace)
- `pnpm reinstall` or `npm run reinstall` - Clean reinstall (removes node_modules and lockfile)

## Architecture

### Next.js App Router Structure
- **`src/app/(frontend)/`** - Public-facing website routes (uses Next.js App Router with route groups)
- **`src/app/(payload)/`** - Payload CMS admin panel routes
- Frontend and admin are separated using route groups for isolated layouts

### Payload CMS Configuration
- **Main config**: `src/payload.config.ts` - Central configuration for database, collections, globals, plugins
- **Collections**: `src/collections/` - Defines content models (Pages, Posts, Media, Categories, Users, Comments)
- **Globals**: Header and Footer configurations for site-wide content
- **Database**: PostgreSQL via `@payloadcms/db-postgres` adapter

### Collections Overview
- **Pages** (`src/collections/Pages/`) - Flexible page builder with hero and layout blocks
- **Posts** (`src/collections/Posts/`) - Blog posts with categories and premium content gating
- **Media** - Image/file management with size variants
- **Categories** - Hierarchical categories using nested-docs plugin
- **Users** - Authentication with role-based access control (admins and users)
- **Comments** - User comments with admin approval workflow

### Content Architecture
- **Blocks** (`src/blocks/`) - Reusable content blocks for layout builder:
  - Archive, Banner, CallToAction, Code, Content, Form, MediaBlock, RelatedPosts
  - Used in Pages and Posts via `layout` field
  - Each block has a config file and React component
- **Heros** (`src/heros/`) - Hero section variants:
  - HighImpact, MediumImpact, LowImpact, PostHero
  - Configured per-page in the Hero tab
- **Fields** (`src/fields/`) - Reusable field configurations (slug, defaultLexical editor)

### Access Control Pattern
- **`src/access/authenticated.ts`** - Requires user to be logged in
- **`src/access/authenticatedOrPublished.ts`** - Public can see published content, authenticated users see all
- Applied at collection level in collection configs
- Premium content uses additional access rules in Posts collection

### Plugin Configuration
Located in `src/plugins/index.ts`:
- **SEO Plugin** - Auto-generates meta tags and OpenGraph data
- **Redirects Plugin** - Manages URL redirects for Pages and Posts
- **Nested Docs Plugin** - Enables hierarchical Categories
- **Form Builder Plugin** - Creates forms with Lexical editor
- **Search Plugin** - Full-text search on Posts collection
- **Payload Cloud Plugin** - Integration for Payload Cloud hosting

### Frontend Rendering
- **RenderBlocks** (`src/blocks/RenderBlocks.tsx`) - Dynamically renders layout blocks
- **RenderHero** (`src/heros/RenderHero.tsx`) - Renders hero variants
- Each block/hero has corresponding React component in its directory
- Uses Server Components by default with draft preview support

### Hooks
- **`src/hooks/populatePublishedAt`** - Auto-sets publishedAt date
- **`src/hooks/revalidateRedirects`** - Revalidates Next.js cache on redirect changes
- Collection-specific hooks in collection directories (e.g., `Pages/hooks/revalidatePage.ts`)

### Key Features Implementation
- **Draft Preview** - Live preview configured in collection admin settings with autosave every 100ms
- **Live Preview** - `LivePreviewListener` component in frontend layout
- **Admin Bar** - Shows draft mode controls on frontend (`AdminBar` component)
- **Authentication** - JWT-based auth with jsonwebtoken package
- **Comments System** - User-submitted comments requiring admin approval (Comments collection)
- **Premium Content** - Access-controlled content for authenticated users in Posts

### Environment Variables
Required in `.env`:
- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Used to encrypt JWT tokens
- `NEXT_PUBLIC_SERVER_URL` - Base URL for links and CORS (no trailing slash)

### Path Aliases
Configured in `tsconfig.json`:
- `@/*` - Maps to `src/*`
- `@payload-config` - Maps to `src/payload.config.ts`

### Styling
- TailwindCSS configured with shadcn/ui patterns
- Global styles in `src/app/(frontend)/globals.css`
- Uses Geist font family (Sans and Mono)
- CSS variables defined in `src/cssVariables.js`

### Type Generation
- Run `pnpm generate:types` after modifying collections/globals
- Generated types in `src/payload-types.ts`
- Collections use TypeScript generics for type safety (e.g., `CollectionConfig<'pages'>`)

### Utilities
Located in `src/utilities/`:
- **`getDocument.ts`** - Fetch single document with draft support
- **`getMeUser.ts`** - Get current authenticated user
- **`getGlobals.ts`** - Fetch global data (Header/Footer)
- **`generatePreviewPath.ts`** - Generate draft preview URLs
- **`getURL.ts`** - Get server/client URLs for environment

### Important Patterns
- Always use `authenticatedOrPublished` access for public content collections
- Use `@/` import alias instead of relative paths
- Revalidation hooks are critical - they trigger Next.js cache updates when CMS content changes
- Collections that support draft preview need `livePreview` config and `generatePreviewPath`
- Admin components use `beforeLogin` and `beforeDashboard` for custom admin UI
