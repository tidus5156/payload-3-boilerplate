# Allay Property Management - Design System

This design system documents the visual language, patterns, and components used across the Allay Property Management website. Use this as your guide when building new pages to ensure consistency.

---

## 📐 **Design Principles**

1. **Professional First** - Clean, corporate aesthetic suitable for B2B
2. **Modern & Dynamic** - Subtle animations and depth effects
3. **Brand-Focused** - Strategic use of warmGold, deepNavy, and skyBlue
4. **Accessible** - All animations respect `prefers-reduced-motion`
5. **Performance** - GPU-accelerated CSS animations, no heavy JavaScript

---

## 🎨 **Color Palette**

### **Brand Colors**
```tsx
// Primary Colors
deepNavy: '#1B3A6D'        // Main brand color, headings, backgrounds
skyBlue: '#5A9FD4'         // Secondary accent, interactive elements
warmGold: '#C9A961'        // CTA buttons, accents, highlights
```

### **Supporting Colors**
```tsx
warmGoldHover: '#B8985F'   // Button hover states
warmGoldDark: '#9A7D3C'    // Text on white (WCAG AA compliant)
warmGoldLight: '#E8D7B3'   // Light backgrounds, subtle accents
sageGreen: '#7A9B76'       // Success states, checkmarks
charcoal: '#2D3436'        // Body text
warmGray: '#6C757D'        // Secondary text
lightGray: '#F5F7FA'       // Section backgrounds
```

### **Usage Guidelines**
- **Headings**: deepNavy (default) or white (on dark backgrounds)
- **Body Text**: charcoal (primary), warmGray (secondary)
- **Backgrounds**: Alternate between white, lightGray, and gradients
- **CTAs**: warmGold (primary), skyBlue (secondary)
- **Links**: skyBlue with deepNavy hover

---

## 🔤 **Typography System**

Already defined in `src/utilities/typography.ts`. Import and use these classes:

### **Headings**
```tsx
import { typography } from '@/utilities/typography'

typography.h1  // 3.5rem (56px) - Page titles
typography.h2  // 3rem (48px) - Section headings
typography.h3  // 2rem (32px) - Subsection headings
typography.h4  // 1.5rem (24px) - Card titles
```

### **Body Text**
```tsx
typography.body   // 1rem (16px) - Standard paragraph text
typography.small  // 0.875rem (14px) - Small text, captions
typography.lead   // 1.25rem (20px) - Lead paragraphs
```

### **Font Families**
```tsx
font-heading  // Montserrat - Bold, headings, CTAs
font-body     // Open Sans - Body text, descriptions
```

---

## 📏 **Spacing System**

Use the predefined spacing constants from `src/utilities/typography.ts`:

### **Section Spacing**
```tsx
import { spacing } from '@/utilities/typography'

spacing.sectionCompact   // py-12 lg:py-16  (tight sections)
spacing.section          // py-16 lg:py-24  (standard sections)
spacing.sectionSpacious  // py-20 lg:py-32  (spacious sections)
```

### **Recommended Pattern**
Alternate between `section` and `sectionSpacious` for visual rhythm.

---

## 🎭 **Animation Patterns**

### **1. Staggered Entrance Animations**

**When to use**: Card grids, lists of items, statistics

**Implementation**:
```tsx
// Component state
const [inView, setInView] = useState(false)
const ref = useRef<HTMLElement>(null)

// Intersection Observer
useEffect(() => {
  if (!ref.current) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) setInView(true)
    },
    { threshold: 0.1 }
  )
  observer.observe(ref.current)
  return () => observer.disconnect()
}, [])

// Apply to each item
<div
  className={cn(
    "opacity-0 translate-y-8",
    inView && "animate-fade-in-up"
  )}
  style={{
    animationDelay: `${index * 150}ms`,
    animationFillMode: 'forwards'
  }}
>
```

**Example**: `src/blocks/Statistics/Component.tsx:142-157`

---

### **2. Floating Orbs (Parallax Effect)**

**When to use**: Hero sections, dark backgrounds, large content areas

