import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../../server/storage';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for image uploads
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  dest: uploadsDir,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      const board = await storage.getBoardBySlug(slug as string);
      if (!board) {
        return res.status(404).json({ error: "Board not found" });
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const threads = await storage.getThreadsByBoard(board.id, page, limit);
      res.status(200).json(threads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch threads" });
    }
  } else if (req.method === 'POST') {
    try {
      await runMiddleware(req, res, upload.single('image'));
      
      const board = await storage.getBoardBySlug(slug as string);
      if (!board) {
        return res.status(404).json({ error: "Board not found" });
      }

      const { subject, content } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      // Create thread
      const thread = await storage.createThread({
        boardId: board.id,
        subject: subject || null,
        isSticky: false,
        isLocked: false,
      });

      // Create first post
      let imageUrl = null;
      let imageName = null;
      
      if ((req as any).file) {
        const file = (req as any).file;
        const ext = path.extname(file.originalname);
        const newFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
        const newPath = path.join(uploadsDir, newFileName);
        
        fs.renameSync(file.path, newPath);
        imageUrl = `/uploads/${newFileName}`;
        imageName = file.originalname;
      }

      const post = await storage.createPost({
        threadId: thread.id,
        boardId: board.id,
        content,
        imageUrl,
        imageName,
      });

      res.status(200).json({ thread, post });
    } catch (error) {
      console.error('Error creating thread:', error);
      res.status(500).json({ error: "Failed to create thread" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};