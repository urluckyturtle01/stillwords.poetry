import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "../../../lib/og";
import { getEditions, getPoem } from "../../../lib/archive";

export const alt = "a poem — stillness archive · stillwords";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const editions = await getEditions();
  return editions.flatMap((e) =>
    e.poems.map((p) => ({ edition: e.slug, poem: p.slug }))
  );
}

export default async function OG({
  params,
}: {
  params: Promise<{ edition: string; poem: string }>;
}) {
  const { edition, poem } = await params;
  const match = await getPoem(edition, poem);
  const eyebrow = match
    ? match.edition.label.toLowerCase()
    : "stillness archive";
  const headline = match?.poem.title.toLowerCase() ?? "a poem.";
  const subheadline = match ? `— ${match.poem.author.name}` : undefined;

  return new ImageResponse(
    <OgCard eyebrow={eyebrow} headline={headline} subheadline={subheadline} />,
    { ...size }
  );
}
