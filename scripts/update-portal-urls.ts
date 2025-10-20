import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenvConfig({ path: resolve(process.cwd(), '.env') })

import { getPayload } from 'payload'

const updatePortalUrls = async () => {
  try {
    const { default: config } = await import('@payload-config')
    const payload = await getPayload({ config })

    console.log('🔗 Updating portal URLs in settings...')

    await payload.updateGlobal({
      slug: 'settings',
      data: {
        ownerPortalUrl: 'https://remaxatlanta.rentvine.com/portals/owner/',
        residentPortalUrl: 'https://remaxatlanta.rentvine.com/portals/resident/',
      },
    })

    console.log('✅ Portal URLs updated successfully!')
    console.log('   - Owner Portal: https://remaxatlanta.rentvine.com/portals/owner/')
    console.log('   - Resident Portal: https://remaxatlanta.rentvine.com/portals/resident/')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating portal URLs:', error)
    process.exit(1)
  }
}

updatePortalUrls()
