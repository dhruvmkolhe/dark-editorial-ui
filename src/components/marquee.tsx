import type { Entry } from "@/db/schema";
import { Asterisk } from "lucide-react";

export function Marquee({ entries }: { entries: Entry[] }) {
  const items = entries.slice(0, 10);

  const row = (
    <>
      {items.map((entry) => (
        <span key={entry.id} className="mx-6 inline-flex items-center gap-6 whitespace-nowrap">
          <span className="font-display text-lg italic text-bone/85 md:text-xl">{entry.message}</span>
          <Asterisk size={16} className="shrink-0 text-ember" aria-hidden />
        </span>
      ))}
    </>
  );

  return (
    <div className="relative overflow-hidden border-y border-line bg-coal/80 py-5" aria-hidden>
      <div className="flex w-max animate-marquee">
        <div className="flex items-center">{row}</div>
        <div className="flex items-center">{row}</div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
