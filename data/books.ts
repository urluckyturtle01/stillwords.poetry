import type { BookTag } from "./tags";

export type CurrentlyReadingBook = {
  title: string;
  author: string;
  /** Community average on Goodreads (e.g. "4.2") */
  goodreadsRating: string;
  amazonUrl: string;
  tags: BookTag[];
};

export type FinishedBook = CurrentlyReadingBook & {
  /** Your stars, e.g. "4/5" */
  myRating: string;
  /** e.g. "jun 25, 2024" — omit if unknown */
  finishedOn?: string;
  /** Optional one-line note; omitted when empty */
  reflection?: string;
};

/** Amazon search (stripbooks) — reliable without curating ASINs */
export function amazonSearchUrl(title: string, author: string): string {
  const q = `${title} ${author}`;
  return `https://www.amazon.com/s?k=${encodeURIComponent(q)}&i=stripbooks`;
}

export const currentlyReading: CurrentlyReadingBook[] = [
  {
    title: "crime and punishment",
    author: "fyodor dostoevsky",
    goodreadsRating: "4.29",
    amazonUrl: amazonSearchUrl("Crime and Punishment", "Fyodor Dostoevsky"),
    tags: ["fiction", "philosophy", "inner life"],
  },
];

/** Custom ordered:
 * general → design → self-help → chetan (last)
 * each group sorted by Goodreads desc
 */
