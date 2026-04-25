"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PoemReaderNavProps {
  /** absolute href to escape back to (e.g. "/stillness-archive/issue-01" or "/poets/priya-nair") */
  parentHref: string;
  /** absolute hrefs for prev / next poems, or null if not available */
  prevHref: string | null;
  nextHref: string | null;
  /** e.g. "3 / 10" */
  counter: string;
}

/**
 * Poem reader footer navigation + keyboard handlers.
 *
 * Keyboard:
 *   ← — previous poem
 *   → — next poem
 *   esc — back to the parent (edition or poet)
 */
export default function PoemReaderNav({
  parentHref,
  prevHref,
  nextHref,
  counter,
}: PoemReaderNavProps) {
  const router = useRouter();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      // ignore when user is typing in an input / textarea / content-editable
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowLeft" && prevHref) {
        router.push(prevHref);
      } else if (event.key === "ArrowRight" && nextHref) {
        router.push(nextHref);
      } else if (event.key === "Escape") {
        router.push(parentHref);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [parentHref, prevHref, nextHref, router]);

  const linkBase =
    "group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] transition-colors duration-300";
  const mutedBase =
    "inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-whisper/40";

  return (
    <nav
      aria-label="poem navigation"
      className="mt-16 md:mt-24 flex items-center justify-between gap-6 border-t border-ink/10 pt-8"
    >
      {prevHref ? (
        <Link href={prevHref} className={`${linkBase} text-whisper hover:text-ink`}>
          <ArrowLeft
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          previous
        </Link>
      ) : (
        <span className={mutedBase} aria-hidden="true">
          <ArrowLeft size={14} strokeWidth={1.5} />
          previous
        </span>
      )}

      <span className="text-[11px] uppercase tracking-[0.28em] text-whisper tabular-nums">
        {counter}
      </span>

      {nextHref ? (
        <Link href={nextHref} className={`${linkBase} text-whisper hover:text-ink`}>
          next
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      ) : (
        <span className={mutedBase} aria-hidden="true">
          next
          <ArrowRight size={14} strokeWidth={1.5} />
        </span>
      )}
    </nav>
  );
}
