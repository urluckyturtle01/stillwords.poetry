import { neon } from "@neondatabase/serverless";

const url = process.env.DB_URL;

if (!url || url.trim() === "") {
  throw new Error(
    "DB_URL is not set or is empty. " +
      "Locally: add it to .env.local (postgresql://...?sslmode=require). " +
      "On Vercel: Settings → Environment Variables → make sure DB_URL " +
      "is enabled for Production, Preview AND Development, then redeploy."
  );
}

if (!/^postgres(ql)?:\/\//.test(url)) {
  throw new Error(
    `DB_URL doesn't look like a postgres URL (got: "${url.slice(0, 20)}..."). ` +
      "Expected format: postgresql://user:pass@host/db?sslmode=require"
  );
}

/** Shared Neon HTTP SQL client. Used by every server component that reads
 *  from the stillness archive. With `force-dynamic` pages this runs on
 *  every request, so DB_URL must be present at runtime, not just at build. */
export const sql = neon(url);