export const finished: FinishedBook[] = [
  // -------- GENERAL --------
  {
    title: "man's search for meaning",
    author: "viktor e. frankl",
    goodreadsRating: "4.37",
    amazonUrl: amazonSearchUrl("Man's Search for Meaning", "Viktor E. Frankl"),
    myRating: "4/5",
    finishedOn: "jun 5, 2024",
    tags: ["memoir", "philosophy", "inner life"],
  },
  {
    title: "my favourite nature stories",
    author: "ruskin bond",
    goodreadsRating: "4.37",
    amazonUrl: amazonSearchUrl("My Favourite Nature Stories", "Ruskin Bond"),
    myRating: "5/5",
    finishedOn: "mar 20, 2024",
    tags: ["nature", "fiction", "essays"],
  },
  {
    title: "best of ruskin bond",
    author: "ruskin bond",
    goodreadsRating: "4.30",
    amazonUrl: amazonSearchUrl("Best Of Ruskin Bond", "Ruskin Bond"),
    myRating: "5/5",
    tags: ["fiction", "nature", "essays"],
  },
  {
    title: "a brief history of time",
    author: "stephen hawking",
    goodreadsRating: "4.21",
    amazonUrl: amazonSearchUrl("A Brief History of Time", "Stephen Hawking"),
    myRating: "5/5",
    tags: ["science", "essays"],
  },
  {
    title: "steve jobs",
    author: "walter isaacson",
    goodreadsRating: "4.16",
    amazonUrl: amazonSearchUrl("Steve Jobs Walter Isaacson", "Walter Isaacson"),
    myRating: "5/5",
    tags: ["biography", "business"],
  },
  {
    title: "siddhartha",
    author: "hermann hesse",
    goodreadsRating: "4.08",
    amazonUrl: amazonSearchUrl("Siddhartha", "Hermann Hesse"),
    myRating: "5/5",
    finishedOn: "jun 10, 2024",
    tags: ["fiction", "philosophy", "inner life"],
  },
  {
    title: "metaphysics",
    author: "aristotle",
    goodreadsRating: "4.07",
    amazonUrl: amazonSearchUrl("Metaphysics Aristotle", "Aristotle"),
    myRating: "3/5",
    finishedOn: "jun 5, 2024",
    tags: ["philosophy", "essays"],
  },
  {
    title: "the man in the brown suit",
    author: "agatha christie",
    goodreadsRating: "3.95",
    amazonUrl: amazonSearchUrl(
      "The Man in the Brown Suit",
      "Agatha Christie"
    ),
    myRating: "5/5",
    finishedOn: "jun 7, 2024",
    tags: ["fiction", "mystery"],
  },
  {
    title: "the alchemist",
    author: "paulo coelho",
    goodreadsRating: "3.92",
    amazonUrl: amazonSearchUrl("The Alchemist", "Paulo Coelho"),
    myRating: "3/5",
    finishedOn: "jun 5, 2024",
    tags: ["fiction", "philosophy", "inner life"],
  },
  {
    title: "the fountainhead",
    author: "ayn rand",
    goodreadsRating: "3.89",
    amazonUrl: amazonSearchUrl("The Fountainhead", "Ayn Rand"),
    myRating: "5/5",
    finishedOn: "apr 27, 2024",
    tags: ["fiction", "philosophy"],
  },
  {
    title: "anthem",
    author: "ayn rand",
    goodreadsRating: "3.61",
    amazonUrl: amazonSearchUrl("Anthem", "Ayn Rand"),
    myRating: "5/5",
    finishedOn: "jun 18, 2024",
    tags: ["fiction", "philosophy"],
  },
  {
    title: "the hero: the enduring myth that makes us human",
    author: "lee child",
    goodreadsRating: "3.37",
    amazonUrl: amazonSearchUrl(
      "The Hero The Enduring Myth That Makes Us Human",
      "Lee Child"
    ),
    myRating: "4/5",
    finishedOn: "jun 25, 2024",
    tags: ["essays", "philosophy", "inner life"],
  },

  // -------- DESIGN --------
  {
    title: "don't make me think, revisited",
    author: "steve krug",
    goodreadsRating: "4.24",
    amazonUrl: amazonSearchUrl("Don't Make Me Think Revisited", "Steve Krug"),
    myRating: "5/5",
    finishedOn: "jun 5, 2024",
    tags: ["design", "essays"],
  },
  {
    title: "the design of everyday things",
    author: "donald a. norman",
    goodreadsRating: "4.15",
    amazonUrl: amazonSearchUrl(
      "The Design of Everyday Things",
      "Donald A. Norman"
    ),
    myRating: "5/5",
    finishedOn: "jun 5, 2024",
    tags: ["design", "psychology"],
  },
  {
    title: "thinking with type",
    author: "ellen lupton",
    goodreadsRating: "4.12",
    amazonUrl: amazonSearchUrl("Thinking with Type", "Ellen Lupton"),
    myRating: "5/5",
    finishedOn: "jun 5, 2024",
    tags: ["design", "essays"],
  },
  {
    title: "hooked: how to build habit-forming products",
    author: "nir eyal",
    goodreadsRating: "4.12",
    amazonUrl: amazonSearchUrl("Hooked Nir Eyal", "Nir Eyal"),
    myRating: "5/5",
    finishedOn: "jun 5, 2024",
    tags: ["business", "psychology", "design"],
  },
  {
    title: "interaction of color",
    author: "josef albers",
    goodreadsRating: "3.91",
    amazonUrl: amazonSearchUrl("Interaction of Color", "Josef Albers"),
    myRating: "5/5",
    finishedOn: "jun 5, 2024",
    tags: ["design", "essays"],
  },

  // -------- SELF HELP --------
  {
    title: "the almanack of naval ravikant",
    author: "eric jorgenson",
    goodreadsRating: "4.38",
    amazonUrl: amazonSearchUrl(
      "The Almanack of Naval Ravikant",
      "Eric Jorgenson"
    ),
    myRating: "2/5",
    finishedOn: "jun 5, 2024",
    tags: ["business", "philosophy", "essays"],
  },
  {
    title: "the monk who sold his ferrari",
    author: "robin s. sharma",
    goodreadsRating: "3.89",
    amazonUrl: amazonSearchUrl(
      "The Monk Who Sold His Ferrari",
      "Robin S. Sharma"
    ),
    myRating: "3/5",
    finishedOn: "jun 5, 2024",
    tags: ["fiction", "inner life"],
  },
  {
    title: "who moved my cheese?",
    author: "spencer johnson",
    goodreadsRating: "3.87",
    amazonUrl: amazonSearchUrl("Who Moved My Cheese", "Spencer Johnson"),
    myRating: "5/5",
    finishedOn: "jun 5, 2024",
    tags: ["fiction", "inner life", "business"],
  },
  {
    title: "the 5 am club: own your morning. elevate your life",
    author: "robin s. sharma",
    goodreadsRating: "3.67",
    amazonUrl: amazonSearchUrl("The 5 AM Club", "Robin S. Sharma"),
    myRating: "3/5",
    finishedOn: "jun 5, 2024",
    tags: ["inner life", "essays"],
  },

  // -------- CHETAN (LAST) --------
  {
    title: "2 states: the story of my marriage",
    author: "chetan bhagat",
    goodreadsRating: "3.44",
    amazonUrl: amazonSearchUrl("2 States", "Chetan Bhagat"),
    myRating: "1/5",
    finishedOn: "jun 5, 2024",
    tags: ["fiction"],
  },
];