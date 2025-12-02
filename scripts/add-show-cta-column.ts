import { getPayload } from 'payload'
import config from '../src/payload.config'

async function addColumn() {
  try {
    const payload = await getPayload({ config })

    console.log('🔄 Adding showCTA column to pages table...')

    await payload.db.drizzle.execute(
      `ALTER TABLE pages ADD COLUMN IF NOT EXISTS hero_show_cta BOOLEAN DEFAULT false`
    )

    console.log('✅ Column added successfully!')
    console.log('  - Column: hero_show_cta')
    console.log('  - Type: BOOLEAN')
    console.log('  - Default: false (CTAs hidden by default for MediumImpact)')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

addColumn()
