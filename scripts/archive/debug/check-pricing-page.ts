import { getPayload } from 'payload'
import config from '../src/payload.config'

const checkPricing = async () => {
  const payload = await getPayload({ config })

  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'pricing' } },
    limit: 1,
  })

  if (page.docs.length > 0) {
    console.log('✅ Pricing page EXISTS:', page.docs[0].title)
    console.log('   ID:', page.docs[0].id)
    console.log('   Slug:', page.docs[0].slug)
  } else {
    console.log('❌ Pricing page does NOT exist in CMS')
  }

  process.exit(0)
}

checkPricing()
