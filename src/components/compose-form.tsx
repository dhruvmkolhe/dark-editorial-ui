"use client";

import { ArrowUpRight, Asterisk, LoaderCircle } from "lucide-react";
import { useState } from "react";

const MAX = 140;

export function ComposeForm({ onAddEntry }: { onAddEntry?: (message: string, name: string) => void }) {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMsg = message.trim().replace(/\s+/g, " ");
    const trimmedName = name.trim().replace(/\s+/g, " ").slice(0, 40);

    if (!trimmedMsg) {
      setStatus({ ok: false, text: "Write something first — silence is already everywhere." });
      return;
    }
    if (trimmedMsg.length > MAX) {
      setStatus({ ok: false, text: `Keep it under ${MAX} characters. A line, not a letter.` });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (onAddEntry) {
        onAddEntry(trimmedMsg, trimmedName);
      }
      setMessage("");
      setName("");
      setCount(0);
      setStatus({ ok: true, text: "It's on the wall now. It stays." });
      setIsSubmitting(false);
    }, 250);
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="relative grow">
        <textarea
          name="message"
          value={message}
          required
          rows={5}
          maxLength={200}
          onChange={(e) => {
            setMessage(e.target.value);
            setCount(e.target.value.trim().length);
          }}
          placeholder="One line. That's all you get."
          className="h-full min-h-40 w-full resize-none bg-transparent font-display text-2xl leading-snug text-bone placeholder:text-fog/50 focus:outline-none md:text-[1.7rem]"
        />
      </div>

      <div className="mt-6 border-t border-line pt-6">
        <input
          type="text"
          name="name"
          value={name}
          maxLength={40}
          onChange={(e) => setName(e.target.value)}
          placeholder="A name, if you want. Or stay nobody."
          className="w-full bg-transparent font-mono text-xs tracking-[0.14em] text-bone/80 uppercase placeholder:text-fog/50 focus:outline-none"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em]">
          <Asterisk size={14} className={count > MAX ? "text-ember" : "text-fog"} />
          <span className={count > MAX ? "text-ember" : "text-fog"}>{count} / {MAX}</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-3 rounded-full bg-ember px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-bone hover:shadow-[0_0_40px_rgba(255,90,29,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              Pinning it up
              <LoaderCircle size={14} className="animate-spin" />
            </>
          ) : (
            <>
              Leave it on the wall
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </div>

      {status && (
        <p
          role="status"
          className={`mt-6 font-mono text-[11px] uppercase tracking-[0.2em] ${
            status.ok ? "text-bone" : "text-ember"
          }`}
        >
          {status.text}
        </p>
      )}
    </form>
  );
}
