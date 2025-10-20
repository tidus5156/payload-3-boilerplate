# Phase 1 & 2 Implementation Plan
## Allay Property Management Website

---

## 📊 PROJECT STATUS OVERVIEW

### ✅ Completed Pages (3/11 Phase 1 Core Pages)
- **Homepage** - 100% complete with all CLAUDE.md sections
- **Services** - 100% complete with ServicesGrid blocks and design system
- **Property Owners** - 100% complete with all 9 required sections

### ❌ Missing Core Pages (8 pages)
1. About Us
2. Pricing
3. Contact/Get Started
4. Blog/Resources (archive page)
5. Our Process
6. For Residents
7. Testimonials
8. Areas We Serve (main page)

### ❌ Neighborhood Pages (40-50 pages)
- No neighborhood detail pages exist yet
- Need dynamic routing system

---

## 🎯 NEIGHBORHOOD PAGES ARCHITECTURE

### Overview
**The Neighborhoods collection already exists and is perfect for this implementation!**

Location: `src/collections/Neighborhoods/index.ts`

### Existing Collection Schema

The Neighborhoods collection has all required data:

```typescript
✅ Basic Info:
- name (text)
- slug (auto-generated)
- region (select: north/south/east/west/central/perimeter)
- county (text)
- description (richText) - 2-3 paragraphs

✅ Market Data:
- averageRent1BR, 2BR, 3BR, 4BR (number)
- averageVacancyRate (%)
- averageDaysOnMarket
- propertiesManaged (number)

✅ Schools & Amenities:
- topSchools (array):
  - schoolName, schoolType, rating (1-10)
- nearbyAttractions (array):
  - attraction, category (park/shopping/dining/entertainment/transit)

✅ Transportation:
- commuteTimes:
  - commuteToMidtown, Downtown, Airport, Perimeter
- martaAccess (select)

✅ SEO & Media:
- metaDescription (160 chars)
- featuredImage (upload)
- gallery (array of images with captions)
- featured (checkbox)
```

### Implementation Plan: Neighborhood Dynamic Route

#### Step 1: Create Dynamic Route Structure

**Create:** `src/app/(frontend)/areas-we-serve/[slug]/page.tsx`

```
src/app/(frontend)/
  └── areas-we-serve/
      ├── page.tsx           ← Main "Areas We Serve" page
      └── [slug]/
          └── page.tsx       ← Individual neighborhood pages
```

#### Step 2: Neighborhood Page Template

The dynamic page will:

1. **Fetch neighborhood data** from Neighborhoods collection by slug
2. **Render uniform template** with 8 sections:

```tsx
// Section breakdown per CLAUDE.md (lines 1844-1891)

<NeighborhoodPage>
  <Hero
    heading="[Neighborhood] Property Management"
    subheading="Expert property management services in [Neighborhood], Georgia"
    backgroundImage={neighborhood.featuredImage}
  />

  <Section1_About>
    {neighborhood.description} // RichText from collection
    - Brief history
    - Why it's a great rental market
    - Resident demographics
    - Notable features
  </Section1_About>

  <Section2_RentalMarketData>
    <IconGrid columns="four">
      <Card>1BR: ${neighborhood.marketData.averageRent1BR}/mo</Card>
      <Card>2BR: ${neighborhood.marketData.averageRent2BR}/mo</Card>
      <Card>3BR: ${neighborhood.marketData.averageRent3BR}/mo</Card>
      <Card>4BR+: ${neighborhood.marketData.averageRent4BR}/mo</Card>
    </IconGrid>

    <Statistics>
      - Vacancy Rate: {neighborhood.marketData.averageVacancyRate}%
      - Avg Days on Market: {neighborhood.marketData.averageDaysOnMarket}
      - Properties We Manage: {neighborhood.marketData.propertiesManaged}
    </Statistics>
  </Section2_RentalMarketData>

  <Section3_Schools>
    {neighborhood.topSchools.map(school => (
      <SchoolCard
        name={school.schoolName}
        type={school.schoolType}
        rating={school.rating}
      />
    ))}
  </Section3_Schools>

  <Section4_LocalAttractions>
    <IconGrid columns="three">
      Parks: {filter attractions by 'park'}
      Shopping: {filter attractions by 'shopping'}
      Dining: {filter attractions by 'dining'}
      Entertainment: {filter attractions by 'entertainment'}
    </IconGrid>

    <CommuteTimesWidget>
      To Midtown: {neighborhood.commuteTimes.commuteToMidtown}
      To Downtown: {neighborhood.commuteTimes.commuteToDowntown}
      To Airport: {neighborhood.commuteTimes.commuteToAirport}
      To Perimeter: {neighborhood.commuteTimes.commuteToPerimeterMall}
    </CommuteTimesWidget>

    MARTA Access: {neighborhood.martaAccess}
  </Section4_LocalAttractions>

  <Section5_PropertyTypes>
    - Single-family homes
    - Condos/townhomes
    - Multi-family (if applicable)
  </Section5_PropertyTypes>

  <Section6_OurExperience>
    - Number of properties managed: {neighborhood.marketData.propertiesManaged}
    - Years operating here
    - Success stories
    - Local partnerships
  </Section6_OurExperience>

  <Section7_AvailableProperties>
    // Query Properties collection where:
    // properties.neighborhood === neighborhood.id
    // properties.status === 'available'

    <PropertyGrid>
      {availableProperties.map(property => <PropertyCard />)}
    </PropertyGrid>
  </Section7_AvailableProperties>

  <Section8_CTA>
    <HeroCTA
      headline="Ready to Maximize Your {neighborhood.name} Property?"
      ctaText="Get Free Rental Analysis"
      ctaUrl="/contact"
    />
  </Section8_CTA>
</NeighborhoodPage>
```

