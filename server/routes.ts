import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);

      // Check if email already exists
      const existingSubscription = await storage.getEmailSubscriptionByEmail(
        validatedData.email
      );

      if (existingSubscription) {
        return res.status(409).json({
          error: "This email is already subscribed to our newsletter.",
        });
      }

      // Create the subscription
      const subscription = await storage.createEmailSubscription(validatedData);

      return res.status(201).json({
        message: "Successfully subscribed to our newsletter!",
        subscription: {
          id: subscription.id,
          email: subscription.email,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid email address. Please provide a valid email.",
        });
      }

      console.error("Error creating subscription:", error);
      return res.status(500).json({
        error: "An error occurred while processing your subscription.",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
