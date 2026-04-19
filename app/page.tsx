"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import HeroWatercolor from "./components/HeroWatercolor";
import RevealLines from "./components/RevealLines";
import Signature from "./components/Signature";
import SiteFooter from "./components/SiteFooter";
import WatercolorBackdrop from "./components/WatercolorBackdrop";
import {
  type FeaturedPoem,
  featuredPoems,
  nextPoem,
  selectFeaturedPoem,
} from "@/data/poems";

const initialPoem: FeaturedPoem = selectFeaturedPoem(new Date(0));

const worldCards = [
  {
    href: "/quiet-enough",
    eyebrow: "the book",
    title: "quiet enough",
    note: "seven pieces of stillness.",
    wash: 2 as const,
  },
  {
    href: "/books-that-stayed",
    eyebrow: "what's on the desk",
    title: "books that stayed",
    note: "a quiet reading archive.",
    wash: 3 as const,
  },
  {
    href: "/about",
    eyebrow: "the person",
    title: "about",
    note: "soft lines. nothing loud.",
    wash: 4 as const,
  },
];

export default function Home() {
  const reduced = useReducedMotion();
  const [poem, setPoem] = useState<FeaturedPoem>(initialPoem);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPoem(selectFeaturedPoem(new Date()));
    setMounted(true);
  }, []);

  function cycle() {
    setPoem((p) => nextPoem(p.id));
  }

  return (
    <main className="relative min-h-screen w-full text-ink">
      {/* fixed paper for the whole page (hero gets its own animated layer) */}
      <WatercolorBackdrop variant={1} intensity={0.45} fixed />

      {/* top chrome */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 pt-6 md:pt-8 flex items-center justify-between">
        <Link href="/" aria-label="stillwords home" className="block">
          <img src="/logo.svg" alt="stillwords" className="w-24 md:w-28 opacity-90" />
        </Link>
        <Signature />
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-28 pb-24 overflow-hidden">
        <HeroWatercolor />

        <div className="relative w-full max-w-[640px] flex flex-col items-center text-center">
          <motion.p
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-whisper mb-8"
          >
            today&rsquo;s breath · {String(featuredPoems.findIndex((p) => p.id === poem.id) + 1).padStart(2, "0")}
          </motion.p>

          <motion.h1
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-display text-stone-700/90 text-2xl md:text-[28px] italic mb-8 md:mb-10"
          >
            {poem.title}
          </motion.h1>

          <AnimatePresence mode="wait">
            <RevealLines
              key={poem.id}
              resetKey={poem.id}
              lines={poem.lines}
              delay={0.25}
              stagger={0.11}
              className="font-poem text-ink text-[22px] md:text-[28px] leading-[1.55] tracking-[0.005em] space-y-1"
              lineClassName="text-balance"
              as="span"
            />
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={cycle}
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 + poem.lines.length * 0.11 }}
            className="mt-12 md:mt-14 text-[12px] tracking-[0.22em] uppercase text-whisper hover:text-ink transition-colors duration-300 group"
            aria-label="show another poem"
          >
            <span className="inline-block mr-2 transition-transform duration-500 group-hover:rotate-180">
              ↻
            </span>
            another
          </motion.button>
        </div>

        {/* tagline + scroll cue */}
        <div className="absolute bottom-8 md:bottom-10 left-0 right-0 flex flex-col items-center gap-4">
          <p className="signature text-sm md:text-[15px] text-whisper">writing for quiet minds.</p>
          <div className="relative h-10 w-px overflow-hidden">
            <span className="absolute inset-0 block bg-ink/30 animate-hairline origin-top" />
          </div>
        </div>
      </section>

      {/* THE WORLD */}
      <section className="relative px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 md:mb-20 max-w-xl"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-whisper mb-4">
              the world
            </p>
            <p className="font-display italic text-2xl md:text-3xl text-ink leading-snug text-balance">
              three doors, all quiet.
              <br />
              walk through whichever calls.
            </p>
          </motion.div>

          <ul className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {worldCards.map((c, i) => (
              <motion.li
                key={c.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={c.href}
                  className="group relative block overflow-hidden aspect-[4/5] md:aspect-[3/4] p-7 md:p-9 flex flex-col justify-between ring-1 ring-ink/10 hover:ring-ink/20 transition-[ring,box-shadow] duration-500 shadow-[0_18px_50px_-30px_rgba(31,27,22,0.25)]"
                >
                  {/* base wash — clearly visible */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0"
                    initial={{ scale: 1.02, x: 0, y: 0 }}
                    animate={{
                      x: ["0%", "1.6%", "-1%", "0%"],
                      y: ["0%", "-1.4%", "1%", "0%"],
                      scale: [1.02, 1.06, 1.03, 1.02],
                    }}
                    transition={{
                      duration: 30 + i * 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                    style={{
                      backgroundImage: `url(/art/wash-0${c.wash}.svg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: 0.95,
                      mixBlendMode: "multiply",
                      willChange: "transform",
                    }}
                  />
                  {/* hover bloom — second wash crossfades in */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-[1200ms] ease-out"
                    style={{
                      backgroundImage: `url(/art/wash-0${((c.wash % 4) + 1) as 1 | 2 | 3 | 4}.svg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      mixBlendMode: "multiply",
                    }}
                  />
                  {/* paper grain inside the card */}
                  <div aria-hidden="true" className="absolute inset-0 grain-overlay" />

                  {/* readability veil so type stays crisp on busier washes */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(244,238,227,0.55) 0%, rgba(244,238,227,0.05) 35%, rgba(244,238,227,0.05) 60%, rgba(244,238,227,0.7) 100%)",
                    }}
                  />

                  <div className="relative">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-ink/55">
                      {c.eyebrow}
                    </p>
                  </div>

                  <div className="relative">
                    <h3 className="font-display text-3xl md:text-4xl text-ink leading-tight italic">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[15px] text-ink/65 max-w-[24ch] text-balance">
                      {c.note}
                    </p>
                    <p className="mt-6 text-[12px] uppercase tracking-[0.24em] text-ink/75 inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-500">
                      enter <span aria-hidden>→</span>
                    </p>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* OUTPOSTS / FOOTER */}
      <SiteFooter />
    </main>
  );
}