#### Step 3: Main "Areas We Serve" Page

**Create:** `src/app/(frontend)/areas-we-serve/page.tsx`

Per CLAUDE.md lines 1765-1839:

```tsx
<AreasWeServePage>
  <Hero
    heading="Property Management Across Metro Atlanta"
    subheading="Local expertise in [X] neighborhoods and communities"
  />

  <InteractiveMapSection>
    // Google Maps embed with custom markers
    // Or photo grid of neighborhoods
  </InteractiveMapSection>

  <ServiceAreaGrid>
    // Group neighborhoods by region

    <RegionSection region="North Atlanta">
      {neighborhoods
        .filter(n => n.region === 'north')
        .map(n => <Link href={`/areas-we-serve/${n.slug}`}>{n.name}</Link>)
      }
    </RegionSection>

    <RegionSection region="South Atlanta">
      {neighborhoods.filter(n => n.region === 'south')}
    </RegionSection>

    <RegionSection region="East Atlanta">
      {neighborhoods.filter(n => n.region === 'east')}
    </RegionSection>

    <RegionSection region="West Atlanta">
      {neighborhoods.filter(n => n.region === 'west')}
    </RegionSection>

    <RegionSection region="Central/Midtown">
      {neighborhoods.filter(n => n.region === 'central')}
    </RegionSection>

    <RegionSection region="Perimeter">
      {neighborhoods.filter(n => n.region === 'perimeter')}
    </RegionSection>
  </ServiceAreaGrid>

  <CTA />
</AreasWeServePage>
```

#### Step 4: SEO Optimization

Each neighborhood page gets:
- **Title:** "[Neighborhood] Property Management | Allay Property Management"
- **Meta Description:** `neighborhood.metaDescription` (from collection)
- **H1:** "[Neighborhood] Property Management"
- **URL:** `/areas-we-serve/[slug]`
- **Schema Markup:** LocalBusiness + Service
- **Word Count:** 800-1200 words
- **Keywords:** "[Neighborhood] property management", "property manager in [Neighborhood]"

#### Step 5: Reusable Components Needed

Create these components for neighborhood pages:

```
src/components/neighborhoods/
  ├── NeighborhoodHero.tsx           // Hero with background image
  ├── RentalMarketStats.tsx          // Market data display
  ├── SchoolsGrid.tsx                // Top schools display
  ├── AttractionsMap.tsx             // Local attractions
  ├── CommuteTimesWidget.tsx         // Commute times display
  ├── ExperienceSection.tsx          // Our experience in area
  └── AvailablePropertiesGrid.tsx    // Property listings
```

---

## 📋 PHASE 1: CORE WEBSITE (Weeks 1-4)

### Current Progress: 27% (3/11 pages complete)

### Week 1: About Us & Pricing Pages

#### **1. About Us Page** (`/about`)

**Route:** `src/app/(frontend)/about/page.tsx`

**Sections per CLAUDE.md (lines 1051-1158):**

```
1. Hero Section
   - H1: "Atlanta Property Management with Heart"
   - Subhead + background image
   - mediumImpact hero type

2. Our Story Section (Content block)
   - H2: "How Allay Property Management Was Born"
   - 3-4 paragraph founder story
   - Founder photo(s)
   - Personal, authentic storytelling

3. Our Team Section (TeamGrid block)
   - H2: "Meet the Allay Team"
   - Query TeamMembers collection
   - Grid layout with photos, names, titles, bios
   - Certifications, LinkedIn links

4. RE/MAX Connection (Content block with image)
   - H2: "The RE/MAX Metro Atlanta Advantage"
   - Explain resources, market access, technology
   - RE/MAX Metro Atlanta logo prominently displayed

5. Our Values (IconGrid block - 6 items)
   - H2: "What We Stand For"
   - Icons with values:
     * Integrity
     * Transparency
     * Excellence
     * Communication
     * Local Commitment
     * Results-Driven

6. Community Involvement (Content block)
   - H2: "Giving Back to Atlanta"
   - Local partnerships, charitable work
   - Photos of team at events

7. Certifications & Memberships (TrustBadges block)
   - H2: "Professional Credentials"
   - NARPM, Real Estate License, RE/MAX, Atlanta Board of Realtors, BBB

8. CTA (HeroCTA block)
   - "Ready to work with a team that truly cares?"
   - Primary + Secondary CTAs
```

**Data Needed:**
- Founder story text
- Team member photos (or use existing TeamMembers collection)
- RE/MAX logo and partnership details
- Community involvement photos
- Certification badges

**Blocks to Use:**
- Content (for story, RE/MAX, community sections)
- TeamGrid (for team member display)
- IconGrid (for values)
- TrustBadges (for certifications)
- HeroCTA (final CTA)

