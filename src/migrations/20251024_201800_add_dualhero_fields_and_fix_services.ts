import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Step 1: Fix services icon enum conversion
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

    -- Convert icon column to enum (if not already converted)
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'services'
        AND column_name = 'icon'
        AND data_type != 'USER-DEFINED'
      ) THEN
        ALTER TABLE services ADD COLUMN icon_temp enum_services_icon;
        UPDATE services SET icon_temp = icon::text::enum_services_icon WHERE icon IS NOT NULL;
        ALTER TABLE services DROP COLUMN icon;
        ALTER TABLE services RENAME COLUMN icon_temp TO icon;
      END IF;
    END $$;

    -- Remove old services columns
    ALTER TABLE services DROP COLUMN IF EXISTS display_order;
    ALTER TABLE services DROP COLUMN IF EXISTS is_featured;

    -- Step 2: Add DualHero fields to pages_blocks_dual_hero
    ALTER TABLE pages_blocks_dual_hero
      ADD COLUMN IF NOT EXISTS left_panel_subheadline text,
      ADD COLUMN IF NOT EXISTS left_panel_secondary_c_t_a_text varchar,
      ADD COLUMN IF NOT EXISTS left_panel_secondary_c_t_a_url varchar,
      ADD COLUMN IF NOT EXISTS left_panel_secondary_c_t_a_open_in_new_tab boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS right_panel_subheadline text,
      ADD COLUMN IF NOT EXISTS right_panel_subtext text,
      ADD COLUMN IF NOT EXISTS mobile_labels_owner_label varchar,
      ADD COLUMN IF NOT EXISTS mobile_labels_resident_label varchar,
      ADD COLUMN IF NOT EXISTS desktop_split varchar DEFAULT '60-40';

    -- Step 3: Add DualHero fields to _pages_v_blocks_dual_hero (versioned table)
    ALTER TABLE _pages_v_blocks_dual_hero
      ADD COLUMN IF NOT EXISTS left_panel_subheadline text,
      ADD COLUMN IF NOT EXISTS left_panel_secondary_c_t_a_text varchar,
      ADD COLUMN IF NOT EXISTS left_panel_secondary_c_t_a_url varchar,
      ADD COLUMN IF NOT EXISTS left_panel_secondary_c_t_a_open_in_new_tab boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS right_panel_subheadline text,
      ADD COLUMN IF NOT EXISTS right_panel_subtext text,
      ADD COLUMN IF NOT EXISTS mobile_labels_owner_label varchar,
      ADD COLUMN IF NOT EXISTS mobile_labels_resident_label varchar,
      ADD COLUMN IF NOT EXISTS desktop_split varchar DEFAULT '60-40';

    -- Step 4: Remove old secondary link fields
    ALTER TABLE pages_blocks_dual_hero
      DROP COLUMN IF EXISTS left_panel_secondary_link_text,
      DROP COLUMN IF EXISTS left_panel_secondary_link_url,
      DROP COLUMN IF EXISTS right_panel_secondary_link_text,
      DROP COLUMN IF EXISTS right_panel_secondary_link_url;

    ALTER TABLE _pages_v_blocks_dual_hero
      DROP COLUMN IF EXISTS left_panel_secondary_link_text,
      DROP COLUMN IF EXISTS left_panel_secondary_link_url,
      DROP COLUMN IF EXISTS right_panel_secondary_link_text,
      DROP COLUMN IF EXISTS right_panel_secondary_link_url;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Reverse DualHero changes
    ALTER TABLE pages_blocks_dual_hero
      DROP COLUMN IF EXISTS left_panel_subheadline,
      DROP COLUMN IF EXISTS left_panel_secondary_c_t_a_text,
      DROP COLUMN IF EXISTS left_panel_secondary_c_t_a_url,
      DROP COLUMN IF EXISTS left_panel_secondary_c_t_a_open_in_new_tab,
      DROP COLUMN IF EXISTS right_panel_subheadline,
      DROP COLUMN IF EXISTS right_panel_subtext,
      DROP COLUMN IF EXISTS mobile_labels_owner_label,
      DROP COLUMN IF EXISTS mobile_labels_resident_label,
      DROP COLUMN IF EXISTS desktop_split;

    ALTER TABLE _pages_v_blocks_dual_hero
      DROP COLUMN IF EXISTS left_panel_subheadline,
      DROP COLUMN IF EXISTS left_panel_secondary_c_t_a_text,
      DROP COLUMN IF EXISTS left_panel_secondary_c_t_a_url,
      DROP COLUMN IF EXISTS left_panel_secondary_c_t_a_open_in_new_tab,
      DROP COLUMN IF EXISTS right_panel_subheadline,
      DROP COLUMN IF EXISTS right_panel_subtext,
      DROP COLUMN IF EXISTS mobile_labels_owner_label,
      DROP COLUMN IF EXISTS mobile_labels_resident_label,
      DROP COLUMN IF EXISTS desktop_split;

    -- Note: Cannot easily reverse enum conversion or restore old columns
  `)
}
