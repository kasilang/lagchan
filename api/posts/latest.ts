import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const posts = await storage.getLatestPosts(limit);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest posts" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}