import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "stillness archive",
  description:
    "a quiet, hand-bound archive of stillwords poems. first edition arrives 1 may.",
  openGraph: {
    title: "stillness archive — stillwords",
    description:
      "a quiet, hand-bound archive of stillwords poems. first edition arrives 1 may.",
    type: "website",
  },
};

export default function StillnessArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
