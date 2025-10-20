import { getPayload } from 'payload'
import config from '../src/payload.config'

const debugHeaderUpdate = async () => {
  const payload = await getPayload({ config })

  console.log('🔍 Debugging header update...\n')

  try {
    // First, get the current header
    const header = await payload.findGlobal({
      slug: 'header',
    })

    console.log('Current header structure:')
    console.log(JSON.stringify(header, null, 2))

    // Try to update with exact same data
    console.log('\n\nAttempting to update with exact same data...')
    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: header.navItems,
      },
    })

    console.log('✅ Update successful with same data')
    process.exit(0)
  } catch (error: any) {
    console.error('❌ Error:', error.message)
    if (error.data?.errors) {
      console.error('Validation errors:', JSON.stringify(error.data.errors, null, 2))
    }
    process.exit(1)
  }
}

debugHeaderUpdate()
