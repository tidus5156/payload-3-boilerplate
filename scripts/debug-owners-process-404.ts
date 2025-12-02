import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function debugOwnersProcess404() {
  const payload = await getPayload({ config })

  console.log('\n🔍 DEBUGGING /owners/process 404 ERROR')
  console.log('━'.repeat(80))

  // Check if page exists with slug "owners-process"
  const pageWithHyphen = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'owners-process' } },
    limit: 1
  })

  console.log('\n1️⃣ Checking for slug "owners-process" (with hyphen):')
  if (pageWithHyphen.docs.length > 0) {
    const page = pageWithHyphen.docs[0]
    console.log('   ✅ FOUND')
    console.log('   📄 Title:', page.title)
    console.log('   🔗 Correct URL: http://localhost:3000/owners-process')
    console.log('   🎨 Hero type:', page.hero?.type || 'none')
    console.log('   📝 Status:', page._status)
  } else {
    console.log('   ❌ NOT FOUND')
  }

  // Check if page exists with slug "owners/process"
  const pageWithSlash = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'owners/process' } },
    limit: 1
  })

  console.log('\n2️⃣ Checking for slug "owners/process" (with slash):')
  if (pageWithSlash.docs.length > 0) {
    const page = pageWithSlash.docs[0]
    console.log('   ✅ FOUND')
    console.log('   📄 Title:', page.title)
    console.log('   🔗 Correct URL: http://localhost:3000/owners/process')
    console.log('   🎨 Hero type:', page.hero?.type || 'none')
    console.log('   📝 Status:', page._status)
  } else {
    console.log('   ❌ NOT FOUND')
  }

  // Check all pages with "process" in slug
  const allProcessPages = await payload.find({
    collection: 'pages',
    limit: 100
  })

  const processPages = allProcessPages.docs.filter(p =>
    p.slug?.toLowerCase().includes('process')
  )

  console.log('\n3️⃣ All pages containing "process" in slug:')
  if (processPages.length > 0) {
    processPages.forEach(p => {
      console.log(`   📄 "${p.title}"`)
      console.log(`      Slug: ${p.slug}`)
      console.log(`      URL: http://localhost:3000/${p.slug}`)
      console.log(`      Hero: ${p.hero?.type || 'none'}`)
      console.log(`      Status: ${p._status}`)
      console.log('')
    })
  } else {
    console.log('   ❌ No pages found')
  }

  console.log('━'.repeat(80))
  console.log('\n💡 ROUTING EXPLANATION:')
  console.log('   In Next.js App Router with PayloadCMS:')
  console.log('   - Pages are accessed by their SLUG field')
  console.log('   - Slug "owners-process" → URL /owners-process')
  console.log('   - Slug "owners/process" → URL /owners/process')
  console.log('')
  console.log('   The 404 error means the slug doesn\'t match the URL you\'re using.')
  console.log('━'.repeat(80))

  // Check for dynamic route setup
  console.log('\n4️⃣ Checking routing structure...')
  const fs = await import('fs')
  const path = await import('path')

  const ownersDir = path.default.join(process.cwd(), 'src/app/(frontend)/owners')
  if (fs.default.existsSync(ownersDir)) {
    console.log('   ✅ /owners directory exists')
    const contents = fs.default.readdirSync(ownersDir)
    console.log('   📁 Contents:', contents.join(', '))
  } else {
    console.log('   ❌ /owners directory does NOT exist')
  }

  process.exit(0)
}

debugOwnersProcess404()
