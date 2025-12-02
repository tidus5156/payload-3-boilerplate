import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_dual_hero_left_panel_overlay_color" AS ENUM('deepNavy', 'skyBlue', 'darkGray');
  CREATE TYPE "public"."enum_pages_blocks_dual_hero_right_panel_overlay_color" AS ENUM('sageGreen', 'skyBlue', 'warmGray');
  CREATE TYPE "public"."enum_pages_blocks_dual_hero_min_height" AS ENUM('70vh', '85vh', '100vh');
  CREATE TYPE "public"."enum_pages_blocks_dual_hero_mobile_layout" AS ENUM('stack', 'stackReverse');
  CREATE TYPE "public"."enum__pages_v_blocks_dual_hero_left_panel_overlay_color" AS ENUM('deepNavy', 'skyBlue', 'darkGray');
  CREATE TYPE "public"."enum__pages_v_blocks_dual_hero_right_panel_overlay_color" AS ENUM('sageGreen', 'skyBlue', 'warmGray');
  CREATE TYPE "public"."enum__pages_v_blocks_dual_hero_min_height" AS ENUM('70vh', '85vh', '100vh');
  CREATE TYPE "public"."enum__pages_v_blocks_dual_hero_mobile_layout" AS ENUM('stack', 'stackReverse');
  CREATE TABLE IF NOT EXISTS "pages_blocks_dual_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_panel_headline" varchar DEFAULT 'Maximize Your Rental Income',
  	"left_panel_background_image_id" integer,
  	"left_panel_overlay_color" "enum_pages_blocks_dual_hero_left_panel_overlay_color" DEFAULT 'deepNavy',
  	"left_panel_overlay_opacity" numeric DEFAULT 30,
  	"left_panel_primary_c_t_a_text" varchar DEFAULT 'Get Free Analysis',
  	"left_panel_primary_c_t_a_url" varchar DEFAULT '/contact',
  	"left_panel_primary_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"left_panel_secondary_link_text" varchar DEFAULT 'Learn more ↓',
  	"left_panel_secondary_link_url" varchar DEFAULT '#benefits',
  	"right_panel_headline" varchar DEFAULT 'Find Your Perfect Home',
  	"right_panel_background_image_id" integer,
  	"right_panel_overlay_color" "enum_pages_blocks_dual_hero_right_panel_overlay_color" DEFAULT 'sageGreen',
  	"right_panel_overlay_opacity" numeric DEFAULT 30,
  	"right_panel_primary_c_t_a_text" varchar DEFAULT 'Search Properties',
  	"right_panel_primary_c_t_a_url" varchar DEFAULT '/properties',
  	"right_panel_primary_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"right_panel_secondary_link_text" varchar DEFAULT 'Learn more ↓',
  	"right_panel_secondary_link_url" varchar DEFAULT '#benefits',
  	"min_height" "enum_pages_blocks_dual_hero_min_height" DEFAULT '85vh',
  	"mobile_layout" "enum_pages_blocks_dual_hero_mobile_layout" DEFAULT 'stack',
  	"show_scroll_indicator" boolean DEFAULT true,
  	"enable_parallax" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_dual_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_panel_headline" varchar DEFAULT 'Maximize Your Rental Income',
  	"left_panel_background_image_id" integer,
  	"left_panel_overlay_color" "enum__pages_v_blocks_dual_hero_left_panel_overlay_color" DEFAULT 'deepNavy',
  	"left_panel_overlay_opacity" numeric DEFAULT 30,
  	"left_panel_primary_c_t_a_text" varchar DEFAULT 'Get Free Analysis',
  	"left_panel_primary_c_t_a_url" varchar DEFAULT '/contact',
  	"left_panel_primary_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"left_panel_secondary_link_text" varchar DEFAULT 'Learn more ↓',
  	"left_panel_secondary_link_url" varchar DEFAULT '#benefits',
  	"right_panel_headline" varchar DEFAULT 'Find Your Perfect Home',
  	"right_panel_background_image_id" integer,
  	"right_panel_overlay_color" "enum__pages_v_blocks_dual_hero_right_panel_overlay_color" DEFAULT 'sageGreen',
  	"right_panel_overlay_opacity" numeric DEFAULT 30,
  	"right_panel_primary_c_t_a_text" varchar DEFAULT 'Search Properties',
  	"right_panel_primary_c_t_a_url" varchar DEFAULT '/properties',
  	"right_panel_primary_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"right_panel_secondary_link_text" varchar DEFAULT 'Learn more ↓',
  	"right_panel_secondary_link_url" varchar DEFAULT '#benefits',
  	"min_height" "enum__pages_v_blocks_dual_hero_min_height" DEFAULT '85vh',
  	"mobile_layout" "enum__pages_v_blocks_dual_hero_mobile_layout" DEFAULT 'stack',
  	"show_scroll_indicator" boolean DEFAULT true,
  	"enable_parallax" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_dual_hero" ADD CONSTRAINT "pages_blocks_dual_hero_left_panel_background_image_id_media_id_fk" FOREIGN KEY ("left_panel_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_dual_hero" ADD CONSTRAINT "pages_blocks_dual_hero_right_panel_background_image_id_media_id_fk" FOREIGN KEY ("right_panel_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_dual_hero" ADD CONSTRAINT "pages_blocks_dual_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_dual_hero" ADD CONSTRAINT "_pages_v_blocks_dual_hero_left_panel_background_image_id_media_id_fk" FOREIGN KEY ("left_panel_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_dual_hero" ADD CONSTRAINT "_pages_v_blocks_dual_hero_right_panel_background_image_id_media_id_fk" FOREIGN KEY ("right_panel_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_dual_hero" ADD CONSTRAINT "_pages_v_blocks_dual_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_dual_hero_order_idx" ON "pages_blocks_dual_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_dual_hero_parent_id_idx" ON "pages_blocks_dual_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_dual_hero_path_idx" ON "pages_blocks_dual_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_dual_hero_left_panel_left_panel_background_image_idx" ON "pages_blocks_dual_hero" USING btree ("left_panel_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_dual_hero_right_panel_right_panel_background_image_idx" ON "pages_blocks_dual_hero" USING btree ("right_panel_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_dual_hero_order_idx" ON "_pages_v_blocks_dual_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_dual_hero_parent_id_idx" ON "_pages_v_blocks_dual_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_dual_hero_path_idx" ON "_pages_v_blocks_dual_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_dual_hero_left_panel_left_panel_background_image_idx" ON "_pages_v_blocks_dual_hero" USING btree ("left_panel_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_dual_hero_right_panel_right_panel_background_image_idx" ON "_pages_v_blocks_dual_hero" USING btree ("right_panel_background_image_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_dual_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_dual_hero" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_dual_hero_left_panel_overlay_color";
  DROP TYPE "public"."enum_pages_blocks_dual_hero_right_panel_overlay_color";
  DROP TYPE "public"."enum_pages_blocks_dual_hero_min_height";
  DROP TYPE "public"."enum_pages_blocks_dual_hero_mobile_layout";
  DROP TYPE "public"."enum__pages_v_blocks_dual_hero_left_panel_overlay_color";
  DROP TYPE "public"."enum__pages_v_blocks_dual_hero_right_panel_overlay_color";
  DROP TYPE "public"."enum__pages_v_blocks_dual_hero_min_height";
  DROP TYPE "public"."enum__pages_v_blocks_dual_hero_mobile_layout";`)
}
