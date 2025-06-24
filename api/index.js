// Simple Node.js server for Vercel
const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Complete board data matching the application structure
const boards = [
  // Popular (nav bar boards)
  { id: 1, slug: "gen", name: "General", description: "General Discussions", category: "Random" },
  { id: 2, slug: "memes", name: "Memes", description: "Memes & Shitposting", category: "Random" },
  { id: 3, slug: "pol", name: "Politics", description: "Politics (Proceed with Caution)", category: "Random" },
  { id: 4, slug: "coal", name: "Coal", description: "Coal Posts", category: "Random" },
  { id: 5, slug: "gem", name: "Gem", description: "Gem Posts", category: "Random" },
  
  // Random
  { id: 6, slug: "ph", name: "Philippines", description: "Philippines", category: "Random" },
  { id: 7, slug: "green", name: "Green-Text", description: "Green-Text Stories", category: "Random" },
  { id: 8, slug: "deb", name: "Debates", description: "Debates", category: "Random" },
  { id: 9, slug: "hot", name: "Hot Takes", description: "Hot Takes", category: "Random" },
  { id: 10, slug: "schizo", name: "Schizoposting", description: "Schizoposting", category: "Random" },
  
  // Communism
  { id: 11, slug: "marx", name: "Marxism-Leninism", description: "Marxism-Leninism", category: "Communism" },
  { id: 12, slug: "np", name: "NPA/CPP", description: "NPA/CPP", category: "Communism" },
  
  // Hobby
  { id: 13, slug: "phys", name: "Physics", description: "Physics", category: "Hobby" },
  { id: 14, slug: "math", name: "Math", description: "Math", category: "Hobby" },
  { id: 15, slug: "it", name: "IT", description: "IT", category: "Hobby" },
  
  // Brain-rots
  { id: 16, slug: "cap", name: "Capitalism", description: "Inhumanities of Capitalism", category: "Brain-rots" },
  { id: 17, slug: "ana", name: "Anarchist", description: "Anarchist Brain-rot", category: "Brain-rots" },
  { id: 18, slug: "lib", name: "Liberal", description: "Liberal Brain-rot", category: "Brain-rots" },
  { id: 19, slug: "theism", name: "Theist", description: "Theist Brain-rot", category: "Brain-rots" },
  { id: 20, slug: "west", name: "Western", description: "Western Brain-rot", category: "Brain-rots" },
  { id: 21, slug: "maga", name: "MAGA", description: "MAGA Brain-rot", category: "Brain-rots" },
];

// In-memory storage for threads and posts
let threads = [];
let posts = [];
let nextThreadId = 1;
let nextPostId = 1;

app.get('/api/boards', (req, res) => {
  res.json(boards);
});

app.get('/api/boards/:slug', (req, res) => {
  const board = boards.find(b => b.slug === req.params.slug);
  if (!board) {
    return res.status(404).json({ error: 'Board not found' });
  }
  res.json(board);
});

app.get('/api/boards/:slug/threads', (req, res) => {
  const board = boards.find(b => b.slug === req.params.slug);
  if (!board) {
    return res.status(404).json({ error: 'Board not found' });
  }
  
  const boardThreads = threads
    .filter(t => t.boardId === board.id)
    .sort((a, b) => new Date(b.lastBumpAt) - new Date(a.lastBumpAt));
    
  res.json(boardThreads);
});

app.post('/api/boards/:slug/threads', express.json(), (req, res) => {
  const board = boards.find(b => b.slug === req.params.slug);
  if (!board) {
    return res.status(404).json({ error: 'Board not found' });
  }
  
  const { subject, content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  
  const now = new Date();
  const thread = {
    id: nextThreadId++,
    boardId: board.id,
    subject: subject || null,
    isSticky: false,
    isLocked: false,
    createdAt: now,
    lastBumpAt: now
  };
  
  threads.push(thread);
  
  const post = {
    id: nextPostId++,
    threadId: thread.id,
    boardId: board.id,
    content,
    imageUrl: null,
    imageName: null,
    createdAt: now
  };
  
  posts.push(post);
  
  res.json({ thread, post });
});

app.get('/api/threads/:id', (req, res) => {
  const threadId = parseInt(req.params.id);
  const thread = threads.find(t => t.id === threadId);
  
  if (!thread) {
    return res.status(404).json({ error: 'Thread not found' });
  }
  
  const threadPosts = posts
    .filter(p => p.threadId === threadId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  
  res.json({
    ...thread,
    posts: threadPosts,
    postCount: threadPosts.length
  });
});

app.post('/api/threads/:id/posts', express.json(), (req, res) => {
  const threadId = parseInt(req.params.id);
  const thread = threads.find(t => t.id === threadId);
  
  if (!thread) {
    return res.status(404).json({ error: 'Thread not found' });
  }
  
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  
  const now = new Date();
  const post = {
    id: nextPostId++,
    threadId,
    boardId: thread.boardId,
    content,
    imageUrl: null,
    imageName: null,
    createdAt: now
  };
  
  posts.push(post);
  
  // Update thread bump time
  thread.lastBumpAt = now;
  
  res.json(post);
});

app.get('/api/posts/latest', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const latestPosts = posts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit)
    .map(post => {
      const board = boards.find(b => b.id === post.boardId);
      return {
        ...post,
        boardSlug: board ? board.slug : 'unknown'
      };
    });
  
  res.json(latestPosts);
});

app.get('/api/stats', (req, res) => {
  res.json({ 
    totalPosts: posts.length, 
    activeThreads: threads.length, 
    onlineUsers: Math.floor(Math.random() * 500) + 100 
  });
});

// Catch all - serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;