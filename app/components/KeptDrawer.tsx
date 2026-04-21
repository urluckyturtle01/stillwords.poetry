"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { type KeptLine, useKeptLines } from "../hooks/useKeptLines";
import { getShortDateLabel } from "../lib/time";

/**
 * Renders both:
 *   - a small "kept · n" trigger (hidden when the count is 0)
 *   - the right-side drawer that opens when the trigger is tapped
 *
 * Drop a single <KeptDrawer /> anywhere in the page header.
 */
export default function KeptDrawer() {
  const { kept, hydrated, remove, clear } = useKeptLines();
  const [open, setOpen] = useState(false);
  const [confirmingClear, setConfirmingClear] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      setConfirmingClear(false);
      return;
    }

    const previousActive = document.activeElement as HTMLElement | null;

    document.documentElement.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("stillwords:scroll-lock"));

    const t = setTimeout(() => closeButtonRef.current?.focus(), 50);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      window.dispatchEvent(new CustomEvent("stillwords:scroll-unlock"));
      previousActive?.focus?.();
    };
  }, [open, close]);

  if (!hydrated || kept.length === 0) {
    // Reserve no space and render nothing during SSR / when empty.
    return null;
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="text-[11px] uppercase tracking-[0.26em] text-whisper hover:text-ink transition-colors duration-300"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        kept &middot; {kept.length}
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50">
            {/* scrim */}
            <motion.button
              type="button"
              aria-label="close kept lines"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-ink/15 backdrop-blur-[2px] cursor-default"
            />

            {/* sheet */}
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="kept-title"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 h-full w-[88%] sm:w-[420px] bg-paper border-l border-ink/10 shadow-[ -20px_0_60px_-30px_rgba(31,27,22,0.35)] flex flex-col"
            >
              <div className="grain-overlay absolute inset-0 pointer-events-none" />

              <header className="relative flex items-center justify-between px-6 md:px-8 pt-7 pb-5 border-b border-ink/10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-whisper">
                    your notebook
                  </p>
                  <h2
                    id="kept-title"
                    className="font-display italic text-2xl text-ink mt-1"
                  >
                    kept lines &middot; {kept.length}
                  </h2>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  className="text-[11px] uppercase tracking-[0.24em] text-whisper hover:text-ink transition-colors"
                >
                  close
                </button>
              </header>

              <div className="relative flex-1 overflow-y-auto overscroll-contain px-6 md:px-8 py-6">
                {kept.length === 0 ? (
                  <p className="text-ink/55 italic">nothing kept yet.</p>
                ) : (
                  <ul className="space-y-7">
                    {kept.map((k) => (
                      <KeptItem key={k.id} item={k} onRemove={remove} />
                    ))}
                  </ul>
                )}
              </div>

              <footer className="relative px-6 md:px-8 py-5 border-t border-ink/10 flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.22em] text-whisper">
                  saved on this device.
                </p>
                {confirmingClear ? (
                  <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.22em]">
                    <button
                      type="button"
                      onClick={() => {
                        clear();
                        setConfirmingClear(false);
                        setTimeout(close, 150);
                      }}
                      className="text-ink hover:underline underline-offset-4"
                    >
                      release all
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmingClear(false)}
                      className="text-whisper hover:text-ink transition-colors"
                    >
                      cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmingClear(true)}
                    className="text-[11px] uppercase tracking-[0.22em] text-whisper hover:text-ink transition-colors"
                  >
                    clear all
                  </button>
                )}
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function KeptItem({
  item,
  onRemove,
}: {
  item: KeptLine;
  onRemove: (id: string) => void;
}) {
  let dateLabel = "";
  try {
    dateLabel = getShortDateLabel(new Date(item.savedAt));
  } catch {
    dateLabel = "";
  }
  return (
    <li className="group">
      <p className="font-poem text-ink text-[19px] md:text-[20px] leading-[1.5]">
        {item.text}
      </p>
      <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-whisper">
        <span>
          from &ldquo;{item.poemTitle}&rdquo;
          {dateLabel ? ` · ${dateLabel}` : ""}
        </span>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100 transition-opacity hover:text-ink"
        >
          release
        </button>
      </div>
    </li>
  );
}
