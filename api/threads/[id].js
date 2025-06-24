// Simple in-memory storage
let threads = [];
let posts = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const { id } = req.query;
  const threadId = parseInt(id);
  
  if (req.method === 'GET') {
    // Return a sample thread if none exist
    const sampleThread = {
      id: threadId,
      boardId: 1,
      subject: 'Sample Thread',
      isSticky: false,
      isLocked: false,
      createdAt: new Date(),
      lastBumpAt: new Date(),
      posts: [
        {
          id: 1,
          threadId: threadId,
          boardId: 1,
          content: 'This is a sample post. Create threads on Replit for full functionality.',
          imageUrl: null,
          imageName: null,
          createdAt: new Date()
        }
      ],
      postCount: 1
    };
    
    res.status(200).json(sampleThread);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}