import { getPayload } from 'payload'
import config from '../src/payload.config'

const listUsers = async () => {
  const payload = await getPayload({ config })

  const users = await payload.find({
    collection: 'users',
    limit: 10,
    select: {
      email: true,
      roles: true,
    },
  })

  console.log('\n📋 Users in database:\n')

  if (users.docs.length === 0) {
    console.log('   ⚠️  No users found.')
    console.log('   ℹ️  Visit http://localhost:3000/admin/create-first-user to create an admin account.\n')
  } else {
    users.docs.forEach((user: any) => {
      console.log(`   • ${user.email} (${user.roles?.join(', ') || 'no roles'})`)
    })
    console.log('')
  }

  process.exit(0)
}

listUsers()
