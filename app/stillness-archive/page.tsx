"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import WatercolorBackdrop from "../components/WatercolorBackdrop";

export default function StillnessArchivePage() {
  const reduced = useReducedMotion();

  return (
    <main className="relative min-h-screen w-full text-ink flex flex-col">
      <WatercolorBackdrop variant={3} intensity={0.45} fixed />

      <SiteHeader />

      <section className="relative flex-1 flex items-center justify-center px-6 md:px-12 pt-32 pb-24">
        <div className="mx-auto w-full max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] uppercase tracking-[0.28em] text-whisper mb-10"
          >
            stillness archive
          </motion.p>

          <motion.h1
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: 14, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display italic text-3xl md:text-5xl leading-[1.18] text-ink text-balance"
          >
            the first edition arrives <span className="whitespace-nowrap">1 may</span>.
          </motion.h1>

          <motion.p
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 text-[15px] md:text-base text-whisper max-w-md mx-auto text-balance"
          >
            a quiet, hand-bound gathering of poems &mdash; arriving slowly, one
            edition at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-16"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.24em] text-whisper hover:text-ink transition-colors duration-300"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              back home
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
