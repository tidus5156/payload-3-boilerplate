/# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**This is a fully customized Allay Property Management website** built with Payload CMS V3, designed for deployment on Railway with PostgreSQL database support. It's a production-ready Next.js application combining a headless CMS backend with a professional property management frontend.

**IMPORTANT: This is NOT a generic boilerplate** - it has been specifically built for Allay Property Management at RE/MAX Metro Atlanta with custom collections, blocks, branding, and seed data.

## Development Commands

### Essential Commands
- `pnpm dev` or `npm run dev` - Start development server (runs Next.js with Payload admin)
- `pnpm build` or `npm run build` - Build for production (runs migrations then builds Next.js)
- `pnpm start` or `npm run start` - Start production server
- `pnpm lint` or `npm run lint` - Run ESLint
- `pnpm lint:fix` or `npm run lint:fix` - Run ESLint and auto-fix issues

### Payload-Specific Commands
- `pnpm payload` or `npm run payload` - Access Payload CLI
- `pnpm generate:types` or `npm run generate:types` - Generate TypeScript types from Payload collections
- `pnpm generate:importmap` or `npm run generate:importmap` - Generate import map for admin UI
- `pnpm dev:prod` or `npm run dev:prod` - Clean build and start (removes .next directory first)

### Package Management
- `pnpm ii` or `npm run ii` - Install dependencies (ignores workspace)
- `pnpm reinstall` or `npm run reinstall` - Clean reinstall (removes node_modules and lockfile)

## Architecture

### Next.js App Router Structure
- **`src/app/(frontend)/`** - Public-facing website routes (uses Next.js App Router with route groups)
- **`src/app/(payload)/`** - Payload CMS admin panel routes
- Frontend and admin are separated using route groups for isolated layouts

### Payload CMS Configuration
- **Main config**: `src/payload.config.ts` - Central configuration for database, collections, globals, plugins
- **Collections**: `src/collections/` - Defines content models (Pages, Posts, Media, Categories, Users, Comments)
- **Globals**: Header and Footer configurations for site-wide content
- **Database**: PostgreSQL via `@payloadcms/db-postgres` adapter

### Collections Overview

**Core CMS Collections:**
- **Pages** (`src/collections/Pages/`) - Flexible page builder with hero and layout blocks
- **Posts** (`src/collections/Posts/`) - Blog posts with categories and premium content gating
- **Media** - Image/file management with size variants
- **Categories** - Hierarchical categories using nested-docs plugin
- **Users** - Authentication with role-based access control (admins and users)

**Allay Property Management Collections:**
- **Properties** (`src/collections/Properties/`) - Rental property listings with full details, amenities, images, status tracking
- **Neighborhoods** (`src/collections/Neighborhoods/`) - Metro Atlanta neighborhoods with market data, schools, commute times
- **TeamMembers** (`src/collections/TeamMembers/`) - Allay team profiles with bios, certifications, contact info
- **Testimonials** (`src/collections/Testimonials/`) - Property owner testimonials and reviews
- **FAQs** (`src/collections/FAQs/`) - Frequently asked questions for property owners and residents
- **FormSubmissions** (`src/collections/FormSubmissions/`) - Lead capture from contact forms

### Content Architecture
- **Blocks** (`src/blocks/`) - Reusable content blocks for layout builder:
  - Archive, Banner, CallToAction, Code, Content, Form, MediaBlock, RelatedPosts
  - Used in Pages and Posts via `layout` field
  - Each block has a config file and React component
- **Heros** (`src/heros/`) - Hero section variants:
  - HighImpact, MediumImpact, LowImpact, PostHero
  - Configured per-page in the Hero tab
- **Fields** (`src/fields/`) - Reusable field configurations (slug, defaultLexical editor)

### Access Control Pattern
- **`src/access/authenticated.ts`** - Requires user to be logged in
- **`src/access/authenticatedOrPublished.ts`** - Public can see published content, authenticated users see all
- Applied at collection level in collection configs
- Premium content uses additional access rules in Posts collection

### Plugin Configuration
Located in `src/plugins/index.ts`:
- **SEO Plugin** - Auto-generates meta tags and OpenGraph data
- **Redirects Plugin** - Manages URL redirects for Pages and Posts
- **Nested Docs Plugin** - Enables hierarchical Categories
- **Form Builder Plugin** - Creates forms with Lexical editor
- **Search Plugin** - Full-text search on Posts collection
- **Payload Cloud Plugin** - Integration for Payload Cloud hosting

### Frontend Rendering
- **RenderBlocks** (`src/blocks/RenderBlocks.tsx`) - Dynamically renders layout blocks
- **RenderHero** (`src/heros/RenderHero.tsx`) - Renders hero variants
- Each block/hero has corresponding React component in its directory
- Uses Server Components by default with draft preview support

### Hooks
- **`src/hooks/populatePublishedAt`** - Auto-sets publishedAt date
- **`src/hooks/revalidateRedirects`** - Revalidates Next.js cache on redirect changes
- Collection-specific hooks in collection directories (e.g., `Pages/hooks/revalidatePage.ts`)

### Key Features Implementation
- **Draft Preview** - Live preview configured in collection admin settings with autosave every 100ms
- **Live Preview** - `LivePreviewListener` component in frontend layout
- **Admin Bar** - Shows draft mode controls on frontend (`AdminBar` component)
- **Authentication** - JWT-based auth with jsonwebtoken package
- **Comments System** - User-submitted comments requiring admin approval (Comments collection)
- **Premium Content** - Access-controlled content for authenticated users in Posts

### Environment Variables
Required in `.env`:
- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Used to encrypt JWT tokens
- `NEXT_PUBLIC_SERVER_URL` - Base URL for links and CORS (no trailing slash)

### Path Aliases
Configured in `tsconfig.json`:
- `@/*` - Maps to `src/*`
- `@payload-config` - Maps to `src/payload.config.ts`

### Styling
- TailwindCSS configured with shadcn/ui patterns
- Global styles in `src/app/(frontend)/globals.css`
- Uses Geist font family (Sans and Mono)
- CSS variables defined in `src/cssVariables.js`

### Type Generation
- Run `pnpm generate:types` after modifying collections/globals
- Generated types in `src/payload-types.ts`
- Collections use TypeScript generics for type safety (e.g., `CollectionConfig<'pages'>`)

### Utilities
Located in `src/utilities/`:
- **`getDocument.ts`** - Fetch single document with draft support
- **`getMeUser.ts`** - Get current authenticated user
- **`getGlobals.ts`** - Fetch global data (Header/Footer)
- **`generatePreviewPath.ts`** - Generate draft preview URLs
- **`getURL.ts`** - Get server/client URLs for environment

### Important Patterns
- Always use `authenticatedOrPublished` access for public content collections
- Use `@/` import alias instead of relative paths
- Revalidation hooks are critical - they trigger Next.js cache updates when CMS content changes
- Collections that support draft preview need `livePreview` config and `generatePreviewPath`
- Admin components use `beforeLogin` and `beforeDashboard` for custom admin UI

## Seed Data System

**IMPORTANT: The Allay website content already exists as seed data!**

### Seed Data Location
- **Homepage**: `src/seed/pages/homepage.ts` - Complete homepage with all blocks configured
- **Settings**: `src/seed/settings.ts` - Site-wide settings (phone, email, social media, RE/MAX branding)
- **Team Members**: `src/seed/team.ts` - Team member profiles
- **Testimonials**: `src/seed/testimonials.ts` - Client testimonials
- **Neighborhoods**: `src/seed/neighborhoods.ts` - Metro Atlanta neighborhoods with market data
- **FAQs**: `src/seed/faqs.ts` - Frequently asked questions
- **Header**: `src/seed/header.ts` - Navigation menu items

### Production Seed Script
**Location**: `src/seed/production.ts`

**To populate the database with Allay content:**
```bash
pnpm tsx src/seed/production.ts
# or
npm run seed:production
```

**What it seeds:**
1. Settings Global (contact info, social media, RE/MAX branding)
2. Team Members collection
3. Testimonials collection
4. Neighborhoods collection (Metro Atlanta areas with market data)
5. Categories collection (for blog posts)
6. Homepage (complete with all sections: hero, icon grid, services, testimonials, pricing, FAQs, CTAs)
7. Header navigation

**Note:** The production seed script has safeguards to prevent duplicate data. It will only run if the database is empty.

### Reset and Reseed
If you need to clear and repopulate:
```bash
pnpm run seed:reset
# This clears all data and reseeds from scratch
```

### Development Workflow
1. **First time setup**: Run `pnpm tsx src/seed/production.ts` to populate database
2. **Make changes**: Edit CMS content through admin panel at `/admin`
3. **Update seed data**: If you want to preserve changes as default seed data, update files in `src/seed/`
4. **Test fresh install**: Use `seed:reset` to verify seed data is correct

---

# ALLAY PROPERTY MANAGEMENT PROJECT REQUIREMENTS

## **PROJECT OVERVIEW**

Create a high-converting, modern property management website for Allay Property Management at RE/MAX Metro Atlanta. This website should position Allay as the premium choice for property owners in Metro Atlanta while showcasing local expertise, transparent pricing, and guaranteed results.

**Target Audience:** Property owners/investors in Metro Atlanta with single-family rental properties
**Primary Goal:** Generate qualified leads for property management services
**Secondary Goal:** Showcase available rental properties for prospective residents

-----

## **BRAND IDENTITY & DESIGN SYSTEM**

### **Color Palette: "Modern Professional"**

**Primary Colors:**

- **Deep Navy Blue**: `#1B3A6D` - Main brand color (trust, stability, professionalism)
  - Use for: Headers, main headlines, footer background, primary branding
- **Sky Blue**: `#5A9FD4` - Accent/interactive color (approachable, modern)
  - Use for: Links, icons, hover states, secondary elements

**Secondary/Accent Colors:**

