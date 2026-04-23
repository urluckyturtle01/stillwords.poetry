import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "../lib/og";

export const alt = "books that stayed — stillwords";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export default async function OG() {
  return new ImageResponse(
    <OgCard
      eyebrow="what stayed"
      headline="a quiet reading archive."
      subheadline="books that shaped the work."
    />,
    { ...size }
  );
}
