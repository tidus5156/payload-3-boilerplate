import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              defaultValue: 'Allay Property Management',
            },
            {
              name: 'tagline',
              type: 'text',
              defaultValue: 'Stress Less. Earn More.',
            },
            {
              name: 'phone',
              type: 'text',
              required: true,
              admin: {
                placeholder: '(404) 555-0100',
              },
            },
            {
              name: 'email',
              type: 'email',
              required: true,
              admin: {
                placeholder: 'info@allaypm.com',
              },
            },
            {
              name: 'officeAddress',
              type: 'textarea',
              required: true,
              admin: {
                placeholder: '123 Main Street\nAtlanta, GA 30303',
              },
            },
            {
              name: 'officeHours',
              type: 'textarea',
              defaultValue: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed',
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'socialMedia',
              type: 'group',
              fields: [
                {
                  name: 'facebook',
                  type: 'text',
                  admin: {
                    placeholder: 'https://facebook.com/allaypm',
                  },
                },
                {
                  name: 'instagram',
                  type: 'text',
                  admin: {
                    placeholder: 'https://instagram.com/allaypm',
                  },
                },
                {
                  name: 'linkedin',
                  type: 'text',
                  admin: {
                    placeholder: 'https://linkedin.com/company/allaypm',
                  },
                },
                {
                  name: 'twitter',
                  type: 'text',
                  admin: {
                    placeholder: 'https://twitter.com/allaypm',
                  },
                },
                {
                  name: 'youtube',
                  type: 'text',
                  admin: {
                    placeholder: 'https://youtube.com/@allaypm',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Tracking & Analytics',
          fields: [
            {
              name: 'googleAnalyticsId',
              type: 'text',
              admin: {
                placeholder: 'G-XXXXXXXXXX',
                description: 'Google Analytics 4 Measurement ID',
              },
            },
            {
              name: 'facebookPixelId',
              type: 'text',
              admin: {
                placeholder: 'XXXXXXXXXXXXXXX',
                description: 'Facebook Pixel ID for conversion tracking',
              },
            },
            {
              name: 'gtmId',
              type: 'text',
              admin: {
                placeholder: 'GTM-XXXXXXX',
                description: 'Google Tag Manager Container ID',
              },
            },
          ],
        },
        {
          label: 'RE/MAX Branding',
          fields: [
            {
              name: 'remaxBrokerage',
              type: 'group',
              fields: [
                {
                  name: 'brokerageName',
                  type: 'text',
                  defaultValue: 'RE/MAX Metro Atlanta',
                },
                {
                  name: 'brokerName',
                  type: 'text',
                  admin: {
                    placeholder: 'David Patterson',
                  },
                },
                {
                  name: 'licenseNumber',
                  type: 'text',
                  admin: {
                    placeholder: 'GA License #XXXXXXX',
                  },
                },
                {
                  name: 'showRemaxLogo',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Display RE/MAX logo in header and footer',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
