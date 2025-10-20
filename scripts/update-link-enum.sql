-- Update all link appearance enum types to include the new values

-- Helper function to safely add enum value if it doesn't exist
DO $$
BEGIN
    -- Update pages_hero_links enum
    ALTER TYPE enum_pages_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'primary';
    ALTER TYPE enum_pages_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'secondary';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$
BEGIN
    -- Update pages_blocks_cta_links enum
    ALTER TYPE enum_pages_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'primary';
    ALTER TYPE enum_pages_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'secondary';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$
BEGIN
    -- Update pages_blocks_content_columns enum
    ALTER TYPE enum_pages_blocks_content_columns_link_appearance ADD VALUE IF NOT EXISTS 'primary';
    ALTER TYPE enum_pages_blocks_content_columns_link_appearance ADD VALUE IF NOT EXISTS 'secondary';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$
BEGIN
    -- Update _pages_v_version_hero_links enum
    ALTER TYPE enum__pages_v_version_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'primary';
    ALTER TYPE enum__pages_v_version_hero_links_link_appearance ADD VALUE IF NOT EXISTS 'secondary';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$
BEGIN
    -- Update _pages_v_blocks_cta_links enum
    ALTER TYPE enum__pages_v_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'primary';
    ALTER TYPE enum__pages_v_blocks_cta_links_link_appearance ADD VALUE IF NOT EXISTS 'secondary';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$
BEGIN
    -- Update _pages_v_blocks_content_columns enum
    ALTER TYPE enum__pages_v_blocks_content_columns_link_appearance ADD VALUE IF NOT EXISTS 'primary';
    ALTER TYPE enum__pages_v_blocks_content_columns_link_appearance ADD VALUE IF NOT EXISTS 'secondary';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
