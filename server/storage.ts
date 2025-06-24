import { boards, threads, posts, type Board, type Thread, type Post, type InsertBoard, type InsertThread, type InsertPost, type ThreadWithPosts, type BoardWithStats } from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // Boards
  getBoards(): Promise<Board[]>;
  getBoardBySlug(slug: string): Promise<Board | undefined>;
  createBoard(board: InsertBoard): Promise<Board>;
  
  // Threads
  getThreadsByBoard(boardId: number, page?: number, limit?: number): Promise<Thread[]>;
  getThread(id: number): Promise<ThreadWithPosts | undefined>;
  createThread(thread: InsertThread): Promise<Thread>;
  bumpThread(threadId: number): Promise<void>;
  
  // Posts
  getPostsByThread(threadId: number): Promise<Post[]>;
  getLatestPosts(limit?: number): Promise<(Post & { boardSlug: string })[]>;
  createPost(post: InsertPost): Promise<Post>;
  
  // Stats
  getBoardStats(): Promise<{ totalPosts: number; activeThreads: number; onlineUsers: number }>;
}

export class MemStorage implements IStorage {
  private boards: Map<number, Board> = new Map();
  private threads: Map<number, Thread> = new Map();
  private posts: Map<number, Post> = new Map();
  private currentBoardId = 1;
  private currentThreadId = 1;
  private currentPostId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Create boards based on the specification
    const boardData = [
      // Popular (nav bar boards)
      { slug: "gen", name: "General", description: "General Discussions", category: "Random" },
      { slug: "memes", name: "Memes", description: "Memes & Shitposting", category: "Random" },
      { slug: "pol", name: "Politics", description: "Politics (Proceed with Caution)", category: "Random" },
      { slug: "coal", name: "Coal", description: "Coal Posts", category: "Random" },
      { slug: "gem", name: "Gem", description: "Gem Posts", category: "Random" },
      
      // Random
      { slug: "ph", name: "Philippines", description: "Philippines", category: "Random" },
      { slug: "green", name: "Green-Text", description: "Green-Text Stories", category: "Random" },
      { slug: "deb", name: "Debates", description: "Debates", category: "Random" },
      { slug: "hot", name: "Hot Takes", description: "Hot Takes", category: "Random" },
      { slug: "schizo", name: "Schizoposting", description: "Schizoposting", category: "Random" },
      
      // Communism
      { slug: "marx", name: "Marxism-Leninism", description: "Marxism-Leninism", category: "Communism" },
      { slug: "np", name: "NPA/CPP", description: "NPA/CPP", category: "Communism" },
      
      // Hobby
      { slug: "phys", name: "Physics", description: "Physics", category: "Hobby" },
      { slug: "math", name: "Math", description: "Math", category: "Hobby" },
      { slug: "it", name: "IT", description: "IT", category: "Hobby" },
      
      // Brain-rots
      { slug: "cap", name: "Capitalism", description: "Inhumanities of Capitalism", category: "Brain-rots" },
      { slug: "ana", name: "Anarchist", description: "Anarchist Brain-rot", category: "Brain-rots" },
      { slug: "lib", name: "Liberal", description: "Liberal Brain-rot", category: "Brain-rots" },
      { slug: "theism", name: "Theist", description: "Theist Brain-rot", category: "Brain-rots" },
      { slug: "west", name: "Western", description: "Western Brain-rot", category: "Brain-rots" },
      { slug: "maga", name: "MAGA", description: "MAGA Brain-rot", category: "Brain-rots" },
    ];