**Implementation**:
```tsx
<div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
  <div className="absolute top-20 left-20 w-96 h-96 bg-warmGold/30 rounded-full blur-3xl animate-float" />
  <div
    className="absolute bottom-40 right-40 w-80 h-80 bg-skyBlue/40 rounded-full blur-3xl animate-float"
    style={{ animationDelay: '1s', animationDuration: '4s' }}
  />
</div>
```

**Example**: `src/heros/MediumImpact/index.tsx:71-80`

---

### **3. Button Hover Effects**

**Already implemented** in `src/components/ui/button.tsx`

**Variants**:
- `primary` - Scale 1.08, gold glow, shine effect
- `secondary` - Scale 1.05, shadow enhancement
- `outline` - Scale 1.03, background fill on hover

**Active states**: All buttons scale down to 0.95 on click

---

### **4. Card Hover Effects**

**Standard pattern**:
```tsx
className={cn(
  "group relative p-8 rounded-2xl",
  "bg-white/80 backdrop-blur-sm border border-gray-100",
  "shadow-soft hover:shadow-card-hover",
  "hover:-translate-y-3 hover:scale-[1.02]",
  "transition-all duration-500"
)}
```

**With accent bar**:
```tsx
{/* Bottom accent bar */}
<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
```

**Example**: `src/blocks/Statistics/Component.tsx:142-234`

---

## 🌈 **Section Background Patterns**

### **Pattern 1: Clean White**
```tsx
<section className="py-20 lg:py-32 bg-white">
  <div className="container">
    {/* Content */}
  </div>
</section>
```

**Use for**: FAQ, pricing, testimonials

---

### **Pattern 2: Light Gray with Decorative Orbs**
```tsx
<section className="py-20 lg:py-32 bg-gradient-to-b from-white to-lightGray/50 relative overflow-hidden">
  {/* Decorative background elements */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-warmGold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-skyBlue/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

  <div className="container relative z-10">
    {/* Content */}
  </div>
</section>
```

**Use for**: Icon grids, feature sections

**Example**: `src/components/blocks/IconGrid/Component.tsx:48-52`

---

### **Pattern 3: Gradient Background**
```tsx
<section className="py-20 lg:py-32 bg-gradient-to-br from-lightGray via-white to-lightGray relative overflow-hidden">
  {/* Background decoration */}
  <div className="absolute top-1/4 right-0 w-96 h-96 bg-skyBlue/10 rounded-full blur-3xl" />
  <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-warmGold/10 rounded-full blur-3xl" />

  <div className="container relative z-10">
    {/* Content */}
  </div>
</section>
```

**Use for**: Services, process sections

**Example**: `src/components/blocks/ServicesGrid/Component.tsx:24-28`

---

### **Pattern 4: Dark Gradient with Orbs**
```tsx
<section className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-deepNavy via-deepNavy to-skyBlue/20 text-white">
  {/* Animated floating orbs */}
  <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
    <div className="absolute top-10 right-20 w-96 h-96 bg-warmGold/40 rounded-full blur-3xl animate-float" />
    <div
      className="absolute bottom-20 left-20 w-80 h-80 bg-skyBlue/50 rounded-full blur-3xl animate-float"
      style={{ animationDelay: '1.5s', animationDuration: '4s' }}
    />
  </div>

  <div className="container relative z-10">
    {/* Content */}
  </div>
</section>
```

**Use for**: CTAs, high-impact sections

**Example**: `src/blocks/HeroCTA/Component.tsx:20-35`

---

### **Pattern 5: Subtle Background with Small Orbs**
```tsx
<section className={cn(
  spacing.section,
  'bg-white relative overflow-hidden'
)}>
  {/* Decorative background elements */}
  <div className="absolute top-10 right-10 w-72 h-72 bg-warmGold/5 rounded-full blur-3xl" />
  <div className="absolute bottom-10 left-10 w-96 h-96 bg-skyBlue/5 rounded-full blur-3xl" />

  <div className="container relative z-10">
    {/* Content */}
  </div>
</section>
```

**Use for**: Process timelines, less prominent sections

**Example**: `src/blocks/ProcessTimeline/Component.tsx:30-40`

