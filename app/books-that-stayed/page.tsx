"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Signature from "../components/Signature";
import SiteFooter from "../components/SiteFooter";
import WatercolorBackdrop from "../components/WatercolorBackdrop";
import { currentlyReading, finished } from "@/data/books";
import { bookTags, type BookTag } from "@/data/tags";

type Tab = "reading" | "finished";

function matchesTags(bookTagsList: BookTag[], selected: Set<BookTag>): boolean {
  if (selected.size === 0) return true;
  return bookTagsList.some((t) => selected.has(t));
}

export default function BooksThatStayedPage() {
  const [tab, setTab] = useState<Tab>("reading");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Set<BookTag>>(new Set());
  const filterWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filterOpen) return;

    function handlePointerDown(e: MouseEvent) {
      if (
        filterWrapRef.current &&
        !filterWrapRef.current.contains(e.target as Node)
      ) {
        setFilterOpen(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setFilterOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [filterOpen]);

  const filteredReading = useMemo(
    () => currentlyReading.filter((b) => matchesTags(b.tags, selectedTags)),
    [selectedTags]
  );

  const filteredFinished = useMemo(
    () => finished.filter((b) => matchesTags(b.tags, selectedTags)),
    [selectedTags]
  );

  function toggleTag(tag: BookTag) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  function clearTags() {
    setSelectedTags(new Set());
  }

  return (
    <main className="relative min-h-screen w-full text-ink">
      <WatercolorBackdrop variant={4} intensity={0.4} fixed />

      <header className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 pt-6 md:pt-8 flex items-center justify-between">
        <Link href="/" aria-label="back to stillwords home" className="block">
          <img src="/logo.svg" alt="stillwords" className="w-24 md:w-28 opacity-90" />
        </Link>
        <Signature />
      </header>

      <section className="relative px-6 md:px-12 pt-32 md:pt-40 pb-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-whisper mb-6">
            books that stayed
          </p>
          <h1 className="font-display italic text-4xl md:text-5xl text-ink leading-[1.1] mb-6 text-balance">
            a quiet reading archive.
          </h1>
          <p className="font-poem text-[19px] md:text-xl leading-[1.7] text-ink/80 max-w-[55ch] text-pretty">
            not a list to finish — only what lingers.
          </p>
        </div>
      </section>

      <section className="relative px-6 md:px-12 pb-24">
        <div className="mx-auto max-w-3xl">
          {/* Tabs + filter */}
          <div className="relative mb-12 md:mb-16">
            <div className="flex items-end justify-between gap-4 border-b border-ink/15">
              <div
                className="flex gap-0 min-w-0"
                role="tablist"
                aria-label="reading sections"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "reading"}
                  id="tab-reading"
                  aria-controls="panel-reading"
                  onClick={() => setTab("reading")}
                  className={`text-sm md:text-[15px] text-left pb-3 px-1 -mb-px mr-7 md:mr-10 border-b-2 transition-colors duration-200 uppercase tracking-[0.18em] ${
                    tab === "reading"
                      ? "text-ink border-ink"
                      : "text-whisper border-transparent hover:text-ink/70 hover:border-ink/30"
                  }`}
                >
                  <span className="inline-flex items-baseline gap-1.5">
                    <span>currently reading</span>
                    <span
                      className={`tabular-nums text-[11px] tracking-normal normal-case ${
                        tab === "reading" ? "text-whisper" : "text-whisper/70"
                      }`}
                    >
                      ({filteredReading.length})
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "finished"}
                  id="tab-finished"
                  aria-controls="panel-finished"
                  onClick={() => setTab("finished")}
                  className={`text-sm md:text-[15px] text-left pb-3 px-1 -mb-px border-b-2 transition-colors duration-200 uppercase tracking-[0.18em] ${
                    tab === "finished"
                      ? "text-ink border-ink"
                      : "text-whisper border-transparent hover:text-ink/70 hover:border-ink/30"
                  }`}
                >
                  <span className="inline-flex items-baseline gap-1.5">
                    <span>finished</span>
                    <span
                      className={`tabular-nums text-[11px] tracking-normal normal-case ${
                        tab === "finished" ? "text-whisper" : "text-whisper/70"
                      }`}
                    >
                      ({filteredFinished.length})
                    </span>
                  </span>
                </button>
              </div>

              <div className="relative flex-shrink-0 self-end" ref={filterWrapRef}>
                <button
                  type="button"
                  aria-expanded={filterOpen}
                  aria-haspopup="dialog"
                  aria-controls="tag-filter-panel"
                  onClick={() => setFilterOpen((o) => !o)}
                  className={`pb-3 px-1 -mb-px text-[12px] uppercase tracking-[0.22em] transition-colors duration-200 ${
                    selectedTags.size > 0 || filterOpen
                      ? "text-ink"
                      : "text-whisper hover:text-ink/80"
                  }`}
                >
                  filter
                  {selectedTags.size > 0 && (
                    <span className="ml-1 normal-case tracking-normal text-whisper/80">
                      ({selectedTags.size})
                    </span>
                  )}
                </button>

                {filterOpen && (
                  <div
                    id="tag-filter-panel"
                    role="group"
                    aria-label="filter by tags"
                    className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,18rem)] max-h-[min(70vh,22rem)] overflow-y-auto border border-ink/15 bg-paper py-3 pl-3 pr-2 shadow-[0_12px_40px_rgba(31,27,22,0.10)]"
                  >
                    <p className="pr-1 text-[10px] uppercase tracking-[0.22em] text-whisper mb-3">
                      tags · any match
                    </p>
                    <ul className="m-0 list-none space-y-1.5 p-0 pr-1">
                      {bookTags.map((tag) => {
                        const on = selectedTags.has(tag);
                        return (
                          <li key={tag}>
                            <label className="flex cursor-pointer items-center gap-2.5 select-none py-0.5">
                              <input
                                type="checkbox"
                                checked={on}
                                onChange={() => toggleTag(tag)}
                                className="h-3.5 w-3.5 shrink-0 rounded-sm border-ink/30 text-ink focus:ring-1 focus:ring-mist focus:ring-offset-0"
                              />
                              <span
                                className={`text-sm leading-snug ${
                                  on ? "text-ink" : "text-whisper"
                                }`}
                              >
                                {tag}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                    {selectedTags.size > 0 && (
                      <div className="mt-3 border-t border-ink/10 pt-2.5 pr-1">
                        <button
                          type="button"
                          onClick={clearTags}
                          className="text-[11px] uppercase tracking-[0.22em] text-whisper hover:text-ink"
                        >
                          clear all
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Panel: currently reading */}
          <div
            role="tabpanel"
            id="panel-reading"
            aria-labelledby="tab-reading"
            hidden={tab !== "reading"}
            className={tab !== "reading" ? "hidden" : ""}
          >
            <ul className="m-0 p-0 list-none">
              {filteredReading.length === 0 && (
                <li className="text-sm text-whisper py-3 italic">
                  nothing matches this filter.
                </li>
              )}
              {filteredReading.map((book, i) => (
                <li
                  key={`${book.title}-${book.author}`}
                  className={`border-b border-ink/10 pb-10 md:pb-12 ${
                    i === 0 ? "" : "pt-10 md:pt-12"
                  } last:border-b-0`}
                >
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-whisper leading-relaxed mb-3 md:mb-4">
                    {book.tags.join(" · ")}
                  </p>
                  <p className="font-display italic text-2xl md:text-3xl text-ink leading-snug mb-2.5">
                    {book.title}
                    <span className="text-whisper not-italic font-normal"> — </span>
                    <span className="text-whisper text-lg md:text-xl not-italic font-normal">
                      {book.author}
                    </span>
                  </p>
                  <p className="text-sm text-whisper/80 leading-relaxed">
                    {book.goodreadsRating} on goodreads
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Panel: finished */}
          <div
            role="tabpanel"
            id="panel-finished"
            aria-labelledby="tab-finished"
            hidden={tab !== "finished"}
            className={tab !== "finished" ? "hidden" : ""}
          >
            <ul className="m-0 p-0 list-none">
              {filteredFinished.length === 0 && (
                <li className="text-sm text-whisper py-3 italic">
                  nothing matches this filter.
                </li>
              )}
              {filteredFinished.map((book, i) => (
                <li
                  key={`${book.title}-${book.author}`}
                  className={`border-b border-ink/10 pb-10 md:pb-12 ${
                    i === 0 ? "" : "pt-10 md:pt-12"
                  } last:border-b-0`}
                >
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-whisper leading-relaxed mb-3 md:mb-4">
                    {book.tags.join(" · ")}
                  </p>
                  <p className="font-display italic text-2xl md:text-3xl text-ink leading-snug mb-2.5">
                    {book.title}
                    <span className="text-whisper not-italic font-normal"> — </span>
                    <span className="text-whisper text-lg md:text-xl not-italic font-normal">
                      {book.author}
                    </span>
                  </p>
                  <p className="text-sm text-whisper/80 leading-relaxed mb-1">
                    {book.goodreadsRating} on goodreads
                  </p>
                  {book.reflection ? (
                    <p className="font-poem mt-4 text-[16px] md:text-[17px] text-ink/80 italic leading-[1.7] max-w-[58ch] text-pretty">
                      {book.reflection}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 md:mt-20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.24em] text-whisper hover:text-ink transition-colors duration-300"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              back home
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
