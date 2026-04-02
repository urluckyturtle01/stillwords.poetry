/**
 * Canonical tag labels for reading lists (currently reading & finished).
 * Use lowercase; separate visually with middot on the page.
 */
export const bookTags = [
  "philosophy",
  "poetry",
  "inner life",
  "fiction",
  "essays",
  "memoir",
  "nature",
  "design",
  "psychology",
  "science",
  "biography",
  "mystery",
  "business",
] as const;

export type BookTag = (typeof bookTags)[number];
