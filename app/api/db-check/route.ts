import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const url = process.env.DB_URL ?? "";
  const info: Record<string, unknown> = {
    db_url_present: url.length > 0,
    db_url_length: url.length,
    db_url_prefix: url.slice(0, 18),
    db_url_host:
      url.match(/@([^/]+)/)?.[1] ?? "(none — not a postgres-style url)",
    starts_with_postgres: /^postgres(ql)?:\/\//.test(url),
    runtime: "nodejs",
    node_env: process.env.NODE_ENV,
    vercel_env: process.env.VERCEL_ENV,
  };

  if (!url) {
    return NextResponse.json(
      { ok: false, stage: "env", error: "DB_URL is empty", info },
      { status: 500 }
    );
  }

  try {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(url);

    const ping = await sql`select 1 as ok` as Array<{ ok: number }>;
    const eds = await sql`
      select count(*)::int as n from editions
    ` as Array<{ n: number }>;
    const poems = await sql`
      select count(*)::int as n from poems
    ` as Array<{ n: number }>;

    return NextResponse.json({
      ok: true,
      info,
      ping: ping[0],
      editions: eds[0]?.n,
      poems: poems[0]?.n,
    });
  } catch (err) {
    const e = err as Error & { code?: string; cause?: unknown };
    return NextResponse.json(
      {
        ok: false,
        stage: "query",
        error: {
          name: e.name,
          message: e.message,
          code: e.code,
          cause: e.cause ? String(e.cause) : undefined,
          stack: e.stack?.split("\n").slice(0, 8),
        },
        info,
      },
      { status: 500 }
    );
  }
}
