"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RevealLinesProps {
  lines: string[];
  /** delay before the first line begins, seconds */
  delay?: number;
  /** time between successive lines, seconds */
  stagger?: number;
  /** classes applied to each line */
  lineClassName?: string;
  /** classes applied to the wrapper */
  className?: string;
  /** an as-of key — when it changes, the reveal restarts (e.g. poem id) */
  resetKey?: string;
  /** semantic tag for each line */
  as?: "p" | "div" | "span";
}

export default function RevealLines({
  lines,
  delay = 0.15,
  stagger = 0.09,
  lineClassName = "",
  className = "",
  resetKey,
  as = "p",
}: RevealLinesProps) {
  const reduced = useReducedMotion();
  const Tag = as as keyof React.JSX.IntrinsicElements;

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={`${resetKey ?? "static"}-${i}`}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(6px)" }}
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
          className="block"
        >
          <Tag className={lineClassName}>{line || "\u00A0"}</Tag>
        </motion.span>
      ))}
    </div>
  );
}
