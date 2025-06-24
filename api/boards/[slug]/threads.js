const boards = [
  { id: 1, slug: "gen", name: "General", description: "General Discussions", category: "Random" },
  { id: 2, slug: "memes", name: "Memes", description: "Memes & Shitposting", category: "Random" },
  { id: 3, slug: "pol", name: "Politics", description: "Politics (Proceed with Caution)", category: "Random" },
  { id: 4, slug: "coal", name: "Coal", description: "Coal Posts", category: "Random" },
  { id: 5, slug: "gem", name: "Gem", description: "Gem Posts", category: "Random" },
  { id: 6, slug: "ph", name: "Philippines", description: "Philippines", category: "Random" },
  { id: 7, slug: "green", name: "Green-Text", description: "Green-Text Stories", category: "Random" },
  { id: 8, slug: "deb", name: "Debates", description: "Debates", category: "Random" },
  { id: 9, slug: "hot", name: "Hot Takes", description: "Hot Takes", category: "Random" },
  { id: 10, slug: "schizo", name: "Schizoposting", description: "Schizoposting", category: "Random" },
  { id: 11, slug: "marx", name: "Marxism-Leninism", description: "Marxism-Leninism", category: "Communism" },
  { id: 12, slug: "np", name: "NPA/CPP", description: "NPA/CPP", category: "Communism" },
  { id: 13, slug: "phys", name: "Physics", description: "Physics", category: "Hobby" },
  { id: 14, slug: "math", name: "Math", description: "Math", category: "Hobby" },
  { id: 15, slug: "it", name: "IT", description: "IT", category: "Hobby" },
  { id: 16, slug: "cap", name: "Capitalism", description: "Inhumanities of Capitalism", category: "Brain-rots" },
  { id: 17, slug: "ana", name: "Anarchist", description: "Anarchist Brain-rot", category: "Brain-rots" },
  { id: 18, slug: "lib", name: "Liberal", description: "Liberal Brain-rot", category: "Brain-rots" },
  { id: 19, slug: "theism", name: "Theist", description: "Theist Brain-rot", category: "Brain-rots" },
  { id: 20, slug: "west", name: "Western", description: "Western Brain-rot", category: "Brain-rots" },
  { id: 21, slug: "maga", name: "MAGA", description: "MAGA Brain-rot", category: "Brain-rots" },
];

// Simple in-memory storage (resets with each deployment)
let threads = [];
let nextThreadId = 1;

export default function handler(req, res) {
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
  console.log(`Threads lookup for board slug: ${slug}`);
  
  const board = boards.find(b => b.slug === slug);
  console.log(`Found board for threads:`, board);
  
  if (!board) {
    console.log(`Board not found for threads slug: ${slug}`);
    return res.status(404).json({ error: `Board '${slug}' not found` });
  }
  
  if (req.method === 'GET') {
    const boardThreads = threads
      .filter(t => t.boardId === board.id)
      .sort((a, b) => new Date(b.lastBumpAt) - new Date(a.lastBumpAt));
    res.status(200).json(boardThreads);
  } else if (req.method === 'POST') {
    try {
      // Handle body parsing for Vercel
      let body = req.body;
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      
      const { subject, content } = body || {};
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }
      
      const now = new Date();
      const thread = {
        id: nextThreadId++,
        boardId: board.id,
        subject: subject || null,
        isSticky: false,
        isLocked: false,
        createdAt: now,
        lastBumpAt: now
      };
      
      threads.push(thread);
      
      const post = {
        id: nextThreadId * 1000, // Simple ID generation
        threadId: thread.id,
        boardId: board.id,
        content,
        imageUrl: null,
        imageName: null,
        createdAt: now
      };
      
      res.status(200).json({ thread, post });
    } catch (error) {
      console.error('Error creating thread:', error);
      res.status(500).json({ error: 'Failed to create thread' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}