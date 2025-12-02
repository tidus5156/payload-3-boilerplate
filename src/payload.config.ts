// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

// Collections
import { Categories } from './collections/Categories'
import { Comments } from './collections/Comments'
import { FAQs } from './collections/FAQs'
import { FormSubmissions } from './collections/FormSubmissions'
import { Media } from './collections/Media'
import { Neighborhoods } from './collections/Neighborhoods'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Properties } from './collections/Properties'
import { Services } from './collections/Services'
import { TeamMembers } from './collections/TeamMembers'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'

// Globals
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { Settings } from './globals/Settings'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { seed } from './endpoints/seed'
import { seedAllay } from './endpoints/seed-allay'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: false, // Disable auto-sync - use migrations instead
  }),
  collections: [
    // Core Collections
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Comments,
    // Property Management Collections
    Properties,
    Neighborhoods,
    Services,
    FormSubmissions,
    // Content Collections
    Testimonials,
    TeamMembers,
    FAQs,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Settings, Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  endpoints: [
    {
      path: '/health',
      method: 'get',
      handler: async (req) => {
        return new Response('OK', { status: 200 });
      }
    },
    {
      path: '/seed',
      method: 'get',
      handler: async (req) => {
        try {
          await seed({ payload: req.payload, req });
          return Response.json({ success: true, message: 'Database seeded successfully' });
        } catch (error: any) {
          return Response.json({ success: false, error: error.message }, { status: 500 });
        }
      }
    },
    {
      path: '/seed-allay',
      method: 'get',
      handler: async (req) => {
        try {
          await seedAllay({ payload: req.payload, req });
          return Response.json({ success: true, message: 'Allay Property Management data seeded successfully' });
        } catch (error: any) {
          return Response.json({ success: false, error: error.message }, { status: 500 });
        }
      }
    }
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
