# Manual Setup Guide for New Homepage Blocks

Follow these steps to add the Statistics, Process Timeline, and FAQ Accordion blocks to your homepage.

## Step 1: Access Admin Panel

1. Open http://localhost:3000/admin
2. Log in with your admin credentials

## Step 2: Edit Homepage

1. Click **Collections → Pages** in the sidebar
2. Click on the **"Home"** page to edit it
3. Scroll down to the **"Layout"** section

## Step 3: Add Statistics Block

**Position:** After "Services Grid" block

1. Click **"Add Block"** → Select **"Statistics"**
2. Fill in the fields:

   **Heading:** `Proven Results for Property Owners`

   **Subheading:** `Our data-driven approach delivers measurable results that maximize your return on investment.`

   **Stats** (click "Add Stats" 4 times):

   **Stat 1:**
   - Number: `98`
   - Suffix: `%`
   - Label: `Rent Collection Rate`
   - Icon: `trendingUp`
   - Animate Counter: ✅ checked

   **Stat 2:**
   - Number: `15`
   - Suffix: (leave empty)
   - Label: `Average Days to Lease`
   - Icon: `clock`
   - Animate Counter: ✅ checked

   **Stat 3:**
   - Number: `500`
   - Suffix: `+`
   - Label: `Properties Managed`
   - Icon: `home`
   - Animate Counter: ✅ checked

   **Stat 4:**
   - Number: `4.9`
   - Suffix: `/5`
   - Label: `Client Satisfaction`
   - Icon: `star`
   - Animate Counter: ✅ checked

   **Layout:** `grid-4`

   **Background Color:** `lightBlue`

   **Spacing:** `default`

   **Enable Animations:** ✅ checked

## Step 4: Add Process Timeline Block

**Position:** After "Statistics" block

1. Click **"Add Block"** → Select **"Process Timeline"**
2. Fill in the fields:

   **Heading:** `Getting Started is Simple`

   **Subheading:** `From initial consultation to your first rent check, we make the onboarding process seamless.`

   **Steps** (click "Add Steps" 4 times):

   **Step 1:**
   - Title: `Free Rental Analysis`
   - Description: `Schedule a consultation to discuss your property and investment goals. We'll provide a comprehensive rental market analysis at no cost.`
   - Icon: `phone`

   **Step 2:**
   - Title: `Property Inspection`
   - Description: `Our team conducts a thorough inspection to assess condition, identify any needed repairs, and determine optimal rental pricing.`
   - Icon: `clipboard`

   **Step 3:**
   - Title: `Marketing & Leasing`
   - Description: `We create professional listings, coordinate showings, screen applicants, and secure qualified tenants quickly.`
   - Icon: `camera`

   **Step 4:**
   - Title: `Ongoing Management`
   - Description: `Sit back and relax while we handle rent collection, maintenance, inspections, and everything else.`
   - Icon: `checkCircle`

   **Layout:** `vertical`

## Step 5: Add FAQ Accordion Block

**Position:** After "Pricing Comparison" block, before "Hero CTA" (final CTA)

1. Click **"Add Block"** → Select **"FAQ Accordion"**
2. Fill in the fields:

   **Heading:** `Frequently Asked Questions`

   **Subheading:** `Get answers to common questions about our property management services.`

   **FAQs** (click "Add FAQs" 6 times):

   **FAQ 1:**
   - Question: `What is included in your 8% management fee?`
   - Answer: `Our 8% fee covers everything: tenant placement, rent collection, maintenance coordination, monthly financial reports, lease enforcement, property inspections, 24/7 emergency support, and our 12-month rent guarantee. There are no hidden fees or additional charges.`

   **FAQ 2:**
   - Question: `How quickly can you find a tenant for my property?`
   - Answer: `Our average time to lease is just 15 days. We use professional photography, strategic pricing, and multi-platform marketing to attract qualified tenants quickly. Most properties receive showing requests within 48 hours of listing.`

   **FAQ 3:**
   - Question: `What is your tenant screening process?`
   - Answer: `We conduct comprehensive background checks including credit reports, criminal history, eviction history, employment verification, income verification (minimum 3x rent), and rental history with previous landlords. Only applicants who meet our strict criteria are approved.`

   **FAQ 4:**
   - Question: `How does the 12-month rent guarantee work?`
   - Answer: `We guarantee you'll receive rent payments for the first 12 months. If a tenant defaults, we cover the payment while handling the eviction process. This exclusive program protects your cash flow and gives you peace of mind from day one.`

   **FAQ 5:**
   - Question: `Who handles maintenance requests?`
   - Answer: `We coordinate all maintenance through our network of licensed, insured contractors. Tenants submit requests through our portal, we assess urgency, get quotes, obtain your approval (for non-emergency repairs over $500), and oversee completion. Emergency repairs are handled 24/7.`

   **FAQ 6:**
   - Question: `Can I use my own contractors for repairs?`
   - Answer: `Absolutely! While we have preferred contractors who offer competitive pricing and quick response times, you're welcome to use your own vendors. We'll coordinate with them just as we would with our network.`

   **Default Expanded:** ✅ checked

   **Allow Multiple:** ☐ unchecked

   **Background Color:** `white`

   **Spacing:** `default`

## Step 6: Update Header Navigation (Optional)

1. Go to **Globals → Header**
2. In the **Nav Items** section, add these items:
   - Home (/)
   - Services (/services)
   - About (/about)
   - Contact (/contact)

## Step 7: Save and Verify

1. Click the **"Save"** button at the top right
2. Go to http://localhost:3000 to see your updated homepage
3. Verify all three new blocks appear:
   - Statistics with animated counters
   - Process Timeline with 4 steps
   - FAQ Accordion with 6 questions

---

## Final Block Order on Homepage

Your layout should now have these blocks in this order:

1. Icon Grid (Why Property Owners Choose Allay)
2. Services Grid (Complete Property Management Solutions)
3. **Statistics** ← NEW
4. **Process Timeline** ← NEW
5. Testimonials Carousel
6. Pricing Comparison
7. **FAQ Accordion** ← NEW
8. Hero CTA (Ready to Maximize Your Rental Income?)

---

**Estimated time:** 10-15 minutes

**Note:** Copy and paste the text exactly as shown to ensure consistency.
