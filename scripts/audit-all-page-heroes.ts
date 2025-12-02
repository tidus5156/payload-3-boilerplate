import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function auditAllPageHeroes() {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    sort: 'slug'
  })

  console.log(`\n📊 Found ${pages.totalDocs} pages total\n`)
  console.log('━'.repeat(80))

  const heroStats = {
    highImpact: { total: 0, withMedia: 0, pages: [] as any[] },
    mediumImpact: { total: 0, withMedia: 0, pages: [] as any[] },
    lowImpact: { total: 0, withMedia: 0, pages: [] as any[] },
    noHero: { total: 0, pages: [] as any[] }
  }

  pages.docs.forEach(page => {
    const heroType = page.hero?.type
    const hasMedia = !!page.hero?.media
    const pageInfo = {
      title: page.title,
      slug: page.slug,
      url: `http://localhost:3000/${page.slug === 'home' ? '' : page.slug}`,
      hasMedia
    }

    if (!heroType) {
      heroStats.noHero.total++
      heroStats.noHero.pages.push(pageInfo)
    } else if (heroType === 'highImpact') {
      heroStats.highImpact.total++
      if (hasMedia) heroStats.highImpact.withMedia++
      heroStats.highImpact.pages.push(pageInfo)
    } else if (heroType === 'mediumImpact') {
      heroStats.mediumImpact.total++
      if (hasMedia) heroStats.mediumImpact.withMedia++
      heroStats.mediumImpact.pages.push(pageInfo)
    } else if (heroType === 'lowImpact') {
      heroStats.lowImpact.total++
      if (hasMedia) heroStats.lowImpact.withMedia++
      heroStats.lowImpact.pages.push(pageInfo)
    }
  })

  console.log('\n🎯 HIGH IMPACT HERO')
  console.log(`   ${heroStats.highImpact.total} total pages`)
  console.log(`   ✨ All should have NEW immersive treatment (full viewport, transparent header)`)
  if (heroStats.highImpact.pages.length > 0) {
    heroStats.highImpact.pages.forEach(p => {
      console.log(`   📄 ${p.title}`)
      console.log(`      🔗 ${p.url}`)
      console.log(`      🖼️  Media: ${p.hasMedia ? 'YES' : 'NO'}`)
    })
  }

  console.log('\n━'.repeat(80))

  console.log('\n🎨 MEDIUM IMPACT HERO')
  console.log(`   ${heroStats.mediumImpact.total} total pages`)
  console.log(`   ${heroStats.mediumImpact.withMedia} with background media → ✨ NEW immersive treatment`)
  console.log(`   ${heroStats.mediumImpact.total - heroStats.mediumImpact.withMedia} without media → gradient background (original)`)
  if (heroStats.mediumImpact.pages.length > 0) {
    heroStats.mediumImpact.pages.forEach(p => {
      const treatment = p.hasMedia ? '✨ NEW IMMERSIVE' : '📐 GRADIENT (original)'
      console.log(`   📄 ${p.title}`)
      console.log(`      🔗 ${p.url}`)
      console.log(`      ${treatment}`)
    })
  }

  console.log('\n━'.repeat(80))

  console.log('\n📝 LOW IMPACT HERO')
  console.log(`   ${heroStats.lowImpact.total} total pages`)
  console.log(`   ℹ️  Unchanged (designed for blog posts and text-heavy content)`)
  if (heroStats.lowImpact.pages.length > 0) {
    heroStats.lowImpact.pages.forEach(p => {
      console.log(`   📄 ${p.title} → ${p.url}`)
    })
  }

  if (heroStats.noHero.total > 0) {
    console.log('\n━'.repeat(80))
    console.log('\n⚠️  NO HERO')
    console.log(`   ${heroStats.noHero.total} total pages`)
    heroStats.noHero.pages.forEach(p => {
      console.log(`   📄 ${p.title} → ${p.url}`)
    })
  }

  console.log('\n━'.repeat(80))
  console.log('\n💡 SUMMARY:')
  console.log(`   Pages with NEW immersive hero treatment: ${heroStats.highImpact.total + heroStats.mediumImpact.withMedia}`)
  console.log(`   - ${heroStats.highImpact.total} HighImpact heroes`)
  console.log(`   - ${heroStats.mediumImpact.withMedia} MediumImpact heroes with background media`)
  console.log('\n   To enable immersive treatment on more pages:')
  console.log('   1. Add background image to MediumImpact heroes in CMS')
  console.log('   2. Or change hero type to HighImpact')
  console.log('━'.repeat(80))

  process.exit(0)
}

auditAllPageHeroes()
