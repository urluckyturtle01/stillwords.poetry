import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "stillwords",
  description: "poetry for the space before words",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-serif">{children}</body>
    </html>
  );
}
