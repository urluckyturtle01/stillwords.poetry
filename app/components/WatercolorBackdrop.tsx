"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface WatercolorBackdropProps {
  /** 1 | 2 | 3 | 4 — primary wash variant */
  variant?: 1 | 2 | 3 | 4;
  /** secondary wash variant for a counter-drifting layer */
  variantSecondary?: 1 | 2 | 3 | 4;
  /** primary wash opacity */
  intensity?: number;
  /** secondary wash opacity */
  secondaryIntensity?: number;
  /** add an accent ochre blob that breathes in a corner */
  accent?: boolean;
  /** absolute or fixed positioning */
  fixed?: boolean;
  /** additional class for the wrapper */
  className?: string;
}

export default function WatercolorBackdrop({
  variant = 1,
  variantSecondary,
  intensity = 0.55,
  secondaryIntensity = 0.45,
  accent = false,
  fixed = false,
  className = "",
}: WatercolorBackdropProps) {
  const reduced = usePrefersReducedMotion();

  const wrapperPosition = fixed ? "fixed" : "absolute";

  return (
    <div
      aria-hidden="true"
      className={`${wrapperPosition} inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
    >
      {/* paper base */}
      <div className="absolute inset-0 bg-paper" />

      {/* primary wash */}
      <motion.div
        className="absolute -inset-[14%]"
        initial={reduced ? false : { scale: 1, x: 0, y: 0 }}
        animate={
          reduced
            ? undefined
            : {
                x: ["0%", "2.2%", "-1.2%", "0%"],
                y: ["0%", "-1.6%", "1.2%", "0%"],
                scale: [1, 1.05, 1.02, 1],
              }
        }
        transition={
          reduced
            ? undefined
            : {
                duration: 38,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }
        }
        style={{
          opacity: intensity,
          backgroundImage: `url(/art/wash-0${variant}.svg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "multiply",
          willChange: "transform",
        }}
      />

      {/* secondary wash — drifts the other way */}
      {variantSecondary && (
        <motion.div
          className="absolute -inset-[16%]"
          initial={reduced ? false : { scale: 1.05, x: 0, y: 0, rotate: 0 }}
          animate={
            reduced
              ? undefined
              : {
                  x: ["0%", "-2.5%", "1.4%", "0%"],
                  y: ["0%", "1.8%", "-1.4%", "0%"],
                  scale: [1.05, 1.02, 1.07, 1.05],
                  rotate: [0, 1.2, -0.8, 0],
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 56,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }
          }
          style={{
            opacity: secondaryIntensity,
            backgroundImage: `url(/art/wash-0${variantSecondary}.svg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "multiply",
            willChange: "transform",
          }}
        />
      )}

      {/* breathing ochre accent blob */}
      {accent && (
        <motion.div
          className="absolute right-[-20%] top-[-10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full"
          initial={reduced ? false : { scale: 0.95, opacity: 0.32 }}
          animate={
            reduced
              ? undefined
              : {
                  scale: [0.95, 1.08, 0.98, 0.95],
                  opacity: [0.32, 0.5, 0.38, 0.32],
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 14,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }
          }
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(201,169,110,0.65) 0%, rgba(201,169,110,0.18) 45%, rgba(201,169,110,0) 70%)",
            filter: "blur(40px)",
            mixBlendMode: "multiply",
          }}
        />
      )}

      {/* second accent — teal mist on opposite corner */}
      {accent && (
        <motion.div
          className="absolute left-[-15%] bottom-[-15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full"
          initial={reduced ? false : { scale: 1, opacity: 0.28 }}
          animate={
            reduced
              ? undefined
              : {
                  scale: [1, 1.1, 1.02, 1],
                  opacity: [0.28, 0.42, 0.32, 0.28],
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 18,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 3,
                }
          }
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(138,163,166,0.65) 0%, rgba(138,163,166,0.18) 45%, rgba(138,163,166,0) 72%)",
            filter: "blur(48px)",
            mixBlendMode: "multiply",
          }}
        />
      )}

      {/* paper grain */}
      <div className="absolute inset-0 grain-overlay" />
    </div>
  );
}
