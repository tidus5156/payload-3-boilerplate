import * as fs from 'fs'
import * as path from 'path'

/**
 * Load environment variables from .env file
 * This is needed for standalone scripts that don't run through Next.js
 */
export function loadEnv() {
  const envPath = path.join(process.cwd(), '.env')

  if (!fs.existsSync(envPath)) {
    console.warn('⚠️  .env file not found at:', envPath)
    return
  }

  console.log('📄 Loading environment variables from:', envPath)

  const envContent = fs.readFileSync(envPath, 'utf-8')
  let count = 0

  envContent.split('\n').forEach(line => {
    // Skip empty lines and comments
    if (!line || line.trim().startsWith('#')) {
      return
    }

    const [key, ...valueParts] = line.split('=')
    if (key) {
      const value = valueParts.join('=').trim()
      // Remove quotes if present
      const cleanValue = value.replace(/^["']|["']$/g, '')

      // Only set if not already set
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = cleanValue
        count++
      }
    }
  })

  console.log(`✅ Loaded ${count} environment variables`)
  console.log(`   PAYLOAD_SECRET: ${process.env.PAYLOAD_SECRET ? '✅ SET' : '❌ NOT SET'}`)
  console.log(`   DATABASE_URI: ${process.env.DATABASE_URI ? '✅ SET' : '❌ NOT SET'}`)
}
