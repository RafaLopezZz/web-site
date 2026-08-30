# RLP Portfolio v2 — SDD Status

## Change

`refactor-rlp-portfolio-v2`

## Branch

`refactor/rlp-v2`

## Execution policy

Development continues with bounded SDD slices and strict TDD for
behavior changes.

Characterization tests may pass on first execution and must never be
artificially forced RED.

Each completed slice requires:

- focused executable evidence
- relevant regression suite
- production build
- `git diff --check`
- bounded diff review
- Git checkpoint

## Runtime authority

Gentle-AI native attempt authority was suspended during M0.2 because
an upstream runtime defect left a functionally GREEN attempt active
without a usable evidence revision.

From M0.3 onward, execution authority is maintained through:

- executable tests
- Git history
- this status document
- explicit maintainer decisions

## Milestones

### M0.1 — Test Harness

Status: COMPLETE

Evidence:

- Vitest configured
- Playwright configured
- Chromium E2E environment
- `/web-site/` base-path support
- no production behavior changed

Checkpoint:

`cc0c7a8 test(portfolio): establish M0 baseline harness`

### M0.2 — Home Characterization

Status: MANUALLY ACCEPTED

Evidence:

- home E2E: PASS
- Rafael López identity: PASS
- ImportadorDB: PASS
- Cosecha en Cope: PASS
- Glea Nexo: PASS
- GitHub destination: PASS
- LinkedIn destination: PASS
- CV destination: PASS
- production build: PASS

Gentle-AI native settlement:

BLOCKED BY UPSTREAM RUNTIME DEFECT

Maintainer decision:

Functional evidence accepted as sufficient to continue.

## Known baseline debt

### B-001

Duplicated/malformed `BaseLayout` description attributes in
`src/pages/index.astro`.

Current Astro build tolerates the source.

Do not fix during M0 without explicit scope.

### B-002 — CLOSED

Resolved in M1.3.2: `SiteHeader` aligns semantic `aria-current="page"`
with its cyan-plus-bottom-rule current treatment.

### B-003 — CLOSED

Resolved by the source-backed ImportadorDB detailed case. The current public
master `pom.xml` is authoritative for present technical state and declares
Java 25, JavaFX 25.0.1, and compiler release 25. The older long-form article is
historical context only; no migration claim is inferred from the difference.

Historical milestone records below may state that B-003 was then preserved or
out of scope. Those statements describe their checkpoint only and do not reopen
this closed blocker.

### B-004

hCaptcha cleanup can mask submission feedback.

After Web3Forms settles, `ContactForm` resets the captcha before setting
final user-visible status. If reset throws, success feedback is skipped;
the catch path resets again and can suppress failure feedback too.

Observed in isolated E2E because the external hCaptcha runtime is
intentionally unavailable. Future hardening should make provider cleanup
failure-safe. Do not fix during M0.

## Next

### M0.3 — Blog Preservation

Status: COMPLETE

Evidence:

- blog index preservation: PASS
- three article routes: PASS
- Unicode slug: PASS
- deep-content preservation: PASS
- semantic image preservation: PASS
- full E2E: PASS
- production build: PASS

### M0.4 — Experience + Education Preservation

Status: COMPLETE

Evidence:

- Experience section preservation: PASS
- three current professional records: PASS
- Education section preservation: PASS
- three current education records: PASS
- qualification marks preservation: PASS
- full E2E: PASS
- production build: PASS
- git diff check: PASS

### M0.5 — Contact Preservation

Status: COMPLETE

Evidence:

- Contact availability: PASS
- direct email fallback: PASS
- required-field validation: PASS
- invalid-email validation: PASS
- captcha gate: PASS
- mocked success submission: PASS
- mocked provider-failure recovery: PASS
- external-service isolation: PASS
- full E2E: PASS
- production build: PASS
- git diff check: PASS

### M0.6 — COMPLETE

Remote evidence:

- GitHub Actions Portfolio CI: PASS
- PR #12: MERGED
- merge commit: 93d318e70dc546633b91cf9e276a682724df602b

M0 — COMPLETE

Baseline regression harness established and remotely validated.

Known debt intentionally preserved:

- B-001
- B-002
- B-003
- B-004

Next:

### M1.1 — COMPLETE

Evidence:

