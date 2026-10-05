import { InteractiveWall } from "@/components/interactive-wall";
import { db } from "@/db";
import { entries } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function HomePage() {
  const rows = await db.select().from(entries).orderBy(desc(entries.createdAt)).limit(60);

  return <InteractiveWall initialEntries={rows} />;
}
