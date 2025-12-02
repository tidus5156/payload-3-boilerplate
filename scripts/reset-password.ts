import { getPayload } from 'payload'
import config from '../src/payload.config'

async function resetPassword() {
  const payload = await getPayload({ config })

  try {
    console.log('🔐 Resetting password for harrison@allayresidential.com...')

    await payload.update({
      collection: 'users',
      id: 1,
      data: {
        password: 'password123',
      },
    })

    console.log('✅ Password successfully reset!')
    console.log('')
    console.log('📝 Login credentials:')
    console.log('   Email: harrison@allayresidential.com')
    console.log('   Password: password123')
    console.log('')
    console.log('🔗 Admin URL: http://localhost:3000/admin')
  } catch (error) {
    console.error('❌ Error resetting password:', error)
  } finally {
    process.exit(0)
  }
}

resetPassword()
