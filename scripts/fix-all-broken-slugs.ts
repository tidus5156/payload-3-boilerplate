import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function fixAllBrokenSlugs() {
  const payload = await getPayload({ config })

  console.log('\n🔧 FIXING ALL BROKEN SLUGS')
  console.log('━'.repeat(80))

  const fixes = [
    {
      search: 'our-process---how-it-works--allay-property-management',
      correct: 'owners-process',
      title: 'Our Process'
    },
    {
      search: 'testimonials---property-owner-reviews--allay-property-management',
      correct: 'owners-testimonials',
      title: 'Testimonials'
    }
  ]

  for (const fix of fixes) {
    console.log(`\n📄 Fixing: ${fix.title}`)
    console.log(`   Current slug: ${fix.search}`)
    console.log(`   Target slug: ${fix.correct}`)

    const pages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: fix.search } },
      limit: 1
    })

    if (pages.docs.length > 0) {
      const page = pages.docs[0]

      await payload.update({
        collection: 'pages',
        id: page.id,
        data: {
          slug: fix.correct,
          slugLock: false  // Unlock so it doesn't auto-regenerate
        }
      })

      console.log(`   ✅ Fixed! New URL: http://localhost:3000/owners/${fix.correct.replace('owners-', '')}`)
    } else {
      console.log(`   ⚠️  Page not found with slug "${fix.search}"`)
    }
  }

  console.log('\n━'.repeat(80))
  console.log('\n💡 IMPORTANT:')
  console.log('   slugLock has been set to FALSE on these pages')
  console.log('   This means the slug will NOT auto-regenerate from the title')
  console.log('   You can edit other fields safely without breaking URLs')
  console.log('')
  console.log('   If you want to manually change a slug in the CMS:')
  console.log('   1. Click "Unlock" button next to the slug field')
  console.log('   2. Edit the slug')
  console.log('   3. Save')
  console.log('━'.repeat(80))

  process.exit(0)
}

fixAllBrokenSlugs()
