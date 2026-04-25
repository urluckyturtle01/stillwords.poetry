import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DB_URL!);

async function main() {
  const rows = (await sql`
    select
      e.label              as edition,
      e.release_date,
      p.position,
      p.title,
      pt.name              as poet,
      pt.instagram_handle  as ig,
      array_length(p.lines, 1)   as line_count,
      array_length(p.preview, 1) as preview_count
    from poems p
    join editions e on e.id = p.edition_id
    join poets pt on pt.id = p.poet_id
    order by e.number, p.position
  `) as Array<Record<string, unknown>>;
  console.table(rows);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
