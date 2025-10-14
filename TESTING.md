# Testing & Verification Guide

This guide provides comprehensive testing procedures for the Allay Property Management website.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Database Seeding](#database-seeding)
4. [Development Server](#development-server)
5. [Testing Checklist](#testing-checklist)
6. [Manual Testing Procedures](#manual-testing-procedures)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Environment Variables

Create a `.env` file with the following (use `.env.example` as template):

```bash
# Required
DATABASE_URI=postgresql://user:password@localhost:5432/allay_pm
PAYLOAD_SECRET=your-secret-key-minimum-32-characters-long
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Optional but recommended for full testing
SMTP_HOST=smtp.mailtrap.io  # Use Mailtrap for testing
SMTP_PORT=2525
SMTP_USER=your-mailtrap-user
SMTP_PASS=your-mailtrap-pass
SMTP_FROM=noreply@allaypm.com
NOTIFICATION_EMAIL=test@allaypm.com

# Optional - CAPTCHA testing
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA  # Cloudflare test key
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA  # Cloudflare test key
```

### Database Setup

Ensure PostgreSQL is running and create a database:

```bash
# Create database
createdb allay_pm

# Or via psql
psql -U postgres
CREATE DATABASE allay_pm;
```

---

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate TypeScript Types

```bash
npm run generate:types
```

This generates `src/payload-types.ts` from your Payload collections and globals.

### 3. Create Admin User (Optional)

If you haven't created an admin user in production:

```bash
npm run create-admin
```

Follow the prompts to create an admin account.

---

## Database Seeding

### Seed Development Data

Populate the database with sample data:

```bash
npm run seed
```

This creates:
- Settings (site configuration)
- 6 Team Members
- 30 Testimonials
- 7 Neighborhoods (Buckhead, Virginia-Highland, Midtown, etc.)
- 7 Blog Categories
- Homepage with blocks
- 2 Sample blog posts

### Reset and Re-seed

To clear all data and re-seed:

```bash
npm run seed:reset
```

### Production Seeding

For production with duplicate prevention:

```bash
npm run seed:production
```

---

## Development Server

### Start Server

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

### Build for Production

Test the production build:

```bash
npm run build
npm run start
```

---

## Testing Checklist

### ✅ Phase 1: Build & Startup

- [ ] Dependencies installed without errors
- [ ] TypeScript types generated successfully
- [ ] Development server starts without errors
- [ ] No compilation errors in terminal
- [ ] Admin panel accessible at `/admin`

### ✅ Phase 2: Admin Panel

- [ ] Can log into admin panel
- [ ] All collections visible in sidebar
- [ ] Can view Pages collection
- [ ] Can view Posts collection
- [ ] Can view Neighborhoods collection
- [ ] Can view Properties collection
- [ ] Can view Testimonials collection
- [ ] Can view Team Members collection
- [ ] Can view Contact Submissions collection
- [ ] Settings global accessible
- [ ] Header global accessible
- [ ] Footer global accessible

### ✅ Phase 3: Seeded Data

- [ ] Homepage exists with title "Home"
- [ ] 7 neighborhoods seeded
- [ ] 30 testimonials seeded
- [ ] 6 team members seeded
- [ ] 7 blog categories created
- [ ] 2 sample blog posts created
- [ ] Settings configured

### ✅ Phase 4: Frontend Pages

Test each page loads without errors:

- [ ] Homepage (`/`)
- [ ] About (`/about`)
- [ ] Services (`/services`)
- [ ] Pricing (`/pricing`)
- [ ] Property Owners (`/property-owners`)
- [ ] Residents (`/residents`)
- [ ] Our Process (`/our-process`)
- [ ] Contact (`/contact`)
- [ ] Testimonials (`/testimonials`)
- [ ] Blog Index (`/blog`)
- [ ] Blog Post (`/blog/[slug]`) - test with seeded posts
- [ ] Areas We Serve Index (`/areas-we-serve`)
- [ ] Neighborhood Page (`/areas-we-serve/[slug]`) - test with Buckhead

### ✅ Phase 5: Components & Blocks

- [ ] Header renders correctly
- [ ] Footer renders correctly
- [ ] Mobile menu works
- [ ] Hero block renders on homepage
- [ ] Icon Grid block displays
- [ ] Services Grid block displays
- [ ] Testimonials Carousel block displays
- [ ] HeroCTA block displays

### ✅ Phase 6: Forms

#### Contact Form (`/contact`)

- [ ] Form displays correctly
- [ ] Name field validation works
- [ ] Email field validation works
- [ ] Phone field (optional) works
- [ ] Message field validation works
- [ ] Turnstile CAPTCHA loads (if configured)
- [ ] Submit button works
- [ ] Success message displays after submission
- [ ] Form resets after successful submission
- [ ] Error handling works (test by submitting invalid data)

#### Rental Analysis Form (`/contact`)

- [ ] Form displays correctly
- [ ] All required fields validate
- [ ] Property type dropdown works
- [ ] Current status dropdown works
- [ ] Bedrooms/bathrooms numeric inputs work
- [ ] Turnstile CAPTCHA loads (if configured)
- [ ] Submit button works
- [ ] Success message displays
- [ ] Error handling works

### ✅ Phase 7: API Routes

#### `/api/contact`

- [ ] POST request accepts contact form data
- [ ] POST request accepts rental analysis data
- [ ] Validation errors return 400
- [ ] Rate limiting works (test by submitting 6+ times rapidly)
- [ ] CAPTCHA verification works (if configured)
- [ ] Submissions saved to database
- [ ] Admin email sent (check SMTP logs or Mailtrap)
- [ ] Auto-reply email sent to user
- [ ] IP address logged in metadata

### ✅ Phase 8: Security

- [ ] Security headers present (check browser DevTools → Network)
- [ ] CSP header in production mode
- [ ] HSTS header in production mode
- [ ] X-Frame-Options header set
- [ ] Rate limiting active on API routes
- [ ] CAPTCHA blocks spam (if configured)
- [ ] No sensitive data in console logs
- [ ] No API keys exposed in frontend code

### ✅ Phase 9: Responsive Design

Test on different screen sizes:

- [ ] Mobile (375px) - iPhone SE
- [ ] Tablet (768px) - iPad
- [ ] Desktop (1440px) - Standard laptop
- [ ] Large Desktop (1920px+)

Check:
- [ ] Navigation menu responsive
- [ ] Mobile hamburger menu works
- [ ] Forms stack properly on mobile
- [ ] Images scale correctly
- [ ] Text readable on all sizes
- [ ] No horizontal scrolling

### ✅ Phase 10: Performance

- [ ] Pages load in under 3 seconds (dev mode)
- [ ] Images lazy load
- [ ] No JavaScript errors in console
- [ ] No excessive re-renders (React DevTools)
- [ ] Lighthouse score > 80 (run in production build)

---

## Manual Testing Procedures

### Test Form Submission Flow

1. **Navigate to Contact Page**
   ```
   http://localhost:3000/contact
   ```

2. **Fill Out Contact Form**
   - Name: "John Smith"
   - Email: "john@test.com"
   - Phone: "(404) 555-0100"
   - Message: "I'm interested in your property management services."

3. **Submit and Verify**
   - Check for success message
   - Check browser DevTools → Network for API call
   - Verify in admin panel: Contact Submissions collection
   - Check email (Mailtrap or SMTP logs)

4. **Test Validation**
   - Submit with empty name → should show error
   - Submit with invalid email → should show error
   - Submit with short message → should show error

### Test Rate Limiting

1. **Open Browser DevTools Console**

2. **Run Multiple Submissions**
   ```javascript
   // Paste in console
   for (let i = 0; i < 6; i++) {
     fetch('/api/contact', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         formType: 'contact',
         name: 'Test ' + i,
         email: 'test' + i + '@test.com',
         message: 'Test message',
       })
     }).then(r => console.log('Request ' + i + ':', r.status))
   }
   ```

3. **Verify**
   - First 5 requests should return 201
   - 6th request should return 429 (Too Many Requests)

### Test CAPTCHA (If Configured)

1. **Navigate to Contact Form**

2. **Verify CAPTCHA Loads**
   - Should see Cloudflare Turnstile widget
   - Widget should be interactive

3. **Submit Without CAPTCHA**
   - Complete CAPTCHA
   - Submit form
   - Should succeed

4. **Test Invalid Token**
   - Modify the Turnstile token in DevTools
   - Submit form
   - Should fail with CAPTCHA error

### Test Email Notifications

#### Using Mailtrap (Recommended for Testing)

1. **Sign up for Mailtrap** (free)
   - Visit: https://mailtrap.io

2. **Configure .env**
   ```bash
   SMTP_HOST=smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_USER=your-mailtrap-username
   SMTP_PASS=your-mailtrap-password
   SMTP_FROM=noreply@allaypm.com
   NOTIFICATION_EMAIL=admin@allaypm.com
   ```

3. **Submit Form**
   - Go to contact page
   - Submit form

4. **Check Mailtrap Inbox**
   - Should receive 2 emails:
     1. Admin notification with submission details
     2. Auto-reply to user

### Test Admin Panel

1. **Login to Admin**
   ```
   http://localhost:3000/admin
   ```

2. **Create New Post**
   - Navigate to Posts
   - Click "Create New"
   - Fill in title, slug, content
   - Upload featured image
   - Publish

3. **Verify on Frontend**
   - Navigate to `/blog`
   - Should see new post

4. **Edit Homepage**
   - Navigate to Pages → Home
   - Modify hero headline
   - Save
   - Refresh homepage
   - Verify changes appear

---

## Troubleshooting

### Server Won't Start

**Error**: `Port 3000 already in use`

**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Database Connection Error

**Error**: `Connection refused` or `Authentication failed`

**Solutions**:
1. Verify PostgreSQL is running:
   ```bash
   # macOS
   brew services start postgresql

   # Linux
   sudo systemctl start postgresql
   ```

2. Check DATABASE_URI format:
   ```bash
   postgresql://username:password@localhost:5432/database_name
   ```

3. Verify database exists:
   ```bash
   psql -U postgres -l
   ```

### TypeScript Errors

**Error**: `Cannot find module '@/payload-types'`

**Solution**:
```bash
npm run generate:types
```

### Forms Not Submitting

**Possible Issues**:

1. **API Route Not Found**
   - Check `/api/contact/route.ts` exists
   - Verify no TypeScript errors in that file

2. **CORS Errors**
   - Check browser console for CORS errors
   - Verify `NEXT_PUBLIC_SERVER_URL` in .env

3. **Validation Errors**
   - Open DevTools → Network
   - Click on failed request
   - Check Response tab for validation details

### Email Not Sending

**Check**:
1. SMTP configuration in .env
2. Console logs for error messages:
   ```bash
   # Look for "Error sending email"
   ```
3. Test SMTP credentials:
   ```bash
   # Use telnet or online SMTP tester
   ```

### CAPTCHA Not Loading

**Solutions**:

1. **Missing Site Key**
   ```bash
   # Add to .env
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-key
   ```

2. **CSP Blocking**
   - Check browser console for CSP errors
   - Verify `challenges.cloudflare.com` is allowed in next.config.js

3. **Test Keys (For Development)**
   ```bash
   # Use Cloudflare test keys
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
   TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
   ```

### Seed Script Fails

**Error**: Duplicate key errors

**Solution**:
```bash
# Reset database
npm run seed:reset
```

**Error**: Collection not found

**Solution**:
```bash
# Regenerate types
npm run generate:types
```

### Build Errors

**Check**:
1. All imports are correct
2. No missing dependencies
3. TypeScript types are generated
4. No syntax errors

**Common Fixes**:
```bash
# Clean build
rm -rf .next
npm run build

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Browser Testing Matrix

Test in multiple browsers:

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Primary |
| Firefox | Latest | ✅ Secondary |
| Safari | Latest | ✅ macOS |
| Edge | Latest | ⚠️ Optional |

---

## Performance Testing

### Lighthouse Audit

1. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

2. **Open Chrome DevTools**
   - Navigate to page
   - Open DevTools → Lighthouse tab
   - Run audit

3. **Target Scores** (Production)
   - Performance: > 80
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90

### Load Testing

For production testing, use tools like:
- [Apache Bench](https://httpd.apache.org/docs/2.4/programs/ab.html)
- [Artillery](https://www.artillery.io/)
- [k6](https://k6.io/)

Example with Apache Bench:
```bash
# Test 100 requests, 10 concurrent
ab -n 100 -c 10 http://localhost:3000/
```

---

## Continuous Testing

### Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] No console errors
- [ ] Forms submit successfully
- [ ] Emails send correctly
- [ ] Security headers configured
- [ ] CAPTCHA working
- [ ] Rate limiting active
- [ ] Database backed up
- [ ] Environment variables set in production
- [ ] SSL certificate valid
- [ ] Lighthouse scores meet targets

### Monitoring

Set up monitoring for:
- Server uptime
- API response times
- Error rates
- Form submission success rate
- Email delivery rate

Recommended tools:
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics, Plausible
- **Performance**: Vercel Analytics, New Relic

---

## Test Data

### Sample Contact Submission

```json
{
  "formType": "contact",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "(404) 555-0200",
  "message": "I'd like to learn more about your property management services for my rental property in Buckhead."
}
```

### Sample Rental Analysis Submission

```json
{
  "formType": "rental-analysis",
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "(404) 555-0100",
  "propertyAddress": "123 Peachtree St NE, Atlanta, GA 30309",
  "bedrooms": 3,
  "bathrooms": 2.5,
  "propertyType": "single-family",
  "currentStatus": "vacant",
  "message": "Recently purchased this property and looking for management services."
}
```

---

## Next Steps

After completing all tests:

1. ✅ Review any failed tests and fix issues
2. ✅ Document any bugs found
3. ✅ Update environment variables for production
4. ✅ Create production database backup strategy
5. ✅ Set up monitoring and alerts
6. ✅ Configure SSL certificate
7. ✅ Deploy to production environment
8. ✅ Run smoke tests in production
9. ✅ Monitor for first 24 hours
10. ✅ Celebrate launch! 🎉

---

**Last Updated**: 2025-01-14
