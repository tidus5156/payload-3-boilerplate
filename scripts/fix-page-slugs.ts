import { getPayload } from 'payload'
import config from '../src/payload.config'

const fixSlugs = async () => {
  const payload = await getPayload({ config })

  console.log('🔄 Fixing page slugs...\n')

  const fixes = [
    {
      oldSlug: 'ownersprocess',
      newSlug: 'owners-process',
      name: 'Our Process',
    },
    {
      oldSlug: 'ownerstestimonials',
      newSlug: 'owners-testimonials',
      name: 'Testimonials',
    },
  ]

  for (const fix of fixes) {
    try {
      const { docs } = await payload.find({
        collection: 'pages',
        where: {
          slug: {
            equals: fix.oldSlug,
          },
        },
        limit: 1,
      })

      if (docs.length === 0) {
        console.log(`⚠️  Page not found with slug: ${fix.oldSlug}`)
        continue
      }

      const page = docs[0]

      await payload.update({
        collection: 'pages',
        id: page.id,
        data: {
          slug: fix.newSlug,
        },
      })

      console.log(`✅ Fixed: ${fix.oldSlug} → ${fix.newSlug}`)
    } catch (error) {
      console.error(`❌ Error fixing ${fix.name}:`, error)
    }
  }

  console.log('\n✨ Slug fixes complete!')
  process.exit(0)
}

fixSlugs()
