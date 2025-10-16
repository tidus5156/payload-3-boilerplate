# Accessibility Testing Checklist

This document provides comprehensive testing procedures to ensure WCAG 2.1 Level AA compliance for the Allay Property Management website.

## Quick Start

### Automated Testing
```bash
# Install dependencies (if not already installed)
pnpm add -D @axe-core/playwright

# Run accessibility tests
pnpm test:accessibility
```

### Manual Testing Tools
- **Keyboard**: Built-in OS keyboard
- **Screen Reader**:
  - macOS: VoiceOver (Cmd + F5)
  - Windows: NVDA (free) or JAWS
  - Linux: Orca
- **Browser DevTools**: Chrome/Edge/Firefox accessibility inspector
- **Extensions**:
  - axe DevTools (Chrome/Firefox)
  - WAVE (Chrome/Firefox)
  - Lighthouse (Chrome DevTools)

---

## WCAG 2.1 AA Testing Checklist

### 1. Perceivable

#### 1.1 Text Alternatives (WCAG 1.1.1 - Level A)
- [ ] All images have appropriate alt text
- [ ] Decorative images use empty alt (`alt=""`) or are CSS backgrounds
- [ ] Icons have accessible labels (`aria-label` or `sr-only` text)
- [ ] Form inputs have associated labels
- [ ] Buttons contain text or `aria-label`

**Test Method**: Use screen reader to navigate through page content

**Example Check**:
```bash
# Navigate to page and activate screen reader
# Tab through all images and verify announcements
```

#### 1.2 Time-based Media (WCAG 1.2.1-1.2.5)
- [ ] Videos have captions
- [ ] Audio content has transcripts
- [ ] Media players have accessible controls

**Note**: Currently no video/audio on site - mark N/A

#### 1.3 Adaptable (WCAG 1.3.1-1.3.3 - Level A)
- [ ] Semantic HTML used (`<header>`, `<nav>`, `<main>`, `<footer>`)
- [ ] Headings follow logical hierarchy (h1 → h2 → h3)
- [ ] Lists use `<ul>`, `<ol>`, or `<dl>` tags
- [ ] Tables have proper headers and captions
- [ ] Form fields have programmatic labels
- [ ] Reading order makes sense without CSS

**Test Method**:
1. Use browser DevTools Accessibility tree
2. Disable CSS and verify content order
3. Use headings extension to verify hierarchy

**Browser Test**:
```javascript
// In browser console - check heading hierarchy
Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  .map(h => `${h.tagName}: ${h.textContent.trim()}`)
```

#### 1.4 Distinguishable (WCAG 1.4.1-1.4.13)

##### Color Contrast (1.4.3 - Level AA)
- [ ] Normal text has 4.5:1 contrast ratio
- [ ] Large text (18pt+ or 14pt+ bold) has 3:1 contrast
- [ ] UI components have 3:1 contrast
- [ ] Focus indicators have 3:1 contrast

**Test Method**: Use browser DevTools contrast checker or WAVE extension

**Automated Check**:
```typescript
// src/utilities/__tests__/accessibility.test.ts
import { validateColorContrast } from '@/utilities/accessibility'

test('Brand colors meet WCAG AA contrast', () => {
  expect(validateColorContrast('#1B3A6D', '#FFFFFF', 'AA')).toBe(true) // deepNavy on white
  expect(validateColorContrast('#9A7D3C', '#FFFFFF', 'AA')).toBe(true) // warmGoldDark on white
})
```

##### Resize Text (1.4.4 - Level AA)
- [ ] Text can be resized to 200% without loss of content or functionality
- [ ] No horizontal scrolling at 200% zoom (except data tables)
- [ ] Layout doesn't break at larger text sizes

**Test Method**:
1. Set browser zoom to 200%
2. Navigate entire site
3. Verify all content is accessible

##### Images of Text (1.4.5 - Level AA)
- [ ] Text is actual text, not images (exceptions: logos, essential images)

**Test Method**: Visual inspection of all images

##### Reflow (1.4.10 - Level AA)
- [ ] Content reflows at 320px width (mobile)
- [ ] No horizontal scrolling required
- [ ] All functionality available at narrow widths

**Test Method**:
```bash
# Use Playwright to test responsive design
pnpm playwright test --project=mobile
```

##### Non-text Contrast (1.4.11 - Level AA)
- [ ] UI components have 3:1 contrast against background
- [ ] Focus indicators visible
- [ ] Button borders/shapes distinguishable

**Test Method**: Use color contrast analyzer on interactive elements

