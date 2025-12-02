import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function checkHomepageStructure() {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1
  })

  if (pages.docs.length > 0) {
    const page = pages.docs[0]
    console.log('📄 Homepage:', page.title)
    console.log('🔗 URL: http://localhost:3000/')
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('\n🎨 HERO FIELD:')
    console.log('   Type:', page.hero?.type || 'null/empty')

    if (page.hero?.type) {
      console.log('   Has media:', page.hero?.media ? 'yes' : 'no')
    } else {
      console.log('   ℹ️  Homepage is NOT using hero field')
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('\n📦 LAYOUT BLOCKS:')
    console.log('   Total blocks:', page.layout?.length || 0)

    if (page.layout && page.layout.length > 0) {
      console.log('\n   Block list:')
      page.layout.forEach((block: any, index: number) => {
        console.log(`   ${index + 1}. ${block.blockType}`)
      })

      console.log('\n   First block details:')
      const firstBlock = page.layout[0]
      console.log('   Type:', firstBlock.blockType)

      if (firstBlock.blockType === 'dualHero') {
        console.log('   ✨ DualHero block detected!')
        console.log('   This is why homepage has immersive treatment')
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('\n💡 EXPLANATION:')
    console.log('   - Homepage uses LAYOUT BLOCKS (DualHero block)')
    console.log('   - Content pages use HERO FIELD (HighImpact/MediumImpact/LowImpact)')
    console.log('   - These are TWO DIFFERENT SYSTEMS')
    console.log('\n   For content pages to get immersive treatment:')
    console.log('   → Add background images to MediumImpact heroes in CMS')
    console.log('   → Or change hero type to HighImpact')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  } else {
    console.log('❌ No homepage found')
  }

  process.exit(0)
}

checkHomepageStructure()