- **Warm Gold**: `#C9A961` - Premium accent (sophistication, value, success)
  - Use for: Primary CTA buttons, highlights, premium features, star ratings
- **Sage Green**: `#7A9B76` - Success indicator (growth, prosperity)
  - Use for: Checkmarks, guarantees, positive stats, success stories

**Neutrals:**

- **Charcoal**: `#2D3436` - Primary text color
- **Warm Gray**: `#6C757D` - Body text, secondary information
- **Light Gray**: `#F5F7FA` - Section backgrounds, alternating sections
- **White**: `#FFFFFF` - Primary background

### **Typography**

**Headings:**

- Font: Montserrat or Poppins (Bold, Semi-Bold)
- Color: Deep Navy Blue `#1B3A6D`
- Hierarchy:
  - H1: 48-60px (mobile: 32-36px)
  - H2: 36-42px (mobile: 28-32px)
  - H3: 28-32px (mobile: 24-28px)
  - H4: 22-24px (mobile: 20-22px)

**Body Text:**

- Font: Open Sans or Inter (Regular, Medium)
- Color: Warm Gray `#6C757D`
- Size: 16-18px (mobile: 16px)
- Line height: 1.6-1.8

### **Button Styles**

**Primary CTA:**

- Background: Warm Gold `#C9A961`
- Text: Deep Navy Blue `#1B3A6D`
- Font: Bold, 16-18px
- Padding: 16px 32px
- Border radius: 6px
- Hover: Darker Gold `#B8985F` with subtle lift shadow

**Secondary CTA:**

- Background: Sky Blue `#5A9FD4`
- Text: White `#FFFFFF`
- Same dimensions as primary
- Hover: Deep Navy Blue `#1B3A6D` background

**Tertiary/Ghost CTA:**

- Background: Transparent
- Border: 2px solid Sky Blue `#5A9FD4`
- Text: Sky Blue `#5A9FD4`
- Hover: Sky Blue background, White text

### **Design Principles**

1. **White Space**: Generous padding and margins - never cramped
1. **Card-Based Layout**: Modern, clean cards with subtle shadows
1. **Mobile-First**: Design for mobile, enhance for desktop
1. **Fast Loading**: All images optimized, lazy loading enabled
1. **Accessibility**: WCAG 2.1 AA compliant minimum
1. **Professional Photography**: Real properties, real people, no stock photos

-----

## **CRITICAL LANGUAGE & MESSAGING GUIDELINES**

### **Terminology Standards (ALWAYS USE):**

**✓ CORRECT TERMS:**

- "Residents" (not tenants or renters - except in legal contexts)
- "Property owners" or "homeowners" (not landlords)
- "Investment property" or "rental property"
- "Property management services"
- "Lease agreement" (not rental agreement)
- "Move-in" and "move-out"
- "Maintenance coordination"

**✗ AVOID:**

- "Tenants" (except in legal/technical contexts)
- "Landlords" (negative connotation)
- "Renters" (minimize use)

### **Key Messaging Framework**

**Value Propositions (Use Throughout Site):**

1. "Stress less, earn more"
1. "Local expertise, backed by RE/MAX resources"
1. "Transparent pricing, guaranteed results"
1. "We protect your investment and maximize your income"
1. "Your property deserves expert care"

**Emotional Triggers (Incorporate Naturally):**

- Peace of mind
- Maximize return
- Protect investment
- Stress-free ownership
- Passive income
- Financial freedom
- Expert care
- Proven results

**Tone & Voice:**

- Professional but approachable
- Confident without arrogance
- Helpful, educational tone
- Use "we" and "you" (conversational)
- Avoid jargon when possible
- Be specific with numbers and guarantees

-----

## **COMPLETE WEBSITE STRUCTURE**

### **SITE NAVIGATION**

**Main Header:**

```
[Allay Logo] | Services ▼ | Property Owners ▼ | Residents ▼ | About | Resources | Contact | [Get Free Analysis - CTA Button]
```

**Services Dropdown:**

- Full-Service Property Management
- Tenant Placement Services
- Lease Renewal Services
- Property Marketing
- Maintenance Coordination
- Financial Reporting

**Property Owners Dropdown:**

- Why Choose Allay
- Our Process
- Pricing & Fees
- Owner Portal
- Testimonials
- FAQs for Owners
- Get Started

**Residents Dropdown:**

- Search Available Properties
- Apply Online
- Resident Portal Login
- Pay Rent Online
- Submit Maintenance Request
- Resident Resources
- FAQs for Residents

### **Footer Structure**

**Four Columns:**

**Column 1: Property Owners**

- Why Choose Us
- Our Services
- Pricing & Fees
- Our Process
- Testimonials
- Owner Portal Login
- Get Started

**Column 2: Residents**

- Search Properties
- Apply for Property
- Resident Portal Login
- Pay Rent Online
- Submit Maintenance
- Resident Resources

**Column 3: Company**

- About Allay
- Our Team
- Areas We Serve
- Blog & Resources
- Careers
- Contact Us
- Privacy Policy

**Column 4: Connect**

- Phone: (XXX) XXX-XXXX (click-to-call on mobile)
- Email: info@allaypm.com
- Office Address: [Address]
- Office Hours: Mon-Fri 9AM-6PM
- [Social Media Icons]
- Owner Portal Login
- Resident Portal Login

**Bottom Bar:**

- Left: "© 2025 Allay Property Management at RE/MAX Metro Atlanta | Licensed in Georgia | License #[Number]"
- Right: Terms of Service | Privacy Policy | Accessibility Statement
- SEO Bar: "Serving Atlanta, Buckhead, Decatur, Sandy Springs, Roswell, [25 more cities]"

-----

## **PAGE-BY-PAGE SPECIFICATIONS**

### **HOMEPAGE** (`/` or `/index`)

**Section 1: HERO (Full-width, Above Fold)**

**Background:**

- Full-width professional photo: Beautiful Atlanta home with happy family OR upscale property exterior
- Semi-transparent Deep Navy Blue overlay (40% opacity)

**Content (Centered, White Text):**

```
MAIN HEADLINE (H1, 48-54px, Bold, White):
"Atlanta Property Management That Actually Maximizes Your Investment"

SUBHEADLINE (H2, 20-24px, Regular, White with slight transparency):
"Local expertise. RE/MAX resources. Guaranteed results. We make owning rental property in Atlanta stress-free and profitable."

TWO CTA BUTTONS (Side by side):
[Get Free Rental Analysis] (Gold button)
[Schedule Consultation] (White outlined button)

TRUST BAR (Small text, white, icons):
"⭐ Managing [X] properties | 💰 $[X]M+ rent collected | ⭐ 4.9★ rating | 🏆 NARPM Member"
```

**Design Notes:**

- Mobile: Stack buttons vertically
- Image should be bright, professional, high-quality
- Hero should be 70-80vh height
- Subtle scroll indicator at bottom

-----

**Section 2: CREDIBILITY BADGES (Light Gray Background)**

**Content:**

- Single row of 5-6 logo badges
- Logos: RE/MAX Metro Atlanta, BBB (A+ Rating), NARPM, Google Reviews (5★), Atlanta Board of Realtors, Georgia Association of Realtors
- Grayscale logos with subtle color on hover
- Caption below: "Trusted by Metro Atlanta property owners since [Year]"

-----

**Section 3: THE ALLAY ADVANTAGE (White Background)**

**Headline (Centered):**

```
H2: "Why Atlanta Property Owners Choose Allay"
Subhead: "We combine local expertise with national resources to deliver results other property managers simply can't match"
```

**4-Column Icon Grid:**

**Column 1:**

```
ICON: Map marker (Sky Blue circle background)
HEADLINE: "Deep Atlanta Expertise"
BODY: "Born and raised in Metro Atlanta. We know every neighborhood, school district, and exactly what residents want. Our local knowledge maximizes your rental income."
```

**Column 2:**

```
ICON: Building/network (Sky Blue circle background)
HEADLINE: "RE/MAX Resources"
BODY: "Backed by RE/MAX Metro Atlanta's powerful network, cutting-edge technology, and market reach. Advantages most property managers can't offer."
```

**Column 3:**

```
ICON: Shield with checkmark (Sage Green circle background)
HEADLINE: "Guaranteed Results"
BODY: "Your property leased in 30 days or we reduce fees. If our resident leaves within 12 months, we find the next one free. No risk, just results."
```

**Column 4:**

```
ICON: Dollar sign with transparency symbol (Sage Green circle background)
HEADLINE: "Transparent Pricing"
BODY: "No hidden fees. Ever. One simple monthly rate plus our success-based leasing fee. See exactly what you'll pay before you commit."
```

**CTA Below (Centered):**

```
[Calculate Your ROI] (Gold button)
```

**Design Notes:**

- Mobile: Stack to single column
- Icons should be consistent style (line icons, not solid)
- Cards have subtle hover effect (slight lift + shadow)
- Equal height columns

-----

**Section 4: VIDEO TESTIMONIAL (Light Gray Background)**

**Content:**

```
H2 (Centered): "See Why Property Owners Love Working With Allay"

VIDEO EMBED (16:9 ratio, centered):
- Professional testimonial video (2-3 minutes)
- Thumbnail shows property owner headshot
- Play button overlay

CAPTION BELOW:
"Hear from [Name], owner of [X] properties in [Neighborhood], about their experience with Allay Property Management"

STATS ROW (3 columns below video):
Column 1: "[X]% Average Occupancy Rate"
Column 2: "[X] Days Average Time to Lease"
Column 3: "$[X]K Average Annual Income Per Property"

[View More Success Stories] (Sky Blue button)
```

-----

**Section 5: OUR PROVEN PROCESS (White Background)**

**Headline:**

```
H2 (Centered): "From Vacant to Profitable in 4 Simple Steps"
Subhead: "Our proven system consistently delivers faster leasing and better residents than the competition"
```

**Visual Timeline (Horizontal on desktop, vertical on mobile):**

