"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PoetPoem } from "../../types/stillness-archive";

/* ──────────────────────────────────────────────
   watercolor washes — calmer palette than the
   bento grid since the focus here is the poet.
   each wash = two soft, blurred color blobs.
   ────────────────────────────────────────────── */

type Wash = { blob1: CSSProperties; blob2: CSSProperties };

const WASHES: Wash[] = [
  // sage & gold
  {
    blob1: { top: "-20%", left: "-15%", width: "65%", height: "75%", background: "rgb(138,163,166)", opacity: 0.5, filter: "blur(80px)" },
    blob2: { bottom: "-20%", right: "-15%", width: "70%", height: "70%", background: "rgb(201,169,110)", opacity: 0.38, filter: "blur(90px)" },
  },
  // golden hour
  {
    blob1: { top: "-15%", right: "-15%", width: "65%", height: "70%", background: "rgb(214,170,90)", opacity: 0.45, filter: "blur(90px)" },
    blob2: { bottom: "-20%", left: "-15%", width: "65%", height: "65%", background: "rgb(190,150,140)", opacity: 0.32, filter: "blur(95px)" },
  },
  // slate & cream
  {
    blob1: { top: "-15%", right: "-10%", width: "65%", height: "65%", background: "rgb(135,155,160)", opacity: 0.45, filter: "blur(85px)" },
    blob2: { bottom: "-20%", left: "-15%", width: "65%", height: "65%", background: "rgb(220,200,170)", opacity: 0.34, filter: "blur(90px)" },
  },
  // moss & ochre
  {
    blob1: { top: "-15%", left: "20%", width: "55%", height: "65%", background: "rgb(150,170,150)", opacity: 0.4, filter: "blur(80px)" },
    blob2: { bottom: "-20%", right: "-10%", width: "65%", height: "65%", background: "rgb(196,156,90)", opacity: 0.36, filter: "blur(95px)" },
  },
  // ash mint
  {
    blob1: { top: "-15%", right: "20%", width: "55%", height: "60%", background: "rgb(155,180,170)", opacity: 0.45, filter: "blur(85px)" },
    blob2: { bottom: "-15%", left: "-10%", width: "60%", height: "60%", background: "rgb(210,190,160)", opacity: 0.32, filter: "blur(90px)" },
  },
  // warm dawn
  {
    blob1: { top: "-15%", right: "-10%", width: "60%", height: "65%", background: "rgb(220,175,140)", opacity: 0.45, filter: "blur(85px)" },
    blob2: { bottom: "-15%", left: "-15%", width: "60%", height: "60%", background: "rgb(140,165,160)", opacity: 0.32, filter: "blur(75px)" },
  },
];

interface PoetPoemGridProps {
  poetSlug: string;
  poems: PoetPoem[];
}

export default function PoetPoemGrid({ poetSlug, poems }: PoetPoemGridProps) {
  const reduced = useReducedMotion();

  if (poems.length === 0) {
    return (
      <p className="text-center font-poem italic text-lg text-whisper">
        no poems in the archive yet — soon.
      </p>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-7">
      {poems.map((poem, i) => (
        <motion.div
          key={`${poem.editionSlug ?? "orphan"}-${poem.slug}`}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.8,
            delay: 0.08 + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <PoemCard
            poem={poem}
            poetSlug={poetSlug}
            wash={WASHES[i % WASHES.length]}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   individual poem card
   ────────────────────────────────────────────── */

interface PoemCardProps {
  poem: PoetPoem;
  poetSlug: string;
  wash: Wash;
}

function PoemCard({ poem, poetSlug, wash }: PoemCardProps) {
  const previewLines = poem.preview.slice(0, 3);

  return (
    <Link
      href={`/poets/${poetSlug}/${poem.slug}`}
      aria-label={`read "${poem.title}"`}
      className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-sm border border-ink/10 bg-paper/85 transition-all duration-500 hover:border-ink/25 hover:shadow-[0_18px_44px_-30px_rgba(31,27,22,0.4)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper md:min-h-[280px]"
    >
      {/* watercolor wash */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute rounded-full" style={wash.blob1} />
        <div className="absolute rounded-full" style={wash.blob2} />
      </div>

      {/* content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-8">
        <div className="min-w-0">
          <h3 className="font-display italic text-[22px] leading-[1.18] text-ink text-balance md:text-[26px]">
            {poem.title}
          </h3>

          {previewLines.length > 0 ? (
            <div className="mt-5 space-y-1 font-poem italic text-[14px] leading-[1.6] text-whisper md:text-[15px]">
              {previewLines.map((line, i) => (
                <p key={i} className="text-pretty">
                  {line}
                </p>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="text-[11px] uppercase tracking-[0.24em] text-whisper transition-colors duration-500 group-hover:text-ink">
            read
          </span>
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            className="shrink-0 text-whisper/60 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
          />
        </div>
      </div>
    </Link>
  );
}
