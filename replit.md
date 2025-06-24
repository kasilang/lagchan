# lagchan - Anonymous Filipino-English Imageboard

## Overview

Lagchan is a full-stack anonymous imageboard application built with modern web technologies. It features a retro-styled interface reminiscent of classic imageboards, supporting multiple boards with threaded discussions, image uploads, and real-time posting capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **Styling**: Tailwind CSS with custom retro theme
- **State Management**: TanStack Query for server state
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js 20 with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful endpoints with file upload support
- **File Handling**: Multer for image uploads
- **Development**: Hot reload with Vite middleware integration

### Database Strategy
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Management**: Drizzle Kit for migrations
- **Database**: Configured for PostgreSQL (via Neon serverless)
- **Fallback**: In-memory storage implementation for development

## Key Components

### Database Schema
The application uses three main entities:
- **Boards**: Categories for different topics (Popular, Communism, Academics, etc.)
- **Threads**: Discussion topics within boards
- **Posts**: Individual messages within threads

### File Upload System
- **Storage**: Local filesystem (`/uploads` directory)
- **Validation**: Image-only uploads (JPEG, PNG, GIF, WebP)
- **Size Limit**: 5MB maximum file size
- **Security**: MIME type validation and controlled file access

### Authentication Model
- **Anonymous Posting**: No user accounts required
- **Session Management**: Basic session handling for posting
- **Identity**: All posts attributed to "Anonymous"

## Data Flow

### Posting Workflow
1. User fills out form (subject, content, optional image)
2. Form data submitted via FormData (multipart for images)
3. Server validates and stores post/thread
4. Database updated with new content
5. Client cache invalidated and refreshed
6. Real-time updates via query refetching

### Board Navigation
1. Home page displays categorized board list
2. Board pages show thread listings with pagination
3. Thread pages display posts in chronological order
4. Image viewing through modal/new window

## External Dependencies

### Core Runtime
- Express.js for HTTP server
- Drizzle ORM for database operations
- Multer for file upload handling
- Zod for schema validation

### Frontend Libraries
- React ecosystem (React, React DOM)
- TanStack Query for data fetching
- Wouter for routing
- Radix UI for accessible components
- Tailwind CSS for styling

### Development Tools
- Vite for build tooling and dev server
- TypeScript for type safety
- ESBuild for production bundling
- TSX for TypeScript execution

## Deployment Strategy

### Build Process
- Frontend: Vite builds to `/dist/public`
- Backend: ESBuild bundles server to `/dist/index.js`
- Static assets served from built frontend

### Environment Configuration
- Development: Uses Vite dev server with Express API
- Production: Single Express server serving built assets
- Database: PostgreSQL via environment variable
- File Storage: Local filesystem with configurable upload directory

### Hosting Platform
- **Target**: Replit with autoscale deployment
- **Port**: 5000 (mapped externally)
- **Process**: NPM scripts for dev/build/start lifecycle
- **Database**: PostgreSQL via built-in Replit database or environment variable
- **Migration**: Moved from Netlify static hosting to Replit full-stack hosting for API support

## Changelog
- June 24, 2025: Initial setup with retro 2000s-style imageboard
- June 24, 2025: Updated theme from orange/yellow to blue color scheme
- June 24, 2025: Added meme-style image advertisements 
- June 24, 2025: Updated board structure per user requirements (Random, Communism, Hobby, Brain-rots)
- June 24, 2025: Fixed posting functionality and form validation
- June 24, 2025: Configured for Netlify deployment with /public structure
- June 24, 2025: Migrated from in-memory storage to Supabase PostgreSQL database
- June 24, 2025: Fixed database connection failures with proper error handling and fallback
- June 24, 2025: Resolved React DOM nesting warnings in navigation components
- June 24, 2025: Updated Netlify deployment configuration with proper build command and asset paths
- January 24, 2025: Migrated from Netlify to Replit for full-stack deployment support (API endpoints were not available on Netlify static hosting)

## User Preferences

Preferred communication style: Simple, everyday language.
Theme: Blue color scheme instead of orange/yellow
Deployment: Netlify with /public folder structure
Ads: Meme-style image ads with cursed/unhinged content (4chan style, not cringe)
Rules: Updated to full specification without emoji prefixes