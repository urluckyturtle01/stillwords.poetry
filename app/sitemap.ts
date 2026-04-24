import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";
import { editions } from "../data/stillness-archive";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/quiet-enough`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/books-that-stayed`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/stillness-archive`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];

  const editionRoutes: MetadataRoute.Sitemap = editions.map((e) => ({
    url: `${SITE_URL}/stillness-archive/${e.slug}`,
    lastModified: new Date(e.releaseDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const poemRoutes: MetadataRoute.Sitemap = editions.flatMap((e) =>
    e.poems.map((p) => ({
      url: `${SITE_URL}/stillness-archive/${e.slug}/${p.slug}`,
      lastModified: new Date(e.releaseDate),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  );

  return [...staticRoutes, ...editionRoutes, ...poemRoutes];
}
