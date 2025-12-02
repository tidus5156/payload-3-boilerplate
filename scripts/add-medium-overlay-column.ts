import { getPayload } from 'payload'
import config from '../src/payload.config'

async function addColumn() {
  try {
    const payload = await getPayload({ config })

    console.log('🔄 Adding mediumImpactOverlayOpacity column...')

    await payload.db.drizzle.execute(
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS hero_defaults_medium_impact_overlay_opacity TEXT DEFAULT '45'`
    )

    console.log('✅ Column added successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

addColumn()
