import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function fixOwnersProcessSlug() {
  const payload = await getPayload({ config })

  console.log('\n🔧 FIXING OWNERS PROCESS PAGE SLUG')
  console.log('━'.repeat(80))

  // Find the page with the mangled slug
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        like: '%process%'
      }
    },
    limit: 10
  })

  console.log('\n📄 Found pages with "process" in slug:')
  pages.docs.forEach(p => {
    console.log(`   - ${p.title}`)
    console.log(`     Current slug: ${p.slug}`)
  })

  // Find the specific page
  const processPage = pages.docs.find(p =>
    p.title?.includes('Our Process') ||
    p.slug?.includes('our-process') ||
    p.slug?.includes('owners-process')
  )

  if (!processPage) {
    console.log('\n❌ Could not find the process page')
    process.exit(1)
  }

  console.log('\n✅ Found page to fix:')
  console.log(`   Title: ${processPage.title}`)
  console.log(`   Current slug: ${processPage.slug}`)
  console.log(`   Current URL: http://localhost:3000/${processPage.slug}`)

  // Update the slug
  console.log('\n🔄 Updating slug to: owners-process')

  await payload.update({
    collection: 'pages',
    id: processPage.id,
    data: {
      slug: 'owners-process'
    }
  })

  console.log('✅ Slug updated!')
  console.log(`   New URL: http://localhost:3000/owners/process`)
  console.log('\n💡 The /owners/[page] route will handle the conversion:')
  console.log('   Database slug: owners-process')
  console.log('   Browser URL: /owners/process')

  console.log('\n━'.repeat(80))

  process.exit(0)
}

fixOwnersProcessSlug()
