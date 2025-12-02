import { getPayload } from 'payload'
import config from '../src/payload.config'

async function fixColumn() {
  try {
    const payload = await getPayload({ config })

    console.log('🔄 Fixing showCTA column name...')

    // Drop the incorrectly named column
    await payload.db.drizzle.execute(
      `ALTER TABLE pages DROP COLUMN IF EXISTS hero_show_cta`
    )

    // Add with the correct Payload-expected name (show_c_t_a not show_cta)
    await payload.db.drizzle.execute(
      `ALTER TABLE pages ADD COLUMN IF NOT EXISTS hero_show_c_t_a BOOLEAN DEFAULT false`
    )

    console.log('✅ Column fixed successfully!')
    console.log('  - Dropped: hero_show_cta')
    console.log('  - Added: hero_show_c_t_a (Payload snake_case conversion)')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

fixColumn()
