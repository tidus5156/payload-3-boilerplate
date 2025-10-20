import { getPayload } from 'payload'
import config from '@payload-config'

const fixSlug = async () => {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    where: { id: { equals: '8' } },
  })

  if (pages.docs.length === 0) {
    console.log('❌ No page found')
    process.exit(1)
  }

  const page = pages.docs[0]
  console.log(`Current slug: ${page.slug}`)

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: {
      slug: 'property-owners',
    },
  })

  console.log('✅ Slug updated to: property-owners')
  process.exit(0)
}

fixSlug()
