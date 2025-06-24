export const boardCategories = {
  "Popular": [
    { slug: "chat", name: "Chat", description: "Real-time Anonymous Chat" },
    { slug: "gen", name: "General", description: "General Discussions" },
    { slug: "memes", name: "Memes", description: "Memes & Shitposting" },
    { slug: "pol", name: "Politics", description: "Politics (Proceed with Caution)" },
  ],
  "Communism": [
    { slug: "marx", name: "Marxism", description: "Marxism-Leninism" },
    { slug: "nk", name: "North Korea", description: "North Korea (DPRK)" },
    { slug: "ch", name: "China", description: "China Discussion" },
    { slug: "ph", name: "Philippines", description: "Philippines" },
  ],
  "Academics": [
    { slug: "astro", name: "Astrophysics", description: "Astrophysics" },
    { slug: "qft", name: "Quantum Field Theory", description: "Quantum Field Theory" },
    { slug: "rel", name: "Relativity", description: "Theory of Relativity" },
    { slug: "st", name: "String Theory", description: "String Theory" },
    { slug: "mp", name: "Modern Physics", description: "Modern Physics" },
    { slug: "np", name: "Nuclear Physics", description: "Nuclear Physics" },
    { slug: "topo", name: "Topology", description: "Topology" },
    { slug: "calc", name: "Calculus", description: "Calculus" },
  ],
  "Technology": [
    { slug: "it", name: "IT", description: "Information Technology" },
    { slug: "ml", name: "Machine Learning", description: "Machine Learning" },
    { slug: "typ", name: "Typology", description: "Typology" },
  ],
  "Culture": [
    { slug: "lit", name: "Literature", description: "Literature" },
    { slug: "p", name: "Poetry", description: "Poetry" },
    { slug: "zoo", name: "Zoology", description: "Zoology" },
    { slug: "green", name: "Green-Text", description: "Green-Text Stories" },
    { slug: "pasta", name: "CopyPasta", description: "CopyPasta" },
    { slug: "lounge", name: "Orange Lounge", description: "Orange Lounge" },
    { slug: "neo", name: "Neo-Shibuya-Kei", description: "Neo-Shibuya-Kei" },
  ],
  "Brain-rots": [
    { slug: "cap", name: "Capitalism", description: "Inhumanities of Capitalism" },
    { slug: "lib", name: "Liberal", description: "Liberal Brain-rot" },
    { slug: "ana", name: "Anarchist", description: "Anarchist Brain-rot" },
    { slug: "theism", name: "Theist", description: "Theist Brain-rot" },
    { slug: "west", name: "Western", description: "Western Brain-rot" },
    { slug: "maga", name: "MAGA", description: "MAGA Brain-rot" },
  ],
  "Discussion": [
    { slug: "d", name: "Debates", description: "Debates" },
    { slug: "hot", name: "Hot Takes", description: "Hot Takes" },
    { slug: "q", name: "Q&A", description: "Questions & Answers" },
    { slug: "coal", name: "Coal", description: "Coal Posts" },
    { slug: "gem", name: "Gem", description: "Gem Posts" },
  ],
};

export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    "Popular": "🔥",
    "Communism": "☭",
    "Academics": "🎓", 
    "Technology": "💻",
    "Culture": "🎨",
    "Brain-rots": "🧠",
    "Discussion": "💬",
  };
  return icons[category] || "📂";
};
