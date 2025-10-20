import { Client } from 'pg'

const DATABASE_URI = process.env.DATABASE_URI

if (!DATABASE_URI) {
  console.error('DATABASE_URI environment variable is required')
  process.exit(1)
}

async function checkData() {
  const client = new Client({ connectionString: DATABASE_URI })

  try {
    await client.connect()
    console.log('Connected to database\n')

    const tables = [
      { table: 'pages_hero_links', column: 'link_appearance' },
      { table: 'pages_blocks_cta_links', column: 'link_appearance' },
      { table: 'pages_blocks_content_columns', column: 'link_appearance' },
    ]

    for (const { table, column } of tables) {
      try {
        const result = await client.query(
          `SELECT DISTINCT ${column}, COUNT(*) as count FROM ${table} GROUP BY ${column}`
        )
        console.log(`${table}.${column}:`)
        result.rows.forEach(row => {
          console.log(`  - ${row[column]}: ${row.count} rows`)
        })
        console.log()
      } catch (error: any) {
        console.log(`  - ${table} doesn't exist\n`)
      }
    }
  } catch (error) {
    console.error('Failed to check data:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

checkData()
