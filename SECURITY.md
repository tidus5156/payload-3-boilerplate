# Security Implementation Guide

This document outlines the security measures implemented in the Allay Property Management website and best practices for maintaining security.

## Table of Contents

1. [Security Headers](#security-headers)
2. [CAPTCHA Protection](#captcha-protection)
3. [Rate Limiting](#rate-limiting)
4. [Input Sanitization](#input-sanitization)
5. [CORS Configuration](#cors-configuration)
6. [Environment Variables](#environment-variables)
7. [Best Practices](#best-practices)
8. [Security Checklist](#security-checklist)

---

## Security Headers

### Implemented Headers

The application implements comprehensive security headers via `next.config.js`:

#### Applied to All Routes

- **X-Frame-Options: SAMEORIGIN**
  - Prevents clickjacking attacks by ensuring the site can only be embedded in frames from the same origin

- **X-Content-Type-Options: nosniff**
  - Prevents MIME type sniffing, ensuring browsers respect declared content types

- **X-XSS-Protection: 1; mode=block**
  - Enables browser XSS protection (legacy but still useful for older browsers)

- **Referrer-Policy: strict-origin-when-cross-origin**
  - Controls referrer information sent to other sites

- **Permissions-Policy: camera=(), microphone=(), geolocation=(self)**
  - Restricts access to sensitive browser features and APIs

#### Production-Only Headers (HTTPS)

- **Strict-Transport-Security (HSTS)**
  - Forces HTTPS connections for 1 year
  - Includes subdomains and HSTS preload
  - `max-age=31536000; includeSubDomains; preload`

- **Content-Security-Policy (CSP)**
  - Comprehensive policy controlling resource loading
  - Allows Cloudflare Turnstile, Google Analytics, and Google Tag Manager
  - Blocks inline scripts except where explicitly needed
  - Enforces HTTPS for all requests in production

### Testing Headers

Check your headers using:
```bash
curl -I https://your-domain.com
```

Or use online tools like [securityheaders.com](https://securityheaders.com)

---

## CAPTCHA Protection

### Cloudflare Turnstile

Implemented on both contact and rental analysis forms to prevent spam and abuse.

#### Setup Instructions

1. **Sign up for Cloudflare Turnstile** (free tier available)
   - Visit: https://www.cloudflare.com/products/turnstile/

2. **Get Your Keys**
   - Site Key (client-side)
   - Secret Key (server-side)

3. **Add to Environment Variables**
   ```bash
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
   TURNSTILE_SECRET_KEY=your-secret-key
   ```

#### Component: `src/components/Turnstile.tsx`

- Automatically loads Turnstile script
- Handles token generation and validation
- Gracefully degrades if not configured (dev mode)
- Auto-cleans up on component unmount

#### Integration

Forms automatically include CAPTCHA:
- ContactForm: `src/components/forms/ContactForm.tsx`
- RentalAnalysisForm: `src/components/forms/RentalAnalysisForm.tsx`

Tokens are sent with form submissions and verified server-side in `/api/contact`.

---

## Rate Limiting

### API Rate Limiting

Implemented in `src/app/api/contact/route.ts`:

- **Default Limits**: 5 requests per IP per minute
- **Storage**: In-memory (consider Redis for production with multiple servers)
- **Response**: 429 Too Many Requests when limit exceeded

### Implementation Details

```typescript
// Default configuration
const maxRequests = 5
const windowMs = 60000 // 1 minute
```

### Scaling Considerations

For production with multiple servers, consider:

1. **Redis-based Rate Limiting**
   ```typescript
   import { Ratelimit } from '@upstash/ratelimit'
   import { Redis } from '@upstash/redis'

   const ratelimit = new Ratelimit({
     redis: Redis.fromEnv(),
     limiter: Ratelimit.slidingWindow(5, '60 s'),
   })
   ```

2. **CloudFlare Rate Limiting**
   - Set up rate limiting rules in CloudFlare dashboard
   - More robust and doesn't consume server resources

### Monitoring

Check rate limit logs:
```bash
# In production, monitor for patterns
grep "Too many requests" /var/log/app.log
```

---

## Input Sanitization

### Sanitization Library

Located in `src/lib/sanitize.ts` with multiple sanitization functions:

#### Available Functions

1. **`sanitizeHtml(dirty: string)`**
   - Removes dangerous HTML tags and attributes
   - Configurable allowed tags
   - Optional link support with automatic `rel="noopener noreferrer"`

2. **`sanitizeText(text: string)`**
   - Removes null bytes and control characters
   - Safe for database storage and display

3. **`sanitizeEmail(email: string)`**
   - Validates and normalizes email addresses
   - Converts to lowercase
   - Removes dangerous characters

4. **`sanitizePhone(phone: string)`**
   - Keeps only valid phone characters
   - Removes potentially dangerous input

5. **`sanitizeUrl(url: string)`**
   - Blocks dangerous protocols (javascript:, data:, etc.)
   - Validates URL format
   - Allows relative paths

6. **`sanitizeObject(obj)`**
   - Recursively sanitizes all string values
   - Field-specific sanitization based on configuration

7. **`stripHtml(html: string)`**
   - Completely removes all HTML tags

8. **`escapeHtml(text: string)`**
   - Escapes HTML entities for safe rendering

### Usage Examples

```typescript
import { sanitizeText, sanitizeEmail, sanitizeHtml } from '@/lib/sanitize'

// Sanitize user input before storage
const cleanName = sanitizeText(userInput.name)
const cleanEmail = sanitizeEmail(userInput.email)

// Sanitize HTML content
const cleanHtml = sanitizeHtml(userContent, {
  allowLinks: true,
  allowedTags: ['p', 'strong', 'em', 'ul', 'li'],
})
```

### Validation + Sanitization

Always combine with Zod validation:

```typescript
const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
})

// Validate first
const validated = schema.parse(data)

// Then sanitize
const sanitized = sanitizeObject(validated, {
  emailFields: ['email'],
})
```

---

## CORS Configuration

### Payload CMS CORS

Configured in `src/payload.config.ts`:

```typescript
cors: [getServerSideURL()].filter(Boolean),
```

This allows:
- Same-origin requests (default)
- Requests from `NEXT_PUBLIC_SERVER_URL`
- Production domain (via environment variable)

### API Route CORS

The `/api/contact` route includes CORS headers:

```typescript
// OPTIONS handler for preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
```

### Production CORS

For production, update to restrict origins:

```typescript
const allowedOrigins = [
  process.env.NEXT_PUBLIC_SERVER_URL,
  'https://your-domain.com',
]

const origin = request.headers.get('origin')
const corsHeaders = allowedOrigins.includes(origin || '')
  ? { 'Access-Control-Allow-Origin': origin }
  : {}
```

---

## Environment Variables

### Required for Security

```bash
# JWT Encryption
PAYLOAD_SECRET=your-secret-key-minimum-32-characters-long

# Database (use strong password)
DATABASE_URI=postgresql://user:strong_password@host:5432/db

# CAPTCHA
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key

# Email (use app-specific passwords)
SMTP_HOST=smtp.provider.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-app-specific-password

# Server URL (for CORS)
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

### Security Best Practices

1. **Never commit `.env` files**
   - Already in `.gitignore`
   - Use `.env.example` as template

2. **Use strong secrets**
   ```bash
   # Generate secure random string
   openssl rand -base64 32
   ```

3. **Rotate secrets regularly**
   - Change `PAYLOAD_SECRET` every 90 days
   - Rotate API keys annually

4. **Use different secrets per environment**
   - Development, staging, and production should have unique secrets

---

## Best Practices

### 1. Authentication & Authorization

- ✅ JWT tokens encrypted with `PAYLOAD_SECRET`
- ✅ Role-based access control (admin, user)
- ✅ Secure password hashing via Payload CMS
- ⚠️ Implement 2FA for admin accounts (recommended)

### 2. Data Storage

- ✅ Input validation with Zod schemas
- ✅ Parameterized queries (via Payload ORM)
- ✅ No direct SQL queries
- ✅ Regular backups (configure separately)

### 3. API Security

- ✅ Rate limiting on public endpoints
- ✅ CAPTCHA on forms
- ✅ Input sanitization
- ✅ CORS restrictions
- ⚠️ Consider API key authentication for programmatic access

### 4. Frontend Security

- ✅ Content Security Policy (CSP)
- ✅ XSS protection via sanitization
- ✅ No sensitive data in localStorage
- ✅ HTTPS enforced in production (HSTS)

### 5. Monitoring & Logging

- ⚠️ Set up error tracking (e.g., Sentry)
- ⚠️ Monitor failed login attempts
- ⚠️ Log suspicious activity (rate limit hits, CAPTCHA failures)
- ⚠️ Regular security audits

### 6. Dependencies

```bash
# Check for vulnerabilities
npm audit

# Fix non-breaking issues
npm audit fix

# Review breaking changes
npm audit fix --force
```

### 7. Production Deployment

- Use HTTPS only (enforce with HSTS)
- Enable all security headers
- Configure Turnstile CAPTCHA
- Use environment-specific secrets
- Enable database connection pooling
- Set up automated backups
- Configure error reporting
- Enable request logging

---

## Security Checklist

### Pre-Launch

- [ ] All environment variables configured
- [ ] Strong `PAYLOAD_SECRET` set (32+ characters)
- [ ] Database password is strong and unique
- [ ] HTTPS certificate installed and valid
- [ ] Turnstile CAPTCHA configured
- [ ] SMTP credentials secured (app-specific password)
- [ ] Security headers tested with securityheaders.com
- [ ] Rate limiting tested
- [ ] Form submissions tested
- [ ] Admin account created with strong password
- [ ] Test accounts removed
- [ ] `.env` not committed to git
- [ ] CSP policy tested (no console errors)

### Post-Launch Monitoring

- [ ] Monitor rate limit hits
- [ ] Check CAPTCHA success rate
- [ ] Review form submissions for spam
- [ ] Monitor error logs
- [ ] Check SSL certificate expiration
- [ ] Run `npm audit` monthly
- [ ] Review access logs for suspicious activity
- [ ] Test backups monthly

### Incident Response

If security incident occurs:

1. **Immediate Actions**
   - Disable affected endpoints if needed
   - Rotate all secrets and API keys
   - Review access logs
   - Notify affected users if data breach

2. **Investigation**
   - Identify attack vector
   - Assess damage and data exposure
   - Document timeline

3. **Remediation**
   - Patch vulnerability
   - Update dependencies
   - Enhance monitoring
   - Update this document with lessons learned

---

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/)
- [Payload Security](https://payloadcms.com/docs/security/overview)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

---

## Updates

This document should be updated whenever:
- New security features are added
- Security incidents occur
- Best practices evolve
- Dependencies change significantly

**Last Updated**: 2025-01-14
