"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useKeptLines } from "../hooks/useKeptLines";

interface KeepableLinesProps {
  poemId: string;
  poemTitle: string;
  lines: string[];
  /** delay before the first line begins, seconds */
  delay?: number;
  /** time between successive lines, seconds */
  stagger?: number;
  /** classes applied to the wrapper around the lines */
  className?: string;
  /** classes applied to the typographic span inside each line */
  lineClassName?: string;
  /** an as-of key — when it changes, the reveal restarts (e.g. poem id) */
  resetKey?: string;
}

/**
 * Hero poem lines that are quietly keepable. Same staggered reveal as
 * RevealLines, plus:
 *   - hover hairline under each line
 *   - tap/Enter/Space to toggle "kept" state (persisted via useKeptLines)
 *   - persistent marginalia tick on kept lines
 *   - faint "kept" / "released" toast below the poem (aria-live)
 */
export default function KeepableLines({
  poemId,
  poemTitle,
  lines,
  delay = 0.15,
  stagger = 0.09,
  className = "",
  lineClassName = "",
  resetKey,
}: KeepableLinesProps) {
  const reduced = useReducedMotion();
  const { isKept, toggle, hydrated } = useKeptLines();
  const [toast, setToast] = useState<"kept" | "released" | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  function handleToggle(line: string, index: number) {
    if (!line.trim()) return;
    const id = `${poemId}:${index}`;
    const result = toggle({ id, text: line, poemId, poemTitle });
    setToast(result);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1600);
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className={className}>
        {lines.map((line, i) => {
          const id = `${poemId}:${i}`;
          const kept = hydrated && isKept(id);
          const isBlank = !line.trim();
          return (
            <motion.span
              key={`${resetKey ?? poemId}-${i}`}
              initial={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: 12, filter: "blur(6px)" }
              }
              animate={
                reduced
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              transition={{
                duration: reduced ? 0.2 : 0.9,
                delay: reduced ? 0 : delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block relative"
            >
              {isBlank ? (
                <span className={lineClassName}>{"\u00A0"}</span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleToggle(line, i)}
                  aria-pressed={kept}
                  aria-label={
                    kept ? `release line: ${line}` : `keep line: ${line}`
                  }
                  className="group relative inline-block bg-transparent border-0 p-0 m-0 cursor-pointer text-inherit font-inherit leading-inherit focus:outline-none"
                >
                  {/* marginalia tick — appears when kept */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-1/2 -translate-y-1/2 -left-5 md:-left-6 text-ink/55 text-base md:text-lg leading-none transition-opacity duration-300 ${
                      kept ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {"\u00B7"}
                  </span>

                  <span
                    className={`${lineClassName} transition-colors duration-300 ${
                      kept ? "text-ink" : "text-ink/95"
                    }`}
                  >
                    {line}
                  </span>

                  {/* hover hairline */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left bg-ink/35 transition-transform duration-500 ease-out ${
                      kept
                        ? "scale-x-100 bg-ink/30"
                        : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    }`}
                  />
                </button>
              )}
            </motion.span>
          );
        })}
      </div>

      {/* quiet toast */}
      <div
        aria-live="polite"
        className="pointer-events-none absolute -bottom-12 left-0 right-0 flex justify-center h-6"
      >
        <AnimatePresence>
          {toast && (
            <motion.span
              key={`${toast}-${Date.now()}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-[11px] uppercase tracking-[0.28em] text-whisper"
            >
              {toast}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
