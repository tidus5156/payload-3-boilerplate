# Allay Property Management Website

> **Professional property management website built with Payload CMS 3 + Next.js 15 + PostgreSQL**

A comprehensive, production-ready website for Allay Property Management at RE/MAX Metro Atlanta, featuring advanced property management functionality, lead capture forms, and a complete content management system.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd payload-3-boilerplate

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your values

# Generate TypeScript types
npm run generate:types

# Seed the database (optional)
npm run seed

# Start development server
npm run dev
```

Visit:
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [CLAUDE.md](./CLAUDE.md) | Project instructions for AI assistants |
| [SECURITY.md](./SECURITY.md) | Security implementation guide |
| [TESTING.md](./TESTING.md) | Testing and verification procedures |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Complete project overview |
| [API Documentation](./src/app/api/contact/README.md) | Contact API endpoint docs |

---

## ✨ Features

### Property Management Specific

- ✅ **Properties Collection**: Complete property listing system with 40+ fields
- ✅ **40+ Neighborhoods**: Metro Atlanta neighborhoods with market data
- ✅ **Lead Capture Forms**: Contact and rental analysis forms
- ✅ **Team Management**: Staff profiles with certifications
- ✅ **Client Testimonials**: Review system with video support

### Content Management

- ✅ **Page Builder**: Drag-and-drop blocks for custom layouts
- ✅ **Blog System**: Full-featured blog with categories and SEO
- ✅ **Rich Text Editor**: Lexical editor with advanced formatting
- ✅ **Draft Preview**: Live preview of unpublished content
- ✅ **SEO Optimization**: Meta tags, OpenGraph, sitemaps

### Security & Performance

- ✅ **Security Headers**: CSP, HSTS, X-Frame-Options, etc.
- ✅ **Rate Limiting**: 5 requests per minute per IP
- ✅ **CAPTCHA**: Cloudflare Turnstile integration
- ✅ **Input Sanitization**: DOMPurify + Zod validation
- ✅ **Email Notifications**: SMTP with HTML templates

---

## 🎨 Design System

### Brand Colors

```css
Deep Navy:    #1B3A6D  /* Primary brand color */
Sky Blue:     #5A9FD4  /* Secondary, links */
Warm Gold:    #C9A961  /* CTAs, accents */
Sage Green:   #7A9B76  /* Success, highlights */
Charcoal:     #2D3436  /* Body text */
Warm Gray:    #6C757D  /* Secondary text */
Light Gray:   #F5F7FA  /* Backgrounds */
```

### Typography

- **Headings**: Montserrat (Google Fonts)
- **Body**: Open Sans (Google Fonts)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (app)/                      # Public website
│   │   ├── about/
│   │   ├── areas-we-serve/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── pricing/
│   │   └── ...
│   ├── (payload)/                  # Admin panel
│   └── api/                        # API routes
│       └── contact/
├── blocks/                         # Content blocks
│   ├── Hero/
│   ├── IconGrid/
│   ├── ServicesGrid/
│   └── ...
├── collections/                    # Payload collections
│   ├── Neighborhoods/
│   ├── Properties/
│   ├── Testimonials/
│   └── ...
├── components/
│   ├── forms/                     # React forms
│   ├── layout/                    # Header/Footer
│   └── ui/                        # shadcn/ui
├── lib/
│   ├── email.ts                   # Email system
│   └── sanitize.ts                # Input sanitization
├── seed/                          # Database seeding
└── payload.config.ts              # Payload configuration
```

---

## 🗄️ Collections

### Core Collections

1. **Pages** - Flexible page builder with blocks
2. **Posts** - Blog system with categories
3. **Media** - Image and file management
4. **Categories** - Hierarchical blog categories
5. **Users** - Authentication and roles
6. **Comments** - Blog comment system

### Property Management Collections

7. **Properties** - Rental property listings
8. **Neighborhoods** - Atlanta neighborhoods with market data
9. **Testimonials** - Client reviews and ratings
10. **Team Members** - Staff profiles and bios
11. **Contact Submissions** - Lead capture and tracking

### Globals

- **Settings** - Site-wide configuration
- **Header** - Navigation menu
- **Footer** - Footer links and info

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Payload CMS
npm run generate:types   # Generate TypeScript types
npm run payload          # Access Payload CLI

# Database
npm run seed             # Seed development data
npm run seed:production  # Seed with duplicate prevention
npm run seed:reset       # Clear and re-seed database