**Step 1: ANALYZE**

```
ICON: Magnifying glass with chart (Gold circle)
HEADING: "Free Rental Analysis"
BODY: "Comprehensive market analysis, pricing strategy, and property evaluation. We determine the optimal rent price to maximize income while minimizing vacancy."
```

**Step 2: PREPARE**

```
ICON: Clipboard with checkmark (Gold circle)
HEADING: "Property Optimization"
BODY: "Pre-marketing inspection and recommendations to make your property shine. Small improvements = significantly higher rent and better residents."
```

**Step 3: MARKET**

```
ICON: Megaphone/broadcast (Gold circle)
HEADING: "Professional Marketing"
BODY: "Professional photography, compelling listings, syndication to 30+ sites including Zillow and Realtor.com, showing coordination, and lead management."
```

**Step 4: PLACE**

```
ICON: User with checkmark (Gold circle)
HEADING: "Rigorous Screening"
BODY: "Comprehensive credit, criminal, eviction, employment, and rental history checks. Only top-qualified residents approved. Lease execution and move-in coordination."
```

**Ongoing Management Box (Full-width, Sky Blue background):**

```
ICON: Circular arrows (White)
HEADING: "Then We Handle Everything"
SUBHEADING: "Rent collection • Maintenance coordination • Inspections • Financial reporting • Legal compliance • 24/7 support"
```

**CTA:**

```
[Get Started Today] (Gold button)
```

-----

**Section 6: COMPREHENSIVE SERVICES (Light Gray Background)**

**Headline:**

```
H2 (Centered): "Everything You Need, All Under One Roof"
Subhead: "Full-service property management means you truly have zero responsibilities"
```

**8-Item Grid (4 columns on desktop, 2 on tablet, 1 on mobile):**

Each service card includes:

- Icon (Sky Blue)
- Service name (H4, Deep Navy)
- 2-3 sentence description (Warm Gray)
- "Learn More →" link (Sky Blue)

**Services:**

1. **Marketing & Advertising**: Professional photography, virtual tours, 30+ listing sites, rental rate optimization
1. **Tenant Screening**: Credit, criminal, eviction, employment verification, rental history, income verification
1. **Rent Collection**: ACH auto-payments, online portal, late fee enforcement, delinquency management
1. **Maintenance Coordination**: 24/7 emergency line, vetted vendor network, preventive maintenance, cost control
1. **Financial Reporting**: Monthly owner statements, online portal access, annual tax documents, transparent accounting
1. **Legal Compliance**: Georgia-specific leases, eviction support, fair housing expertise, legal updates
1. **Property Inspections**: Move-in, quarterly drive-bys, move-out with photo documentation, issue prevention
1. **Turnover Management**: Cleaning coordination, repairs, re-listing, minimal vacancy periods

**CTA:**

```
[View All Services in Detail] (Sky Blue button)
```

-----

**Section 7: ATLANTA MARKET EXPERTISE (White Background)**

**Headline:**

```
H2 (Centered): "We Know Atlanta Inside and Out"
Subhead: "Managing properties in [X] neighborhoods across Metro Atlanta"
```

**Content Options:**

**Option A: Interactive Map**

- Embedded Google Map with custom markers showing service areas
- Hover shows neighborhood name
- Click opens individual neighborhood page

**Option B: Visual Grid**

- Photo grid of iconic Atlanta neighborhoods (Buckhead skyline, Decatur square, etc.)
- Each photo overlaid with neighborhood name
- Links to individual area pages

**Neighborhood List (Below map/grid, 3-4 columns):**

```
Atlanta • Buckhead • Virginia-Highland • Midtown • Decatur • Sandy Springs • Roswell • Alpharetta • Johns Creek • Marietta • Smyrna • Dunwoody • Brookhaven • Chamblee • Doraville • Tucker • Stone Mountain • Lithonia • Snellville • Lawrenceville • Duluth • Suwanee • Cumming • Canton • Woodstock • Kennesaw • Acworth • [Continue with 20-30 more]
```

**CTA:**

```
[See All Areas We Serve] (Gold button)
```

-----

**Section 8: TRANSPARENT PRICING (Light Gray Background)**

**Headline:**

```
H2 (Centered): "Simple, Honest Pricing"
Subhead: "No hidden fees. No surprises. Just straightforward, value-driven property management."
```

**Two-Column Comparison Table:**

**LEFT COLUMN: FULL-SERVICE MANAGEMENT**

```
PRICE (Large, Deep Navy): $[X]/month OR [X]% of monthly rent*
*whichever you prefer

INCLUDED SERVICES (Checkmarks in Sage Green):
✓ Property marketing & advertising
✓ Tenant screening & placement
✓ Lease preparation & execution
✓ Monthly rent collection
✓ 24/7 maintenance coordination
✓ Property inspections
✓ Financial reporting & owner portal
✓ Legal compliance & eviction support
✓ Tenant communication
✓ Annual lease renewals

ADDITIONAL FEES:
• Leasing Fee: [X]% of first month's rent (one-time)
• Lease Renewal: [X] (optional)
• Eviction Coordination: $[X] (if needed)
• NO markup on maintenance or repairs
• NO hidden administrative fees

[Get Custom Quote] (Gold button)
```

**RIGHT COLUMN: TENANT PLACEMENT ONLY**

```
PRICE (Large, Deep Navy): [X]% of first month's rent
One-time service fee

INCLUDED SERVICES (Checkmarks in Sage Green):
✓ Professional property marketing
✓ Property showings
✓ Comprehensive tenant screening
✓ Lease preparation
✓ Move-in coordination
✓ Security deposit handling
✓ 30-day lease guarantee

WHAT'S NOT INCLUDED:
• Ongoing management
• Rent collection
• Maintenance coordination
• You handle day-to-day operations

PERFECT FOR:
• Experienced property owners
• Local owners who prefer self-management
• Single property owners

[Learn More About Placement] (Sky Blue button)
```

**Pricing Guarantee Box (Full-width, White background with Sage Green border):**

```
ICON: Shield (Sage Green)
HEADLINE: "Our Pricing Guarantee"
BODY: "What we quote is what you pay. No hidden fees, no surprise charges, no fine print. If we quote you a price, that's exactly what you'll pay. Period."
```

-----

**Section 9: SOCIAL PROOF & TESTIMONIALS (White Background)**

**Headline:**

```
H2 (Centered): "What Atlanta Property Owners Are Saying"
Subhead: "Don't just take our word for it—hear from the owners who trust us with their investments"
```

**Testimonial Carousel (Auto-rotating or user-controlled):**

Each testimonial card includes:

- Property owner photo (professional headshot)
- Star rating (Gold stars: ★★★★★)
- Quote (2-4 sentences, in quotes, Charcoal text)
- Name and title
- Property details: "Owner of [X] properties in [Neighborhood]"
- Years with Allay: "Client since [Year]"

**Example Template:**

```
[Photo]
★★★★★
"[Quote about experience - focus on specific results, ROI, peace of mind, responsiveness, professionalism]"

— [Name]
Owner of [X] properties in [Neighborhood]
Client since [Year]
```

**Review Platform Badges (Below carousel):**

```
Google Reviews: ⭐ 4.9 (50+ reviews)
Facebook: ⭐ 5.0 (30+ reviews)
Yelp: ⭐ 4.8 (20+ reviews)
```

**CTA:**

```
[Read All Reviews] (Sky Blue button)
[Leave a Review] (Text link)
```

-----

**Section 10: THE RE/MAX DIFFERENCE (Navy Blue Background, White Text)**

**Headline:**

```
H2 (Centered, White): "More Than Property Management"
Subhead (White): "As part of RE/MAX Metro Atlanta, we offer exclusive advantages other property managers simply can't"
```

**Three Columns (Icon boxes with white borders):**

**Column 1: SELL YOUR PROPERTY**

```
ICON: House with "sold" tag (Gold)
HEADING (White): "Ready to Sell?"
BODY (White): "Our RE/MAX agents help you get top dollar with exclusive market access, professional marketing, and expert negotiation. Seamless transition from management to sale."
[Explore Real Estate Services →] (Gold button)
```

**Column 2: BUY MORE PROPERTIES**

```
ICON: Multiple houses (Gold)
HEADING (White): "Grow Your Portfolio"
BODY (White): "Looking to expand? Our investment specialists help you find, analyze, and acquire profitable rental properties. We know which properties make the best investments."
[View Investment Opportunities →] (Gold button)
```

**Column 3: FULL-SERVICE SOLUTION**

```
ICON: Circular arrows connecting house and dollar sign (Gold)
HEADING (White): "Complete Investment Partner"
BODY (White): "One partner for buying, managing, and selling. Streamline your real estate investments with a team that understands every phase of property ownership."
[Learn How We're Different →] (Gold button)
```

-----

**Section 11: LATEST INSIGHTS (Light Gray Background)**

**Headline:**

```
H2 (Centered): "Atlanta Rental Market Insights"
Subhead: "Expert advice and local market intelligence to help you make smarter investment decisions"
```

**3-Column Blog Post Preview:**

Each blog card includes:

- Featured image
- Category tag (small, Sky Blue background): "Market Trends" or "Owner Tips" or "Legal Updates"
- Headline (H3, Deep Navy)
- Excerpt (2-3 lines, Warm Gray)
- Author and date
- "Read More →" link (Sky Blue)

**Example Posts:**

1. "2025 Atlanta Rental Market Forecast: What Property Owners Need to Know"
1. "Top 5 Neighborhoods for Rental Investment in Metro Atlanta"
1. "New Georgia Landlord-Tenant Laws: What Changed in 2024"

**CTA:**

```
[View All Resources] (Sky Blue button)
```

-----

**Section 12: FINAL CTA (Full-width hero image)**

**Background:**

- Professional photo: Atlanta skyline at sunset OR beautiful property exterior
- Semi-transparent Deep Navy overlay (50% opacity)

