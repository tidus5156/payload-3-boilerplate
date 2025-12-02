import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URI,
});

console.log('🔧 Fixing appearance enum in database...\n');

try {
  await client.connect();

  // The enums that need 'primary' and 'secondary' added
  const enums = [
    'enum_pages_hero_links_link_appearance',
    'enum_pages_blocks_content_columns_link_appearance',
    'enum_pages_blocks_cta_links_link_appearance',
    'enum__pages_v_version_hero_links_link_appearance',
    'enum__pages_v_blocks_content_columns_link_appearance',
    'enum__pages_v_blocks_cta_links_link_appearance',
  ];

  for (const enumName of enums) {
    console.log(`Checking ${enumName}...`);

    // Check if the enum exists and what values it has
    const result = await client.query(`
      SELECT e.enumlabel as value
      FROM pg_type t
      JOIN pg_enum e ON t.oid = e.enumtypid
      WHERE t.typname = $1
      ORDER BY e.enumsortorder;
    `, [enumName]);

    const currentValues = result.rows.map(r => r.value);
    console.log(`  Current values: ${currentValues.join(', ')}`);

    // Add 'primary' if it's not there
    if (!currentValues.includes('primary')) {
      console.log(`  Adding 'primary' to ${enumName}...`);
      await client.query(`
        ALTER TYPE ${enumName} ADD VALUE IF NOT EXISTS 'primary';
      `);
      console.log(`  ✅ Added 'primary'`);
    } else {
      console.log(`  ✅ 'primary' already exists`);
    }

    // Add 'secondary' if it's not there
    if (!currentValues.includes('secondary')) {
      console.log(`  Adding 'secondary' to ${enumName}...`);
      await client.query(`
        ALTER TYPE ${enumName} ADD VALUE IF NOT EXISTS 'secondary';
      `);
      console.log(`  ✅ Added 'secondary'`);
    } else {
      console.log(`  ✅ 'secondary' already exists`);
    }

    console.log();
  }

  console.log('✅ All appearance enums updated!');
  console.log('\nYou can now use "primary" and "secondary" appearance options in the CMS.');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
} finally {
  await client.end();
  process.exit(0);
}
