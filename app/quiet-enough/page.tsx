"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import CountrySelect from "../components/CountrySelect";
import RevealLines from "../components/RevealLines";
import Signature from "../components/Signature";
import SiteFooter from "../components/SiteFooter";
import WatercolorBackdrop from "../components/WatercolorBackdrop";
import { amazonData, type CountryKey, ebook } from "@/data/ebook";

export default function QuietEnoughPage() {
  const [country, setCountry] = useState<CountryKey | "">("");
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const coverScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const store = country ? amazonData[country] : null;

  return (
    <main className="relative min-h-screen w-full text-ink">
      <WatercolorBackdrop variant={3} intensity={0.4} fixed />

      <header className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 pt-6 md:pt-8 flex items-center justify-between no-print">
        <Link href="/" aria-label="back to stillwords home" className="block">
          <img src="/logo.svg" alt="stillwords" className="w-24 md:w-28 opacity-90" />
        </Link>
        <Signature />
      </header>

      {/* HERO: cover + meta + buy */}
      <section
        ref={heroRef}
        className="relative px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28"
      >
        <div className="mx-auto max-w-6xl grid grid-cols-12 gap-8 md:gap-14 items-start">
          {/* COVER */}
          <div className="col-span-12 md:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10"
                style={{
                  backgroundImage: "url(/art/wash-04.svg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.7,
                }}
              />
              <motion.img
                src="/book-cover.jpg"
                alt="quiet enough — book cover"
                style={{ y: coverY, scale: coverScale }}
                className="w-full h-full object-cover shadow-[0_30px_60px_-30px_rgba(31,27,22,0.45)]"
              />
            </div>
          </div>

          {/* META + BUY */}
          <div className="col-span-12 md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.28em] text-whisper mb-6">
              the book
            </p>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-ink italic mb-3">
              {ebook.title}
            </h1>
            <p className="font-poem italic text-xl md:text-2xl text-whisper mb-8">
              {ebook.subtitle}
            </p>

            <p className="font-poem text-[19px] md:text-xl leading-[1.7] text-ink/85 max-w-[55ch] mb-10 text-pretty">
              {ebook.description}
            </p>

            {/* BUY BLOCK */}
            <div className="border-t border-ink/15 pt-8 max-w-md no-print">
              <p className="text-[11px] uppercase tracking-[0.26em] text-whisper mb-4">
                read it
              </p>

              <CountrySelect value={country} onChange={setCountry} />

              <div className="mt-6 flex items-end justify-between gap-6">
                <dl className="text-[14px] text-whisper leading-relaxed">
                  <div className="flex items-baseline gap-3">
                    <dt className="uppercase tracking-[0.18em] text-[11px]">ebook</dt>
                    <dd className="font-poem text-lg text-ink">
                      {store ? store.price : "—"}
                    </dd>
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <dt className="uppercase tracking-[0.18em] text-[11px]">paperback</dt>
                    <dd className="font-poem text-lg text-ink">
                      {store ? store.paperback : "—"}
                    </dd>
                  </div>
                </dl>

                <a
                  href={store ? store.link : "#"}
                  target={store ? "_blank" : "_self"}
                  rel={store ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (!store) e.preventDefault();
                  }}
                  aria-disabled={!store}
                  className={`inline-flex items-center gap-2 px-5 py-3 text-[12px] uppercase tracking-[0.22em] transition-all duration-300 ${
                    store
                      ? "bg-ink text-paper hover:bg-ink/85"
                      : "bg-ink/15 text-ink/40 cursor-not-allowed"
                  }`}
                >
                  buy on amazon <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROOF — sample */}
      <section className="relative px-6 md:px-12 py-20 md:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.26em] text-whisper mb-8 text-center">
            a passage
          </p>
          <h2 className="font-display italic text-2xl md:text-3xl text-whisper text-center mb-10">
            {ebook.sample.title}
          </h2>
          <div className="bg-paper/40 backdrop-blur-[2px] px-6 md:px-12 py-12 md:py-16 border-y border-ink/10 print-only:border-0">
            <RevealLines
              lines={ebook.sample.lines}
              className="font-poem text-[22px] md:text-[26px] leading-[1.65] text-ink space-y-1 text-center"
              lineClassName="block text-balance"
              delay={0.2}
              stagger={0.1}
              as="span"
            />
          </div>
        </div>
      </section>

      {/* WHY THIS BOOK EXISTS */}
      <section className="relative px-6 md:px-12 py-20 md:py-28 no-print">
        <div className="mx-auto max-w-3xl grid grid-cols-12 gap-6">
          <p className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-[0.26em] text-whisper md:pt-2">
            why this book exists
          </p>
          <div className="col-span-12 md:col-span-9 space-y-6">
            {ebook.whyItExists.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-poem text-[19px] md:text-[21px] leading-[1.7] text-ink/90 max-w-[60ch] text-pretty"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <div className="relative px-6 md:px-12 pt-6 no-print">
        <div className="mx-auto max-w-6xl">
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
