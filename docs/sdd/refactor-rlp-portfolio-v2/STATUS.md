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

Resolved by the maintained ImportadorDB public-content authority. Java 21 is
the professional version; Java 17 is historical; and the later Java 25 /
JavaFX 25.0.1 repository update is not presented as a professional product
decision. MySQL and Firebird had professional use; MariaDB and PostgreSQL are
limited to manual test-database validation.

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

Status: IMPLEMENTED. Superseded by U10 for current public copy and evidence.

### U10 — ImportadorDB public-content integration

Status: IMPLEMENTED — GREEN, maintainer visual review accepted.

- **Authority integrated:** bilingual Work index and detail now present Java 21,
  JavaFX, and JDBC as the professional stack. The detail distinguishes
  professional MySQL/Firebird use from MariaDB/PostgreSQL manual validation
  with test databases.
- **Content boundary:** copy covers the implemented review, mapping, loading,
  batching, transactional options, reporting, and limited dry-run behavior. It
  omits encryption, unqualified security claims, streaming, blanket rollback,
  append, create-if-not-exists, and unmeasured outcomes.
- **Evidence and route:** the existing approved ImportadorDB documentary
  screenshot is rendered as a figure; the Spanish article route remains
  `/blog/desarrollo-importador-db/` and is reconciled with the detail through
  reciprocal actions.
- **Verification:** focused ImportadorDB/Work/Blog suites, `verify:green`,
  full E2E (78/78), production build, and `git diff --check` all passed;
  maintainer visual review accepted first-person voice, screenshot, and the
  reused U9.3 grid on the case shell. U9 remains closed and unchanged.

### U10.2 — Cosecha en Cope public-content integration

Status: IMPLEMENTED — GREEN; maintainer acceptance pending.

- **Authority baseline:** `docs/audit-packet-authority/CosechaEnCope_Authority_Packet_Audit.md`.
- **Integrated public surfaces:** ES/EN Work case routes and the preserved
  Spanish article `/blog/desarrollo-cosecha-en-cope/`, with reciprocal links.
- **Rendered media:** existing Cosecha cover and architecture diagram only.
- **Content boundary:** the article was reconciled to remove unsupported
  distributor, production, SEO, scalability, robust-security, and test-metric
  claims.
- **Verification:** focused Cosecha suite PASS (7); `verify:green` PASS with
  7 focused checks, 18 regressions, and 83 full E2E tests; production build,
  DESIGN lint, and `git diff --check` all passed.
- **Visual review:** healthy reusable preview at
  `http://127.0.0.1:4321/web-site/` (PID 19708); visual review completed.
- **Remaining limitations:** media licensing/provenance, endpoint
  authorization proof, reproducible full-stack test evidence, and README
  13-table reconciliation. Review-only risks are existing empty Work index
  media frames and 0.15s reduced-motion transitions.
- **Delivery state:** maintainer acceptance, commit, push, and PR remain
  pending. This section does not mark acceptance.

### U10.3 — LAB doctrine for Glea-Nexo

Status: ACCEPTED — documentation only; territory LAB.

- `LAB.md` records the accepted LAB purpose, WORK/LAB distinction, canonical
  public states, `/work/` index/detail information architecture, evidence and
  media rules, bilingual semantic examples, future AI/Big Data and academic
  qualifiers, the reused RLP visual/surface system, explicit non-goals, and the
  bounded next implementation slice.
- The doctrine follows the canonical Glea-Nexo authority packet and preserves
  its non-claims: no Production, exactly-once, complete resilience/security,
  semantic dedupe, real sensor/data deployment, current AI/ML, Big Data
  pipeline, academic approval, or unverified metrics/benchmarks.
- Home is explicitly excluded. Future implementation remains under `/work/`,
  reuses the existing WorkCase/shared Surface foundation, and must reconcile
  legacy Glea content only within that implementation slice.
- This is a delegated-direct documentation change, not an OpenSpec phase. No
  source, route, test, media, Home, authority-packet, or other
  non-documentation file was changed by this doctrine record.

### U10.4 — Glea-Nexo LAB implementation and maintainer-review correction

Status: ACCEPTED — maintainer visual/editorial review complete.

