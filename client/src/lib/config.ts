// Environment configuration
export const config = {
  // Backend API URL - replace with your actual Railway URL
  API_URL: import.meta.env.VITE_API_URL || "https://your-railway-backend.up.railway.app",
  
  // Frontend URL for OAuth callbacks
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || "https://your-netlify-app.netlify.app",
  
  // Environment
  NODE_ENV: import.meta.env.MODE || "development",
}; 