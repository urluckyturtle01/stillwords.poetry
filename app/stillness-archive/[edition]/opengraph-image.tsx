import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "../../lib/og";
import { getEditionBySlug, getEditions } from "../../lib/archive";

export const alt = "stillness archive — edition · stillwords";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ edition: string }>;
}) {
  const { edition: slug } = await params;
  const edition = await getEditionBySlug(slug);
  return [
    {
      id: "main",
      contentType,
      size,
      alt: edition
        ? `${edition.label} — stillness archive · stillwords`
        : alt,
    },
  ];
}

export async function generateStaticParams() {
  const editions = await getEditions();
  return editions.map((e) => ({ edition: e.slug }));
}

export default async function OG({
  params,
}: {
  params: Promise<{ edition: string }>;
}) {
  const { edition: slug } = await params;
  const edition = await getEditionBySlug(slug);

  return new ImageResponse(
    <OgCard
      eyebrow="stillness archive"
      headline={edition ? edition.label.toLowerCase() + "." : "an edition."}
      subheadline={edition?.subtitle ?? undefined}
    />,
    { ...size }
  );
}