# Utilities
npm run create-admin     # Create admin user
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
```

---

## 🌐 Environment Variables

### Required

```bash
DATABASE_URI=postgresql://user:password@localhost:5432/allay_pm
PAYLOAD_SECRET=your-secret-key-minimum-32-characters
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Optional (Email)

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
SMTP_FROM=noreply@allaypm.com
NOTIFICATION_EMAIL=info@allaypm.com
```

### Optional (Security)

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key
```

See `.env.example` for complete list.

---

## 📄 Pages

### Public Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with dynamic blocks |
| `/about` | Company story and mission |
| `/services` | Service offerings |
| `/pricing` | Pricing plans (Standard vs Premium) |
| `/property-owners` | Information for property owners |
| `/residents` | Resident resources and portal |
| `/our-process` | 6-step management process |
| `/contact` | Contact and rental analysis forms |
| `/testimonials` | Client testimonials |
| `/blog` | Blog index with categories |
| `/blog/[slug]` | Individual blog posts |
| `/areas-we-serve` | Neighborhood index |
| `/areas-we-serve/[slug]` | Neighborhood details |

### Admin Panel

- **Dashboard**: `/admin`
- **Collections**: `/admin/collections/[collection]`
- **Globals**: `/admin/globals/[global]`

---

## 🔒 Security

### Implemented Features

- ✅ **Security Headers** (CSP, HSTS, X-Frame-Options)
- ✅ **Rate Limiting** (5 req/min per IP)
- ✅ **CAPTCHA** (Cloudflare Turnstile)
- ✅ **Input Sanitization** (DOMPurify)
- ✅ **Zod Validation** (Schema validation)
- ✅ **CORS** (Environment-based restrictions)
- ✅ **HTTPS** (Enforced in production)

See [SECURITY.md](./SECURITY.md) for details.

---

## 🧪 Testing

### Manual Testing

```bash
# Start dev server
npm run dev

# In another terminal, run seed data
npm run seed

# Access admin panel
open http://localhost:3000/admin

# Test frontend pages
open http://localhost:3000
```

### Test Checklist

See [TESTING.md](./TESTING.md) for comprehensive testing procedures.

---

## 🚀 Deployment

### Railway (Recommended)

1. Connect GitHub repository
2. Add environment variables
3. Railway provides PostgreSQL automatically
4. Deploy!

### Vercel

1. Import project from GitHub
2. Add Vercel Postgres or external database
3. Configure environment variables
4. Deploy

### Manual

```bash
# Build
npm run build

# Start with PM2
pm2 start npm --name "allay-pm" -- start
```

---

## 📧 Email Setup

### Development (Mailtrap)

```bash
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-user
SMTP_PASS=your-mailtrap-pass
```

### Production (SendGrid)

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

---

## 🎯 API Routes

### POST `/api/contact`

Handles both contact and rental analysis form submissions.

**Request Body** (Contact):
```json
{
  "formType": "contact",
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "(404) 555-0100",
  "message": "I'm interested...",
  "turnstileToken": "optional"
}
```

**Request Body** (Rental Analysis):
```json
{
  "formType": "rental-analysis",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "(404) 555-0200",
  "propertyAddress": "123 Main St, Atlanta, GA",
  "bedrooms": 3,
  "bathrooms": 2.5,
  "propertyType": "single-family",
  "currentStatus": "vacant",
  "message": "Optional notes...",
  "turnstileToken": "optional"
}
```

See [API Documentation](./src/app/api/contact/README.md) for details.

---

## 🛠️ Troubleshooting

### Server won't start

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Database connection error

```bash
# Check PostgreSQL is running
brew services start postgresql  # macOS
sudo systemctl start postgresql # Linux

# Verify connection string
echo $DATABASE_URI
```

### TypeScript errors

```bash
# Regenerate types
npm run generate:types
```

See [TESTING.md](./TESTING.md#troubleshooting) for more solutions.

---

## 📊 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3
- **Database**: PostgreSQL 14+
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Email**: Nodemailer
- **CAPTCHA**: Cloudflare Turnstile
- **Sanitization**: DOMPurify

---

## 📝 License

Proprietary - © 2025 Allay Property Management

---

## 🙏 Acknowledgments

Built with:
- [Payload CMS](https://payloadcms.com)
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)

---

## 📞 Support

For questions or issues:

1. Check [TESTING.md](./TESTING.md) troubleshooting section
2. Review [Payload CMS Docs](https://payloadcms.com/docs)
3. Check [Next.js Docs](https://nextjs.org/docs)

---

**Version**: 1.0.0
**Status**: Production Ready ✅
**Last Updated**: January 2025
