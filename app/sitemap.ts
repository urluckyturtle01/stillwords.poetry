import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/quiet-enough`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/books-that-stayed`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/stillness-archive`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];
}
