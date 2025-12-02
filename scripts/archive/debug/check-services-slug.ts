import { getPayload } from 'payload'
import config from '@payload-config'

const checkSlug = async () => {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    where: { id: { equals: '7' } }
  })

  const page = pages.docs[0]
  console.log('Page ID:', page.id)
  console.log('Page title:', page.title)
  console.log('Page slug:', page.slug)

  process.exit(0)
}

checkSlug()
