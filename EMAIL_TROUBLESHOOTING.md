# Email Deployment Troubleshooting Guide for Vercel

## Issues Fixed

### 1. **CRITICAL**: API Handler Not Calling Email Function
**Problem**: Your `api/index.js` was not importing or calling the email sending functions.
**Solution**: Added email imports and proper email handling in the inquiry endpoint.

### 2. **Connection Pooling Issues**
**Problem**: SMTP connections were being pooled, which doesn't work well in serverless environments.
**Solution**: 
- Created `createTransporter()` function instead of global transporter
- Set `pool: false` and `maxConnections: 1`
- Properly close connections with `transporter.close()`

### 3. **Timeout Issues**
**Problem**: Vercel functions have execution time limits.
**Solution**:
- Increased maxDuration to 30 seconds in vercel.json
- Reduced SMTP timeouts (10s connection, 5s greeting, 10s socket)
- Added proper timeout handling in email promises

### 4. **Caching Issues**
**Problem**: Responses might be cached, preventing email functionality.
**Solution**: Added no-cache headers to all API responses and vercel.json routes.

### 5. **Environment Variables**
**Problem**: Environment variables might not be properly loaded.
**Solution**: Added explicit `dotenv.config()` and debugging logs.

## Vercel Environment Variables Required

Make sure these are set in your Vercel dashboard:

```
MAILERSEND_USERNAME=your_mailersend_username
MAILERSEND_PASSWORD=your_mailersend_api_token
MAILERSEND_FROM_EMAIL=inquiries@wandrivo.com
EMAIL_USER=wandrivo@gmail.com
```

## Testing Endpoints

After deployment, test these endpoints:

1. **Test SMTP Connection**: `https://your-domain.vercel.app/api/test-smtp`
2. **Test Email Sending**: `https://your-domain.vercel.app/api/test-email`
3. **Submit Inquiry**: POST to `https://your-domain.vercel.app/api/inquiries`

## Additional Troubleshooting Steps

### 1. Check MailerSend Domain Verification
- Log into your MailerSend dashboard
- Verify that your domain `wandrivo.com` is properly verified
- Check SPF, DKIM, and DMARC records

### 2. Check MailerSend API Limits
- Verify you haven't exceeded your sending limits
- Check if your account is in good standing

### 3. Check Vercel Function Logs
```bash
vercel logs --follow
```

### 4. Test Email Locally First
Run the development server and test emails locally to ensure configuration is correct.

### 5. Common MailerSend Issues on Vercel

#### Issue: "Domain not verified"
**Solution**: Add these DNS records to your domain:
```
TXT record: v=spf1 include:spf.mailersend.net ~all
CNAME record: ms1._domainkey.yourdomain.com → ms1.yourdomain.dkim.mailersend.net
CNAME record: ms2._domainkey.yourdomain.com → ms2.yourdomain.dkim.mailersend.net
```

#### Issue: "Authentication failed"
**Solution**: 
- Double-check your MailerSend API token
- Ensure you're using the correct username (usually your domain)

#### Issue: "Connection timeout"
**Solution**: 
- Check if Vercel's network allows SMTP connections
- Try using port 2525 instead of 587

### 6. Alternative Email Solutions for Vercel

If MailerSend continues to have issues, consider:

1. **Resend** (recommended for Vercel): `https://resend.com`
2. **SendGrid** with API (not SMTP)
3. **Mailgun** with API
4. **AWS SES** with API

## Deployment Commands

```bash
# Deploy to Vercel
vercel --prod

# Check deployment logs
vercel logs

# Set environment variables
vercel env add MAILERSEND_USERNAME
vercel env add MAILERSEND_PASSWORD
vercel env add MAILERSEND_FROM_EMAIL
vercel env add EMAIL_USER
```

## Next Steps

1. Deploy these changes to Vercel
2. Test the `/api/test-smtp` endpoint first
3. Test the `/api/test-email` endpoint
4. Submit a test inquiry through your website
5. Check Vercel function logs for any errors

If emails still don't work after these fixes, the issue is likely with:
- MailerSend domain verification
- MailerSend API credentials
- Network restrictions from Vercel to MailerSend