- `DESIGN.md` created as the normative RLP design doctrine
- doctrine repaired with canonical DESIGN.md color schema, RLP identity, bilingual territories, 60/25/10/5 hierarchy, light editorial identity, bounded terminal/CMD and Windows 95 references, production-case information architecture, responsive principles, accessibility, motion, and primitive contracts
- `npx --yes @google/design.md lint DESIGN.md`: PASS
- no production source changes
- full E2E: PASS
- production build: PASS

Next:
M1.2 — Design Decision Promotion

### M1.2 — COMPLETE

Evidence:

- `DESIGN.md` normatively promotes IBM Plex typography, invariant SiteHeader/navigation, short Home and bilingual route IA, global actions, surface variants, bounded CMD identity, responsive Home, territory grammars, real-evidence rules, token intent, internal-only creative principle, and component contracts
- decision-evidence only; no production source changes

Next:
M1.3 — Global UI Foundation

### M1.3.1 — COMPLETE

Evidence:

- canonical CSS properties: Paper `#F2F0EA`, Ink `#111315`, Terminal `#0C0C0C`, RLP Cyan `#059AAF`, and Graphite `#606568`
- semantic Tailwind tokens: `paper`, `ink`, `terminal`, `rlp`, and `graphite`; `accent` retained only as the canonical RLP Cyan migration alias
- IBM Plex Sans is the global body/display family; IBM Plex Mono is technical/code typography
- Google Fonts loads Sans 400/500/600/700 and Mono 400/500
- legacy dark canvas intentionally not migrated to Paper in this bounded foundation slice
- focused design-foundation E2E: PASS (1 test)
- full E2E: PASS (13 tests)
- production build: PASS
- `git diff --check`: PASS
- authorized production-file hygiene: no `#00E5FF`, DM Sans, or Syne

Next:
M1.3.2 — SiteHeader

### M1.3.2 — COMPLETE

Evidence:

- one `SiteHeader` replaces all three confirmed `Navbar` consumers; `Navbar` removed
- RLP brand links home; only valid transitional destinations remain: Home, Work, Experience, Education, Notes (`/blog`), Contact, and CV
- Home and Blog/Blog article routes expose one semantic current destination; B-002 closed
- keyboard-operable 390px menu provides `aria-expanded`, `aria-controls`, changing labels, Escape close, and reachable links
- no future-route 404s or fake locale routes introduced
- focused SiteHeader E2E: PASS (3 tests)
- full E2E: PASS (16 tests)
- production build: PASS
- `git diff --check`: PASS
- browser inspection at Home and Blog, 1024px and 390px: no horizontal overflow, legible header/current state, reachable mobile menu

Next:
M1.3.3 — Action / ActionLink

### M1.3.3 — COMPLETE

Evidence:

- native `Action` button primitive supports Primary and Secondary variants with genuine disabled behavior; native `ActionLink` preserves navigation semantics and anchor attributes across Primary, Secondary, and Text variants
- shared IBM Plex Sans, sharp Ink/Paper action hierarchy, unfilled contextual links, RLP Cyan plus non-color visible focus, and legacy dark-canvas readability
- authorized consumers migrated: Home Hero/CV, quick links, project and transition links; Contact destinations and submit action
- SiteHeader, SiteFooter, and BlogPostCard inspected only and unchanged; B-004 remains untouched
- focused Action system E2E: PASS (4 tests)
- full E2E: PASS (20 tests)
- production build: PASS
- `git diff --check`: PASS
- browser viewport inspection at 390px and 1024px: no horizontal overflow; readable non-pill action hierarchy and reachable contact controls

Next:
M1.3.4 — Surface Foundation

### M1.3.4 — COMPLETE

Evidence:

- `Surface` provides only the current semantic `artifact` variant with native `article`/`section`/`div` output, forwarded native attributes, and `data-surface="artifact"`
- only the three repeated Home project articles consume the foundation; their semantics, project data, images/alts, content, metadata, highlights, and `ActionLink` links remain preserved
- square border/background containment, IBM Plex Sans inheritance, and a restrained focus-within border support the temporary dark canvas without defining a dark-theme API
- Dossier, Record, Explorer, and generic Card are intentionally deferred; hero microcards, experience/education, skills/certificates, blog cards, and the contact form remain untouched legacy surfaces
- focused Surface foundation E2E: PASS (1 test)
- full E2E: PASS (21 tests)
- production build: PASS
- `git diff --check`: PASS
- browser inspection at 390px, 768px, and 1024px: no horizontal overflow; three readable artifacts; nested links retain focus and image evidence remains present; no whole-card interactivity

