import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function checkPages() {
  const payload = await getPayload({ config })

  // Get all pages
  const pages = await payload.find({
    collection: 'pages',
    limit: 20,
    sort: '-createdAt',
  })

  console.log('\n📄 ALL PAGES IN DATABASE:')
  console.log('════════════════════════════════════════')
  pages.docs.forEach((page, i) => {
    console.log(`${i + 1}. ID: ${page.id}`)
    console.log(`   Title: ${page.title || '(NO TITLE)'}`)
    console.log(`   Slug: ${page.slug || '(NO SLUG)'}`)
    console.log(`   Status: ${page._status}`)
    console.log(`   Created: ${page.createdAt}`)
    console.log('')
  })

  console.log(`Total pages: ${pages.totalDocs}`)

  // Check homepage specifically
  const homepage = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  if (homepage.docs.length > 0) {
    console.log('\n🏠 HOMEPAGE DETAILS:')
    console.log('════════════════════════════════════════')
    const home = homepage.docs[0]
    console.log(`Title: ${home.title}`)
    console.log(`Slug: ${home.slug}`)
    console.log(`Status: ${home._status}`)
    console.log(`Layout blocks: ${home.layout?.length || 0}`)
    if (home.layout) {
      home.layout.forEach((block: any, i: number) => {
        console.log(`  ${i + 1}. ${block.blockType}`)
      })
    }
  }

  process.exit(0)
}

checkPages()
