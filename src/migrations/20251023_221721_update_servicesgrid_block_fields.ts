import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_services_grid_services_features" CASCADE;
  DROP TABLE "pages_blocks_services_grid_services" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid_services_features" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid_services" CASCADE;
  ALTER TABLE "pages_blocks_services_grid" ADD COLUMN "limit" numeric DEFAULT 6;
  ALTER TABLE "pages_blocks_services_grid" ADD COLUMN "featured_only" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_services_grid" ADD COLUMN "cta_text" varchar DEFAULT 'Learn More';
  ALTER TABLE "_pages_v_blocks_services_grid" ADD COLUMN "limit" numeric DEFAULT 6;
  ALTER TABLE "_pages_v_blocks_services_grid" ADD COLUMN "featured_only" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_services_grid" ADD COLUMN "cta_text" varchar DEFAULT 'Learn More';
  DROP TYPE "public"."enum_pages_blocks_services_grid_services_icon";
  DROP TYPE "public"."enum__pages_v_blocks_services_grid_services_icon";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_services_grid_services_icon" AS ENUM('home', 'key', 'tool', 'dollar', 'users', 'file');
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_services_icon" AS ENUM('home', 'key', 'tool', 'dollar', 'users', 'file');
  CREATE TABLE IF NOT EXISTS "pages_blocks_services_grid_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_services_grid_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_pages_blocks_services_grid_services_icon" DEFAULT 'home',
  	"cta_text" varchar,
  	"cta_url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_grid_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_grid_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__pages_v_blocks_services_grid_services_icon" DEFAULT 'home',
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_services_grid_services_features" ADD CONSTRAINT "pages_blocks_services_grid_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_grid_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_services_grid_services" ADD CONSTRAINT "pages_blocks_services_grid_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_services_grid_services_features" ADD CONSTRAINT "_pages_v_blocks_services_grid_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_grid_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_services_grid_services" ADD CONSTRAINT "_pages_v_blocks_services_grid_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_grid_services_features_order_idx" ON "pages_blocks_services_grid_services_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_grid_services_features_parent_id_idx" ON "pages_blocks_services_grid_services_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_grid_services_order_idx" ON "pages_blocks_services_grid_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_grid_services_parent_id_idx" ON "pages_blocks_services_grid_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_grid_services_features_order_idx" ON "_pages_v_blocks_services_grid_services_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_grid_services_features_parent_id_idx" ON "_pages_v_blocks_services_grid_services_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_grid_services_order_idx" ON "_pages_v_blocks_services_grid_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_grid_services_parent_id_idx" ON "_pages_v_blocks_services_grid_services" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_services_grid" DROP COLUMN IF EXISTS "limit";
  ALTER TABLE "pages_blocks_services_grid" DROP COLUMN IF EXISTS "featured_only";
  ALTER TABLE "pages_blocks_services_grid" DROP COLUMN IF EXISTS "cta_text";
  ALTER TABLE "_pages_v_blocks_services_grid" DROP COLUMN IF EXISTS "limit";
  ALTER TABLE "_pages_v_blocks_services_grid" DROP COLUMN IF EXISTS "featured_only";
  ALTER TABLE "_pages_v_blocks_services_grid" DROP COLUMN IF EXISTS "cta_text";`)
}
