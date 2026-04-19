"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * A creative, slow, alive watercolor field for the hero.
 *
 * Composition:
 *  - one large mist-teal blob behind the poem, drifting up-left
 *  - one medium ochre bloom drifting in the opposite direction
 *  - one deep teal accent that breathes near top
 *  - a faint graphite touch top-center
 *
 * Everything multiplies onto the paper and respects reduced motion.
 */
export default function HeroWatercolor({ className = "" }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  const easing = "easeInOut" as const;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ isolation: "isolate" }}
    >
      {/* mist teal — left */}
      <motion.div
        className="absolute"
        style={{
          left: "-22%",
          top: "8%",
          width: "82vw",
          height: "82vw",
          maxWidth: 1100,
          maxHeight: 1100,
          background:
            "radial-gradient(circle at 50% 50%, rgba(138,163,166,0.62) 0%, rgba(138,163,166,0.22) 40%, rgba(138,163,166,0) 70%)",
          filter: "blur(60px)",
          mixBlendMode: "multiply",
          willChange: "transform, opacity",
        }}
        initial={reduced ? false : { x: 0, y: 0, scale: 1, opacity: 0.7 }}
        animate={
          reduced
            ? undefined
            : {
                x: ["0%", "5%", "-2%", "0%"],
                y: ["0%", "-3%", "4%", "0%"],
                scale: [1, 1.08, 1.02, 1],
                opacity: [0.7, 0.9, 0.78, 0.7],
              }
        }
        transition={
          reduced
            ? undefined
            : { duration: 22, ease: easing, repeat: Infinity, repeatType: "loop" }
        }
      />

      {/* ochre — right, drifts opposite */}
      <motion.div
        className="absolute"
        style={{
          right: "-18%",
          top: "10%",
          width: "70vw",
          height: "70vw",
          maxWidth: 950,
          maxHeight: 950,
          background:
            "radial-gradient(circle at 50% 50%, rgba(201,169,110,0.58) 0%, rgba(201,169,110,0.18) 42%, rgba(201,169,110,0) 70%)",
          filter: "blur(64px)",
          mixBlendMode: "multiply",
          willChange: "transform, opacity",
        }}
        initial={reduced ? false : { x: 0, y: 0, scale: 1.02, opacity: 0.6 }}
        animate={
          reduced
            ? undefined
            : {
                x: ["0%", "-4.5%", "2%", "0%"],
                y: ["0%", "3%", "-3%", "0%"],
                scale: [1.02, 0.96, 1.06, 1.02],
                opacity: [0.6, 0.82, 0.68, 0.6],
              }
        }
        transition={
          reduced
            ? undefined
            : {
                duration: 28,
                ease: easing,
                repeat: Infinity,
                repeatType: "loop",
                delay: 2,
              }
        }
      />

      {/* deep teal — bottom, breathing slowly */}
      <motion.div
        className="absolute"
        style={{
          left: "30%",
          bottom: "-20%",
          width: "60vw",
          height: "60vw",
          maxWidth: 800,
          maxHeight: 800,
          background:
            "radial-gradient(circle at 50% 50%, rgba(138,163,166,0.52) 0%, rgba(138,163,166,0.16) 45%, rgba(138,163,166,0) 72%)",
          filter: "blur(72px)",
          mixBlendMode: "multiply",
          willChange: "transform, opacity",
        }}
        initial={reduced ? false : { scale: 1, opacity: 0.55 }}
        animate={
          reduced
            ? undefined
            : {
                x: ["0%", "3%", "-3%", "0%"],
                y: ["0%", "-2%", "1%", "0%"],
                scale: [1, 1.12, 1.04, 1],
                opacity: [0.55, 0.75, 0.62, 0.55],
              }
        }
        transition={
          reduced
            ? undefined
            : {
                duration: 34,
                ease: easing,
                repeat: Infinity,
                repeatType: "loop",
                delay: 5,
              }
        }
      />

      {/* faint graphite touch — top center, very soft */}
      <motion.div
        className="absolute"
        style={{
          left: "40%",
          top: "-8%",
          width: "32vw",
          height: "32vw",
          maxWidth: 480,
          maxHeight: 480,
          background:
            "radial-gradient(circle at 50% 50%, rgba(31,27,22,0.18) 0%, rgba(31,27,22,0.05) 55%, rgba(31,27,22,0) 80%)",
          filter: "blur(50px)",
          mixBlendMode: "multiply",
          willChange: "transform, opacity",
        }}
        initial={reduced ? false : { opacity: 0.4 }}
        animate={
          reduced
            ? undefined
            : {
                x: ["0%", "-2%", "1%", "0%"],
                y: ["0%", "2%", "-1%", "0%"],
                opacity: [0.4, 0.6, 0.45, 0.4],
              }
        }
        transition={
          reduced
            ? undefined
            : {
                duration: 18,
                ease: easing,
                repeat: Infinity,
                repeatType: "loop",
                delay: 1,
              }
        }
      />

      {/* a slow ink drop — tiny, far right, almost subliminal */}
      <motion.div
        className="absolute"
        style={{
          right: "12%",
          top: "62%",
          width: 14,
          height: 14,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(31,27,22,0.55) 0%, rgba(31,27,22,0) 70%)",
          filter: "blur(2px)",
          mixBlendMode: "multiply",
        }}
        initial={reduced ? false : { opacity: 0, scale: 0.8 }}
        animate={
          reduced
            ? undefined
            : {
                opacity: [0, 0.6, 0.4, 0],
                scale: [0.8, 1.4, 1.1, 0.8],
              }
        }
        transition={
          reduced
            ? undefined
            : {
                duration: 12,
                ease: easing,
                repeat: Infinity,
                repeatType: "loop",
                delay: 4,
              }
        }
      />
    </div>
  );
}
