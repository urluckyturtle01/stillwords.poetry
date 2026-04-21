"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const onLock = () => lenis.stop();
    const onUnlock = () => lenis.start();
    window.addEventListener("stillwords:scroll-lock", onLock);
    window.addEventListener("stillwords:scroll-unlock", onUnlock);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("stillwords:scroll-lock", onLock);
      window.removeEventListener("stillwords:scroll-unlock", onUnlock);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
