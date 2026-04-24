"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ArchivePoem, Edition } from "../../types/stillness-archive";
import styles from "./EditionBentoGrid.module.css";

/* ──────────────────────────────────────────────
   watercolor washes — one unique palette per card
   each wash = two soft, heavily-blurred color blobs
   layered behind the card content
   ────────────────────────────────────────────── */

type Wash = { blob1: CSSProperties; blob2: CSSProperties };

const WASHES: Wash[] = [
  // 0 — sage & gold
  {
    blob1: { top: "-15%", left: "-15%", width: "70%", height: "75%", background: "rgb(138,163,166)", opacity: 0.55, filter: "blur(70px)" },
    blob2: { bottom: "-20%", right: "-15%", width: "75%", height: "75%", background: "rgb(201,169,110)", opacity: 0.4, filter: "blur(80px)" },
  },
  // 1 — golden hour
  {
    blob1: { top: "-20%", right: "-15%", width: "70%", height: "70%", background: "rgb(214,170,90)", opacity: 0.5, filter: "blur(80px)" },
    blob2: { bottom: "-15%", left: "-20%", width: "70%", height: "70%", background: "rgb(190,150,140)", opacity: 0.35, filter: "blur(90px)" },
  },
  // 2 — moss & ochre
  {
    blob1: { top: "-10%", left: "20%", width: "60%", height: "70%", background: "rgb(150,170,150)", opacity: 0.45, filter: "blur(70px)" },
    blob2: { bottom: "-15%", right: "-10%", width: "70%", height: "70%", background: "rgb(196,156,90)", opacity: 0.4, filter: "blur(100px)" },
  },
  // 3 — warm dawn
  {
    blob1: { top: "-15%", right: "-10%", width: "65%", height: "70%", background: "rgb(220,175,140)", opacity: 0.5, filter: "blur(80px)" },
    blob2: { bottom: "-15%", left: "-15%", width: "65%", height: "65%", background: "rgb(140,165,160)", opacity: 0.35, filter: "blur(70px)" },
  },
  // 4 — soft amber & sky
  {
    blob1: { top: "-15%", left: "-10%", width: "70%", height: "70%", background: "rgb(201,169,110)", opacity: 0.45, filter: "blur(80px)" },
    blob2: { top: "30%", right: "-20%", width: "65%", height: "65%", background: "rgb(140,160,165)", opacity: 0.35, filter: "blur(100px)" },
  },
  // 5 — terra & sage
  {
    blob1: { bottom: "-20%", left: "20%", width: "70%", height: "70%", background: "rgb(190,140,115)", opacity: 0.45, filter: "blur(90px)" },
    blob2: { top: "-15%", left: "-15%", width: "60%", height: "60%", background: "rgb(150,170,170)", opacity: 0.35, filter: "blur(70px)" },
  },
  // 6 — pale ochre
  {
    blob1: { top: "-15%", left: "30%", width: "65%", height: "70%", background: "rgb(210,180,120)", opacity: 0.45, filter: "blur(80px)" },
    blob2: { bottom: "-15%", right: "20%", width: "50%", height: "60%", background: "rgb(160,170,150)", opacity: 0.3, filter: "blur(70px)" },
  },
  // 7 — slate & cream
  {
    blob1: { top: "-15%", right: "-10%", width: "70%", height: "70%", background: "rgb(135,155,160)", opacity: 0.5, filter: "blur(80px)" },
    blob2: { bottom: "-20%", left: "-10%", width: "70%", height: "65%", background: "rgb(220,200,170)", opacity: 0.35, filter: "blur(90px)" },
  },
  // 8 — desert clay
  {
    blob1: { top: "-15%", left: "-10%", width: "65%", height: "65%", background: "rgb(196,156,90)", opacity: 0.5, filter: "blur(80px)" },
    blob2: { bottom: "-15%", right: "-15%", width: "60%", height: "70%", background: "rgb(180,140,110)", opacity: 0.35, filter: "blur(85px)" },
  },
  // 9 — ash mint
  {
    blob1: { top: "-20%", right: "20%", width: "60%", height: "65%", background: "rgb(155,180,170)", opacity: 0.5, filter: "blur(80px)" },
    blob2: { bottom: "-15%", left: "-10%", width: "65%", height: "65%", background: "rgb(210,190,160)", opacity: 0.35, filter: "blur(90px)" },
  },
];

