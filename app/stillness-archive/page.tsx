import StillnessArchiveClient from "../components/StillnessArchiveClient";
import { getEditions } from "../lib/archive";

export const dynamic = "force-static";

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
  const all = await getEditions();
  const liveEditions = all.filter((e) => e.status === "live");

  return (
    <StillnessArchiveClient
      liveEditions={liveEditions}
      upcoming={upcoming}
    />
  );
}