**Estimated Time:** 6-8 hours

---

#### **2. Pricing Page** (`/pricing`)

**Route:** `src/app/(frontend)/pricing/page.tsx`

**Sections per CLAUDE.md (lines 1162-1326):**

```
1. Hero Section
   - H1: "Transparent Pricing. No Hidden Fees. Ever."
   - Subhead: "See exactly what you'll pay before you commit"

2. Interactive Pricing Calculator (NEW COMPONENT NEEDED)
   - Input: Address/ZIP, Bedrooms, Bathrooms, Estimated rent
   - Output: Monthly management fee, Leasing fee, First-year cost
   - ROI projection
   - [Get Custom Quote] button

3. Detailed Pricing Breakdown (PricingComparison block)
   - Full-Service Management column
   - Tenant Placement Only column
   - Detailed fee lists with checkmarks

4. Comparison Table (NEW COMPONENT NEEDED)
   - 5-column table: Allay vs Typical PM vs Competitor A vs Competitor B
   - 15-20 comparison points
   - Green checkmarks for Allay advantages

5. ROI Calculator (NEW COMPONENT NEEDED)
   - Input: Current rent, hours spent managing, hourly rate, vacancy, maintenance
   - Output: Cost comparison, time saved, net value

6. Guarantee Section (IconGrid block)
   - H2: "Our Pricing Promises"
   - 5 guarantee cards:
     * No Hidden Fees
     * No Setup Charges
     * No Cancellation Penalty
     * No Maintenance Markup
     * Lease Guarantee

7. FAQ Section (FAQAccordion block)
   - H2: "Pricing Questions Answered"
   - 10-15 pricing-specific FAQs from FAQs collection

8. CTA (HeroCTA block)
   - "Ready to see what your property could earn?"
   - Primary + Secondary CTAs
```

**New Components Needed:**
```
src/components/pricing/
  ├── PricingCalculator.tsx       // Interactive pricing calculator
  ├── ComparisonTable.tsx         // Competitor comparison
  └── ROICalculator.tsx           // ROI calculation tool
```

**Data Needed:**
- Actual pricing numbers (monthly %, leasing fee %, renewal fee)
- Competitor pricing for comparison table (can use generic "Typical PM")
- FAQ entries related to pricing

**Blocks to Use:**
- PricingComparison (for detailed breakdown)
- IconGrid (for guarantees)
- FAQAccordion (for pricing FAQs)
- HeroCTA (final CTA)

**Estimated Time:** 10-12 hours (includes building interactive calculators)

---

### Week 2: Contact & Blog Archive Pages

#### **3. Contact/Get Started Page** (`/contact`)

**Route:** `src/app/(frontend)/contact/page.tsx`

**Sections per CLAUDE.md (lines 2377-2525):**

```
1. Hero Section
   - H1: "Let's Talk About Your Property"
   - Subhead: "Get your free rental analysis"

2. Two-Column Layout:

   LEFT COLUMN: Multi-Step Contact Form (NEW COMPONENT)
   - Step 1/4: Property Location
   - Step 2/4: Property Details
   - Step 3/4: Current Situation
   - Step 4/4: Your Information
   - Progress indicator
   - Auto-save functionality
   - Form submission creates FormSubmissions collection entry

   RIGHT COLUMN: Contact Information
   - Phone (click-to-call)
   - Email
   - Office Address
   - Office Hours
   - Portal Logins
   - Social Media
   - Calendar booking widget (Calendly integration)

3. Other Ways to Connect Section
   - "Prefer to Meet in Person?"
   - "Quick Questions?" with top 5 FAQs

4. Map Section (Full-width)
   - Google Maps embed with office location
   - Service area boundary
   - Major neighborhoods labeled
```

**New Components Needed:**
```
src/components/contact/
  ├── MultiStepContactForm.tsx    // 4-step form with validation
  ├── ContactInfoSidebar.tsx      // Contact details display
  ├── CalendlyWidget.tsx          // Calendar booking
  └── ServiceAreaMap.tsx          // Google Maps integration
```

**Data Needed:**
- Office phone, email, address, hours (from Settings global)
- Top 5 FAQs (query from FAQs collection)
- Google Maps API key
- Calendly embed code (if using)

**Integration Needed:**
- Form submissions saved to FormSubmissions collection
- Email notifications on form submit
- Auto-responder email to user

**Estimated Time:** 8-10 hours

---

#### **4. Blog/Resources Archive Page** (`/blog`)

**Route:** `src/app/(frontend)/blog/page.tsx`

**Sections per CLAUDE.md (lines 2044-2251):**

```
1. Hero Section
   - H1: "Atlanta Rental Market Insights & Owner Resources"
   - Subhead: "Expert advice to help you make smarter investment decisions"

2. Featured Post
   - Large hero card for most recent or featured post
   - "Featured" badge
   - Category, headline, excerpt, author, date, read time

3. Category Filters (Client-side filtering)
   - All Articles
   - Market Updates
   - Owner Tips
   - Legal & Compliance
   - Investment Strategies
   - Resident Resources
   - Maintenance & Repairs
   - Tax & Finance

4. Blog Grid
   - 3-column grid (2 tablet, 1 mobile)
   - Post cards with:
     * Featured image
     * Category tag (colored)
     * Headline (H3)
     * Excerpt (2 lines)
     * Author photo + name
     * Date, read time

5. Sidebar (Desktop only)
   - Search Blog
   - Popular Posts (5 most-read)
   - Categories with post counts
   - Newsletter Signup
   - Free Resources

6. Newsletter Section
   - Email signup form
   - "Stay Informed About the Atlanta Rental Market"
```

