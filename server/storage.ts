import { boards, threads, posts, type Board, type Thread, type Post, type InsertBoard, type InsertThread, type InsertPost, type ThreadWithPosts, type BoardWithStats } from "@shared/schema";

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
      // Popular
      { slug: "chat", name: "Chat", description: "Real-time Anonymous Chat", category: "Popular" },
      { slug: "gen", name: "General", description: "General Discussions", category: "Popular" },
      { slug: "memes", name: "Memes", description: "Memes & Shitposting", category: "Popular" },
      { slug: "pol", name: "Politics", description: "Politics (Proceed with Caution)", category: "Popular" },
      
      // Communism
      { slug: "marx", name: "Marxism", description: "Marxism-Leninism", category: "Communism" },
      { slug: "nk", name: "North Korea", description: "North Korea (DPRK)", category: "Communism" },
      { slug: "ch", name: "China", description: "China Discussion", category: "Communism" },
      { slug: "ph", name: "Philippines", description: "Philippines", category: "Communism" },
      
      // Academics
      { slug: "astro", name: "Astrophysics", description: "Astrophysics", category: "Academics" },
      { slug: "qft", name: "Quantum Field Theory", description: "Quantum Field Theory", category: "Academics" },
      { slug: "rel", name: "Relativity", description: "Theory of Relativity", category: "Academics" },
      { slug: "st", name: "String Theory", description: "String Theory", category: "Academics" },
      { slug: "mp", name: "Modern Physics", description: "Modern Physics", category: "Academics" },
      { slug: "np", name: "Nuclear Physics", description: "Nuclear Physics", category: "Academics" },
      { slug: "topo", name: "Topology", description: "Topology", category: "Academics" },
      { slug: "calc", name: "Calculus", description: "Calculus", category: "Academics" },
      
      // Technology
      { slug: "it", name: "IT", description: "Information Technology", category: "Technology" },
      { slug: "ml", name: "Machine Learning", description: "Machine Learning", category: "Technology" },
      { slug: "typ", name: "Typology", description: "Typology", category: "Technology" },
      
      // Culture & Misc
      { slug: "lit", name: "Literature", description: "Literature", category: "Culture" },
      { slug: "p", name: "Poetry", description: "Poetry", category: "Culture" },
      { slug: "zoo", name: "Zoology", description: "Zoology", category: "Culture" },
      { slug: "green", name: "Green-Text", description: "Green-Text Stories", category: "Culture" },
      { slug: "pasta", name: "CopyPasta", description: "CopyPasta", category: "Culture" },
      { slug: "lounge", name: "Orange Lounge", description: "Orange Lounge", category: "Culture" },
      { slug: "neo", name: "Neo-Shibuya-Kei", description: "Neo-Shibuya-Kei", category: "Culture" },
      
      // Brain-rots
      { slug: "cap", name: "Capitalism", description: "Inhumanities of Capitalism", category: "Brain-rots" },
      { slug: "lib", name: "Liberal", description: "Liberal Brain-rot", category: "Brain-rots" },
      { slug: "ana", name: "Anarchist", description: "Anarchist Brain-rot", category: "Brain-rots" },
      { slug: "theism", name: "Theist", description: "Theist Brain-rot", category: "Brain-rots" },
      { slug: "west", name: "Western", description: "Western Brain-rot", category: "Brain-rots" },
      { slug: "maga", name: "MAGA", description: "MAGA Brain-rot", category: "Brain-rots" },
      
      // Discussion
      { slug: "d", name: "Debates", description: "Debates", category: "Discussion" },
      { slug: "hot", name: "Hot Takes", description: "Hot Takes", category: "Discussion" },
      { slug: "q", name: "Q&A", description: "Questions & Answers", category: "Discussion" },
      { slug: "coal", name: "Coal", description: "Coal Posts", category: "Discussion" },
      { slug: "gem", name: "Gem", description: "Gem Posts", category: "Discussion" },
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
      ...insertThread,
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
      ...insertPost,
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

export const storage = new MemStorage();
