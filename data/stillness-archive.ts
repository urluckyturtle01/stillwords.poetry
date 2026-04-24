/* ──────────────────────────────────────────────
   shared types + pure helpers for the
   stillness archive. data lives in postgres now —
   see app/lib/archive.ts for the queries.
   ────────────────────────────────────────────── */

export type ArchiveAuthor = {
  name: string;
  /** handle without the @ sign. e.g. "priyawrites" */
  instagramHandle: string;
};

export type ArchivePoem = {
  /** url-safe identifier, unique within an edition */
  slug: string;
  title: string;
  /** full poem — empty strings are rendered as stanza breaks */
  lines: string[];
  /** standalone fragment shown on the bento card (no ellipsis) */
  preview: string[];
  author: ArchiveAuthor;
  /** optional translator / editor note */
  note?: string;
};

export type EditionStatus = "upcoming" | "live";

export type Edition = {
  /** 1, 2, 3 … */
  number: number;
  /** url slug, e.g. "issue-01" */
  slug: string;
  /** display label, e.g. "Issue 01" */
  label: string;
  /** one-liner subheadline shown under the heading on the edition page */
  subtitle: string;
  /** ISO date "YYYY-MM-DD", local to publisher */
  releaseDate: string;
  status: EditionStatus;
  poems: ArchivePoem[];
};

/* ──────────────────────────────────────────────
   pure helpers (no data access)
   ────────────────────────────────────────────── */

/** "May 1, 2026" — stable, timezone-safe format for a YYYY-MM-DD string. */
export function formatReleaseDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function instagramUrl(handle: string): string {
  return `https://instagram.com/${handle}`;
}
