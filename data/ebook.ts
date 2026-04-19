export type AmazonStore = {
  link: string;
  price: string;
  paperback: string;
};

export type CountryKey =
  | "us"
  | "india"
  | "uk"
  | "germany"
  | "france"
  | "spain"
  | "italy"
  | "netherlands"
  | "japan"
  | "brazil"
  | "canada"
  | "mexico"
  | "australia";

export const countryLabels: Record<CountryKey, string> = {
  us: "united states",
  india: "india",
  uk: "united kingdom",
  germany: "germany",
  france: "france",
  spain: "spain",
  italy: "italy",
  netherlands: "netherlands",
  japan: "japan",
  brazil: "brazil",
  canada: "canada",
  mexico: "mexico",
  australia: "australia",
};

export const amazonData: Record<CountryKey, AmazonStore> = {
  us: { link: "https://www.amzn.com/dp/B0GL9L95ZL", price: "$2.49", paperback: "$4.60" },
  india: { link: "https://www.amazon.in/dp/B0GL9L95ZL", price: "₹129", paperback: "—" },
  uk: { link: "https://www.amazon.co.uk/dp/B0GL9L95ZL", price: "£1.99", paperback: "£3.86" },
  germany: { link: "https://www.amazon.de/dp/B0GL9L95ZL", price: "€2.10", paperback: "€4.10" },
  france: { link: "https://www.amazon.fr/dp/B0GL9L95ZL", price: "€2.10", paperback: "€4.10" },
  spain: { link: "https://www.amazon.es/dp/B0GL9L95ZL", price: "€2.10", paperback: "€4.10" },
  italy: { link: "https://www.amazon.it/dp/B0GL9L95ZL", price: "€2.10", paperback: "€4.10" },
  netherlands: { link: "https://www.amazon.nl/dp/B0GL9L95ZL", price: "€2.10", paperback: "€4.10" },
  japan: { link: "https://www.amazon.co.jp/dp/B0GL9L95ZL", price: "¥382", paperback: "¥844" },
  brazil: { link: "https://www.amazon.com.br/dp/B0GL9L95ZL", price: "R$8.00", paperback: "—" },
  canada: { link: "https://www.amazon.ca/dp/B0GL9L95ZL", price: "$3.38 CAD", paperback: "$6.29 CAD" },
  mexico: { link: "https://www.amazon.com.mx/dp/B0GL9L95ZL", price: "$42.82 MXN", paperback: "—" },
  australia: { link: "https://www.amazon.com.au/dp/B0GL9L95ZL", price: "$3.49 AUD", paperback: "$9.48 AUD" },
};

export const ebook = {
  title: "quiet enough",
  subtitle: "seven pieces of stillness",
  description:
    "these seven pieces were written slowly during moments when nothing needed to be fixed, achieved, or explained. they do not offer lessons or conclusions. they stay with uncertainty, stillness, and the subtle work of becoming.",
  whyItExists: [
    "i wrote these in the margins of an ordinary year. mornings mostly. one window, one cup, one line at a time.",
    "the book is small on purpose. seven pieces, no more. it is meant to be read once, then kept on a shelf — the kind of small you return to when the day is loud.",
  ],
  /** the first piece, set as the on-page sample */
  sample: {
    title: "i. quiet enough",
    lines: [
      "let the room be unfinished.",
      "let the cup go cool",
      "in your hand.",
      "",
      "you are not behind.",
      "you are not ahead.",
      "you are exactly",
      "where the noise",
      "cannot find you.",
      "",
      "this is enough.",
      "this is quiet enough.",
    ],
  },
};
