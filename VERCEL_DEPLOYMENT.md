# Vercel Deployment Guide

This guide will help you deploy both the frontend and backend of your Collaborative Task Manager to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket**: Your code should be in a Git repository
3. **MongoDB Atlas**: Set up a MongoDB database (free tier available)

## Environment Variables Setup

Before deploying, you need to set up environment variables in Vercel:

### Required Environment Variables

1. **MongoDB Connection String**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   ```

2. **Session Secret**
   ```
   SESSION_SECRET=your-super-secret-session-key
   ```

3. **Google OAuth (if using)**
   ```
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Frontend URL** (after deployment)
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```

## Deployment Steps

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Select the repository containing your project

### 2. Configure Build Settings

Vercel will automatically detect the configuration from `vercel.json`, but you can verify:

- **Framework Preset**: None (Custom)
- **Build Command**: Will be handled by vercel.json
- **Output Directory**: Will be handled by vercel.json
- **Install Command**: `npm install`

### 3. Set Environment Variables

1. In your Vercel project dashboard, go to "Settings" → "Environment Variables"
2. Add all the required environment variables listed above
3. Make sure to set them for "Production", "Preview", and "Development" environments

### 4. Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be available at the provided URL

## Project Structure

```
├── api/
│   └── index.ts          # Serverless API handler
├── client/
│   ├── package.json      # Frontend dependencies
│   ├── vite.config.ts    # Frontend build config
│   └── src/              # React frontend code
├── server/               # Original server code (for development)
├── shared/               # Shared types and utilities
├── vercel.json          # Vercel configuration
└── .vercelignore        # Files to exclude from deployment
```

## How It Works

### Frontend (Static Build)
- The React app is built using Vite
- Static files are served from `client/dist`
- All routes fall back to `index.html` for client-side routing

### Backend (Serverless Functions)
- API routes are handled by serverless functions
- MongoDB connection is established for each function invocation
- Sessions are handled with proper security settings

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in the correct package.json files
   - Verify TypeScript compilation
   - Check build logs in Vercel dashboard

2. **API Errors**
   - Verify environment variables are set correctly
   - Check MongoDB connection string
   - Ensure CORS settings are correct

3. **Frontend Not Loading**
   - Check that the build output is in the correct directory
   - Verify routing configuration in vercel.json

### Debugging

1. **View Logs**: Go to your Vercel dashboard → Functions → View Function Logs
2. **Test API**: Use the Vercel dashboard to test API endpoints
3. **Check Environment**: Verify environment variables are loaded correctly

## Development vs Production

### Local Development
```bash
npm run dev  # Runs both frontend and backend
```

### Production (Vercel)
- Frontend: Static files served by Vercel CDN
- Backend: Serverless functions handle API requests
- Database: MongoDB Atlas (cloud database)

## Performance Optimization

1. **Database**: Use MongoDB Atlas with proper indexing
2. **CDN**: Vercel automatically serves static files from CDN
3. **Caching**: Implement proper caching strategies for API responses
4. **Images**: Use Vercel's image optimization

## Security Considerations

1. **Environment Variables**: Never commit secrets to Git
2. **CORS**: Configure CORS properly for production
3. **Sessions**: Use secure session configuration
4. **HTTPS**: Vercel automatically provides HTTPS

## Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Set up error monitoring
3. **Performance**: Monitor function execution times
4. **Database**: Monitor MongoDB Atlas metrics

## Updates and Maintenance

1. **Automatic Deployments**: Vercel automatically deploys on Git pushes
2. **Preview Deployments**: Each PR gets a preview URL
3. **Rollbacks**: Easy rollback to previous deployments
4. **Environment Variables**: Update through Vercel dashboard

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/) 