- Legacy `src/content/projects/glea-nexo.md` was removed after confirming no live collection consumer.
- `RLP / LAB / 001` remains under Work with ES/EN routes and is now one declaratively selected item in the existing Home Selected Work carousel; Home remains discovery/access and no new LAB surface or media was introduced.
- Spanish rendered Glea surfaces use only `Implementado`, `Validado`, `Trabajo actual`, `Planificado`, and `Límite / pregunta abierta`, with natural Spanish technical prose. English retains its equivalent editorial vocabulary and meaning.
- Home copy remains concise and evidence-bounded: no AI/Big Data, Production, real-sensor, dataset, or fabricated-media claims; Work and Production entries remain retained.
- `LAB.md` now permits selected LAB cases in Home Selected Work, names Glea-Nexo as the selected LAB entry, and preserves `/work/` LAB territory.
- Status prose and the future AI/academic/evidence boundaries respect `LAB.md` and the Glea authority packet.
- Verification: focused Glea checks 6/6, shared regressions 18/18, and full E2E 89/89 passed; production build, DESIGN check, and `git diff --check` passed.
- All authority packets remain unchanged. The maintainer accepted the refreshed visual/editorial review; commit remains pending.

### U9.1 — Interaction hovers

Status: AUTOMATED GREEN — MANUAL VISUAL PENDING MAINTAINER.

- **Scope:** CSS-first hover and focus polish only; no carousel, background, Hero, CMD, reveal, content, route, or geometry changes.
- **Interaction contract:** All U9.1 motion CSS is centralized in `src/styles/global.css`. It uses `150ms` fast and `200ms` base timings with `ease-out`; no `transition: all` and no animation dependency. Physical hover is fine-pointer-only, targeted reduced-motion rules make state changes instantaneous, and empty evidence placeholders remain static.
- **Surface distinction:** ArtifactSurface gains a one-pixel lift and accent border; DossierSurface remains stationary and responds through documentary border emphasis. Both remain semantic non-interactive articles with explicit actions.
- **Header and actions:** Existing Action variants retain native link/button semantics and restrained token-based state transitions. SiteHeader keeps its invariant geometry, current route remains more authoritative than hover, and focus remains visibly stronger.
- **Evidence:** Genuine RED failed on the absent motion vocabulary. GREEN: focused motion PASS (5/5); named Header/Surface/Action/Locale/Theme regressions PASS (18/18); full E2E PASS (69/69); production build PASS (16 pages); DESIGN lint PASS; `git diff --check` PASS.
- **Visual status:** Browser review found the bounded hover/focus states readable and overflow-safe in the required Home, WORK, and PROD samples across Light/Dark and desktop/mobile. Maintainer acceptance remains pending; snapshots were not changed.
- **Acceptance:** The maintainer authorized continuation to U9.2.

### U9.2 — Existing carousel motion

Status: AUTOMATED GREEN — MANUAL VISUAL PENDING MAINTAINER.

- **Scope:** Refine only the two existing Home evidence carousels; no new carousel, autoplay, loop, state, data, semantics, or geometry.
- **Architecture:** Existing native horizontal scrolling and CSS scroll snap remain authoritative. `src/styles/global.css` owns the motion styles and reduced-motion override; the existing script explicitly requests smooth control navigation, or instant navigation when `prefers-reduced-motion` is active, after CSS-only behavior proved imperceptible in maintainer review.
- **Controls:** Previous/next semantics, disabled state, position counter, keyboard operation, and independent WORK/PROD state are unchanged. Enabled controls gain restrained border/color feedback without moving their geometry.
- **Evidence:** Genuine RED found hardcoded smooth JavaScript and no reduced-motion CSS contract. GREEN: motion PASS (6/6); combined carousel/motion PASS (15/15); named Header/Surface/Action/Locale/Theme regressions PASS (18/18); full E2E PASS (70/70); production build PASS (16 pages); DESIGN lint PASS; `git diff --check` PASS.
- **Visual status:** Initial maintainer review reported no perceptible carousel movement. Control navigation now requests the intended movement explicitly and the motion test asserts a real intermediate scroll position; final maintainer acceptance remains pending and snapshots were not changed.
- **Stop:** U9.3 has not started.

