/**
 * stillwords.poetry — db migrate + seed
 *
 *   pnpm db:reset   (full re-seed)
 *   pnpm db:seed    (idempotent upsert)
 *
 * Reads the schema from db/schema.sql and inserts the existing
 * Issue 01 content from data/ed01.ts.
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { neon } from "@neondatabase/serverless";
import { ed01 } from "../data/ed01";

const url = process.env.DB_URL;
if (!url) {
  console.error("✗ DB_URL not set in .env.local");
  process.exit(1);
}

/**
 * Edition metadata is inlined here (rather than imported from app code)
 * so this seed stays self-contained and the app's data layer can shrink
 * to nothing without breaking the bootstrap path.
 */
const editions = [
  {
    number: 1,
    slug: "issue-01",
    label: "Issue 01",
    subtitle: "ten poems on what stays when nothing does.",
    releaseDate: "2026-05-01",
    status: "live" as const,
    poems: ed01,
  },
];

const sql = neon(url);

const RESET = process.argv.includes("--reset");

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Split a multi-statement SQL string by top-level `;`, respecting `$$ ... $$` blocks. */
function splitSql(src: string): string[] {
  // strip line comments
  src = src.replace(/^\s*--.*$/gm, "");
  const out: string[] = [];
  let buf = "";
  let inDollar = false;
  for (let i = 0; i < src.length; i++) {
    if (src.startsWith("$$", i)) {
      inDollar = !inDollar;
      buf += "$$";
      i += 1;
      continue;
    }
    const c = src[i];
    if (c === ";" && !inDollar) {
      const t = buf.trim();
      if (t) out.push(t);
      buf = "";
    } else {
      buf += c;
    }
  }
  const t = buf.trim();
  if (t) out.push(t);
  return out;
}

async function migrate() {
  const file = resolve(process.cwd(), "db/schema.sql");
  const stmts = splitSql(readFileSync(file, "utf8"));
  for (const stmt of stmts) {
    await sql.query(stmt);
  }
  console.log(`✓ migrated  (${stmts.length} statements)`);
}

async function reset() {
  await sql.query("drop table if exists poems cascade");
  await sql.query("drop table if exists editions cascade");
  await sql.query("drop table if exists poets cascade");
  await sql.query("drop type if exists edition_status");
  console.log("✓ dropped existing tables (--reset)");
}

async function seedPoets() {
  // unique poets from ed01 (one row per author by slug)
  const poets = new Map<
    string,
    { name: string; instagramHandle: string; slug: string }
  >();
  for (const p of ed01) {
    const slug = slugify(p.author.name);
    poets.set(slug, { ...p.author, slug });
  }

  for (const poet of poets.values()) {
    await sql`
      insert into poets (slug, name, instagram_handle)
      values (${poet.slug}, ${poet.name}, ${poet.instagramHandle})
      on conflict (slug) do update set
        name             = excluded.name,
        instagram_handle = excluded.instagram_handle,
        updated_at       = now()
    `;
  }
  console.log(`✓ poets     (${poets.size})`);
  return poets;
}

async function seedEditions() {
  for (const ed of editions) {
    await sql`
      insert into editions (number, slug, label, subtitle, release_date, status)
      values (
        ${ed.number}, ${ed.slug}, ${ed.label}, ${ed.subtitle},
        ${ed.releaseDate}, ${ed.status}::edition_status
      )
      on conflict (number) do update set
        slug         = excluded.slug,
        label        = excluded.label,
        subtitle     = excluded.subtitle,
        release_date = excluded.release_date,
        status       = excluded.status,
        updated_at   = now()
    `;
  }
  console.log(`✓ editions  (${editions.length})`);
}

async function seedPoems() {
  let count = 0;
  for (const ed of editions) {
    const editionRows = (await sql`
      select id from editions where slug = ${ed.slug}
    `) as Array<{ id: string }>;
    const editionId = editionRows[0].id;

    for (let i = 0; i < ed.poems.length; i++) {
      const p = ed.poems[i];
      const poetSlug = slugify(p.author.name);
      const poetRows = (await sql`
        select id from poets where slug = ${poetSlug}
      `) as Array<{ id: string }>;
      const poetId = poetRows[0].id;

      await sql`
        insert into poems
          (edition_id, poet_id, slug, title, lines, preview, note, position)
        values (
          ${editionId}, ${poetId}, ${p.slug}, ${p.title},
          ${p.lines}, ${p.preview}, ${p.note ?? null}, ${i + 1}
        )
        on conflict (edition_id, slug) do update set
          poet_id    = excluded.poet_id,
          title      = excluded.title,
          lines      = excluded.lines,
          preview    = excluded.preview,
          note       = excluded.note,
          position   = excluded.position,
          updated_at = now()
      `;
      count++;
    }
  }
  console.log(`✓ poems     (${count})`);
}

async function main() {
  if (RESET) await reset();
  await migrate();
  await seedPoets();
  await seedEditions();
  await seedPoems();

  const [poetsN] = (await sql`select count(*)::int as n from poets`) as Array<{
    n: number;
  }>;
  const [editionsN] = (await sql`
    select count(*)::int as n from editions
  `) as Array<{ n: number }>;
  const [poemsN] = (await sql`select count(*)::int as n from poems`) as Array<{
    n: number;
  }>;
  console.log("\n  ── totals ──────────");
  console.log(`  poets     ${poetsN.n}`);
  console.log(`  editions  ${editionsN.n}`);
  console.log(`  poems     ${poemsN.n}\n`);
}

main().catch((err) => {
  console.error("\n✗ seed failed:");
  console.error(err);
  process.exit(1);
});
