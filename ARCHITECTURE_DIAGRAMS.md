# Architecture Diagrams - Phases 1 & 2
## Visual Overview of Implementation

---

## 📊 CURRENT VS COMPLETED STATE

```
┌─────────────────────────────────────────────────────────────┐
│                    CURRENT STATE (27%)                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ Homepage (/)                                             │
│  ✅ Services (/services)                                     │
│  ✅ Property Owners (/property-owners)                       │
│                                                              │
│  ❌ About Us                                                 │
│  ❌ Pricing                                                  │
│  ❌ Contact                                                  │
│  ❌ Blog Archive                                             │
│  ❌ Our Process                                              │
│  ❌ For Residents                                            │
│  ❌ Testimonials                                             │
│  ❌ Areas We Serve (main)                                    │
│  ❌ Neighborhood Pages (0/40-50)                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘

                            ↓

┌─────────────────────────────────────────────────────────────┐
│              PHASE 1 & 2 COMPLETE (100%)                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ Homepage                                                 │
│  ✅ Services                                                 │
│  ✅ Property Owners                                          │
│  ✅ About Us                                                 │
│  ✅ Pricing (with calculators)                               │
│  ✅ Contact (multi-step form)                                │
│  ✅ Blog Archive (with 5-10 posts)                           │
│  ✅ Our Process                                              │
│  ✅ For Residents (with property search)                     │
│  ✅ Testimonials (with video embeds)                         │
│  ✅ Areas We Serve (main + map)                              │
│  ✅ Neighborhood Pages (40-50 dynamic pages)                 │
│  ✅ Lead Magnets (3 PDFs)                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ SITE ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                    ALLAY PROPERTY MANAGEMENT                     │
│                         SITE STRUCTURE                           │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
   ┌─────────┐         ┌──────────┐          ┌──────────┐
   │  OWNER  │         │ RESIDENT │          │  ABOUT   │
   │  PAGES  │         │  PAGES   │          │  PAGES   │
   └─────────┘         └──────────┘          └──────────┘
        │                     │                     │
        │                     │                     │
   ┌────┴────┐           ┌────┴────┐          ┌────┴────┐
   │         │           │         │          │         │
   ▼         ▼           ▼         ▼          ▼         ▼

Homepage    Services   Residents  Properties  About    Blog
    │           │          │          │         │        │
    │           │          │          │         │        │
Property    Pricing    [Search]   [Listings]  Team   Resources
 Owners         │          │          │         │        │
    │           │          │      [Detail]   Values  [Articles]
    │           │       [Apply]     Pages      │        │
Our Process [Calculator]   │          │    RE/MAX   [Posts]
    │           │          │          │     Info      │
    │      [Compare]   [Portal]      │        │       │
Testimonials   │       [FAQs]        │   Community   │
    │           │          │          │        │       │
    │      [ROI Tool]      │     Properties Creds     │
    │           │          │       Archive    │       │
    │           │          │          │        │       │
    ▼           ▼          ▼          ▼        ▼       ▼

    Contact ←──────────────┬──────────────→ Newsletter
   (Primary Conversion Point)        (Email Capture)


┌─────────────────────────────────────────────────────────────────┐
│              NEIGHBORHOOD PAGES (SPECIAL SECTION)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Areas We Serve (Main)                                           │
│         │                                                        │
│         ├─ Interactive Map                                       │
│         ├─ Region: North Atlanta (13 neighborhoods)              │
│         ├─ Region: East Atlanta (6 neighborhoods)                │
│         ├─ Region: South Atlanta (7 neighborhoods)               │
│         ├─ Region: West Atlanta (7 neighborhoods)                │
│         ├─ Region: Central/Midtown (5 neighborhoods)             │
│         └─ Region: Perimeter (5+ neighborhoods)                  │
│                   │                                              │
│                   └─→ [Each links to detail page]                │
│                                                                  │
│  /areas-we-serve/[slug]  (Dynamic Route - 40-50 pages)          │
│         │                                                        │
│         ├─ About [Neighborhood]                                  │
│         ├─ Rental Market Data                                    │
│         ├─ Schools                                               │
│         ├─ Local Attractions                                     │
│         ├─ Property Types                                        │
│         ├─ Our Experience                                        │
│         ├─ Available Properties (filtered)                       │
│         └─ CTA: Get Free Analysis                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ NEIGHBORHOODS COLLECTION STRUCTURE

```
┌───────────────────────────────────────────────────────────────┐
│              NEIGHBORHOODS COLLECTION                          │
│              (Already Exists - Perfect!)                       │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Neighborhoods                                                 │
│    ├─ name: "Buckhead"                                         │
│    ├─ slug: "buckhead"                                         │
│    ├─ region: "north"                                          │
│    ├─ county: "Fulton County"                                  │
│    │                                                            │
│    ├─ description: (RichText)                                  │
│    │    └─ 2-3 paragraphs about the neighborhood               │
│    │                                                            │
│    ├─ marketData:                                              │
│    │    ├─ averageRent1BR: 1850                                │
│    │    ├─ averageRent2BR: 2400                                │
│    │    ├─ averageRent3BR: 3200                                │
│    │    ├─ averageRent4BR: 4500                                │
│    │    ├─ averageVacancyRate: 3.2                             │
│    │    ├─ averageDaysOnMarket: 12                             │
│    │    └─ propertiesManaged: 47                               │
│    │                                                            │
│    ├─ topSchools: []                                           │
│    │    ├─ schoolName: "Sarah Smith Elementary"                │
│    │    ├─ schoolType: "elementary"                            │
│    │    └─ rating: 9                                           │
│    │                                                            │
│    ├─ nearbyAttractions: []                                    │
│    │    ├─ attraction: "Piedmont Park"                         │
│    │    └─ category: "park"                                    │
│    │                                                            │
│    ├─ commuteTimes:                                            │
│    │    ├─ commuteToMidtown: "10 minutes"                      │
│    │    ├─ commuteToDowntown: "15 minutes"                     │
│    │    ├─ commuteToAirport: "25 minutes"                      │
│    │    └─ commuteToPerimeterMall: "20 minutes"                │
│    │                                                            │
│    ├─ martaAccess: "rail-near"                                 │
│    │                                                            │
│    ├─ metaDescription: "Discover rental properties..."         │
│    ├─ featuredImage: (Upload)                                  │
│    ├─ gallery: []                                              │
│    │    └─ images with captions                                │
│    │                                                            │
│    └─ featured: true/false                                     │
│                                                                │
└───────────────────────────────────────────────────────────────┘

                            ↓
                    (Fetched by)
                            ↓

