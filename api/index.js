// Vercel serverless function entry point
const express = require('express');
const { storage } = require('../server/storage');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Package routes
app.get('/api/packages', async (req, res) => {
  try {
    const packages = await storage.getPackages(req.query);
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/packages/:id', async (req, res) => {
  try {
    const packageId = parseInt(req.params.id);
    const pkg = await storage.getPackage(packageId);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Inquiry routes
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await storage.getInquiries();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = await storage.createInquiry(req.body);
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = app;