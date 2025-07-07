# Render Deployment Guide

## Quick Setup for Render

### 1. Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:

**Settings:**
- **Name**: `collaborative-task-manager-api`
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Root Directory**: Leave empty

### 2. Environment Variables

Add these environment variables in Render dashboard:

```bash
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-app-name.onrender.com/api/auth/google/callback
FRONTEND_URL=https://your-netlify-app.netlify.app
SESSION_SECRET=your_random_session_secret
```

### 3. Get Your Render URL

After deployment, you'll get a URL like:
```
https://your-app-name.onrender.com
```

### 4. Update Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services → Credentials
3. Edit your OAuth 2.0 Client ID
4. Add this Authorized Redirect URI:
   ```
   https://your-app-name.onrender.com/api/auth/google/callback
   ```

### 5. Update Frontend

In your Netlify environment variables, set:
```bash
VITE_API_URL=https://your-app-name.onrender.com
```

## Troubleshooting

### Build Issues
- Make sure `esbuild` is in your dependencies
- Check that `server/index.ts` exists
- Verify all imports are correct

### Runtime Issues
- Check Render logs for errors
- Ensure all environment variables are set
- Verify MongoDB connection string

### OAuth Issues
- Double-check the callback URL in Google Console
- Ensure CORS is configured correctly
- Check that SESSION_SECRET is set

## Local Testing

Test your build locally:
```bash
npm run build
npm start
```

Then visit: `http://localhost:5000/api/health` 