### U9.3 — Technical background

Status: ACCEPTED / COMPLETE.

- **RED lineage:** Committed RED `17418e6` is satisfied by the production CSS
  implementation.
- **Owners:** `main.home-shell` owns Home; the shared
  `main.territory-index-shell` owns Work and Production.
- **Final shared CSS contract:** Both owners use the same CSS-only
  drafting/coordinate-line background: a `4rem` grid scale, existing semantic
  `--theme-canvas` and `--theme-line` values, and a final diagonal up-left
  `background-position` drift at `12s linear infinite`. No token was added.
- **Reduced motion:** `prefers-reduced-motion: reduce` applies
  `animation: none`; the shared field remains static.
- **Boundary preserved:** No DOM, pseudo-element, stacking, wrapper,
  transparency, JavaScript, layout, or responsive-specific speed change was
  introduced.
- **Calibration history:** `30s` and `24s` were too subtle; the maintainer
  selected `12s`.
- **Final automated evidence:** focused technical-background checks PASS (8/8);
  named regressions PASS (18/18); full E2E PASS (74/74); production build PASS
  (16 pages); `npx --yes @google/design.md lint DESIGN.md` PASS; and
  `git diff --check` PASS.
- **Acceptance authority:** The maintainer explicitly accepted the final visual
  result. The test runner's generic note that human visual review is required is
  informational and does not override that acceptance.

### U9.4 — CMD identity body progression

Status: COMPLETE — MAINTAINER ACCEPTED.

- **Title:** `C:\RLP\identity.exe` remains static and separate from the body
  progression.
- **Body sequence:** Normal motion runs the `whoami` → identity sequence once,
  character by character, then settles on the final cursor.
- **Final cursor:** The settled cursor uses a hard blink.
- **Reduced motion:** The body resolves immediately and remains static, with no
  progression or cursor blink.
- **Final automated evidence:** Focused motion checks PASS (10/10); named
  regressions PASS (18/18); full E2E PASS (76/76); production build PASS (16
  pages); `npx --yes @google/design.md lint DESIGN.md` PASS; and `git diff
  --check` PASS.
- **Boundary:** U9.5 has no implementation.

#### 1. Goal

Define the smallest optional technical-background enhancement that can add
quiet editorial atmosphere without changing reading, interaction, evidence, or
route behavior.

#### 2. Context

U9.1 and U9.2 established CSS-first, centralized, reduced-motion-aware motion
in `src/styles/global.css`. The maintainer approved one sparse
drafting/coordinate-line decorative field with one slow diagonal up-left drift. Current
source verifies that `html` and `body` paint `--theme-canvas`; `body.bg-ink`
clears background images; and `BaseLayout` adds no root wrapper. The existing
`main.home-shell` and shared `main.territory-index-shell` owners already paint
opaque `--theme-canvas` for Home, Work, and Production.

#### 3. Non-goals

No new routes, content, claims, media, controls, interaction state, layout
geometry, carousel changes, Hero motion (U9.4), or scroll reveals (U9.5).

#### 4. Design intent

The field is strictly decorative, non-essential, and subordinate to editorial
reading. It must never imply live data, a network, activity, or technical
capability.

#### 5. Selected visual direction

Use one sparse drafting/coordinate-line field, with low visual weight and one
slow, continuous diagonal up-left CSS drift. It must not become a cyan field, a grid
wallpaper, glow, parallax, or a content substitute.

#### 6. Architecture ownership

**Mandatory two-owner visual system:** use only the existing
`main.home-shell` owner for Home and the existing shared
`main.territory-index-shell` owner for Work and Production. Both owners must
share exactly one drafting/coordinate-line pattern, grid/line scale, semantic
color treatment, slow diagonal up-left animation direction, duration, easing, and
reduced-motion behavior; territory-specific variants are prohibited. Each owner
already paints opaque `--theme-canvas`; their direct child content is
transparent, and bounded opaque CMD, surface, and media descendants mask the
field only within their local bounds. This keeps the field visible on
surrounding route canvas without wrapper, pseudo-element, stacking, z-index, or
transparency changes. One owner serves each route, so no intra-route seams are
expected; Work and Production already share one owner. Cross-owner visual
continuity is contractual. Route navigation may naturally restart the decorative
animation and is not a simultaneous continuity defect.

