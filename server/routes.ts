import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve API endpoints if needed
  app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