**Components Needed:**
```
src/components/blog/
  ├── BlogHero.tsx                // Hero section
  ├── FeaturedPost.tsx            // Large featured post card
  ├── CategoryFilters.tsx         // Filter buttons
  ├── BlogGrid.tsx                // Post grid display
  ├── BlogSidebar.tsx             // Sidebar with search, popular posts
  └── NewsletterSignup.tsx        // Email capture form
```

**Data Source:**
- Query Posts collection
- Filter by category
- Sort by publishedAt date
- Pagination (10-12 posts per page)

**Estimated Time:** 6-8 hours

---

### Week 3: Process & Residents Pages

#### **5. Our Process Page** (`/our-process` or `/process`)

**Route:** `src/app/(frontend)/our-process/page.tsx`

**Sections per CLAUDE.md (lines 1481-1761):**

```
1. Hero Section
   - H1: "Your Path to Stress-Free Property Management"
   - Subhead: "A proven, step-by-step system"

2. Detailed 10-Step Process (ProcessTimeline block × 10)
   Each step includes:
   - Icon
   - H3 heading
   - "What Happens" section
   - "What We Need from You" section
   - "Deliverable" section (if applicable)
   - Timeline estimate
   - CTA button (if applicable)

   Steps:
   1. Free Consultation
   2. Free Rental Analysis
   3. Property Evaluation
   4. Management Agreement
   5. Marketing Launch
   6. Showings & Applications
   7. Tenant Screening
   8. Lease Signing
   9. Move-In
   10. Ongoing Management

3. Process Timeline Summary (ProcessTimeline block)
   - Visual timeline graphic
   - Week 1: Consultation + Analysis
   - Week 2: Evaluation + Agreement
   - Week 3-4: Marketing + Showings
   - Week 4-5: Applications + Screening
   - Week 5-6: Lease Signing + Move-in
   - Week 6+: Ongoing Management
   - Total: Typically 4-6 weeks

4. CTA Section (HeroCTA block)
   - "Ready to get started?"
   - [Begin Your Journey] + [Download Process Guide PDF]
```

**Blocks to Use:**
- ProcessTimeline (10 instances - one per step)
- ProcessTimeline (1 instance for summary timeline)
- HeroCTA (final CTA)

**Alternative Approach:**
- Create one large ProcessTimeline block with all 10 steps
- Use `layout: 'vertical'` for detailed step-by-step

**Data Needed:**
- Detailed copy for all 10 steps
- Icons for each step
- Timeline estimates

**Estimated Time:** 6-8 hours (mostly content writing)

---

#### **6. For Residents Page** (`/residents`)

**Route:** `src/app/(frontend)/residents/page.tsx`

**Sections per CLAUDE.md (lines 1897-2040):**

```
1. Hero Section
   - H1: "Find Your Perfect Atlanta Home"
   - Subhead: "Quality properties managed by people who care"
   - Background: Happy residents/beautiful property

2. Property Search Tool (NEW COMPONENT)
   - Location/neighborhood dropdown
   - Price range slider
   - Bedrooms, Bathrooms dropdowns
   - Property type filter
   - Pet-friendly filter
   - Available date
   - [Search Properties] button

3. Featured Properties
   - Grid of 6-9 current listings
   - Query Properties collection where status='available'
   - Property cards with:
     * Photo, address, rent price, beds/baths, sqft
     * Key features, available date
     * [View Details] button

4. Why Rent with Allay (IconGrid block - 4 items)
   - Responsive Maintenance
   - Easy Online Payments
   - Helpful Team
   - Quality Properties

5. Application Process (ProcessTimeline block)
   - 4 steps: Find Home → Apply Online → Quick Approval → Move In

6. What We Look For (Content block)
   - Application requirements with checkmarks
   - Transparent criteria

7. Resident Portal Features (IconGrid block)
   - Pay rent online
   - Submit maintenance requests
   - View account history, etc.

8. Pet Policy (Content block)
   - Pet-friendly properties info
   - Deposit/fees, restrictions

9. Resident Resources (Content block + FAQAccordion)
   - Downloadable guides
   - FAQ section with 15-20 resident FAQs

10. CTA (HeroCTA block)
    - "Ready to find your next home?"
```

**New Components Needed:**
```
src/components/residents/
  ├── PropertySearchWidget.tsx    // Advanced search interface
  ├── PropertyCard.tsx            // Property listing card
  └── PropertyGrid.tsx            // Grid of properties
```

**Data Source:**
- Query Properties collection
- Filter by status='available'
- Search/filter functionality

**Blocks to Use:**
- IconGrid (for benefits, portal features)
- ProcessTimeline (for application process)
- Content (for requirements, pet policy, resources)
- FAQAccordion (for resident FAQs)
- HeroCTA (final CTA)

