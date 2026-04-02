import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "books that stayed — stillwords",
  description: "a quiet reading archive",
};

export default function BooksThatStayedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
