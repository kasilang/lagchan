import { getDb, initializeDatabase } from './setup-db.js';

let dbInitialized = false;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    try {
      const sql = getDb();
      
      if (!sql) {
        console.log('No database connection, using fallback');
        return res.status(200).json([]);
      }
      
      // Initialize database if needed
      if (!dbInitialized) {
        await initializeDatabase();
        dbInitialized = true;
      }
      
      const boards = await sql`SELECT * FROM boards ORDER BY id`;
      res.status(200).json(boards);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}