---

## 🎯 **Hero Section Pattern**

### **Standard Hero with Diagonal Finish**
```tsx
<div
  className="relative bg-deepNavy mb-16 md:mb-20"
  style={{
    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4rem), 0 100%)',
  }}
>
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <Media resource={media} className="h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-deepNavy/90 via-deepNavy/75 to-deepNavy/60" />

    {/* Floating orbs */}
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      <div className="absolute top-20 left-20 w-96 h-96 bg-warmGold/30 rounded-full blur-3xl animate-float" />
      {/* More orbs... */}
    </div>
  </div>

  {/* Content */}
  <div className="relative py-20 md:py-28 lg:py-36">
    <div className="container relative z-10">
      {/* Hero content */}
    </div>
  </div>
</div>
```

**Key features**:
- Diagonal bottom finish (clip-path)
- Floating gradient orbs
- Dark gradient overlay for text readability
- Responsive padding

**Example**: `src/heros/MediumImpact/index.tsx`

---

## 🃏 **Card Component Patterns**

### **Standard Card**
```tsx
<div className={cn(
  "group relative p-8 rounded-2xl",
  "bg-white border border-gray-100 shadow-soft",
  "hover:shadow-card-hover hover:-translate-y-2",
  "transition-all duration-500"
)}>
  {/* Content */}
</div>
```

---

### **Glassmorphism Card**
```tsx
<div className={cn(
  "group relative p-8 rounded-2xl",
  "bg-white/80 backdrop-blur-sm border border-gray-100",
  "shadow-soft hover:shadow-card-hover",
  "hover:-translate-y-3 hover:scale-[1.02]",
  "transition-all duration-500 overflow-visible"
)}>
  {/* Shine effect */}
  <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>

  {/* Content */}
</div>
```

**Example**: `src/blocks/Statistics/Component.tsx:142-168`

---

### **Icon Container**
```tsx
<div className={cn(
  "relative inline-flex items-center justify-center w-20 h-20 mb-6",
  "rounded-2xl bg-gradient-gold",
  "group-hover:scale-110 group-hover:rotate-6",
  "transition-all duration-500",
  "shadow-lg group-hover:shadow-glow-gold"
)}>
  {/* Glow effect */}
  <div className="absolute w-16 h-16 rounded-full bg-warmGold/20 blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />

  <Icon className="w-10 h-10 text-white relative z-10" />
</div>
```

---

## 📱 **Responsive Design Guidelines**

### **Breakpoints** (Tailwind defaults)
```
sm: 640px   (mobile landscape)
md: 768px   (tablet)
lg: 1024px  (desktop)
xl: 1280px  (large desktop)
2xl: 1536px (extra large)
```

### **Container Padding**
Already configured in `tailwind.config.mjs`:
```
DEFAULT: 1rem
sm: 1rem
md: 2rem
lg: 2rem
xl: 2rem
2xl: 2rem
```

### **Typography Scaling**
```tsx
// Headings should scale
className="text-3xl sm:text-4xl lg:text-5xl"

// Body text stays consistent
className="text-base"

// Lead text can scale slightly
className="text-lg sm:text-xl"
```

---

## 🎨 **Gradient Utilities**

Already defined in `tailwind.config.mjs`:

```tsx
bg-gradient-gold     // Linear gradient: warmGold → warmGoldLight
bg-gradient-navy     // Linear gradient: deepNavy → skyBlue
bg-gradient-accent   // Linear gradient: warmGold → deepNavy
bg-gradient-radial   // Radial gradient (use with custom stops)
```

### **Usage Examples**
```tsx
// Button background
className="bg-gradient-gold"

// Text gradient
className="bg-gradient-accent bg-clip-text text-transparent"

// Section background
className="bg-gradient-to-br from-deepNavy via-deepNavy to-skyBlue/20"
```

---

## ✨ **Shadow System**

Already defined in `tailwind.config.mjs`:

```tsx
shadow-soft          // Subtle card shadow
shadow-card-hover    // Enhanced hover shadow
shadow-glow-gold     // Gold glow effect
shadow-glow-navy     // Navy glow effect
```

