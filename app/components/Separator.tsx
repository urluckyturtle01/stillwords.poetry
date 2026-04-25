interface SeparatorProps {
  /** extra utility classes (margins, etc.) — base look is fixed for consistency */
  className?: string;
}

/**
 * A hairline horizontal divider used across the site.
 * Mirrors the line used in SiteFooter so visual rhythm stays consistent.
 */
export default function Separator({ className = "" }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`h-px w-full bg-ink/10 ${className}`}
    />
  );
}