### M1.3.5 — COMPLETE

Evidence:

- fresh baseline E2E: PASS (21 tests)
- fresh baseline production build: PASS
- canonical values: content max `80rem`; reading max `46rem`; gutters `1rem` at 320/390, `1.5rem` at 768, and `2rem` at >=1024; spacing scale 4/8/12/16/24/32/48/64/96px in rem
- `editorial-container`: 0 remaining consumers; legacy rule removed with no alias
- `rlp-container`: 6 locations — global primitive definition plus Home main, Blog index main, Blog article main, SiteHeader, and SiteFooter
- `rlp-reading`: global primitive plus the Blog article readable shell; it adds only max-width and retains inherited typography
- local composition remains untouched: Hero, project grid, timelines, contact layout, local grids/flex, and page spacing
- global hCaptcha max-width containment prevents its third-party embed from overflowing the 320px canonical Home shell without changing contact behavior
- focused layout E2E: PASS (1 test), including canonical token contract, Home container behavior, 320/390/768/1024 gutters, no overflow, desktop max/centering, readable measure, and typography inheritance
- full E2E: PASS (22 tests)
- production build: PASS
- `git diff --check`: PASS
- browser viewport inspection at Home, Blog index, and Blog article for 320px, 390px, 768px, 1024px, and wide: no horizontal overflow, coherent shared alignment, usable gutters, reasonable desktop reading measure, and unchanged dark canvas

M1.3 slices are COMPLETE. M1 remains pending the Global UI Foundation gate and M1 foundation settlement. Do not begin the gate in this slice.

### M1 — Global UI Foundation Settlement

Status: COMPLETE — Global UI Foundation accepted

Evidence:

- preflight: clean tree; branch `design/rlp-v2-m1-foundation`; approved unchanged candidate at `c01e5bc feat(layout): establish RLP layout primitives`
- M1.1, M1.2, and M1.3: COMPLETE
- `npx --yes @google/design.md lint DESIGN.md`: PASS
- focused Playwright: design foundation PASS (1/1); SiteHeader PASS (3/3); action system PASS (4/4); Surface foundation PASS (1/1); layout foundation PASS (1/1)
- `npm run test:e2e`: PASS (22/22)
- `npm run build`: PASS
- `git diff --check`: PASS
- integration review: canonical IBM Plex Sans/Mono and Paper/Ink/Terminal/RLP Cyan/Graphite tokens; migration-only aliases; one `SiteHeader` and no `Navbar`; semantic current state with cyan plus non-color rule; mobile keyboard menu; native `Action` buttons and `ActionLink` anchors; retained CV download and contact behavior; only Home artifacts consume `Surface`; no generic Card, whole-card interaction, or nested-control regression; canonical 80rem content and 46rem reading measures with 1rem/1.5rem/2rem responsive gutters and 4--96px spacing scale
- route compatibility: `/blog/`, `/blog/desarrollo-importador-db/`, `/blog/desarrollo-cosecha-en-cope/`, and `/blog/historia-transición/` remain generated and covered by the passing suite; B-002 remains closed
- accepted external maintainer visual evidence (not independently rendered in settlement): Home approximately 320px, 768px, and 1440px PASS; Blog article approximately 1440px PASS. Reported: visible gutters, no visible overflow, header/shell alignment, constrained wide content, wrapping actions, appropriate 46rem reading measure, and intact legacy local composition. 390px and 1024px are interpolation targets with no observed foundation blocker.
- settlement made no production changes. Current pages remain legacy presentation; the legacy dark canvas is transitional while Paper remains the v2 doctrine. B-001, B-003, and B-004 are preserved debt.

M1 — COMPLETE

Next:

M2 — Home: COMPLETE. The bounded short RLP v2 Home is settled; Work is next and remains NOT STARTED.

### M2.1 — Short Home Shell + Hero + CMD Identity

Status: COMPLETE

Evidence:

- focused RED: `Ver trabajo` failed the truthful-destination check because it targeted synthetic `#trabajo` with no meaningful destination
- Home/action/layout focused E2E covers `/blog/` as the existing `Ver trabajo` destination, retained CV download, the `main.home-shell > .rlp-container > .home-hero` composition, full-width Paper canvas, constrained content, and responsive CMD behavior
- 20 E2E checks accepted; production build and `git diff --check` accepted
- external maintainer visual evidence accepted for Home at 320px, 768px, and 1440px: Paper canvas, constrained content, and route-local CMD visuals
- Home is route-local Paper/Ink with the settled SiteHeader and SiteFooter unchanged; `CmdIdentity.astro` was not created and the CMD identity remains inline in the Home route
- intentional Home characterization replacements remove legacy project, professional/Education, Contact, and old CTA assertions only; Blog index/article, SiteHeader, layout/design/action semantics, routes, and shared foundations remain covered; no components or data were deleted

