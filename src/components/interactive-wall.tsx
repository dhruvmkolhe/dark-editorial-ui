"use client";

import { ComposeForm } from "@/components/compose-form";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { WallCard } from "@/components/wall";
import type { Entry } from "@/db/schema";
import {
  ArrowDown,
  ArrowUpRight,
  Asterisk,
  EyeOff,
  Infinity as InfinityIcon,
  PenLine,
} from "lucide-react";
import { useEffect, useState } from "react";

const rules = [
  { icon: PenLine, text: "140 characters. A line, not a letter." },
  { icon: EyeOff, text: "Anonymous by default. Names optional." },
  { icon: InfinityIcon, text: "It stays. No edits, no take-backs." },
];

export function InteractiveWall({ initialEntries }: { initialEntries: Entry[] }) {
  const [entriesList, setEntriesList] = useState<Entry[]>(initialEntries);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("murmur_user_entries");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntriesList((prev) => {
            const existingIds = new Set(prev.map((e) => e.id));
            const newToAdd = parsed
              .filter((p: any) => !existingIds.has(p.id))
              .map((p: any) => ({ ...p, createdAt: new Date(p.createdAt) }));
            return [...newToAdd, ...prev];
          });
        }
      }
    } catch {
      // Fallback cleanly
    }
  }, []);

  const handleAddEntry = (message: string, name: string) => {
    const newEntry: Entry = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `local-${Date.now()}`,
      name: name || null,
      message,
      echoes: 0,
      createdAt: new Date(),
    };

    setEntriesList((prev) => [newEntry, ...prev]);

    try {
      const saved = localStorage.getItem("murmur_user_entries");
      const parsed = saved ? JSON.parse(saved) : [];
      localStorage.setItem("murmur_user_entries", JSON.stringify([newEntry, ...parsed]));
    } catch {
      // Local storage unavailable
    }
  };

  const handleEchoChange = (id: string, isEchoed: boolean) => {
    setEntriesList((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, echoes: Math.max(0, e.echoes + (isEchoed ? 1 : -1)) } : e
      )
    );
  };

  const total = entriesList.length;
  const totalEchoes = entriesList.reduce((acc, curr) => acc + curr.echoes, 0);
  const todayCount = entriesList.filter((e) => {
    const d = new Date(e.createdAt);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;

  return (
    <main className="relative">
      {/* ------------------------------ NAV ------------------------------ */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-ink/75 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="flex items-center gap-1.5 font-mono text-sm font-medium tracking-[0.3em] uppercase">
            <Asterisk size={17} className="text-ember" aria-hidden />
            Murmur
          </a>

          <div className="hidden items-center gap-9 font-mono text-[11px] uppercase tracking-[0.22em] text-fog md:flex">
            <a href="#wall" className="link-sweep transition-colors hover:text-bone">
              The wall
            </a>
            <a href="#compose" className="link-sweep transition-colors hover:text-bone">
              Leave a line
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] tracking-[0.2em] text-fog sm:inline-flex">
              <span className="size-1.5 animate-blink rounded-full bg-ember" aria-hidden />
              {total} lines kept
            </span>
            <a
              href="#compose"
              className="rounded-full bg-bone px-4.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ember"
            >
              Write
            </a>
          </div>
        </nav>
      </header>

      {/* ------------------------------ HERO ------------------------------ */}
      <section id="top" className="relative flex min-h-svh flex-col justify-between overflow-hidden px-5 pt-32 md:px-8 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto hidden max-w-7xl grid-cols-4 md:grid">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-l border-line/50 last:border-r" />
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-7xl">
          <p
            className="flex animate-rise items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-fog"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="size-1.5 animate-blink rounded-full bg-ember" aria-hidden />
            A living wall of one-liners — no accounts, no feeds, no followers
          </p>

          <h1 className="mt-8 font-display leading-[0.95] tracking-tight">
            <span className="block animate-rise text-[clamp(3.4rem,11vw,9.5rem)]" style={{ animationDelay: "0.18s" }}>
              Say it once.
            </span>
            <span
              className="block animate-rise text-[clamp(3.4rem,11vw,9.5rem)] italic text-ember"
              style={{ animationDelay: "0.34s" }}
            >
              Leave it on the wall.
            </span>
          </h1>

          <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <p
              className="max-w-md animate-rise text-base leading-relaxed text-fog md:text-lg"
              style={{ animationDelay: "0.5s" }}
            >
              Murmur keeps one line from everyone who passes through. No edits. No take-backs.
              Just a growing wall of strangers, one sentence at a time.
            </p>

            <div className="flex animate-rise flex-wrap items-center gap-4" style={{ animationDelay: "0.62s" }}>
              <a
                href="#compose"
                className="group inline-flex items-center gap-3 rounded-full bg-ember px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-bone hover:shadow-[0_0_44px_rgba(255,90,29,0.35)]"
              >
                Leave a line
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#wall"
                className="group inline-flex items-center gap-3 rounded-full border border-line px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone transition-colors duration-300 hover:border-ember hover:text-ember"
              >
                Read the wall
                <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-16 flex w-full max-w-7xl items-end justify-between pb-10">
          <div className="flex animate-rise items-center gap-4" style={{ animationDelay: "0.75s" }}>
            <span className="relative h-14 w-px overflow-hidden bg-line">
              <span className="absolute inset-0 animate-scroll-line bg-ember" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">Scroll</span>
          </div>

          <div className="animate-rise text-right" style={{ animationDelay: "0.85s" }}>
            <p className="font-display text-5xl leading-none tabular-nums md:text-7xl">{total}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
              lines and counting
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------- MARQUEE ---------------------------- */}
      {entriesList.length > 0 && <Marquee entries={entriesList} />}

      {/* ------------------------------ WALL ------------------------------ */}
      <section id="wall" className="relative scroll-mt-24 px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">01 · The wall</p>
              <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
                Every stranger gets <span className="italic text-ember">one line.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="max-w-xs text-sm leading-relaxed text-fog md:text-right">
                Newest at the top. Tap <span className="text-bone">echo</span> when a line hits —
                it resonates a little louder, forever.
              </p>
            </Reveal>
          </div>

          <div className="mt-14">
            {entriesList.length === 0 ? (
              <Reveal>
                <a
                  href="#compose"
                  className="group flex flex-col items-center gap-5 rounded-3xl border border-dashed border-line px-8 py-24 text-center transition-colors duration-500 hover:border-ember/60"
                >
                  <Asterisk size={32} className="text-ember transition-transform duration-500 group-hover:rotate-90" />
                  <p className="font-display text-3xl italic md:text-4xl">The wall is blank.</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fog">
                    Be the first voice — leave a line
                  </p>
                </a>
              </Reveal>
            ) : (
              <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                {entriesList.map((entry, index) => (
                  <WallCard key={entry.id} entry={entry} index={index} onEchoChange={handleEchoChange} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ----------------------------- STATS ----------------------------- */}
      <section className="border-y border-line bg-coal/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { label: "Lines penned", value: total },
            { label: "Echoes given", value: totalEchoes },
            { label: "Arrived today", value: todayCount },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 110} className="px-6 py-12 text-center md:py-16">
              <p className="font-display text-5xl tabular-nums md:text-6xl">{stat.value}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-fog">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------- COMPOSE ----------------------------- */}
      <section id="compose" className="relative scroll-mt-24 px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">02 · Leave a line</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
                Add your voice <br className="hidden md:block" />
                <span className="italic text-ember">to the noise.</span>
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-8 max-w-md leading-relaxed text-fog">
                Three rules keep the wall honest. Read them once, then say the truest thing you can
                fit in a single breath.
              </p>
            </Reveal>

            <ul className="mt-10 space-y-5">
              {rules.map((rule, i) => (
                <Reveal key={rule.text} delay={200 + i * 110}>
                  <li className="flex items-center gap-4 border-b border-line pb-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ember">
                      <rule.icon size={15} />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-bone/85">
                      {rule.text}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={160} className="lg:pt-14">
            <div className="relative h-full rounded-3xl border border-line bg-card p-7 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] md:p-10">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 right-8 font-display text-8xl italic text-ember/25 select-none"
              >
                &rdquo;
              </span>
              <ComposeForm onAddEntry={handleAddEntry} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------- FOOTER ----------------------------- */}
      <footer className="relative overflow-hidden border-t border-line">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8">
          <p
            aria-hidden
            className="text-outline pointer-events-none select-none text-center font-display text-[clamp(4rem,17vw,15rem)] leading-none tracking-tight"
          >
            MURMUR
          </p>

          <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-line pt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-fog md:flex-row">
            <span className="inline-flex items-center gap-2">
              <Asterisk size={13} className="text-ember" aria-hidden />
              Murmur — owned by no one
            </span>
            <a href="#top" className="link-sweep transition-colors hover:text-bone">
              Back to the top
            </a>
            <span>Next.js · React · Static Gallery</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
