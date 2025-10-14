import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'address',
    defaultColumns: ['address', 'neighborhood', 'rent', 'status', 'availableDate'],
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
              name: 'address',
              type: 'text',
              required: true,
              admin: {
                placeholder: '123 Main Street, Atlanta, GA 30303',
              },
            },
            {
              name: 'neighborhood',
              type: 'relationship',
              relationTo: 'neighborhoods',
              required: true,
              hasMany: false,
            },
            {
              name: 'propertyType',
              type: 'select',
              required: true,
              options: [
                { label: 'Single Family Home', value: 'single-family' },
                { label: 'Condo', value: 'condo' },
                { label: 'Townhome', value: 'townhome' },
                { label: 'Multi-Family (2-4 units)', value: 'multi-family' },
                { label: 'Apartment', value: 'apartment' },
              ],
              defaultValue: 'single-family',
            },
            {
              name: 'status',
              type: 'select',
              required: true,
              options: [
                { label: 'Available', value: 'available' },
                { label: 'Pending', value: 'pending' },
                { label: 'Leased', value: 'leased' },
                { label: 'Maintenance', value: 'maintenance' },
              ],
              defaultValue: 'available',
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'availableDate',
              type: 'date',
              required: true,
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'rent',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: {
                    placeholder: '2500',
                    description: 'Monthly rent amount',
                  },
                },
                {
                  name: 'deposit',
                  type: 'number',
                  min: 0,
                  admin: {
                    placeholder: '2500',
                    description: 'Security deposit amount',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'bedrooms',
                  type: 'number',
                  required: true,
                  min: 0,
                  max: 20,
                },
                {
                  name: 'bathrooms',
                  type: 'number',
                  required: true,
                  min: 0,
                  max: 20,
                  admin: {
                    step: 0.5,
                  },
                },
                {
                  name: 'squareFeet',
                  type: 'number',
                  min: 0,
                  admin: {
                    placeholder: '1500',
                  },
                },
              ],
            },
            {
              name: 'description',
              type: 'richText',
              admin: {
                description: 'Detailed property description for listings',
              },
            },
          ],
        },
        {
          label: 'Features & Amenities',
          fields: [
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                initCollapsed: true,
                description: 'Property features (e.g., Hardwood Floors, Granite Countertops)',
              },
            },
            {
              name: 'amenities',
              type: 'group',
              fields: [
                {
                  name: 'petFriendly',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'parking',
                  type: 'select',
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'Street', value: 'street' },
                    { label: 'Driveway', value: 'driveway' },
                    { label: 'Garage (1 car)', value: 'garage-1' },
                    { label: 'Garage (2 car)', value: 'garage-2' },
                    { label: 'Garage (3+ car)', value: 'garage-3plus' },
                  ],
                  defaultValue: 'street',
                },
                {
                  name: 'laundry',
                  type: 'select',
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'In-Unit', value: 'in-unit' },
                    { label: 'Shared/Common Area', value: 'shared' },
                    { label: 'Hookups Only', value: 'hookups' },
                  ],
                  defaultValue: 'none',
                },
                {
                  name: 'cooling',
                  type: 'checkbox',
                  label: 'Air Conditioning',
                  defaultValue: true,
                },
                {
                  name: 'heating',
                  type: 'checkbox',
                  label: 'Central Heating',
                  defaultValue: true,
                },
                {
                  name: 'yard',
                  type: 'checkbox',
                  label: 'Yard/Outdoor Space',
                  defaultValue: false,
                },
                {
                  name: 'pool',
                  type: 'checkbox',
                  label: 'Pool Access',
                  defaultValue: false,
                },
                {
                  name: 'gym',
                  type: 'checkbox',
                  label: 'Gym/Fitness Center',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'images',
              type: 'array',
              required: true,
              minRows: 1,
              maxRows: 30,
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
                  admin: {
                    placeholder: 'Living room with hardwood floors',
                  },
                },
              ],
              admin: {
                description: 'Property photos (first image will be the main listing photo)',
              },
            },
            {
              name: 'virtualTourUrl',
              type: 'text',
              admin: {
                placeholder: 'https://my.matterport.com/show/?m=xxxxx',
                description: 'Link to 3D virtual tour (Matterport, etc.)',
              },
            },
          ],
        },
        {
          label: 'Internal Notes',
          fields: [
            {
              name: 'internalNotes',
              type: 'textarea',
              admin: {
                description: 'Private notes for property managers (not displayed publicly)',
              },
            },
            {
              name: 'ownerContact',
              type: 'group',
              admin: {
                description: 'Property owner information (private)',
              },
              fields: [
                {
                  name: 'ownerName',
                  type: 'text',
                },
                {
                  name: 'ownerEmail',
                  type: 'email',
                },
                {
                  name: 'ownerPhone',
                  type: 'text',
                },
              ],
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
        description: 'Show on homepage and featured listings',
      },
    },
  ],
  timestamps: true,
}