Next:

At the M2.1 checkpoint, the next slice was M2.2 — Light/Dark/System Theme System.

Roadmap: M2.3 — Featured Evidence; M2.4 — Explore + Footer integration; M2.5 — Responsive/content polish; M2 Gate.

### M2.2 — Light/Dark/System Theme System

Status: COMPLETE — manual visual review accepted.

Evidence:

- locale: URL-only Spanish `/` and English `/en/` Home counterparts set exact `html[lang]`; locale is never stored, inferred, redirected, or represented with flags
- locale control: `SiteHeader` provides a compact 48×34px retro plate with real ES-left/EN-right `nav[aria-label="Idioma"]` anchors, URL-driven `aria-current="page"`, and an inset cyan route marker as the secondary non-color cue; it precedes Theme in the centered locale → theme → Menu mobile and locale → theme desktop utility row, with no flags or locale persistence
- English scope: English reuses Home/CMD semantics with bounded translated identity/actions, links its truthful work action to the real `/blog/`, and Header exposes only English Home plus the existing Blog rather than future English placeholders
- locale/theme verification: `tests/locale-system.spec.ts` RED against the pre-locale candidate, then focused locale/Header/Home/theme PASS (15/15) across 320/390/768/1024/1440; preference and effective theme survive locale navigation independently
- build: `/` and `/en/` emit alongside the established Blog routes; full E2E PASS (28/28), production build PASS, `git diff --check` PASS
- model: preference (`system`/`light`/`dark`) is separate from effective theme; `rlp-theme` localStorage accepts only valid values and absent/invalid storage safely falls back to System
- root: `html[data-theme-preference]` records choice and `html[data-theme]` records effective Light/Dark; `color-scheme` follows effective mode; no component owns a second theme state
- bootstrap: synchronous defensive head bootstrap reads storage and sets root state before first render, including stored Dark
- tokens: semantic `canvas`, `surface`, `surface-raised`, `text`, `text-muted`, `line`, and `accent`; Light retains Paper/Ink direction; Dark values are canvas `#1C1D1D`, surface `#242525`, raised `#2D2E2E`, text `#F2F0EA`, muted `#B8B7B0`, line `#85857E`, accent `#5CB6C3`
- control: superseding button/select/radio presentations, one native SiteHeader `input[type="range"]` is the semantic owner of the compact retro inline SVG switch: `min="0" max="2" step="1"` maps System left (`0`), Light center (`1`), Dark right (`2`). Spanish name/value text expose stored preference rather than effective theme; direct selection plus native Arrow Left/Right and Home/End behavior persist it. SVG is `aria-hidden`; visible focus and desktop/mobile utility placement are preserved
- runtime: System follows `matchMedia("(prefers-color-scheme: dark)")` changes live; explicit Light/Dark ignore system changes
- CMD: terminal background remains invariant `#0C0C0C`; Home plus Blog index/article receive color-only semantic adoption
- TDD: the native range contract was RED against the compact button candidate before the SiteHeader refinement; `tests/theme-system.spec.ts` GREEN (4/4)
- focused regressions: SiteHeader 4/4; Home 4/4
- full E2E: PASS (25/25); production build: PASS; `git diff --check`: PASS
- RetroLocaleSwitch visual refinement: locale/Header/theme focused E2E PASS (11/11) at 320/390/768/1024/1440, covering real anchors/current URL state, native tab order, shared utility bounds/no overlap/no overflow, and theme preservation across locale navigation
- accepted real visual review: Home ES/EN plus Blog index/article at 320px and 1440px in Light/Dark; Theme/Locale controls, contrast, terminal readability, hierarchy, no overlap, and URL-driven locale remained intact
- visual-review defect: Blog index at 320px measured `scrollWidth` 308 greater than `clientWidth` 305 because the Publications title/count desktop flex row did not fit
- bounded fix: the Publications title/count row uses `flex-column items-start` on mobile and `sm:flex-row` on desktop; no copy or route changed
- genuine RED: the focused semantic theme test failed on the Blog publications row/mobile overflow; GREEN: focused semantic theme PASS (1/1) and full theme-system PASS (4/4)

