import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertThreadSchema, insertPostSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

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

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded images
  app.use('/uploads', (req, res, next) => {
    const filePath = path.join(uploadsDir, req.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found');
    }
  });

  // Get all boards
  app.get("/api/boards", async (req, res) => {
    try {
      const boards = await storage.getBoards();
      res.json(boards);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch boards" });
    }
  });

  // Get board by slug
  app.get("/api/boards/:slug", async (req, res) => {
    try {
      const board = await storage.getBoardBySlug(req.params.slug);
      if (!board) {
        return res.status(404).json({ error: "Board not found" });
      }
      res.json(board);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch board" });
    }
  });

  // Get threads for a board
  app.get("/api/boards/:slug/threads", async (req, res) => {
    try {
      const board = await storage.getBoardBySlug(req.params.slug);
      if (!board) {
        return res.status(404).json({ error: "Board not found" });
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const threads = await storage.getThreadsByBoard(board.id, page, limit);
      res.json(threads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch threads" });
    }
  });

  // Create new thread
  app.post("/api/boards/:slug/threads", upload.single('image'), async (req, res) => {
    try {
      const board = await storage.getBoardBySlug(req.params.slug);
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
      
      if (req.file) {
        const ext = path.extname(req.file.originalname);
        const newFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
        const newPath = path.join(uploadsDir, newFileName);
        
        fs.renameSync(req.file.path, newPath);
        imageUrl = `/uploads/${newFileName}`;
        imageName = req.file.originalname;
      }

      const post = await storage.createPost({
        threadId: thread.id,
        boardId: board.id,
        content,
        imageUrl,
        imageName,
      });

      res.json({ thread, post });
    } catch (error) {
      console.error('Error creating thread:', error);
      res.status(500).json({ error: "Failed to create thread" });
    }
  });

  // Get thread with posts
  app.get("/api/threads/:id", async (req, res) => {
    try {
      const threadId = parseInt(req.params.id);
      const thread = await storage.getThread(threadId);
      
      if (!thread) {
        return res.status(404).json({ error: "Thread not found" });
      }
      
      res.json(thread);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch thread" });
    }
  });

  // Create new post in thread
  app.post("/api/threads/:id/posts", upload.single('image'), async (req, res) => {
    try {
      const threadId = parseInt(req.params.id);
      const thread = await storage.getThread(threadId);
      
      if (!thread) {
        return res.status(404).json({ error: "Thread not found" });
      }

      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      let imageUrl = null;
      let imageName = null;
      
      if (req.file) {
        const ext = path.extname(req.file.originalname);
        const newFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
        const newPath = path.join(uploadsDir, newFileName);
        
        fs.renameSync(req.file.path, newPath);
        imageUrl = `/uploads/${newFileName}`;
        imageName = req.file.originalname;
      }

      const post = await storage.createPost({
        threadId,
        boardId: thread.boardId,
        content,
        imageUrl,
        imageName,
      });

      res.json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  // Get latest posts
  app.get("/api/posts/latest", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const posts = await storage.getLatestPosts(limit);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest posts" });
    }
  });

  // Get site stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getBoardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
