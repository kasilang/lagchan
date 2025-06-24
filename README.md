# Lagchan - Anonymous Imageboard

A full-stack anonymous imageboard application built with React, Express, and TypeScript.

## Quick Deploy

### Railway (Recommended)
1. Connect your GitHub repo to Railway
2. Add environment variables if needed
3. Deploy automatically

### Render
1. Connect your GitHub repo to Render
2. Use the build command: `npm run build`
3. Use the start command: `npm start`

### Vercel
1. Connect your GitHub repo to Vercel
2. The project will deploy as a Node.js application
3. All routes are handled by the Express server

### Docker
```bash
docker build -t lagchan .
docker run -p 5000:5000 lagchan
```

## Local Development

```bash
npm install
npm run dev
```

The application will run on http://localhost:5000

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (optional, falls back to in-memory storage)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## Features

- Anonymous posting
- Multiple boards (/gen/, /memes/, /pol/, etc.)
- Image uploads
- Threaded discussions
- Real-time updates
- Retro 2000s-style UI