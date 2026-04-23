import type { Metadata } from "next";

/* ──────────────────────────────────────────────
   constants
   ────────────────────────────────────────────── */

export const SITE_URL = "https://stillwordspoetry.com";
export const SITE_NAME = "stillwords";
export const SITE_TAGLINE = "writing for quiet minds";
export const SITE_DESCRIPTION =
  "poetry for the space before words. a quiet home for the work of stillwords — a poet writing slow, lowercase poems for quiet minds.";
export const TWITTER_HANDLE = "@stillwords.poetry";

/* ──────────────────────────────────────────────
   root metadata (app/layout.tsx)
   ────────────────────────────────────────────── */

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "stillwords",
    "stillwords poetry",
    "quiet enough",
    "modern poetry",
    "contemporary poetry",
    "minimalist poetry",
    "lowercase poetry",
    "short poems",
    "poems about stillness",
    "poetry blog",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "poetry",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "poetry for the space before words. slow, lowercase poems and a small book — quiet enough.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: "poetry for the space before words.",
    creator: TWITTER_HANDLE,
    site: TWITTER_HANDLE,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* ──────────────────────────────────────────────
   per-route metadata
   ────────────────────────────────────────────── */

export const aboutMetadata: Metadata = {
  title: "about",
  description:
    "the hand behind stillwords — a poet writing slow, lowercase poems for quiet minds. mornings, tea, one window, one line at a time.",
  openGraph: {
    title: `about — ${SITE_NAME}`,
    description: "the hand behind stillwords. mornings, tea, one window, one line at a time.",
    type: "profile",
    url: "/about",
  },
  twitter: {
    title: `about — ${SITE_NAME}`,
    description: "the hand behind stillwords.",
  },
  alternates: { canonical: "/about" },
};

export const booksThatStayedMetadata: Metadata = {
  title: "books that stayed",
  description:
    "a quiet reading archive — books that shaped the work behind stillwords. poetry, philosophy, and slow, lasting reads.",
  keywords: [
    "reading list",
    "books that shaped me",
    "poetry reading list",
    "stillwords reading",
    "slow reading",
  ],
  openGraph: {
    title: `books that stayed — ${SITE_NAME}`,
    description: "a quiet reading archive — books that shaped the work behind stillwords.",
    type: "website",
    url: "/books-that-stayed",
  },
  twitter: {
    title: `books that stayed — ${SITE_NAME}`,
    description: "a quiet reading archive.",
  },
  alternates: { canonical: "/books-that-stayed" },
};

export const stillnessArchiveMetadata: Metadata = {
  title: "stillness archive",
  description:
    "a quiet, hand-bound archive of stillwords poems. first edition arrives 1 may. submissions open.",
  keywords: [
    "stillness archive",
    "stillwords archive",
    "poetry submissions",
    "hand-bound poetry",
    "poetry first edition",
  ],
  openGraph: {
    title: `stillness archive — ${SITE_NAME}`,
    description:
      "a quiet, hand-bound archive of stillwords poems. first edition arrives 1 may.",
    type: "website",
    url: "/stillness-archive",
  },
  twitter: {
    title: `stillness archive — ${SITE_NAME}`,
    description: "first edition arrives 1 may. submissions open.",
  },
  alternates: { canonical: "/stillness-archive" },
};

export const quietEnoughMetadata: Metadata = {
  title: "quiet enough — seven pieces of stillness",
  description:
    "quiet enough — a small book by stillwords. seven pieces written for moments when nothing needs to be fixed, achieved, or explained. ebook + paperback on amazon.",
  keywords: [
    "quiet enough",
    "quiet enough book",
    "stillwords book",
    "stillwords ebook",
    "poetry book",
    "short poetry book",
    "minimalist poetry book",
    "poems about stillness",
    "buy poetry book",
  ],
  openGraph: {
    title: "quiet enough — seven pieces of stillness",
    description:
      "a small book of seven pieces written for stillness. by stillwords. ebook + paperback.",
    type: "book",
    url: "/quiet-enough",
    images: [
      {
        url: "/book-cover.jpg",
        width: 1200,
        height: 1600,
        alt: "quiet enough — seven pieces of stillness, by stillwords",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `quiet enough — by ${SITE_NAME}`,
    description: "seven pieces of stillness. ebook + paperback.",
    images: ["/book-cover.jpg"],
  },
  alternates: { canonical: "/quiet-enough" },
};

export const notFoundMetadata: Metadata = {
  title: "page not found",
  description: "this page is also quiet — it has nothing to say.",
  robots: { index: false, follow: false },
};

/* ──────────────────────────────────────────────
   json-ld structured data
   ────────────────────────────────────────────── */

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: "poetry for the space before words.",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      alternateName: "still words",
      url: SITE_URL,
      description:
        "a poet writing slow, lowercase poems for quiet minds. author of quiet enough.",
      sameAs: [
        "https://instagram.com/stillwords.poetry",
        "https://stillwordspoetry.substack.com/",
        "https://youtube.com/@stillwords.poetry",
      ],
      jobTitle: "poet",
      knowsAbout: ["poetry", "stillness", "minimalism"],
    },
  ],
};

export const quietEnoughBookJsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "quiet enough",
  alternateName: "quiet enough — seven pieces of stillness",
  bookFormat: ["https://schema.org/EBook", "https://schema.org/Paperback"],
  numberOfPages: 7,
  inLanguage: "en",
  author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  publisher: { "@type": "Person", name: SITE_NAME },
  description:
    "seven pieces written for moments when nothing needs to be fixed, achieved, or explained. they stay with uncertainty, stillness, and the subtle work of becoming.",
  image: `${SITE_URL}/book-cover.jpg`,
  url: `${SITE_URL}/quiet-enough`,
  genre: ["Poetry", "Mindfulness", "Contemporary Poetry"],
  workExample: [
    { "@type": "Book", bookFormat: "https://schema.org/EBook", isbn: "B0GL9L95ZL" },
  ],
};
