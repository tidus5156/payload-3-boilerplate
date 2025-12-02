import { getPayload } from 'payload'
import config from '@payload-config'

const listPages = async () => {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    sort: 'slug'
  })

  console.log('\n📄 All Pages in Database:\n')
  pages.docs.forEach((page) => {
    console.log(`  - ${page.slug.padEnd(25)} | ${page.title}`)
  })

  console.log(`\nTotal: ${pages.docs.length} pages`)
  process.exit(0)
}

listPages()
