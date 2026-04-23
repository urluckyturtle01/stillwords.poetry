import type { MetadataRoute } from "next";
import { SITE_NAME } from "./lib/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: "poetry for the space before words.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4EEE3",
    theme_color: "#F4EEE3",
    orientation: "portrait",
    categories: ["books", "lifestyle"],
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
