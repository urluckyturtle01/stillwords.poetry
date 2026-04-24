"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import WatercolorBackdrop from "./WatercolorBackdrop";
import {
  type Edition,
  formatReleaseDate,
} from "../../data/stillness-archive";

interface UpcomingEdition {
  label: string;
  releaseDate: string;
}

interface StillnessArchiveClientProps {
  /** live editions, oldest first — this component reverses to show newest first */
  liveEditions: Edition[];
  upcoming: UpcomingEdition[];
}

export default function StillnessArchiveClient({
  liveEditions,
  upcoming,
}: StillnessArchiveClientProps) {
  const reduced = useReducedMotion();
  const live = [...liveEditions].reverse(); // newest first

  return (
    <main className="relative min-h-screen w-full text-ink flex flex-col">
      <WatercolorBackdrop variant={3} intensity={0.4} fixed />

      <SiteHeader />

      {/* ───── hero ───── */}
      <section className="relative px-6 md:px-12 pt-32 md:pt-40 pb-16">
        <div className="mx-auto w-full max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] uppercase tracking-[0.28em] text-whisper mb-8"
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
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display italic text-4xl md:text-6xl leading-[1.08] text-balance"
          >
            ten poems, once a month.
          </motion.h1>

          <motion.p
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-[15px] md:text-base text-whisper max-w-xl text-balance leading-relaxed"
          >
            a monthly gathering of ten poems, curated from quiet poets on
            instagram — one edition at a time.
          </motion.p>
        </div>
      </section>

      {/* ───── issue index ───── */}
      <section className="relative px-6 md:px-12 pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-4xl flex flex-col gap-4 md:gap-5">
          {live.map((edition, i) => {
            const numeral = String(edition.number).padStart(2, "0");
            return (
              <motion.div
                key={edition.slug}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`/stillness-archive/${edition.slug}`}
                  className="group relative block overflow-hidden rounded-sm border border-ink/10 bg-paper/85 transition-all duration-500 hover:border-ink/25 hover:shadow-[0_24px_60px_-36px_rgba(31,27,22,0.4)]"
                >
                  {/* watercolor wash bleeding across the card */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                  >
                    <div
                      className="absolute rounded-full"
                      style={{
                        top: "-40%",
                        left: "-10%",
                        width: "60%",
                        height: "180%",
                        background: "rgb(138,163,166)",
                        opacity: 0.4,
                        filter: "blur(90px)",
                      }}
                    />
                    <div
                      className="absolute rounded-full"
                      style={{
                        bottom: "-50%",
                        right: "-8%",
                        width: "55%",
                        height: "180%",
                        background: "rgb(201,169,110)",
                        opacity: 0.35,
                        filter: "blur(110px)",
                      }}
                    />
                  </div>

                  {/* big editorial numeral — mobile: optically centered on the right edge */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center justify-end md:hidden"
                  >
                    <span
                      className="block font-display italic select-none text-ink/[0.06] group-hover:text-ink/[0.09] transition-colors duration-700 -translate-y-[6%]"
                      style={{
                        fontSize: "clamp(200px, 52vw, 280px)",
                        lineHeight: "0.78",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {numeral}
                    </span>
                  </div>

                  {/* big editorial numeral — desktop: top-right watermark */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none hidden md:block absolute top-[-3.5rem] right-8 font-display italic leading-none select-none text-ink/[0.06] group-hover:text-ink/[0.09] transition-colors duration-700"
                    style={{
                      fontSize: "clamp(200px, 52vw, 280px)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {numeral}
                  </div>

                  {/* content */}
                  <div className="relative z-10 px-6 md:px-12 py-7 md:py-10">
                    <div className="flex items-baseline justify-between gap-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] uppercase tracking-[0.3em] text-whisper group-hover:text-ink transition-colors duration-500">
                          {edition.label}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.24em] text-whisper/70 tabular-nums">
                          {formatReleaseDate(edition.releaseDate)}
                        </span>
                      </div>
                    </div>

                    <h2 className="mt-5 md:mt-8 font-display italic text-[24px] md:text-[36px] leading-[1.15] text-ink text-balance md:max-w-2xl">
                      {edition.subtitle}
                    </h2>

                    <div className="mt-6 md:mt-9 flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-6">
                      <span className="text-[11px] tracking-[0.18em] text-whisper">
                        {edition.poems.length} poems ·{" "}
                        {
                          Array.from(
                            new Set(edition.poems.map((p) => p.author.name))
                          ).length
                        }{" "}
                        poets
                      </span>
                      <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] md:text-[11px] md:tracking-[0.26em] uppercase text-whisper group-hover:text-ink transition-colors duration-500">
                        read this edition
                        <ArrowRight
                          size={12}
                          strokeWidth={1.5}
                          className="md:size-[14px] transition-transform duration-500 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* upcoming — shown as quiet, unlinked rows */}
          {upcoming.map((u, i) => (
            <motion.div
              key={u.label}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: 0.15 + (live.length + i) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative block rounded-sm border border-dashed border-ink/10 px-6 md:px-10 py-7 md:py-8"
              aria-label={`${u.label} arriving ${formatReleaseDate(
                u.releaseDate
              )}`}
            >
              <div className="flex items-baseline justify-between gap-6">
                <span className="text-[11px] uppercase tracking-[0.28em] text-whisper/60">
                  {u.label}
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-whisper/50 tabular-nums">
                  arriving {formatReleaseDate(u.releaseDate)}
                </span>
              </div>
              <p className="mt-4 text-[14px] md:text-[15px] italic text-whisper/70">
                submissions opening soon.
              </p>
            </motion.div>
          ))}
        </div>

        {/* quiet submissions CTA */}
        <div className="mx-auto w-full max-w-4xl mt-16 md:mt-20 text-center">
          <p className="text-[12px] md:text-[13px] text-whisper leading-relaxed">
            <span className="italic">want to be in a future edition?</span>{" "}
            <a
              href="https://instagram.com/stillwords.poetry"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-whisper/30 underline-offset-4 hover:decoration-ink hover:text-ink transition-colors duration-300"
            >
              submissions on instagram
            </a>
            .
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
