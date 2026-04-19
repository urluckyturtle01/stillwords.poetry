"use client";

import { useEffect, useId, useRef, useState } from "react";
import { type CountryKey, countryLabels } from "@/data/ebook";

interface CountrySelectProps {
  value: CountryKey | "";
  onChange: (key: CountryKey) => void;
  placeholder?: string;
}

const ORDER: CountryKey[] = [
  "us",
  "india",
  "uk",
  "germany",
  "france",
  "spain",
  "italy",
  "netherlands",
  "japan",
  "brazil",
  "canada",
  "mexico",
  "australia",
];

export default function CountrySelect({
  value,
  onChange,
  placeholder = "select your country",
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const i = value ? ORDER.indexOf(value) : 0;
      setActiveIdx(i < 0 ? 0 : i);
    }
  }, [open, value]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (open) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => (i + 1) % ORDER.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => (i - 1 + ORDER.length) % ORDER.length);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onChange(ORDER[activeIdx]);
        setOpen(false);
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveIdx(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveIdx(ORDER.length - 1);
      }
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between gap-3 border-b border-ink/20 hover:border-ink/40 focus-visible:border-ink/60 px-1 py-3 text-left text-[15px] md:text-base text-ink transition-colors"
      >
        <span className={value ? "text-ink" : "text-whisper"}>
          {value ? countryLabels[value] : placeholder}
        </span>
        <span aria-hidden className="text-whisper text-sm transition-transform duration-300" style={{ transform: open ? "rotate(180deg)" : "none" }}>
          ▾
        </span>
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="country"
          className="absolute z-30 left-0 right-0 mt-2 max-h-72 overflow-y-auto bg-paper border border-ink/15 shadow-[0_12px_40px_rgba(31,27,22,0.10)]"
        >
          {ORDER.map((key, i) => {
            const selected = value === key;
            const active = activeIdx === i;
            return (
              <li
                key={key}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(key);
                  setOpen(false);
                }}
                className={`px-4 py-2.5 text-[15px] cursor-pointer transition-colors duration-150 ${
                  active ? "bg-bone text-ink" : "text-ink/80"
                } ${selected ? "italic" : ""}`}
              >
                {countryLabels[key]}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
