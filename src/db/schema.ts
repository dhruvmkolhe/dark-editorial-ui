import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const entries = sqliteTable("entries", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}`)),
  name: text("name"),
  message: text("message").notNull(),
  echoes: integer("echoes").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type Entry = typeof entries.$inferSelect;
