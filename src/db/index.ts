import Database from "better-sqlite3";
import { count, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "path";
import * as schema from "./schema";

const dbPath = process.env.DATABASE_URL || path.join(process.cwd(), "sqlite.db");

const globalForDb = globalThis as typeof globalThis & {
  __sqliteDatabase?: Database.Database;
};

const sqlite =
  globalForDb.__sqliteDatabase ??
  new Database(dbPath);

if (process.env.NODE_ENV !== "production") {
  globalForDb.__sqliteDatabase = sqlite;
}

// Ensure SQLite table schema exists automatically
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS entries (
    id TEXT PRIMARY KEY,
    name TEXT,
    message TEXT NOT NULL,
    echoes INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );
`);

export const db = drizzle(sqlite, { schema });

// Seed initial demo data if database is empty
try {
  const [{ value: entryCount }] = db.select({ value: count() }).from(schema.entries).all();
  if (entryCount === 0) {
    db.insert(schema.entries)
      .values([
        {
          id: "e1010101-1111-4111-a111-111111111111",
          name: "Elena R.",
          message: "The stars don't care if we understand them.",
          echoes: 12,
          createdAt: new Date(Date.now() - 3600000 * 2),
        },
        {
          id: "e2020202-2222-4222-a222-222222222222",
          name: null,
          message: "We build digital sanctuaries for analog thoughts.",
          echoes: 29,
          createdAt: new Date(Date.now() - 3600000 * 5),
        },
        {
          id: "e3030303-3333-4333-a333-333333333333",
          name: "Kaelen",
          message: "Silence is just noise that hasn't found its rhythm yet.",
          echoes: 44,
          createdAt: new Date(Date.now() - 3600000 * 12),
        },
        {
          id: "e4040404-4444-4444-a444-444444444444",
          name: "A. Vance",
          message: "Code is poetry written in constraints.",
          echoes: 18,
          createdAt: new Date(Date.now() - 3600000 * 24),
        },
        {
          id: "e5050505-5555-4555-a555-555555555555",
          name: null,
          message: "Leave the door cracked; light belongs to everyone.",
          echoes: 31,
          createdAt: new Date(Date.now() - 3600000 * 36),
        },
      ])
      .run();
  }
} catch (err) {
  console.error("Failed to seed initial SQLite data:", err);
}
