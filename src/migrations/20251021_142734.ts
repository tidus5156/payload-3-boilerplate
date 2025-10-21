import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   -- Create services table
   CREATE TABLE IF NOT EXISTS "services" (
     "id" SERIAL PRIMARY KEY,
     "name" VARCHAR(255) NOT NULL,
     "slug" VARCHAR(255) NOT NULL UNIQUE,
     "short_description" TEXT,
     "full_description" JSONB,
     "pricing_note" TEXT,
     "icon" VARCHAR(100),
     "display_order" INTEGER,
     "is_featured" BOOLEAN DEFAULT false,
     "hero_image_id" INTEGER,
     "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Create services_features relationship table
   CREATE TABLE IF NOT EXISTS "services_features" (
     "id" SERIAL PRIMARY KEY,
     "feature" TEXT NOT NULL,
     "_order" INTEGER NOT NULL,
     "_parent_id" INTEGER NOT NULL,
     CONSTRAINT "services_features_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "services"("id") ON DELETE CASCADE
   );

   -- Create services_benefits relationship table
   CREATE TABLE IF NOT EXISTS "services_benefits" (
     "id" SERIAL PRIMARY KEY,
     "title" VARCHAR(255) NOT NULL,
     "description" TEXT,
     "_order" INTEGER NOT NULL,
     "_parent_id" INTEGER NOT NULL,
     CONSTRAINT "services_benefits_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "services"("id") ON DELETE CASCADE
   );

   -- Update link appearance defaults
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
