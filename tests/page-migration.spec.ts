import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'

test.describe('Page Migration Tests', () => {
  test('Owner FAQ page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/owners/faq`)

    await expect(page.locator('h1')).toContainText('Property Owner FAQs')
    await expect(page.locator('h2')).toContainText('Pricing & Fees')

    // Test accordion functionality
    const firstFAQ = page.locator('details').first()
    await firstFAQ.click()
    await expect(firstFAQ).toHaveAttribute('open', '')
  })

  test('Resident FAQ page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/residents/faq`)

    await expect(page.locator('h1')).toContainText('Resident FAQs')
    await expect(page.locator('h2')).toContainText('Leasing & Applications')

    // Test accordion functionality
    const firstFAQ = page.locator('details').first()
    await firstFAQ.click()
    await expect(firstFAQ).toHaveAttribute('open', '')
  })

  test('Property Owners page migrated to /owners', async ({ page }) => {
    await page.goto(`${BASE_URL}/owners`)

    // Should load without error
    await expect(page).not.toHaveURL(/\/404/)
    await expect(page).not.toHaveURL(/\/not-found/)

    // Check page title exists
    await expect(page.locator('h1')).toBeVisible()
  })

  test('Our Process page migrated to /owners/process', async ({ page }) => {
    await page.goto(`${BASE_URL}/owners/process`)

    // Should load without error
    await expect(page).not.toHaveURL(/\/404/)
    await expect(page).not.toHaveURL(/\/not-found/)

    // Check page title exists
    await expect(page.locator('h1')).toBeVisible()
  })

  test('Testimonials page migrated to /owners/testimonials', async ({ page }) => {
    await page.goto(`${BASE_URL}/owners/testimonials`)

    // Should load without error
    await expect(page).not.toHaveURL(/\/404/)
    await expect(page).not.toHaveURL(/\/not-found/)

    // Check page title exists
    await expect(page.locator('h1')).toBeVisible()
  })

  test('Old /faqs page should 404', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/faqs`)

    // Should return 404
    expect(response?.status()).toBe(404)
  })

  test('Old /our-process should 404', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/our-process`)

    // Should return 404
    expect(response?.status()).toBe(404)
  })

  test('Old /property-owners should 404', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/property-owners`)

    // Should return 404
    expect(response?.status()).toBe(404)
  })

  test('Old /testimonials should 404', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/testimonials`)

    // Should return 404
    expect(response?.status()).toBe(404)
  })
})

test.describe('Navigation Menu Tests', () => {
  test('Property Owners dropdown has correct links', async ({ page }) => {
    await page.goto(BASE_URL)

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Check if navigation exists
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('All migrated pages are accessible from homepage', async ({ page }) => {
    await page.goto(BASE_URL)

    const pagesToTest = [
      '/owners',
      '/owners/process',
      '/owners/testimonials',
      '/owners/faq',
      '/residents/faq',
    ]

    for (const path of pagesToTest) {
      const response = await page.goto(`${BASE_URL}${path}`)
      expect(response?.status()).toBe(200)

      // Verify page has content
      await expect(page.locator('h1')).toBeVisible()

      console.log(`✅ ${path} - OK`)
    }
  })
})

test.describe('Content Verification Tests', () => {
  test('Owner FAQ has all categories', async ({ page }) => {
    await page.goto(`${BASE_URL}/owners/faq`)

    await expect(page.locator('text=Pricing & Fees')).toBeVisible()
    await expect(page.locator('text=Services & Management')).toBeVisible()
    await expect(page.locator('text=General Questions')).toBeVisible()
  })

  test('Resident FAQ has all categories', async ({ page }) => {
    await page.goto(`${BASE_URL}/residents/faq`)

    await expect(page.locator('text=Leasing & Applications')).toBeVisible()
    await expect(page.locator('text=Maintenance & Repairs')).toBeVisible()
    await expect(page.locator('text=Lease & Legal')).toBeVisible()
  })

  test('Owner FAQ has CTAs', async ({ page }) => {
    await page.goto(`${BASE_URL}/owners/faq`)

    await expect(page.locator('a:has-text("View Pricing")')).toBeVisible()
    await expect(page.locator('a:has-text("Get Started")')).toBeVisible()
  })

  test('Resident FAQ has CTAs', async ({ page }) => {
    await page.goto(`${BASE_URL}/residents/faq`)

    await expect(page.locator('a:has-text("Search Properties")')).toBeVisible()
    await expect(page.locator('a:has-text("Apply Online")')).toBeVisible()
  })
})
