# Deployment Setup Guide

## Google OAuth Configuration

### 1. Update Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services → Credentials
3. Find your OAuth 2.0 Client ID
4. Add these Authorized Redirect URIs:
   ```
   https://your-railway-backend.up.railway.app/api/auth/google/callback
   http://localhost:5000/api/auth/google/callback
   ```

### 2. Railway Backend Environment Variables

Set these environment variables in your Railway project:

```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-railway-backend.up.railway.app/api/auth/google/callback
FRONTEND_URL=https://your-netlify-app.netlify.app
SESSION_SECRET=your_session_secret
MONGODB_URI=your_mongodb_connection_string
```

### 3. Netlify Frontend Environment Variables

Set these environment variables in your Netlify project:

```bash
VITE_API_URL=https://your-railway-backend.up.railway.app
VITE_FRONTEND_URL=https://your-netlify-app.netlify.app
```

### 4. Update Configuration Files

Replace the placeholder URLs in these files with your actual URLs:

1. `client/src/lib/config.ts` - Update the default API_URL
2. `server/index.ts` - Update the CORS origins
3. `server/routes.ts` - Update the frontend redirect URL

### 5. Test the Flow

1. Deploy your backend to Railway
2. Deploy your frontend to Netlify
3. Test the Google Sign-In button
4. Verify the redirect flow works correctly

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your Railway backend has the correct CORS origins
2. **Session Issues**: Ensure SESSION_SECRET is set in Railway
3. **Redirect URI Mismatch**: Double-check the callback URL in Google Cloud Console
4. **Environment Variables**: Verify all environment variables are set correctly

### Debug Steps:

1. Check Railway logs for authentication errors
2. Check Netlify function logs for API routing issues
3. Verify Google OAuth credentials are correct
4. Test the backend API endpoints directly 