### M2.3 — Selected Work Category Carousels

Status: COMPLETE.

Evidence:

- One semantic Home section, `#featured-evidence`, is headed `Trabajo seleccionado` / `Selected Work` and labelled by `#featured-evidence-title`; Hero targets it in both locales. It contains exactly one Work carousel and one Production carousel, with no LAB or category mixing.
- `src/data/selected-work.ts` is the canonical source for locale-equivalent `workItems` and `productionItems`. Work is `RLP / WORK / 001` ImportadorDB and `RLP / WORK / 002` Cosecha en Cope; Production remains `RLP / PROD / 001` Águilas FC and `RLP / PROD / 002` La Ola. All identifiers share the same restrained semantic `--theme-accent`; no category hues or color-only ranking authority is introduced.
- Home copy follows one product-first grammar: technical ID, product name, concise locale-equivalent description, and two or three verified technologies. ImportadorDB renders its Java/JavaFX Excel-import purpose; Cosecha en Cope renders its Java/Angular/PostgreSQL producer-consumer marketplace purpose. Their complete verified stacks remain canonical, unrendered `facts`, preserving their technical authority for future Work detail surfaces.
- Historical M2.3 snapshot: ImportadorDB data then recorded Java 21 and JavaFX 21 while B-003 was unresolved. That version assertion is superseded by the later source-backed detailed case: the current public master manifest declares Java 25, JavaFX 25.0.1, and release 25. Cosecha preserves its bounded stack inventory, but its facts remain unrendered pending surface-specific provenance.
- Production uses the same concise Home grammar and retains only approved public identity, summary, compact technology labels, and truthful destinations. The checkpoint provenance audit removed unproven implementation-detail strings from canonical Production data and from the public indexes; future dossiers require their own source review. La Ola alone has the exact live-site action `https://www.laolaart.com/` using `_blank` and `noreferrer`; Work actions remain the established Spanish case routes and no manual case action is invented.
- `EvidenceCarousel.astro` provides scroll-snap tracks and local button behavior only: visible ES/EN category headings are absent while locale-correct category accessible names remain. Work and Production each have independent bounded native controls plus technical mono `01 / 02` position; Work is `01 / 02 → 02 / 02 → 01 / 02`, with no autoplay or infinite behavior. Native scrollbar is suppressed without disabling overflow, touch/trackpad use, or scroll snap. Carousel footers are a normal single desktop flex row and wrap only when constrained on mobile; controls remain stable and nothing is hidden or forced to overflow. Artifact's accent identity edge and dossier metadata/rule/current position use only `--theme-accent`; no cyan fill or full frame is added.
- A-proven assets rendered: 0. ImportadorDB and Cosecha media remain omitted because no A provenance was established. Glea Nexo is excluded as LAB; Quinta Bella and Fincas Victoria lack authoritative dossier facts.
- TDD: `tests/home-featured-evidence.spec.ts` was RED on the accepted fixed Work/Production layout because the evidence section, pure category tracks, Águilas, and independent Production controls did not exist; refinement RED covered visible category headings and bounded ES/EN navigation. Product-first RED then failed on former visible `Context` / `Engineering` / `Evidence` labels and resolver/test detail before summaries and compact verified tech highlights replaced them. Selected-work E2E: PASS (8/8), including compact copy, deferred full facts, shared identifier accent, bounded navigation, ES/EN parity, and responsive footer behavior.
- Desktop carousel geometry stabilization separates the flexible stage from the normal footer row only for the side-by-side grid. Work and Production footers now align through active-item changes without collapsing the artifact/dossier distinction; mobile 320–390px remains stacked with natural content heights and no forced desktop stage. Geometry RED measured a 25.59375px desktop footer mismatch before the shell change.
- Featured: PASS (9/9).
- Named regressions: PASS (20/20).
- E2E: PASS (38/38).
- Production build: PASS.
- `npx --yes @google/design.md lint DESIGN.md`: PASS.
- `git diff --check`: PASS.
- Maintainer visual Light/Dark at 320px/1440px: PASS.

## M2 continuation and post-M2 sequence

M2.4, M2.5, M2.6, and the historical M2 Gate are COMPLETE. M2.6 closed the corrective slice for the separately authorized post-M2 Explore + About expansion. The expansion delivered minimal Work/Production indexes and a Home About introduction without completing any later territory. This sequence does not define M3 or M4 milestones.

