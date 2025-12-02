import { getPayload } from 'payload'
import config from '../src/payload.config'
import { headerData } from '../src/seed/header'

const updateHeaderFromSeed = async () => {
  const payload = await getPayload({ config })

  console.log('🔄 Updating header navigation from seed data...\n')

  try {
    await payload.updateGlobal({
      slug: 'header',
      data: headerData,
    })

    console.log('✅ Header navigation updated successfully!')
    console.log('\n📋 Navigation structure:')
    console.log('   - Services')
    console.log('   - Property Owners')
    console.log('   - Rentals  ← NEW!')
    console.log('   - Residents')
    console.log('   - About')
    console.log('   - Resources')
    console.log('   - Contact')
    console.log('\n✨ "Rentals" menu item added between "Property Owners" and "Residents"')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating header:', error)
    process.exit(1)
  }
}

updateHeaderFromSeed()