┌───────────────────────────────────────────────────────────────┐
│         /areas-we-serve/[slug]/page.tsx                        │
│         (Dynamic Next.js Route)                                │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  export async function generateStaticParams() {                │
│    const neighborhoods = await getNeighborhoods()              │
│    return neighborhoods.map(n => ({ slug: n.slug }))           │
│  }                                                             │
│                                                                │
│  export default async function NeighborhoodPage({              │
│    params: { slug }                                            │
│  }) {                                                          │
│    const neighborhood = await getNeighborhood(slug)            │
│                                                                │
│    return (                                                    │
│      <NeighborhoodTemplate neighborhood={neighborhood} />     │
│    )                                                           │
│  }                                                             │
│                                                                │
└───────────────────────────────────────────────────────────────┘

RESULT: 40-50 static pages generated at build time, all using
        the same template but with unique data from Neighborhoods
        collection. Perfect for SEO!
```

---

## 🔄 NEIGHBORHOOD PAGE TEMPLATE FLOW

```
┌─────────────────────────────────────────────────────────────┐
│         NEIGHBORHOOD PAGE COMPONENT STRUCTURE                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │    <NeighborhoodTemplate>               │
        │      neighborhood={data}                │
        └─────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │  Hero   │          │ Market  │          │ Schools │
   │ Section │          │  Stats  │          │  Grid   │
   └─────────┘          └─────────┘          └─────────┘
        │                     │                     │
        │                     │                     │
   Data Source:         Data Source:          Data Source:
   - name              - marketData          - topSchools[]
   - featuredImage     - averageRent*        - schoolName
                       - vacancyRate         - type
                       - daysOnMarket        - rating
                       - propertiesManaged
        │                     │                     │
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │  About  │          │  Local  │          │Property │
   │Neighbor │          │Attract. │          │  Types  │
   └─────────┘          └─────────┘          └─────────┘
        │                     │                     │
   Data Source:         Data Source:          Data Source:
   - description       - nearbyAttractions[] - Static content
     (RichText)        - commuteTimes        - neighborhood
                       - martaAccess           context
        │                     │                     │
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │   Our   │          │Available│          │   CTA   │
   │Experience│         │Properties│         │ Section │
   └─────────┘          └─────────┘          └─────────┘
        │                     │                     │
   Data Source:         Data Source:          Data Source:
   - propertiesManaged - Properties collection - neighborhood.name
   - Static content    - filter by neighbor   - /contact link

