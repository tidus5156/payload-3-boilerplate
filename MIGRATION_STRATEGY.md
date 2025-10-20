# COMPLETE MIGRATION STRATEGY: Owner/Resident URL Restructuring

## Executive Summary

This document outlines the complete migration from a mixed URL structure to a clean, SEO-optimized `/owners/*` and `/residents/*` architecture for the Allay Property Management website.

---

## Phase 1: New Page Creation ✅ COMPLETE

### Created Pages:
1. ✅ `/owners/faq` - Property Owner FAQs (organized by category: Pricing, Services, General)
2. ✅ `/residents/faq` - Resident FAQs (organized by category: Leasing, Maintenance, Legal)

---

## Phase 2: Full URL Restructuring Plan

### Current Structure → New Structure Mapping

#### Owner-Focused Pages:
```
CURRENT URL              →  NEW URL                  PRIORITY
/pricing                 →  /owners/pricing          HIGH
/our-process             →  /owners/process          HIGH
/testimonials            →  /owners/testimonials     MEDIUM
/property-owners         →  /owners (homepage)       HIGH
/contact                 →  /owners/get-started      HIGH*
/faqs#owners             →  /owners/faq              HIGH

*Note: /contact could remain as shared, or we create /owners/get-started + /residents/contact
```

#### Resident-Focused Pages:
```
CURRENT URL              →  NEW URL                  PRIORITY
/residents               →  /residents (keep)        LOW
/faqs#residents          →  /residents/faq           HIGH
NEW                      →  /residents/apply         MEDIUM
NEW                      →  /residents/resources     LOW
```

#### Shared/Neutral Pages (Keep as-is):
```
/                        (Homepage - targets both audiences)
/about                   (Company information)
/areas-we-serve          (Geographic targeting)
/areas-we-serve/[slug]   (Neighborhood pages)
/blog                    (Content marketing)
/posts/[slug]            (Individual blog posts)
/properties              (Property listings - could go under /residents later)
```

---

## Phase 3: Directory Structure Changes

### New Directories to Create:
```bash
src/app/(frontend)/
├── owners/
│   ├── page.tsx              # Owner homepage (replaces /property-owners)
│   ├── faq/page.tsx          # ✅ CREATED
│   ├── pricing/page.tsx      # Move from root
│   ├── process/page.tsx      # Move from /our-process
│   ├── testimonials/page.tsx # Move from root
│   └── get-started/page.tsx  # New or move from /contact
│
└── residents/
    ├── page.tsx              # Keep existing
    ├── faq/page.tsx          # ✅ CREATED
    ├── apply/page.tsx        # NEW
    ├── resources/page.tsx    # NEW
    └── portal/page.tsx       # NEW (redirect to external portal)
```

---

## Phase 4: Navigation Menu Restructuring

### Current Header Navigation:
```
Services | Property Owners | Residents | About | Resources | Contact
```

### New Header Navigation:
```
For Owners | For Residents | Services | Areas We Serve | About | Blog
```

### Updated Dropdown Menus:

#### "For Owners" Dropdown:
```javascript
{
  label: 'For Owners',
  link: '/owners',
  children: [
    { label: 'Why Choose Allay', link: '/owners#why-choose' },
    { label: 'Our Process', link: '/owners/process' },
    { label: 'Pricing & Fees', link: '/owners/pricing' },
    { label: 'Success Stories', link: '/owners/testimonials' },
    { label: 'Owner FAQs', link: '/owners/faq' },
    { label: 'Get Started', link: '/owners/get-started' },
    { label: 'Owner Portal Login', link: 'https://portal.example.com' },
  ]
}
```

#### "For Residents" Dropdown:
```javascript
{
  label: 'For Residents',
  link: '/residents',
  children: [
    { label: 'Available Properties', link: '/properties' },
    { label: 'Apply Online', link: '/residents/apply' },
    { label: 'Resident Resources', link: '/residents/resources' },
    { label: 'Resident FAQs', link: '/residents/faq' },
    { label: 'Pay Rent', link: '/residents/portal' },
    { label: 'Resident Portal Login', link: 'https://app.tenantcloud.com' },
  ]
}
```

#### Update Header Seed Data:
**File:** `src/seed/header.ts`

