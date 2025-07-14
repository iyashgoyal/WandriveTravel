# Wandrivo - Travel Agency Website

A modern, responsive travel agency website built with React, Express.js, and TypeScript.

## Features

- **Responsive Design**: Mobile-first design that works on all devices
- **Travel Packages**: Browse and search through various travel packages
- **Contact System**: Contact form for inquiries and bookings
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **Modern UI**: Clean interface built with Tailwind CSS and shadcn/ui

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter (React Router alternative)
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand, TanStack Query

## Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (or use the included in-memory storage)

### Installation

1. Clone the repository
\`\`\`bash
git clone <your-repo-url>
cd wandrivo
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
# Create .env file with your database URL
DATABASE_URL=your_postgresql_connection_string
\`\`\`

4. Start development server
\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:5000`

## Deployment on Vercel

This project is configured for easy deployment on Vercel:

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI
\`\`\`bash
npm i -g vercel
\`\`\`

2. Deploy
\`\`\`bash
vercel
\`\`\`

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration and deploy

### Environment Variables for Vercel

Make sure to set these environment variables in your Vercel dashboard:

- `DATABASE_URL`: Your PostgreSQL connection string
- `NODE_ENV`: Set to "production"

## Project Structure

\`\`\`
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage logic
│   └── db.ts              # Database configuration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema and types
├── api/                   # Vercel serverless functions
└── vercel.json           # Vercel configuration
\`\`\`

## Key Features

### Travel Packages
- Browse packages by category (Adventure, Cultural, Beach, Mountain)
- Search functionality with real-time filtering
- Detailed package information with pricing in Indian Rupees
- Responsive card layout (2 per row on mobile, 4 on desktop)

### Contact System
- Contact form with validation
- Package-specific inquiries
- Contact information display

### Design Features
- Uniform orange-amber-yellow gradient color scheme
- Video background in hero section
- Glassmorphism effects
- Smooth animations and transitions
- Mobile-first responsive design

## Environment Setup

The project uses in-memory storage by default for development. To use a PostgreSQL database:

1. Set up a PostgreSQL database
2. Add your `DATABASE_URL` to environment variables
3. Update the storage implementation in `server/storage.ts`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License