/* ──────────────────────────────────────────────
   bento: two mirrored blocks of 5 cards each.

   block 1 (rows 1-2) — vertical card on the right
     a · b
     c · d         m (rows 1-2, vertical)

   block 2 (rows 3-4) — vertical card on the left
                    e · f
     n (rows 3-4)  g · h    (vertical on left)

   reading order (poem 0 → poem 9):
     a, b, m,  c, d,        n, e, f,  g, h
   ────────────────────────────────────────────── */

type AreaKey = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "m" | "n";
type Variant = "tall" | "wide";

const CELLS: { area: AreaKey; variant: Variant }[] = [
  { area: "a", variant: "wide" },  // block 1, top-left
  { area: "b", variant: "wide" },  // block 1, top-mid
  { area: "m", variant: "tall" },  // block 1, vertical right
  { area: "c", variant: "wide" },  // block 1, bottom-left
  { area: "d", variant: "wide" },  // block 1, bottom-mid
  { area: "n", variant: "tall" },  // block 2, vertical left
  { area: "e", variant: "wide" },  // block 2, top-mid
  { area: "f", variant: "wide" },  // block 2, top-right
  { area: "g", variant: "wide" },  // block 2, bottom-mid
  { area: "h", variant: "wide" },  // block 2, bottom-right
];

interface EditionBentoGridProps {
  edition: Edition;
}

export default function EditionBentoGrid({ edition }: EditionBentoGridProps) {
  const reduced = useReducedMotion();
  const cards = edition.poems.slice(0, 10).map((poem, i) => ({
    poem,
    ...CELLS[i],
    wash: WASHES[i % WASHES.length],
  }));

  return (
    <div className={`mx-auto w-full max-w-6xl ${styles.grid}`}>
      {cards.map(({ poem, area, variant, wash }, i) => (
        <motion.div
          key={poem.slug}
          className={`${styles.cell} ${styles[area]} ${styles[variant]}`}
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
            editionSlug={edition.slug}
            variant={variant}
            wash={wash}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   one bento cell
   ────────────────────────────────────────────── */

interface PoemCardProps {
  poem: ArchivePoem;
  editionSlug: string;
  variant: Variant;
  wash: Wash;
}

function PoemCard({ poem, editionSlug, variant, wash }: PoemCardProps) {
  const titleClass =
    variant === "tall"
      ? "text-[24px] md:text-[28px] leading-[1.1]"
      : "text-[18px] md:text-[21px] leading-[1.18]";

  const previewLines =
    variant === "tall"
      ? poem.preview.slice(0, 3)
      : poem.preview.slice(0, 2);

  return (
    <Link
      href={`/stillness-archive/${editionSlug}/${poem.slug}`}
      aria-label={`read "${poem.title}" by ${poem.author.name}`}
      className="group relative block h-full overflow-hidden rounded-sm border border-ink/10 bg-paper/85 transition-all duration-500 hover:border-ink/25 hover:shadow-[0_18px_44px_-30px_rgba(31,27,22,0.4)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      {/* watercolor wash — soft blurred color blobs behind content */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute rounded-full transition-opacity duration-700 group-hover:opacity-100"
          style={wash.blob1}
        />
        <div
          className="absolute rounded-full transition-opacity duration-700"
          style={wash.blob2}
        />
      </div>

      {/* content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-7">
        <div className="min-w-0">
          <h3
            className={`font-display italic text-ink text-balance ${titleClass}`}
          >
            {poem.title}
          </h3>

          {previewLines.length > 0 ? (
            <div className="mt-4 md:mt-5 space-y-0.5 text-whisper text-[13px] md:text-[14px] italic leading-[1.55]">
              {previewLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-5 md:mt-6 flex items-end justify-between gap-3 min-w-0">
          <div className="min-w-0 flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-[0.2em] text-whisper group-hover:text-ink transition-colors duration-500 truncate">
              {poem.author.name}
            </span>
            <span className="text-[11px] text-whisper/60 truncate">
              @{poem.author.instagramHandle}
            </span>
          </div>

          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            className="shrink-0 text-whisper/50 transition-all duration-500 group-hover:text-ink group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