ALL COMPONENTS REUSE DESIGN SYSTEM:
- IconGrid for stats/schools/attractions
- Content blocks for descriptions
- HeroCTA for final conversion
```

---

## 📱 RESPONSIVE LAYOUT STRATEGY

```
┌──────────────────────────────────────────────────────────────┐
│                    MOBILE (320px-767px)                       │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │               Hero (full width)                     │     │
│  │         [Neighborhood] Property Management          │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │             Section 1 (full width)                  │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │             Section 2 (full width)                  │     │
│  │  ┌───────────┐                                      │     │
│  │  │  Card 1   │   ← 1 column layout                 │     │
│  │  └───────────┘                                      │     │
│  │  ┌───────────┐                                      │     │
│  │  │  Card 2   │                                      │     │
│  │  └───────────┘                                      │     │
│  │  ┌───────────┐                                      │     │
│  │  │  Card 3   │                                      │     │
│  │  └───────────┘                                      │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  Stack all sections vertically                               │
│  Single column for cards/grids                               │
│  Touch-friendly button sizes (44px min)                      │
│                                                               │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                   TABLET (768px-1023px)                       │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │               Hero (full width)                     │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │             Section (full width)                    │     │
│  │  ┌────────┐  ┌────────┐                            │     │
│  │  │ Card 1 │  │ Card 2 │  ← 2 column layout         │     │
│  │  └────────┘  └────────┘                            │     │
│  │  ┌────────┐  ┌────────┐                            │     │
│  │  │ Card 3 │  │ Card 4 │                            │     │
│  │  └────────┘  └────────┘                            │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  2-column grid for cards                                     │
│  Sidebar begins to appear (if applicable)                    │
│                                                               │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                  DESKTOP (1024px+)                            │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │               Hero (full width)                     │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌──────────────────────────────┐  ┌──────────────────┐     │
│  │         Main Content         │  │    Sidebar       │     │
│  │                              │  │                  │     │
│  │  ┌────┐ ┌────┐ ┌────┐       │  │  Quick Links     │     │
│  │  │Card│ │Card│ │Card│       │  │  Popular Posts   │     │
│  │  └────┘ └────┘ └────┘       │  │  Contact Info    │     │
│  │                              │  │  Newsletter      │     │
│  │  ┌────┐ ┌────┐ ┌────┐       │  │                  │     │
│  │  │Card│ │Card│ │Card│       │  │  CTA Box         │     │
│  │  └────┘ └────┘ └────┘       │  │                  │     │
│  │                              │  │                  │     │
│  └──────────────────────────────┘  └──────────────────┘     │
│        (70% width)                      (30% width)          │
│                                                               │
│  3-4 column grid for cards                                   │
│  Sidebar with sticky positioning                             │
│  Max content width: 1280px, centered                         │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎨 DESIGN SYSTEM COMPONENT MAPPING

