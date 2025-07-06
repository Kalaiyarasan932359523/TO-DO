import { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  res.json({
    message: "API is working!",
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    headers: req.headers
  });
} 