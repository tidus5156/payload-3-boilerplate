import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_properties_property_type" AS ENUM('single-family', 'condo', 'townhome', 'multi-family', 'apartment');
  CREATE TYPE "public"."enum_properties_status" AS ENUM('available', 'pending', 'leased', 'maintenance');
  CREATE TYPE "public"."enum_properties_amenities_parking" AS ENUM('none', 'street', 'driveway', 'garage-1', 'garage-2', 'garage-3plus');
  CREATE TYPE "public"."enum_properties_amenities_laundry" AS ENUM('none', 'in-unit', 'shared', 'hookups');
  CREATE TYPE "public"."enum_neighborhoods_region" AS ENUM('north', 'south', 'east', 'west', 'central', 'perimeter');
  CREATE TYPE "public"."enum_neighborhoods_top_schools_school_type" AS ENUM('elementary', 'middle', 'high', 'private');
  CREATE TYPE "public"."enum_neighborhoods_nearby_attractions_category" AS ENUM('park', 'shopping', 'dining', 'entertainment', 'transit');
  CREATE TYPE "public"."enum_neighborhoods_marta_access" AS ENUM('none', 'bus', 'rail-walk', 'rail-near');
  CREATE TYPE "public"."enum_contact_submissions_form_type" AS ENUM('rental-analysis', 'contact', 'consultation', 'resident-inquiry');
  CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'contacted', 'qualified', 'converted', 'not-interested', 'spam');
  CREATE TYPE "public"."enum_contact_submissions_property_info_property_type" AS ENUM('single-family', 'condo', 'townhome', 'multi-family');
  CREATE TYPE "public"."enum_contact_submissions_property_info_current_status" AS ENUM('rented', 'vacant', 'owner-occupied');
  CREATE TYPE "public"."enum_testimonials_property_type" AS ENUM('single-family', 'condo', 'townhome', 'multi-family');
  CREATE TABLE IF NOT EXISTS "properties_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "properties_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "properties" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"address" varchar NOT NULL,
  	"neighborhood_id" integer NOT NULL,
  	"property_type" "enum_properties_property_type" DEFAULT 'single-family' NOT NULL,
  	"status" "enum_properties_status" DEFAULT 'available' NOT NULL,
  	"available_date" timestamp(3) with time zone NOT NULL,
  	"rent" numeric NOT NULL,
  	"deposit" numeric,
  	"bedrooms" numeric NOT NULL,
  	"bathrooms" numeric NOT NULL,
  	"square_feet" numeric,
  	"description" jsonb,
  	"amenities_pet_friendly" boolean DEFAULT false,
  	"amenities_parking" "enum_properties_amenities_parking" DEFAULT 'street',
  	"amenities_laundry" "enum_properties_amenities_laundry" DEFAULT 'none',
  	"amenities_cooling" boolean DEFAULT true,
  	"amenities_heating" boolean DEFAULT true,
  	"amenities_yard" boolean DEFAULT false,
  	"amenities_pool" boolean DEFAULT false,
  	"amenities_gym" boolean DEFAULT false,
  	"virtual_tour_url" varchar,
  	"internal_notes" varchar,
  	"owner_contact_owner_name" varchar,
  	"owner_contact_owner_email" varchar,
  	"owner_contact_owner_phone" varchar,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "neighborhoods_top_schools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"school_name" varchar NOT NULL,
  	"school_type" "enum_neighborhoods_top_schools_school_type",
  	"rating" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "neighborhoods_nearby_attractions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"attraction" varchar NOT NULL,
  	"category" "enum_neighborhoods_nearby_attractions_category"
  );
  
  CREATE TABLE IF NOT EXISTS "neighborhoods_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "neighborhoods" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"region" "enum_neighborhoods_region" NOT NULL,
  	"county" varchar,
  	"description" jsonb NOT NULL,
  	"market_data_average_rent1_b_r" numeric,
  	"market_data_average_rent2_b_r" numeric,
  	"market_data_average_rent3_b_r" numeric,
  	"market_data_average_rent4_b_r" numeric,
  	"market_data_average_vacancy_rate" numeric,
  	"market_data_average_days_on_market" numeric,
  	"market_data_properties_managed" numeric DEFAULT 0,
  	"commute_times_commute_to_midtown" varchar,
  	"commute_times_commute_to_downtown" varchar,
  	"commute_times_commute_to_airport" varchar,
  	"commute_times_commute_to_perimeter_mall" varchar,
  	"marta_access" "enum_neighborhoods_marta_access" DEFAULT 'none',
  	"meta_description" varchar,
  	"featured_image_id" integer,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_type" "enum_contact_submissions_form_type" NOT NULL,
  	"status" "enum_contact_submissions_status" DEFAULT 'new' NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"property_info_property_address" varchar,
  	"property_info_bedrooms" numeric,
  	"property_info_bathrooms" numeric,
  	"property_info_property_type" "enum_contact_submissions_property_info_property_type",
  	"property_info_current_status" "enum_contact_submissions_property_info_current_status",
  	"message" varchar,
  	"source" varchar,
  	"metadata_ip_address" varchar,
  	"metadata_user_agent" varchar,
  	"metadata_referrer" varchar,
  	"internal_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client_name" varchar NOT NULL,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"client_photo_id" integer,
  	"property_type" "enum_testimonials_property_type",
  	"neighborhood" varchar,
  	"number_of_properties" numeric DEFAULT 1,
  	"client_since" numeric,
  	"quote" varchar NOT NULL,
  	"video_url" varchar,
  	"featured" boolean DEFAULT false,
  	"approved" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "team_members_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"certification" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"photo_id" integer NOT NULL,
  	"bio" jsonb,
  	"email" varchar,
  	"phone" varchar,
  	"linkedin" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Allay Property Management' NOT NULL,
  	"tagline" varchar DEFAULT 'Stress Less. Earn More.',
  	"phone" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"office_address" varchar NOT NULL,
  	"office_hours" varchar DEFAULT 'Monday - Friday: 9:00 AM - 6:00 PM
  Saturday: 10:00 AM - 2:00 PM
  Sunday: Closed',
  	"social_media_facebook" varchar,
  	"social_media_instagram" varchar,
  	"social_media_linkedin" varchar,
  	"social_media_twitter" varchar,
  	"social_media_youtube" varchar,
  	"google_analytics_id" varchar,
  	"facebook_pixel_id" varchar,
  	"gtm_id" varchar,
  	"remax_brokerage_brokerage_name" varchar DEFAULT 'RE/MAX Metro Atlanta',
  	"remax_brokerage_broker_name" varchar,
  	"remax_brokerage_license_number" varchar,
  	"remax_brokerage_show_remax_logo" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "properties_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "neighborhoods_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_submissions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  DO $$ BEGIN
   ALTER TABLE "properties_features" ADD CONSTRAINT "properties_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "properties_images" ADD CONSTRAINT "properties_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "properties_images" ADD CONSTRAINT "properties_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "properties" ADD CONSTRAINT "properties_neighborhood_id_neighborhoods_id_fk" FOREIGN KEY ("neighborhood_id") REFERENCES "public"."neighborhoods"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "neighborhoods_top_schools" ADD CONSTRAINT "neighborhoods_top_schools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."neighborhoods"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "neighborhoods_nearby_attractions" ADD CONSTRAINT "neighborhoods_nearby_attractions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."neighborhoods"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "neighborhoods_gallery" ADD CONSTRAINT "neighborhoods_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "neighborhoods_gallery" ADD CONSTRAINT "neighborhoods_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."neighborhoods"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "neighborhoods" ADD CONSTRAINT "neighborhoods_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_client_photo_id_media_id_fk" FOREIGN KEY ("client_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "team_members_certifications" ADD CONSTRAINT "team_members_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "properties_features_order_idx" ON "properties_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "properties_features_parent_id_idx" ON "properties_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "properties_images_order_idx" ON "properties_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "properties_images_parent_id_idx" ON "properties_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "properties_images_image_idx" ON "properties_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "properties_neighborhood_idx" ON "properties" USING btree ("neighborhood_id");
  CREATE INDEX IF NOT EXISTS "properties_updated_at_idx" ON "properties" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "properties_created_at_idx" ON "properties" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "neighborhoods_top_schools_order_idx" ON "neighborhoods_top_schools" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "neighborhoods_top_schools_parent_id_idx" ON "neighborhoods_top_schools" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "neighborhoods_nearby_attractions_order_idx" ON "neighborhoods_nearby_attractions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "neighborhoods_nearby_attractions_parent_id_idx" ON "neighborhoods_nearby_attractions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "neighborhoods_gallery_order_idx" ON "neighborhoods_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "neighborhoods_gallery_parent_id_idx" ON "neighborhoods_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "neighborhoods_gallery_image_idx" ON "neighborhoods_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "neighborhoods_slug_idx" ON "neighborhoods" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "neighborhoods_featured_image_idx" ON "neighborhoods" USING btree ("featured_image_id");
  CREATE INDEX IF NOT EXISTS "neighborhoods_updated_at_idx" ON "neighborhoods" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "neighborhoods_created_at_idx" ON "neighborhoods" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "testimonials_client_photo_idx" ON "testimonials" USING btree ("client_photo_id");
  CREATE INDEX IF NOT EXISTS "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "team_members_certifications_order_idx" ON "team_members_certifications" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "team_members_certifications_parent_id_idx" ON "team_members_certifications" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX IF NOT EXISTS "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_properties_fk" FOREIGN KEY ("properties_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_neighborhoods_fk" FOREIGN KEY ("neighborhoods_id") REFERENCES "public"."neighborhoods"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_properties_id_idx" ON "payload_locked_documents_rels" USING btree ("properties_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_neighborhoods_id_idx" ON "payload_locked_documents_rels" USING btree ("neighborhoods_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "properties_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "properties_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "properties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "neighborhoods_top_schools" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "neighborhoods_nearby_attractions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "neighborhoods_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "neighborhoods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members_certifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "properties_features" CASCADE;
  DROP TABLE "properties_images" CASCADE;
  DROP TABLE "properties" CASCADE;
  DROP TABLE "neighborhoods_top_schools" CASCADE;
  DROP TABLE "neighborhoods_nearby_attractions" CASCADE;
  DROP TABLE "neighborhoods_gallery" CASCADE;
  DROP TABLE "neighborhoods" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "team_members_certifications" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "settings" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_properties_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_neighborhoods_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_members_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_properties_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_neighborhoods_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_contact_submissions_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_team_members_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "properties_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "neighborhoods_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "contact_submissions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "team_members_id";
  DROP TYPE "public"."enum_properties_property_type";
  DROP TYPE "public"."enum_properties_status";
  DROP TYPE "public"."enum_properties_amenities_parking";
  DROP TYPE "public"."enum_properties_amenities_laundry";
  DROP TYPE "public"."enum_neighborhoods_region";
  DROP TYPE "public"."enum_neighborhoods_top_schools_school_type";
  DROP TYPE "public"."enum_neighborhoods_nearby_attractions_category";
  DROP TYPE "public"."enum_neighborhoods_marta_access";
  DROP TYPE "public"."enum_contact_submissions_form_type";
  DROP TYPE "public"."enum_contact_submissions_status";
  DROP TYPE "public"."enum_contact_submissions_property_info_property_type";
  DROP TYPE "public"."enum_contact_submissions_property_info_current_status";
  DROP TYPE "public"."enum_testimonials_property_type";`)
}
