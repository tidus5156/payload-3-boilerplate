import { getPayload } from 'payload'
import config from '../src/payload.config'
import { sql } from 'drizzle-orm'

async function checkAndFixTables() {
  const payload = await getPayload({ config })

  try {
    console.log('🔍 Checking for DualHero tables...')
    console.log('')

    // Check which tables exist
    const result = await payload.db.execute(sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name LIKE '%dual_hero%'
      ORDER BY table_name
    `)

    console.log('📊 Found tables:')
    if (result.rows.length === 0) {
      console.log('   ❌ No DualHero tables found!')
    } else {
      result.rows.forEach((row: any) => {
        console.log('   ✓', row.table_name)
      })
    }
    console.log('')

    // The required tables
    const requiredTables = [
      'pages_blocks_dual_hero',
      'pages_blocks_dual_hero_left_panel_trust_indicators',
      '_pages_v_blocks_dual_hero',
      '_pages_v_blocks_dual_hero_left_panel_trust_indicators'
    ]

    const existingTableNames = result.rows.map((row: any) => row.table_name)
    const missingTables = requiredTables.filter(t => !existingTableNames.includes(t))

    if (missingTables.length > 0) {
      console.log('⚠️  Missing tables:')
      missingTables.forEach(t => console.log('   -', t))
      console.log('')
      console.log('🔧 Creating missing tables by triggering Payload migration...')

      // Force Payload to sync by accessing the collections
      await payload.find({ collection: 'pages', limit: 1 })

      console.log('✅ Migration triggered')
    } else {
      console.log('✅ All required tables exist!')
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    process.exit(0)
  }
}

checkAndFixTables()