```
┌──────────────────────────────────────────────────────────────┐
│              EXISTING BLOCKS → PAGE USAGE                     │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  IconGrid                                                     │
│    ├─ Homepage (Allay Advantage)                             │
│    ├─ Property Owners (4 sections, 21 cards)                 │
│    ├─ About (Values section)                                 │
│    ├─ Pricing (Guarantees)                                   │
│    ├─ Residents (Benefits, Portal features)                  │
│    └─ Neighborhoods (Market stats, Schools, Attractions)     │
│                                                               │
│  ServicesGrid                                                 │
│    └─ Services (3 sections, 10 services)                     │
│                                                               │
│  ProcessTimeline                                              │
│    ├─ Homepage (4-step process)                              │
│    ├─ Property Owners (Your Journey timeline)                │
│    ├─ Our Process (10-step detailed process)                 │
│    └─ Residents (Application process)                        │
│                                                               │
│  Content                                                      │
│    ├─ Property Owners (Tax Benefits, Resources)              │
│    ├─ About (Story, RE/MAX, Community)                       │
│    ├─ Residents (Requirements, Pet Policy, Resources)        │
│    ├─ Testimonials (Case Studies)                            │
│    └─ Neighborhoods (About section, Experience)              │
│                                                               │
│  PricingComparison                                            │
│    ├─ Homepage (Pricing section)                             │
│    ├─ Services (Service level comparison)                    │
│    └─ Pricing (Full breakdown)                               │
│                                                               │
│  TestimonialsCarousel                                         │
│    ├─ Homepage                                                │
│    └─ Property Owners (Success stories)                      │
│                                                               │
│  FAQAccordion                                                 │
│    ├─ Homepage                                                │
│    ├─ Pricing (Pricing FAQs)                                 │
│    └─ Residents (Resident FAQs)                              │
│                                                               │
│  HeroCTA                                                      │
│    ├─ Homepage (Final CTA)                                   │
│    ├─ Property Owners (Final CTA)                            │
│    ├─ About (Final CTA)                                      │
│    ├─ Pricing (Final CTA)                                    │
│    ├─ Our Process (Final CTA)                                │
│    ├─ Residents (Final CTA)                                  │
│    ├─ Testimonials (Final CTA)                               │
│    └─ Neighborhoods (CTA for each neighborhood)              │
│                                                               │
│  TeamGrid                                                     │
│    └─ About (Team section)                                   │
│                                                               │
│  TrustBadges                                                  │
│    ├─ Homepage (Credibility section)                         │
│    └─ About (Certifications section)                         │
│                                                               │
│  Statistics                                                   │
│    └─ Testimonials (By the Numbers)                          │
│                                                               │
│  Banner                                                       │
│    └─ Any page (announcements, special offers)               │
│                                                               │
│  HTMLEmbed                                                    │
│    ├─ Contact (Google Maps, Calendly widget)                 │
│    ├─ Areas We Serve (Google Maps)                           │
│    └─ Testimonials (Review platform embeds)                  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔌 DATA FLOW ARCHITECTURE

```
┌──────────────────────────────────────────────────────────────┐
│                  PAYLOAD CMS COLLECTIONS                      │
│                    (Data Source)                              │
└──────────────────────────────────────────────────────────────┘
            │
            ├─ Pages ────────────────────┐
            │                             │
            ├─ Posts ───────────────┐     │
            │                       │     │
            ├─ Neighborhoods ────┐  │     │
            │                    │  │     │
            ├─ Properties ─────┐ │  │     │
            │                  │ │  │     │
            ├─ TeamMembers ──┐ │ │  │     │
            │                │ │ │  │     │
            ├─ Testimonials ─┤ │ │  │     │
            │                │ │ │  │     │
            ├─ FAQs ─────────┤ │ │  │     │
            │                │ │ │  │     │
            ├─ Settings ─────┤ │ │  │     │
            │                │ │ │  │     │
            └─ Media ────────┤ │ │  │     │
                             │ │ │  │     │
                             ▼ ▼ ▼  ▼     ▼
                   ┌─────────────────────────────┐
                   │   Next.js App Router        │
                   │   (Server Components)       │
                   └─────────────────────────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
    ┌───────────┐    ┌───────────┐    ┌───────────┐
    │  Static   │    │  Dynamic  │    │   API     │
    │  Pages    │    │   Pages   │    │  Routes   │
    └───────────┘    └───────────┘    └───────────┘
            │                │                │
            │                │                │
    /               /areas-we-serve/    /api/contact
    /about              [slug]          /api/newsletter
    /pricing                            /api/search
    /services      Generated at
    /process       build time for
    /residents     each neighborhood
    /testimonials
    /blog
    /contact

                    ┌─────────────────┐
                    │   USER BROWSER  │
                    │  (Client-Side)  │
                    └─────────────────┘
                            │
                    Interactive Features:
                    - Form validation
                    - Search filters
                    - Calculators
                    - Maps
                    - Carousels
```

---

## 📊 IMPLEMENTATION GANTT CHART

```
WEEK 1: Foundation Pages
├─ Mon-Tue:  About Us page              ████████
├─ Wed-Fri:  Pricing page               ████████████
└─ Weekend:  Buffer/Testing             ████

