# Deployment Setup Guide

## Backend Deployment Options

### Option 1: Render (Recommended for Free Tier)
Since Railway's free tier only supports databases, use Render for your backend API.

1. **Deploy to Render**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Create a new "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Root Directory**: Leave empty (or `/`)

2. **Set Environment Variables in Render**:
   ```bash
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=https://your-render-app.onrender.com/api/auth/google/callback
   FRONTEND_URL=https://your-netlify-app.netlify.app
   SESSION_SECRET=your_session_secret
   ```

### Option 2: Railway (Paid Plan Required)
If you upgrade to a paid Railway plan, you can deploy your backend there.

## Google OAuth Configuration

### 1. Update Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services → Credentials
3. Find your OAuth 2.0 Client ID
4. Add these Authorized Redirect URIs:
   ```
   # For Render deployment:
   https://your-render-app.onrender.com/api/auth/google/callback
   
   # For Railway deployment (if using paid plan):
   https://your-railway-backend.up.railway.app/api/auth/google/callback
   
   # For local development:
   http://localhost:5000/api/auth/google/callback
   ```

### 2. Backend Environment Variables

**For Render:**
```bash
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-render-app.onrender.com/api/auth/google/callback
FRONTEND_URL=https://your-netlify-app.netlify.app
SESSION_SECRET=your_session_secret
```

**For Railway (if using paid plan):**
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
# For Render backend:
VITE_API_URL=https://your-render-app.onrender.com
VITE_FRONTEND_URL=https://your-netlify-app.netlify.app

# For Railway backend (if using paid plan):
VITE_API_URL=https://your-railway-backend.up.railway.app
VITE_FRONTEND_URL=https://your-netlify-app.netlify.app
```

### 4. Update Configuration Files

Replace the placeholder URLs in these files with your actual URLs:

1. `client/src/lib/config.ts` - Update the default API_URL
2. `server/index.ts` - Update the CORS origins
3. `server/routes.ts` - Update the frontend redirect URL

### 5. Test the Flow

1. Deploy your backend to Render (or Railway with paid plan)
2. Deploy your frontend to Netlify
3. Test the Google Sign-In button
4. Verify the redirect flow works correctly

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend has the correct CORS origins
2. **Session Issues**: Ensure SESSION_SECRET is set in your backend
3. **Redirect URI Mismatch**: Double-check the callback URL in Google Cloud Console
4. **Environment Variables**: Verify all environment variables are set correctly

### Debug Steps:

1. Check Render/Railway logs for authentication errors
2. Check Netlify function logs for API routing issues
3. Verify Google OAuth credentials are correct
4. Test the backend API endpoints directly

## Getting Your URLs

### Render Backend URL:
- Go to your Render dashboard
- Select your web service
- Copy the URL (e.g., `https://your-app.onrender.com`)

### Netlify Frontend URL:
- Go to your Netlify dashboard
- Select your site
- Copy the URL (e.g., `https://your-site.netlify.app`)

### Railway Database URL (if using Railway for database):
- Go to your Railway dashboard
- Select your database service
- Copy the connection string 