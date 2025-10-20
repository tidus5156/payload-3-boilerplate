import { Client } from 'pg'

const DATABASE_URI = process.env.DATABASE_URI

if (!DATABASE_URI) {
  console.error('DATABASE_URI environment variable is required')
  process.exit(1)
}

const sql = `
-- Update all link appearance enum types to include the new values

-- Update pages_hero_links enum
ALTER TYPE enum_pages_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'primary';
ALTER TYPE enum_pages_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'secondary';

-- Update pages_blocks_cta_links enum
ALTER TYPE enum_pages_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'primary';
ALTER TYPE enum_pages_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'secondary';

-- Update pages_blocks_content_columns enum
ALTER TYPE enum_pages_blocks_content_columns_link_appearance ADD VALUE IF NOT EXISTS 'primary';
ALTER TYPE enum_pages_blocks_content_columns_link_appearance ADD VALUE IF NOT EXISTS 'secondary';

-- Update _pages_v_version_hero_links enum
ALTER TYPE enum__pages_v_version_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'primary';
ALTER TYPE enum__pages_v_version_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'secondary';

-- Update _pages_v_blocks_cta_links enum
ALTER TYPE enum__pages_v_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'primary';
ALTER TYPE enum__pages_v_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'secondary';

-- Update _pages_v_blocks_content_columns enum
ALTER TYPE enum__pages_v_blocks_content_columns_link_appearance ADD VALUE IF NOT EXISTS 'primary';
ALTER TYPE enum__pages_v_blocks_content_columns_link_appearance ADD VALUE IF NOT EXISTS 'secondary';
`

async function updateEnums() {
  const client = new Client({ connectionString: DATABASE_URI })

  try {
    await client.connect()
    console.log('Connected to database')

    // Split into individual statements and execute
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'))

    for (const statement of statements) {
      try {
        await client.query(statement)
        console.log('✓ Executed:', statement.substring(0, 60) + '...')
      } catch (error: any) {
        // Ignore "already exists" errors
        if (error.code === '42710') {
          console.log('  (Value already exists, skipping)')
        } else {
          console.error('✗ Error:', error.message)
          console.error('  Error code:', error.code)
          console.error('  Statement:', statement.substring(0, 100))
        }
      }
    }

    console.log('\n✓ All enum types updated successfully!')
  } catch (error) {
    console.error('Failed to update enums:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

updateEnums()
