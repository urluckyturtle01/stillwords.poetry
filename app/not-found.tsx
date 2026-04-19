import Link from "next/link";
import Signature from "./components/Signature";
import WatercolorBackdrop from "./components/WatercolorBackdrop";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full text-ink flex flex-col">
      <WatercolorBackdrop variant={2} intensity={0.45} fixed />

      <header className="relative z-20 px-6 md:px-12 pt-6 md:pt-8 flex items-center justify-between">
        <Link href="/" aria-label="stillwords home" className="block">
          <img src="/logo.svg" alt="stillwords" className="w-24 md:w-28 opacity-90" />
        </Link>
        <Signature />
      </header>

      <section className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-whisper mb-8">
            page · not found
          </p>
          <h1 className="font-display italic text-3xl md:text-5xl leading-[1.18] text-ink text-balance mb-12">
            this page is also quiet —
            <br />
            it has nothing to say.
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.24em] text-ink/80 hover:text-ink underline-offset-[6px] decoration-mist/0 hover:decoration-mist hover:underline"
          >
            return home <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <footer className="relative z-10 px-6 md:px-12 pb-8 text-center">
        <p className="text-xs text-whisper/80 tracking-wide">
          © {new Date().getFullYear()} stillwords
        </p>
      </footer>
    </main>
  );
}
