// Simple in-memory storage
let threads = [];
let posts = [];
let nextPostId = 1000;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const { id } = req.query;
  const threadId = parseInt(id);
  
  if (req.method === 'GET') {
    console.log(`Getting thread ${threadId}`);
    
    // Find existing thread or return sample
    let thread = threads.find(t => t.id === threadId);
    let threadPosts = posts.filter(p => p.threadId === threadId);
    
    if (!thread) {
      // Return a sample thread
      thread = {
        id: threadId,
        boardId: 1,
        subject: 'Sample Thread',
        isSticky: false,
        isLocked: false,
        createdAt: new Date(),
        lastBumpAt: new Date()
      };
      
      threadPosts = [
        {
          id: 1,
          threadId: threadId,
          boardId: 1,
          content: 'This is a sample post. Create threads on Replit for full functionality.',
          imageUrl: null,
          imageName: null,
          createdAt: new Date()
        }
      ];
    }
    
    const result = {
      ...thread,
      posts: threadPosts,
      postCount: threadPosts.length
    };
    
    res.status(200).json(result);
  } else if (req.method === 'POST') {
    try {
      // Handle body parsing for Vercel
      let body = req.body;
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      
      const { content } = body || {};
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }
      
      const now = new Date();
      const post = {
        id: nextPostId++,
        threadId: threadId,
        boardId: 1, // Default to first board
        content,
        imageUrl: null,
        imageName: null,
        createdAt: now
      };
      
      posts.push(post);
      
      // Update thread bump time if it exists
      const thread = threads.find(t => t.id === threadId);
      if (thread) {
        thread.lastBumpAt = now;
      }
      
      res.status(200).json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}