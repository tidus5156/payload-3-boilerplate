import { getPayload } from 'payload'
import config from '../src/payload.config'

async function listUsers() {
  const payload = await getPayload({ config })

  try {
    const users = await payload.find({
      collection: 'users',
      limit: 10,
    })

    console.log('📋 Users in database:', users.totalDocs)
    console.log('')

    if (users.totalDocs === 0) {
      console.log('❌ No users found in database')
      console.log('💡 You may need to create an admin user first')
      console.log('   Visit: http://localhost:3000/admin')
    } else {
      users.docs.forEach(u => {
        console.log(`  ✓ ${u.email}`)
        console.log(`    ID: ${u.id}`)
        console.log(`    Roles: ${u.roles?.join(', ') || 'none'}`)
        console.log('')
      })
    }
  } catch (error) {
    console.error('❌ Error listing users:', error)
  } finally {
    process.exit(0)
  }
}

listUsers()