#### 7. CSS strategy

After RED only, add one shared CSS background-paint contract to the two existing
owners: background color, image, position, and one slow diagonal up-left
`background-position` animation. The shared contract supplies the required
single pattern, grid/line scale, semantic color treatment, duration, easing,
and reduced-motion behavior. The background remains CSS-only and independent of
content layout. Do not add JavaScript, pseudo-elements, interactive DOM, z-index
changes, wrappers, or transparency changes.

#### 8. Theme behavior

Use existing semantic theme roles only. The shared semantic color treatment may
adapt contrast-safe line opacity through existing theme roles; neither mode may
introduce new color authority, cyan dominance, or a separate visual system.

#### 9. Reduced-motion

Under `prefers-reduced-motion: reduce`, both owners remove the shared drift
completely and retain only the same static field if it remains visually quiet;
otherwise both render no field. No timing, transform, scroll, or JavaScript
workaround may remain active.

#### 10. Accessibility

The field is decorative: no semantic content, focus target, accessible name,
announcement, keyboard behavior, or meaning. It must preserve readable
contrast, visible focus, selection, landmarks, logical order, and all
SiteHeader, locale, and theme controls.

#### 11. Performance

CSS is the only permitted runtime. One slow `background-position` animation is
the maximum intended motion after GREEN. Do not add Canvas,
WebGL, video, GIF, SVG networks, animation libraries, JavaScript loops,
listeners, or per-frame layout/paint work.

#### 12. Responsive

The decorative field must yield before content at 320, 390, 768, 1024, and
1440px. It may crop within its authorized owner but must never cause overflow,
layout shift, reduced gutters, hidden copy, or altered touch targets.

#### 13. Risks

The primary risk is the field competing with editorial reading or failing its
mandatory cross-owner continuity. Secondary risks are theme contrast loss,
visual noise, incorrect local masking, overflow or layout change, and
reduced-motion leakage. No stacking solution may be introduced to mitigate
these risks.

#### 14. Rejected alternatives

Reject Canvas, WebGL, video, GIF, SVG networks, animation libraries, JavaScript
loops/listeners, pseudo-elements, broad z-index refactors, wrapper or
transparency changes, route-specific layering, Hero motion (U9.4), and scroll
reveals (U9.5). These either exceed the decorative need or violate the current
ownership boundary.

#### 15. RED contract

When RED is explicitly claimed: add focused failing checks that prove
`main.home-shell` owns Home and shared
`main.territory-index-shell` owns Work and Production; the CSS-only background
color/image/position contract; one bounded diagonal up-left `background-position` drift
in normal motion; one shared pattern, grid/line scale, semantic color treatment,
duration, easing, and reduced-motion behavior without territory-specific
variants; readable content; and no overflow or layout change. RED must also
prove no JavaScript, pseudo-elements, interactive DOM, z-index changes,
wrappers, or transparency changes were introduced. It must fail against the
pre-U9.3 state for the missing authorized contract, not for unrelated route,
content, carousel, or Hero behavior.

#### 16. GREEN contract

The final GREEN settlement implements the minimum shared CSS in the two
existing shell owners. It passed focused technical-background checks (8/8),
named regressions (18/18), full E2E (74/74), the 16-page production build,
DESIGN lint, and `git diff --check`; the maintainer accepted the final visual
result.

#### 17. Maintainer visual settlement

The maintainer accepted the final shared field: it remains sparse and
subordinate on the authorized owner canvas, uses the same `4rem` semantic grid
and `12s linear infinite` diagonal up-left drift for both owners, and becomes
static with `animation: none` for reduced motion. No JavaScript, DOM,
stacking, or responsive-specific speed variant is part of the settlement.

