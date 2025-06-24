// Simple Node.js server for Vercel
const express = require('express');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../dist/public')));

// Basic API routes
app.get('/api/boards', (req, res) => {
  res.json([
    { id: 1, slug: "gen", name: "General", description: "General Discussions", category: "Random" },
    { id: 2, slug: "memes", name: "Memes", description: "Memes & Shitposting", category: "Random" },
    { id: 3, slug: "pol", name: "Politics", description: "Politics (Proceed with Caution)", category: "Random" }
  ]);
});

app.get('/api/boards/:slug', (req, res) => {
  const boards = [
    { id: 1, slug: "gen", name: "General", description: "General Discussions", category: "Random" },
    { id: 2, slug: "memes", name: "Memes", description: "Memes & Shitposting", category: "Random" },
    { id: 3, slug: "pol", name: "Politics", description: "Politics (Proceed with Caution)", category: "Random" }
  ];
  const board = boards.find(b => b.slug === req.params.slug);
  if (!board) {
    return res.status(404).json({ error: 'Board not found' });
  }
  res.json(board);
});

app.get('/api/boards/:slug/threads', (req, res) => {
  res.json([]);
});

app.get('/api/threads/:id', (req, res) => {
  res.json({
    id: parseInt(req.params.id),
    subject: 'Sample Thread',
    posts: [
      { id: 1, content: 'This is a sample post. Deploy your own backend for full functionality.', createdAt: new Date() }
    ]
  });
});

app.get('/api/posts/latest', (req, res) => {
  res.json([]);
});

app.get('/api/stats', (req, res) => {
  res.json({ totalPosts: 0, activeThreads: 0, onlineUsers: 42 });
});

// Catch all - serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

module.exports = app;