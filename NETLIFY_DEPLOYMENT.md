# Netlify Frontend Deployment Guide

## Step-by-Step Deployment

### 1. Go to Netlify
1. Visit [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git"

### 2. Connect Your Repository
1. Choose "GitHub" as your Git provider
2. Select your repository: `Kalaiyarasan932359523/TO-DO`
3. Click "Connect"

### 3. Configure Build Settings
**Important:** Use these exact settings:

- **Base directory**: `client`
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18` (or leave default)

### 4. Deploy
1. Click "Deploy site"
2. Wait for the build to complete
3. Your site will be available at: `https://random-name.netlify.app`

### 5. Get Your URL
After deployment, you'll see your site URL in the dashboard:
```
https://your-site-name.netlify.app
```

### 6. Set Environment Variables
In your Netlify site dashboard:
1. Go to "Site settings" → "Environment variables"
2. Add these variables:

```bash
VITE_API_URL=https://your-render-app.onrender.com
VITE_FRONTEND_URL=https://your-site-name.netlify.app
```

## Troubleshooting

### If Build Fails:
1. Check the build logs in Netlify
2. Make sure the base directory is set to `client`
3. Verify the build command is `npm run build`
4. Check that the publish directory is `dist`

### If Site Shows "Not Found":
1. Check if the build completed successfully
2. Verify the publish directory contains `index.html`
3. Check the deployment logs for errors

### Common Issues:
- **Wrong base directory**: Must be `client`, not root
- **Wrong publish directory**: Must be `dist`, not `client/dist`
- **Missing environment variables**: Set them in Netlify dashboard

## Testing Your Deployment

1. Visit your Netlify URL
2. You should see your login page
3. Test the Google Sign-In button
4. Check browser console for any errors

## Next Steps

After successful deployment:
1. Get your Netlify URL
2. Update your Render backend environment variables
3. Update Google OAuth callback URLs
4. Test the full authentication flow 