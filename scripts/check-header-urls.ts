import { getPayload } from 'payload'
import config from '../src/payload.config'

const checkHeader = async () => {
  const payload = await getPayload({ config })

  const header = await payload.findGlobal({ slug: 'header' })

  const propertyOwnersNav = header.navItems?.find((item: any) => item.link?.label === 'Property Owners')

  console.log('Property Owners Navigation Children:')
  propertyOwnersNav?.children?.forEach((child: any) => {
    console.log(`  - ${child.link?.label}: ${child.link?.url}`)
  })

  process.exit(0)
}

checkHeader()