**Content (Centered, White):**

```
H2 (White, 36-42px): "Ready to Experience Stress-Free Property Management?"

BODY (White, 18-20px):
"Get your free rental analysis and discover what your property could earn with Allay Property Management. No obligation. No pressure. Just expert advice."

TWO BUTTONS:
[Get Free Rental Analysis] (Gold button)
[Call (XXX) XXX-XXXX] (White outlined button)

SMALL TEXT BELOW:
"Typical response time: Under 2 hours during business days"
```

-----

## **ADDITIONAL CRITICAL PAGES**

### **SERVICES PAGE** (`/services`)

**Hero Section:**

```
H1: "Comprehensive Atlanta Property Management Services"
Subhead: "Everything you need to maximize income and minimize headaches"
Background: Professional property image with overlay
```

**Service Accordion/Expandable Sections:**

Create 10-12 expandable sections, each with:

- Service icon (Sky Blue)
- Service name (H3)
- Detailed description (3-4 paragraphs)
- What's included (bulleted list with Sage Green checkmarks)
- Benefits to owner
- Process overview
- Pricing impact (if applicable)
- CTA: "Get Started" or "Learn More"

**Services to Detail:**

1. **Property Marketing & Advertising**

- Professional photography
- Virtual tours and video
- Listing optimization
- Syndication to 30+ sites
- Rental rate analysis
- Competitive positioning

1. **Tenant Screening & Placement**

- Credit report analysis
- Criminal background checks
- Eviction history
- Employment verification
- Income verification (3x rent minimum)
- Rental history and references
- Our acceptance criteria

1. **Lease Preparation & Execution**

- Georgia-compliant lease agreements
- Custom addendums
- Move-in checklist
- Security deposit handling
- Electronic signature
- Lease explanation for residents

1. **Rent Collection**

- Online payment portal
- ACH auto-pay setup
- Multiple payment options
- Late fee enforcement
- Delinquency management
- Monthly distributions to owners

1. **Maintenance Coordination**

- 24/7 emergency hotline
- Vetted vendor network
- Cost-effective repairs
- Preventive maintenance
- Work order tracking
- Owner approval system
- Quality control

1. **Property Inspections**

- Move-in inspection (photo documentation)
- Quarterly drive-by inspections
- Detailed annual inspections
- Move-out inspection
- Issue identification
- Preventive maintenance recommendations

1. **Financial Reporting**

- Monthly owner statements
- Online owner portal 24/7
- Detailed transaction history
- Annual tax documents (1099s)
- Budget forecasting
- Expense tracking

1. **Legal Compliance & Evictions**

- Fair Housing compliance
- Georgia landlord-tenant law
- Lease enforcement
- Eviction coordination (if needed)
- Legal consultation network
- Documentation and records

1. **Tenant Communication & Relations**

- 24/7 resident support
- Maintenance request management
- Lease renewal negotiations
- Conflict resolution
- Move-out coordination
- Resident satisfaction focus

1. **Lease Renewals**

- Market analysis for renewal rates
- Proactive renewal outreach
- Negotiation
- Lease modification
- Minimal vacancy periods

**Comparison Section:**

```
H2: "Choose Your Service Level"
Side-by-side comparison table:
- Full-Service Management
- Tenant Placement Only
- DIY with Allay Support (if offered)
```

**CTA Section:**

```
"Not sure which service is right for you?"
[Schedule Free Consultation] (Gold button)
```

-----

### **ABOUT US PAGE** (`/about`)

**Hero Section:**

```
H1: "Atlanta Property Management with Heart"
Subhead: "Local expertise, national resources, and a genuine commitment to your success"
Background: Team photo or Atlanta skyline
```

**Our Story Section:**

```
H2: "How Allay Property Management Was Born"

3-4 paragraph founder story:
- Personal connection to Atlanta
- Why we started the company
- Problem we're solving
- Our mission and values
- What makes us different

Should feel personal, authentic, storytelling approach
Include founder photo(s)
```

**Our Team Section:**

```
H2: "Meet the Allay Team"

Team member cards (grid layout):
Each includes:
- Professional photo (not stiff corporate shots)
- Name
- Title/Role
- Bio (2-3 paragraphs focusing on experience, why they love PM, personal touch)
- Certifications
- Contact info (if appropriate)
- LinkedIn link
```

**RE/MAX Connection:**

```
H2: "The RE/MAX Metro Atlanta Advantage"

Explain:
- What it means to be part of RE/MAX
- Resources available
- Market access
- Technology platform
- Agent network
- Why this matters to property owners

RE/MAX Metro Atlanta logo prominently displayed
```

**Our Values:**

```
H2: "What We Stand For"

4-6 core values with icons:
Examples:
- Integrity: "We do what's right, even when no one is watching"
- Transparency: "No hidden fees, no surprises, complete honesty"
- Excellence: "We don't settle for 'good enough'"
- Communication: "You'll always know what's happening with your property"
- Local Commitment: "We're invested in Atlanta's success"
- Results-Driven: "Your ROI is our scoreboard"
```

**Community Involvement:**

```
H2: "Giving Back to Atlanta"

Describe:
- Local partnerships
- Community involvement
- Charitable work
- Industry leadership

Photos of team at community events
```

**Certifications & Memberships:**

```
H2: "Professional Credentials"

Badge/logo display:
- NARPM (National Association of Residential Property Managers) - WITH MEMBER LOGO
- Real Estate License (Georgia)
- RE/MAX Metro Atlanta
- Atlanta Board of Realtors
- BBB Accreditation
- Any other relevant certifications
```

**CTA:**

```
"Ready to work with a team that truly cares about your investment?"
[Get Started Today] (Gold button)
[Schedule a Call] (Sky Blue button)
```

-----

### **PRICING PAGE** (`/pricing`)

**Hero:**

```
H1: "Transparent Pricing. No Hidden Fees. Ever."
Subhead: "See exactly what you'll pay before you commit"
```

**Interactive Pricing Calculator:**

```
Tool that lets owners input:
- Property address or ZIP code
- Bedrooms
- Bathrooms
- Estimated rent price

Output:
- Estimated monthly management fee
- Estimated leasing fee
- First-year cost breakdown
- Comparison to competitor pricing
- ROI projection

[Get Custom Quote] button below
```

**Detailed Pricing Breakdown:**

**Full-Service Management:**

```
Monthly Fee: $[X]/month OR [X]% (whichever you prefer)

INCLUDED (Checkmarks):
✓ Unlimited property marketing
✓ Tenant screening & placement
✓ Lease preparation
✓ Monthly rent collection
✓ 24/7 maintenance coordination
✓ Property inspections
✓ Financial reporting
✓ Legal compliance
✓ Eviction support

ADDITIONAL FEES:
• Leasing Fee: [X]% of first month's rent (only when we place a new tenant)
• Lease Renewal: $[X] or [X]% (optional, only if renewed)
• Eviction Coordination: $[X] (rare, only if needed)

WHAT WE DON'T CHARGE FOR:
✓ Setup/onboarding: FREE
✓ Marketing materials: FREE
✓ Owner portal access: FREE
✓ Monthly reports: FREE
✓ Tenant communication: FREE
✓ Maintenance markup: NONE (you pay contractor's price only)
✓ Cancellation fees: NONE (30-day notice)
```

**Tenant Placement Only:**

```
One-Time Fee: [X]% of first month's rent

INCLUDED:
✓ Professional marketing
✓ Property showings
✓ Comprehensive screening
✓ Lease preparation
✓ Move-in coordination
✓ 30-day guarantee

You Handle:
• Ongoing rent collection
• Maintenance
• Inspections
• Legal matters
```

**Comparison Table:**

```
H2: "How We Compare to Other Atlanta Property Managers"

5-column table:
Feature | Allay | Typical PM | Competitor A | Competitor B

Include 15-20 comparison points:
- Monthly fee
- Leasing fee
- Maintenance markup
- Hidden fees
- Lease guarantees
- Response time
- Owner portal
- Technology
- Local expertise
- Inspection frequency
- etc.

Use Sage Green checkmarks for Allay advantages
Use red X or gray text for competitor disadvantages
```

**ROI Calculator:**

```
H2: "See What Property Management is Really Worth"

Interactive tool:
Input:
- Current rent
- Hours you spend managing per month
- Your hourly rate (or estimate)
- Vacancy rate
- Maintenance issues per year

Output:
- Cost of self-management
- Cost of Allay management
- Time saved
- Stress reduction
- Potential income increase with better marketing
- Net value of hiring Allay
```

**Guarantee Section:**

```
H2: "Our Pricing Promises"

Cards with guarantees:
1. "No Hidden Fees": What you see is what you pay
2. "No Setup Charges": Get started free
3. "No Cancellation Penalty": 30-day notice, that's it
4. "No Maintenance Markup": You pay contractor prices only
5. "Lease Guarantee": 30 days or we reduce fees
```

**FAQ Section:**

```
H2: "Pricing Questions Answered"

Expandable questions:
- When do I pay the monthly fee?
- When is the leasing fee charged?
- What if my property is vacant?
- Are there any other fees?
- Can I switch plans?
- How do payment distributions work?
- What's the cancellation policy?
- Do you mark up maintenance?
- [10-15 more pricing-specific FAQs]
```

**CTA:**

```
"Ready to see what your property could earn?"
[Get Your Free Rental Analysis] (Gold button)
[Schedule Pricing Consultation] (Sky Blue button)
```

-----

### **PROPERTY OWNERS HUB** (`/property-owners`)

**Hero:**

```
H1: "Everything You Need to Know About Professional Property Management"
Subhead: "Make smarter decisions about your Atlanta rental investment"
```

**Section 1: Why Hire a Property Manager**

