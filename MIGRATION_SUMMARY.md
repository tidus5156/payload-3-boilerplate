# Database Migration Summary - Local to Railway

## Migration Date
October 20, 2025

## ✅ Successfully Migrated

### Collections
- **Team Members**: 6 team members
- **Testimonials**: 30 testimonials
- **Neighborhoods**: 45 neighborhoods (27 existing + 18 new)
- **FAQs**: 47 FAQs (34 existing + 13 new)
- **Services**: 1 service
- **Posts**: 2 blog posts

### Globals
- **Header**: Navigation including "Rentals" menu item ✓

### Total Successfully Migrated
- **Collections**: 131 documents
- **Globals**: Header with complete navigation

---

## ⚠️ Partially Migrated or Failed

### Media Files (2 files)
- **Issue**: Filename validation error (physical files not on Railway server)
- **Impact**: Images won't display until re-uploaded
- **Action Needed**: Re-upload `/public/media/` folder to Railway OR re-upload through admin panel

### Categories (8 categories)
- **Issue**: Breadcrumb foreign key constraint (nested hierarchy issue)
- **Impact**: Blog post categorization may not work
- **Action Needed**: Can re-seed categories using production seed script

### Pages (12 pages) ❗ MAIN ISSUE
- **Issue**: Schema mismatch - local database has newer block configurations:
  - `icon_color` field in IconGrid blocks (doesn't exist on Railway)
  - HTMLEmbed block type (doesn't exist on Railway)
  - Hero media foreign key constraint
- **Impact**: Custom pages not migrated (pricing, process, testimonials, contact, about, services, resources, properties, owners, residents, areas-we-serve)
- **Action Needed**: Choose one of the options below

### Settings Global
- **Issue**: `logo_id` column doesn't exist on Railway
- **Impact**: Site logo setting may not work
- **Action Needed**: Can re-seed settings using production seed script

### Users (1 user)
- **Issue**: Password field cannot be imported (security by design)
- **Impact**: Admin account doesn't exist on Railway
- **Action Needed**: Create admin user manually

---

## 🎯 Recommended Next Steps

### Option A: Fresh Seed Approach (Recommended)
**Best if you want a clean start with production-ready content**

1. Run production seed script on Railway:
   ```bash
   DATABASE_URI="postgresql://postgres:SufWqqFajeGayDCQxXKKDzYldnMCegXP@mainline.proxy.rlwy.net:43276/railway" PAYLOAD_SECRET="1zp9pyIy4gOuLK3vyKqnKV+2dU4udetShVs5e1bcLe6o8jYCLyp/T+GfVBqYMgqs" pnpm tsx src/seed/production.ts
   ```

2. You'll get:
   - ✅ All base content (team, testimonials, neighborhoods, FAQs, categories)
   - ✅ Homepage with all blocks configured
   - ✅ Header navigation with "Rentals" menu
   - ✅ Settings with proper configuration

3. Then manually create custom pages through admin panel:
   - About, Pricing, Process, Services, etc.
   - (11 pages to recreate)

**Pros**: Clean, production-ready, no schema issues
**Cons**: Need to manually recreate 11 custom pages

### Option B: Update Railway Schema First
**Best if you want to preserve all custom page content**

1. Commit and push your code to Git (schema changes)
2. Deploy to Railway (triggers rebuild with new schema)
3. Once deployed, schema will auto-update
4. Re-run import script - pages should import successfully

**Pros**: Preserves all custom content
**Cons**: Requires deployment first, more complex

### Option C: Hybrid Approach
**Best balance of automation and preservation**

1. Run production seed on Railway for base content
2. Keep the successfully migrated items (team, testimonials, posts already there)
3. Use the 2 blog posts that successfully migrated
4. Manually recreate the 11 custom pages through admin

---

## 📊 Current Railway Database State

After migration attempts, Railway database contains:

### Collections
- ✅ 6 team members
- ✅ 30 testimonials
- ✅ 45 neighborhoods
- ✅ 47 FAQs
- ✅ 1 service
- ✅ 2 blog posts
- ❌ 0 categories (all failed)
- ❌ 0 pages (all failed)
- ❌ 0 media (failed)
- ❌ 0 users (failed)

### Globals
- ✅ Header (complete with "Rentals" menu item)
- ⚠️ Settings (partial - missing logo)

---

## 🔧 Manual Tasks Remaining

### Required (Any Option)
1. **Create admin user** on Railway:
   - Visit Railway admin panel `/admin/create-first-user`
   - Email: `admin@allaypm.com`
   - Password: Choose secure password

2. **Upload media files** (if using Option B/C):
   - hero-background-5.jpg
   - hero-background-6.jpg
   - Either upload via admin OR deploy `/public/media/` folder

### Optional (Depending on Chosen Option)
- Recreate 11 custom pages (Option A)
- Deploy code changes first (Option B)
- Verify all content after seed (Option C)

---

## 💡 Recommendation

**I recommend Option A (Fresh Seed)** because:
1. ✅ Fastest to get Railway database production-ready
2. ✅ No schema conflicts
3. ✅ Clean, tested seed data
4. ✅ Only 11 pages to recreate (can be done in admin panel)
5. ✅ Already successfully migrated the unique content (2 blog posts, custom testimonials/team)

The 11 pages are mostly standard pages with blocks that can be recreated quickly through the admin panel once you have the Railway database seeded.

---

## 📝 Files Created During Migration

- `/scripts/cleanup-duplicates.ts` - Removed 168 duplicate entries from local DB
- `/scripts/export-local-data.ts` - Exported local DB to JSON
- `/scripts/import-to-railway.ts` - Imported JSON to Railway
- `/migration-data.json` - Exported data (can be kept as backup)
- `/scripts/sync-railway-schema.ts` - Attempted schema sync

All scripts are reusable for future migrations.
