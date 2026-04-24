import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;

function getClient(): NeonQueryFunction<false, false> {
  if (client) return client;

  const url = process.env.DB_URL;
  if (!url || url.trim() === "") {
    throw new Error(
      "DB_URL is missing at runtime. " +
        "On Vercel: Settings → Environment Variables → enable DB_URL " +
        "for Production AND Preview AND Development, then redeploy."
    );
  }
  if (!/^postgres(ql)?:\/\//.test(url)) {
    throw new Error(
      `DB_URL is malformed. It must start with "postgresql://". ` +
        `Got something starting with "${url.slice(0, 12)}".`
    );
  }

  client = neon(url);
  return client;
}

/** Tagged-template proxy that lazily resolves the Neon client on first use,
 *  so a missing DB_URL throws inside our try/catch instead of at import time. */
export const sql = ((...args: Parameters<NeonQueryFunction<false, false>>) => {
  return getClient()(...args);
}) as NeonQueryFunction<false, false>;
