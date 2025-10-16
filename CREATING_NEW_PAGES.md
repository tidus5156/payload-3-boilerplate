# Quick Start: Creating New Pages

This guide shows you how to create new pages using the Allay design system with practical examples.

---

## 📋 **Basic Page Template**

### **Option 1: Using the Section Component** (Recommended)

```tsx
import { Section, SectionHeader } from '@/components/Section'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'

export default function NewPage() {
  return (
    <>
      {/* Section 1: Clean white background */}
      <Section background="white" spacing="spacious">
        <div className="container">
          <SectionHeader
            heading="Page Title"
            subheading="Brief description of what this page is about"
            underline
          />

          {/* Your content here */}
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-warmGray mb-6">
              Your content goes here...
            </p>
          </div>
        </div>
      </Section>

      {/* Section 2: Light background with decorative orbs */}
      <Section background="light-orbs" spacing="normal">
        <div className="container">
          <SectionHeader
            heading="Another Section"
            subheading="Supporting description"
          />

          {/* Grid or content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cards or content */}
          </div>
        </div>
      </Section>

      {/* Section 3: Dark CTA section */}
      <Section background="dark-gradient-orbs" spacing="spacious">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Contact us today for a free consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Contact Us
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
```

---

### **Option 2: Manual Implementation** (More Control)

```tsx
import { cn } from '@/utilities/cn'
import { typography, spacing } from '@/utilities/typography'

export default function NewPage() {
  return (
    <>
      {/* Manual section with light orbs */}
      <section className={cn(
        spacing.section,
        "bg-gradient-to-b from-white to-lightGray/50 relative overflow-hidden"
      )}>
        {/* Decorative orbs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-warmGold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-skyBlue/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container relative z-10">
          {/* Section header */}
          <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
            <h2 className={typography.h2}>Section Title</h2>
            <p className={cn(typography.body, 'mt-4 text-warmGray')}>
              Section description
            </p>
          </div>

          {/* Content */}
          <div>
            {/* Your content */}
          </div>
        </div>
      </section>
    </>
  )
}
```

---

## 🎨 **Background Pattern Guide**

### **When to Use Each Background**

| Background | Use Case | Example |
|-----------|----------|---------|
| `white` | Clean sections, text-heavy content, FAQs | FAQ section, About text |
| `light-orbs` | Feature grids, icon sections, highlight areas | Services grid, Features |
| `gradient-orbs` | Main content sections, moderate emphasis | Process steps, Team section |
| `dark-gradient-orbs` | CTAs, high-impact sections, end-of-page | Contact CTA, Sign-up prompt |
| `subtle-orbs` | Alternative to white, gentle decoration | Timeline, Single column content |

### **Recommended Alternating Pattern**

```tsx
<Section background="white">          {/* Section 1 */}
<Section background="light-orbs">     {/* Section 2 */}
<Section background="white">          {/* Section 3 */}
<Section background="gradient-orbs">  {/* Section 4 */}
<Section background="dark-gradient-orbs">  {/* CTA */}
```

---

## 🃏 **Common Card Patterns**

### **Pattern 1: Basic Card**

```tsx
<div className={cn(
  "p-8 rounded-2xl bg-white border border-gray-100",
  "shadow-soft hover:shadow-card-hover hover:-translate-y-2",
  "transition-all duration-500"
)}>
  <h3 className="font-heading text-2xl font-bold text-deepNavy mb-4">
    Card Title
  </h3>
  <p className="text-warmGray">
    Card content goes here...
  </p>
</div>
```

### **Pattern 2: Glassmorphism Card with Hover Effects**

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
  <h3 className="font-heading text-2xl font-bold text-deepNavy mb-4">
    Card Title
  </h3>
  <p className="text-warmGray mb-6">
    Card description...
  </p>

  {/* Bottom accent bar */}
  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
</div>
```

### **Pattern 3: Card with Icon**

```tsx
import { Home } from 'lucide-react'

