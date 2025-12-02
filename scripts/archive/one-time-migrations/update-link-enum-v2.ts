import { Client } from 'pg'

const DATABASE_URI = process.env.DATABASE_URI

if (!DATABASE_URI) {
  console.error('DATABASE_URI environment variable is required')
  process.exit(1)
}

const enumTypes = [
  'enum_pages_hero_links_link_appearance',
  'enum_pages_blocks_cta_links_link_appearance',
  'enum_pages_blocks_content_columns_link_appearance',
  'enum__pages_v_version_hero_links_link_appearance',
  'enum__pages_v_blocks_cta_links_link_appearance',
  'enum__pages_v_blocks_content_columns_link_appearance',
]

async function updateEnums() {
  const client = new Client({ connectionString: DATABASE_URI })

  try {
    await client.connect()
    console.log('Connected to database\n')

    for (const enumType of enumTypes) {
      console.log(`Processing ${enumType}...`)

      // Get current enum values
      const result = await client.query(`
        SELECT e.enumlabel
        FROM pg_enum e
        JOIN pg_type t ON e.enumtypid = t.oid
        WHERE t.typname = $1
        ORDER BY e.enumsortorder
      `, [enumType])

      const currentValues = result.rows.map(r => r.enumlabel)
      console.log('  Current values:', currentValues.join(', '))

      // Add 'primary' if it doesn't exist
      if (!currentValues.includes('primary')) {
        try {
          await client.query(`ALTER TYPE ${enumType} ADD VALUE 'primary'`)
          console.log('  ✓ Added: primary')
        } catch (error: any) {
          console.error('  ✗ Error adding primary:', error.message)
        }
      } else {
        console.log('  - primary already exists')
      }

      // Add 'secondary' if it doesn't exist
      if (!currentValues.includes('secondary')) {
        try {
          await client.query(`ALTER TYPE ${enumType} ADD VALUE 'secondary'`)
          console.log('  ✓ Added: secondary')
        } catch (error: any) {
          console.error('  ✗ Error adding secondary:', error.message)
        }
      } else {
        console.log('  - secondary already exists')
      }

      console.log()
    }

    console.log('✓ All enum types updated successfully!')
  } catch (error) {
    console.error('Failed to update enums:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

updateEnums()
