import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function checkBrokenSlugs() {
  const payload = await getPayload({ config })

  console.log('\n🔍 CHECKING FOR BROKEN SLUGS')
  console.log('━'.repeat(80))

  // Check for pages with "testimonials" or "process" in title/slug
  const pages = await payload.find({
    collection: 'pages',
    limit: 100
  })

  const affectedPages = pages.docs.filter(p =>
    p.title?.toLowerCase().includes('testimonial') ||
    p.title?.toLowerCase().includes('process') ||
    p.slug?.includes('testimonial') ||
    p.slug?.includes('process')
  )

  console.log('\n📄 Pages with "testimonials" or "process":')
  affectedPages.forEach(p => {
    console.log('')
    console.log(`   Title: ${p.title}`)
    console.log(`   Current slug: ${p.slug}`)
    console.log(`   Hero type: ${p.hero?.type || 'none'}`)
    console.log(`   slugLock: ${p.slugLock}`)

    // Determine what the URL should be
    if (p.slug?.startsWith('owners-')) {
      const page = p.slug.replace('owners-', '')
      console.log(`   ✅ Correct URL: http://localhost:3000/owners/${page}`)
    } else {
      console.log(`   ⚠️  URL: http://localhost:3000/${p.slug}`)
      console.log(`   💡 Should probably be: owners-testimonials or owners-process`)
    }
  })

  console.log('\n━'.repeat(80))
  console.log('\n💡 DIAGNOSIS:')
  console.log('   The issue is that the client-side SlugComponent auto-updates')
  console.log('   the slug whenever slugLock=true, BEFORE the form is submitted.')
  console.log('')
  console.log('   When you change hero type and save:')
  console.log('   1. Client regenerates slug from title')
  console.log('   2. Form submits with the regenerated slug')
  console.log('   3. Backend receives it as a string value and just accepts it')
  console.log('')
  console.log('   Solution: Need to prevent client-side regeneration on existing pages')
  console.log('━'.repeat(80))

  process.exit(0)
}

checkBrokenSlugs()
