import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => {
      return !!user
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
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Primary logo for header and footer (recommended: SVG or PNG with transparent background)',
              },
            },
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
          label: 'Portals',
          fields: [
            {
              name: 'ownerPortalUrl',
              type: 'text',
              label: 'Owner Portal URL',
              admin: {
                placeholder: 'https://owners.allaypm.com',
                description: 'URL for property owners to log in and access their portal',
              },
            },
            {
              name: 'residentPortalUrl',
              type: 'text',
              label: 'Resident Portal URL',
              admin: {
                placeholder: 'https://residents.allaypm.com',
                description: 'URL for residents to log in and access their portal',
              },
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
          label: 'Sticky CTA Bar',
          fields: [
            {
              name: 'stickyCTABar',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enable Sticky CTA Bar',
                  defaultValue: true,
                  admin: {
                    description: 'Show the sticky contact bar at the bottom of pages',
                  },
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Heading',
                  defaultValue: 'Ready to get started?',
                  admin: {
                    condition: (_, siblingData) => siblingData?.enabled,
                  },
                },
                {
                  name: 'subheading',
                  type: 'text',
                  label: 'Subheading',
                  defaultValue: 'Get your free consultation today',
                  admin: {
                    condition: (_, siblingData) => siblingData?.enabled,
                  },
                },
                {
                  name: 'primaryButtonText',
                  type: 'text',
                  label: 'Primary Button Text',
                  defaultValue: 'Call Now',
                  admin: {
                    condition: (_, siblingData) => siblingData?.enabled,
                  },
                },
                {
                  name: 'primaryButtonUrl',
                  type: 'text',
                  label: 'Primary Button URL',
                  defaultValue: 'tel:+14045550100',
                  admin: {
                    condition: (_, siblingData) => siblingData?.enabled,
                    placeholder: 'tel:+14045550100',
                  },
                },
                {
                  name: 'secondaryButtonText',
                  type: 'text',
                  label: 'Secondary Button Text',
                  defaultValue: 'Email Us',
                  admin: {
                    condition: (_, siblingData) => siblingData?.enabled,
                  },
                },
                {
                  name: 'secondaryButtonUrl',
                  type: 'text',
                  label: 'Secondary Button URL',
                  defaultValue: '/contact',
                  admin: {
                    condition: (_, siblingData) => siblingData?.enabled,
                  },
                },
              ],
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
