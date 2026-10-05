"use server";

import { db } from "@/db";
import { entries } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type ComposeState = {
  ok: boolean;
  message: string;
} | null;

const MAX_MESSAGE = 140;
const MAX_NAME = 40;

export async function addEntry(_prev: ComposeState, formData: FormData): Promise<ComposeState> {
  const message = (formData.get("message") ?? "").toString().trim().replace(/\s+/g, " ");
  const name = (formData.get("name") ?? "").toString().trim().replace(/\s+/g, " ").slice(0, MAX_NAME);

  if (!message) {
    return { ok: false, message: "Write something first — silence is already everywhere." };
  }
  if (message.length > MAX_MESSAGE) {
    return { ok: false, message: `Keep it under ${MAX_MESSAGE} characters. A line, not a letter.` };
  }

  await db.insert(entries).values({ message, name: name || null });

  revalidatePath("/");
  return { ok: true, message: "It's on the wall now. It stays." };
}

export async function echoEntry(id: string): Promise<void> {
  if (!id) return;
  await db
    .update(entries)
    .set({ echoes: sql`${entries.echoes} + 1` })
    .where(eq(entries.id, id));
  revalidatePath("/");
}