##### Text Spacing (1.4.12 - Level AA)
- [ ] Content readable when text spacing is increased:
  - Line height: 1.5x font size
  - Paragraph spacing: 2x font size
  - Letter spacing: 0.12x font size
  - Word spacing: 0.16x font size

**Test Method**: Apply CSS overrides and verify no content loss
```css
* {
  line-height: 1.5 !important;
  letter-spacing: 0.12em !important;
  word-spacing: 0.16em !important;
}
p {
  margin-bottom: 2em !important;
}
```

---

### 2. Operable

#### 2.1 Keyboard Accessible (WCAG 2.1.1-2.1.4 - Level A)
- [ ] All functionality available via keyboard
- [ ] No keyboard traps
- [ ] Focus order is logical
- [ ] Tab key moves through interactive elements
- [ ] Enter/Space activates buttons and links
- [ ] Escape closes modals and menus
- [ ] Arrow keys work in custom widgets (accordions, dropdowns)

**Test Method**:
1. Disconnect mouse
2. Use only Tab, Shift+Tab, Enter, Space, Escape, Arrow keys
3. Complete all user flows (navigation, forms, CTAs)

**Keyboard Navigation Checklist**:
```
Navigation:
- [ ] Tab to skip link → Press Enter → Focus moves to main content
- [ ] Tab to mobile menu button → Press Enter → Menu opens
- [ ] Tab through menu items → Press Enter → Navigate to page
- [ ] Press Escape → Menu closes

Forms:
- [ ] Tab through all fields
- [ ] Arrow keys work in select dropdowns
- [ ] Enter submits form
- [ ] Validation errors announced

Interactive Elements:
- [ ] FAQ accordions toggle with Enter/Space
- [ ] Arrow keys navigate accordion items (if applicable)
- [ ] Statistics blocks don't trap focus
```

#### 2.2 Enough Time (WCAG 2.2.1-2.2.2)
- [ ] No time limits on content
- [ ] Auto-updating content can be paused
- [ ] No auto-advancing carousels (or controls provided)

**Current Status**:
- Testimonials carousel: Manual controls only ✅
- Animations: Respect `prefers-reduced-motion` ✅

#### 2.3 Seizures and Physical Reactions (WCAG 2.3.1)
- [ ] No content flashes more than 3 times per second

**Current Status**: No flashing content ✅

#### 2.4 Navigable (WCAG 2.4.1-2.4.7 - Level A & AA)
- [ ] Skip link provided (2.4.1) ✅
- [ ] Page titles describe content (2.4.2) ✅
- [ ] Focus order is logical (2.4.3)
- [ ] Link purpose clear from text or context (2.4.4)
- [ ] Multiple ways to find content (2.4.5) - search + nav
- [ ] Headings and labels descriptive (2.4.6)
- [ ] Focus indicator visible (2.4.7)

**Test Method**:
```bash
# Check focus indicators
# Tab through page and verify blue outline on all elements
```

**Focus Indicator Test**:
- [ ] Focus outline is visible on all interactive elements
- [ ] Focus outline has 3px width
- [ ] Focus outline has 3:1 contrast against background

#### 2.5 Input Modalities (WCAG 2.5.1-2.5.4 - Level A & AA)
- [ ] Touch targets at least 44x44 CSS pixels (2.5.5 - Level AAA, but we meet it)
- [ ] Pointer gestures have simple alternatives (2.5.1)
- [ ] Pointer cancellation works (2.5.2)
- [ ] Labels match accessible names (2.5.3)
- [ ] Motion actuation can be disabled (2.5.4)

**Current Status**:
- Touch targets: 48px minimum (h-12) ✅
- No complex gestures ✅
- Motion: `prefers-reduced-motion` supported ✅

---

### 3. Understandable

#### 3.1 Readable (WCAG 3.1.1-3.1.2 - Level A)
- [ ] Page language declared (`<html lang="en">`)
- [ ] Language changes marked (if applicable)

**Test Method**: View page source
```html
<!-- Should see -->
<html lang="en">
```

#### 3.2 Predictable (WCAG 3.2.1-3.2.4 - Level A & AA)
- [ ] Focus doesn't trigger automatic context changes
- [ ] Input doesn't trigger automatic context changes (without warning)
- [ ] Navigation is consistent across pages
- [ ] Components are identified consistently

**Test Method**:
1. Tab through all interactive elements - verify no unexpected behavior
2. Compare navigation across multiple pages
3. Verify form fields don't auto-submit