### M2.4 — Explore + Footer integration

Status: COMPLETE.

Evidence:

- Home order is exactly SiteHeader → Hero → Featured Evidence → semantic `#explore` → one final `SiteFooter`.
- Explore provides equivalent ES/EN meaning, hierarchy, labels, destinations, and action priority. The primary Blog-index action and three lower-priority established Spanish article links are real anchors; English labels explicitly identify the Spanish article destinations.
- Explore introduces no placeholders, future routes, removed fragments, buttons-as-navigation, or Footer destination duplication. Footer remains compact utility navigation for Email, GitHub, LinkedIn, and CV, with locale-correct accessible navigation naming and the public `Software Developer` role.
- SiteHeader removes the obsolete Spanish Home fragments and exposes locale-correct Home plus the established Spanish Blog index in both locales.
- Focused M2.4 E2E PASS (2/2); named Home/action/Surface/locale/theme/Header/M2.3 regressions PASS (29/29); full E2E PASS (40/40); production build PASS.
- `npx --yes @google/design.md lint DESIGN.md` PASS with 0 errors (2 existing warnings and 3 informational findings); `git diff --check` PASS.
- Real browser visual review at 320px and 1440px, ES/EN, Light/Dark PASS: semantic order and action hierarchy are intact, desktop Work/Production remain balanced with aligned carousel footers, mobile keeps natural stacked heights, Explore/Footer remain legible and compact, and no overflow, placeholder destination, cyan overuse, Theme/Locale regression, or M2.3 geometry change was found.
- No historical RED is claimed because the interrupted first writer left implementation before a retained pre-implementation failing run could be captured.
- The M2.4 slice itself includes no motion, M2.5 implementation, future territory, Theme/Locale controls/BaseLayout, Blog compatibility, M2.3 carousel mechanics/data/geometry, B-001, B-003, or B-004 changes.
- This slice preceded final M2.2 visual acceptance; the accepted review and completed M2 Gate are recorded in their authority sections.

### M2.5 — Responsive/content polish

Status: COMPLETE.

Evidence:

- M2.5 found and corrected one bounded Dark paint defect: CMD body text no longer relies on inherited Paper color; `.cmd-identity__terminal` owns `color: var(--color-paper)` directly.
- Genuine RED: the theme regression expected that direct declaration and received an empty value before the fix. Focused Theme PASS (4/4).
- Named responsive/content Home/action/Surface/locale/theme/Header/M2.3/M2.4 checks PASS (31/31); full E2E PASS (40/40); production build PASS.
- `npx --yes @google/design.md lint DESIGN.md` PASS with 0 errors (2 existing warnings and 3 informational findings); `git diff --check` PASS.
- Real browser visual review at 320px and 1440px, ES/EN, Light/Dark PASS: CMD text is restored in Dark, semantic order and content hierarchy remain stable, desktop evidence columns retain equal dignity and aligned footers, mobile keeps natural stacked heights, and no horizontal overflow is present.
- No routes, territory expansion, unsupported copy, taxonomy changes, Blog URL changes, motion, carousel behavior changes, or B-001/B-003/B-004 resolution were introduced.
- This slice preceded final M2.2 visual acceptance; the accepted review and completed M2 Gate are recorded in their authority sections.

### M2 Gate

Status: COMPLETE. M2 is COMPLETE.

- **Scope settled:** The bounded M2 Home work is accepted.
- **Dependencies satisfied:** M2.1, M2.2, M2.3, M2.4, and M2.5 are COMPLETE.
- **Final acceptance evidence:** focused M2 regressions PASS (31/31); full E2E PASS (40/40); production build PASS (6 pages, 17 optimized images); `npx --yes @google/design.md lint DESIGN.md` PASS with 0 findings; `git diff --check` PASS; accepted maintainer visual review covered Home ES/EN plus Blog index/article at 320px and 1440px in Light/Dark.
- **Delivery state:** No commit was made.
- **Next territory:** Work remains NOT STARTED; no later territory implementation began.
- **Exclusions preserved:** No routes were added; Blog URL compatibility remains intact; B-001, B-003, and B-004 remain out of scope.

### Maintainer-authorized post-M2 expansion

Status: DELIVERED FUNCTIONALLY / VISUALLY ACCEPTED — bounded expansion only; no later territory is COMPLETE.

