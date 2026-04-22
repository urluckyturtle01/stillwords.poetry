"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import RevealLines from "../components/RevealLines";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import WatercolorBackdrop from "../components/WatercolorBackdrop";
import { poet } from "@/data/poet";
import { currentlyReading } from "@/data/books";

export default function About() {
  const reduced = useReducedMotion();
  const onDesk = currentlyReading[0];

  return (
    <main className="relative min-h-screen w-full text-ink">
      <WatercolorBackdrop variant={2} intensity={0.45} fixed />

      <SiteHeader />

      {/* HERO LINE */}
      <section className="relative px-6 md:px-12 pt-40 md:pt-44 pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] uppercase tracking-[0.28em] text-whisper mb-8"
          >
            about
          </motion.p>
          <motion.h1
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display italic text-3xl md:text-5xl leading-[1.18] text-ink text-balance"
          >
            {poet.signatureLine}
          </motion.h1>
        </div>
      </section>

      {/* THE HAND */}
      <section className="relative px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-3xl grid grid-cols-12 gap-6">
          <p className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-[0.26em] text-whisper md:pt-2">
            the hand
          </p>
          <div className="col-span-12 md:col-span-9 space-y-6">
            {poet.hand.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="font-poem text-[19px] md:text-[21px] leading-[1.7] text-ink/90 max-w-[60ch] text-pretty"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* THE RHYTHM */}
      <section className="relative px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-3xl grid grid-cols-12 gap-6">
          <p className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-[0.26em] text-whisper md:pt-2">
            the rhythm
          </p>
          <div className="col-span-12 md:col-span-9">
            <RevealLines
              lines={poet.rhythm}
              className="font-poem italic text-2xl md:text-3xl text-ink leading-[1.55] space-y-1"
              lineClassName="block text-balance"
              delay={0.1}
              stagger={0.13}
              as="span"
            />
          </div>
        </div>
      </section>

      {/* ON THE DESK */}
      {onDesk && (
        <section className="relative px-6 md:px-12 py-16 md:py-24">
          <div className="mx-auto max-w-3xl grid grid-cols-12 gap-6">
            <p className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-[0.26em] text-whisper md:pt-2">
              on the desk
            </p>
            <div className="col-span-12 md:col-span-9">
              <p className="font-poem text-[19px] md:text-[21px] leading-[1.7] text-ink/90 max-w-[60ch]">
                right now i&rsquo;m reading{" "}
                <span className="italic">{onDesk.title}</span>
                <span className="text-whisper"> — </span>
                <span className="text-whisper">{onDesk.author}</span>.
              </p>
              <Link
                href="/books-that-stayed"
                className="mt-6 inline-block text-[12px] uppercase tracking-[0.24em] text-ink/80 hover:text-ink underline-offset-[6px] decoration-mist/0 hover:decoration-mist hover:underline"
              >
                books that stayed →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* WHERE TO FIND HIM */}
      <section className="relative px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-3xl grid grid-cols-12 gap-6">
          <p className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-[0.26em] text-whisper md:pt-2">
            where to find him
          </p>
          <ul className="col-span-12 md:col-span-9 m-0 p-0 list-none divide-y divide-ink/10">
            {poet.finding.map((f) => (
              <li key={f.label} className="py-4 flex items-baseline justify-between gap-6">
                <span className="text-[15px] text-whisper uppercase tracking-[0.18em]">
                  {f.label}
                </span>
                <a
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-poem italic text-lg md:text-xl text-ink hover:text-mist transition-colors duration-300 text-right"
                >
                  {f.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* small inline back link near bottom for keyboard users / mobile */}
      <div className="relative px-6 md:px-12 pt-10">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.24em] text-whisper hover:text-ink transition-colors duration-300"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            back home
          </Link>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
