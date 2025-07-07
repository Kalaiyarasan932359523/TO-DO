import dotenv from 'dotenv';
dotenv.config();
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic, log } from "./vite";
import session from 'express-session';
import cors from 'cors';
import connectDB from './db';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow CORS for frontend (adjust origin as needed)
app.use(cors({
  origin: [
    'http://localhost:3000', // Development
    'https://your-netlify-app.netlify.app', // Production - replace with your actual Netlify URL
    process.env.FRONTEND_URL // Environment variable
  ].filter(Boolean),
  credentials: true
}));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'lax', // Use 'none' if using HTTPS and cross-site cookies
  }
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Connect to MongoDB
  await connectDB();
  
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Only setup vite in development and after setting up all the other routes
  if (process.env.NODE_ENV === "development") {
    // Dynamically import viteDevServer and vite.config only in development from dev/
    const viteDevServer = await import("../dev/viteDevServer.js");
    const viteConfig = await import("../dev/vite.config.js");
    await viteDevServer.setupVite(app, server, viteConfig.default);
  } else if (process.env.API_ONLY !== "true") {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 8080 (Cloud Run default)
  const port = process.env.PORT || 8080;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
