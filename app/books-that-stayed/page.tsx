"use client";

import { ArrowLeft, Filter } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
    <main className="min-h-screen flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-[600px] flex flex-col">
        <Link
          href="/"
          className="text-stone-400 hover:text-stone-700 transition-opacity duration-150 mb-10 w-fit"
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </Link>

        <img
          src="/logo.svg"
          alt="stillwords"
          className="w-24 md:w-34 mb-8"
        />

        <h1 className="text-2xl md:text-3xl text-stone-800 mb-3 tracking-tight">
          books that stayed
        </h1>

        <p className="text-base text-stone-500 mb-12 md:mb-14 max-w-lg">
          a quiet reading archive — not a list to finish, only what lingers.
        </p>

        {/* Tabs + filter (dropdown) */}
        <div className="relative mb-12 md:mb-14">
          <div className="flex items-end justify-between gap-4 border-b border-stone-200">
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
                className={`text-sm md:text-base text-left pb-2.5 px-1 -mb-px mr-6 md:mr-8 border-b-2 transition-colors duration-150 ${
                  tab === "reading"
                    ? "text-stone-800 border-stone-800"
                    : "text-stone-400 border-transparent hover:text-stone-600 hover:border-stone-300"
                }`}
              >
                <span className="inline-flex items-baseline gap-1.5">
                  <span>currently reading</span>
                  <span
                    className={`tabular-nums text-xs font-normal ${
                      tab === "reading"
                        ? "text-stone-500"
                        : "text-stone-400"
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
                className={`text-sm md:text-base text-left pb-2.5 px-1 -mb-px border-b-2 transition-colors duration-150 ${
                  tab === "finished"
                    ? "text-stone-800 border-stone-800"
                    : "text-stone-400 border-transparent hover:text-stone-600 hover:border-stone-300"
                }`}
              >
                <span className="inline-flex items-baseline gap-1.5">
                  <span>finished</span>
                  <span
                    className={`tabular-nums text-xs font-normal ${
                      tab === "finished"
                        ? "text-stone-500"
                        : "text-stone-400"
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
                aria-label="Filter by tags"
                onClick={() => setFilterOpen((o) => !o)}
                className={`pb-2.5 px-1 -mb-px text-stone-400 hover:text-stone-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 rounded-sm ${
                  selectedTags.size > 0 ? "text-stone-700" : ""
                }`}
              >
                <Filter size={18} strokeWidth={1.5} className="block" aria-hidden />
              </button>

              {filterOpen && (
                <div
                  id="tag-filter-panel"
                  role="group"
                  aria-label="Filter by tags"
                  className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,17rem)] max-h-[min(70vh,20rem)] overflow-y-auto border border-stone-200/90 bg-stone-50 py-3 pl-3 pr-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                >
                  <p className="pr-1 text-[11px] text-stone-400 tracking-wide mb-2.5">
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
                              className="h-3.5 w-3.5 shrink-0 rounded-sm border-stone-300 text-stone-800 focus:ring-1 focus:ring-stone-400 focus:ring-offset-0"
                            />
                            <span
                              className={`text-sm leading-snug ${
                                on ? "text-stone-800" : "text-stone-500"
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
                    <div className="mt-3 border-t border-stone-200/80 pt-2.5 pr-1">
                      <button
                        type="button"
                        onClick={() => {
                          clearTags();
                        }}
                        className="text-xs text-stone-400 hover:text-stone-600 underline underline-offset-4 decoration-stone-300/80"
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
              <li className="text-sm text-stone-400 py-2">
                nothing matches this filter.
              </li>
            )}
            {filteredReading.map((book, i) => (
              <li
                key={`${book.title}-${book.author}`}
                className={`border-b border-stone-200/90 pb-10 md:pb-12 ${
                  i === 0 ? "" : "pt-10 md:pt-12"
                } last:border-b-0`}
              >
                <p className="text-[11px] md:text-xs text-stone-400 tracking-[0.02em] leading-relaxed mb-3 md:mb-4">
                  {book.tags.join(" · ")}
                </p>
                <p className="text-lg md:text-xl text-stone-800 leading-snug mb-2.5">
                  {book.title}
                  <span className="text-stone-400 font-normal"> — </span>
                  <span className="text-stone-500 text-base md:text-lg font-normal">
                    {book.author}
                  </span>
                </p>
                <p className="text-sm text-stone-400 leading-relaxed">
                  {book.goodreadsRating} on goodreads
                  <span className="text-stone-300 mx-2 select-none">·</span>
                  {/* <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-500 hover:text-stone-800 hover:underline underline-offset-[5px] decoration-stone-300/80 focus:outline-none focus-visible:underline"
                  >
                    amazon →
                  </a>
                  */}
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
              <li className="text-sm text-stone-400 py-2">
                nothing matches this filter.
              </li>
            )}
            {filteredFinished.map((book, i) => (
              <li
                key={`${book.title}-${book.author}`}
                className={`border-b border-stone-200/90 pb-10 md:pb-12 ${
                  i === 0 ? "" : "pt-10 md:pt-12"
                } last:border-b-0`}
              >
                <p className="text-[11px] md:text-xs text-stone-400 tracking-[0.02em] leading-relaxed mb-3 md:mb-4">
                  {book.tags.join(" · ")}
                </p>
                <p className="text-lg md:text-xl text-stone-800 leading-snug mb-2.5">
                  {book.title}
                  <span className="text-stone-400 font-normal"> — </span>
                  <span className="text-stone-500 text-base md:text-lg font-normal">
                    {book.author}
                  </span>
                </p>
                <p className="text-sm text-stone-400 leading-relaxed mb-1">
                  {book.goodreadsRating} on goodreads
                  
                </p>
                <p
                  className={`text-sm text-stone-400 leading-relaxed ${
                    book.reflection ? "mb-4 md:mb-5" : "mb-0"
                  }`}
                >
                  {/* <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-500 hover:text-stone-800 hover:underline underline-offset-[5px] decoration-stone-300/80 focus:outline-none focus-visible:underline"
                  >
                    amazon →
                  </a>
                  */}
                </p>
                {book.reflection ? (
                  <p className="text-sm md:text-[15px] text-stone-500 italic leading-[1.65] max-w-[52ch]">
                    {book.reflection}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <footer className="text-sm text-stone-400 mt-24 md:mt-28">
          © {new Date().getFullYear()} stillwords
        </footer>
      </div>
    </main>
  );
}