| Route territory | Locale routes | Themes | Viewports | Reduced motion |
| --- | --- | --- | --- | --- |
| Home | `/`, `/en/` | Light, Dark | 320, 390, 768, 1024, 1440px | Required at every viewport/theme/locale cell |
| Work | `/work/`, `/en/work/` | Light, Dark | 320, 390, 768, 1024, 1440px | Required at every viewport/theme/locale cell |
| Production | `/production/`, `/en/production/` | Light, Dark | 320, 390, 768, 1024, 1440px | Required at every viewport/theme/locale cell |

#### 18. Final file boundary

The final implementation is CSS-only in `src/styles/global.css`; the existing
Home and territory shell owners remain unchanged.

#### 19. Protected files

Protect `SiteHeader`, Hero, `ArtifactSurface`/`DossierSurface`,
`EvidenceCarousel`, responsive breathing, routes, locale/theme controls, media
provenance, claims, and `SiteFooter`. Do not widen the slice to alter any of
these responsibilities.

#### 20. Rollback boundary

The authorized U9.3 change is removable as one shared background-paint
contract and its keyframes. Rollback must not require route, content, stacking,
component, token, or theme rollback.

#### 21. Implementation STOP conditions

Stop immediately if the field cannot conform to the approved two-owner visual
system; the field requires a global or route-specific layer, JavaScript,
pseudo-elements, interactive DOM, wrapper or transparency changes, or any broad
z-index/content stacking change; the field overlays content or cannot remain
visible on the surrounding owner canvas; reduced motion is not static-or-absent;
CSS-only delivery is insufficient; content is not readable; any protected
surface changes; or any matrix cell fails. Return to design review rather than
patching around the boundary.

### U9.5 — Scroll reveals

Status: COMPLETE — MAINTAINER ACCEPTED.

- **Design checkpoint:** `826d387` records the approved U9.5 design.
- **RED evidence:** Baseline PASS (10/10); RED PASS (10) / FAIL (1). The
  expected normal-motion pending/reveal contract fails at `#about`, which is
  already `opacity: 1` and `transform: none` before entry.
- **Checkpoint lineage:** `826d387` design; `d2c3817` RED; `fb3fcb34`
  settled-state synchronization; `879e482` carousel geometry synchronization.
- **Route units:** Home uses only post-hero `#featured-evidence`, `#explore`,
  and `#about`. Work and Production use their existing territory-index records.
- **Ownership:** One scoped `IntersectionObserver` belongs to each route owner;
  no global controller or cross-route observer is allowed. A revealed unit is
  unobserved, and the owner disconnects after its final unit reveals.
- **Progressive visibility / fail-open:** Every unit is visible and static by default.
  Initial viewport content, hash-target content, and focused content never enter
  a pending state. Missing or unavailable enhancement leaves the visible
  baseline intact.
- **Motion boundary:** The route-level reveal uses the calibrated 60px / 760ms
  global contract, with opacity and a minimal transform only. No stagger, loop,
  replay, timers, extra listeners, layout or scroll manipulation, or geometry
  change is permitted.
- **One-shot:** Each unit reveals once, is unobserved, and never replays.
- **Reduced motion:** `prefers-reduced-motion: reduce` is immediately visible
  and static for every unit.
- **Carousel synchronization:** Settled-state test synchronization preserves
  carousel geometry within `<=2px`; no U9.2 production fix was made.
- **Final evidence:** Focused reveal checks PASS (11/11); named regressions
  PASS (18/18); full E2E PASS (77/77); production build PASS (16 pages).
- **Acceptance authority:** The maintainer explicitly accepted the final
  source-preview result. U9.5 is COMPLETE.
- **Protected work:** U9.1 hovers, U9.2 carousel motion, U9.3 technical
  background, and U9.4 CMD progression retain their settled contracts. Hero,
  CMD, SiteHeader, SiteFooter, carousel internals, routes, content, and
  territory boundaries are outside U9.5.

### Candidate — bounded cross-surface refinement

Status: CANDIDATE — implementation complete; automated/browser acceptance
blocked by `PREVIEW_REQUIRED`.

- **Audit:** Home renders three WORK/LAB cards in each locale (`ImportadorDB`,
  `Cosecha en Cope`, `Glea-Nexo`) and three PRODUCTION cards (`Águilas FC`,
  `La Ola Art Gallery`, `Quinta Bella`). Real internal detail routes exist for
  all three Work/LAB cases and Quinta Bella in both ES/EN. Águilas has no detail
  route; La Ola has only its external live-site destination. Their Home titles
  therefore remain static, while the existing truthful CTAs remain unchanged.
