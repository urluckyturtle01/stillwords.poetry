import { neon } from "@neondatabase/serverless";

const url = process.env.DB_URL;

if (!url) {
  throw new Error(
    "DB_URL is not set. Add it to .env.local (postgresql://...?sslmode=require)."
  );
}

/** Shared Neon HTTP SQL client — used at build time for static generation. */
export const sql = neon(url);