```typescript
export const headerData = {
  navItems: [
    {
      link: {
        type: 'custom',
        label: 'For Owners',
        url: '/owners',
      },
      children: [
        {
          link: {
            type: 'custom',
            label: 'Why Choose Allay',
            url: '/owners#why-choose',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Our Process',
            url: '/owners/process',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Pricing & Fees',
            url: '/owners/pricing',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Success Stories',
            url: '/owners/testimonials',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Owner FAQs',
            url: '/owners/faq',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Get Started',
            url: '/owners/get-started',
          },
        },
      ],
    },
    {
      link: {
        type: 'custom',
        label: 'For Residents',
        url: '/residents',
      },
      children: [
        {
          link: {
            type: 'custom',
            label: 'Available Properties',
            url: '/properties',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Apply Online',
            url: '/residents/apply',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Resident Resources',
            url: '/residents/resources',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Resident FAQs',
            url: '/residents/faq',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Resident Portal Login',
            url: 'https://app.tenantcloud.com',
            newTab: true,
          },
        },
      ],
    },
    {
      link: {
        type: 'custom',
        label: 'Services',
        url: '/services',
      },
    },
    {
      link: {
        type: 'custom',
        label: 'Areas We Serve',
        url: '/areas-we-serve',
      },
    },
    {
      link: {
        type: 'custom',
        label: 'About',
        url: '/about',
      },
    },
    {
      link: {
        type: 'custom',
        label: 'Blog',
        url: '/blog',
      },
    },
  ],
}
```

---

## Phase 5: File Migration Steps

### Step 1: Move Pricing Page
```bash
# Move the file
mv src/app/(frontend)/pricing/page.tsx src/app/(frontend)/owners/pricing/page.tsx

# Update internal links in the file (if any)
# Update meta tags for better SEO targeting
```

### Step 2: Move Our Process Page
```bash
# Create directory
mkdir -p src/app/(frontend)/owners/process

# Move from /our-process to /owners/process
mv src/app/(frontend)/our-process/page.tsx src/app/(frontend)/owners/process/page.tsx
```

### Step 3: Move Testimonials Page
```bash
# Create directory
mkdir -p src/app/(frontend)/owners/testimonials

# Move the file
mv src/app/(frontend)/testimonials/page.tsx src/app/(frontend)/owners/testimonials/page.tsx
```

### Step 4: Create Owner Homepage
```bash
# The current /property-owners content becomes /owners
mkdir -p src/app/(frontend)/owners

# Move and update
mv src/app/(frontend)/property-owners/page.tsx src/app/(frontend)/owners/page.tsx
```

### Step 5: Handle Contact/Get Started
**Option A:** Keep /contact as shared, create /owners/get-started that redirects or duplicates
**Option B:** Create separate /owners/get-started and /residents/contact pages

**Recommended: Option A** - Keep /contact as shared since both audiences need to contact.

---

## Phase 6: Internal Link Updates

### Files to Update:

1. **Homepage (`src/app/(frontend)/page.tsx` or seed data)**
   - Update all CTA links to new structure
   - `/pricing` → `/owners/pricing`
   - `/our-process` → `/owners/process`
   - `/contact` → `/owners/get-started` (owner-focused CTAs)

2. **About Page**
   - Update navigation links

3. **All Existing Pages**
   - Search for hardcoded links to old URLs
   - Use find/replace: `/pricing` → `/owners/pricing`
   - Use find/replace: `/our-process` → `/owners/process`

4. **Block Components**
   - Check CallToAction blocks for hardcoded URLs
   - Check HeroCTA blocks

5. **Seed Data**
   - Update `src/seed/pages/homepage.ts` - all CTA links
   - Update `src/seed/settings.ts` - if any links exist
   - Update `src/seed/header.ts` - ✅ (covered above)

---

## Phase 7: SEO Optimization

### Meta Tags for New Pages:

#### `/owners/faq` - ✅ DONE
```typescript
title: 'Property Owner FAQs | Allay Property Management'
description: 'Get answers to common questions about property management fees, services, tenant screening, and more. Expert guidance for Atlanta property owners.'
```

#### `/residents/faq` - ✅ DONE
```typescript
title: 'Resident FAQs | Allay Property Management'
description: 'Get answers to common renter questions about applications, lease terms, maintenance requests, rent payment, and more in Metro Atlanta.'
```