- **Audit:** Implemented public detail routes are
  `/work/importador-db/`, `/work/cosecha-en-cope/`, `/work/glea-nexo/`,
  `/production/quinta-bella/` and their `/en/` counterparts. Work/LAB detail
  backlinks target `/work/` or `/en/work/`; Production detail backlinks target
  `/production/` or `/en/production/`.
- **Implementation:** Home cards use one shared Home-scoped surface mechanics
  rule for 1px solid semantic borders, square radius, existing motion tokens and
  easing, matching hover lift/border behavior, unchanged no-shadow behavior,
  and shared focus-within behavior. Work/LAB and Production remain semantic
  surface variants; no generic Card or new motion primitive was added.
- **Visual-review correction:** Home WORK/LAB/PRODUCTION cards now keep the
  semantic accent only on the default left border and make all card borders
  transparent on fine-pointer hover without changing geometry or lift; focus and
  reduced-motion behavior remain explicit.
- **Implementation:** Routable Home titles are normal anchors using the
  existing internal action destinations; non-routable Production titles remain
  headings. `CaseBackLink.astro` owns only locale, territory label, href, and
  anchor markup; it is rendered before identity/title in shared WorkCase and
  ProductionCase foundations.
- **TDD:** Home mechanics/title, Work/LAB/Production backlink, and shared
  border-state tests cover the candidate contract.
- **Current checks:** `npm run verify:green -- tests/home-featured-evidence.spec.ts`
  PASS: focused Home E2E (13/13), shared regression E2E (18/18), full E2E
  (94/94), production build (18 pages), DESIGN, and diff-check. A parent-owned
  preview is healthy at `http://127.0.0.1:4321/web-site/`; maintainer visual
  acceptance remains pending. No authority packet was changed.
- **Skills:** Future Skills implementation remains deferred; this slice does
  not start or alter that territory.

### U10.5 — Career / Education / Skills

Status: CANDIDATE GREEN — visual correction in progress; maintainer acceptance pending. Not accepted.

- **Authorized scope:** Add real bilingual `/experience/`, `/en/experience/`,
  `/education/`, `/en/education/`, `/skills/`, and `/en/skills/` routes, and
  add exactly one combined `Trayectoria` / `Career` primary-nav destination
  targeting `/experience/` and `/en/experience/`; Education remains a working
  route without separate primary-nav exposure. No other deferred territory is
  added.
- **Chronology contract:** Experience, Education, certification, and project
  records use one typed normalized bilingual source. The implemented project
  milestones are Cosecha en Cope (`12/2025`, tied to the DAM final project),
  ImportadorDB (`01/2026`, after DAM and before the AI/Big Data specialization),
  and Glea-Nexo, placed relatively as Leovinci Consulting -> Glea-Nexo -> FP
  specialization in Artificial Intelligence and Big Data, with no exact date,
  only recent growth, AI/Big-Data direction, and LAB context. They remain small
  secondary items on related timeline sides, with locale-correct Work detail
  links; `RLP / PROD` projects are excluded.
- **Presentation contract:** One shared CareerTimeline uses stable desktop
  semantics: Experience on the left, Education/certification on the right,
  and a central axis with nodes/connectors. Mobile uses one left-axis column.
  Record headings use a plain-language `h3` title with label, organization,
  period, and factual context subordinate to it. Skills uses four equal peer
  areas with a small visible `RLP / SKILLS / 00N` kicker followed by separate
  semantic headings (`Backend`, `Data`, `Systems`, `IA aplicada`; English uses
  `Applied AI`), with no combined or duplicate identity, scoring, progress, stars, tag cloud,
  dashboard, glow, gradients, glass, ribbons, or generic AI panel.
  Descriptions, secondary copy, lists, and project references remain naturally
  readable and are not forced into the timeline side emphasis.
