# Portfolio — Alycia Gautier

![](public/og-card.png)

Personal portfolio, built from scratch with React 18, TypeScript and Vite.

**Live:** <https://portfolio-topaz-zeta-15.vercel.app>

The site ships **two positionings from one codebase**: a front-end developer
pitch at `/` and a cybersecurity one at `/cyber`, each in French and English,
each with its own résumé. That constraint is what shaped the architecture below,
and it is the part of this repo worth reading.

---

## Stack, and why

| Choice | Reason |
|---|---|
| React 18 + TypeScript | `strict`, `noUnusedLocals` and `noUnusedParameters` are on — the compiler is the first reviewer |
| Vite | Instant HMR, and `tsc && vite build` fails the build on any type error |
| Plain CSS, one file per component | The site is a dozen sections with heavy bespoke motion. A utility framework would have been more config than payoff; design tokens live as custom properties in `src/styles/App.css` |
| No router | Two routes, resolved from `window.location.pathname`. React Router would be ~10 kB to replace six lines (`src/i18n/profile.ts`) |
| No state library | The only cross-cutting state is language + positioning, which is one context |

Runtime dependencies: `react` and `react-dom`. That is the whole list.

## Running it

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # tsc && vite build → dist/
npm run preview    # serve the production build

npm test           # vitest, watch mode
npm run test:run   # single pass, what CI runs
npm run typecheck  # tsc --noEmit
npm run lint
```

Every push runs lint, typecheck, tests and build
([`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

Docker, for a matching dev environment: `docker compose up`.

## Architecture

```
src/
├── components/     # one presentational component per section + UI primitives
├── constants/      # content.ts — all copy, both languages, both positionings
├── i18n/           # LanguageContext (state), profile.ts (routing), meta.ts (<head>)
├── hooks/          # useCursorTracker, useIntersectionObserver
├── styles/         # App.css (tokens + globals) + components/*.css
├── types/          # every shape the content pipeline produces
└── utils/
```

### The content pipeline

Copy is not scattered across components. `src/constants/content.ts` splits
**structure** from **text**:

- *Language-neutral metadata* — `PROJECTS_META`, `SKILLS_META`, `VIDEOS_META`,
  `CONTACT_META` — declares what exists, once.
- *Per-language text tables* — `PROJECT_DESC`, `SKILL_TEXT`, `PORTFOLIO`,
  `CASE_STUDIES`, `UI_SHARED` + `UI_BY_PROFILE` — declare how it reads.

`getContent(lang, profile)` joins the two into a single typed `LocalizedContent`
bundle, deriving the `001 / 002 / …` project numbering from `PROJECT_ORDER` so
the sequence stays contiguous whichever positioning is served. Components never
reach into the tables; they receive resolved data.

`LanguageProvider` resolves the positioning from the path once, memoizes the
bundle, and persists the language choice to `localStorage`. Deep links to
`/cyber` work because `vercel.json` rewrites unknown paths to `index.html`.

### Adding content

- **A project** — add to `PROJECTS_META`, add its id to `PROJECT_ORDER[profile]`,
  add a description under `PROJECT_DESC[profile][lang]`. An id in `PROJECT_ORDER`
  with no metadata throws at startup rather than rendering a hole.
- **A case study** (the modal behind a project card) — set `modal: true` on the
  project and add an entry to `CASE_STUDIES[lang]` keyed by the same id. Missing
  entries fall back to a "coming soon" line.
- **A short film** — drop the file in `public/videos/`, add it to `VIDEOS_META`
  with a `poster`, and title it in `VIDEO_TEXT`.

## Testing

Vitest + Testing Library, 62 tests. The suite is deliberately weighted towards
the two places this codebase can break quietly:

- **`src/constants/content.test.ts`** — runs every invariant against all four
  `profile × lang` combinations: contiguous project numbering, no unresolved
  text, no skill in an undeclared group, no group heading without skills, no
  blank UI string, and a case study behind every project flagged `modal: true`.
  The content tables are keyed by plain strings, so this is what turns a typo
  into a failing test instead of an `undefined` on the page.
- **`src/components/Skills.test.tsx`** and **`Projects.test.tsx`** — cover
  filtering, keyboard navigation across the filter tabs, and the modal. Two
  tests are explicit regressions: that the skills section is actually observed
  (the animation hook returns the ref that must be attached, and a discarded
  ref fails silently), and that an empty filter keeps the filter bar on screen.

`src/test/setup.ts` stubs `IntersectionObserver` and `matchMedia`, neither of
which jsdom implements.

## Scripts

```bash
./scripts/optimize-media.sh          # re-encode the videos + extract poster frames (needs ffmpeg)
python3 scripts/generate-og-card.py  # rebuild public/og-card.png (needs Pillow)
```

## Known limitations

Honest list, roughly in the order I would fix them:

- **Coverage is targeted, not broad.** The content pipeline and the two
  interactive components are tested; the mostly-static sections are not.
- **One clip is still heavier than it should be.**
  `TroisFemmesDisparaissent_2_1.mp4` (3.4 MB) came from a low-bitrate 720p
  source, so re-encoding it made it larger and the script kept the original.
  It needs a pass from the master rather than from this file.
- **Social previews are single-route.** Scrapers do not execute JS, so `/cyber`
  previews with the front-end card. Real per-route previews need the two routes
  prerendered at build time.
- **The case-study modal has no focus trap.** It closes on Escape and on
  backdrop click, and it is labelled, but focus is not confined or restored.
- **No error boundary.** `getContent` and `useLanguage` both throw on misuse,
  which currently means a blank page rather than a fallback.

## License

MIT — see [LICENSE](LICENSE).
