import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'children',
          type: 'array',
          label: 'Submenu Items',
          maxRows: 8,
          admin: {
            description: 'Add submenu items to create a dropdown menu',
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
