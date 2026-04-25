import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Instagram } from "lucide-react";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import WatercolorBackdrop from "../../../components/WatercolorBackdrop";
import PoemReaderNav from "../../../components/PoemReaderNav";
import { instagramUrl } from "../../../../types/stillness-archive";
import {
  getEditions,
  getPoem,
  getPoemNeighbours,
} from "../../../lib/archive";
import { SITE_NAME } from "../../../lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const editions = await getEditions();
  return editions.flatMap((e) =>
    e.poems.map((p) => ({ edition: e.slug, poem: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ edition: string; poem: string }>;
}): Promise<Metadata> {
  const { edition: editionSlug, poem: poemSlug } = await params;
  const match = await getPoem(editionSlug, poemSlug);

  if (!match) {
    return { title: "poem not found", robots: { index: false, follow: false } };
  }

  const { poem, edition } = match;
  const firstLine = poem.preview[0] ?? poem.lines[0] ?? "";
  const title = `${poem.title} — ${poem.author.name}`;
  const description = firstLine
    ? `${firstLine} — ${poem.author.name}, in ${edition.label} of the stillness archive.`
    : `a poem by ${poem.author.name}, in ${edition.label} of the stillness archive.`;
  const url = `/stillness-archive/${edition.slug}/${poem.slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `${poem.title} — ${poem.author.name} · ${SITE_NAME}`,
      description: firstLine || description,
      type: "article",
      url,
      authors: [poem.author.name],
    },
    twitter: {
      title: `${poem.title} — ${poem.author.name}`,
      description: firstLine || description,
    },
    alternates: { canonical: url },
  };
}

export default async function PoemPage({
  params,
}: {
  params: Promise<{ edition: string; poem: string }>;
}) {
  const { edition: editionSlug, poem: poemSlug } = await params;
  const match = await getPoem(editionSlug, poemSlug);

  if (!match) notFound();

  const { edition, poem, index } = match;
  const { prev, next } = getPoemNeighbours(edition, index);
  const counter = `${index + 1} / ${edition.poems.length}`;

  return (
    <main className="relative min-h-screen w-full text-ink flex flex-col">
      <WatercolorBackdrop variant={1} intensity={0.3} fixed />

      <SiteHeader />

      <section className="relative flex-1 px-6 md:px-12 pt-32 md:pt-40 pb-16">
        <div className="mx-auto w-full max-w-2xl">
          <Link
            href={`/stillness-archive/${edition.slug}`}
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-whisper hover:text-ink transition-colors duration-300"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            {edition.label.toLowerCase()}
          </Link>

          {/* ───── title ───── */}
          <header className="mt-14 md:mt-20 text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-whisper mb-6">
              {edition.label} · poem {index + 1}
            </p>
            <h1 className="font-display italic text-[34px] md:text-[54px] leading-[1.06] text-ink text-balance">
              {poem.title}
            </h1>
          </header>

          {/* ───── poem body ───── */}
          <article className="mt-14 md:mt-20 font-display text-[19px] md:text-[22px] leading-[1.7] text-ink text-center space-y-1">
            {poem.lines.map((line, i) =>
              line === "" ? (
                <div key={i} aria-hidden="true" className="h-4 md:h-5" />
              ) : (
                <p key={i}>{line}</p>
              )
            )}
          </article>

          {/* ───── author block ───── */}
          <footer className="mt-14 md:mt-20 flex flex-col items-center gap-3">
            <p className="text-[12px] uppercase tracking-[0.26em] text-whisper">
              by
            </p>
            {poem.author.slug ? (
              <Link
                href={`/poets/${poem.author.slug}`}
                className="font-display italic text-xl md:text-2xl text-ink underline decoration-transparent underline-offset-[6px] hover:decoration-ink/30 transition-all duration-300"
              >
                {poem.author.name}
              </Link>
            ) : (
              <p className="font-display italic text-xl md:text-2xl text-ink">
                {poem.author.name}
              </p>
            )}
            <a
              href={instagramUrl(poem.author.instagramHandle)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[12px] text-whisper hover:text-ink transition-colors duration-300"
            >
              <Instagram
                size={14}
                strokeWidth={1.5}
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="underline decoration-whisper/30 underline-offset-4 group-hover:decoration-ink">
                @{poem.author.instagramHandle}
              </span>
            </a>
          </footer>

          {/* ───── prev / counter / next ───── */}
          <PoemReaderNav
            parentHref={`/stillness-archive/${edition.slug}`}
            prevHref={
              prev ? `/stillness-archive/${edition.slug}/${prev.slug}` : null
            }
            nextHref={
              next ? `/stillness-archive/${edition.slug}/${next.slug}` : null
            }
            counter={counter}
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