- **Decision:** After the completed M2 Gate, the maintainer authorized real Home Explore destinations for `/work/` and `/production/`, their `/en/work/` and `/en/production/` counterparts, and a bilingual Home About introduction immediately after Explore.
- **Delivered boundary:** The four routes are minimal bilingual indexes using only `src/data/selected-work.ts`. The Home About section is a factual introduction. Optional profile imagery remains unrendered until an asset and alternative text are supplied and approved by the maintainer.
- **Evidence retained:** Focused Playwright PASS (3/3); production build PASS (10 pages, including all four routes); `git diff --check` PASS; the prior review found no horizontal overflow at 320px and 1440px in Light/Dark.
- **Visual acceptance correction:** The maintainer-supplied capture triggered M2.6. Production-preview diagnosis and the completed technical matrix confirm the corrected layout; the maintainer accepted the final visual review.
- **Not implied:** M2.6 does not invalidate the historical M2 Gate, complete Work, Production, About, or EN parity, or alter the later territory order. Motion and B-001, B-003, and B-004 remain out of scope.

### M2.6 — Explore + About visual fidelity correction

Status: COMPLETE — maintainer visual review accepted.

- **Purpose and boundary:** Correct the visual fidelity of the post-M2 Explore + About expansion without invalidating the historical M2 Gate or inventing M3/M4 scope. M2.6 is complete.
- **Diagnosis:** Production-preview inspection confirmed that emitted CSS, Astro scoping, cascade, and breakpoints work; the screenshot layout loss could not be reproduced. Inline Explore SVG was the correctable source-policy defect.
- **Icon correction:** Inline Explore SVG was removed in favor of two external local decorative assets at `22×22px`, with empty alternative text and exclusion from the accessibility tree. No emoji, font icon, or dependency was added.
- **Responsive acceptance:** Explore meets its equivalent desktop two-column/vertical-divider and mobile stacked/horizontal-divider contract. About meets its hierarchy and responsive identity/copy-grid contract. The optional portrait remains absent without an approved asset plus alternative text, avoiding placeholder and CLS.
- **Technical evidence:** Focused M2.6 + Explore PASS (4/4); Home/Action/Surface/Locale/Theme/Header regressions PASS (20/20); full E2E PASS (43/43); production build PASS (10 pages); `git diff --check` PASS; `npx --yes @google/design.md lint DESIGN.md` exited 0. The PowerShell profile warning is unrelated to lint.
- **Visual matrix:** ES/EN × Light/Dark × 320/390/768/1024/1440 PASS, with no horizontal overflow.
- **Maintainer visual acceptance:** The maintainer accepted the final visual review: “Confirmo que después de la revisión visual ha quedado muy bien.” M2.6 is COMPLETE.
- **Out of scope:** Motion; new territory content; completion of Work, Production, or About; post-M2 sequence changes; B-001, B-003, or B-004.

### Work

Status: OPEN — bounded Work index hardening complete; territory not complete.

- **Scope:** Extend the delivered `/work/` and `/en/work/` indexes into the existing Work territory using verified evidence only; the implementation plan is recorded in `M2.md` under **Work — implementation plan**.
- **Dependencies:** M2 Gate.
- **Stitch reference:** `Rafael López | Selected Work (Desktop)`, project `2994536844412482857`, screen `8aebc9130a9b485e95414b9f89001f22` (2560×5740), plus the identified but not yet inspectable Home complement `918cde6384b44458bd5765daee9b253e`. These are visual references only; recover/inspect them before declaring visual fidelity.
- **Evidence boundary:** `src/data/selected-work.ts` remains factual authority for the current index. Its `facts` values require provenance before promotion into public case content. ImportadorDB and Cosecha en Cope require verified context, architecture/technologies, decisions/evidence, and truthful links; missing proof is omitted or blocks the change.
- **Completed bounded hardening:** Both indexes retain the two ArtifactSurface records and established Spanish Blog actions, but no longer render `facts`. ImportadorDB renders no Java version on the compact index; B-003 is resolved for the detailed case by the current public source manifest (Java 25, JavaFX 25.0.1, release 25). Cosecha renders no unclassified media, JWT, AWS S3, metrics, deployment, users, or sales claims. The Header now exposes the real locale Work route with exactly one truthful primary-navigation `aria-current="page"`, never Home.
- **Hardening evidence:** Genuine RED: the focused Work check failed because the former candidate emitted two public `.selected-index__facts` elements. GREEN: focused Work/Header PASS (7/7); named Home/Action/Surface/Locale/Theme/Header/Blog regressions PASS (35/35); full E2E PASS (44/44); production build PASS (10 pages); DESIGN lint PASS; `git diff --check` PASS. Visual QA PASS for ES/EN × Light/Dark × 320/390/768/1024/1440 with no horizontal overflow. This is bounded index evidence only, not completion of Work or Stitch-fidelity acceptance.
- **Acceptance evidence:** Focused Work checks; Home/Action/Surface/Locale/Theme/Header and Blog-compatibility regressions; full E2E; production build; DESIGN lint; `git diff --check`; ES/EN × Light/Dark × 320/390/768/1024/1440 visual comparison with the recovered Stitch reference; and maintainer visual review.
- **Exclusions:** No Production/Experience/Education/Notes/About/Contact territory completion, Blog URL changes, motion, new dependencies without demonstrated need, inline SVG/emoji/font icons, or B-001/B-004 resolution.