WEEK 2: Conversion Pages
├─ Mon-Tue:  Contact page               ██████████
├─ Wed-Thu:  Blog Archive               ████████
└─ Fri:      Testing                    ████

WEEK 3: Educational Pages
├─ Mon-Tue:  Our Process                ████████
├─ Wed-Thu:  For Residents              ██████████
└─ Fri:      Testing                    ████

WEEK 4: Social Proof & Geography
├─ Mon-Tue:  Testimonials               ████████
├─ Wed-Thu:  Areas We Serve main        ████████
└─ Fri:      Phase 1 Review             ████

WEEK 5: Neighborhood Template
├─ Mon-Tue:  Template creation          ████████████
├─ Wed-Thu:  Components development     ████████████
└─ Fri:      Testing                    ████

WEEK 6: Neighborhood Data
├─ Mon-Thu:  Seed data collection       ████████████████
│            (40-50 neighborhoods)
└─ Fri:      Data review/refinement     ████

WEEK 7: Content & Enhancement
├─ Mon-Wed:  Blog posts (5)             ████████████
├─ Thu-Fri:  Property enhancement       ████████
└─ Weekend:  Testing                    ████

WEEK 8: Assets & Polish
├─ Mon-Tue:  Lead magnets (3 PDFs)      ██████████
├─ Wed-Thu:  Video testimonials         ██████████
└─ Fri:      Final testing & launch     ████████

KEY:
████ = 4 hours of work
```

---

## 🎯 PRIORITY MATRIX

```
┌──────────────────────────────────────────────────────────────┐
│                    PRIORITY MATRIX                            │
│         (Impact vs. Effort for remaining pages)               │
└──────────────────────────────────────────────────────────────┘

    HIGH IMPACT
        ▲
        │
        │   ┌─────────────┐         ┌─────────────┐
        │   │  Contact    │         │ Neighborhood│
        │   │   Page      │         │   Pages     │
        │   │  (Convert)  │         │  (40-50)    │
        │   └─────────────┘         └─────────────┘
        │        ★★★★★                   ★★★★★
        │
        │   ┌─────────────┐         ┌─────────────┐
        │   │  Pricing    │         │   About     │
        │   │   Page      │         │    Page     │
        │   │ +Calculator │         │  (Credible) │
        │   └─────────────┘         └─────────────┘
        │        ★★★★                    ★★★★
        │
        │   ┌─────────────┐         ┌─────────────┐
        │   │Testimonials │         │ Our Process │
        │   │   Page      │         │    Page     │
        │   │             │         │             │
        │   └─────────────┘         └─────────────┘
        │        ★★★                     ★★★
        │
        │   ┌─────────────┐         ┌─────────────┐
        │   │ Residents   │         │ Areas We    │
        │   │   Page      │         │ Serve Main  │
        │   │             │         │             │
        │   └─────────────┘         └─────────────┘
        │        ★★                      ★★★★
        │
        │   ┌─────────────┐         ┌─────────────┐
        │   │    Blog     │         │Lead Magnets │
        │   │  Archive    │         │  (3 PDFs)   │
        │   │             │         │             │
        │   └─────────────┘         └─────────────┘
        │        ★★                      ★★
        │
    LOW IMPACT
        └──────────────────────────────────────────────→
           EASY                                    HARD
              (Low Effort)                  (High Effort)

LEGEND:
★★★★★ = Critical path item
★★★★  = High priority
★★★   = Medium priority
★★    = Low priority

RECOMMENDED BUILD ORDER:
1. Contact (High impact, medium effort, critical conversion)
2. Pricing (High impact, high effort due to calculators)
3. Neighborhood template (High impact, high effort, unlocks 40-50 pages)
4. About (High impact, medium effort, builds credibility)
5. Our Process (Medium impact, low effort, educational)
6. Testimonials (Medium impact, low effort, social proof)
7. Areas We Serve main (Medium impact, low effort, unlocks neighborhoods)
8. Residents (Low-medium impact, medium effort)
9. Blog Archive (Low impact, low effort)
10. Lead Magnets (Low impact, high effort)
```

---

This visual guide complements the detailed implementation plan. Use these diagrams as reference throughout the build process.
