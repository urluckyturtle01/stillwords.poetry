import { cache } from "react";
import { sql } from "./db";
import type {
  ArchivePoem,
  Edition,
  EditionStatus,
} from "../../types/stillness-archive";

/* ──────────────────────────────────────────────
   row shapes coming back from postgres
   ────────────────────────────────────────────── */

interface EditionRow {
  number: number;
  slug: string;
  label: string;
  subtitle: string;
  release_date: string; // forced to text 'YYYY-MM-DD' in queries
  status: EditionStatus;
}

interface PoemRow {
  slug: string;
  title: string;
  lines: string[];
  preview: string[];
  note: string | null;
  position: number;
  poet_name: string;
  poet_handle: string;
}

/* ──────────────────────────────────────────────
   mappers
   ────────────────────────────────────────────── */

function rowToPoem(r: PoemRow): ArchivePoem {
  return {
    slug: r.slug,
    title: r.title,
    lines: r.lines,
    preview: r.preview,
    author: { name: r.poet_name, instagramHandle: r.poet_handle },
    ...(r.note ? { note: r.note } : {}),
  };
}

function rowToEdition(e: EditionRow, poems: ArchivePoem[]): Edition {
  return {
    number: e.number,
    slug: e.slug,
    label: e.label,
    subtitle: e.subtitle,
    releaseDate: e.release_date,
    status: e.status,
    poems,
  };
}

/* ──────────────────────────────────────────────
   queries — wrapped in React.cache so a single
   build pass dedupes identical reads
   ────────────────────────────────────────────── */

export const getEditions = cache(async (): Promise<Edition[]> => {
  const editions = (await sql`
    select
      number, slug, label, subtitle, status,
      to_char(release_date, 'YYYY-MM-DD') as release_date
    from editions
    order by number asc
  `) as EditionRow[];

  if (editions.length === 0) return [];

  // one round trip for every poem in every edition
  const poems = (await sql`
    select
      e.slug              as edition_slug,
      p.slug, p.title, p.lines, p.preview, p.note, p.position,
      pt.name             as poet_name,
      pt.instagram_handle as poet_handle
    from poems p
    join editions e on e.id = p.edition_id
    join poets    pt on pt.id = p.poet_id
    where p.edition_id is not null
    order by e.number asc, p.position asc
  `) as Array<PoemRow & { edition_slug: string }>;

  const grouped = new Map<string, ArchivePoem[]>();
  for (const row of poems) {
    const arr = grouped.get(row.edition_slug) ?? [];
    arr.push(rowToPoem(row));
    grouped.set(row.edition_slug, arr);
  }

  return editions.map((e) => rowToEdition(e, grouped.get(e.slug) ?? []));
});

export const getEditionBySlug = cache(
  async (slug: string): Promise<Edition | undefined> => {
    const editions = (await sql`
      select
        number, slug, label, subtitle, status,
        to_char(release_date, 'YYYY-MM-DD') as release_date
      from editions
      where slug = ${slug}
      limit 1
    `) as EditionRow[];

    if (editions.length === 0) return undefined;

    const poems = (await sql`
      select
        p.slug, p.title, p.lines, p.preview, p.note, p.position,
        pt.name             as poet_name,
        pt.instagram_handle as poet_handle
      from poems p
      join poets pt on pt.id = p.poet_id
      where p.edition_id = (select id from editions where slug = ${slug})
      order by p.position asc
    `) as PoemRow[];

    return rowToEdition(editions[0], poems.map(rowToPoem));
  }
);

export async function getPoem(
  editionSlug: string,
  poemSlug: string
): Promise<
  | { edition: Edition; poem: ArchivePoem; index: number }
  | undefined
> {
  const edition = await getEditionBySlug(editionSlug);
  if (!edition) return undefined;
  const index = edition.poems.findIndex((p) => p.slug === poemSlug);
  if (index === -1) return undefined;
  return { edition, poem: edition.poems[index], index };
}

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
