import { getDb, initializeDatabase } from '../setup-db.js';

let dbInitialized = false;

export default async function handler(req, res) {
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
  
  try {
    const sql = getDb();
    
    if (!sql) {
      console.log('No database connection');
      return res.status(500).json({ error: 'Database not available' });
    }
    
    // Initialize database if needed
    if (!dbInitialized) {
      await initializeDatabase();
      dbInitialized = true;
    }
    
    if (req.method === 'GET') {
      console.log(`Getting thread ${threadId}`);
      
      const threads = await sql`SELECT * FROM threads WHERE id = ${threadId}`;
      const thread = threads[0];
      
      if (!thread) {
        return res.status(404).json({ error: 'Thread not found' });
      }
      
      const posts = await sql`
        SELECT * FROM posts 
        WHERE thread_id = ${threadId}
        ORDER BY created_at ASC
      `;
      
      const result = {
        ...thread,
        posts: posts,
        postCount: posts.length
      };
      
      res.status(200).json(result);
    } else if (req.method === 'POST') {
      // Handle body parsing for Vercel
      let body = req.body;
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      
      const { content } = body || {};
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }
      
      // Verify thread exists
      const threads = await sql`SELECT * FROM threads WHERE id = ${threadId}`;
      const thread = threads[0];
      
      if (!thread) {
        return res.status(404).json({ error: 'Thread not found' });
      }
      
      // Create post
      const postResult = await sql`
        INSERT INTO posts (thread_id, board_id, content)
        VALUES (${threadId}, ${thread.board_id}, ${content})
        RETURNING *
      `;
      const post = postResult[0];
      
      // Update thread bump time
      await sql`
        UPDATE threads 
        SET last_bump_at = NOW()
        WHERE id = ${threadId}
      `;
      
      res.status(200).json(post);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
}