**Estimated Time:** 8-10 hours (includes property search widget)

---

### Week 4: Testimonials & Areas We Serve Pages

#### **7. Testimonials Page** (`/testimonials`)

**Route:** `src/app/(frontend)/testimonials/page.tsx`

**Sections per CLAUDE.md (lines 2255-2373):**

```
1. Hero Section
   - H1: "Real Results from Real Atlanta Property Owners"
   - Subhead: "See why [X] property owners trust Allay"

2. Filter Options (Client-side filtering)
   - Service Type
   - Property Type
   - Neighborhood
   - Years as Client

3. Video Testimonials Section
   - H2: "Hear Their Stories"
   - Grid of video thumbnails
   - 5-10 videos (if available)

4. Written Testimonials (Query Testimonials collection)
   - Grid layout (2 columns desktop, 1 mobile)
   - Testimonial cards with:
     * Photo, star rating, quote
     * Name, property details, "Owner since [Year]"
   - Alternate background colors

5. Results Showcase (Statistics block)
   - H2: "By the Numbers"
   - 6 statistics:
     * Average occupancy rate
     * Average days to lease
     * Client retention rate
     * Properties under management
     * Years combined experience
     * Rent collected annually

6. Before/After Case Studies (Content blocks)
   - H2: "Success Stories"
   - 3-5 detailed case studies
   - Property photo, owner, challenge, solution, results

7. Review Platform Showcase
   - H2: "Don't Just Take Our Word For It"
   - Embedded reviews from Google, Facebook, Yelp, BBB
   - Star ratings, review counts

8. Review Submission (Content block)
   - H2: "Share Your Experience"
   - Links to leave reviews

9. CTA (HeroCTA block)
   - "Join [X] satisfied property owners"
```

**Components Needed:**
```
src/components/testimonials/
  ├── TestimonialFilters.tsx      // Filter controls
  ├── TestimonialCard.tsx         // Individual testimonial
  ├── VideoTestimonial.tsx        // Video embed
  ├── CaseStudyCard.tsx           // Before/after case study
  └── ReviewPlatformEmbed.tsx     // Google/Facebook review embed
```

**Data Source:**
- Query Testimonials collection
- Filter/sort functionality
- Video embed codes (if available)

**Blocks to Use:**
- Statistics (for "By the Numbers")
- Content (for case studies, review submission)
- HeroCTA (final CTA)

**Estimated Time:** 6-8 hours

---

#### **8. Areas We Serve (Main Page)** (`/areas-we-serve`)

**Route:** `src/app/(frontend)/areas-we-serve/page.tsx`

**Sections per CLAUDE.md (lines 1765-1839):**

```
1. Hero Section
   - H1: "Property Management Across Metro Atlanta"
   - Subhead: "Local expertise in [X] neighborhoods"
   - Background: Atlanta skyline or map graphic

2. Interactive Map Section (NEW COMPONENT)
   Option A: Google Maps with custom markers
   - Embedded map with service area markers
   - Hover shows neighborhood name
   - Click opens individual neighborhood page
   - Color-coded by region

   Option B: Visual Grid
   - Photo grid of iconic Atlanta neighborhoods
   - Neighborhood name overlay
   - Links to individual pages

3. Service Area Grid (Query Neighborhoods collection)
   - Organized by region
   - 6 regions:
     * North Atlanta (13 neighborhoods)
     * East Atlanta (6 neighborhoods)
     * South Atlanta (7 neighborhoods)
     * West Atlanta (7 neighborhoods)
     * Central/Midtown
     * Perimeter

   For each region:
   - Region name (H2)
   - List of neighborhoods (links to detail pages)
   - Properties managed in region (sum)

4. CTA (HeroCTA block)
   - "Explore our neighborhood pages"
```

**New Components Needed:**
```
src/components/areas/
  ├── ServiceAreaMap.tsx          // Google Maps with markers
  ├── RegionSection.tsx           // Region grouping display
  └── NeighborhoodList.tsx        // List of neighborhoods
```

**Data Source:**
- Query all Neighborhoods from collection
- Group by region
- Count properties managed per region

**Estimated Time:** 6-8 hours (includes map integration)

---

## 📈 PHASE 1 TIMELINE SUMMARY

```
Week 1 (2 pages):
├─ About Us          [6-8 hrs]
└─ Pricing           [10-12 hrs]
   Total: 16-20 hours

Week 2 (2 pages):
├─ Contact           [8-10 hrs]
└─ Blog Archive      [6-8 hrs]
   Total: 14-18 hours

Week 3 (2 pages):
├─ Our Process       [6-8 hrs]
└─ For Residents     [8-10 hrs]
   Total: 14-18 hours

Week 4 (2 pages):
├─ Testimonials      [6-8 hrs]
└─ Areas We Serve    [6-8 hrs]
   Total: 12-16 hours

PHASE 1 TOTAL: 56-72 hours (approx 7-9 full working days)
```

---

## 📈 PHASE 2: EXPANSION (Weeks 5-8)

### Week 5-6: Neighborhood Detail Pages (40-50 pages)

#### Implementation Strategy