    boardData.forEach(boardInfo => {
      const board: Board = {
        id: this.currentBoardId++,
        slug: boardInfo.slug,
        name: boardInfo.name,
        description: boardInfo.description,
        category: boardInfo.category,
      };
      this.boards.set(board.id, board);
    });
  }

  async getBoards(): Promise<Board[]> {
    return Array.from(this.boards.values());
  }

  async getBoardBySlug(slug: string): Promise<Board | undefined> {
    return Array.from(this.boards.values()).find(board => board.slug === slug);
  }

  async createBoard(insertBoard: InsertBoard): Promise<Board> {
    const board: Board = {
      id: this.currentBoardId++,
      ...insertBoard,
    };
    this.boards.set(board.id, board);
    return board;
  }

  async getThreadsByBoard(boardId: number, page = 1, limit = 10): Promise<Thread[]> {
    const threads = Array.from(this.threads.values())
      .filter(thread => thread.boardId === boardId)
      .sort((a, b) => new Date(b.lastBumpAt).getTime() - new Date(a.lastBumpAt).getTime())
      .slice((page - 1) * limit, page * limit);
    return threads;
  }

  async getThread(id: number): Promise<ThreadWithPosts | undefined> {
    const thread = this.threads.get(id);
    if (!thread) return undefined;

    const threadPosts = Array.from(this.posts.values())
      .filter(post => post.threadId === id)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return {
      ...thread,
      posts: threadPosts,
      postCount: threadPosts.length,
    };
  }

  async createThread(insertThread: InsertThread): Promise<Thread> {
    const now = new Date();
    const thread: Thread = {
      id: this.currentThreadId++,
      boardId: insertThread.boardId,
      subject: insertThread.subject || null,
      isSticky: insertThread.isSticky || false,
      isLocked: insertThread.isLocked || false,
      createdAt: now,
      lastBumpAt: now,
    };
    this.threads.set(thread.id, thread);
    return thread;
  }

  async bumpThread(threadId: number): Promise<void> {
    const thread = this.threads.get(threadId);
    if (thread) {
      thread.lastBumpAt = new Date();
      this.threads.set(threadId, thread);
    }
  }

  async getPostsByThread(threadId: number): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.threadId === threadId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async getLatestPosts(limit = 10): Promise<(Post & { boardSlug: string })[]> {
    const latestPosts = Array.from(this.posts.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);

    return latestPosts.map(post => {
      const board = Array.from(this.boards.values()).find(b => b.id === post.boardId);
      return {
        ...post,
        boardSlug: board?.slug || 'unknown',
      };
    });
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const post: Post = {
      id: this.currentPostId++,
      threadId: insertPost.threadId,
      boardId: insertPost.boardId,
      content: insertPost.content,
      imageUrl: insertPost.imageUrl || null,
      imageName: insertPost.imageName || null,
      createdAt: new Date(),
    };
    this.posts.set(post.id, post);
    
    // Bump the thread
    await this.bumpThread(post.threadId);
    
    return post;
  }

  async getBoardStats(): Promise<{ totalPosts: number; activeThreads: number; onlineUsers: number }> {
    return {
      totalPosts: this.posts.size,
      activeThreads: this.threads.size,
      onlineUsers: Math.floor(Math.random() * 500) + 100, // Simulated online users
    };
  }
}

export class DatabaseStorage implements IStorage {
  async getBoards(): Promise<Board[]> {
    return await db.select().from(boards).orderBy(boards.id);
  }

  async getBoardBySlug(slug: string): Promise<Board | undefined> {
    const [board] = await db.select().from(boards).where(eq(boards.slug, slug));
    return board || undefined;
  }

  async createBoard(insertBoard: InsertBoard): Promise<Board> {
    const [board] = await db
      .insert(boards)
      .values(insertBoard)
      .returning();
    return board;
  }

  async getThreadsByBoard(boardId: number, page = 1, limit = 10): Promise<Thread[]> {
    const offset = (page - 1) * limit;
    return await db
      .select()
      .from(threads)
      .where(eq(threads.boardId, boardId))
      .orderBy(desc(threads.lastBumpAt))
      .limit(limit)
      .offset(offset);
  }

