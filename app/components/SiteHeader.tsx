"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import KeptDrawer from "./KeptDrawer";

interface SiteHeaderProps {
  /** add a `no-print` class so the header is hidden in print views (ebook page) */
  noPrint?: boolean;
}

const navLinks: { href: string; label: string }[] = [
  { href: "/about", label: "about" },
  { href: "/quiet-enough", label: "quiet enough" },
  { href: "/books-that-stayed", label: "books that stayed" },
  { href: "/stillness-archive", label: "stillness archive" },
];

/**
 * World-class site header.
 *
 *  - fixed at top across every page
 *  - transparent over the hero, fades in a glass/paper background once the
 *    user has scrolled past 16px (subtle, never abrupt)
 *  - desktop: full primary nav with a sliding underline indicator for the
 *    active route + soft hover state
 *  - mobile: minimal hamburger trigger that opens a calm full-screen overlay
 *    with large italic links — closes on tap, escape, or route change
 *  - keeps the KeptDrawer trigger for kept lines
 */
export default function SiteHeader({ noPrint = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // scroll-aware background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // lock body scroll + escape-to-close while menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-out ${
          noPrint ? "no-print" : ""
        } ${
          scrolled || menuOpen
            ? "bg-paper/85 backdrop-blur-md border-b border-ink/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-6 px-6 md:px-12 transition-[padding] duration-500 ease-out ${
            scrolled ? "py-3 md:py-4" : "py-5 md:py-6"
          }`}
        >
          {/* logo */}
          <Link
            href="/"
            aria-label={
              pathname === "/" ? "stillwords home" : "back to stillwords home"
            }
            className="block shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/logo.svg"
              alt="stillwords"
              className={`opacity-90 transition-[width] duration-500 ease-out ${
                scrolled ? "w-20 md:w-24" : "w-24 md:w-28"
              }`}
            />
          </Link>

          {/* right cluster: nav + kept + mobile trigger, anchored to the right edge so the logo's size change never shifts them */}
          <div className="flex items-center gap-5 md:gap-7 lg:gap-9">
            <nav
              aria-label="primary"
              className="hidden md:flex items-center gap-7 lg:gap-9"
            >
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative text-[11px] uppercase tracking-[0.26em] transition-colors duration-300 ${
                      active ? "text-ink" : "text-whisper hover:text-ink"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-px bg-ink transition-all duration-500 ease-out ${
                        active
                          ? "w-6 opacity-100"
                          : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-60"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <KeptDrawer />

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "close menu" : "open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="md:hidden inline-flex h-10 w-10 items-center justify-center -mr-2 text-ink/80 hover:text-ink transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-ink/30 rounded-sm"
              >
                {menuOpen ? (
                  <X size={20} strokeWidth={1.4} />
                ) : (
                  <Menu size={20} strokeWidth={1.4} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-nav"
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="primary navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-20 md:hidden bg-paper/95 backdrop-blur-md no-print"
            onClick={() => setMenuOpen(false)}
          >
            {/* warm wash so the menu doesn't feel sterile */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div
                className="absolute rounded-full"
                style={{
                  top: "12%",
                  left: "-20%",
                  width: "75%",
                  height: "55%",
                  background: "rgb(138,163,166)",
                  opacity: 0.35,
                  filter: "blur(100px)",
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  bottom: "8%",
                  right: "-20%",
                  width: "75%",
                  height: "55%",
                  background: "rgb(201,169,110)",
                  opacity: 0.35,
                  filter: "blur(110px)",
                }}
              />
            </div>

            <nav
              aria-label="primary"
              className="relative h-full flex flex-col items-start justify-center gap-7 px-8"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={
                      reduced
                        ? { opacity: 0 }
                        : { opacity: 0, x: -14, filter: "blur(4px)" }
                    }
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.55,
                      delay: 0.12 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`font-display italic text-[34px] leading-[1.1] transition-colors duration-300 ${
                        active ? "text-ink" : "text-ink/70 hover:text-ink"
                      }`}
                    >
                      {link.label}
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="ml-2 inline-block h-[6px] w-[6px] -translate-y-2 rounded-full bg-ochre/80"
                        />
                      ) : null}
                    </Link>
                  </motion.div>
                );
              })}

              {/* small grace note at the bottom */}
              <motion.p
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.12 + navLinks.length * 0.06 + 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-10 left-8 right-8 text-[10px] uppercase tracking-[0.3em] text-whisper"
              >
                stillwords · written quiet
              </motion.p>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
