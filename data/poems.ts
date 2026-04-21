export type FeaturedPoem = {
  id: string;
  title: string;
  lines: string[];
};

/**
 * Featured poems — hand-picked from the stillwords.poetry instagram feed.
 * Edit, reorder, or extend this list to change what the homepage shows.
 *
 * One poem is featured per UTC day. The list rotates calmly: same poem
 * for everyone for ~24h, then the next one.
 */
export const featuredPoems: FeaturedPoem[] = [
  {
    id: "reflection",
    title: "reflection",
    lines: [
      "not mine",
      "this weight.",
      "yesterday",
      "pretending to be me.",
      "reflection loosens it.",
      "what falls",
      "was never held.",
      "silence stays.",
    ],
  },
  {
    id: "shape-of-loss",
    title: "i am learning the shape of loss",
    lines: [
      "loss",
      "is not",
      "a border,",
      "a horizon.",
      "a clearing",
      "where",
      "the self",
      "unfurls.",
    ],
  },
  {
    id: "time",
    title: "time",
    lines: [
      "sand falls into white.",
      "breath stops within the ticking.",
      "time is the silence.",
    ],
  },
  {
    id: "dot",
    title: "dot",
    lines: [
      "the prism",
      "broke.",
      "the seven",
      "bled white.",
      "ash sighs.",
      "light dies.",
      "be.",
    ],
  },
  {
    id: "self-sown",
    title: "self-sown",
    lines: [
      "vine braids vine.",
      "the eye",
      "is the forest",
      "dreaming",
      "it is lost.",
    ],
  },
  {
    id: "kinetic-grave",
    title: "kinetic grave",
    lines: [
      "the clock",
      "is a cemetery.",
      "geometry",
      "weeps.",
      "there is no then.",
      "only",
      "the friction",
      "of being.",
    ],
  },
  {
    id: "sunrise",
    title: "sunrise",
    lines: [
      "gold dawn, inner sun.",
      "the sunrise dissolves the dark.",
      "one light breathes in all.",
    ],
  },
  {
    id: "the-breath-heist",
    title: "the breath heist",
    lines: [
      "the sky",
      "is using",
      "your throat",
      "as a back door.",
      "you aren't",
      "the driver.",
      "you're just",
      "the engine's",
      "heat.",
    ],
  },
];

/** Local-time yyyy-mm-dd key — rolls over at the visitor's own midnight. */
function localDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Stable, tiny string hash (djb2-ish). */
function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Pick a featured poem for a given date — deterministic and stable for the
 * whole local day. Two visits the same day (same browser timezone) get the
 * same poem; tomorrow gets a new one.
 */
export function selectFeaturedPoem(date: Date = new Date()): FeaturedPoem {
  if (featuredPoems.length === 0) {
    throw new Error("featuredPoems is empty");
  }
  const index = hashString(localDateKey(date)) % featuredPoems.length;
  return featuredPoems[index];
}

/** Used by the "↻ another" link on the homepage to cycle without reload. */
export function nextPoem(currentId: string): FeaturedPoem {
  const i = featuredPoems.findIndex((p) => p.id === currentId);
  const next = (i + 1) % featuredPoems.length;
  return featuredPoems[next];
}

/**
 * Pick a random featured poem — used on each page refresh so the homepage
 * shows a different breath every visit.
 */
export function randomPoem(): FeaturedPoem {
  const i = Math.floor(Math.random() * featuredPoems.length);
  return featuredPoems[i];
}