  async getThread(id: number): Promise<ThreadWithPosts | undefined> {
    const [thread] = await db.select().from(threads).where(eq(threads.id, id));
    if (!thread) return undefined;

    const threadPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.threadId, id))
      .orderBy(posts.createdAt);

    return {
      ...thread,
      posts: threadPosts,
      postCount: threadPosts.length,
    };
  }

  async createThread(insertThread: InsertThread): Promise<Thread> {
    const [thread] = await db
      .insert(threads)
      .values(insertThread)
      .returning();
    return thread;
  }

  async bumpThread(threadId: number): Promise<void> {
    await db
      .update(threads)
      .set({ lastBumpAt: new Date() })
      .where(eq(threads.id, threadId));
  }

  async getPostsByThread(threadId: number): Promise<Post[]> {
    return await db
      .select()
      .from(posts)
      .where(eq(posts.threadId, threadId))
      .orderBy(posts.createdAt);
  }

  async getLatestPosts(limit = 10): Promise<(Post & { boardSlug: string })[]> {
    const latestPosts = await db
      .select({
        id: posts.id,
        threadId: posts.threadId,
        boardId: posts.boardId,
        content: posts.content,
        imageUrl: posts.imageUrl,
        imageName: posts.imageName,
        createdAt: posts.createdAt,
        boardSlug: boards.slug,
      })
      .from(posts)
      .innerJoin(boards, eq(posts.boardId, boards.id))
      .orderBy(desc(posts.createdAt))
      .limit(limit);

    return latestPosts;
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db
      .insert(posts)
      .values(insertPost)
      .returning();
    
    // Bump the thread
    await this.bumpThread(post.threadId);
    
    return post;
  }

  async getBoardStats(): Promise<{ totalPosts: number; activeThreads: number; onlineUsers: number }> {
    const [postCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(posts);
    
    const [threadCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(threads);

    return {
      totalPosts: Number(postCount.count),
      activeThreads: Number(threadCount.count),
      onlineUsers: Math.floor(Math.random() * 500) + 100, // Simulated online users
    };
  }

  async seedInitialData(): Promise<void> {
    // Check if boards already exist
    const existingBoards = await this.getBoards();
    if (existingBoards.length > 0) {
      return; // Data already seeded
    }

    // Create boards based on the specification
    const boardData = [
      // Popular (nav bar boards)
      { slug: "gen", name: "General", description: "General Discussions", category: "Random" },
      { slug: "memes", name: "Memes", description: "Memes & Shitposting", category: "Random" },
      { slug: "pol", name: "Politics", description: "Politics (Proceed with Caution)", category: "Random" },
      { slug: "coal", name: "Coal", description: "Coal Posts", category: "Random" },
      { slug: "gem", name: "Gem", description: "Gem Posts", category: "Random" },
      
      // Random
      { slug: "ph", name: "Philippines", description: "Philippines", category: "Random" },
      { slug: "green", name: "Green-Text", description: "Green-Text Stories", category: "Random" },
      { slug: "deb", name: "Debates", description: "Debates", category: "Random" },
      { slug: "hot", name: "Hot Takes", description: "Hot Takes", category: "Random" },
      { slug: "schizo", name: "Schizoposting", description: "Schizoposting", category: "Random" },
      
      // Communism
      { slug: "marx", name: "Marxism-Leninism", description: "Marxism-Leninism", category: "Communism" },
      { slug: "np", name: "NPA/CPP", description: "NPA/CPP", category: "Communism" },
      
      // Hobby
      { slug: "phys", name: "Physics", description: "Physics", category: "Hobby" },
      { slug: "math", name: "Math", description: "Math", category: "Hobby" },
      { slug: "it", name: "IT", description: "IT", category: "Hobby" },
      
      // Brain-rots
      { slug: "cap", name: "Capitalism", description: "Inhumanities of Capitalism", category: "Brain-rots" },
      { slug: "ana", name: "Anarchist", description: "Anarchist Brain-rot", category: "Brain-rots" },
      { slug: "lib", name: "Liberal", description: "Liberal Brain-rot", category: "Brain-rots" },
      { slug: "theism", name: "Theist", description: "Theist Brain-rot", category: "Brain-rots" },
      { slug: "west", name: "Western", description: "Western Brain-rot", category: "Brain-rots" },
      { slug: "maga", name: "MAGA", description: "MAGA Brain-rot", category: "Brain-rots" },
    ];

    for (const boardInfo of boardData) {
      await this.createBoard(boardInfo);
    }
  }
}

export const storage = new DatabaseStorage();
