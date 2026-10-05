import { EchoButton } from "@/components/echo-button";
import { Reveal } from "@/components/reveal";
import type { Entry } from "@/db/schema";
import { timeAgo } from "@/lib/time";

export function WallCard({
  entry,
  index,
  onEchoChange,
}: {
  entry: Entry;
  index: number;
  onEchoChange?: (id: string, isEchoed: boolean) => void;
}) {
  const featured = index % 7 === 3;

  return (
    <Reveal delay={(index % 3) * 90} className="mb-4 break-inside-avoid">
      <article
        className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-500 md:p-7 ${
          featured
            ? "border-ember/40 bg-gradient-to-br from-ember/[0.09] to-card hover:border-ember/80"
            : "border-line bg-card hover:border-fog/50"
        } hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]`}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-4 -top-7 font-display text-[7rem] leading-none italic select-none transition-colors duration-500 ${
            featured ? "text-ember/15 group-hover:text-ember/25" : "text-bone/[0.05] group-hover:text-bone/[0.09]"
          }`}
        >
          &rdquo;
        </span>

        <p className={`relative font-display leading-snug text-balance ${featured ? "text-[1.65rem] md:text-[1.8rem]" : "text-xl md:text-[1.35rem]"} ${featured ? "italic" : ""}`}>
          {entry.message}
        </p>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className={`inline-block size-1.5 rounded-full ${featured ? "bg-ember" : "bg-fog/60"}`}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
              {entry.name ?? "Anonymous"} · {timeAgo(entry.createdAt)}
            </span>
          </div>
          <EchoButton id={entry.id} count={entry.echoes} onEchoChange={onEchoChange} />
        </footer>
      </article>
    </Reveal>
  );
}
