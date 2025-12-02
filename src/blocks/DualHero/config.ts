import type { Block } from 'payload'

export const DualHero: Block = {
  slug: 'dualHero',
  interfaceName: 'DualHeroBlock',
  labels: {
    singular: 'Dual Hero',
    plural: 'Dual Heroes',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'leftPanel',
          label: 'Left Panel (Property Owners)',
          type: 'group',
          admin: {
            style: {
              borderBottom: 0,
            },
          },
          fields: [
            {
              name: 'headline',
              label: 'Headline',
              type: 'text',
              required: true,
              defaultValue: 'Your Atlanta Property. In Expert Hands.',
              admin: {
                description: 'Main headline for property owners (64-72px on desktop)',
              },
            },
            {
              name: 'subheadline',
              label: 'Subheadline',
              type: 'textarea',
              required: false,
              defaultValue: 'Local expertise. Transparent service. Properties managed with the attention yours deserves.',
              admin: {
                description: 'Supporting text below headline (20px, keep to 2-3 lines)',
              },
            },
            {
              name: 'backgroundImage',
              label: 'Background Image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description:
                  'Beautiful Atlanta rental property image (2560x1440px minimum, landscape)',
              },
            },
            {
              name: 'overlayColor',
              label: 'Overlay Color',
              type: 'select',
              defaultValue: 'deepNavy',
              options: [
                { label: 'Deep Navy Blue', value: 'deepNavy' },
                { label: 'Sky Blue', value: 'skyBlue' },
                { label: 'Dark Gray', value: 'darkGray' },
              ],
              admin: {
                description: 'Color overlay for the background image (30% opacity)',
              },
            },
            {
              name: 'overlayOpacity',
              label: 'Overlay Opacity',
              type: 'number',
              min: 0,
              max: 100,
              defaultValue: 30,
              admin: {
                description: 'Overlay opacity percentage (0-100)',
                step: 5,
              },
            },
            {
              name: 'primaryCTA',
              label: 'Primary CTA Button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  label: 'Button Text',
                  type: 'text',
                  required: true,
                  defaultValue: 'Get Free Analysis',
                },
                {
                  name: 'url',
                  label: 'Button URL',
                  type: 'text',
                  required: true,
                  defaultValue: '/contact',
                },
                {
                  name: 'openInNewTab',
                  label: 'Open in New Tab',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'secondaryCTA',
              label: 'Secondary CTA Button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  label: 'Button Text',
                  type: 'text',
                  defaultValue: 'Our Services',
                },
                {
                  name: 'url',
                  label: 'Button URL',
                  type: 'text',
                  defaultValue: '/services',
                },
                {
                  name: 'openInNewTab',
                  label: 'Open in New Tab',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'trustIndicators',
              label: 'Trust Indicators',
              type: 'array',
              maxRows: 4,
              admin: {
                description: 'Small badges showing ratings, properties managed, etc. (max 4)',
              },
              fields: [
                {
                  name: 'icon',
                  label: 'Icon',
                  type: 'select',
                  required: true,
                  options: [
                    { label: '⭐ Star', value: 'star' },
                    { label: '🏠 Home', value: 'home' },
                    { label: '🛡️ Shield', value: 'shield' },
                    { label: '✓ Check', value: 'check' },
                    { label: '👥 Users', value: 'users' },
                    { label: '📈 Trending', value: 'trending' },
                  ],
                },
                {
                  name: 'text',
                  label: 'Text',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "4.9/5 Rating" or "500+ Properties"',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'rightPanel',
          label: 'Right Panel (Residents)',
          type: 'group',
          admin: {
            style: {
              borderBottom: 0,
            },
          },
          fields: [
            {
              name: 'headline',
              label: 'Headline',
              type: 'text',
              required: true,
              defaultValue: 'Find Your Perfect Home',
              admin: {
                description: 'Main headline for residents (36-42px on desktop, smaller than owner side)',
              },
            },
            {
              name: 'subheadline',
              label: 'Subheadline',
              type: 'textarea',
              required: false,
              defaultValue: 'Quality rentals across Metro Atlanta',
              admin: {
                description: 'Supporting text below headline (16-18px)',
              },
            },
            {
              name: 'backgroundImage',
              label: 'Background Image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description:
                  'Welcoming home or happy resident image (2560x1440px minimum, landscape)',
              },
            },
            {
              name: 'overlayColor',
              label: 'Overlay Color',
              type: 'select',
              defaultValue: 'sageGreen',
              options: [
                { label: 'Sage Green', value: 'sageGreen' },
                { label: 'Sky Blue', value: 'skyBlue' },
                { label: 'Warm Gray', value: 'warmGray' },
              ],
              admin: {
                description: 'Color overlay for the background image (30% opacity)',
              },
            },
            {
              name: 'overlayOpacity',
              label: 'Overlay Opacity',
              type: 'number',
              min: 0,
              max: 100,
              defaultValue: 30,
              admin: {
                description: 'Overlay opacity percentage (0-100)',
                step: 5,
              },
            },
            {
              name: 'primaryCTA',
              label: 'Primary CTA Button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  label: 'Button Text',
                  type: 'text',
                  required: true,
                  defaultValue: 'Search Properties',
                },
                {
                  name: 'url',
                  label: 'Button URL',
                  type: 'text',
                  required: true,
                  defaultValue: '/properties',
                },
                {
                  name: 'openInNewTab',
                  label: 'Open in New Tab',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'subtext',
              label: 'Sub-text (below button)',
              type: 'text',
              defaultValue: 'View 120+ Available Homes',
              admin: {
                description: 'Small text below the CTA button (optional)',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'mobileLabels',
      label: 'Mobile Section Labels',
      type: 'group',
      admin: {
        description: 'Labels shown on mobile to distinguish sections',
      },
      fields: [
        {
          name: 'ownerLabel',
          label: 'Owner Section Label',
          type: 'text',
          defaultValue: 'PROPERTY OWNERS',
          admin: {
            description: 'Small uppercase label for owner section on mobile',
          },
        },
        {
          name: 'residentLabel',
          label: 'Resident Section Label',
          type: 'text',
          defaultValue: 'LOOKING FOR A HOME?',
          admin: {
            description: 'Small uppercase label for resident section on mobile',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Advanced Settings',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'desktopSplit',
          label: 'Desktop Split Ratio',
          type: 'select',
          defaultValue: '60-40',
          options: [
            { label: '60% Owners / 40% Residents (Recommended)', value: '60-40' },
            { label: '50% / 50% (Equal)', value: '50-50' },
            { label: '65% Owners / 35% Residents', value: '65-35' },
            { label: '70% Owners / 30% Residents', value: '70-30' },
          ],
          admin: {
            description: 'Width distribution between owner and resident panels on desktop',
          },
        },
        {
          name: 'minHeight',
          label: 'Minimum Height',
          type: 'select',
          defaultValue: '85vh',
          options: [
            { label: '70vh (Compact)', value: '70vh' },
            { label: '85vh (Default - Recommended)', value: '85vh' },
            { label: '100vh (Full Screen)', value: '100vh' },
          ],
          admin: {
            description: 'Minimum height of the hero section on desktop',
          },
        },
        {
          name: 'mobileLayout',
          label: 'Mobile Layout',
          type: 'select',
          defaultValue: 'stack',
          options: [
            { label: 'Stack (Owners First, then Residents)', value: 'stack' },
            { label: 'Stack (Residents First, then Owners)', value: 'stackReverse' },
          ],
          admin: {
            description: 'How to display the two panels on mobile devices',
          },
        },
        {
          name: 'showScrollIndicator',
          label: 'Show Scroll Indicator',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show animated down arrow at bottom of hero',
          },
        },
        {
          name: 'enableParallax',
          label: 'Enable Parallax Effect',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Background images move slightly on scroll (subtle effect)',
          },
        },
      ],
    },
  ],
}
