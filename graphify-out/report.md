# Graph Report - .  (2026-04-23)

## Corpus Check
- Corpus is ~16,182 words - fits in a single context window. You may not need a graph.

## Summary
- 128 nodes · 114 edges · 36 communities detected
- Extraction: 69% EXTRACTED · 30% INFERRED · 1% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Daily poem rotation & date-anchored hero|Daily poem rotation & date-anchored hero]]
- [[_COMMUNITY_Header chrome, motion primitives & hero interactions|Header chrome, motion primitives & hero interactions]]
- [[_COMMUNITY_Quiet Enough ebook page & purchase modal|Quiet Enough ebook page & purchase modal]]
- [[_COMMUNITY_Books that stayed, poet bio & footer outposts|Books that stayed, poet bio & footer outposts]]
- [[_COMMUNITY_Watercolor wash assets (sage  ochre palette)|Watercolor wash assets (sage / ochre palette)]]
- [[_COMMUNITY_Books page — tag-filter interactions|Books page — tag-filter interactions]]
- [[_COMMUNITY_Kept-lines storage hook (localStorage + cross-tab sync)|Kept-lines storage hook (localStorage + cross-tab sync)]]
- [[_COMMUNITY_Per-route metadata layouts|Per-route metadata layouts]]
- [[_COMMUNITY_Brand identity — logo, book cover, monochrome aesthetic|Brand identity — logo, book cover, monochrome aesthetic]]
- [[_COMMUNITY_Root layout, palette & design philosophy|Root layout, palette & design philosophy]]
- [[_COMMUNITY_CountrySelect keyboard & pointer handlers|CountrySelect keyboard & pointer handlers]]
- [[_COMMUNITY_Watercolor backdrops & cursor ink halo (ambient ink)|Watercolor backdrops & cursor ink halo (ambient ink)]]
- [[_COMMUNITY_Quiet route stubs (404 + Stillness Archive teaser)|Quiet route stubs (404 + Stillness Archive teaser)]]
- [[_COMMUNITY_KeepableLines toggle handler|KeepableLines toggle handler]]
- [[_COMMUNITY_KeptDrawer keyboard handling|KeptDrawer keyboard handling]]
- [[_COMMUNITY_PostCSS  Tailwind build pipeline|PostCSS / Tailwind build pipeline]]
- [[_COMMUNITY_Three-door home navigation|Three-door home navigation]]
- [[_COMMUNITY_Favicon brand monogram|Favicon brand monogram]]
- [[_COMMUNITY_Paper grain overlay (SVG fractal noise)|Paper grain overlay (SVG fractal noise)]]
- [[_COMMUNITY_postcss.config.mjs|postcss.config.mjs]]
- [[_COMMUNITY_next-env.d.ts|next-env.d.ts]]
- [[_COMMUNITY_tailwind.config.ts|tailwind.config.ts]]
- [[_COMMUNITY_next.config.ts|next.config.ts]]
- [[_COMMUNITY_opengraph-image.tsx|opengraph-image.tsx]]
- [[_COMMUNITY_layout.tsx|layout.tsx]]
- [[_COMMUNITY_page.tsx|page.tsx]]
- [[_COMMUNITY_page.tsx|page.tsx]]
- [[_COMMUNITY_page.tsx|page.tsx]]
- [[_COMMUNITY_SiteFooter.tsx|SiteFooter.tsx]]
- [[_COMMUNITY_HeroWatercolor.tsx|HeroWatercolor.tsx]]
- [[_COMMUNITY_WatercolorBackdrop.tsx|WatercolorBackdrop.tsx]]
- [[_COMMUNITY_ebook.ts|ebook.ts]]
- [[_COMMUNITY_tags.ts|tags.ts]]
- [[_COMMUNITY_poet.ts|poet.ts]]
- [[_COMMUNITY_SiteFooter component|SiteFooter component]]
- [[_COMMUNITY_navLinks list|navLinks list]]

## God Nodes (most connected - your core abstractions)
1. `selectFeaturedPoem fn` - 6 edges
2. `Home page — hero poem + three doors` - 6 edges
3. `Books That Stayed — reading archive with tag filter` - 5 edges
4. `SiteHeader component` - 4 edges
5. `EbookModal component` - 4 edges
6. `useKeptLines — localStorage kept-lines hook` - 4 edges
7. `Quiet Enough — book sales page` - 4 edges
8. `RootLayout — global shell, fonts, AnnouncementBar` - 4 edges
9. `About page — the hand, rhythm, on the desk, finding` - 4 edges
10. `featuredPoems list` - 4 edges

## Surprising Connections (you probably didn't know these)
- `EbookModal component` --semantically_similar_to--> `ebook content object`  [INFERRED] [semantically similar]
  app/components/EbookModal.tsx → data/ebook.ts
- `Design philosophy — quiet/minimal/neutral` --rationale_for--> `Quiet color palette (paper/ink/mist/ochre/bone/whisper)`  [INFERRED]
  README.md → tailwind.config.ts
