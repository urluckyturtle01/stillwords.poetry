export type TimeOfDay = "morning" | "midday" | "dusk" | "late";

/**
 * Quiet, hand-tuned greetings for the four bands of the day.
 * Local-hour based — the visitor's own time, not the server's.
 */
export function getTimeOfDay(date: Date = new Date()): {
  key: TimeOfDay;
  label: string;
} {
  const h = date.getHours();
  if (h >= 5 && h < 12) return { key: "morning", label: "this morning" };
  if (h >= 12 && h < 17) return { key: "midday", label: "midday quiet" };
  if (h >= 17 && h < 21) return { key: "dusk", label: "as it dims" };
  return { key: "late", label: "after hours" };
}

const dayLabels = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const monthLabels = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

/** "monday · 19 apr" — lowercase, hairline-separated. */
export function getDateLabel(date: Date = new Date()): string {
  const day = dayLabels[date.getDay()];
  const d = date.getDate();
  const m = monthLabels[date.getMonth()];
  return `${day} \u00b7 ${d} ${m}`;
}

/** Pretty short date for kept-line captions: "sat 18 apr" */
export function getShortDateLabel(date: Date = new Date()): string {
  const day = dayLabels[date.getDay()].slice(0, 3);
  const d = date.getDate();
  const m = monthLabels[date.getMonth()];
  return `${day} ${d} ${m}`;
}
