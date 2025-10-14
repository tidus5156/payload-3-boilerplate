import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

export const Neighborhoods: CollectionConfig = {
  slug: 'neighborhoods',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'propertiesManaged'],
    group: 'Property Management',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      return !!user
    },
    update: ({ req: { user } }) => {
      return !!user
    },
    delete: ({ req: { user } }) => {
      return !!user
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Buckhead',
              },
            },
            ...slugField(),
            {
              name: 'region',
              type: 'select',
              required: true,
              options: [
                { label: 'North Atlanta', value: 'north' },
                { label: 'South Atlanta', value: 'south' },
                { label: 'East Atlanta', value: 'east' },
                { label: 'West Atlanta', value: 'west' },
                { label: 'Central/Midtown', value: 'central' },
                { label: 'Perimeter', value: 'perimeter' },
              ],
            },
            {
              name: 'county',
              type: 'text',
              admin: {
                placeholder: 'Fulton County',
              },
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              admin: {
                description: 'Comprehensive neighborhood description (2-3 paragraphs)',
              },
            },
          ],
        },
        {
          label: 'Market Data',
          fields: [
            {
              name: 'marketData',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'averageRent1BR',
                      type: 'number',
                      label: 'Avg. Rent (1 BR)',
                      min: 0,
                      admin: {
                        placeholder: '1500',
                      },
                    },
                    {
                      name: 'averageRent2BR',
                      type: 'number',
                      label: 'Avg. Rent (2 BR)',
                      min: 0,
                      admin: {
                        placeholder: '2000',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'averageRent3BR',
                      type: 'number',
                      label: 'Avg. Rent (3 BR)',
                      min: 0,
                      admin: {
                        placeholder: '2500',
                      },
                    },
                    {
                      name: 'averageRent4BR',
                      type: 'number',
                      label: 'Avg. Rent (4+ BR)',
                      min: 0,
                      admin: {
                        placeholder: '3200',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'averageVacancyRate',
                      type: 'number',
                      label: 'Vacancy Rate (%)',
                      min: 0,
                      max: 100,
                      admin: {
                        placeholder: '4.5',
                        step: 0.1,
                      },
                    },
                    {
                      name: 'averageDaysOnMarket',
                      type: 'number',
                      label: 'Avg. Days on Market',
                      min: 0,
                      admin: {
                        placeholder: '15',
                      },
                    },
                  ],
                },
                {
                  name: 'propertiesManaged',
                  type: 'number',
                  label: 'Properties We Manage',
                  defaultValue: 0,
                  min: 0,
                  admin: {
                    description: 'Number of properties Allay manages in this neighborhood',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Schools & Amenities',
          fields: [
            {
              name: 'topSchools',
              type: 'array',
              fields: [
                {
                  name: 'schoolName',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'Sarah Smith Elementary School',
                  },
                },
                {
                  name: 'schoolType',
                  type: 'select',
                  options: [
                    { label: 'Elementary', value: 'elementary' },
                    { label: 'Middle School', value: 'middle' },
                    { label: 'High School', value: 'high' },
                    { label: 'Private', value: 'private' },
                  ],
                },
                {
                  name: 'rating',
                  type: 'number',
                  min: 1,
                  max: 10,
                  admin: {
                    placeholder: '9',
                    description: 'GreatSchools rating (1-10)',
                  },
                },
              ],
              admin: {
                initCollapsed: true,
              },
            },
            {
              name: 'nearbyAttractions',
              type: 'array',
              fields: [
                {
                  name: 'attraction',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'Piedmont Park',
                  },
                },
                {
                  name: 'category',
                  type: 'select',
                  options: [
                    { label: 'Park/Recreation', value: 'park' },
                    { label: 'Shopping', value: 'shopping' },
                    { label: 'Dining', value: 'dining' },
                    { label: 'Entertainment', value: 'entertainment' },
                    { label: 'Transit', value: 'transit' },
                  ],
                },
              ],
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          label: 'Transportation',
          fields: [
            {
              name: 'commuteTimes',
              type: 'group',
              fields: [
                {
                  name: 'commuteToMidtown',
                  type: 'text',
                  label: 'To Midtown',
                  admin: {
                    placeholder: '10 minutes',
                  },
                },
                {
                  name: 'commuteToDowntown',
                  type: 'text',
                  label: 'To Downtown',
                  admin: {
                    placeholder: '15 minutes',
                  },
                },
                {
                  name: 'commuteToAirport',
                  type: 'text',
                  label: 'To Airport',
                  admin: {
                    placeholder: '25 minutes',
                  },
                },
                {
                  name: 'commuteToPerimeterMall',
                  type: 'text',
                  label: 'To Perimeter',
                  admin: {
                    placeholder: '20 minutes',
                  },
                },
              ],
            },
            {
              name: 'martaAccess',
              type: 'select',
              label: 'MARTA Access',
              options: [
                { label: 'No Direct Access', value: 'none' },
                { label: 'Bus Route', value: 'bus' },
                { label: 'Rail Station (walking distance)', value: 'rail-walk' },
                { label: 'Rail Station (in neighborhood)', value: 'rail-near' },
              ],
              defaultValue: 'none',
            },
          ],
        },
        {
          label: 'SEO & Media',
          fields: [
            {
              name: 'metaDescription',
              type: 'textarea',
              maxLength: 160,
              admin: {
                description: 'SEO meta description (max 160 characters)',
                placeholder: 'Discover rental properties in [Neighborhood]. Learn about schools, amenities, and average rents.',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Hero image for neighborhood page',
              },
            },
            {
              name: 'gallery',
              type: 'array',
              maxRows: 10,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in featured neighborhoods section',
      },
    },
  ],
  timestamps: true,
}
