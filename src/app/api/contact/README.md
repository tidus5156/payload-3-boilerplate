# Contact API Documentation

## Endpoint

`POST /api/contact`

## Description

Handles both contact form and rental analysis form submissions with validation, rate limiting, CAPTCHA verification, and email notifications.

## Request Body

### Contact Form

```json
{
  "formType": "contact",
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "(404) 555-0100",
  "message": "I'm interested in your property management services...",
  "turnstileToken": "optional-captcha-token"
}
```

### Rental Analysis Form

```json
{
  "formType": "rental-analysis",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "(404) 555-0200",
  "propertyAddress": "123 Main St, Atlanta, GA 30303",
  "bedrooms": 3,
  "bathrooms": 2.5,
  "propertyType": "single-family",
  "currentStatus": "vacant",
  "message": "Optional additional notes...",
  "turnstileToken": "optional-captcha-token"
}
```

## Validation Rules

### Contact Form
- `name`: minimum 2 characters
- `email`: valid email format
- `phone`: optional
- `message`: minimum 10 characters
- `turnstileToken`: optional

### Rental Analysis Form
- `name`: minimum 2 characters
- `email`: valid email format
- `phone`: minimum 10 characters (required)
- `propertyAddress`: minimum 5 characters
- `bedrooms`: number between 0-20
- `bathrooms`: number between 0-20
- `propertyType`: one of `single-family`, `townhouse`, `condo`, `multi-family`, `other`
- `currentStatus`: one of `vacant`, `owner-occupied`, `rented`, `other`
- `message`: optional
- `turnstileToken`: optional

## Response

### Success (201 Created)

```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you within 24 hours.",
  "submissionId": "63f8b9c4d1e2f3a4b5c6d7e8"
}
```

### Validation Error (400 Bad Request)

```json
{
  "error": "Validation failed",
  "details": {
    "email": ["Invalid email address"],
    "message": ["Message must be at least 10 characters"]
  }
}
```

### Rate Limit Error (429 Too Many Requests)

```json
{
  "error": "Too many requests. Please try again later."
}
```

### Server Error (500 Internal Server Error)

```json
{
  "error": "An error occurred while processing your request. Please try again later."
}
```

## Features

### 1. Rate Limiting
- **Default**: 5 requests per IP address per minute
- Prevents spam and abuse
- Uses in-memory storage (consider Redis for production with multiple servers)

### 2. CAPTCHA Verification
- **Provider**: Cloudflare Turnstile
- Optional but recommended for production
- Verified server-side with secret key
- Gracefully handles missing configuration in development

### 3. Email Notifications

#### Admin Notification
- Sent to `NOTIFICATION_EMAIL` environment variable
- Different templates for contact vs rental analysis
- Includes all submission details + IP address
- HTML formatted with brand colors

#### Auto-Reply to User
- Sent to submitter's email address
- Confirms receipt of submission
- Includes contact information for direct reach
- Sets 24-hour response expectation

### 4. Data Storage
- Submissions stored in `contact-submissions` collection
- Includes metadata (IP address, user agent, timestamp)
- Status field for tracking follow-up
- Accessible via Payload admin panel

### 5. Security
- Input validation with Zod schemas
- XSS protection via validation
- Rate limiting per IP
- CAPTCHA verification
- IP address logging for abuse prevention

## Environment Variables

Required:
```bash
DATABASE_URI=postgresql://...
PAYLOAD_SECRET=your-secret-key
```

Optional (for full functionality):
```bash
# SMTP Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SMTP_FROM=noreply@allaypm.com
NOTIFICATION_EMAIL=info@allaypm.com

# Cloudflare Turnstile CAPTCHA
TURNSTILE_SECRET_KEY=your-secret-key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
```

## Usage Example

```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    formType: 'rental-analysis',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '4045550100',
    propertyAddress: '123 Main St, Atlanta, GA',
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'single-family',
    currentStatus: 'vacant',
  }),
})

const data = await response.json()

if (response.ok) {
  console.log('Success!', data.submissionId)
} else {
  console.error('Error:', data.error)
}
```

## Testing

### Development (without SMTP/CAPTCHA)
- SMTP not configured: Emails will be logged to console only
- Turnstile not configured: CAPTCHA verification is skipped
- Rate limiting still active

### Production Checklist
- [ ] Configure SMTP credentials
- [ ] Set NOTIFICATION_EMAIL
- [ ] Configure Cloudflare Turnstile
- [ ] Test email delivery
- [ ] Test rate limiting
- [ ] Monitor submission logs
- [ ] Consider Redis for multi-server rate limiting

## Monitoring

Check submission status in Payload admin:
1. Navigate to Contact Submissions collection
2. Filter by status (new, contacted, completed)
3. View submission details and metadata
4. Update status as you process leads

## Troubleshooting

### Emails not sending
- Check SMTP credentials in .env
- Verify SMTP_HOST and SMTP_PORT
- Check console logs for error messages
- Test with a service like Mailtrap in development

### CAPTCHA failures
- Verify TURNSTILE_SECRET_KEY is set
- Check that token is being passed from frontend
- Ensure frontend has NEXT_PUBLIC_TURNSTILE_SITE_KEY

### Rate limiting too aggressive
- Adjust maxRequests and windowMs in route.ts
- Consider implementing IP whitelist for testing
- Use Redis for production to sync across servers

### Database errors
- Verify contact-submissions collection exists
- Check field names match schema
- Run `npm run generate:types` after collection changes
