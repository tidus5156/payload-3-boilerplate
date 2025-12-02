import { migrateSlateToLexical } from '@payloadcms/richtext-lexical/migrate';
import { getPayload } from 'payload';
import config from '../src/payload.config.js';

console.log('🔄 Migrating Slate to Lexical...\n');

const payload = await getPayload({ config });

await migrateSlateToLexical({
  payload,
});

console.log('\n✅ Migration complete! All richText fields have been converted to Lexical format.');
process.exit(0);
