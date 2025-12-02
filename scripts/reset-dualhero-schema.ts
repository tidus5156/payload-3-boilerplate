import { getPayload } from 'payload'
import config from '../src/payload.config'

async function resetDualHeroSchema() {
  const payload = await getPayload({ config })

  try {
    console.log('🔄 Resetting DualHero schema...')

    const db = payload.db

    // Drop existing DualHero tables
    await db.execute(sql`DROP TABLE IF EXISTS pages_blocks_dual_hero_left_panel_trust_indicators CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS pages_blocks_dual_hero CASCADE`)

    console.log('✅ Dropped old DualHero tables')

    // The schema will be recreated automatically when Payload starts next time
    console.log('✅ Schema will be recreated on next server start')
    console.log('   Restart your dev server to complete the migration')

  } catch (error) {
    console.error('❌ Error resetting schema:', error)
    throw error
  } finally {
    process.exit(0)
  }
}

// Helper for SQL template literal
function sql(strings: TemplateStringsArray, ...values: any[]) {
  return strings.reduce((acc, str, i) => {
    return acc + str + (values[i] || '')
  }, '')
}

resetDualHeroSchema()
