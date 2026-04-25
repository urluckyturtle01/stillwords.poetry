import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import WatercolorBackdrop from "../../components/WatercolorBackdrop";
import EditionBentoGrid from "../../components/EditionBentoGrid";
import Separator from "../../components/Separator";
import {
  formatReleaseDate,
  instagramUrl,
} from "../../../types/stillness-archive";
import {
  getEditionBySlug,
  getEditionMentions,
  getEditions,
} from "../../lib/archive";
import { SITE_NAME } from "../../lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const editions = await getEditions();
  return editions.map((e) => ({ edition: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ edition: string }>;
}): Promise<Metadata> {
  const { edition: editionSlug } = await params;
  const edition = await getEditionBySlug(editionSlug);

  if (!edition) {
    return { title: "edition not found", robots: { index: false, follow: false } };
  }

  const title = `${edition.label} — stillness archive`;
  const description = `${edition.subtitle} a gathering of ${edition.poems.length} poems for ${edition.label.toLowerCase()} of the stillness archive.`;
  const url = `/stillness-archive/${edition.slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `${edition.label} — stillness archive · ${SITE_NAME}`,
      description: edition.subtitle,
      type: "website",
      url,
    },
    twitter: {
      title: `${edition.label} — stillness archive`,
      description: edition.subtitle,
    },
    alternates: { canonical: url },
  };
}

export default async function EditionPage({
  params,
}: {
  params: Promise<{ edition: string }>;
}) {
  const { edition: editionSlug } = await params;
  const [edition, mentions] = await Promise.all([
    getEditionBySlug(editionSlug),
    getEditionMentions(editionSlug),
  ]);

  if (!edition) notFound();

  return (
    <main className="relative min-h-screen w-full text-ink flex flex-col">
      <WatercolorBackdrop variant={2} intensity={0.35} fixed />

      <SiteHeader />

      {/* ───── hero — heading + one-liner ───── */}
      <section className="relative px-6 md:px-12 pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="mx-auto w-full max-w-6xl">
          <Link
            href="/stillness-archive"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-whisper hover:text-ink transition-colors duration-300"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            stillness archive
          </Link>

          <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-whisper mb-5">
                {edition.label}
              </p>
              <h1 className="font-display italic text-3xl md:text-5xl leading-[1.1] text-ink text-balance max-w-3xl">
                {edition.subtitle}
              </h1>
            </div>

            <div className="shrink-0 text-[11px] uppercase tracking-[0.22em] text-whisper/80 tabular-nums">
              {formatReleaseDate(edition.releaseDate)}
            </div>
          </div>
        </div>
      </section>

      {/* ───── bento grid of poems ───── */}
      <section
        className={`relative px-6 md:px-12 ${
          mentions.length > 0 ? "pb-14 md:pb-20" : "pb-24 md:pb-32"
        }`}
      >
        <EditionBentoGrid edition={edition} />
      </section>

      {/* ───── honourable mentions ───── */}
      {mentions.length > 0 ? (
        <section className="relative px-6 md:px-12 pb-24 md:pb-32">
          <div className="mx-auto w-full max-w-6xl">
            <Separator />
            <p className="mt-10 md:mt-12 text-[11px] uppercase tracking-[0.28em] text-whisper">
              honourable mentions
            </p>
            <p className="mt-3 text-[12px] italic text-whisper/80">
              gentle thanks to the poets whose words moved us this edition.
            </p>
            <ul className="mt-10 md:mt-12 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 md:gap-y-8 lg:grid-cols-3">
              {mentions.map((p) => (
                <li key={p.slug} className="flex flex-col items-start">
                  <Link
                    href={`/poets/${p.slug}`}
                    className="font-display italic text-xl md:text-2xl text-ink underline decoration-transparent underline-offset-[6px] hover:decoration-ink/30 transition-all duration-300"
                  >
                    {p.name}
                  </Link>
                  <a
                    href={instagramUrl(p.instagramHandle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.name} on instagram — opens in a new tab`}
                    className="group mt-1.5 inline-flex items-center gap-1.5 font-poem italic text-[14px] md:text-[15px] text-whisper hover:text-ochre transition-colors duration-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-ochre/50 rounded-sm"
                  >
                    <span className="underline decoration-whisper/20 underline-offset-[5px] group-hover:decoration-ochre/60 transition-colors duration-500">
                      @{p.instagramHandle}
                    </span>
                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.4}
                      className="transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <SiteFooter />
    </main>
  );
}
