import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const threadId = parseInt(id as string);
      const thread = await storage.getThread(threadId);
      
      if (!thread) {
        return res.status(404).json({ error: "Thread not found" });
      }
      
      res.status(200).json(thread);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch thread" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}