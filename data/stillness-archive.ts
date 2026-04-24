import { ed01 } from "./ed01";

/* ──────────────────────────────────────────────
   types
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
  /** optional translator / editor note, reserved for future issues */
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
  /** ISO date, local to publisher */
  releaseDate: string;
  status: EditionStatus;
  poems: ArchivePoem[];
};

/* ──────────────────────────────────────────────
   registry — one entry per edition, oldest first
   ────────────────────────────────────────────── */

export const editions: Edition[] = [
  {
    number: 1,
    slug: "issue-01",
    label: "Issue 01",
    subtitle: "ten poems on what stays when nothing does.",
    releaseDate: "2026-05-01",
    status: "live",
    poems: ed01,
  },
];

/* ──────────────────────────────────────────────
   helpers
   ────────────────────────────────────────────── */

export function getEditionBySlug(slug: string): Edition | undefined {
  return editions.find((e) => e.slug === slug);
}

export function getPoem(
  editionSlug: string,
  poemSlug: string
):
  | { edition: Edition; poem: ArchivePoem; index: number }
  | undefined {
  const edition = getEditionBySlug(editionSlug);
  if (!edition) return undefined;
  const index = edition.poems.findIndex((p) => p.slug === poemSlug);
  if (index === -1) return undefined;
  return { edition, poem: edition.poems[index], index };
}

/** What comes before and after a poem within its edition. */
export function getPoemNeighbours(
  edition: Edition,
  index: number
): { prev: ArchivePoem | null; next: ArchivePoem | null } {
  return {
    prev: index > 0 ? edition.poems[index - 1] : null,
    next:
      index < edition.poems.length - 1 ? edition.poems[index + 1] : null,
  };
}

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