#### `/owners/pricing`
```typescript
title: 'Property Management Pricing Atlanta | Transparent Fees | Allay'
description: 'See our transparent property management pricing. 8-10% monthly fee, no hidden costs, no setup fees. Serving Metro Atlanta property owners.'
```

#### `/owners/process`
```typescript
title: 'Our Property Management Process | How It Works | Allay Atlanta'
description: 'Learn our proven property management process from free rental analysis to ongoing management. Fast leasing, quality tenants, stress-free ownership.'
```

#### `/owners/testimonials`
```typescript
title: 'Property Owner Testimonials & Reviews | Allay Atlanta'
description: 'Read real reviews from Atlanta property owners. See why 500+ owners trust Allay Property Management for stress-free rental management.'
```

#### `/owners` (homepage)
```typescript
title: 'Atlanta Property Management for Owners | Allay at RE/MAX'
description: 'Professional property management for Metro Atlanta rental properties. Maximize returns, minimize stress. 98% rent collection, 15-day average leasing.'
```

### URL Structure Benefits:
1. **Topical Clustering** - All owner content under /owners/
2. **Clear User Intent** - Search engines understand audience
3. **Breadcrumb SEO** - `Home > Owners > Pricing`
4. **Keyword Targeting** - Each page targets specific long-tail keywords

---

## Phase 8: Comprehensive Playwright Testing Plan

### Test Suite Structure:

```typescript
// tests/migration/owners-pages.spec.ts
describe('Owner Pages', () => {
  test('Owners homepage loads', async ({ page }) => {
    await page.goto('http://localhost:3000/owners')
    await expect(page).toHaveTitle(/Atlanta Property Management for Owners/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('Owners FAQ loads and displays categories', async ({ page }) => {
    await page.goto('http://localhost:3000/owners/faq')
    await expect(page.locator('h1')).toContainText('Property Owner FAQs')
    await expect(page.locator('h2')).toContainText('Pricing & Fees')
    await expect(page.locator('h2')).toContainText('Services & Management')

    // Test FAQ accordion
    const firstFAQ = page.locator('details').first()
    await firstFAQ.click()
    await expect(firstFAQ).toHaveAttribute('open', '')
  })

  test('Owners pricing page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/owners/pricing')
    await expect(page).toHaveTitle(/Property Management Pricing/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('Owners process page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/owners/process')
    await expect(page).toHaveTitle(/Property Management Process/)
  })

  test('Owners testimonials page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/owners/testimonials')
    await expect(page).toHaveTitle(/Property Owner Testimonials/)
  })
})

// tests/migration/residents-pages.spec.ts
describe('Resident Pages', () => {
  test('Residents homepage loads', async ({ page }) => {
    await page.goto('http://localhost:3000/residents')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('Residents FAQ loads and displays categories', async ({ page }) => {
    await page.goto('http://localhost:3000/residents/faq')
    await expect(page.locator('h1')).toContainText('Resident FAQs')
    await expect(page.locator('h2')).toContainText('Leasing & Applications')
    await expect(page.locator('h2')).toContainText('Maintenance & Repairs')

    // Test FAQ accordion
    const firstFAQ = page.locator('details').first()
    await firstFAQ.click()
    await expect(firstFAQ).toHaveAttribute('open', '')
  })
})

// tests/migration/navigation.spec.ts
describe('Navigation Menu', () => {
  test('For Owners dropdown displays correctly', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const ownersLink = page.locator('nav a:has-text("For Owners")')
    await ownersLink.hover()

    await expect(page.locator('text=Our Process')).toBeVisible()
    await expect(page.locator('text=Pricing & Fees')).toBeVisible()
    await expect(page.locator('text=Owner FAQs')).toBeVisible()
  })

  test('For Residents dropdown displays correctly', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const residentsLink = page.locator('nav a:has-text("For Residents")')
    await residentsLink.hover()

    await expect(page.locator('text=Available Properties')).toBeVisible()
    await expect(page.locator('text=Resident FAQs')).toBeVisible()
    await expect(page.locator('text=Apply Online')).toBeVisible()
  })

  test('Owner menu links navigate correctly', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.locator('text=For Owners').hover()
    await page.locator('text=Owner FAQs').click()

    await expect(page).toHaveURL(/\/owners\/faq/)
    await expect(page.locator('h1')).toContainText('Property Owner FAQs')
  })
})

// tests/migration/internal-links.spec.ts
describe('Internal Link Updates', () => {
  test('Homepage CTAs link to correct owner pages', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Check that pricing links go to /owners/pricing
    const pricingLinks = page.locator('a[href="/owners/pricing"]')
    await expect(pricingLinks.first()).toBeVisible()

    // Check that process links go to /owners/process
    const processLinks = page.locator('a[href="/owners/process"]')
    await expect(processLinks.first()).toBeVisible()
  })

  test('No broken links exist', async ({ page }) => {
    const pagesToCheck = [
      '/',
      '/owners',
      '/owners/faq',
      '/owners/pricing',
      '/owners/process',
      '/owners/testimonials',
      '/residents',
      '/residents/faq',
      '/about',
      '/areas-we-serve',
    ]

    for (const pageUrl of pagesToCheck) {
      await page.goto(`http://localhost:3000${pageUrl}`)

      // Get all links on the page
      const links = await page.locator('a[href^="/"]').all()

      for (const link of links) {
        const href = await link.getAttribute('href')
        if (href && href.startsWith('/')) {
          const response = await page.request.get(`http://localhost:3000${href}`)
          expect(response.status()).toBeLessThan(400)
        }
      }
    }
  })
})
```

### Run Tests:
```bash
# Create test file
npx playwright test tests/migration/ --headed

