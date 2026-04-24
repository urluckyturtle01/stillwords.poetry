import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import WatercolorBackdrop from "../../components/WatercolorBackdrop";
import EditionBentoGrid from "../../components/EditionBentoGrid";
import { formatReleaseDate } from "../../../types/stillness-archive";
import { getEditionBySlug } from "../../lib/archive";
import { SITE_NAME } from "../../lib/seo";

// always render on request — db is the source of truth
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

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
  const edition = await getEditionBySlug(editionSlug);

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
      <section className="relative px-6 md:px-12 pb-24 md:pb-32">
        <EditionBentoGrid edition={edition} />

        <div className="mx-auto w-full max-w-6xl mt-14 md:mt-20 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-whisper">
          <span>
            {edition.poems.length} poems ·{" "}
            {Array.from(new Set(edition.poems.map((p) => p.author.name))).length}{" "}
            poets
          </span>
          <span className="italic normal-case tracking-normal text-[12px]">
            curated by {SITE_NAME}
          </span>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