```
H2: "Self-Managing vs Professional Management"

Two-column comparison:
LEFT: "When You Self-Manage" (pain points)
- Late-night maintenance calls
- Tenant screening uncertainty
- Legal compliance risks
- Marketing challenges
- Inconsistent rent collection
- Time consumption
- Stress and worry

RIGHT: "With Allay Property Management" (solutions)
- 24/7 emergency hotline
- Rigorous screening process
- Complete legal protection
- Professional marketing
- Guaranteed rent collection
- Zero time investment
- Complete peace of mind
```

**Section 2: Our Guarantee**

```
H2: "The Allay Promise"

Guarantee cards with Sage Green accents:
1. "30-Day Lease Guarantee"
2. "12-Month Tenant Guarantee"
3. "Transparent Pricing Guarantee"
4. "Response Time Guarantee"
5. "Quality Workmanship Guarantee"

Each with detailed explanation
```

**Section 3: Owner Portal Demo**

```
H2: "Your Investment Dashboard"

Screenshots or demo video of owner portal showing:
- Monthly financial statements
- Property performance
- Maintenance requests
- Inspection reports
- Document library
- Communication center
- Payment history

[Request Portal Demo] button
```

**Section 4: How We Maximize Your Income**

```
H2: "5 Ways We Increase Your Rental Income"

5 cards:
1. "Optimal Pricing Strategy": Market analysis + data
2. "Reduced Vacancy": Fast leasing + renewals
3. "Better Residents": Lower turnover, less damage
4. "Preventive Maintenance": Small fixes prevent big costs
5. "Professional Appeal": Marketing that attracts premium renters
```

**Section 5: Tax Benefits**

```
H2: "Property Management is Tax Deductible"

Explain:
- Management fees are 100% deductible
- How it reduces taxable income
- Typical tax savings
- Other deductible expenses
- Annual tax documentation we provide

Disclaimer: "Consult your tax advisor"
```

**Section 6: What to Expect**

```
H2: "Your Journey with Allay"

Timeline infographic:
Week 1: Initial consultation, property evaluation
Week 2: Agreement signing, property preparation
Week 3: Professional photography, listing creation
Week 4: Marketing launch, showings, applications
Week 5-6: Tenant screening, lease signing
Week 7+: Move-in, rent collection, ongoing management

Set realistic expectations for each phase
```

**Section 7: Owner Resources**

```
H2: "Helpful Resources for Property Owners"

Downloadable guides (PDF):
- "Atlanta Property Owner's Tax Guide"
- "Understanding Georgia Landlord-Tenant Law"
- "Maximizing Your Rental Property ROI"
- "Property Maintenance Checklist"
- "First-Time Property Owner's Guide"

Each with cover image and brief description
[Download] buttons
```

**Section 8: Success Stories**

```
H2: "Real Results from Real Owners"

3-4 detailed case studies:
- Owner name and photo
- Property details
- Challenge/situation
- Solution Allay provided
- Results (specific numbers)
- Owner quote

Example: "How We Increased Sarah's Buckhead Property Income by 18%"
```

**CTA:**

```
"See what Allay can do for your property"
[Get Free Rental Analysis] (Gold button)
```

-----

### **OUR PROCESS PAGE** (`/our-process`)

**Hero:**

```
H1: "Your Path to Stress-Free Property Management"
Subhead: "A proven, step-by-step system that consistently delivers results"
```

**Detailed Step-by-Step Process:**

**STEP 1: FREE CONSULTATION**

```
Icon: Calendar with chat bubble
H3: "Let's Talk About Your Property"

What Happens:
- 20-30 minute phone or video call
- We learn about your property and goals
- You learn about our services
- We answer all your questions
- No pressure, no obligation

What We Need from You:
- Property address
- Current situation (vacant/occupied)
- Your goals and concerns

Timeline: 1 day

[Schedule Consultation] button
```

**STEP 2: FREE RENTAL ANALYSIS**

```
Icon: Graph trending up
H3: "Discover Your Property's Potential"

What Happens:
- Comprehensive market analysis
- Rental rate recommendation
- Comparable properties review
- Income projection
- Optimization suggestions

What We Need from You:
- Property access for evaluation (optional)
- Basic property details

Deliverable:
- Detailed rental analysis report
- Recommended rental rate
- Expected annual income
- Marketing strategy

Timeline: 2-3 days

[Get Free Analysis] button
```

**STEP 3: PROPERTY EVALUATION**

```
Icon: Clipboard with checklist
H3: "Prepare Your Property to Shine"

What Happens:
- In-person property walkthrough
- Detailed condition assessment
- Professional photos
- Recommendations for improvements
- Cost-benefit analysis of upgrades

What We Need from You:
- Property access
- Utility activation
- Decision on recommended repairs

Deliverable:
- Property evaluation report
- Recommended repairs list
- Estimated costs
- Expected ROI on improvements

Timeline: 3-5 days
```

**STEP 4: MANAGEMENT AGREEMENT**

```
Icon: Document with pen
H3: "Simple, Clear Terms"

What Happens:
- Review management agreement together
- Explain all terms and fees
- Answer questions
- Sign electronically
- Welcome to Allay!

What We Need from You:
- Signed agreement
- Property keys/access codes
- Utility account information
- Any HOA documents

Documents:
- Management agreement
- Fee schedule
- Property checklist
- Owner information form

Timeline: 1 day
```

**STEP 5: MARKETING LAUNCH**

```
Icon: Megaphone
H3: "Get Your Property in Front of Thousands"

What Happens:
- Professional photography session
- Compelling listing creation
- Syndication to 30+ websites
- Social media promotion
- Showing schedule setup

Where We Advertise:
- Zillow
- Realtor.com
- Apartments.com
- Trulia
- HotPads
- Rent.com
- Facebook Marketplace
- [20+ more]

Timeline: 1-2 days to launch
```

**STEP 6: SHOWINGS & APPLICATIONS**

```
Icon: Key with people
H3: "Finding Your Perfect Resident"

What Happens:
- Coordinate property showings
- Screen inquiries
- Collect applications
- Answer prospective resident questions
- Pre-qualify applicants

What You Do:
- Nothing! We handle everything

Average Results:
- [X] showings per property
- [X] qualified applications
- [X] days to first application

Timeline: Ongoing during marketing
```

**STEP 7: TENANT SCREENING**

```
Icon: Magnifying glass over person
H3: "Rigorous Vetting Process"

What Happens:
- Credit report analysis (minimum score requirements)
- Criminal background check
- Eviction history search
- Employment verification
- Income verification (3x rent minimum)
- Rental history verification
- Previous landlord references
- Identity verification

Our Standards:
- Credit score minimum: [XXX]
- Income minimum: 3x monthly rent
- No recent evictions
- No violent criminal history
- Positive rental history
- Stable employment

Timeline: 2-3 days per applicant
```

**STEP 8: LEASE SIGNING**

```
Icon: Document with checkmark
H3: "Legal Protection & Clear Terms"

What Happens:
- Georgia-compliant lease preparation
- Custom addendums (if needed)
- Electronic signature
- Security deposit collection
- First month's rent collection
- Move-in date coordination

Documents:
- Lease agreement
- Move-in checklist
- Property rules/policies
- Maintenance request procedures
- Emergency contact information

Timeline: 2-3 days
```

**STEP 9: MOVE-IN**

```
Icon: Moving truck/house
H3: "Smooth Transition"

What Happens:
- Pre-move-in inspection
- Photo documentation
- Utility transfer verification
- Key exchange
- Move-in checklist review
- Welcome package for resident
- Portal access setup

Timeline: Move-in day
```

**STEP 10: ONGOING MANAGEMENT**

```
Icon: Circular arrows
H3: "We Handle Everything From Here"

Monthly Activities:
- Rent collection (auto-pay setup)
- Maintenance coordination
- Property inspections
- Owner distributions
- Financial reporting
- Resident communication

You Get:
- Monthly financial statement
- 24/7 portal access
- Quarterly inspection reports
- Annual tax documents
- Complete peace of mind

Owner involvement: Minimal to none (your choice)
```

**Process Timeline Summary:**

```
Visual timeline graphic:
Week 1: Consultation + Analysis
Week 2: Evaluation + Agreement
Week 3-4: Marketing + Showings
Week 4-5: Applications + Screening
Week 5-6: Lease Signing + Move-in
Week 6+: Ongoing Management

Total Time to Leased: Typically 4-6 weeks
```

**CTA:**

```
"Ready to get started?"
[Begin Your Journey] (Gold button)
[Download Process Guide PDF] (Sky Blue button)
```

-----

### **ATLANTA AREAS WE SERVE** (`/areas-we-serve`)

**Hero:**

```
H1: "Property Management Across Metro Atlanta"
Subhead: "Local expertise in [X] neighborhoods and communities"
Background: Atlanta skyline or map graphic
```

**Interactive Map Section:**

```
Embedded Google Map with:
- Custom markers for each service area
- Hover shows neighborhood name
- Click opens neighborhood detail page
- Color-coded by region (North Atlanta, South Atlanta, East Atlanta, West Atlanta)
```

**Service Area Grid:**

```
Organized by region, each with:
- Region name
- List of cities/neighborhoods
- Properties managed in that area
- Link to individual pages
```

**North Atlanta:**

- Alpharetta
- Brookhaven
- Buckhead
- Canton
- Cumming
- Dunwoody
- Johns Creek
- Marietta
- Roswell
- Sandy Springs
- Smyrna
- Suwanee
- Woodstock

**East Atlanta:**

- Decatur
- Lilburn
- Lithonia
- Snellville
- Stone Mountain
- Tucker

**South Atlanta:**

- College Park
- East Point
- Fayetteville
- Jonesboro
- Morrow
- Peachtree City
- Union City

**West Atlanta:**

- Austell
- Douglasville
- Hiram
- Kennesaw
- Mableton
- Powder Springs
- Smyrna

**Individual Neighborhood Pages Template:**

Each neighborhood gets its own page (`/areas-we-serve/[neighborhood-name]`)