### Production

Status: OPEN — minimal bilingual index delivered; territory not complete.

- **Scope:** Extend the delivered `/production/` and `/en/production/` indexes into existing Production dossiers from verified evidence only.
- **Dependencies:** Work; the authorized minimal index does not satisfy the full Work dependency.
- **Acceptance evidence:** Focused Production checks, evidence provenance review, relevant regressions, production build, `git diff --check`, and maintainer visual review.
- **Exclusions:** No invented case facts or outcomes, no additional routes, no later territory implementation, Blog URL changes, motion, or B-001/B-004 resolution.

### Experience

Status: NOT STARTED.

- **Scope:** Implement the existing Experience territory as a factual career record.
- **Dependencies:** Production.
- **Acceptance evidence:** Focused Experience checks, relevant regressions, production build, `git diff --check`, and maintainer visual review.
- **Exclusions:** No new routes, no later territory implementation, Blog URL changes, or B-001/B-004 resolution.

### Education

Status: NOT STARTED.

- **Scope:** Implement the existing Education territory as factual qualifications and records.
- **Dependencies:** Experience.
- **Acceptance evidence:** Focused Education checks, relevant regressions, production build, `git diff --check`, and maintainer visual review.
- **Exclusions:** No new routes, no later territory implementation, Blog URL changes, or B-001/B-004 resolution.

### Notes

Status: NOT STARTED.

- **Scope:** Implement the existing Notes territory while retaining established Blog URL compatibility.
- **Dependencies:** Education.
- **Acceptance evidence:** Focused Notes and Blog-compatibility checks, relevant regressions, production build, `git diff --check`, and maintainer visual review.
- **Exclusions:** No new routes, no later territory implementation, no Blog URL breakage, or B-001/B-004 resolution.

### About

Status: OPEN — Home introduction delivered; territory not complete.

- **Scope:** Extend the factual Home introduction into the existing About territory with factual identity and working context. Add profile imagery only after the maintainer provides and approves both the asset and its alternative text.
- **Dependencies:** Notes.
- **Acceptance evidence:** Focused About checks, relevant regressions, production build, `git diff --check`, and maintainer visual review.
- **Exclusions:** No additional routes, no Contact or EN parity completion, Blog URL changes, motion, or B-001/B-004 resolution.

### Contact

Status: NOT STARTED.

- **Scope:** Implement the existing Contact territory with truthful destinations and form behavior.
- **Dependencies:** About.
- **Acceptance evidence:** Focused Contact checks, relevant regressions, production build, `git diff --check`, and maintainer visual review.
- **Exclusions:** No new routes, no EN parity implementation, Blog URL changes, or B-001/B-004 resolution.

### EN parity

Status: OPEN — bounded parity delivered for the authorized Home and index surfaces; territory not complete.

- **Scope:** Establish complete English parity for the remaining implemented territories without weakening locale meaning, facts, hierarchy, labels, destinations, or action priority. The Home Explore/About expansion and the Work/Production indexes already have direct English counterparts.
- **Dependencies:** Contact.
- **Acceptance evidence:** Focused bilingual parity and route-compatibility checks, relevant regressions, production build, `git diff --check`, and maintainer visual review.
- **Exclusions:** No invented routes, no weaker English placeholders, no Blog URL breakage, and no B-001/B-004 resolution.

### Work — ImportadorDB detailed case

Status: IMPLEMENTED. B-003 RESOLVED for the current source state: pom.xml declares Java 25, JavaFX 25.0.1, and release 25. The case publishes only source-backed technical capabilities; commercial and measured production claims remain omitted.
