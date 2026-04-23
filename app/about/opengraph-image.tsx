import { ImageResponse } from "next/og";
import { poet } from "@/data/poet";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "../lib/og";

export const alt = "about — stillwords";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export default async function OG() {
  return new ImageResponse(
    <OgCard eyebrow="the hand" headline={poet.signatureLine} />,
    { ...size }
  );
}
