"use client";

import { useEffect, useRef, useState } from "react";

interface CursorInkProps {
  /** approximate diameter in px */
  size?: number;
  /** ease constant 0..1 — lower = more lag */
  ease?: number;
  /** target opacity once tracking */
  intensity?: number;
}

/**
 * A soft watercolor halo that lags behind the cursor inside whichever
 * positioned ancestor it's mounted in. Listens to mousemove on its parent;
 * fades out after a moment of stillness.
 *
 * Disabled on reduced motion and coarse pointers (touch).
 */
export default function CursorInk({
  size = 360,
  ease = 0.12,
  intensity = 0.8,
}: CursorInkProps) {
  const blobRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafId = useRef(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) {
      setEnabled(false);
      return;
    }
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const blob = blobRef.current;
    if (!blob) return;
    const parent = blob.parentElement;
    if (!parent) return;

    const setVisible = (v: boolean) => {
      if (visibleRef.current === v) return;
      visibleRef.current = v;
      blob.style.opacity = v ? String(intensity) : "0";
    };

    function onMove(e: MouseEvent) {
      const rect = parent!.getBoundingClientRect();
      target.current.x = e.clientX - rect.left;
      target.current.y = e.clientY - rect.top;
      if (!visibleRef.current) {
        // first move — snap to the target so it doesn't fly across the screen
        current.current.x = target.current.x;
        current.current.y = target.current.y;
      }
      setVisible(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setVisible(false), 1400);
    }

    function onLeave() {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setVisible(false), 250);
    }

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    function tick() {
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;
      blob!.style.transform = `translate3d(${current.current.x - size / 2}px, ${
        current.current.y - size / 2
      }px, 0)`;
      rafId.current = requestAnimationFrame(tick);
    }
    rafId.current = requestAnimationFrame(tick);

    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      cancelAnimationFrame(rafId.current);
    };
  }, [enabled, ease, intensity, size]);

  if (!enabled) return null;

  return (
    <div
      ref={blobRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-[1] will-change-transform"
      style={{
        width: size,
        height: size,
        opacity: 0,
        transition: "opacity 700ms ease-out",
        mixBlendMode: "multiply",
        background:
          "radial-gradient(circle at 50% 50%, rgba(140,165,165,0.55) 0%, rgba(184,141,90,0.28) 35%, rgba(140,165,165,0) 70%)",
        filter: "blur(28px)",
      }}
    />
  );
}
