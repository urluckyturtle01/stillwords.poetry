import StillnessArchiveClient from "../components/StillnessArchiveClient";
import { getEditions } from "../lib/archive";

// always render on request — db is the source of truth
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

/* ──────────────────────────────────────────────
   upcoming editions teased on the index — these
   are still hand-curated; once an edition is in
   postgres with status='live' it shows above.
   ────────────────────────────────────────────── */

const upcoming: { label: string; releaseDate: string }[] = [
  { label: "Issue 02", releaseDate: "2026-06-01" },
  { label: "Issue 03", releaseDate: "2026-07-01" },
];

export default async function StillnessArchivePage() {
  try {
    const all = await getEditions();
    const liveEditions = all.filter((e) => e.status === "live");

    return (
      <StillnessArchiveClient
        liveEditions={liveEditions}
        upcoming={upcoming}
      />
    );
  } catch (err) {
    // log full server-side
    console.error("[stillness-archive] DB read failed:", err);

    // surface the real reason in the page so we can debug on Vercel
    // without needing function-log access
    const message =
      err instanceof Error ? err.message : "Unknown error reading editions";
    const stack = err instanceof Error ? err.stack : undefined;

    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-paper text-ink">
        <div className="max-w-2xl w-full space-y-4 text-left">
          <p className="text-[11px] uppercase tracking-[0.28em] text-whisper">
            archive · debug
          </p>
          <h1 className="font-display italic text-2xl">
            DB read failed.
          </h1>
          <pre className="text-xs whitespace-pre-wrap break-all rounded bg-black/5 p-3 text-ink/80">
            {message}
          </pre>
          {stack && (
            <details className="text-[11px] text-whisper">
              <summary className="cursor-pointer">stack</summary>
              <pre className="mt-2 whitespace-pre-wrap break-all">
                {stack}
              </pre>
            </details>
          )}
          <p className="text-[11px] tracking-[0.2em] text-whisper">
            DB_URL present: {process.env.DB_URL ? "yes" : "no"} · length:{" "}
            {process.env.DB_URL?.length ?? 0}
          </p>
        </div>
      </main>
    );
  }
}
