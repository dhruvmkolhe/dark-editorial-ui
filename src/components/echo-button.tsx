"use client";

import { AudioLines } from "lucide-react";
import { useState } from "react";

export function EchoButton({
  id,
  count,
  onEchoChange,
}: {
  id: string;
  count: number;
  onEchoChange?: (id: string, isEchoed: boolean) => void;
}) {
  const [echoed, setEchoed] = useState(false);

  const handleClick = () => {
    const nextState = !echoed;
    setEchoed(nextState);
    if (onEchoChange) {
      onEchoChange(id, nextState);
    }
  };

  const displayCount = onEchoChange ? count : count + (echoed ? 1 : 0);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group/echo inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] transition-all duration-300 ${
        echoed
          ? "border-ember/60 bg-ember/10 text-ember shadow-[0_0_15px_rgba(255,90,29,0.2)]"
          : "border-line text-fog hover:border-ember/50 hover:text-ember"
      }`}
      aria-label={echoed ? "Take back your echo" : "Echo this line"}
      title={echoed ? "Click to take back your echo" : "Click to echo"}
    >
      <AudioLines
        size={12}
        className={echoed ? "animate-pulse text-ember" : "transition-transform duration-300 group-hover/echo:scale-110"}
      />
      <span className="tabular-nums">{displayCount}</span>
    </button>
  );
}
