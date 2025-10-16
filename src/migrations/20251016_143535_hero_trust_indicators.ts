import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_trust_indicators_icon" AS ENUM('star', 'home', 'shield', 'check', 'users', 'trending');
  CREATE TYPE "public"."enum_pages_blocks_statistics_stats_icon" AS ENUM('home', 'users', 'star', 'award', 'trending', 'check', 'heart', 'shield');
  CREATE TYPE "public"."enum_pages_blocks_statistics_layout" AS ENUM('grid-2', 'grid-3', 'grid-4');
  CREATE TYPE "public"."enum_pages_blocks_statistics_background_color" AS ENUM('transparent', 'lightGray', 'deepNavy', 'skyBlueLight');
  CREATE TYPE "public"."enum_pages_blocks_statistics_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_faq_accordion_filter_by_category" AS ENUM('general', 'pricing', 'services', 'leasing', 'maintenance', 'legal');
  CREATE TYPE "public"."enum_pages_blocks_faq_accordion_background_color" AS ENUM('transparent', 'lightGray', 'white');
  CREATE TYPE "public"."enum_pages_blocks_faq_accordion_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_process_timeline_steps_icon" AS ENUM('phone', 'calendar', 'clipboard', 'check', 'users', 'home');
  CREATE TYPE "public"."enum_pages_blocks_process_timeline_layout" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum_pages_blocks_process_timeline_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_version_hero_trust_indicators_icon" AS ENUM('star', 'home', 'shield', 'check', 'users', 'trending');
  CREATE TYPE "public"."enum__pages_v_blocks_statistics_stats_icon" AS ENUM('home', 'users', 'star', 'award', 'trending', 'check', 'heart', 'shield');
  CREATE TYPE "public"."enum__pages_v_blocks_statistics_layout" AS ENUM('grid-2', 'grid-3', 'grid-4');
  CREATE TYPE "public"."enum__pages_v_blocks_statistics_background_color" AS ENUM('transparent', 'lightGray', 'deepNavy', 'skyBlueLight');
  CREATE TYPE "public"."enum__pages_v_blocks_statistics_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_accordion_filter_by_category" AS ENUM('general', 'pricing', 'services', 'leasing', 'maintenance', 'legal');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_accordion_background_color" AS ENUM('transparent', 'lightGray', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_accordion_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_process_timeline_steps_icon" AS ENUM('phone', 'calendar', 'clipboard', 'check', 'users', 'home');
  CREATE TYPE "public"."enum__pages_v_blocks_process_timeline_layout" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum__pages_v_blocks_process_timeline_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_faqs_category" AS ENUM('general', 'pricing', 'services', 'leasing', 'maintenance', 'legal');
  CREATE TYPE "public"."enum_header_nav_items_children_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "pages_hero_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_hero_trust_indicators_icon",
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_statistics_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"suffix" varchar,
  	"prefix" varchar,
  	"label" varchar,
  	"sublabel" varchar,
  	"icon" "enum_pages_blocks_statistics_stats_icon",
  	"animate_counter" boolean DEFAULT true
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"layout" "enum_pages_blocks_statistics_layout" DEFAULT 'grid-4',
  	"background_color" "enum_pages_blocks_statistics_background_color" DEFAULT 'transparent',
  	"spacing" "enum_pages_blocks_statistics_spacing" DEFAULT 'normal',
  	"enable_animations" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_accordion_filter_by_category" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_faq_accordion_filter_by_category",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"show_featured_only" boolean DEFAULT false,
  	"limit" numeric DEFAULT 10,
  	"default_expanded" boolean DEFAULT true,
  	"allow_multiple" boolean DEFAULT false,
  	"background_color" "enum_pages_blocks_faq_accordion_background_color" DEFAULT 'transparent',
  	"spacing" "enum_pages_blocks_faq_accordion_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_process_timeline_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_pages_blocks_process_timeline_steps_icon"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_process_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"layout" "enum_pages_blocks_process_timeline_layout" DEFAULT 'vertical',
  	"spacing" "enum_pages_blocks_process_timeline_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_version_hero_trust_indicators_icon",
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_statistics_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"suffix" varchar,
  	"prefix" varchar,
  	"label" varchar,
  	"sublabel" varchar,
  	"icon" "enum__pages_v_blocks_statistics_stats_icon",
  	"animate_counter" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"layout" "enum__pages_v_blocks_statistics_layout" DEFAULT 'grid-4',
  	"background_color" "enum__pages_v_blocks_statistics_background_color" DEFAULT 'transparent',
  	"spacing" "enum__pages_v_blocks_statistics_spacing" DEFAULT 'normal',
  	"enable_animations" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_accordion_filter_by_category" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_faq_accordion_filter_by_category",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"show_featured_only" boolean DEFAULT false,
  	"limit" numeric DEFAULT 10,
  	"default_expanded" boolean DEFAULT true,
  	"allow_multiple" boolean DEFAULT false,
  	"background_color" "enum__pages_v_blocks_faq_accordion_background_color" DEFAULT 'transparent',
  	"spacing" "enum__pages_v_blocks_faq_accordion_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_process_timeline_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__pages_v_blocks_process_timeline_steps_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_process_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"layout" "enum__pages_v_blocks_process_timeline_layout" DEFAULT 'vertical',
  	"spacing" "enum__pages_v_blocks_process_timeline_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"category" "enum_faqs_category" DEFAULT 'general' NOT NULL,
  	"order" numeric DEFAULT 0,
  	"featured" boolean DEFAULT false,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_children_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "settings" ADD COLUMN "sticky_c_t_a_bar_enabled" boolean DEFAULT true;
  ALTER TABLE "settings" ADD COLUMN "sticky_c_t_a_bar_heading" varchar DEFAULT 'Ready to get started?';
  ALTER TABLE "settings" ADD COLUMN "sticky_c_t_a_bar_subheading" varchar DEFAULT 'Get your free consultation today';
  ALTER TABLE "settings" ADD COLUMN "sticky_c_t_a_bar_primary_button_text" varchar DEFAULT 'Call Now';
  ALTER TABLE "settings" ADD COLUMN "sticky_c_t_a_bar_primary_button_url" varchar DEFAULT 'tel:+14045550100';
  ALTER TABLE "settings" ADD COLUMN "sticky_c_t_a_bar_secondary_button_text" varchar DEFAULT 'Email Us';
  ALTER TABLE "settings" ADD COLUMN "sticky_c_t_a_bar_secondary_button_url" varchar DEFAULT '/contact';
  DO $$ BEGIN
   ALTER TABLE "pages_hero_trust_indicators" ADD CONSTRAINT "pages_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_statistics_stats" ADD CONSTRAINT "pages_blocks_statistics_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_statistics"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_statistics" ADD CONSTRAINT "pages_blocks_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_faq_accordion_filter_by_category" ADD CONSTRAINT "pages_blocks_faq_accordion_filter_by_category_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_faq_accordion" ADD CONSTRAINT "pages_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_process_timeline_steps" ADD CONSTRAINT "pages_blocks_process_timeline_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_timeline"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_process_timeline" ADD CONSTRAINT "pages_blocks_process_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_trust_indicators" ADD CONSTRAINT "_pages_v_version_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_statistics_stats" ADD CONSTRAINT "_pages_v_blocks_statistics_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_statistics"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_statistics" ADD CONSTRAINT "_pages_v_blocks_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_faq_accordion_filter_by_category" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_filter_by_category_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_faq_accordion" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_process_timeline_steps" ADD CONSTRAINT "_pages_v_blocks_process_timeline_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_timeline"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_process_timeline" ADD CONSTRAINT "_pages_v_blocks_process_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_trust_indicators_order_idx" ON "pages_hero_trust_indicators" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_trust_indicators_parent_id_idx" ON "pages_hero_trust_indicators" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_statistics_stats_order_idx" ON "pages_blocks_statistics_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_statistics_stats_parent_id_idx" ON "pages_blocks_statistics_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_statistics_order_idx" ON "pages_blocks_statistics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_statistics_parent_id_idx" ON "pages_blocks_statistics" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_statistics_path_idx" ON "pages_blocks_statistics" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_accordion_filter_by_category_order_idx" ON "pages_blocks_faq_accordion_filter_by_category" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_accordion_filter_by_category_parent_idx" ON "pages_blocks_faq_accordion_filter_by_category" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_accordion_order_idx" ON "pages_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_accordion_parent_id_idx" ON "pages_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_accordion_path_idx" ON "pages_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_timeline_steps_order_idx" ON "pages_blocks_process_timeline_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_timeline_steps_parent_id_idx" ON "pages_blocks_process_timeline_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_timeline_order_idx" ON "pages_blocks_process_timeline" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_timeline_parent_id_idx" ON "pages_blocks_process_timeline" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_timeline_path_idx" ON "pages_blocks_process_timeline" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_trust_indicators_order_idx" ON "_pages_v_version_hero_trust_indicators" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_trust_indicators_parent_id_idx" ON "_pages_v_version_hero_trust_indicators" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_statistics_stats_order_idx" ON "_pages_v_blocks_statistics_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_statistics_stats_parent_id_idx" ON "_pages_v_blocks_statistics_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_statistics_order_idx" ON "_pages_v_blocks_statistics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_statistics_parent_id_idx" ON "_pages_v_blocks_statistics" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_statistics_path_idx" ON "_pages_v_blocks_statistics" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_accordion_filter_by_category_order_idx" ON "_pages_v_blocks_faq_accordion_filter_by_category" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_accordion_filter_by_category_parent_idx" ON "_pages_v_blocks_faq_accordion_filter_by_category" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_accordion_order_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_accordion_parent_id_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_accordion_path_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_timeline_steps_order_idx" ON "_pages_v_blocks_process_timeline_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_timeline_steps_parent_id_idx" ON "_pages_v_blocks_process_timeline_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_timeline_order_idx" ON "_pages_v_blocks_process_timeline" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_timeline_parent_id_idx" ON "_pages_v_blocks_process_timeline" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_timeline_path_idx" ON "_pages_v_blocks_process_timeline" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_hero_trust_indicators" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_statistics_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_statistics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_accordion_filter_by_category" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_timeline_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_trust_indicators" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_statistics_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_statistics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_accordion_filter_by_category" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_timeline_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_children" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_trust_indicators" CASCADE;
  DROP TABLE "pages_blocks_statistics_stats" CASCADE;
  DROP TABLE "pages_blocks_statistics" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion_filter_by_category" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion" CASCADE;
  DROP TABLE "pages_blocks_process_timeline_steps" CASCADE;
  DROP TABLE "pages_blocks_process_timeline" CASCADE;
  DROP TABLE "_pages_v_version_hero_trust_indicators" CASCADE;
  DROP TABLE "_pages_v_blocks_statistics_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_statistics" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion_filter_by_category" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_process_timeline_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_timeline" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "header_nav_items_children" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_faqs_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_faqs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faqs_fk";
  
  DROP INDEX IF EXISTS "pages_rels_faqs_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_faqs_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_faqs_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "faqs_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "faqs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "faqs_id";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "sticky_c_t_a_bar_enabled";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "sticky_c_t_a_bar_heading";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "sticky_c_t_a_bar_subheading";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "sticky_c_t_a_bar_primary_button_text";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "sticky_c_t_a_bar_primary_button_url";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "sticky_c_t_a_bar_secondary_button_text";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "sticky_c_t_a_bar_secondary_button_url";
  DROP TYPE "public"."enum_pages_hero_trust_indicators_icon";
  DROP TYPE "public"."enum_pages_blocks_statistics_stats_icon";
  DROP TYPE "public"."enum_pages_blocks_statistics_layout";
  DROP TYPE "public"."enum_pages_blocks_statistics_background_color";
  DROP TYPE "public"."enum_pages_blocks_statistics_spacing";
  DROP TYPE "public"."enum_pages_blocks_faq_accordion_filter_by_category";
  DROP TYPE "public"."enum_pages_blocks_faq_accordion_background_color";
  DROP TYPE "public"."enum_pages_blocks_faq_accordion_spacing";
  DROP TYPE "public"."enum_pages_blocks_process_timeline_steps_icon";
  DROP TYPE "public"."enum_pages_blocks_process_timeline_layout";
  DROP TYPE "public"."enum_pages_blocks_process_timeline_spacing";
  DROP TYPE "public"."enum__pages_v_version_hero_trust_indicators_icon";
  DROP TYPE "public"."enum__pages_v_blocks_statistics_stats_icon";
  DROP TYPE "public"."enum__pages_v_blocks_statistics_layout";
  DROP TYPE "public"."enum__pages_v_blocks_statistics_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_statistics_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_faq_accordion_filter_by_category";
  DROP TYPE "public"."enum__pages_v_blocks_faq_accordion_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_faq_accordion_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_process_timeline_steps_icon";
  DROP TYPE "public"."enum__pages_v_blocks_process_timeline_layout";
  DROP TYPE "public"."enum__pages_v_blocks_process_timeline_spacing";
  DROP TYPE "public"."enum_faqs_category";
  DROP TYPE "public"."enum_header_nav_items_children_link_type";`)
}
