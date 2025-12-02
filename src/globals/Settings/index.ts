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
        {
          label: 'Design & Branding',
          fields: [
            {
              name: 'colorPalette',
              type: 'group',
              label: 'Color Palette',
              admin: {
                description: 'Define your brand colors. These will be applied as CSS variables throughout the site.',
              },
              fields: [
                {
                  name: 'deepNavy',
                  type: 'text',
                  label: 'Deep Navy (Primary)',
                  defaultValue: '#1B3A6D',
                  admin: {
                    description: 'Main brand color for headers, text, backgrounds',
                  },
                },
                {
                  name: 'skyBlue',
                  type: 'text',
                  label: 'Sky Blue (Accent)',
                  defaultValue: '#5A9FD4',
                  admin: {
                    description: 'Interactive elements, links, highlights',
                  },
                },
                {
                  name: 'warmGold',
                  type: 'text',
                  label: 'Warm Gold (CTA)',
                  defaultValue: '#C9A961',
                  admin: {
                    description: 'Primary CTA buttons, premium accents',
                  },
                },
                {
                  name: 'sageGreen',
                  type: 'text',
                  label: 'Sage Green (Success)',
                  defaultValue: '#7A9B76',
                  admin: {
                    description: 'Success indicators, checkmarks, positive stats',
                  },
                },
                {
                  name: 'charcoal',
                  type: 'text',
                  label: 'Charcoal (Text)',
                  defaultValue: '#2D3436',
                  admin: {
                    description: 'Primary text color',
                  },
                },
                {
                  name: 'warmGray',
                  type: 'text',
                  label: 'Warm Gray (Body Text)',
                  defaultValue: '#6C757D',
                  admin: {
                    description: 'Body text, secondary information',
                  },
                },
                {
                  name: 'lightGray',
                  type: 'text',
                  label: 'Light Gray (Background)',
                  defaultValue: '#F5F7FA',
                  admin: {
                    description: 'Section backgrounds, alternating sections',
                  },
                },
              ],
            },
            {
              name: 'typography',
              type: 'group',
              label: 'Typography',
              admin: {
                description: 'Control font families and text styling across the site.',
              },
              fields: [
                {
                  name: 'headingFont',
                  type: 'select',
                  label: 'Heading Font',
                  defaultValue: 'Montserrat',
                  options: [
                    { label: 'Montserrat', value: 'Montserrat' },
                    { label: 'Poppins', value: 'Poppins' },
                    { label: 'Inter', value: 'Inter' },
                    { label: 'Roboto', value: 'Roboto' },
                  ],
                },
                {
                  name: 'bodyFont',
                  type: 'select',
                  label: 'Body Font',
                  defaultValue: 'Open Sans',
                  options: [
                    { label: 'Open Sans', value: 'Open Sans' },
                    { label: 'Inter', value: 'Inter' },
                    { label: 'Roboto', value: 'Roboto' },
                    { label: 'Lato', value: 'Lato' },
                  ],
                },
              ],
            },
            {
              name: 'heroDefaults',
              type: 'group',
              label: 'Hero Defaults',
              admin: {
                description: 'Control default hero section heights and visual treatments.',
              },
              fields: [
                {
                  name: 'highImpactHeight',
                  type: 'select',
                  label: 'High Impact Height',
                  defaultValue: '100vh',
                  options: [
                    { label: 'Full Viewport (100vh)', value: '100vh' },
                    { label: 'Tall (90vh)', value: '90vh' },
                    { label: 'Medium (80vh)', value: '80vh' },
                  ],
                },
                {
                  name: 'mediumImpactHeight',
                  type: 'select',
                  label: 'Medium Impact Height (with media)',
                  defaultValue: '65vh',
                  admin: {
                    description: 'Content pages - shorter to encourage scrolling to page content',
                  },
                  options: [
                    { label: 'Tall (80vh)', value: '80vh' },
                    { label: 'Medium (70vh)', value: '70vh' },
                    { label: 'Standard (65vh)', value: '65vh' },
                    { label: 'Compact (60vh)', value: '60vh' },
                  ],
                },
                {
                  name: 'overlayOpacity',
                  type: 'select',
                  label: 'High Impact Overlay Opacity',
                  defaultValue: '60',
                  admin: {
                    description: 'Controls overlay darkness for HighImpact heroes (conversion pages)',
                  },
                  options: [
                    { label: 'Light (40%)', value: '40' },
                    { label: 'Medium (60%)', value: '60' },
                    { label: 'Dark (80%)', value: '80' },
                  ],
                },
                {
                  name: 'mediumImpactOverlayOpacity',
                  type: 'select',
                  label: 'Medium Impact Overlay Opacity',
                  defaultValue: '45',
                  admin: {
                    description: 'Controls overlay darkness for MediumImpact heroes (content pages) - lighter to feel less dominant',
                  },
                  options: [
                    { label: 'Very Light (30%)', value: '30' },
                    { label: 'Light (45%)', value: '45' },
                    { label: 'Medium (60%)', value: '60' },
                    { label: 'Dark (75%)', value: '75' },
                  ],
                },
              ],
            },
            {
              name: 'visualEffects',
              type: 'group',
              label: 'Visual Effects',
              admin: {
                description: 'Toggle visual effects and animations across the site.',
              },
              fields: [
                {
                  name: 'enableGlowEffects',
                  type: 'checkbox',
                  label: 'Enable Glow Effects',
                  defaultValue: true,
                  admin: {
                    description: 'Hover glow effects on buttons and CTAs',
                  },
                },
                {
                  name: 'enableShimmerEffects',
                  type: 'checkbox',
                  label: 'Enable Shimmer Effects',
                  defaultValue: true,
                  admin: {
                    description: 'Shimmer animations on primary buttons',
                  },
                },
                {
                  name: 'enableSmoothScrolling',
                  type: 'checkbox',
                  label: 'Enable Smooth Scrolling',
                  defaultValue: true,
                  admin: {
                    description: 'Smooth scrolling behavior for anchor links',
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
