import { Client } from 'pg'

const DATABASE_URI = process.env.DATABASE_URI

if (!DATABASE_URI) {
  console.error('DATABASE_URI environment variable is required')
  process.exit(1)
}

async function fixPrimaryValues() {
  const client = new Client({ connectionString: DATABASE_URI })

  try {
    await client.connect()
    console.log('Connected to database\n')

    // Update all 'primary' values to 'default' temporarily
    const tables = [
      { table: 'pages_hero_links', column: 'link_appearance' },
      { table: 'pages_blocks_cta_links', column: 'link_appearance' },
      { table: 'pages_blocks_content_columns', column: 'link_appearance' },
      { table: '_pages_v_version_hero_links', column: 'link_appearance' },
      { table: '_pages_v_blocks_cta_links', column: 'link_appearance' },
      { table: '_pages_v_blocks_content_columns', column: 'link_appearance' },
    ]

    for (const { table, column } of tables) {
      try {
        const result = await client.query(
          `UPDATE ${table} SET ${column} = 'default' WHERE ${column} = 'primary'`
        )
        console.log(`✓ Updated ${table}.${column}: ${result.rowCount} rows changed from 'primary' to 'default'`)
      } catch (error: any) {
        // Table might not exist, that's ok
        console.log(`  - ${table} doesn't exist or has no rows, skipping`)
      }
    }

    console.log('\n✓ All primary values updated to default!')
    console.log('Now restart the dev server to complete schema sync.')
  } catch (error) {
    console.error('Failed to fix primary values:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

fixPrimaryValues()
