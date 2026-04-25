import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "../../../lib/og";
import { getPoetBySlug, getPoetPoem, getPoets } from "../../../lib/archive";

export const alt = "a poem — stillwords";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string; poem: string }>;
}) {
  const { slug, poem } = await params;
  const match = await getPoetPoem(slug, poem);
  return [
    {
      id: "main",
      contentType,
      size,
      alt: match
        ? `${match.poems[match.index].title} — ${match.poet.name} · stillwords`
        : alt,
    },
  ];
}

export async function generateStaticParams() {
  const poets = await getPoets();
  const params: { slug: string; poem: string }[] = [];
  for (const p of poets) {
    const match = await getPoetBySlug(p.slug);
    if (!match) continue;
    for (const poemRow of match.poems) {
      params.push({ slug: p.slug, poem: poemRow.slug });
    }
  }
  return params;
}

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string; poem: string }>;
}) {
  const { slug, poem } = await params;
  const match = await getPoetPoem(slug, poem);

  if (!match) {
    return new ImageResponse(
      <OgCard eyebrow="a poem" headline="in the archive." />,
      { ...size }
    );
  }

  const found = match.poems[match.index];

  return new ImageResponse(
    <OgCard
      eyebrow={match.poet.name}
      headline={found.title.toLowerCase() + "."}
      subheadline={found.preview[0] ?? undefined}
    />,
    { ...size }
  );
}
