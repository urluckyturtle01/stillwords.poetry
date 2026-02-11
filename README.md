# stillwords.poetry

A minimal, contemplative landing page for a poetry project.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Editing Links

To update the links on the landing page, edit the `links` array in `app/page.tsx`:

```typescript
const links = [
  { text: "Instagram", href: "https://instagram.com/stillwords.poetry" },
  { text: "Read Poems", href: "/poems" },
  // ... add or modify links here
];
```

## Design Philosophy

- Ultra-minimal, calm, and contemplative
- Generous whitespace
- Neutral, soft palette (off-white / warm stone / pale grey)
- No unnecessary decoration
- Mobile-first, responsive
- Accessible

## Build for Production

```bash
npm run build
npm start
```

## Deploy

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npx vercel
```
