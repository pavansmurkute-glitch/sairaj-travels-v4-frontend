# SendGrid Email Setup Guide for Sairaj Travels

## Issues Fixed

Your email connectivity issues have been resolved by fixing the following problems:

1. **Port Configuration**: Changed from port 2525 to 587 (correct SendGrid SMTP port)
2. **Environment Variables**: Updated to use proper SendGrid environment variables
3. **Timeout Settings**: Increased timeouts from 3-5 seconds to 30 seconds for better reliability
4. **Method Signatures**: Fixed the `notifyAdmin` method to handle HTML emails properly

## Required Steps to Complete Setup

### 1. Get Your SendGrid API Key

1. Go to [SendGrid](https://sendgrid.com/) and create an account
2. Verify your sender identity (email address: `PavansMurkute@gmail.com`)
3. Go to Settings → API Keys
4. Create a new API key with "Mail Send" permissions
5. Copy the API key (starts with `SG.`)

### 2. Update Render Environment Variables

In your Render dashboard, update these environment variables:

```
SENDGRID_API_KEY=SG.your_actual_api_key_here
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
SENDGRID_USERNAME=apikey
EMAIL_SERVICE_ENABLED=true
```

### 3. Verify Sender Authentication

In SendGrid dashboard:
1. Go to Settings → Sender Authentication
2. Verify your domain or single sender email (`PavansMurkute@gmail.com`)
3. This is required for production email sending

### 4. Test Email Functionality

After updating the environment variables:

1. Redeploy your application on Render
2. Test the email endpoint: `https://sairaj-travels-v5-backend.onrender.com/api/test/test-hardcoded-email`
3. Check the server logs for confirmation

## Configuration Changes Made

### render.yaml Updates:
- Changed `EMAIL_HOST` from `smtp.gmail.com` to `smtp.sendgrid.net`
- Updated `EMAIL_PORT` to `587`
- Added `SENDGRID_USERNAME` and `SENDGRID_API_KEY` variables
- Increased timeout values to 30 seconds for better reliability

### EmailService.java Updates:
- Fixed `notifyAdmin` method signature to handle HTML emails
- Improved error handling and logging

## Troubleshooting

If you still experience issues:

1. **Check SendGrid Dashboard**: Look for any authentication or sending limits
2. **Verify API Key**: Ensure the API key has proper permissions
3. **Check Sender Verification**: Make sure your email is verified in SendGrid
4. **Monitor Logs**: Check Render logs for detailed error messages

## Alternative: Gmail SMTP (If SendGrid doesn't work)

If you prefer to use Gmail SMTP instead:

```
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=PavansMurkute@gmail.com
SPRING_MAIL_PASSWORD=your_app_password
```

Note: Gmail requires an App Password, not your regular password.

## Next Steps

1. Update your SendGrid API key in Render environment variables
2. Redeploy the application
3. Test the email functionality
4. Monitor the logs for successful email delivery

The email service should now work reliably with proper SendGrid configuration!
