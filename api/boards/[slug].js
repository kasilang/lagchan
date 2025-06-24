import { getDb, initializeDatabase } from '../setup-db.js';

// Initialize database on first request
let dbInitialized = false;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const { slug } = req.query;
  console.log(`Board lookup for slug: ${slug}`);
  
  if (req.method === 'GET') {
    try {
      const sql = getDb();
      
      if (!sql) {
        console.log('No database connection, using fallback');
        return res.status(404).json({ error: `Board '${slug}' not found` });
      }
      
      // Initialize database if needed
      if (!dbInitialized) {
        await initializeDatabase();
        dbInitialized = true;
      }
      
      const boards = await sql`SELECT * FROM boards WHERE slug = ${slug}`;
      const board = boards[0];
      
      console.log(`Found board:`, board);
      
      if (!board) {
        console.log(`Board not found for slug: ${slug}`);
        return res.status(404).json({ error: `Board '${slug}' not found` });
      }
      
      res.status(200).json(board);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}