import { getPayload } from 'payload'
import config from '../src/payload.config'
import { headerData } from '../src/seed/header'

const updateHeaderNavigation = async () => {
  const payload = await getPayload({ config })

  console.log('🔄 Updating header navigation...')

  try {
    await payload.updateGlobal({
      slug: 'header',
      data: headerData,
    })

    console.log('✅ Header navigation updated successfully!')
    console.log('   - FAQs for Owners now points to: /owners/faq')
    console.log('   - FAQs for Residents now points to: /residents/faq')
  } catch (error) {
    console.error('❌ Error updating header:', error)
    process.exit(1)
  }

  process.exit(0)
}

updateHeaderNavigation()
