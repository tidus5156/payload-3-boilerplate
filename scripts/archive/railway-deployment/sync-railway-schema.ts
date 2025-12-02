#!/usr/bin/env tsx

/**
 * Sync Railway Database Schema
 *
 * This connects to Railway and initializes Payload, which auto-pushes schema changes
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'

const syncSchema = async () => {
  console.log('🔄 Syncing Railway database schema...\n')

  try {
    // Just initializing Payload will auto-push schema changes in dev mode
    const payload = await getPayload({ config })

    console.log('✅ Schema synced successfully!')
    console.log('   Railway database is now up to date with latest schema.\n')

    process.exit(0)
  } catch (error: any) {
    console.error('❌ Error syncing schema:', error.message)
    process.exit(1)
  }
}

syncSchema()