#### 3.3 Input Assistance (WCAG 3.3.1-3.3.4 - Level A & AA)
- [ ] Form errors are identified
- [ ] Form labels or instructions provided
- [ ] Error suggestions provided when possible
- [ ] Legal/financial submissions can be reviewed, corrected, or reversed

**Test Method**:
1. Submit forms with invalid data
2. Verify error messages appear
3. Verify errors are associated with fields (programmatically)
4. Use screen reader to confirm error announcements

**Form Testing**:
```javascript
// Check ARIA attributes for form validation
const input = document.querySelector('input[type="email"]')
console.log({
  'aria-invalid': input.getAttribute('aria-invalid'),
  'aria-describedby': input.getAttribute('aria-describedby')
})
```

---

### 4. Robust

#### 4.1 Compatible (WCAG 4.1.1-4.1.3 - Level A & AA)
- [ ] HTML validates (no major errors)
- [ ] ARIA attributes used correctly
- [ ] Status messages identified programmatically (4.1.3)

**Test Method**:
1. Run HTML validator: https://validator.w3.org/
2. Check ARIA in browser DevTools
3. Verify live regions for dynamic content

**ARIA Validation**:
```bash
# Check for common ARIA errors
# - Mismatched roles
# - Invalid attribute combinations
# - Missing required children
```

---

## Automated Testing

### Playwright + Axe-core

Create `tests/accessibility.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test('Homepage should not have any accessibility violations', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('Mobile navigation should be accessible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3000')

    // Test mobile menu
    await page.click('button[aria-label="Open menu"]')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('FAQ accordion should be accessible', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Scroll to FAQ section
    await page.locator('text=Frequently Asked Questions').scrollIntoViewIfNeeded()

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[data-radix-accordion]')
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('Forms should be accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/contact')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('form')
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
})
```

### Running Tests

```bash
# Install Playwright and Axe
pnpm add -D @playwright/test @axe-core/playwright

# Add to package.json
{
  "scripts": {
    "test:accessibility": "playwright test tests/accessibility.spec.ts"
  }
}

# Run tests
pnpm test:accessibility
```

---

## Browser Testing Matrix

Test on the following browser/screen reader combinations:

### Desktop
- [ ] Chrome + NVDA (Windows)
- [ ] Firefox + NVDA (Windows)
- [ ] Safari + VoiceOver (macOS)
- [ ] Chrome + VoiceOver (macOS)
- [ ] Edge + JAWS (Windows)

### Mobile
- [ ] Safari + VoiceOver (iOS)
- [ ] Chrome + TalkBack (Android)

**Minimum Requirement**: Chrome + NVDA and Safari + VoiceOver

---

## Common Issues and Fixes

### Issue: Focus not visible
```css
/* globals.css already includes */
*:focus-visible {
  outline: 3px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

### Issue: Images missing alt text
```tsx
{/* Bad */}
<img src="/image.jpg" />

{/* Good */}
<img src="/image.jpg" alt="Description of image content" />

{/* Decorative */}
<img src="/decorative.jpg" alt="" />
```

### Issue: Button has no accessible name
```tsx
{/* Bad */}
<button><X /></button>

{/* Good */}
<button aria-label="Close menu"><X aria-hidden="true" /></button>
```

### Issue: Form input has no label
```tsx
{/* Bad */}
<input type="email" placeholder="Email" />

{/* Good */}
<label htmlFor="email">Email</label>
<input id="email" type="email" />

{/* Good - visually hidden label */}
<label htmlFor="email" className="sr-only">Email</label>
<input id="email" type="email" placeholder="Email" />
```

---

## Accessibility Sign-off Checklist

Before deploying to production, verify:

- [ ] All automated tests pass (Playwright + Axe)
- [ ] Manual keyboard testing completed
- [ ] Screen reader testing on 2+ combinations
- [ ] Color contrast verified with tools
- [ ] Mobile responsive testing at 320px width
- [ ] Focus indicators visible throughout
- [ ] Forms are keyboard accessible with error handling
- [ ] No console errors related to ARIA
- [ ] HTML validates with no critical errors
- [ ] Skip link works correctly
- [ ] All images have appropriate alt text
- [ ] Videos have captions (if applicable)
- [ ] Animations respect `prefers-reduced-motion`

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)
- [Deque University](https://dequeuniversity.com/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Radix UI Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)

---

## Contact

For accessibility concerns or questions:
- Open an issue on GitHub
- Email: accessibility@allaypm.com (if applicable)

---

**Last Updated**: 2025-10-15
**WCAG Version**: 2.1 Level AA
**Next Review**: 2026-10-15
