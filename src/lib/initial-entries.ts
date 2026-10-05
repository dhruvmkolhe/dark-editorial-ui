import type { Entry } from "@/db/schema";

export const initialEntries: Entry[] = [
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
];
