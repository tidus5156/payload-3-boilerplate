import * as migration_20241125_222020_initial from './20241125_222020_initial';
import * as migration_20241214_124128 from './20241214_124128';
import * as migration_20251014_203127 from './20251014_203127';
import * as migration_20251014_225257_custom_blocks from './20251014_225257_custom_blocks';
import * as migration_20251016_143535_hero_trust_indicators from './20251016_143535_hero_trust_indicators';
import * as migration_20251021_142734 from './20251021_142734';
import * as migration_20251023_165202_add_properties_to_archive_enum from './20251023_165202_add_properties_to_archive_enum';
import * as migration_20251023_212544_add_dual_hero_block from './20251023_212544_add_dual_hero_block';
import * as migration_20251023_221721_update_servicesgrid_block_fields from './20251023_221721_update_servicesgrid_block_fields';

export const migrations = [
  {
    up: migration_20241125_222020_initial.up,
    down: migration_20241125_222020_initial.down,
    name: '20241125_222020_initial',
  },
  {
    up: migration_20241214_124128.up,
    down: migration_20241214_124128.down,
    name: '20241214_124128',
  },
  {
    up: migration_20251014_203127.up,
    down: migration_20251014_203127.down,
    name: '20251014_203127',
  },
  {
    up: migration_20251014_225257_custom_blocks.up,
    down: migration_20251014_225257_custom_blocks.down,
    name: '20251014_225257_custom_blocks',
  },
  {
    up: migration_20251016_143535_hero_trust_indicators.up,
    down: migration_20251016_143535_hero_trust_indicators.down,
    name: '20251016_143535_hero_trust_indicators',
  },
  {
    up: migration_20251021_142734.up,
    down: migration_20251021_142734.down,
    name: '20251021_142734',
  },
  {
    up: migration_20251023_165202_add_properties_to_archive_enum.up,
    down: migration_20251023_165202_add_properties_to_archive_enum.down,
    name: '20251023_165202_add_properties_to_archive_enum',
  },
  {
    up: migration_20251023_212544_add_dual_hero_block.up,
    down: migration_20251023_212544_add_dual_hero_block.down,
    name: '20251023_212544_add_dual_hero_block',
  },
  {
    up: migration_20251023_221721_update_servicesgrid_block_fields.up,
    down: migration_20251023_221721_update_servicesgrid_block_fields.down,
    name: '20251023_221721_update_servicesgrid_block_fields'
  },
];
