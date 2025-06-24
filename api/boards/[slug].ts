import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      const board = await storage.getBoardBySlug(slug as string);
      if (!board) {
        return res.status(404).json({ error: "Board not found" });
      }
      res.status(200).json(board);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch board" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}