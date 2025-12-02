import { Client } from 'pg'

const DATABASE_URI = process.env.DATABASE_URI

if (!DATABASE_URI) {
  console.error('DATABASE_URI environment variable is required')
  process.exit(1)
}

async function checkAllEnums() {
  const client = new Client({ connectionString: DATABASE_URI })

  try {
    await client.connect()

    const result = await client.query(`
      SELECT t.typname, e.enumlabel
      FROM pg_enum e
      JOIN pg_type t ON e.enumtypid = t.oid
      WHERE t.typname LIKE '%_link_appearance'
      ORDER BY t.typname, e.enumsortorder
    `)

    console.log('All link appearance enums:\n')
    let currentType = ''
    for (const row of result.rows) {
      if (row.typname !== currentType) {
        console.log(`${row.typname}:`)
        currentType = row.typname
      }
      console.log(`  - ${row.enumlabel}`)
    }
  } catch (error) {
    console.error('Failed to check enums:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

checkAllEnums()
