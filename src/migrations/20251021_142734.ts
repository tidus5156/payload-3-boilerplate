import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   -- ===================================
   -- CREATE SERVICES TABLES
   -- ===================================

   CREATE TABLE IF NOT EXISTS "services" (
     "id" SERIAL PRIMARY KEY,
     "name" VARCHAR NOT NULL,
     "order" NUMERIC NOT NULL DEFAULT 0,
     "slug" VARCHAR,
     "slug_lock" BOOLEAN DEFAULT true,
     "icon" enum_services_icon NOT NULL,
     "short_description" VARCHAR NOT NULL,
     "full_description" JSONB NOT NULL,
     "pricing_note" VARCHAR,
     "hero_image_id" INTEGER,
     "featured" BOOLEAN DEFAULT false,
     "published" BOOLEAN DEFAULT true,
     "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
     "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now()
   );

   CREATE TABLE IF NOT EXISTS "services_features" (
     "id" VARCHAR PRIMARY KEY,
     "feature" VARCHAR NOT NULL,
     "_order" INTEGER NOT NULL,
     "_parent_id" INTEGER NOT NULL,
     CONSTRAINT "services_features_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "services"("id") ON DELETE CASCADE
   );

   CREATE TABLE IF NOT EXISTS "services_benefits" (
     "id" VARCHAR PRIMARY KEY,
     "title" VARCHAR NOT NULL,
     "description" VARCHAR NOT NULL,
     "_order" INTEGER NOT NULL,
     "_parent_id" INTEGER NOT NULL,
     CONSTRAINT "services_benefits_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "services"("id") ON DELETE CASCADE
   );

   -- ===================================
   -- CREATE NEW ENUMS
   -- ===================================

   DO $$ BEGIN
     CREATE TYPE enum__pages_v_blocks_html_embed_container_max_width AS ENUM ('full', 'container', 'narrow');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum__pages_v_blocks_icon_grid_items_icon_color AS ENUM ('skyBlue', 'sageGreen', 'warmGold');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum__pages_v_blocks_team_grid_background_color AS ENUM ('transparent', 'lightGray', 'white');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum__pages_v_blocks_team_grid_columns AS ENUM ('two', 'three', 'four');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum__pages_v_blocks_team_grid_spacing AS ENUM ('compact', 'normal', 'spacious');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum__pages_v_blocks_trust_badges_background_color AS ENUM ('transparent', 'lightGray', 'white', 'deepNavy');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum__pages_v_blocks_trust_badges_badges_icon AS ENUM ('shield', 'award', 'check', 'star', 'building', 'certificate', 'users', 'lock');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum__pages_v_blocks_trust_badges_columns AS ENUM ('two', 'three', 'four', 'six');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum__pages_v_blocks_trust_badges_layout AS ENUM ('grid', 'row', 'compact');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum__pages_v_blocks_trust_badges_spacing AS ENUM ('compact', 'normal', 'spacious');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum_pages_blocks_html_embed_container_max_width AS ENUM ('full', 'container', 'narrow');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum_pages_blocks_icon_grid_items_icon_color AS ENUM ('skyBlue', 'sageGreen', 'warmGold');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum_pages_blocks_team_grid_background_color AS ENUM ('transparent', 'lightGray', 'white');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum_pages_blocks_team_grid_columns AS ENUM ('two', 'three', 'four');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum_pages_blocks_team_grid_spacing AS ENUM ('compact', 'normal', 'spacious');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum_pages_blocks_trust_badges_background_color AS ENUM ('transparent', 'lightGray', 'white', 'deepNavy');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum_pages_blocks_trust_badges_badges_icon AS ENUM ('shield', 'award', 'check', 'star', 'building', 'certificate', 'users', 'lock');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum_pages_blocks_trust_badges_columns AS ENUM ('two', 'three', 'four', 'six');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum_pages_blocks_trust_badges_layout AS ENUM ('grid', 'row', 'compact');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE enum_pages_blocks_trust_badges_spacing AS ENUM ('compact', 'normal', 'spacious');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   -- ===================================
   -- CREATE NEW BLOCK TABLES
   -- ===================================

   CREATE TABLE IF NOT EXISTS "pages_blocks_html_embed" (
     "id" VARCHAR PRIMARY KEY,
     "_order" INTEGER NOT NULL,
     "_parent_id" INTEGER NOT NULL,
     "_path" TEXT NOT NULL,
     "embed_label" VARCHAR,
     "embed_code" VARCHAR,
     "container_max_width" enum_pages_blocks_html_embed_container_max_width DEFAULT 'full',
     "block_name" VARCHAR
   );

   CREATE TABLE IF NOT EXISTS "pages_blocks_team_grid" (
     "id" VARCHAR PRIMARY KEY,
     "_order" INTEGER NOT NULL,
     "_parent_id" INTEGER NOT NULL,
     "_path" TEXT NOT NULL,
     "heading" VARCHAR,
     "subheading" VARCHAR,
     "show_all_active" BOOLEAN DEFAULT true,
     "limit" NUMERIC DEFAULT 6,
     "columns" enum_pages_blocks_team_grid_columns DEFAULT 'three',
     "show_bio" BOOLEAN DEFAULT false,
     "show_contact" BOOLEAN DEFAULT false,
     "show_linked_in" BOOLEAN DEFAULT true,
     "background_color" enum_pages_blocks_team_grid_background_color DEFAULT 'transparent',
     "spacing" enum_pages_blocks_team_grid_spacing DEFAULT 'normal',
     "block_name" VARCHAR
   );

   CREATE TABLE IF NOT EXISTS "pages_blocks_trust_badges" (
     "id" VARCHAR PRIMARY KEY,
     "_order" INTEGER NOT NULL,
     "_parent_id" INTEGER NOT NULL,
     "_path" TEXT NOT NULL,
     "heading" VARCHAR,
     "subheading" VARCHAR,
     "layout" enum_pages_blocks_trust_badges_layout DEFAULT 'grid',
     "columns" enum_pages_blocks_trust_badges_columns DEFAULT 'four',
     "background_color" enum_pages_blocks_trust_badges_background_color DEFAULT 'lightGray',
     "spacing" enum_pages_blocks_trust_badges_spacing DEFAULT 'normal',
     "block_name" VARCHAR
   );

   CREATE TABLE IF NOT EXISTS "pages_blocks_trust_badges_badges" (
     "id" VARCHAR PRIMARY KEY,
     "_order" INTEGER NOT NULL,
     "_parent_id" VARCHAR NOT NULL,
     "title" VARCHAR,
     "icon" enum_pages_blocks_trust_badges_badges_icon,
     "description" VARCHAR,
     "logo_id" INTEGER
   );

   CREATE TABLE IF NOT EXISTS "_pages_v_blocks_html_embed" (
     "id" SERIAL PRIMARY KEY,
     "_order" INTEGER NOT NULL,
     "_parent_id" INTEGER NOT NULL,
     "_path" TEXT NOT NULL,
     "embed_label" VARCHAR,
     "embed_code" VARCHAR,
     "container_max_width" enum__pages_v_blocks_html_embed_container_max_width DEFAULT 'full',
     "_uuid" VARCHAR,
     "block_name" VARCHAR
   );

   CREATE TABLE IF NOT EXISTS "_pages_v_blocks_team_grid" (
     "id" SERIAL PRIMARY KEY,
     "_order" INTEGER NOT NULL,
     "_parent_id" INTEGER NOT NULL,
     "_path" TEXT NOT NULL,
     "heading" VARCHAR,
     "subheading" VARCHAR,
     "show_all_active" BOOLEAN DEFAULT true,
     "limit" NUMERIC DEFAULT 6,
     "columns" enum__pages_v_blocks_team_grid_columns DEFAULT 'three',
     "show_bio" BOOLEAN DEFAULT false,
     "show_contact" BOOLEAN DEFAULT false,
     "show_linked_in" BOOLEAN DEFAULT true,
     "background_color" enum__pages_v_blocks_team_grid_background_color DEFAULT 'transparent',
     "spacing" enum__pages_v_blocks_team_grid_spacing DEFAULT 'normal',
     "_uuid" VARCHAR,
     "block_name" VARCHAR
   );

   CREATE TABLE IF NOT EXISTS "_pages_v_blocks_trust_badges" (
     "id" SERIAL PRIMARY KEY,
     "_order" INTEGER NOT NULL,
     "_parent_id" INTEGER NOT NULL,
     "_path" TEXT NOT NULL,
     "heading" VARCHAR,
     "subheading" VARCHAR,
     "layout" enum__pages_v_blocks_trust_badges_layout DEFAULT 'grid',
     "columns" enum__pages_v_blocks_trust_badges_columns DEFAULT 'four',
     "background_color" enum__pages_v_blocks_trust_badges_background_color DEFAULT 'lightGray',
     "spacing" enum__pages_v_blocks_trust_badges_spacing DEFAULT 'normal',
     "_uuid" VARCHAR,
     "block_name" VARCHAR
   );

   CREATE TABLE IF NOT EXISTS "_pages_v_blocks_trust_badges_badges" (
     "id" SERIAL PRIMARY KEY,
     "_order" INTEGER NOT NULL,
     "_parent_id" INTEGER NOT NULL,
     "title" VARCHAR,
     "icon" enum__pages_v_blocks_trust_badges_badges_icon,
     "description" VARCHAR,
     "logo_id" INTEGER,
     "_uuid" VARCHAR
   );

   -- ===================================
   -- ADD NEW COLUMNS TO EXISTING TABLES
   -- ===================================

   DO $$ BEGIN
     ALTER TABLE "pages_blocks_icon_grid_items" ADD COLUMN "icon_color" enum_pages_blocks_icon_grid_items_icon_color DEFAULT 'skyBlue';
   EXCEPTION
     WHEN duplicate_column THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "pages_rels" ADD COLUMN "team_members_id" INTEGER;
   EXCEPTION
     WHEN duplicate_column THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "_pages_v_blocks_icon_grid_items" ADD COLUMN "icon_color" enum__pages_v_blocks_icon_grid_items_icon_color DEFAULT 'skyBlue';
   EXCEPTION
     WHEN duplicate_column THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "_pages_v_rels" ADD COLUMN "team_members_id" INTEGER;
   EXCEPTION
     WHEN duplicate_column THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" INTEGER;
   EXCEPTION
     WHEN duplicate_column THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "settings" ADD COLUMN "logo_id" INTEGER;
   EXCEPTION
     WHEN duplicate_column THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "settings" ADD COLUMN "owner_portal_url" VARCHAR;
   EXCEPTION
     WHEN duplicate_column THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "settings" ADD COLUMN "resident_portal_url" VARCHAR;
   EXCEPTION
     WHEN duplicate_column THEN null;
   END $$;

   -- ===================================
   -- UPDATE LINK APPEARANCE DEFAULTS
   -- ===================================

   ALTER TABLE "pages_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
   ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
   ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
   ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
   ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
   ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default';`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'primary';
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_appearance" SET DEFAULT 'primary';
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'primary';
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'primary';
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_appearance" SET DEFAULT 'primary';
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'primary';`)
}
