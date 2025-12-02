import { getPayload } from 'payload'
import config from '../src/payload.config'

async function addDesignBrandingColumns() {
  try {
    const payload = await getPayload({ config })

    // Get the database connection from payload
    const db = payload.db

    if (!db || !db.drizzle) {
      console.error('❌ No database connection available')
      process.exit(1)
    }

    console.log('🔄 Adding Design & Branding columns to settings table...')

    // Add the new columns using raw SQL
    const queries = [
      // Color Palette columns
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS color_palette_deep_navy TEXT DEFAULT '#1B3A6D'`,
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS color_palette_sky_blue TEXT DEFAULT '#5A9FD4'`,
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS color_palette_warm_gold TEXT DEFAULT '#C9A961'`,
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS color_palette_sage_green TEXT DEFAULT '#7A9B76'`,
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS color_palette_charcoal TEXT DEFAULT '#2D3436'`,
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS color_palette_warm_gray TEXT DEFAULT '#6C757D'`,
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS color_palette_light_gray TEXT DEFAULT '#F5F7FA'`,

      // Typography columns
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS typography_heading_font TEXT DEFAULT 'Montserrat'`,
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS typography_body_font TEXT DEFAULT 'Open Sans'`,

      // Hero Defaults columns
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS hero_defaults_high_impact_height TEXT DEFAULT '100vh'`,
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS hero_defaults_medium_impact_height TEXT DEFAULT '90vh'`,
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS hero_defaults_overlay_opacity TEXT DEFAULT '60'`,

      // Visual Effects columns
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS visual_effects_enable_glow_effects BOOLEAN DEFAULT true`,
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS visual_effects_enable_shimmer_effects BOOLEAN DEFAULT true`,
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS visual_effects_enable_smooth_scrolling BOOLEAN DEFAULT true`,
    ]

    for (const query of queries) {
      await db.drizzle.execute(query)
      console.log('✅', query.substring(0, 80) + '...')
    }

    console.log('\n✅ All Design & Branding columns added successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error adding columns:', error)
    process.exit(1)
  }
}

addDesignBrandingColumns()