- `Design philosophy — quiet/minimal/neutral` --rationale_for--> `RootLayout — global shell, fonts, AnnouncementBar`  [INFERRED]
  README.md → app/layout.tsx
- `Editing links guide (worldCards rationale)` --rationale_for--> `worldCards — three-door navigation data`  [INFERRED]
  README.md → app/page.tsx
- `amazonData (inline duplicate)` --semantically_similar_to--> `amazonData (canonical)`  [INFERRED] [semantically similar]
  app/components/EbookModal.tsx → data/ebook.ts

## Hyperedges (group relationships)
- **WatercolorBackdrop applied across every route** — page_home, not_found_notfound, page_about, page_stillnessarchivepage, page_quietenoughpage, page_booksthatstayedpage [EXTRACTED 0.95]
- **Quiet/minimal design system implementation** — readme_design_philosophy, tailwind_palette, tailwind_breath_animations, layout_metadata, layout_viewport [INFERRED 0.80]
- **ArrowLeft 'back home' link on inner pages** — not_found_notfound, page_about, page_stillnessarchivepage, page_quietenoughpage, page_booksthatstayedpage [EXTRACTED 0.90]
- **Components painting watercolor washes via mixBlendMode multiply** — herowatercolor_herowatercolor, watercolorbackdrop_watercolorbackdrop, cursorink_cursorink [INFERRED 0.90]
- **Data modules driving page content (poems, books, ebook, poet)** — poems_featuredpoems, books_finished, ebook_ebook, poet_poet [INFERRED 0.85]
- **Kept-lines flow: select line, persist, view in drawer** — keepablelines_keepablelines, keptdrawer_keptdrawer, siteheader_siteheader [INFERRED 0.90]

## Communities

### Community 0 - "Daily poem rotation & date-anchored hero"
Cohesion: 0.19
Nodes (13): Next.js static export config, OG image — today's breath card, Home page — hero poem + three doors, featuredPoems list, hashString djb2 helper, localDateKey helper, nextPoem fn, randomPoem fn (+5 more)

### Community 1 - "Header chrome, motion primitives & hero interactions"
Cohesion: 0.15
Nodes (8): AnnouncementBar component, KeepableLines component, KeptDrawer notebook, KeptItem row, RevealLines staggered text, SiteHeader component, SmoothScroll Lenis wrapper, usePrefersReducedMotion — matchMedia hook

### Community 2 - "Quiet Enough ebook page & purchase modal"
Cohesion: 0.18
Nodes (9): CountrySelect combobox, ORDER country key list, amazonData (canonical), countryLabels map, ebook content object, amazonData (inline duplicate), EbookModal component, LinkButton component (+1 more)

### Community 3 - "Books that stayed, poet bio & footer outposts"
Cohesion: 0.25
Nodes (9): amazonSearchUrl helper, currentlyReading list, finished books list, About page — the hand, rhythm, on the desk, finding, Books That Stayed — reading archive with tag filter, poet bio object, Signature wordmark, outposts links list (+1 more)

### Community 4 - "Watercolor wash assets (sage / ochre palette)"
Cohesion: 0.32
Nodes (8): Paper Texture & Watercolor Aesthetic, Watercolor Wash 01 (Sage & Gold), Warm-Cool Diagonal Palette (Sage NE / Ochre SW), Wash 02 — Sage & Ochre Watercolor, Paper Texture & Watercolor Aesthetic, Wash 03 — Sage & Gold Watercolor, Wash 04 Palette — Sage Teal, Warm Ochre, Muted Green, Wash 04 — Sage & Ochre Watercolor Background

### Community 5 - "Books page — tag-filter interactions"
Cohesion: 0.33
Nodes (1): matchesTags — tag-set membership filter

### Community 6 - "Kept-lines storage hook (localStorage + cross-tab sync)"
Cohesion: 0.33
Nodes (3): KeptLine type, Cross-tab storage sync pattern (custom event + storage event), useKeptLines — localStorage kept-lines hook

### Community 7 - "Per-route metadata layouts"
Cohesion: 0.33
Nodes (3): BooksThatStayedLayout — page metadata, QuietEnoughLayout — book metadata, StillnessArchiveLayout — page metadata

### Community 8 - "Brand identity — logo, book cover, monochrome aesthetic"
Cohesion: 0.4
Nodes (6): Quiet Enough — Book Cover, Still Words Brand Identity, Design Aesthetic: Minimal Monochrome, Still Words Script Wordmark (logo.svg), Handwritten Script Typography, Visual Motif: Solitary Figure on Hill

