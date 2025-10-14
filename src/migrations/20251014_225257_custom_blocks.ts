import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_icon_grid_items_icon" AS ENUM('shield', 'dollar', 'clock', 'users', 'home', 'phone', 'check', 'star', 'tool', 'file', 'lock', 'map');
  CREATE TYPE "public"."enum_pages_blocks_icon_grid_columns" AS ENUM('two', 'three', 'four');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_services_icon" AS ENUM('home', 'key', 'tool', 'dollar', 'users', 'file');
  CREATE TYPE "public"."enum_pages_blocks_hero_c_t_a_background_color" AS ENUM('deepNavy', 'skyBlue', 'warmGold', 'lightGray');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_grid_items_icon" AS ENUM('shield', 'dollar', 'clock', 'users', 'home', 'phone', 'check', 'star', 'tool', 'file', 'lock', 'map');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_grid_columns" AS ENUM('two', 'three', 'four');
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_services_icon" AS ENUM('home', 'key', 'tool', 'dollar', 'users', 'file');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_c_t_a_background_color" AS ENUM('deepNavy', 'skyBlue', 'warmGold', 'lightGray');
  CREATE TABLE IF NOT EXISTS "pages_blocks_icon_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_icon_grid_items_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_icon_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"columns" "enum_pages_blocks_icon_grid_columns" DEFAULT 'three',
  	"block_name" varchar
  );
  
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Services',
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonials_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What Our Clients Say',
  	"subheading" varchar,
  	"show_only_featured" boolean DEFAULT true,
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_pricing_comparison_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"included" boolean DEFAULT true
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_pricing_comparison_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"price_description" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"cta_text" varchar DEFAULT 'Get Started',
  	"cta_url" varchar DEFAULT '/contact'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_pricing_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Simple, Transparent Pricing',
  	"subheading" varchar DEFAULT 'No hidden fees. No surprises. Just great service.',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_hero_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar DEFAULT 'Ready to Maximize Your Rental Income?',
  	"subheadline" varchar DEFAULT 'Get a free rental analysis and discover how much more you could be earning.',
  	"primary_c_t_a_text" varchar DEFAULT 'Get Free Analysis',
  	"primary_c_t_a_url" varchar DEFAULT '/contact',
  	"secondary_c_t_a_text" varchar DEFAULT 'Call Us: (404) 555-0100',
  	"secondary_c_t_a_url" varchar DEFAULT 'tel:+14045550100',
  	"background_color" "enum_pages_blocks_hero_c_t_a_background_color" DEFAULT 'deepNavy',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_icon_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_icon_grid_items_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_icon_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"columns" "enum__pages_v_blocks_icon_grid_columns" DEFAULT 'three',
  	"_uuid" varchar,
  	"block_name" varchar
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Services',
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonials_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What Our Clients Say',
  	"subheading" varchar,
  	"show_only_featured" boolean DEFAULT true,
  	"limit" numeric DEFAULT 6,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pricing_comparison_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"included" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pricing_comparison_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"price_description" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"cta_text" varchar DEFAULT 'Get Started',
  	"cta_url" varchar DEFAULT '/contact',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pricing_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Simple, Transparent Pricing',
  	"subheading" varchar DEFAULT 'No hidden fees. No surprises. Just great service.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar DEFAULT 'Ready to Maximize Your Rental Income?',
  	"subheadline" varchar DEFAULT 'Get a free rental analysis and discover how much more you could be earning.',
  	"primary_c_t_a_text" varchar DEFAULT 'Get Free Analysis',
  	"primary_c_t_a_url" varchar DEFAULT '/contact',
  	"secondary_c_t_a_text" varchar DEFAULT 'Call Us: (404) 555-0100',
  	"secondary_c_t_a_url" varchar DEFAULT 'tel:+14045550100',
  	"background_color" "enum__pages_v_blocks_hero_c_t_a_background_color" DEFAULT 'deepNavy',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "testimonials_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_icon_grid_items" ADD CONSTRAINT "pages_blocks_icon_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_icon_grid" ADD CONSTRAINT "pages_blocks_icon_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
   ALTER TABLE "pages_blocks_services_grid" ADD CONSTRAINT "pages_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonials_carousel" ADD CONSTRAINT "pages_blocks_testimonials_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_pricing_comparison_plans_features" ADD CONSTRAINT "pages_blocks_pricing_comparison_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_comparison_plans"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_pricing_comparison_plans" ADD CONSTRAINT "pages_blocks_pricing_comparison_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_comparison"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_pricing_comparison" ADD CONSTRAINT "pages_blocks_pricing_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_hero_c_t_a" ADD CONSTRAINT "pages_blocks_hero_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_icon_grid_items" ADD CONSTRAINT "_pages_v_blocks_icon_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_icon_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_icon_grid" ADD CONSTRAINT "_pages_v_blocks_icon_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
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
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_services_grid" ADD CONSTRAINT "_pages_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_testimonials_carousel" ADD CONSTRAINT "_pages_v_blocks_testimonials_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_pricing_comparison_plans_features" ADD CONSTRAINT "_pages_v_blocks_pricing_comparison_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_comparison_plans"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_pricing_comparison_plans" ADD CONSTRAINT "_pages_v_blocks_pricing_comparison_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_comparison"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_pricing_comparison" ADD CONSTRAINT "_pages_v_blocks_pricing_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_hero_c_t_a" ADD CONSTRAINT "_pages_v_blocks_hero_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_icon_grid_items_order_idx" ON "pages_blocks_icon_grid_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_icon_grid_items_parent_id_idx" ON "pages_blocks_icon_grid_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_icon_grid_order_idx" ON "pages_blocks_icon_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_icon_grid_parent_id_idx" ON "pages_blocks_icon_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_icon_grid_path_idx" ON "pages_blocks_icon_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_grid_services_features_order_idx" ON "pages_blocks_services_grid_services_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_grid_services_features_parent_id_idx" ON "pages_blocks_services_grid_services_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_grid_services_order_idx" ON "pages_blocks_services_grid_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_grid_services_parent_id_idx" ON "pages_blocks_services_grid_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_grid_order_idx" ON "pages_blocks_services_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_grid_parent_id_idx" ON "pages_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_grid_path_idx" ON "pages_blocks_services_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_carousel_order_idx" ON "pages_blocks_testimonials_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_carousel_parent_id_idx" ON "pages_blocks_testimonials_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_carousel_path_idx" ON "pages_blocks_testimonials_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_comparison_plans_features_order_idx" ON "pages_blocks_pricing_comparison_plans_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_comparison_plans_features_parent_id_idx" ON "pages_blocks_pricing_comparison_plans_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_comparison_plans_order_idx" ON "pages_blocks_pricing_comparison_plans" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_comparison_plans_parent_id_idx" ON "pages_blocks_pricing_comparison_plans" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_comparison_order_idx" ON "pages_blocks_pricing_comparison" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_comparison_parent_id_idx" ON "pages_blocks_pricing_comparison" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_pricing_comparison_path_idx" ON "pages_blocks_pricing_comparison" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_c_t_a_order_idx" ON "pages_blocks_hero_c_t_a" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_c_t_a_parent_id_idx" ON "pages_blocks_hero_c_t_a" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_c_t_a_path_idx" ON "pages_blocks_hero_c_t_a" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_icon_grid_items_order_idx" ON "_pages_v_blocks_icon_grid_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_icon_grid_items_parent_id_idx" ON "_pages_v_blocks_icon_grid_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_icon_grid_order_idx" ON "_pages_v_blocks_icon_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_icon_grid_parent_id_idx" ON "_pages_v_blocks_icon_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_icon_grid_path_idx" ON "_pages_v_blocks_icon_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_grid_services_features_order_idx" ON "_pages_v_blocks_services_grid_services_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_grid_services_features_parent_id_idx" ON "_pages_v_blocks_services_grid_services_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_grid_services_order_idx" ON "_pages_v_blocks_services_grid_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_grid_services_parent_id_idx" ON "_pages_v_blocks_services_grid_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_grid_order_idx" ON "_pages_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_grid_parent_id_idx" ON "_pages_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_grid_path_idx" ON "_pages_v_blocks_services_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_carousel_order_idx" ON "_pages_v_blocks_testimonials_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_carousel_parent_id_idx" ON "_pages_v_blocks_testimonials_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_carousel_path_idx" ON "_pages_v_blocks_testimonials_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_pricing_comparison_plans_features_order_idx" ON "_pages_v_blocks_pricing_comparison_plans_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_pricing_comparison_plans_features_parent_id_idx" ON "_pages_v_blocks_pricing_comparison_plans_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_pricing_comparison_plans_order_idx" ON "_pages_v_blocks_pricing_comparison_plans" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_pricing_comparison_plans_parent_id_idx" ON "_pages_v_blocks_pricing_comparison_plans" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_pricing_comparison_order_idx" ON "_pages_v_blocks_pricing_comparison" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_pricing_comparison_parent_id_idx" ON "_pages_v_blocks_pricing_comparison" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_pricing_comparison_path_idx" ON "_pages_v_blocks_pricing_comparison" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_c_t_a_order_idx" ON "_pages_v_blocks_hero_c_t_a" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_c_t_a_parent_id_idx" ON "_pages_v_blocks_hero_c_t_a" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_c_t_a_path_idx" ON "_pages_v_blocks_hero_c_t_a" USING btree ("_path");
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_icon_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_icon_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_grid_services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_grid_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_comparison_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_comparison_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_icon_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_icon_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_grid_services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_grid_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_comparison_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_comparison_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_c_t_a" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_icon_grid_items" CASCADE;
  DROP TABLE "pages_blocks_icon_grid" CASCADE;
  DROP TABLE "pages_blocks_services_grid_services_features" CASCADE;
  DROP TABLE "pages_blocks_services_grid_services" CASCADE;
  DROP TABLE "pages_blocks_services_grid" CASCADE;
  DROP TABLE "pages_blocks_testimonials_carousel" CASCADE;
  DROP TABLE "pages_blocks_pricing_comparison_plans_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_comparison_plans" CASCADE;
  DROP TABLE "pages_blocks_pricing_comparison" CASCADE;
  DROP TABLE "pages_blocks_hero_c_t_a" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid_services_features" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid_services" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_comparison_plans_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_comparison_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_comparison" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_c_t_a" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_testimonials_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_testimonials_fk";
  
  DROP INDEX IF EXISTS "pages_rels_testimonials_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_testimonials_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "testimonials_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "testimonials_id";
  DROP TYPE "public"."enum_pages_blocks_icon_grid_items_icon";
  DROP TYPE "public"."enum_pages_blocks_icon_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_services_grid_services_icon";
  DROP TYPE "public"."enum_pages_blocks_hero_c_t_a_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_icon_grid_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_icon_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_services_grid_services_icon";
  DROP TYPE "public"."enum__pages_v_blocks_hero_c_t_a_background_color";`)
}
