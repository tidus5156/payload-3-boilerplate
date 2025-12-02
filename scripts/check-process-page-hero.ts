import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function checkProcessPageHero() {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'process' } },
    limit: 1
  })

  if (pages.docs.length > 0) {
    const page = pages.docs[0]
    console.log('📄 Page found:', page.title)
    console.log('🎨 Hero type:', page.hero?.type || 'none')
    console.log('🖼️  Has media:', page.hero?.media ? 'yes' : 'no')
    console.log('\n📋 Full hero configuration:')
    console.log(JSON.stringify(page.hero, null, 2))
  } else {
    console.log('❌ No page found with slug "process"')
    console.log('\n🔍 Let me search for pages with "process" in the slug...')

    const allPages = await payload.find({
      collection: 'pages',
      limit: 100
    })

    const processPages = allPages.docs.filter(p => p.slug?.includes('process'))

    if (processPages.length > 0) {
      console.log('\n📄 Found pages containing "process":')
      processPages.forEach(p => {
        console.log(`  - ${p.title} (slug: ${p.slug}, hero type: ${p.hero?.type || 'none'})`)
      })
    }
  }

  process.exit(0)
}

checkProcessPageHero()
