"use client";

import { useEffect } from "react";

export default function StillnessArchiveError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[stillness-archive]", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-paper text-ink">
      <div className="max-w-md text-center space-y-4">
        <p className="text-[11px] uppercase tracking-[0.28em] text-whisper">
          something went quiet
        </p>
        <h1 className="font-display italic text-3xl">
          the archive couldn&rsquo;t load.
        </h1>
        <p className="text-sm text-whisper">
          {error.message || "Unknown error"}
        </p>
        {error.digest && (
          <p className="text-[10px] tracking-[0.2em] text-whisper/70">
            digest: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink underline-offset-4 hover:underline"
        >
          try again
        </button>
      </div>
    </main>
  );
}
