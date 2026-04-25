import fs from "node:fs";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

const logoSvg = fs.readFileSync(
  path.join(process.cwd(), "public/logo.svg"),
  "utf8"
);
const LOGO = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;
const LOGO_H = 44;
const LOGO_W = Math.round((LOGO_H * 1668) / 394);

function autoHeadline(text: string): number {
  const len = text.length;
  if (len <= 22) return 104;
  if (len <= 38) return 90;
  if (len <= 60) return 72;
  if (len <= 90) return 58;
  return 48;
}

export type OgCardProps = {
  eyebrow: string;
  headline: string;
  subheadline?: string;
};

export function OgCard({ eyebrow, headline, subheadline }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 84px",
        backgroundColor: "#F4EEE3",
        backgroundImage:
          "radial-gradient(circle at 22% 30%, rgba(138,163,166,0.55) 0%, rgba(138,163,166,0) 55%), radial-gradient(circle at 78% 75%, rgba(201,169,110,0.45) 0%, rgba(201,169,110,0) 60%)",
        color: "#1F1B16",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} width={LOGO_W} height={LOGO_H} alt="" style={{ opacity: 0.85 }} />
        <span
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#7A726A",
          }}
        >
          stillwords
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#7A726A",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: autoHeadline(headline),
            lineHeight: 1.05,
            fontStyle: "italic",
            color: "#1F1B16",
            letterSpacing: -0.5,
          }}
        >
          {headline}
        </div>
        {subheadline ? (
          <div
            style={{
              fontSize: 32,
              fontStyle: "italic",
              color: "#7A726A",
              marginTop: 6,
            }}
          >
            {subheadline}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          color: "#7A726A",
          fontSize: 22,
        }}
      >
        <span style={{ fontStyle: "italic" }}>writing for quiet minds.</span>
        <span style={{ letterSpacing: 4, textTransform: "uppercase", fontSize: 18 }}>
          stillwords.poetry
        </span>
      </div>
    </div>
  );
}