<div className="group relative p-8 rounded-2xl bg-white border border-gray-100 shadow-soft hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500">
  {/* Icon */}
  <div className={cn(
    "relative inline-flex items-center justify-center w-16 h-16 mb-6",
    "rounded-xl bg-gradient-gold shadow-lg",
    "group-hover:scale-110 transition-transform duration-500"
  )}>
    <Home className="w-8 h-8 text-white" />
  </div>

  <h3 className="font-heading text-xl font-bold text-deepNavy mb-3">
    Service Title
  </h3>
  <p className="text-warmGray">
    Service description...
  </p>
</div>
```

---

## 📱 **Grid Layouts**

### **2-Column Grid**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
  {items.map((item, index) => (
    <div key={index}>
      {/* Card content */}
    </div>
  ))}
</div>
```

### **3-Column Grid**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
  {items.map((item, index) => (
    <div key={index}>
      {/* Card content */}
    </div>
  ))}
</div>
```

### **4-Column Grid (Statistics)**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
  {stats.map((stat, index) => (
    <div key={index}>
      {/* Stat card */}
    </div>
  ))}
</div>
```

---

## 🎭 **Adding Staggered Animations**

```tsx
'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/utilities/cn'

export function AnimatedGrid({ items }) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "opacity-0 translate-y-8",
            inView && "animate-fade-in-up"
          )}
          style={{
            animationDelay: `${index * 150}ms`,
            animationFillMode: 'forwards'
          }}
        >
          {/* Card content */}
        </div>
      ))}
    </div>
  )
}
```

---

## 🔘 **Button Usage**

```tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Primary button (gold, scales to 1.08 on hover)
<Button variant="primary" size="lg">
  Get Started
</Button>

// Secondary button (blue, scales to 1.05 on hover)
<Button variant="secondary" size="lg">
  Learn More
</Button>

// Outline button (scales to 1.03 on hover)
<Button variant="outline" size="lg">
  Contact Us
</Button>

// Button as Link
<Link href="/contact">
  <Button variant="primary" size="lg">
    Contact Us
  </Button>
</Link>
```

---

## 📄 **Example: Services Page**

```tsx
import { Section, SectionHeader } from '@/components/Section'
import { Button } from '@/components/ui/button'
import { Home, Key, Wrench } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Home,
    title: 'Full-Service Management',
    description: 'Complete property management from marketing to maintenance',
    features: [
      'Professional marketing',
      'Tenant screening',
      'Rent collection',
      'Maintenance coordination'
    ]
  },
  // ... more services
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="dark-gradient-orbs" spacing="spacious">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl opacity-90 mb-10">
              Comprehensive property management solutions for Metro Atlanta
            </p>
          </div>
        </div>
      </Section>

      {/* Services Grid */}
      <Section background="light-orbs" spacing="spacious">
        <div className="container">
          <SectionHeader
            heading="What We Offer"
            subheading="Tailored solutions for every property management need"
            underline
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white border border-gray-100 shadow-soft hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-gradient-gold shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl font-bold text-deepNavy mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-warmGray mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-charcoal">
                      <span className="w-1.5 h-1.5 rounded-full bg-warmGold" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="dark-gradient-orbs" spacing="spacious">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Schedule a free consultation today
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
```

---

## 📚 **Additional Resources**

- **Full Design System**: See `DESIGN_SYSTEM.md`
- **Typography Utils**: `src/utilities/typography.ts`
- **Section Component**: `src/components/Section/index.tsx`
- **Button Component**: `src/components/ui/button.tsx`
- **Homepage Example**: `src/app/(frontend)/page.tsx`

---

## ✅ **Pre-Launch Checklist**

Before deploying a new page:

- [ ] Uses `Section` component or proper background patterns
- [ ] Alternates section backgrounds for visual interest
- [ ] Uses `Button` component (not custom buttons)
- [ ] Imports from utilities (`typography`, `spacing`, `cn`)
- [ ] Includes proper semantic HTML (h1, sections, etc.)
- [ ] Tests on mobile (375px), tablet (768px), desktop (1440px)
- [ ] All interactive elements have hover states
- [ ] Text has proper color contrast (use `text-warmGray`, `text-charcoal`)
- [ ] Grids are responsive with proper breakpoints
- [ ] Page has a clear CTA (usually dark-gradient-orbs section at end)

---

**Need help?** Reference the homepage implementation or check `DESIGN_SYSTEM.md` for detailed pattern documentation.