```
H1: "[Neighborhood] Property Management"
Subhead: "Expert property management services in [Neighborhood], Georgia"

CONTENT SECTIONS:

1. About [Neighborhood]
- Brief history
- Why it's a great rental market
- Resident demographics
- Notable features

2. Rental Market Data
- Average rent prices (1BR, 2BR, 3BR, 4BR+)
- Vacancy rates
- Average days on market
- Year-over-year trends
- Seasonality

3. Schools
- Top-rated schools in area
- School district information
- Why it matters for rentals

4. Local Attractions
- Parks and recreation
- Shopping and dining
- Entertainment
- Commute times to major employers

5. Property Types We Manage Here
- Single-family homes
- Condos/townhomes
- Multi-family (if applicable)

6. Our Experience in [Neighborhood]
- Number of properties managed
- Years operating here
- Success stories
- Local partnerships

7. Properties Available for Rent
- Current listings in the neighborhood
- [View All Properties] link

8. CTA
[Get Free Rental Analysis for Your [Neighborhood] Property]
```

**SEO Note:** Each neighborhood page should be 800-1200 words, optimized for "[Neighborhood] property management" keywords

-----

### **FOR RESIDENTS PAGE** (`/residents` or `/renters`)

**Hero:**

```
H1: "Find Your Perfect Atlanta Home"
Subhead: "Quality properties managed by people who care"
Background: Happy residents/beautiful property
```

**Property Search Tool:**

```
Prominent search interface:
- Location/neighborhood dropdown
- Price range slider
- Bedrooms (dropdown: Studio, 1, 2, 3, 4+)
- Bathrooms (dropdown: 1, 1.5, 2, 2.5, 3+)
- Property type (Single-family, Condo, Townhome)
- Pet-friendly filter
- Available date

[Search Properties] (Gold button)
```

**Featured Properties:**

```
Grid of 6-9 current listings (cards):
Each card shows:
- Property photo (hero image)
- Address/neighborhood
- Rent price (large, prominent)
- Beds/baths
- Square footage
- Key features (3-4 bullet points)
- "Available [Date]"
- [View Details] button

Mobile: 1 column
Tablet: 2 columns
Desktop: 3 columns
```

**Why Rent with Allay:**

```
H2: "More Than Just a Place to Live"

4 benefit cards:
1. "Responsive Maintenance": 24/7 emergency line, fast repairs
2. "Easy Online Payments": Multiple payment options, auto-pay available
3. "Helpful Team": Real people who care about your experience
4. "Quality Properties": Well-maintained homes in great neighborhoods
```

**Application Process:**

```
H2: "How to Apply"

Step-by-step with icons:
1. "Find Your Home": Browse available properties
2. "Apply Online": Simple digital application
3. "Quick Approval": Hear back in 24-48 hours
4. "Move In": Smooth transition to your new home

[Start Your Search] button
```

**What We Look For:**

```
H2: "Application Requirements"

Transparent criteria:
✓ Credit Score: Minimum [XXX]
✓ Income: 3x monthly rent (verifiable)
✓ Rental History: Positive references
✓ Background: Clean criminal record
✓ Employment: Stable work history

"We want to help you qualify. Contact us if you have questions about your application."
```

**Resident Portal:**

```
H2: "Everything You Need in One Place"

Portal features with icons:
- Pay rent online
- Submit maintenance requests
- View account history
- Access important documents
- Contact your property manager
- Set up auto-pay

[Resident Portal Login] button
```

**Pet Policy:**

```
H2: "Pet-Friendly Properties Available"

Information about:
- Which properties allow pets
- Pet deposit/fees
- Breed/size restrictions
- Number of pets allowed
- Pet screening process

"We love pets! Ask about our pet-friendly properties."
```

**Resident Resources:**

```
H2: "Helpful Information"

Downloadable guides:
- Move-in checklist
- Renter's insurance guide
- Maintenance request best practices
- Atlanta neighborhood guide
- Utility setup guide

FAQ section:
- When is rent due?
- How do I submit a maintenance request?
- What if I need to break my lease?
- Can I get a pet?
- How do lease renewals work?
- [15-20 more resident FAQs]
```

**CTA:**

```
"Ready to find your next home?"
[Search Available Properties] (Gold button)
[Contact Us] (Sky Blue button)
```

-----

### **BLOG/RESOURCES PAGE** (`/blog` or `/resources`)

**Hero:**

```
H1: "Atlanta Rental Market Insights & Owner Resources"
Subhead: "Expert advice to help you make smarter investment decisions"
```

**Featured Post:**

```
Large hero card with:
- Featured image
- "Featured" badge
- Category
- Headline
- Excerpt (2-3 sentences)
- Author, date, read time
- [Read Article] button
```

**Category Filters:**

```
Horizontal filter buttons:
- All Articles
- Market Updates
- Owner Tips
- Legal & Compliance
- Investment Strategies
- Resident Resources
- Maintenance & Repairs
- Tax & Finance
```

**Blog Grid:**

```
3-column grid (2 on tablet, 1 on mobile):
Each post card:
- Featured image
- Category tag (colored by category)
- Headline (H3)
- Excerpt (2 lines)
- Author photo + name
- Date
- Read time
- [Read More →]
```

**Sidebar (Desktop only):**

```
1. Search Blog
   - Search box

2. Popular Posts
   - List of 5 most-read articles

3. Categories
   - List with post counts

4. Newsletter Signup
   - "Get monthly market updates"
   - Email capture form

5. Free Resources
   - Downloadable guides
```

**Newsletter Section:**

```
Background: Light Gray
H2: "Stay Informed About the Atlanta Rental Market"
Subhead: "Monthly insights, tips, and updates delivered to your inbox"

Email signup form:
- Name field
- Email field
- [Subscribe] button (Gold)

"No spam. Unsubscribe anytime."
```

**Content Strategy:**
Post 2-4 articles monthly covering:

**Market Updates:**

- Monthly rental rate trends
- Neighborhood spotlights
- Vacancy rate analysis
- Seasonal market predictions
- Economic factors affecting rentals

**Owner Tips:**

- Maximizing rental income
- Property improvement ROI
- Tenant retention strategies
- Preventing common issues
- Tax planning tips

**Legal & Compliance:**

- Georgia law updates
- Fair housing reminders
- Lease clause explanations
- Eviction process overview
- Required disclosures

**Investment Strategies:**

- Best neighborhoods for investment
- Cash flow vs appreciation
- Portfolio diversification
- 1031 exchanges
- Exit strategies

**Resident Resources:**

- Moving tips
- Maintenance best practices
- Decorating rental properties
- Energy saving tips

-----

### **TESTIMONIALS PAGE** (`/testimonials`)

**Hero:**

```
H1: "Real Results from Real Atlanta Property Owners"
Subhead: "See why [X] property owners trust Allay with their investments"
```

**Filter Options:**

```
Filter by:
- Service Type (Full Management, Tenant Placement)
- Property Type (Single-family, Condo, Multi-family)
- Neighborhood
- Years as Client
```

**Video Testimonials Section:**

```
H2: "Hear Their Stories"

Grid of video thumbnails:
- Property owner headshot
- Play button overlay
- Name and property details
- Duration

5-10 videos, 2-3 minutes each
```

**Written Testimonials:**

```
Grid layout (2 columns desktop, 1 mobile):

Each testimonial card:
- Property owner photo
- Star rating (Gold)
- Quote (3-5 sentences)
- Name
- Property type and location
- "Owner since [Year]"
- Number of properties with Allay

Alternate cards have light gray background for visual interest
```

**Results Showcase:**

```
H2: "By the Numbers"

Statistics grid:
- [X]% Average occupancy rate
- [X] Days average time to lease
- [X]% Client retention rate
- [X]+ Properties under management
- [X] Years combined experience
- $[X]M+ Rent collected annually
```

**Before/After Case Studies:**

```
H2: "Success Stories"

Detailed case studies (3-5):
Format:
- Property photo (before/after if applicable)
- Owner name and photo
- The Challenge
- Our Solution
- The Results (specific metrics)
- Owner quote

Example:
"How We Reduced Vacancy from 45 Days to 12 Days for a Decatur Property"
```

**Review Platform Showcase:**

```
H2: "Don't Just Take Our Word For It"

Embedded reviews from:
- Google Reviews (with real-time feed)
- Facebook Reviews
- Yelp
- BBB

Each platform shows:
- Star rating
- Number of reviews
- Recent reviews (3-5)
- [Read All Reviews] link
```

**Review Submission:**

```
H2: "Share Your Experience"

Call-to-action for current clients:
"Are you an Allay client? We'd love to hear about your experience!"

[Leave a Review on Google]
[Leave a Review on Facebook]
[Send Us Your Testimonial]
```

**CTA:**

```
"Join [X] satisfied property owners"
[Get Started Today] (Gold button)
```

-----

### **CONTACT/GET STARTED PAGE** (`/contact` or `/get-started`)

**Hero:**

```
H1: "Let's Talk About Your Property"
Subhead: "Get your free rental analysis and discover what your property could earn"
Background: Professional office photo or Atlanta skyline
```

**Two-Column Layout:**

**LEFT COLUMN: Contact Form**

**Multi-Step Form (Feels easier than long form):**

```
STEP 1 of 4: Property Location
- Property Address (auto-complete)
- Or ZIP code
[Next] button

STEP 2 of 4: Property Details
- Property Type (Single-family, Condo, Townhome)
- Bedrooms (dropdown)
- Bathrooms (dropdown)
- Approximate square footage
[Next] button

STEP 3 of 4: Current Situation
Radio buttons:
○ Property is vacant
○ Currently renting (self-managed)
○ Currently renting (with another PM)
○ Owner-occupied, planning to rent
○ Just purchased, getting ready to rent

[Next] button

STEP 4 of 4: Your Information
- Full Name
- Email
- Phone
- Preferred contact method (Email/Phone/Text)
- Best time to reach you
- Additional comments/questions (optional)

Checkbox: "Yes, I'd like to receive monthly Atlanta rental market updates"

[Get My Free Rental Analysis] (Gold button)

Progress indicator at top showing 1/4, 2/4, 3/4, 4/4
Auto-save so users don't lose progress
```