**1. Create Dynamic Route Template**
- File: `src/app/(frontend)/areas-we-serve/[slug]/page.tsx`
- Fetches neighborhood by slug from Neighborhoods collection
- Renders uniform template

**2. Seed Neighborhood Data**

Need to populate Neighborhoods collection with 40-50 entries covering Metro Atlanta.

**Regions and Target Neighborhoods:**

```
NORTH ATLANTA (13):
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

EAST ATLANTA (6):
- Decatur
- Lilburn
- Lithonia
- Snellville
- Stone Mountain
- Tucker

SOUTH ATLANTA (7):
- College Park
- East Point
- Fayetteville
- Jonesboro
- Morrow
- Peachtree City
- Union City

WEST ATLANTA (7):
- Austell
- Douglasville
- Hiram
- Kennesaw
- Mableton
- Powder Springs
- Smyrna (also in North)

CENTRAL/MIDTOWN (5):
- Midtown
- Virginia-Highland
- Inman Park
- Old Fourth Ward
- Grant Park

PERIMETER (5):
- Chamblee
- Doraville
- Norcross
- North Druid Hills
- Sandy Springs

ADDITIONAL KEY AREAS (7+):
- Lawrenceville
- Duluth
- Acworth
- Vinings
- East Cobb
- West Cobb
- Johns Creek
```

**Total: 50 neighborhoods**

**3. Seed Data Script**

Create: `scripts/seed-neighborhoods.ts`

```typescript
// For each neighborhood, populate:
- name, slug, region, county
- description (2-3 paragraphs about the area)
- marketData (rent prices, vacancy, days on market, properties managed)
- topSchools (3-5 top-rated schools from GreatSchools.org)
- nearbyAttractions (5-10 local attractions)
- commuteTimes (estimate times to Midtown, Downtown, Airport, Perimeter)
- martaAccess (research MARTA availability)
- metaDescription (SEO-optimized 160 chars)
- featuredImage (upload neighborhood image or use stock)
```

**Data Sources for Seed:**
- Rent prices: Zillow, Rentometer, Apartments.com
- Schools: GreatSchools.org
- Attractions: Google Maps, local tourism sites
- Commute times: Google Maps estimates
- MARTA: MARTA.com route map

**4. Neighborhood Page Template Components**

Create reusable components:

```
src/components/neighborhoods/
  ├── NeighborhoodHero.tsx
  ├── AboutNeighborhood.tsx          // Description richText display
  ├── RentalMarketStats.tsx          // Market data with icons
  ├── SchoolsGrid.tsx                // Top schools display
  ├── LocalAttractionsList.tsx       // Categorized attractions
  ├── CommuteTimesWidget.tsx         // Commute info display
  ├── PropertyTypesSection.tsx       // Property types available
  ├── OurExperienceSection.tsx       // Experience in area
  ├── AvailablePropertiesGrid.tsx    // Properties for rent
  └── NeighborhoodCTA.tsx            // Neighborhood-specific CTA
```

**5. SEO Implementation**

Each neighborhood page:
- Generates metadata from collection data
- Title: "[Neighborhood] Property Management | Allay"
- Description: `neighborhood.metaDescription`
- Schema: LocalBusiness + Service
- Canonical URL: `/areas-we-serve/[slug]`
- Open Graph tags with `featuredImage`

**Timeline:**
- Template creation: 12-16 hours
- Component development: 10-12 hours
- Seed data collection: 20-25 hours (can parallelize or use AI assistance)
- Testing and refinement: 6-8 hours

**Total: 48-61 hours (6-8 full working days)**

---

### Week 7-8: Additional Phase 2 Items

#### **Property Listing Integration**

Enhance property display throughout site:

1. **Properties Archive Page** (`/properties`)
   - Full property search and filter
   - Grid display of all available properties
   - Already exists (basic) - needs enhancement

2. **Individual Property Pages** (`/properties/[slug]`)
   - Detailed property view
   - Photo gallery
   - Full amenities, neighborhood info
   - Application CTA
   - Already exists - review and enhance

**Estimated Time:** 8-10 hours

---

#### **Initial Blog Posts (5-10 posts)**

Create 5-10 blog posts to populate blog archive:

**Recommended Topics:**

1. **Market Updates:**
   - "2025 Atlanta Rental Market Forecast: What Property Owners Need to Know"
   - "Top 5 Neighborhoods for Rental Investment in Metro Atlanta"

2. **Owner Tips:**
   - "Maximizing Rental Income: 7 Strategies That Actually Work"
   - "Property Improvement ROI: Which Upgrades Increase Rent Most?"

3. **Legal & Compliance:**
   - "New Georgia Landlord-Tenant Laws: What Changed in 2024"
   - "Fair Housing Compliance: What Atlanta Property Owners Must Know"

4. **Investment Strategies:**
   - "Cash Flow vs. Appreciation: Building Your Atlanta Rental Portfolio"
   - "Is Property Management Worth It? A Data-Driven Analysis"

5. **Resident Resources:**
   - "Moving to Atlanta: A Renter's Guide to Metro Neighborhoods"
   - "How to Be a Great Resident: Maintenance Request Best Practices"

Each post:
- 800-1500 words
- Optimized for keywords
- Featured image
- Category assignment
- Author attribution

**Estimated Time:** 20-30 hours (4-6 hours per post × 5 posts)

