import { getPayload } from 'payload'
import config from '../src/payload.config'

const listPages = async () => {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    sort: 'slug',
  })

  console.log('\n📄 Current Pages in CMS:\n')
  pages.docs.forEach((page) => {
    console.log(`  - /${page.slug} (ID: ${page.id}) - ${page.title}`)
  })

  console.log(`\nTotal: ${pages.docs.length} pages`)

  process.exit(0)
}

listPages()
