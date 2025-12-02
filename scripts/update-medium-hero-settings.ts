import { getPayload } from 'payload'
import config from '../src/payload.config'

async function updateSettings() {
  try {
    const payload = await getPayload({ config })

    console.log('🔄 Updating MediumImpact hero settings...')

    // Update the settings global with new values
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        heroDefaults: {
          highImpactHeight: '100vh',
          mediumImpactHeight: '65vh',
          overlayOpacity: '60',
          mediumImpactOverlayOpacity: '45',
        },
      },
    })

    console.log('✅ Settings updated successfully!')
    console.log('  - MediumImpact height: 65vh (was 90vh)')
    console.log('  - MediumImpact overlay: 45% (new)')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

updateSettings()
