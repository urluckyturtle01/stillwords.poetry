"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const INSTAGRAM_URL = "https://instagram.com/stillwords.poetry";

/**
 * A thin, world-class announcement strip that sits above SiteHeader on every
 * page. Whole bar is a single link out to the stillwords instagram pinned
 * post. Hidden on print. Respects prefers-reduced-motion.
 */
export default function AnnouncementBar() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-30 no-print"
    >
      {/* hairline top */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-ink/10" />
      {/* hairline bottom */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />

      {/* faint warm wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(201,169,110,0.08) 0%, rgba(138,163,166,0.06) 50%, rgba(201,169,110,0.08) 100%)",
        }}
      />

      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="submissions open for the first edition of stillness archive — read the pinned post on instagram"
        className="group relative block focus:outline-none focus-visible:ring-1 focus-visible:ring-ochre/50"
      >
        <div className="relative mx-auto max-w-5xl px-5 sm:px-6 md:px-12 py-2.5 md:py-3 flex items-center justify-center gap-3 md:gap-4 text-[15px] md:text-[16px] text-ink/85 group-hover:text-ink transition-colors duration-300 text-center">
          <p className="font-poem leading-tight">
            submissions open for the first edition of{" "}
            <span className="italic text-ink">"stillness archive"</span>
          </p>
          <span
            aria-hidden="true"
            className=" sm:inline-flex items-center text-whisper group-hover:text-ochre transition-all duration-500"
          >
            <ArrowUpRight
              size={15}
              strokeWidth={1.4}
              className="transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </a>
    </motion.div>
  );
}
