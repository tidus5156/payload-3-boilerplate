import { getPayload } from 'payload'
import config from '../src/payload.config'
import { sql } from 'drizzle-orm'

async function fixServicesIconEnum() {
  const payload = await getPayload({ config })

  try {
    console.log('🔧 Fixing services table icon column enum conversion...')
    console.log('')

    // Step 1: Create the enum type if it doesn't exist
    console.log('1️⃣ Creating enum type...')
    await payload.db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE enum_services_icon AS ENUM (
          'home',
          'users',
          'shield',
          'dollar',
          'calendar',
          'clipboard',
          'building',
          'megaphone',
          'wrench',
          'chart'
        );
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)
    console.log('   ✓ Enum type created/exists')

    // Step 2: Add temporary column with enum type
    console.log('2️⃣ Adding temporary column...')
    await payload.db.execute(sql`
      ALTER TABLE services
      ADD COLUMN IF NOT EXISTS icon_temp enum_services_icon;
    `)
    console.log('   ✓ Temporary column added')

    // Step 3: Copy data using CAST
    console.log('3️⃣ Copying data with type conversion...')
    await payload.db.execute(sql`
      UPDATE services
      SET icon_temp = icon::text::enum_services_icon
      WHERE icon IS NOT NULL;
    `)
    console.log('   ✓ Data copied')

    // Step 4: Drop old column
    console.log('4️⃣ Dropping old column...')
    await payload.db.execute(sql`
      ALTER TABLE services
      DROP COLUMN IF EXISTS icon;
    `)
    console.log('   ✓ Old column dropped')

    // Step 5: Rename temp column to original name
    console.log('5️⃣ Renaming temporary column...')
    await payload.db.execute(sql`
      ALTER TABLE services
      RENAME COLUMN icon_temp TO icon;
    `)
    console.log('   ✓ Column renamed')

    console.log('')
    console.log('✅ Services icon column successfully converted to enum!')
    console.log('   You can now restart the dev server.')

  } catch (error) {
    console.error('❌ Error fixing services icon enum:', error)
  } finally {
    process.exit(0)
  }
}

fixServicesIconEnum()
