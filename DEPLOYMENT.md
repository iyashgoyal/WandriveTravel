# Vercel Deployment Guide

This project is configured for easy deployment on Vercel. Here's how to deploy:

## Prerequisites

1. A Vercel account (free tier works)
2. GitHub repository with your code
3. PostgreSQL database (optional - uses in-memory storage by default)

## Deployment Steps

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**
   - Push your code to a GitHub repository
   - Make sure all files including `vercel.json` are committed

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in and click "New Project"
   - Import your GitHub repository

3. **Configure Settings**
   - Vercel will automatically detect the configuration
   - The build command is already set to `npm run build`
   - The output directory is set to `dist/client`

4. **Set Environment Variables (Optional)**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add `DATABASE_URL` if using PostgreSQL
   - Add `NODE_ENV=production`

5. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your app will be available at `your-app-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose your team/account
   - Set project name
   - Confirm deployment

## Project Structure for Vercel

The project is structured to work seamlessly with Vercel:

- **Frontend**: Built with Vite and served as static files
- **Backend**: Express API routes converted to serverless functions
- **Database**: Uses in-memory storage by default (can be configured for PostgreSQL)

## Important Files

- `vercel.json`: Vercel configuration with proper build settings
- `api/index.js`: Serverless function entry point (CommonJS format)
- `server/storage.js`: CommonJS storage module for Vercel compatibility
- `dist/client/`: Built frontend files (auto-generated)

## Fixed Deployment Issues

The following issues have been resolved:

✅ **Function Runtime Error**: Updated `vercel.json` to use proper `@vercel/node` and `@vercel/static-build` builders  
✅ **Module Format**: Created CommonJS versions of backend files for Vercel compatibility  
✅ **Build Configuration**: Properly configured static build with correct output directory

## Environment Variables

For production deployment, you may want to set:

```
NODE_ENV=production
DATABASE_URL=your_postgresql_url (optional)
```

## Features That Work on Vercel

✅ **Frontend**: React app with routing  
✅ **API Routes**: All `/api/*` endpoints  
✅ **Static Assets**: Images, CSS, JS files  
✅ **Database**: In-memory storage (default) or PostgreSQL  
✅ **Contact Forms**: Form submissions and email handling  

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure TypeScript files compile without errors
- Verify all imports are correctly resolved

### API Routes Not Working
- Check that `vercel.json` routes are configured correctly
- Verify the API functions are properly exported
- Check Vercel function logs in the dashboard

### Static Files Not Loading
- Ensure the build output directory is correct (`dist/client`)
- Check that all assets are properly included in the build

## Local Development vs Production

- **Local**: Runs Express server with Vite dev server
- **Production**: Static files + serverless functions on Vercel
- **Database**: In-memory storage (works in both environments)

Your app should work identically in both environments!