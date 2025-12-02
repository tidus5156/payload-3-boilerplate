import { getPayload } from 'payload'
import config from '../src/payload.config'

const auditLocalContent = async () => {
  const payload = await getPayload({ config })

  console.log('🔍 Auditing Local Database Content\n')
  console.log('=' .repeat(60))

  // Check Pages
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    select: {
      title: true,
      slug: true,
      createdAt: true,
    },
  })
  console.log(`\n📄 PAGES (${pages.totalDocs}):`)
  pages.docs.forEach((page: any) => {
    console.log(`   • ${page.slug} - "${page.title}"`)
  })

  // Check Posts
  const posts = await payload.find({
    collection: 'posts',
    limit: 100,
    select: {
      title: true,
      slug: true,
    },
  })
  console.log(`\n📝 POSTS (${posts.totalDocs}):`)
  posts.docs.forEach((post: any) => {
    console.log(`   • ${post.slug} - "${post.title}"`)
  })

  // Check Team Members
  const team = await payload.find({
    collection: 'team-members',
    limit: 100,
    select: {
      name: true,
    },
  })
  console.log(`\n👥 TEAM MEMBERS (${team.totalDocs}):`)
  team.docs.forEach((member: any) => {
    console.log(`   • ${member.name}`)
  })

  // Check Testimonials
  const testimonials = await payload.find({
    collection: 'testimonials',
    limit: 100,
    select: {
      clientName: true,
    },
  })
  console.log(`\n⭐ TESTIMONIALS (${testimonials.totalDocs}):`)
  testimonials.docs.forEach((t: any) => {
    console.log(`   • ${t.clientName}`)
  })

  // Check Neighborhoods
  const neighborhoods = await payload.find({
    collection: 'neighborhoods',
    limit: 100,
    select: {
      name: true,
    },
  })
  console.log(`\n🏘️  NEIGHBORHOODS (${neighborhoods.totalDocs}):`)
  neighborhoods.docs.forEach((n: any) => {
    console.log(`   • ${n.name}`)
  })

  // Check Categories
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
    select: {
      title: true,
    },
  })
  console.log(`\n📁 CATEGORIES (${categories.totalDocs}):`)
  categories.docs.forEach((cat: any) => {
    console.log(`   • ${cat.title}`)
  })

  // Check Media
  const media = await payload.find({
    collection: 'media',
    limit: 100,
    select: {
      filename: true,
    },
  })
  console.log(`\n🖼️  MEDIA FILES (${media.totalDocs}):`)
  media.docs.forEach((m: any) => {
    console.log(`   • ${m.filename}`)
  })

  // Check Users
  const users = await payload.find({
    collection: 'users',
    limit: 100,
    select: {
      email: true,
    },
  })
  console.log(`\n👤 USERS (${users.totalDocs}):`)
  users.docs.forEach((user: any) => {
    console.log(`   • ${user.email}`)
  })

  // Check Header
  const header = await payload.findGlobal({
    slug: 'header',
  })
  console.log(`\n🧭 HEADER NAVIGATION:`)
  console.log(`   ${header.navItems?.length || 0} menu items`)
  header.navItems?.forEach((item: any) => {
    console.log(`   • ${item.link?.label}`)
  })

  // Check Settings
  const settings = await payload.findGlobal({
    slug: 'settings',
  })
  console.log(`\n⚙️  SETTINGS:`)
  console.log(`   Site Name: ${settings.siteName || 'Not set'}`)
  console.log(`   Contact Email: ${settings.contactEmail || 'Not set'}`)

  console.log('\n' + '='.repeat(60))
  console.log('\n💡 WHAT\'S IN SEED FILES:')
  console.log('   • Settings (Allay contact info, branding)')
  console.log('   • Team Members (predefined team)')
  console.log('   • Testimonials (predefined testimonials)')
  console.log('   • Neighborhoods (Metro Atlanta areas)')
  console.log('   • Categories (blog categories)')
  console.log('   • Pages: Homepage only')
  console.log('   • Header: Navigation with "Rentals" menu item')

  console.log('\n⚠️  NOT IN SEED FILES:')
  console.log('   • Posts (any blog posts)')
  console.log('   • Media files')
  console.log('   • Users')
  console.log('   • Additional pages beyond homepage')

  process.exit(0)
}

auditLocalContent()
