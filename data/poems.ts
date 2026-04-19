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

/** Days since 1970-01-01 in UTC — same value globally for ~24h */
function utcDayIndex(date: Date): number {
  return Math.floor(date.getTime() / 86_400_000);
}

/**
 * Pick a featured poem for a given date — deterministic, same for every visitor
 * for the duration of a UTC day. Cycles calmly through the list.
 */
export function selectFeaturedPoem(date: Date = new Date()): FeaturedPoem {
  if (featuredPoems.length === 0) {
    throw new Error("featuredPoems is empty");
  }
  const index = utcDayIndex(date) % featuredPoems.length;
  return featuredPoems[index];
}

/** Used by the "↻ another" link on the homepage to cycle without reload. */
export function nextPoem(currentId: string): FeaturedPoem {
  const i = featuredPoems.findIndex((p) => p.id === currentId);
  const next = (i + 1) % featuredPoems.length;
  return featuredPoems[next];
}
