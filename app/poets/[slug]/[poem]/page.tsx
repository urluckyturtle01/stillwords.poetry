import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Instagram } from "lucide-react";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import WatercolorBackdrop from "../../../components/WatercolorBackdrop";
import PoemReaderNav from "../../../components/PoemReaderNav";
import { instagramUrl } from "../../../../types/stillness-archive";
import { getPoets, getPoetBySlug, getPoetPoem } from "../../../lib/archive";
import { SITE_NAME } from "../../../lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const poets = await getPoets();
  const params: { slug: string; poem: string }[] = [];
  for (const p of poets) {
    const match = await getPoetBySlug(p.slug);
    if (!match) continue;
    for (const poem of match.poems) {
      params.push({ slug: p.slug, poem: poem.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; poem: string }>;
}): Promise<Metadata> {
  const { slug, poem: poemSlug } = await params;
  const match = await getPoetPoem(slug, poemSlug);

  if (!match) {
    return { title: "poem not found", robots: { index: false, follow: false } };
  }

  const { poet, poems, index } = match;
  const poem = poems[index];
  const firstLine = poem.preview[0] ?? poem.lines[0] ?? "";
  const title = `${poem.title} — ${poet.name}`;
  const description = firstLine
    ? `${firstLine} — ${poet.name}, in the stillness archive.`
    : `a poem by ${poet.name}, in the stillness archive.`;
  const url = `/poets/${poet.slug}/${poem.slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `${poem.title} — ${poet.name} · ${SITE_NAME}`,
      description: firstLine || description,
      type: "article",
      url,
      authors: [poet.name],
    },
    twitter: {
      title: `${poem.title} — ${poet.name}`,
      description: firstLine || description,
    },
    alternates: { canonical: url },
  };
}

export default async function PoetPoemPage({
  params,
}: {
  params: Promise<{ slug: string; poem: string }>;
}) {
  const { slug, poem: poemSlug } = await params;
  const match = await getPoetPoem(slug, poemSlug);

  if (!match) notFound();

  const { poet, poems, index } = match;
  const poem = poems[index];
  const prev = index > 0 ? poems[index - 1] : null;
  const next = index < poems.length - 1 ? poems[index + 1] : null;
  const counter = `${index + 1} / ${poems.length}`;
  const parentHref = `/poets/${poet.slug}`;

  return (
    <main className="relative min-h-screen w-full text-ink flex flex-col">
      <WatercolorBackdrop variant={1} intensity={0.3} fixed />

      <SiteHeader />

      <section className="relative flex-1 px-6 md:px-12 pt-32 md:pt-40 pb-16">
        <div className="mx-auto w-full max-w-2xl">
          <Link
            href={parentHref}
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-whisper hover:text-ink transition-colors duration-300"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            back to profile
          </Link>

          {/* ───── title ───── */}
          <header className="mt-14 md:mt-20 text-center">
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
            <Link
              href={parentHref}
              className="font-display italic text-xl md:text-2xl text-ink underline decoration-transparent underline-offset-[6px] hover:decoration-ink/30 transition-all duration-300"
            >
              {poet.name}
            </Link>
            <a
              href={instagramUrl(poet.instagramHandle)}
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
                @{poet.instagramHandle}
              </span>
            </a>
          </footer>

          {/* ───── prev / counter / next ───── */}
          <PoemReaderNav
            parentHref={parentHref}
            prevHref={prev ? `/poets/${poet.slug}/${prev.slug}` : null}
            nextHref={next ? `/poets/${poet.slug}/${next.slug}` : null}
            counter={counter}
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
