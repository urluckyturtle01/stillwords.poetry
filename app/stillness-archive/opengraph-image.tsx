import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "../lib/og";

export const alt = "stillness archive — stillwords";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export default async function OG() {
  return new ImageResponse(
    <OgCard
      eyebrow="stillness archive"
      headline="a quiet, hand-bound archive."
      subheadline="first edition · 1 may."
    />,
    { ...size }
  );
}
