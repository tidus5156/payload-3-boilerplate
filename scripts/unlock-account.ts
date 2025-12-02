import { getPayload } from 'payload'
import config from '../src/payload.config'

async function unlockAccount() {
  const payload = await getPayload({ config })

  try {
    console.log('🔓 Unlocking account for harrison@allayresidential.com...')

    // Reset login attempts and unlock the account
    await payload.update({
      collection: 'users',
      id: 1,
      data: {
        loginAttempts: 0,
        lockUntil: null,
      },
    })

    console.log('✅ Account successfully unlocked!')
    console.log('')
    console.log('📝 You can now login with:')
    console.log('   Email: harrison@allayresidential.com')
    console.log('   Password: password123')
    console.log('')
    console.log('🔗 Admin URL: http://localhost:3000/admin')
    console.log('')
    console.log('💡 Clear your browser cache/cookies if you still have issues')
  } catch (error) {
    console.error('❌ Error unlocking account:', error)
  } finally {
    process.exit(0)
  }
}

unlockAccount()
