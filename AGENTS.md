# PokerAgile - rules for agents

## Commits

- Commit author: Florian Mousseau. No co-author trailers.
- Conventional commits, in English.
- `main` is production. Work goes through a branch and a PR into `develop`; never
  open a PR whose source branch is `develop` or `main` (merged sources are deleted).

## Stack

- Frontend: SvelteKit 5 (runes), TypeScript, vanilla CSS, on Cloudflare Pages.
- Backend: Go with native WebSocket (`backend/`), serving rooms on
  `salles.pokeragile.com`, built from `main`.
- `backend/go.mod` sets the Go version. CI reads it with `go-version-file`, and the
  `Dockerfile` pins the same patch version. No floating tag.

## Gate

There is no single `gate` script: CI (`deploy.yml`) runs each command, so a new
check is wired in `package.json` AND in the workflow.

```
cd frontend && npm run lint && npm run check && npm test \
  && npm run check:seo && npm run check:reflow && npm run mesure \
  && npm run build && npm run size
cd backend && go test ./... && go run golang.org/x/vuln/cmd/govulncheck@latest ./...
```

A change in behaviour comes with a test that fails without it. When a check turns
red, fix the cause; never loosen the check or the budget.

## Budgets

- **Under 50 kB of JavaScript (brotli) on a first visit**, for `/`, `/fr` and
  `/[id]`. `frontend/scripts/check-first-visit.mjs` (run by `npm run size`) follows
  the build manifest: entry files, layouts, the route page, their static imports,
  and for a room the heaviest of the five dictionaries. What loads on click
  (options, story list, local AI) is not counted. If a room goes over, slim the
  room.
- **Routes resolve on the server** (`router.resolution: 'server'` in `vite.config.ts`):
  the route manifest is not shipped, so a new page costs a first visit nothing.
  `src/lib/routage-serveur.test.ts` holds it.
- **Lighthouse Performance and Accessibility: 100/100.**
- **WCAG 2.1 AA.**
- No third-party script, no advertising cookie, no account.

## Audience measurement

No script, no cookie, no visitor identifier on any page. The host (Cloudflare)
still counts requests at network level, as for any site. Any public sentence about
measurement states both halves: no script or cookie on the device, AND request
counting by the host. Never write that the site "measures nothing", in any of the
five languages, anywhere shipped. `npm run mesure` scans every shipped file and
refuses those phrases, and refuses the `trackers-0` badge without its sentence.

## Internationalisation

- Five languages: EN, FR, ES, DE, PT.
- `src/lib/i18n/<lang>.ts` holds what the room says; `src/lib/i18n/extras/<lang>.ts`
  what only the options, story form, QR code and local AI say.
- **Never import a dictionary statically.** `src/lib/dictionaries.ts` loads one
  language at a time and `src/routes/[id]/+page.ts` awaits it.
  `src/lib/slim.test.ts` enforces it.

## French typography

`frontend/src/typographie.test.ts` (in `npm test`) refuses an ordinary space before
`:` `;` `?` `!` `%` `»` (and after `«`), and a sign that opens a source line. Scope:
`src/routes/fr`, the French dictionaries and `src/routes/+error.svelte`. Never type
the no-break space literally:

| Where                    | Form                                        |
| ------------------------ | ------------------------------------------- |
| text in a `.svelte` file | `Texte&nbsp;: suite`                        |
| component prop           | `h1Main="Texte&nbsp;:"` (Svelte decodes it) |
| JS or TS string          | `'Texte : suite'`                           |
| JSON-LD inside `{@html}` | ordinary space                              |

Titles and meta: no middle dot (U+00B7), no em dash as separator; use `,` or `-`.

## Narrow screens

Nothing may push a page past 320 px, including with browser text size doubled.
`frontend/scripts/check-reflow.mjs` (`npm run check:reflow`, also a step of
`deploy.yml`) reads `app.css` and every component `<style>` and refuses:

- a bare `1fr` track, or a grid without `grid-template-columns`;
- a `minmax()` minimum written as a length;
- horizontal padding in `rem` (use `min(Xrem, Ypx)`);
- `white-space: nowrap` outside a `min-width` media query, visually hidden text or
  a horizontally scrolling box;
- a `space-between` flex row that does not say whether it wraps;
- a `rem` floor on a `clamp()` that consumes width.

Every `<table>` lives in a `<div class="table-wrap">`. Never fix an overflow by
breaking a no-break space. Title `clamp()` floors are not checked: test long titles
in a browser.

## Invariants

- **Security headers live in two files**: `frontend/_headers` (static files) and
  `frontend/src/hooks.server.ts` (worker responses). Keep them identical;
  `npm run mesure` checks it. `_headers` sits at the project root, not in
  `static/`.
- **`/[id]` catches every unknown root URL** (rooms live there) and stays
  `noindex`.
- **Rooms live in memory only**: erased 24 h after last activity and on each
  deploy. No server-side persistence. A team's estimated stories are kept in each
  participant's `localStorage` (`src/lib/history.ts`) and replayed by the `restore`
  command (`backend/internal/room/history.go`); the server decides what it accepts.
  `history.ts` is never imported statically. The legal notices describe this
  storage in all five languages: update them with it.
- **Fibonacci pages** (`/fr/suite-de-fibonacci/[n]`, `/fibonacci-numbers/[n]`, ranks
  1 to 100) have no `load`, no param matcher and `csr = false`; unknown ranks get a
  404 from `hooks.server.ts`. Links to them carry `data-sveltekit-reload`.
  Regenerate with `node scripts/gen-fibonacci-sitemap.mjs` and
  `node scripts/gen-fibonacci-facteurs.mjs`.
- **The RACI generator** (`/fr/matrice-raci`, `/raci-matrix`) shares no module with
  the room. The matrix lives in the URL fragment (`#m=`); `decodeMatrix` rejects
  anything that is not exactly a valid matrix and repairs nothing.
- **The full-screen card** (`src/lib/ShowCard.svelte`) loads on first vote, in one
  file; its words live in `src/lib/show-card.ts`, the home reads
  `src/lib/pocket-deck.ts`, and the home uses no `<svelte:window>`.
- **No service worker**: an offline cache would serve a stale room.
  `show-card.test.ts` refuses one.
