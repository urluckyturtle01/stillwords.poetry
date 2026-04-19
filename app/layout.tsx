import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stillwords.poetry"),
  title: {
    default: "stillwords — writing for quiet minds",
    template: "%s — stillwords",
  },
  description:
    "poetry for the space before words. a quiet home for the work of stillwords — a poet writing for quiet minds.",
  keywords: ["poetry", "stillwords", "quiet enough", "contemporary poetry", "minimalist poetry"],
  authors: [{ name: "stillwords" }],
  creator: "stillwords",
  openGraph: {
    title: "stillwords — writing for quiet minds",
    description: "poetry for the space before words.",
    url: "https://stillwords.poetry",
    siteName: "stillwords",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "stillwords — writing for quiet minds",
    description: "poetry for the space before words.",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4EEE3",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans bg-paper text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
