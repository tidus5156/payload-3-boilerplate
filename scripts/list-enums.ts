import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URI,
});

console.log('📋 Listing all enums in database...\n');

try {
  await client.connect();

  // Get all enum types
  const result = await client.query(`
    SELECT t.typname as enum_name, e.enumlabel as value
    FROM pg_type t
    JOIN pg_enum e ON t.oid = e.enumtypid
    WHERE t.typname LIKE '%appearance%'
    ORDER BY t.typname, e.enumsortorder;
  `);

  if (result.rows.length === 0) {
    console.log('No appearance enums found.');
  } else {
    let currentEnum = '';
    for (const row of result.rows) {
      if (row.enum_name !== currentEnum) {
        if (currentEnum) console.log();
        currentEnum = row.enum_name;
        console.log(`${row.enum_name}:`);
      }
      console.log(`  - ${row.value}`);
    }
  }

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
} finally {
  await client.end();
  process.exit(0);
}
