import { Client } from 'pg'

const DATABASE_URI = process.env.DATABASE_URI

if (!DATABASE_URI) {
  console.error('DATABASE_URI environment variable is required')
  process.exit(1)
}

async function verifyEnums() {
  const client = new Client({ connectionString: DATABASE_URI })

  try {
    await client.connect()
    console.log('Connected to database')

    const result = await client.query(`
      SELECT e.enumlabel
      FROM pg_enum e
      JOIN pg_type t ON e.enumtypid = t.oid
      WHERE t.typname = 'enum_pages_hero_links_link_appearance'
      ORDER BY e.enumsortorder
    `)

    console.log('Enum values for enum_pages_hero_links_link_appearance:')
    result.rows.forEach((row) => {
      console.log('  -', row.enumlabel)
    })
  } catch (error) {
    console.error('Failed to verify enums:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

verifyEnums()
