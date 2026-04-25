import Separator from "./Separator";

const outposts = [
  { label: "substack", href: "https://stillwordspoetry.substack.com/" },
  { label: "instagram", href: "https://instagram.com/stillwords.poetry" },
  { label: "youtube", href: "https://youtube.com/@stillwords.poetry" },
  { label: "buy me a coffee", href: "https://buymeacoffee.com/stillwords.poetry" },
];

interface SiteFooterProps {
  /** drop the outposts row when a page already has its own routes layer */
  minimal?: boolean;
  className?: string;
}

export default function SiteFooter({ minimal = false, className = "" }: SiteFooterProps) {
  return (
    <footer
      className={`w-full px-6 md:px-12 pt-16 pb-10 md:pt-20 md:pb-12 text-whisper ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {!minimal && (
          <>
            <Separator className="mb-10 md:mb-12" />
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm md:text-[15px]">
              {outposts.map((o) => (
                <li key={o.label}>
                  <a
                    href={o.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-whisper hover:text-ink transition-colors duration-200 underline-offset-[6px] decoration-mist/0 hover:decoration-mist hover:underline"
                  >
                    {o.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-10 md:mt-14 flex items-end justify-between gap-6">
          <p className="signature text-base md:text-lg text-whisper">still words</p>
          <p className="text-xs md:text-[13px] text-whisper/80 tracking-wide">
            © {new Date().getFullYear()} stillwords · all words remain quiet.
          </p>
        </div>
      </div>
    </footer>
  );
}