---

#### **Video Testimonials**

If video content is available:

1. **Record 3-5 client testimonials**
   - 2-3 minutes each
   - Professional editing
   - Upload to YouTube/Vimeo
   - Embed on Testimonials page

**Estimated Time:** 15-20 hours (includes filming, editing, uploading)

---

#### **Lead Magnet Creation**

Create downloadable PDF guides:

1. **"Atlanta Property Owner's Handbook"** (primary lead magnet)
   - 15-20 pages
   - Professional design
   - Topics: Getting started, rental rates, legal requirements, tax tips

2. **"Property Maintenance Checklist"**
   - 5-8 pages
   - Seasonal maintenance tasks
   - Preventive maintenance tips

3. **"Tax Deduction Guide for Rental Property Owners"**
   - 8-12 pages
   - Common deductions
   - Record-keeping tips

**Estimated Time:** 20-25 hours (design + content)

---

## 🎯 PHASE 2 TIMELINE SUMMARY

```
Week 5-6 (Neighborhood Pages):
├─ Template creation         [12-16 hrs]
├─ Components development    [10-12 hrs]
├─ Seed data collection      [20-25 hrs]
└─ Testing                   [6-8 hrs]
   Total: 48-61 hours

Week 7 (Property Enhancement + Blog):
├─ Property pages enhance    [8-10 hrs]
└─ Blog posts (5)            [20-30 hrs]
   Total: 28-40 hours

Week 8 (Video + Lead Magnets):
├─ Video testimonials        [15-20 hrs]
└─ Lead magnet PDFs          [20-25 hrs]
   Total: 35-45 hours

PHASE 2 TOTAL: 111-146 hours (approx 14-18 full working days)
```

---

## 🛠️ TECHNICAL IMPLEMENTATION NOTES

### New Components to Build

```
📁 src/components/
   📁 pricing/
      PricingCalculator.tsx        ← Interactive calculator
      ComparisonTable.tsx          ← Competitor comparison
      ROICalculator.tsx            ← ROI calculation

   📁 contact/
      MultiStepContactForm.tsx     ← 4-step form
      ContactInfoSidebar.tsx       ← Contact details
      CalendlyWidget.tsx           ← Booking widget
      ServiceAreaMap.tsx           ← Google Maps

   📁 blog/
      BlogHero.tsx                 ← Hero section
      FeaturedPost.tsx             ← Large post card
      CategoryFilters.tsx          ← Filter buttons
      BlogGrid.tsx                 ← Post grid
      BlogSidebar.tsx              ← Sidebar
      NewsletterSignup.tsx         ← Email capture

   📁 residents/
      PropertySearchWidget.tsx     ← Advanced search
      PropertyCard.tsx             ← Property card
      PropertyGrid.tsx             ← Grid layout

   📁 testimonials/
      TestimonialFilters.tsx       ← Filter controls
      TestimonialCard.tsx          ← Testimonial display
      VideoTestimonial.tsx         ← Video embed
      CaseStudyCard.tsx            ← Case study
      ReviewPlatformEmbed.tsx      ← Review embeds

   📁 areas/
      ServiceAreaMap.tsx           ← Main map
      RegionSection.tsx            ← Region display
      NeighborhoodList.tsx         ← Neighborhood links

   📁 neighborhoods/
      NeighborhoodHero.tsx         ← Hero
      AboutNeighborhood.tsx        ← Description
      RentalMarketStats.tsx        ← Market data
      SchoolsGrid.tsx              ← Schools
      LocalAttractionsList.tsx     ← Attractions
      CommuteTimesWidget.tsx       ← Commute times
      PropertyTypesSection.tsx     ← Property types
      OurExperienceSection.tsx     ← Experience
      AvailablePropertiesGrid.tsx  ← Available rentals
      NeighborhoodCTA.tsx          ← CTA
```

### Required Integrations

1. **Google Maps API**
   - For contact page map
   - For areas-we-serve map
   - For neighborhood commute times
   - Need API key in `.env`

2. **Email Marketing (Mailchimp/Constant Contact)**
   - Newsletter signups on blog
   - Lead magnet delivery
   - Monthly updates

3. **Form Handling**
   - Contact form submissions → FormSubmissions collection
   - Email notifications
   - Auto-responders

4. **Calendly (Optional)**
   - Appointment scheduling widget
   - Embedded on contact page

5. **Video Hosting**
   - YouTube or Vimeo for testimonials
   - Embed codes in Testimonials collection

### Database/Collection Updates

**No new collections needed!** All existing collections support the plan:

- ✅ Pages - for all core pages
- ✅ Neighborhoods - perfect for dynamic neighborhood pages
- ✅ Posts - for blog content
- ✅ Testimonials - for testimonial page
- ✅ FAQs - for FAQ sections
- ✅ TeamMembers - for About page
- ✅ Properties - for resident property search
- ✅ FormSubmissions - for contact form
- ✅ Settings - for global contact info

### Seed Scripts to Create

