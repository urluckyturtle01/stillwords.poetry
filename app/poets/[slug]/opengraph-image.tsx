import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "../../lib/og";
import { getPoetBySlug, getPoets } from "../../lib/archive";

export const alt = "a poet — stillness archive · stillwords";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const match = await getPoetBySlug(slug);
  return [
    {
      id: "main",
      contentType,
      size,
      alt: match ? `${match.poet.name} · stillwords` : alt,
    },
  ];
}

export async function generateStaticParams() {
  const poets = await getPoets();
  return poets.map((p) => ({ slug: p.slug }));
}

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const match = await getPoetBySlug(slug);

  if (!match) {
    return new ImageResponse(
      <OgCard eyebrow="poet" headline="in the archive." />,
      { ...size }
    );
  }

  const { poet, poems } = match;
  const subheadline =
    poems.length === 0
      ? `@${poet.instagramHandle}`
      : `${poems.length} ${poems.length === 1 ? "poem" : "poems"} · @${poet.instagramHandle}`;

  return new ImageResponse(
    <OgCard
      eyebrow="poet"
      headline={poet.name + "."}
      subheadline={subheadline}
    />,
    { ...size }
  );
}
