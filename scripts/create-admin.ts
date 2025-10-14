import { getPayload } from 'payload'
import config from '@payload-config'

const createAdmin = async () => {
  try {
    const payload = await getPayload({ config })

    console.log('👤 Creating admin user...\n')

    const email = 'admin@allaypm.com'
    const password = 'Change@Me123!' // Temporary password - MUST be changed on first login

    // Check if admin user already exists
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (existingUser.docs.length > 0) {
      console.log('⚠️  Admin user already exists!')
      console.log(`   Email: ${email}`)
      console.log('\n💡 If you need to reset the password, delete the user from the admin panel first.\n')
      process.exit(0)
    }

    // Create admin user
    const admin = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    console.log('✅ Admin user created successfully!\n')
    console.log('📧 Email:', email)
    console.log('🔑 Temporary Password:', password)
    console.log('\n⚠️  IMPORTANT: Change this password immediately after first login!')
    console.log('\n🌐 Access the admin panel at: http://localhost:3000/admin\n')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  }
}

createAdmin()