**Form Success Message:**

```
✓ Thank You!
"We've received your information and will contact you within 2 hours during business days (9 AM - 6 PM weekdays)."

"In the meantime, download our free guide:"
[Download: Atlanta Property Owner's Handbook] (PDF)
```

-----

**RIGHT COLUMN: Contact Information**

```
H3: "Get In Touch"

PHONE:
☎ (XXX) XXX-XXXX
(Click-to-call on mobile)
Monday-Friday: 9:00 AM - 6:00 PM
Saturday: 10:00 AM - 2:00 PM
Sunday: Closed

EMAIL:
✉ info@allaypm.com
Typical response time: Under 2 hours

OFFICE ADDRESS:
📍 [Street Address]
[City, State ZIP]
[Get Directions] (link to Google Maps)

Office Hours:
Monday-Friday: 9:00 AM - 6:00 PM
Saturday: By appointment
Sunday: Closed

PORTAL LOGINS:
[Owner Portal Login →]
[Resident Portal Login →]

SOCIAL MEDIA:
[Facebook icon] [LinkedIn icon] [Instagram icon]

---

H3: "Schedule a Call"

Embedded calendar booking widget (Calendly or similar):
- Shows available time slots
- Allows direct scheduling
- Sends automatic confirmation

Or: [Schedule on Our Calendar] button
```

-----

**Below Form: Other Ways to Connect**

```
H2: "Prefer to Meet in Person?"

"Visit our office for a face-to-face consultation. We'd love to meet you and see photos of your property."

[Schedule Office Visit] button

---

H2: "Quick Questions?"

"Check out our FAQ section - you might find your answer immediately:"

Top 5 FAQs with quick answers:
1. What are your management fees?
2. How quickly can you lease my property?
3. Do you charge setup fees?
4. What's included in your service?
5. How do I get started?

[View All FAQs] link
```

-----

**Map Section (Full-width):**

```
Interactive Google Map showing:
- Office location (custom marker)
- Service area boundary
- Major neighborhoods labeled
```

-----

## **TECHNICAL SPECIFICATIONS**

### **Performance Requirements:**

**Speed:**

- Page load time: Under 2 seconds (measured by GTmetrix/PageSpeed Insights)
- First Contentful Paint: Under 1 second
- Time to Interactive: Under 3 seconds
- Mobile optimization score: 90+ on Google PageSpeed Insights
- Desktop optimization score: 95+ on Google PageSpeed Insights

**Image Optimization:**

- All images compressed (WebP format with JPG fallback)
- Lazy loading enabled for below-fold images
- Responsive images with srcset for different screen sizes
- Maximum file size: 200KB for photos, 50KB for icons/logos

**Technical Stack Recommendations:**

- Static site generator (Gatsby, Next.js) or modern CMS (Webflow, WordPress with optimization)
- CDN for fast global delivery
- SSL certificate (HTTPS mandatory)
- Modern hosting (Netlify, Vercel, WP Engine)

-----

### **SEO Requirements:**

**On-Page SEO:**

- Unique title tags for every page (50-60 characters)
- Unique meta descriptions for every page (150-160 characters)
- H1 tag on every page (only one H1 per page)
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for all images
- Internal linking strategy
- Schema markup (LocalBusiness, Service, Review)
- Open Graph tags for social sharing
- XML sitemap
- Robots.txt file

**URL Structure:**

- Clean, descriptive URLs
- Hyphens to separate words (not underscores)
- Lowercase only
- No unnecessary parameters

Examples:

- `allaypm.com/services`
- `allaypm.com/areas-we-serve/buckhead`
- `allaypm.com/blog/atlanta-rental-market-2025`

**Local SEO:**

- Google Business Profile fully optimized
- NAP (Name, Address, Phone) consistency across web
- Local citations (Yelp, BBB, Yellow Pages, etc.)
- Location-specific pages for each neighborhood
- Embedded Google Map on contact page
- LocalBusiness schema markup

**Content SEO:**

- Primary keyword in first 100 words
- Keywords naturally distributed
- Content length: 800-2000 words for major pages
- Regular blog posts (2-4 per month minimum)
- Internal linking between related pages

-----

### **Mobile Optimization:**

**Mobile-First Design:**

- Responsive design across all devices
- Touch-friendly buttons (minimum 44x44px tap targets)
- Readable text without zooming (minimum 16px font size)
- No horizontal scrolling
- Fast mobile load times (under 3 seconds)

**Mobile-Specific Features:**

- Click-to-call phone numbers
- Click-to-email links
- Mobile-optimized forms (larger input fields)
- Simplified navigation (hamburger menu)
- Sticky header with CTA on mobile
- Bottom navigation bar (optional)

**Testing:**

- Test on multiple devices (iPhone, Android, iPad)
- Test on multiple browsers (Chrome, Safari, Firefox)
- Test various screen sizes (320px to 1920px+)

-----

### **Accessibility (WCAG 2.1 AA Compliance):**

**Color Contrast:**

- Text contrast ratio minimum 4.5:1
- Large text (18pt+) minimum 3:1
- All color combinations tested for accessibility

**Keyboard Navigation:**

- All interactive elements accessible via keyboard
- Visible focus indicators
- Logical tab order
- Skip navigation link

**Screen Reader Compatibility:**

- Semantic HTML5 elements
- ARIA labels where needed
- Alt text for all images
- Descriptive link text (not "click here")

**Forms:**

- Label elements properly associated with inputs
- Error messages clearly indicated
- Required fields marked
- Form validation with helpful error messages

-----

### **Analytics & Tracking:**

**Required Tracking:**

- Google Analytics 4
- Google Tag Manager
- Facebook Pixel (for remarketing)
- Call tracking (if using call tracking number)
- Form submission tracking
- Button click tracking (especially CTAs)
- Scroll depth tracking
- Video view tracking

**Conversion Goals:**

- Free rental analysis form submissions
- Phone calls
- Email clicks
- Contact form submissions
- Owner portal signups
- Resident applications
- Newsletter signups

**Heatmaps & Session Recording:**

- Hotjar or similar tool
- Track user behavior
- Identify friction points
- A/B testing capability

-----

### **Security Requirements:**

**Basic Security:**

- SSL certificate (HTTPS)
- Regular software updates
- Strong passwords (if using CMS)
- Two-factor authentication for admin
- Regular backups (daily minimum)
- Firewall protection
- Malware scanning

**Form Security:**

- CAPTCHA on all forms (reCAPTCHA v3 invisible)
- Form validation (client and server-side)
- Protection against SQL injection
- Protection against XSS attacks
- Honeypot fields for spam prevention

**Privacy:**

- Privacy policy page (legally required)
- Cookie consent banner (if required by law)
- GDPR compliance (if applicable)
- Clear data handling practices

-----

### **Integrations:**

**Required Integrations:**

- Google Business Profile
- Google Maps (for location, directions)
- Email marketing platform (Mailchimp, Constant Contact, etc.)
- CRM integration (if applicable)
- Property management software (if using)
- Payment processing (for rent collection)

**Optional Integrations:**

- Calendar booking (Calendly, Acuity)
- Live chat (Intercom, Drift)
- Review management (Birdeye, Podium)
- Social media feeds
- Video hosting (YouTube, Vimeo)

-----

## **CONTENT WRITING GUIDELINES**

### **Voice & Tone:**

**Brand Voice Characteristics:**

- Professional but approachable
- Confident without being arrogant
- Helpful and educational
- Warm and personable
- Straightforward and honest
- Local and community-focused

**What to Do:**
✓ Use conversational language
✓ Address reader as "you"
✓ Use active voice
✓ Be specific with numbers and data
✓ Tell stories
✓ Show expertise
✓ Be empathetic to owner concerns
✓ Use short sentences and paragraphs
✓ Break up text with headers and lists
✓ End sections with clear CTAs

**What to Avoid:**
✗ Jargon and industry acronyms (unless explained)
✗ Passive voice
✗ Long, complex sentences
✗ Corporate speak
✗ Overpromising
✗ Being vague ("We're the best!")
✗ Negative language about competitors
✗ All caps (except for emphasis in specific cases)

-----

### **Writing Principles:**

**Clarity:**

- One main idea per paragraph
- Use simple words
- Define technical terms
- Use examples

**Credibility:**

- Back up claims with data
- Use specific numbers
- Include testimonials
- Show credentials
- Cite sources when relevant

**Persuasion:**

- Lead with benefits, not features
- Use social proof
- Address objections
- Create urgency (when appropriate)
- Offer guarantees

**SEO Writing:**

- Include target keywords naturally
- Use semantic keywords (related terms)
- Write for humans first, search engines second
- Create comprehensive content
- Use keywords in headers
- Include keywords in first 100 words

-----

### **Calls-to-Action (CTA) Guidelines:**

**CTA Best Practices:**

- Action-oriented verbs
- Benefit-focused
- Create urgency (when appropriate)
- Remove friction
- One primary CTA per section

**Strong CTA Examples:**
✓ "Get Your Free Rental Analysis"
✓ "Calculate Your Potential Income"
✓ "Schedule Your Consultation"
✓ "See What Your Property Could Earn"
✓ "Start Earning More Today"
✓ "Download Our Free Guide"

