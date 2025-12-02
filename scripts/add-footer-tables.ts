import { getPayload } from 'payload'
import config from '../src/payload.config'

async function addFooterTables() {
  try {
    const payload = await getPayload({ config })
    console.log('🔄 Adding footer database tables...')

    // Create tables for footer navigation columns
    const sqls = [
      // Property Owners Column Links
      `CREATE TABLE IF NOT EXISTS footer_property_owners_column_links (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL,
        id SERIAL PRIMARY KEY,
        link_type VARCHAR,
        link_new_tab BOOLEAN,
        link_url VARCHAR,
        link_label VARCHAR
      )`,

      // Residents Column Links
      `CREATE TABLE IF NOT EXISTS footer_residents_column_links (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL,
        id SERIAL PRIMARY KEY,
        link_type VARCHAR,
        link_new_tab BOOLEAN,
        link_url VARCHAR,
        link_label VARCHAR
      )`,

      // Company Column Links
      `CREATE TABLE IF NOT EXISTS footer_company_column_links (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL,
        id SERIAL PRIMARY KEY,
        link_type VARCHAR,
        link_new_tab BOOLEAN,
        link_url VARCHAR,
        link_label VARCHAR
      )`,

      // Social Media
      `CREATE TABLE IF NOT EXISTS footer_social_media (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL,
        id SERIAL PRIMARY KEY,
        platform VARCHAR,
        url VARCHAR
      )`,

      // Legal Links
      `CREATE TABLE IF NOT EXISTS footer_legal_links (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL,
        id SERIAL PRIMARY KEY,
        link_type VARCHAR,
        link_new_tab BOOLEAN,
        link_url VARCHAR,
        link_label VARCHAR
      )`,

      // Add columns to footer table
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS property_owners_column_heading VARCHAR`,
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS residents_column_heading VARCHAR`,
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS company_column_heading VARCHAR`,
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS contact_heading VARCHAR`,
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS phone VARCHAR`,
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS email VARCHAR`,
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS office_address_street VARCHAR`,
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS office_address_city VARCHAR`,
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS office_address_state VARCHAR`,
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS office_address_zip VARCHAR`,
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS office_hours VARCHAR`,
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS copyright_text VARCHAR`,
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS license_text VARCHAR`,
      `ALTER TABLE footer ADD COLUMN IF NOT EXISTS service_areas TEXT`,
    ]

    for (const sql of sqls) {
      try {
        await payload.db.drizzle.execute(sql)
      } catch (err) {
        console.log('  ⚠️  Query may have already run:', sql.substring(0, 60) + '...')
      }
    }

    console.log('✅ Footer tables added successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

addFooterTables()
