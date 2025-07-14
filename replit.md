# Wandrivo - Travel Agency Website

## Project Overview
A professional travel agency website called "Wandrivo" targeting the Indian market with domestic and international travel packages. The website features responsive design, colorful gradients, and modern UI components.

## Recent Changes
- **Uniform Color Scheme Implementation** (Jan 14, 2025): Applied consistent orange-amber-yellow gradient backgrounds across all pages with gradient text headings
- **Enhanced UI Components** (Jan 14, 2025): Updated package cards, footer, and buttons with glassmorphism effects and consistent orange-red gradient styling
- **Video Background Hero Section** (Jan 14, 2025): Added looping beach drone footage with gradient tinted overlay for enhanced visual appeal
- **Fixed Search & Filter Functionality** (Jan 14, 2025): Corrected category mapping and implemented working search/filter with in-memory storage
- **Improved Card Sizing** (Jan 14, 2025): Optimized for mobile (2 cards per row) and desktop (4 cards per row) layouts
- **Sample Data Integration** (Jan 14, 2025): Added 8 Indian travel packages with authentic destinations and pricing in rupees

## Technical Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL (with in-memory fallback)
- **UI Components**: shadcn/ui
- **Routing**: wouter
- **State Management**: Zustand, TanStack Query

## Project Architecture
- `/client/src/pages/` - Main page components (home, packages, about, contact)
- `/client/src/components/` - Reusable UI components
- `/server/` - Express backend with API routes
- `/shared/` - Shared types and schemas
- In-memory storage with sample travel packages for development

## User Preferences
- Uniform color scheme across entire website using orange-amber-yellow gradients
- Consistent gradient text styling for all major headings
- White navbar maintained as requested
- Mobile-first responsive design
- Indian market focus with rupee pricing
- Video backgrounds for enhanced visual appeal
- Glassmorphism effects for cards and components

## Key Features
- Advanced search and filtering system
- Responsive package card layouts
- Video background hero section with tinted overlay
- Contact form with inquiry management
- Multi-category travel packages (domestic/international)
- Smooth animations and transitions