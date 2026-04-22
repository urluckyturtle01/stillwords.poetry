"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import KeptDrawer from "./KeptDrawer";
import Signature from "./Signature";

interface SiteHeaderProps {
  /** add a `no-print` class so the header is hidden in print views (ebook page) */
  noPrint?: boolean;
}

const navLinks: { href: string; label: string }[] = [
  { href: "/stillness-archive", label: "stillness archive" },
];

/**
 * Shared top chrome: logo on the left, a quiet nav + your kept-lines mark
 * + the still-words signature on the right. Used across every page.
 */
export default function SiteHeader({ noPrint = false }: SiteHeaderProps) {
  const pathname = usePathname();

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-20 px-6 md:px-12 pt-6 md:pt-8 flex items-center justify-between gap-6 ${
        noPrint ? "no-print" : ""
      }`}
    >
      <Link
        href="/"
        aria-label={pathname === "/" ? "stillwords home" : "back to stillwords home"}
        className="block shrink-0"
      >
        <img
          src="/logo.svg"
          alt="stillwords"
          className="w-24 md:w-28 opacity-90"
        />
      </Link>

      <div className="flex items-center gap-4 sm:gap-5 md:gap-7">
        <nav aria-label="primary" className="flex items-center gap-4 sm:gap-5 md:gap-7">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.26em] transition-colors duration-300 ${
                  active ? "text-ink" : "text-whisper hover:text-ink"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span className="sm:hidden">stillness archive</span>
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <KeptDrawer />
       
      </div>
    </header>
  );
}
