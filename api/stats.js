export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    res.status(200).json({
      totalPosts: 0,
      activeThreads: 0,
      onlineUsers: Math.floor(Math.random() * 500) + 100
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}