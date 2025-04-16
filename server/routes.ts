import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import path from "path";
import { storage } from "./storage";
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve API endpoints if needed
  app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
  });
  
  // Serve static files from the public directory
  const publicPath = path.resolve(process.cwd(), "public");
  app.use(express.static(publicPath));
  log(`Serving static files from ${publicPath}`);

  const httpServer = createServer(app);

  return httpServer;
}
