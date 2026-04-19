import { ImageResponse } from "next/og";
import { selectFeaturedPoem } from "@/data/poems";

export const alt = "stillwords — writing for quiet minds";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OG() {
  const poem = selectFeaturedPoem(new Date());
  const firstLine = poem.lines[0] ?? "writing for quiet minds.";

  return new ImageResponse(
    (
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
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#7A726A",
          }}
        >
          <span>stillwords</span>
          <span style={{ fontStyle: "italic", letterSpacing: 1, textTransform: "none" }}>
            still words
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 950,
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#7A726A",
            }}
          >
            today&rsquo;s breath
          </div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              fontStyle: "italic",
              color: "#1F1B16",
              letterSpacing: -0.5,
            }}
          >
            {firstLine}
          </div>
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
    ),
    { ...size }
  );
}