---

## 📋 **Section Header Pattern**

**Standard usage across all sections**:
```tsx
{(heading || subheading) && (
  <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
    {heading && (
      <h2 className={cn(
        typography.h2,
        "relative inline-block mb-4"
      )}>
        {heading}
        {/* Optional underline accent */}
        <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-gold rounded-full" />
      </h2>
    )}
    {subheading && (
      <p className={cn(typography.body, 'mt-4 text-muted-foreground')}>
        {subheading}
      </p>
    )}
  </div>
)}
```

---

## 🔄 **Common Component Imports**

```tsx
// UI Components
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// Utilities
import { cn } from '@/utilities/cn'
import { typography, spacing } from '@/utilities/typography'

// Animations
import { ScrollAnimation } from '@/components/ScrollAnimation'

// Icons
import { Home, Users, Star, Shield } from 'lucide-react'
```

---

## 📖 **Page Template Structure**

### **Standard Page Layout**
```tsx
export default function ServicePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Content Section 1 - White or Light Gray */}
      <section className={cn(spacing.section, "bg-white")}>
        {/* Content */}
      </section>

      {/* Content Section 2 - Gradient with Orbs */}
      <section className={cn(spacing.section, "bg-gradient-to-br from-lightGray via-white to-lightGray relative overflow-hidden")}>
        {/* Decorative orbs */}
        <div className="container relative z-10">
          {/* Content */}
        </div>
      </section>

      {/* CTA Section - Dark */}
      <CTASection />
    </>
  )
}
```

---

## ✅ **Checklist for New Pages**

When creating a new page, ensure:

- [ ] Uses established color palette (deepNavy, warmGold, skyBlue)
- [ ] Imports typography and spacing from utilities
- [ ] Alternates section backgrounds for visual rhythm
- [ ] Uses Button component (not custom button styles)
- [ ] Implements hover effects on interactive elements
- [ ] Includes staggered animations for card grids
- [ ] Respects `prefers-reduced-motion` (handled by existing code)
- [ ] Uses `container` class for content width
- [ ] Follows responsive typography patterns
- [ ] Adds decorative orbs to appropriate sections
- [ ] Includes proper semantic HTML (h1, h2, section, etc.)
- [ ] Tests on mobile, tablet, and desktop viewports

---

## 🚀 **Quick Start: Creating a New Page**

1. **Choose a hero pattern** (diagonal, simple, or none)
2. **Plan section backgrounds** (alternate between patterns 1-5)
3. **Use existing components** (cards, buttons, grids)
4. **Import utilities** (typography, spacing, cn)
5. **Add animations** (staggered entrance for lists/grids)
6. **Test responsive** (mobile, tablet, desktop)
7. **Add CTA section** (use HeroCTA block pattern)

---

## 🎯 **Examples by Page Type**

### **Services Page**
- Hero with diagonal finish
- Icon grid (Pattern 2 background)
- Services grid (Pattern 3 background)
- Process timeline (Pattern 5 background)
- CTA (Pattern 4 background)

### **About Page**
- Hero with team photo
- Company story (Pattern 1 - white)
- Team grid (Pattern 2 - light gray with orbs)
- Values/mission (Pattern 3 - gradient)
- CTA (Pattern 4 - dark gradient)

### **Contact Page**
- Simple hero (no diagonal, shorter)
- Form section (Pattern 1 - white)
- Contact info cards (Pattern 2 - light gray)
- CTA or FAQ (Pattern 4 or 1)

---

## 📚 **Reference Files**

- **Typography/Spacing**: `src/utilities/typography.ts`
- **Tailwind Config**: `tailwind.config.mjs`
- **Button Component**: `src/components/ui/button.tsx`
- **Example Hero**: `src/heros/MediumImpact/index.tsx`
- **Example Blocks**: `src/blocks/Statistics/`, `src/blocks/ProcessTimeline/`
- **Example Grids**: `src/components/blocks/IconGrid/`, `src/components/blocks/ServicesGrid/`

---

*This design system is based on the enhanced homepage implementation. Keep this document updated as new patterns emerge.*
