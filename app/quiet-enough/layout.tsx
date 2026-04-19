import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "quiet enough — seven pieces of stillness",
  description:
    "quiet enough — a small book by stillwords. seven pieces written for moments when nothing needs to be fixed, achieved, or explained.",
  openGraph: {
    title: "quiet enough — seven pieces of stillness",
    description:
      "a small book of seven pieces written for stillness. by stillwords.",
    type: "book",
  },
};

export default function QuietEnoughLayout({ children }: { children: React.ReactNode }) {
  return children;
}
