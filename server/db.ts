import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

let pool: Pool | null = null;
let db: any = null;

export function initializeDatabase() {
  try {
    if (!process.env.DATABASE_URL) {
      console.log("DATABASE_URL not found, database features will be unavailable");
      return null;
    }

    pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 5000,
      max: 5
    });
    
    db = drizzle({ client: pool, schema });
    console.log("Database connection initialized");
    return db;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    return null;
  }
}

export { pool, db };