**Weak CTA Examples:**
✗ "Click Here"
✗ "Submit"
✗ "Learn More" (too vague)
✗ "Contact Us" (what's in it for them?)

**CTA Frequency:**

- At least one CTA per page section
- Primary CTA above the fold
- Multiple CTAs throughout long pages
- Final CTA before footer
- Sidebar CTAs (desktop only)

-----

## **CONVERSION OPTIMIZATION**

### **Lead Magnets:**

**Free Rental Analysis (Primary):**

- Most important lead magnet
- Offer on multiple pages
- Make form as short as possible
- Promise response time
- Deliver actual value

**Downloadable Resources:**

1. "Atlanta Property Owner's Handbook" (PDF)
1. "Rental Rate Calculator" (interactive tool)
1. "ROI Worksheet" (spreadsheet template)
1. "Property Maintenance Checklist" (PDF)
1. "Tax Deduction Guide for Rental Property Owners" (PDF)

**Interactive Tools:**

1. Rental Rate Calculator
1. ROI Calculator
1. Property Management Savings Calculator
1. Rent vs Sell Decision Tool

-----

### **Trust Building Elements:**

**Social Proof:**

- Client testimonials (with photos)
- Video testimonials
- Review platform ratings
- Number of properties managed
- Years in business
- Client retention rate

**Credibility Indicators:**

- Professional associations (NARPM)
- BBB rating
- Licenses
- Certifications
- Awards
- Press mentions
- RE/MAX affiliation

**Guarantees:**

- 30-day lease guarantee
- 12-month tenant guarantee
- Transparent pricing guarantee
- Response time guarantee
- Quality workmanship guarantee
- Money-back guarantee (if offered)

**Risk Reversal:**

- No setup fees
- No cancellation penalty
- No long-term contracts
- Trial period (if offered)
- Free initial consultation

-----

### **Form Optimization:**

**Best Practices:**

- Multi-step forms for longer forms
- Progress indicators
- Only ask for essential information
- Use field validation
- Provide helpful error messages
- Auto-save progress
- Thank you page with next steps
- Confirmation email

**Form Fields to Include:**

- Property address
- Basic property details
- Contact information
- Current situation
- How they heard about you

**Form Fields to Avoid:**

- Too many fields
- Unnecessary information
- Confusing questions
- Required fields that aren't essential

-----

### **Page-Specific Conversion Tactics:**

**Homepage:**

- Clear value proposition
- Multiple CTAs
- Video testimonial
- Trust indicators above fold
- Chat widget (optional)

**Services Page:**

- Benefits over features
- Social proof
- Comparison table
- Pricing transparency
- Strong guarantees

**Pricing Page:**

- Complete transparency
- Comparison to competitors
- ROI calculator
- No hidden fees message
- Money-back guarantee

**Contact Page:**

- Multiple contact options
- Fast response time promise
- Easy-to-use form
- Alternative contact methods
- Office hours clearly displayed

-----

## **LAUNCH CHECKLIST**

### **Pre-Launch (4 weeks before):**

**Week 1:**

- [ ] Domain registered
- [ ] Hosting selected and configured
- [ ] SSL certificate installed
- [ ] Email accounts set up
- [ ] Analytics installed (Google Analytics, Tag Manager)
- [ ] Tracking codes implemented
- [ ] Heat mapping tool installed

**Week 2:**

- [ ] All pages built and content added
- [ ] All images optimized and uploaded
- [ ] Navigation tested
- [ ] Forms tested and connected
- [ ] Thank you pages created
- [ ] 404 page designed
- [ ] Privacy policy added
- [ ] Terms of service added

**Week 3:**

- [ ] Mobile optimization tested
- [ ] Cross-browser testing completed
- [ ] Page speed optimized
- [ ] SEO elements implemented
- [ ] Schema markup added
- [ ] XML sitemap created
- [ ] Robots.txt configured
- [ ] Internal linking completed

**Week 4:**

- [ ] Content proofread
- [ ] Links tested (all internal and external)
- [ ] Contact forms tested
- [ ] Lead capture forms tested
- [ ] Email notifications working
- [ ] Thank you emails configured
- [ ] CRM integration tested
- [ ] Analytics tracking verified

-----

### **Launch Day:**

- [ ] Remove "under construction" notices
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify Google Business Profile
- [ ] Social media announcements
- [ ] Email announcement to existing database
- [ ] Press release (if applicable)
- [ ] Monitor analytics
- [ ] Test all functionality one final time

-----

### **Post-Launch (First Week):**

- [ ] Monitor for errors (404s, broken links)
- [ ] Track form submissions
- [ ] Monitor page load speeds
- [ ] Check analytics data collection
- [ ] Respond to all inquiries within 2 hours
- [ ] Review user behavior (heatmaps)
- [ ] Make quick fixes if needed
- [ ] Collect initial feedback

-----

### **First Month:**

- [ ] Review analytics weekly
- [ ] Identify top-performing pages
- [ ] Identify pages with high bounce rates
- [ ] Test different CTAs
- [ ] Monitor search rankings
- [ ] Build initial backlinks
- [ ] Publish 2-4 blog posts
- [ ] Share content on social media
- [ ] Start building email list
- [ ] Ask early visitors for feedback

-----

## **ONGOING MAINTENANCE**

### **Weekly Tasks:**

- Monitor form submissions
- Respond to all inquiries promptly
- Check for broken links
- Review analytics data
- Update available property listings
- Post on social media

### **Monthly Tasks:**

- Publish 2-4 blog posts
- Review and respond to online reviews
- Update any outdated content
- Check page speed
- Review top keywords
- Send email newsletter
- Backup website
- Update software/plugins

### **Quarterly Tasks:**

- Comprehensive SEO audit
- Review and update pricing (if changed)
- Update team bios/photos
- Add new testimonials
- Review and optimize high-traffic pages
- Competitive analysis
- Review conversion rates
- A/B test key pages

### **Annual Tasks:**

- Complete website audit
- Update all statistics and numbers
- Refresh all photos
- Review and update all content
- Renew domain and hosting
- Security audit
- Accessibility audit
- Legal compliance review

-----

## **SUCCESS METRICS**

### **Key Performance Indicators (KPIs):**

**Traffic Metrics:**

- Total website visitors
- Unique visitors
- Traffic sources (organic, direct, referral, social)
- Page views
- Pages per session
- Average session duration
- Bounce rate
- New vs returning visitors

**Conversion Metrics:**

- Lead conversion rate
- Form submission rate
- Phone call conversion rate
- Email conversion rate
- Cost per lead
- Lead quality score

**Engagement Metrics:**

- Time on page
- Scroll depth
- Video completion rate
- Blog post engagement
- Social shares
- Comments/interactions

**SEO Metrics:**

- Organic search traffic
- Keyword rankings
- Backlinks
- Domain authority
- Local pack rankings
- Featured snippets

**Business Metrics:**

- Qualified leads generated
- Properties signed (attributed to website)
- Cost per acquisition
- Return on investment
- Revenue attributed to website

-----

## **FREQUENTLY ASKED QUESTIONS TO ADDRESS**

Include comprehensive FAQ sections covering:

**For Property Owners:**

1. What are your management fees?
1. How quickly can you lease my property?
1. Do you charge setup or cancellation fees?
1. What's included in full-service management?
1. How do you screen tenants?
1. How do you determine rental rates?
1. When do I receive my monthly income?
1. How do you handle maintenance?
1. What if I want to sell my property?
1. Do you allow me to choose my own tenants?
1. How often do you inspect my property?
1. What happens if a tenant doesn't pay rent?
1. Do you mark up maintenance costs?
1. Can I access financial reports anytime?
1. What areas of Atlanta do you serve?
1. How long is the management agreement?
1. What if I'm not satisfied?
1. Do you handle evictions?
1. What if my property is damaged?
1. How do you handle lease renewals?

**For Residents:**

1. How do I apply for a property?
1. What are the application requirements?
1. How long does the application process take?
1. What is the application fee?
1. Do you accept pets?
1. How do I pay rent?
1. When is rent due?
1. How do I submit a maintenance request?
1. What is considered an emergency?
1. Can I have roommates?
1. What utilities am I responsible for?
1. Can I decorate or paint?
1. How do I renew my lease?
1. What if I need to break my lease?
1. How do I report a problem?
1. Can I get a rent payment history?
1. What happens if I pay rent late?
1. Do I need renter's insurance?
1. How do move-outs work?
1. How do I get my security deposit back?

-----

## **FINAL NOTES FOR DEVELOPMENT**

**Brand Consistency:**

- Use Allay brand colors consistently
- Maintain voice and tone across all pages
- Use professional photography
- Quality over quantity in content
- Mobile experience is critical
- Speed is non-negotiable
- Accessibility is mandatory
- SEO is foundational, not optional

**User Experience:**

- Make it easy to contact you
- Reduce friction in forms
- Clear navigation
- Fast load times
- Mobile-first design
- Prominent CTAs
- Trust indicators everywhere
- No dead ends (always give next step)

**Content Strategy:**

- Answer questions before they're asked
- Be transparent about everything
- Show, don't just tell
- Use real data and specific numbers
- Tell stories
- Feature real people
- Regular fresh content
- Local focus throughout

-----

## **PROJECT DELIVERABLES**

**Phase 1 (Weeks 1-4): Core Website**

- Homepage
- About Us
- Services
- Pricing
- Property Owners hub
- Contact/Get Started
- 10 key location pages
- Basic blog setup

**Phase 2 (Weeks 5-8): Expansion**

- Remaining location pages (30-40)
- For Residents section
- Our Process page
- Testimonials page
- Property listing integration
- 5-10 initial blog posts
- Video testimonials
- Lead magnet creation

**Phase 3 (Weeks 9-12): Optimization**

- SEO optimization
- Speed optimization
- A/B testing setup
- Analytics refinement
- Additional content
- Link building initiation
- Social media integration
- Email marketing setup

**Ongoing:**

- Blog posts (2-4 monthly)
- Content updates
- Performance monitoring
- Conversion optimization
- SEO efforts
- Review management
- Social media content

-----

This comprehensive guide provides everything needed to build a high-converting property management website for Allay Property Management. The website should position Allay as the premier choice for Atlanta property owners through transparent pricing, local expertise, RE/MAX resources, and guaranteed results.

**Remember: Every design decision, every word, every feature should answer the question: "Does this help convert property owners into clients?"**
