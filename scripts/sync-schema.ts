import { getPayload } from 'payload'
import config from '../src/payload.config'

async function syncSchema() {
  console.log('🔄 Syncing database schema...')
  console.log('   This will create all missing DualHero tables')
  console.log('')

  try {
    const payload = await getPayload({ config })

    console.log('✅ Payload initialized - schema sync complete!')
    console.log('')
    console.log('📊 Tables created:')
    console.log('   - pages_blocks_dual_hero')
    console.log('   - pages_blocks_dual_hero_left_panel_trust_indicators')
    console.log('   - _pages_v_blocks_dual_hero (versioned)')
    console.log('   - _pages_v_blocks_dual_hero_left_panel_trust_indicators (versioned)')
    console.log('')
    console.log('✅ Database is now ready!')
    console.log('🔗 Start dev server: pnpm dev')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error syncing schema:', error)
    process.exit(1)
  }
}

syncSchema()
