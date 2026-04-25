import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight, Instagram } from "lucide-react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import WatercolorBackdrop from "../../components/WatercolorBackdrop";
import PoetPoemGrid from "../../components/PoetPoemGrid";
import { instagramUrl } from "../../../types/stillness-archive";
import { getPoets, getPoetBySlug } from "../../lib/archive";
import { SITE_NAME } from "../../lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const poets = await getPoets();
  return poets.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const match = await getPoetBySlug(slug);

  if (!match) {
    return { title: "poet not found", robots: { index: false, follow: false } };
  }

  const { poet, poems } = match;

  const description = poet.bio
    ? poet.bio
    : `${poet.name} — ${poems.length} ${poems.length === 1 ? "poem" : "poems"} in the stillness archive.`;

  const url = `/poets/${poet.slug}`;

  return {
    title: poet.name,
    description,
    openGraph: {
      title: `${poet.name} · ${SITE_NAME}`,
      description,
      type: "profile",
      url,
    },
    twitter: {
      title: `${poet.name} · ${SITE_NAME}`,
      description,
    },
    alternates: { canonical: url },
  };
}

export default async function PoetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const match = await getPoetBySlug(slug);

  if (!match) notFound();

  const { poet, poems } = match;

  const meta =
    poems.length === 0
      ? "soon, in the archive"
      : `${poems.length} ${poems.length === 1 ? "poem" : "poems"}`;

  return (
    <main className="relative min-h-screen w-full text-ink flex flex-col">
      <WatercolorBackdrop variant={3} intensity={0.35} fixed />

      <SiteHeader />

      {/* ───── hero ───── */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-32 pb-10 md:pb-14">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="font-display italic text-[42px] md:text-[68px] leading-[1.04] text-ink text-balance">
            {poet.name}
          </h1>

          {/* instagram link — styled like AnnouncementBar's IG arrow */}
          <a
            href={instagramUrl(poet.instagramHandle)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${poet.name} on instagram — opens in a new tab`}
            className="group mt-6 md:mt-7 inline-flex items-center gap-2 font-poem italic text-[17px] md:text-[19px] text-whisper hover:text-ochre transition-colors duration-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-ochre/50 rounded-sm px-1"
          >
            <Instagram
              size={16}
              strokeWidth={1.4}
              aria-hidden="true"
              className="not-italic transition-colors duration-500"
            />
            <span className="underline decoration-whisper/25 underline-offset-[6px] group-hover:decoration-ochre/60 transition-colors duration-500">
              @{poet.instagramHandle}
            </span>
            <ArrowUpRight
              size={16}
              strokeWidth={1.4}
              className="transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* divider + meta */}
          <div className="mt-8 md:mt-10 flex flex-col items-center gap-3">
            <div aria-hidden="true" className="h-px w-12 bg-ink/15" />
            <p className="text-[11px] uppercase tracking-[0.26em] text-whisper">
              {meta}
            </p>
          </div>

          {poet.bio ? (
            <p className="mx-auto mt-8 max-w-[52ch] font-poem text-[16px] md:text-[18px] leading-[1.7] text-ink/80 text-pretty">
              {poet.bio}
            </p>
          ) : null}
        </div>
      </section>

      {/* ───── poems ───── */}
      <section className="relative flex-1 px-6 md:px-12 pb-20 md:pb-28">
        <PoetPoemGrid poetSlug={poet.slug} poems={poems} />
      </section>

      <SiteFooter />
    </main>
  );
}
