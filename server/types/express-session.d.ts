import "express-session";

// Extend SessionData to include your custom session properties
declare module "express-session" {
  interface SessionData {
    userId?: string;
    // add any other session properties you use
  }
}

declare module "express-serve-static-core" {
  interface Request {
    session: import("express-session").Session & Partial<import("express-session").SessionData>;
  }
} 