import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_archive_relation_to" ADD VALUE 'properties';
  ALTER TYPE "public"."enum__pages_v_blocks_archive_relation_to" ADD VALUE 'properties';
  ALTER TABLE "pages_rels" ADD COLUMN "properties_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "properties_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_properties_fk" FOREIGN KEY ("properties_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_properties_fk" FOREIGN KEY ("properties_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "pages_rels_properties_id_idx" ON "pages_rels" USING btree ("properties_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_properties_id_idx" ON "_pages_v_rels" USING btree ("properties_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_properties_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_properties_fk";
  
  DROP INDEX IF EXISTS "pages_rels_properties_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_properties_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "properties_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "properties_id";
  ALTER TABLE "public"."pages_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'outline');
  ALTER TABLE "public"."pages_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_hero_links_link_appearance" USING "link_appearance"::"public"."enum_pages_hero_links_link_appearance";
  ALTER TABLE "public"."pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('primary', 'secondary', 'outline');
  ALTER TABLE "public"."pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum_pages_blocks_content_columns_link_appearance";
  ALTER TABLE "public"."pages_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  ALTER TABLE "public"."pages_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum_pages_blocks_archive_relation_to" USING "relation_to"::"public"."enum_pages_blocks_archive_relation_to";
  ALTER TABLE "public"."_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('primary', 'secondary', 'outline');
  ALTER TABLE "public"."_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_version_hero_links_link_appearance" USING "link_appearance"::"public"."enum__pages_v_version_hero_links_link_appearance";
  ALTER TABLE "public"."_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('primary', 'secondary', 'outline');
  ALTER TABLE "public"."_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum__pages_v_blocks_content_columns_link_appearance";
  ALTER TABLE "public"."_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  ALTER TABLE "public"."_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum__pages_v_blocks_archive_relation_to" USING "relation_to"::"public"."enum__pages_v_blocks_archive_relation_to";`)
}
