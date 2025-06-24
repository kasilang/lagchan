import { neon } from '@neondatabase/serverless';

let db;

export function getDb() {
  if (!db && process.env.DATABASE_URL) {
    try {
      // Handle both postgres:// and postgresql:// URLs
      const url = process.env.DATABASE_URL.replace(/^postgres:/, 'postgresql:');
      db = neon(url);
    } catch (error) {
      console.error('Failed to initialize database:', error);
      return null;
    }
  }
  return db;
}

export async function initializeDatabase() {
  const sql = getDb();
  if (!sql) return false;
  
  try {
    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS boards (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS threads (
        id SERIAL PRIMARY KEY,
        board_id INTEGER NOT NULL,
        subject TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        last_bump_at TIMESTAMP DEFAULT NOW() NOT NULL,
        is_sticky BOOLEAN DEFAULT FALSE,
        is_locked BOOLEAN DEFAULT FALSE
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        thread_id INTEGER NOT NULL,
        board_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        image_name TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    
    // Insert seed data
    await sql`
      INSERT INTO boards (slug, name, description, category) VALUES
      ('gen', 'General', 'General Discussions', 'Random'),
      ('memes', 'Memes', 'Memes & Shitposting', 'Random'),
      ('pol', 'Politics', 'Politics (Proceed with Caution)', 'Random'),
      ('coal', 'Coal', 'Coal Posts', 'Random'),
      ('gem', 'Gem', 'Gem Posts', 'Random'),
      ('ph', 'Philippines', 'Philippines', 'Random'),
      ('green', 'Green-Text', 'Green-Text Stories', 'Random'),
      ('deb', 'Debates', 'Debates', 'Random'),
      ('hot', 'Hot Takes', 'Hot Takes', 'Random'),
      ('schizo', 'Schizoposting', 'Schizoposting', 'Random'),
      ('marx', 'Marxism-Leninism', 'Marxism-Leninism', 'Communism'),
      ('np', 'NPA/CPP', 'NPA/CPP', 'Communism'),
      ('phys', 'Physics', 'Physics', 'Hobby'),
      ('math', 'Math', 'Math', 'Hobby'),
      ('it', 'IT', 'IT', 'Hobby'),
      ('cap', 'Capitalism', 'Inhumanities of Capitalism', 'Brain-rots'),
      ('ana', 'Anarchist', 'Anarchist Brain-rot', 'Brain-rots'),
      ('lib', 'Liberal', 'Liberal Brain-rot', 'Brain-rots'),
      ('theism', 'Theist', 'Theist Brain-rot', 'Brain-rots'),
      ('west', 'Western', 'Western Brain-rot', 'Brain-rots'),
      ('maga', 'MAGA', 'MAGA Brain-rot', 'Brain-rots')
      ON CONFLICT (slug) DO NOTHING
    `;
    
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}