# Or run all tests
npx playwright test
```

---

## Phase 9: Deployment Checklist

### Pre-Deployment:
- [ ] All pages moved to new structure
- [ ] Navigation menu updated in header seed data
- [ ] All internal links updated
- [ ] All CTA buttons point to correct URLs
- [ ] Meta tags optimized for each page
- [ ] Playwright tests passing
- [ ] Manual QA on all pages
- [ ] Mobile responsiveness verified

### Post-Deployment (Production Only):
- [ ] Submit new sitemap to Google Search Console
- [ ] Monitor Google Analytics for traffic patterns
- [ ] Check for 404 errors in Search Console
- [ ] Update any external links (social media, email signatures, etc.)
- [ ] Monitor keyword rankings for new URLs

---

## Phase 10: Rollout Timeline

### Week 1:
- ✅ Create `/owners/faq` and `/residents/faq`
- Move `/pricing` to `/owners/pricing`
- Move `/our-process` to `/owners/process`
- Update homepage CTAs

### Week 2:
- Move `/testimonials` to `/owners/testimonials`
- Create `/owners` homepage (from /property-owners)
- Update navigation menu seed data
- Run navigation through database

### Week 3:
- Update all internal links across site
- Create Playwright test suite
- Run comprehensive testing
- Fix any broken links

### Week 4:
- Final QA testing
- Deploy to production
- Monitor analytics
- Update external links

---

## Success Metrics

### SEO Targets (3-6 months post-migration):
- Improved keyword rankings for "Atlanta property management owners"
- Higher click-through rates on owner-focused pages
- Lower bounce rates due to better audience segmentation
- Increased organic traffic to /owners/* pages

### User Experience Targets:
- Faster task completion (users find relevant info quicker)
- Reduced navigation confusion
- Higher conversion rates on audience-specific CTAs

---

## Rollback Plan

If issues arise:
1. Keep old page files temporarily (don't delete, just move)
2. Can revert navigation menu via database update
3. Old URLs will still work until files are deleted
4. No 301 redirects needed since not yet in production

---

## Additional Resources

### Tools Needed:
- Playwright for testing
- Find/replace across codebase for link updates
- Database access for navigation updates

### Documentation to Update:
- This migration strategy doc
- CLAUDE.md (update page structure section)
- Any onboarding docs for new developers

---

## Questions & Decisions Needed

1. **Contact Page Strategy:**
   - Keep /contact as shared? ✓ RECOMMENDED
   - Or create /owners/get-started + /residents/contact?

2. **Property Listings:**
   - Keep /properties at root?
   - Or move to /residents/properties?
   - RECOMMENDED: Keep at root for now, can move later

3. **Blog/Resources:**
   - Keep at root? ✓ YES
   - Blog serves both audiences

4. **Old /faqs Page:**
   - Delete after migration? ✓ YES
   - Keep as redirect hub? NO

---

**End of Migration Strategy Document**
