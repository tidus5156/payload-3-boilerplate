import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function checkOwnersProcessHero() {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'owners-process' } },
    limit: 1
  })

  if (pages.docs.length > 0) {
    const page = pages.docs[0]
    console.log('📄 Page found:', page.title)
    console.log('🔗 URL: /owners/process')
    console.log('🎨 Hero type:', page.hero?.type || 'none')

    if (page.hero?.media) {
      console.log('🖼️  Has background media: YES')
      console.log('   Media ID:', typeof page.hero.media === 'object' ? page.hero.media.id : page.hero.media)
    } else {
      console.log('🖼️  Has background media: NO')
    }

    console.log('\n📋 Full hero configuration:')
    console.log(JSON.stringify(page.hero, null, 2))

    console.log('\n\n💡 Analysis:')
    if (page.hero?.type === 'mediumImpact') {
      if (page.hero?.media) {
        console.log('✅ This page SHOULD show the new immersive hero with:')
        console.log('   - Negative margin (-mt-20)')
        console.log('   - Transparent header overlay')
        console.log('   - Full viewport height (calc(70vh + 80px))')
        console.log('\n🔍 If changes are not visible, the dev server may need restart.')
      } else {
        console.log('⚠️  This page uses mediumImpact hero WITHOUT background media')
        console.log('   - It will NOT get the negative margin')
        console.log('   - It will NOT get the transparent header')
        console.log('   - It will use the gradient background instead')
        console.log('\n💡 To get the new immersive treatment, add a background image in the CMS')
      }
    }
  } else {
    console.log('❌ No page found with slug "owners-process"')
  }

  process.exit(0)
}

checkOwnersProcessHero()