### Community 9 - "Root layout, palette & design philosophy"
Cohesion: 0.5
Nodes (5): Site metadata (title template, OG, twitter), RootLayout — global shell, fonts, AnnouncementBar, Viewport + theme color (#F4EEE3 paper), Design philosophy — quiet/minimal/neutral, Quiet color palette (paper/ink/mist/ochre/bone/whisper)

### Community 10 - "CountrySelect keyboard & pointer handlers"
Cohesion: 0.5
Nodes (0): 

### Community 11 - "Watercolor backdrops & cursor ink halo (ambient ink)"
Cohesion: 0.5
Nodes (3): CursorInk halo, HeroWatercolor backdrop, WatercolorBackdrop component

### Community 12 - "Quiet route stubs (404 + Stillness Archive teaser)"
Cohesion: 0.67
Nodes (2): NotFound — quiet 404 page, Stillness Archive — first edition arrives 1 may

### Community 13 - "KeepableLines toggle handler"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "KeptDrawer keyboard handling"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "PostCSS / Tailwind build pipeline"
Cohesion: 1.0
Nodes (2): PostCSS config (tailwind + autoprefixer), Tailwind config (theme extension)

### Community 16 - "Three-door home navigation"
Cohesion: 1.0
Nodes (2): worldCards — three-door navigation data, Editing links guide (worldCards rationale)

### Community 17 - "Favicon brand monogram"
Cohesion: 1.0
Nodes (2): Favicon: Stylized 'sw' Monogram, Stillwords Brand Mark

### Community 18 - "Paper grain overlay (SVG fractal noise)"
Cohesion: 1.0
Nodes (2): SVG Fractal Noise Filter, Paper Grain Overlay Texture

### Community 19 - "postcss.config.mjs"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "next-env.d.ts"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "tailwind.config.ts"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "next.config.ts"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "opengraph-image.tsx"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "layout.tsx"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "page.tsx"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "page.tsx"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "page.tsx"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "SiteFooter.tsx"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "HeroWatercolor.tsx"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "WatercolorBackdrop.tsx"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "ebook.ts"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "tags.ts"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "poet.ts"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "SiteFooter component"
Cohesion: 1.0
Nodes (1): SiteFooter component

### Community 35 - "navLinks list"
Cohesion: 1.0
Nodes (1): navLinks list

## Ambiguous Edges - Review These
- `LinkButton component` → `EbookModal component`  [AMBIGUOUS]
  app/components/LinkButton.tsx · relation: conceptually_related_to

## Knowledge Gaps
- **25 isolated node(s):** `PostCSS config (tailwind + autoprefixer)`, `Tailwind config (theme extension)`, `Next.js static export config`, `Editing links guide (worldCards rationale)`, `worldCards — three-door navigation data` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `KeepableLines toggle handler`** (2 nodes): `KeepableLines.tsx`, `handleToggle()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `KeptDrawer keyboard handling`** (2 nodes): `KeptDrawer.tsx`, `onKey()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PostCSS / Tailwind build pipeline`** (2 nodes): `PostCSS config (tailwind + autoprefixer)`, `Tailwind config (theme extension)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Three-door home navigation`** (2 nodes): `worldCards — three-door navigation data`, `Editing links guide (worldCards rationale)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Favicon brand monogram`** (2 nodes): `Favicon: Stylized 'sw' Monogram`, `Stillwords Brand Mark`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Paper grain overlay (SVG fractal noise)`** (2 nodes): `SVG Fractal Noise Filter`, `Paper Grain Overlay Texture`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `postcss.config.mjs`** (1 nodes): `postcss.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `next-env.d.ts`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `tailwind.config.ts`** (1 nodes): `tailwind.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `next.config.ts`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `opengraph-image.tsx`** (1 nodes): `opengraph-image.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `layout.tsx`** (1 nodes): `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `page.tsx`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `page.tsx`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `page.tsx`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `SiteFooter.tsx`** (1 nodes): `SiteFooter.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `HeroWatercolor.tsx`** (1 nodes): `HeroWatercolor.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `WatercolorBackdrop.tsx`** (1 nodes): `WatercolorBackdrop.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ebook.ts`** (1 nodes): `ebook.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `tags.ts`** (1 nodes): `tags.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `poet.ts`** (1 nodes): `poet.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `SiteFooter component`** (1 nodes): `SiteFooter component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `navLinks list`** (1 nodes): `navLinks list`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `LinkButton component` and `EbookModal component`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Home page — hero poem + three doors` connect `Daily poem rotation & date-anchored hero` to `Header chrome, motion primitives & hero interactions`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Why does `SiteHeader component` connect `Header chrome, motion primitives & hero interactions` to `Books that stayed, poet bio & footer outposts`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Home page — hero poem + three doors` (e.g. with `getTimeOfDay — local-hour quiet greeting` and `usePrefersReducedMotion — matchMedia hook`) actually correct?**
  _`Home page — hero poem + three doors` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `EbookModal component` (e.g. with `CountrySelect combobox` and `ebook content object`) actually correct?**
  _`EbookModal component` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PostCSS config (tailwind + autoprefixer)`, `Tailwind config (theme extension)`, `Next.js static export config` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._