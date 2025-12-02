import { getPayload } from 'payload'
import config from '@payload-config'

const checkPage = async () => {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'property-owners'
      }
    }
  })

  if (pages.docs.length === 0) {
    console.log('❌ No property-owners page found')
    process.exit(1)
  }

  const page = pages.docs[0]

  console.log('\n📄 Property Owners Page:\n')
  console.log(`Title: ${page.title}`)
  console.log(`Slug: ${page.slug}`)
  console.log(`Published: ${page._status}`)

  console.log(`\n🎨 Hero:`)
  console.log(`  Type: ${page.hero?.type || 'none'}`)

  console.log(`\n📦 Layout Blocks (${page.layout?.length || 0} total):\n`)

  if (page.layout && page.layout.length > 0) {
    page.layout.forEach((block: any, index: number) => {
      console.log(`  ${index + 1}. ${block.blockType}`)

      if (block.heading) {
        console.log(`     Heading: "${block.heading}"`)
      }
    })
  } else {
    console.log('  ⚠️  No layout blocks found - page is empty!')
  }

  process.exit(0)
}

checkPage()