- **Local logo contract:** A small curated set of Simple Icons CC0-compatible
  SVG marks is stored locally in `public/icons/tech/` for OpenJDK, Python,
  Docker, Git, and Angular. Marks are decorative and rendered beside visible
  technology names through one restrained shared pattern; other technologies
  remain typography-only. No remote logo URL, logo wall, tile, circle, gradient,
  animation, or special logo hover is used.
- **Applied AI boundary:** Public copy preserves agent-assisted engineering
  workflows, explicit routing, responsibility boundaries, the full SDD
  lifecycle, automated validation, traceability/attempt evidence, and controls
  against silent fallbacks. Evidence is linked to
  `https://github.com/RafaLopezZz/codex-workstation-baseline` and reports only
  the supplied concise evidence: 36 explicit routes, 150 assertions, routing
  7/7, and full SDD lifecycle. The no-silent-fallback claim is bounded to that
  supplied validation.
- **Foundation:** Reuse the current RLP Surface, semantic tokens, typography,
  and motion. Timeline pulse remains reduced-motion safe; existing header,
  locale, theme, mobile, and responsive geometry remain unchanged.
- **TDD boundary:** Add focused Playwright coverage before implementation for
  chronology, overlap, undated project handling, mobile semantics, theme and
  motion; Skills domains/copy/evidence/metrics/absence of scoring; ES/EN route
  parity, header current state, and canonical responsive widths.
- **Current checks:** `npm run build` PASS (24 pages); focused Career/Skills
  E2E PASS (10/10); Header/Locale/Motion/Theme plus relevant Work, project, and
  checkpoint regressions PASS (34/34); full E2E PASS (105/105); DESIGN lint
  PASS; and `git diff --check` PASS. No acceptance is implied by automated
  GREEN.
- **Acceptance:** Maintainer visual/editorial review remains pending. No
  acceptance, commit, push, merge, PR, or persistent preview is authorized in
  this slice.

### U11 — Contact

Status: GREEN — maintainer review pending. Not accepted.

- **Authorized scope:** Add real `/contact/` and `/en/contact/` routes around a
  locale-aware editorial Contact form. Keep the existing direct Email, GitHub,
  LinkedIn, and CV fallback and add only the truthful locale-correct Contact
  footer link plus one truthful locale-correct primary-navigation Contact link.
- **Behavior boundary:** Use the explicit `IDLE`, `VALIDATING`, `CAPTCHA`,
  `SUBMITTING`, `SUCCESS`, and `ERROR` states. Keep values on failure, prevent
  duplicates, recover from CAPTCHA/provider/reset/parse/abort paths, and bound
  Web3Forms transport with a practical 20-second timeout. Claim success only
  for HTTP-OK plus parsed `success === true`; the static app performs no
  server-side verification.
- **Presentation boundary:** Reuse v2 IBM Plex/editorial controls, semantic
  theme tokens, shared technical-grid motion, direct fallback, accessible field
  errors, and responsive conversation/form composition. The final UI copy uses
  an open/editorial invitation and removes CRM, filtering, and process language.
  No CRM extras, generic SaaS visuals, fake action, private secret, or new
  dependency is introduced.
- **Testing boundary:** `tests/contact-form.spec.ts` uses a mocked Web3Forms
  route and deterministic DOM/event CAPTCHA seam. It must not require the
  external hCaptcha runtime.
- **TDD:** Genuine RED covered the missing primary Contact link, approved
  editorial copy, and shared background-motion ownership; GREEN now covers all
  seven focused Contact checks without changing the form state machine.
- **Final automated evidence:** `npm run verify:green --
  tests/contact-form.spec.ts` PASS; Contact focused E2E PASS (7/7), named
  header/Surface/Action/Locale/Theme regressions PASS (19/19), full E2E PASS
  (112/112), motion regression PASS (11/11), and production build PASS (26
  pages). The gate owned and tore down its ephemeral test preview.
- **Final static checks:** `npx --yes @google/design.md lint DESIGN.md` PASS
  (exit 0, no output); `git diff --check` PASS (only existing LF/CRLF warnings).
  No automated result claims provider delivery or server-side verification.
- **Acceptance:** Maintainer visual/editorial review remains pending; U11 is not
  accepted. No commit, push, merge, PR, or persistent preview was made or is
  authorized.
