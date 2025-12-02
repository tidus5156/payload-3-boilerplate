import { getPayload } from 'payload'
import config from '@payload-config'

const fixServicesColumnWidth = async () => {
  const payload = await getPayload({ config })

  console.log('🔄 Fixing Services page column widths...')

  try {
    // Find the services page
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'services',
        },
      },
    })

    if (pages.docs.length === 0) {
      console.log('❌ No page found with slug "services"')
      process.exit(1)
    }

    const page = pages.docs[0]
    console.log(`✓ Found page: ${page.title} (ID: ${page.id})`)

    // Update all content blocks to have size: 'full' on their columns
    const updatedLayout = page.layout?.map((block: any) => {
      if (block.blockType === 'content' && block.columns) {
        return {
          ...block,
          columns: block.columns.map((col: any) => ({
            ...col,
            size: 'full',
          })),
        }
      }
      return block
    })

    // Update the page
    const result = await payload.update({
      collection: 'pages',
      id: page.id,
      data: {
        layout: updatedLayout,
      },
    })

    console.log('\n✅ Services page updated successfully!')
    console.log(`   Layout blocks: ${result.layout?.length || 0}`)

    if (result.layout) {
      const contentBlocks = result.layout.filter((b: any) => b.blockType === 'content')
      console.log(`   Content blocks updated: ${contentBlocks.length}`)
    }
  } catch (error) {
    console.error('❌ Error updating Services page:', error)
    process.exit(1)
  }

  process.exit(0)
}

fixServicesColumnWidth()
