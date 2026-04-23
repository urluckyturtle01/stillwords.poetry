import { ImageResponse } from "next/og";
import { selectFeaturedPoem } from "@/data/poems";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "./lib/og";

export const alt = "stillwords — writing for quiet minds";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = "force-static";

export default async function OG() {
  const poem = selectFeaturedPoem(new Date());
  return new ImageResponse(
    <OgCard eyebrow="today's breath" headline={poem.lines[0] ?? "writing for quiet minds."} />,
    { ...size }
  );
}
