import { getPayload } from 'payload'
import config from '../src/payload.config'
import { footerData } from '../src/seed/footer'

async function seedFooter() {
  try {
    const payload = await getPayload({ config })

    console.log('🦶 Seeding Footer...')

    await payload.updateGlobal({
      slug: 'footer',
      data: footerData as any,
    })

    console.log('✅ Footer seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding footer:', error)
    process.exit(1)
  }
}

seedFooter()
