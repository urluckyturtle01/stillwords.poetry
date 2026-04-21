"use client";

import { useCallback, useEffect, useState } from "react";

export type KeptLine = {
  id: string;
  text: string;
  poemId: string;
  poemTitle: string;
  savedAt: string;
};

const STORAGE_KEY = "stillwords:kept:v1";
const EVENT = "stillwords:kept:change";

function readFromStorage(): KeptLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (k) =>
        k &&
        typeof k.id === "string" &&
        typeof k.text === "string" &&
        typeof k.poemId === "string"
    ) as KeptLine[];
  } catch {
    return [];
  }
}

function writeToStorage(next: KeptLine[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // quota / disabled — fail quietly
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

/**
 * Tiny localStorage-backed collection of "kept" lines.
 * Multiple components stay in sync via a custom event + the native
 * `storage` event (cross-tab).
 *
 * Always returns `[]` during SSR / first paint, then hydrates after mount.
 */
export function useKeptLines() {
  const [kept, setKept] = useState<KeptLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setKept(readFromStorage());
    setHydrated(true);

    const sync = () => setKept(readFromStorage());
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) sync();
    };
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const isKept = useCallback(
    (id: string) => kept.some((k) => k.id === id),
    [kept]
  );

  const toggle = useCallback(
    (line: Omit<KeptLine, "savedAt">): "kept" | "released" => {
      const current = readFromStorage();
      const exists = current.some((k) => k.id === line.id);
      let next: KeptLine[];
      if (exists) {
        next = current.filter((k) => k.id !== line.id);
      } else {
        next = [
          { ...line, savedAt: new Date().toISOString() },
          ...current,
        ];
      }
      writeToStorage(next);
      setKept(next);
      return exists ? "released" : "kept";
    },
    []
  );

  const remove = useCallback((id: string) => {
    const next = readFromStorage().filter((k) => k.id !== id);
    writeToStorage(next);
    setKept(next);
  }, []);

  const clear = useCallback(() => {
    writeToStorage([]);
    setKept([]);
  }, []);

  return { kept, hydrated, isKept, toggle, remove, clear };
}
