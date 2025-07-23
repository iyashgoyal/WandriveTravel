import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, searchParamsSchema } from "@shared/schema";
import { z } from "zod";
import { sendInquiryEmail, testSMTPConnection, testEmailDeployment } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all packages with optional search params
  app.get("/api/packages", async (req, res) => {
    try {
      const params = searchParamsSchema.parse(req.query);
      const packages = await storage.getPackages(params);
      res.json(packages);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid search parameters" });
      } else {
        res.status(500).json({ message: "Failed to fetch packages" });
      }
    }
  });

  // Get package by destination
  app.get("/api/packages/by-destination/:destination", async (req, res) => {
    try {
      const destination = decodeURIComponent(req.params.destination);
      const pkg = await storage.getPackageByDestination(destination);
      if (!pkg) {
        res.status(404).json({ message: "Package not found" });
        return;
      }
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch package" });
    }
  });

  // Get single package
  app.get("/api/packages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pkg = await storage.getPackage(id);
      if (!pkg) {
        res.status(404).json({ message: "Package not found" });
        return;
      }
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch package" });
    }
  });

  // Create inquiry - UPDATED WITH NO-CACHE HEADERS
  app.post("/api/inquiries", async (req, res) => {
    try {
      // ADD NO-CACHE HEADERS - This is the key fix for Vercel deployment
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Accel-Expires': '0'
      });

      console.log('📧 Processing new inquiry request...');
      
      // Validate inquiry data
      const inquiry = insertInquirySchema.parse(req.body);
      console.log('✅ Inquiry data validated');
      
      // Create inquiry in database first
      const created = await storage.createInquiry(inquiry);
      console.log('✅ Inquiry stored in database with ID:', created.id);
      
      // Send email notification - CRITICAL: Wait for email before responding
      console.log('📤 Attempting to send email notification...');
      let emailResult = null;
      let emailError = null;
      
      try {
        emailResult = await sendInquiryEmail(created);
        console.log('✅ Email sent successfully:', emailResult.messageId);
      } catch (error) {
        console.error('❌ Email sending failed:', error);
        emailError = error.message;
        // Don't throw here - we still want to return the created inquiry
      }

      // Send response AFTER email processing is complete
      console.log('📤 Sending response to client...');
      res.status(201).json({
        ...created,
        emailSent: emailResult?.success || false,
        emailMessageId: emailResult?.messageId || null,
        emailError: emailError,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ Error in inquiry route:', error);
      
      // Apply same no-cache headers to error responses
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });

      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid inquiry data",
          errors: error.errors,
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(500).json({ 
          message: "Failed to create inquiry",
          error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
          timestamp: new Date().toISOString()
        });
      }
    }
  });

  // Get all inquiries
  app.get("/api/inquiries", async (_req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  // TEST ROUTES - Add these for debugging email issues
  
  // Test SMTP connection
  app.get("/api/test-smtp", async (req, res) => {
    try {
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });

      console.log('🔍 Testing SMTP connection...');
      const result = await testSMTPConnection();
      res.json(result);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Test email sending
  app.get("/api/test-email", async (req, res) => {
    try {
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });

      console.log('📧 Testing email deployment...');
      const result = await testEmailDeployment();
      res.json(result);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Test no-cache headers
  app.get("/api/test-no-cache", async (req, res) => {
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    res.json({
      message: 'This response should not be cached',
      timestamp: new Date().toISOString(),
      random: Math.random(), // This should be different on each request
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
