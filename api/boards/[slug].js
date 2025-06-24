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
  
  console.log(`Board lookup for slug: ${slug}`);
  
  if (req.method === 'GET') {
    const board = boards.find(b => b.slug === slug);
    console.log(`Found board:`, board);
    
    if (!board) {
      console.log(`Board not found for slug: ${slug}`);
      return res.status(404).json({ error: `Board '${slug}' not found` });
    }
    
    res.status(200).json(board);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}