import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "../lib/og";

export const alt = "quiet enough — seven pieces of stillness · stillwords";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export default async function OG() {
  return new ImageResponse(
    <OgCard
      eyebrow="the book"
      headline="quiet enough."
      subheadline="seven pieces of stillness."
    />,
    { ...size }
  );
}
