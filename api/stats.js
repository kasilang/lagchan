import { getDb, initializeDatabase } from './setup-db.js';

let dbInitialized = false;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    try {
      const sql = getDb();
      
      if (!sql) {
        return res.status(200).json({
          totalPosts: 0,
          activeThreads: 0,
          onlineUsers: Math.floor(Math.random() * 500) + 100
        });
      }
      
      // Initialize database if needed
      if (!dbInitialized) {
        await initializeDatabase();
        dbInitialized = true;
      }
      
      const [postCount] = await sql`SELECT COUNT(*) as count FROM posts`;
      const [threadCount] = await sql`SELECT COUNT(*) as count FROM threads`;
      
      res.status(200).json({
        totalPosts: parseInt(postCount.count),
        activeThreads: parseInt(threadCount.count),
        onlineUsers: Math.floor(Math.random() * 500) + 100
      });
    } catch (error) {
      console.error('Database error:', error);
      res.status(200).json({
        totalPosts: 0,
        activeThreads: 0,
        onlineUsers: Math.floor(Math.random() * 500) + 100
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}