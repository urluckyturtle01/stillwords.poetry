import { quietEnoughBookJsonLd } from "../lib/seo";

export { quietEnoughMetadata as metadata } from "../lib/seo";

export default function QuietEnoughLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quietEnoughBookJsonLd) }}
      />
      {children}
    </>
  );
}
