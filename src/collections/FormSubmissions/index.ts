import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'formType', 'status', 'createdAt'],
    group: 'Property Management',
    defaultSort: '-createdAt',
  },
  access: {
    read: ({ req: { user } }) => {
      return !!user
    },
    create: () => true, // Allow public form submissions
    update: ({ req: { user } }) => {
      return !!user
    },
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'formType',
          type: 'select',
          required: true,
          options: [
            { label: 'Rental Analysis Request', value: 'rental-analysis' },
            { label: 'General Contact', value: 'contact' },
            { label: 'Consultation Request', value: 'consultation' },
            { label: 'Resident Inquiry', value: 'resident-inquiry' },
          ],
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'new',
          options: [
            { label: 'New', value: 'new' },
            { label: 'Contacted', value: 'contacted' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'Converted', value: 'converted' },
            { label: 'Not Interested', value: 'not-interested' },
            { label: 'Spam', value: 'spam' },
          ],
          admin: {
            position: 'sidebar',
          },
        },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      name: 'propertyInfo',
      type: 'group',
      label: 'Property Information',
      admin: {
        condition: (data) => data.formType === 'rental-analysis',
      },
      fields: [
        {
          name: 'propertyAddress',
          type: 'text',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'bedrooms',
              type: 'number',
              min: 0,
            },
            {
              name: 'bathrooms',
              type: 'number',
              min: 0,
              admin: {
                step: 0.5,
              },
            },
          ],
        },
        {
          name: 'propertyType',
          type: 'select',
          options: [
            { label: 'Single Family Home', value: 'single-family' },
            { label: 'Condo', value: 'condo' },
            { label: 'Townhome', value: 'townhome' },
            { label: 'Multi-Family', value: 'multi-family' },
          ],
        },
        {
          name: 'currentStatus',
          type: 'select',
          options: [
            { label: 'Currently Rented', value: 'rented' },
            { label: 'Vacant', value: 'vacant' },
            { label: 'Owner Occupied', value: 'owner-occupied' },
          ],
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'UTM source or referral source',
        readOnly: true,
      },
    },
    {
      name: 'metadata',
      type: 'group',
      label: 'Submission Metadata',
      admin: {
        description: 'Automatically captured data',
      },
      fields: [
        {
          name: 'ipAddress',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'userAgent',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'referrer',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        description: 'Private notes for follow-up',
      },
    },
  ],
  timestamps: true,
}
