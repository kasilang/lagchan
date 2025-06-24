import { getDb, initializeDatabase } from '../setup-db.js';

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
        return res.status(200).json([]);
      }
      
      // Initialize database if needed
      if (!dbInitialized) {
        await initializeDatabase();
        dbInitialized = true;
      }
      
      const limit = parseInt(req.query.limit) || 10;
      
      const posts = await sql`
        SELECT p.*, b.slug as board_slug
        FROM posts p
        JOIN boards b ON p.board_id = b.id
        ORDER BY p.created_at DESC
        LIMIT ${limit}
      `;
      
      res.status(200).json(posts.map(post => ({
        ...post,
        boardSlug: post.board_slug
      })));
    } catch (error) {
      console.error('Database error:', error);
      res.status(200).json([]);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}