```
scripts/
  ├── seed-neighborhoods.ts        ← Populate 50 neighborhoods
  ├── seed-blog-posts.ts           ← Initial 5-10 blog posts
  ├── seed-about-page.ts           ← About Us page content
  ├── seed-pricing-page.ts         ← Pricing page content
  ├── seed-process-page.ts         ← Our Process page content
  ├── seed-residents-page.ts       ← For Residents page content
  ├── seed-testimonials-page.ts    ← Testimonials page content
  └── seed-areas-page.ts           ← Areas We Serve main page
```

---

## ✅ SUCCESS CRITERIA

### Phase 1 Complete When:
- [ ] All 11 core pages built and live
- [ ] Homepage, Services, Property Owners already ✅
- [ ] About, Pricing, Contact, Blog, Process, Residents, Testimonials, Areas We Serve all ✅
- [ ] All pages mobile-responsive
- [ ] All forms functional and tested
- [ ] SEO metadata on all pages
- [ ] Analytics tracking verified
- [ ] All CTAs lead to contact or appropriate pages

### Phase 2 Complete When:
- [ ] 40-50 neighborhood detail pages live
- [ ] All neighborhoods have complete data
- [ ] Dynamic routing working correctly
- [ ] Property search functional on Residents page
- [ ] 5-10 blog posts published
- [ ] Video testimonials embedded (if available)
- [ ] 3 lead magnet PDFs created and downloadable
- [ ] Email signup forms functional
- [ ] All internal links working
- [ ] Site speed optimized (<2s load time)

---

## 🚀 RECOMMENDED EXECUTION ORDER

### Sprint 1 (Week 1): Foundation Pages
1. About Us (establishes credibility)
2. Pricing (critical for conversion)

### Sprint 2 (Week 2): Conversion Pages
3. Contact (primary conversion point)
4. Blog Archive (content marketing foundation)

### Sprint 3 (Week 3): Educational Pages
5. Our Process (explains journey)
6. For Residents (captures resident leads)

### Sprint 4 (Week 4): Social Proof & Geography
7. Testimonials (builds trust)
8. Areas We Serve main page (SEO foundation)

### Sprint 5-6 (Week 5-6): Neighborhood Expansion
9. Build neighborhood template
10. Seed 50 neighborhoods
11. Test and refine

### Sprint 7 (Week 7): Content & Enhancement
12. Write and publish 5 blog posts
13. Enhance property pages

### Sprint 8 (Week 8): Assets & Polish
14. Create lead magnet PDFs
15. Record/edit video testimonials (if applicable)
16. Final testing and optimization

---

## 📊 TOTAL PROJECT ESTIMATE

```
PHASE 1: 56-72 hours (7-9 days)
PHASE 2: 111-146 hours (14-18 days)

TOTAL: 167-218 hours (21-27 full working days)

At 40 hours/week:
Approximately 4-5.5 weeks of focused work
```

---

## 🎨 DESIGN SYSTEM COMPLIANCE

All pages must use existing design system:

### Color Palette
- **Deep Navy** `#1B3A6D` - Headers, main headlines
- **Sky Blue** `#5A9FD4` - Links, icons, interactive
- **Warm Gold** `#C9A961` - Primary CTAs
- **Sage Green** `#7A9B76` - Success indicators

### Typography
- **Headings**: Montserrat or Poppins (Bold, Semi-Bold)
- **Body**: Open Sans or Inter (Regular, Medium)

### Blocks to Reuse
- IconGrid
- ServicesGrid
- Content
- ProcessTimeline
- TestimonialsCarousel
- PricingComparison
- FAQAccordion
- HeroCTA
- Statistics
- TeamGrid
- TrustBadges
- HTMLEmbed
- Banner

### Component Patterns
- Cards with subtle shadows
- Hover effects (slight lift + shadow)
- Generous white space
- Mobile-first responsive
- Consistent icon style (line icons)

---

## 🔄 NEXT IMMEDIATE STEPS

1. **Review and approve this plan**
2. **Prioritize pages** - confirm execution order
3. **Gather content** - founder story, team bios, pricing numbers
4. **Start with About Us page** - Week 1, Sprint 1
5. **Create TodoWrite checklist** for Phase 1, Week 1

---

## 📝 NOTES & CONSIDERATIONS

### Content Writing
- Most time-consuming aspect
- Neighborhood data collection requires research
- Blog posts require subject matter expertise
- Consider hiring content writer to parallelize

### Design Assets
- Need professional photos: office, team, properties, neighborhoods
- Need certification badges: NARPM, BBB, RE/MAX
- Need founder/team headshots
- Consider professional photo shoot

### Technical Complexity
- Interactive calculators on Pricing page are custom builds
- Google Maps integration requires API setup
- Multi-step form requires complex state management
- Video embeds need hosting setup

### SEO Priority
- Neighborhood pages are highest SEO value (40-50 pages targeting local keywords)
- Blog posts build domain authority over time
- Internal linking strategy critical

### Dependencies
- Google Maps API key
- Email service provider (Mailchimp, etc.)
- Video hosting (YouTube/Vimeo accounts)
- Calendly account (if using scheduling widget)
- Form submission email notifications

---

This plan provides a complete roadmap to finish Phases 1 and 2 of the Allay Property Management website. The neighborhood pages leverage the existing Neighborhoods collection perfectly, requiring no database changes—just template creation and data population.

**Ready to proceed?** Let's start with creating the About Us page build script.
