// Environment configuration
export const config = {
  // Backend API URL - replace with your actual Railway URL
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  
  // Frontend URL for OAuth callbacks
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || "https://your-frontend-app.onrender.com",
  
  // Environment
  NODE_ENV: import.meta.env.MODE || "development",
}; 