# Handoff — RLP Portfolio v2 (U0–U8)

## Current state

- **Repository:** `D:\2026\portfolio`
- **Branch:** `refactor/rlp-v2`
- **Latest product checkpoint:** `25b5f63 test(workflow): add complete green gate`
- **Automated verification:** build passes (**16 pages**) and E2E passes (**64/64**).
- **Manual state:** human visual review is still required before accepting a design or fixing visual snapshots.

## Persistent constraints

1. Publish media and claims only with approved provenance.
2. Keep WORK as `ArtifactSurface` and PROD as `DossierSurface`; do not replace them with generic cards.
3. `SiteHeader` is invariant across the site.
4. WORK and PROD share index composition, while preserving their own semantics.
5. All PROD records have equal editorial dignity; no featured case.
6. Preserve ES/EN parity, themes, responsive order, keyboard operation, and visible focus.
7. Exclude administration, real customer data, checkout, and reservation flows from public dossier evidence.

## U0 — Decisions

- PROD may use images once their provenance is approved.
- Canonical name: **La Ola Art Gallery**.
- No case dominates the PROD index.
- Claims and media require verifiable sources.

## Delivered units

### U1 — Territorial navigation

- Commit: `45d47c6 feat(navigation): add territorial header navigation`
- Added bilingual WORK and PROD navigation to `SiteHeader`.
- One truthful `aria-current` across index and detail routes; mobile keyboard navigation and focus return on Escape.

### U2 — Territory semantics

- Commit: `415a50c refactor(portfolio): separate territory index semantics`
- Replaced the former shared selected-work component with:
  - `TerritoryIndex.astro` — visual shell.
  - `WorkIndex.astro` — ArtifactSurface records.
  - `ProductionIndex.astro` + `ProductionDossier.astro` — DossierSurface records.

### U3 — WORK index composition

- Commit: `5312cdb feat(work): adapt index composition`
- WORK now uses the same responsive record composition as PROD while retaining ArtifactSurface semantics.

### U4 — ImportadorDB case alignment

- Commit: `652e8c2 feat(work): align ImportadorDB case surface`
- Bilingual ImportadorDB case aligned to the WORK visual system with source-backed content only.

### U5 — Cosecha en Cope case

- Commit: `7b128a2 feat(work): add Cosecha evidence case`
- Added bilingual Cosecha detailed routes, approved documentary media, and shared `WorkCase.astro` structure without sharing facts with ImportadorDB.
- Explicitly excludes unsupported JWT, AWS S3, deployment, metric, user, and sales claims.

### U6 — Equal-level PROD index

- Commit: `309b14b feat(production): adapt equal-level dossier index`
- Established equal-level DossierSurface records for Águilas FC and La Ola Art Gallery.
- No image, feature, or unproven PROD fact was published at this stage.

### U7 — First PROD dossier: Quinta Bella

- Commit: `db5bd56 feat(production): add Quinta Bella dossier`
- Selected **Quinta Bella** because it has confirmed authorship, a public repository, a live site, source-visible booking-flow tests, and approved public-media authorization.
- Added bilingual routes:
  - `/production/quinta-bella/`
  - `/en/production/quinta-bella/`
- Added an evidence-bounded dossier in the required order:
  `CONTEXT → CHALLENGE → ENGINEERING → OUTCOME → LEARNING → DISCUSS → EVIDENCE`.
- Quinta Bella is the third equal-level PROD record and appears in Home.
- Sources: public GitHub repository and live site. No admin, real data, checkout, or reservation flow is shown.

### Post-U7 — Reserved media spaces

- Commit: `07285a5 feat(portfolio): reserve index media slots`
- Added empty, decorative 16:9 media slots to every WORK and PROD record in indexes and Home.
- These are placeholders only; no unverified image was introduced.

### U8 — Complete post-GREEN gate

- Commit: `25b5f63 test(workflow): add complete green gate`
- `npm run verify:green -- tests/<focused>.spec.ts` runs:
  1. Focused test.
  2. Header, Surface, Action, Locale, and Theme regressions.
  3. Full E2E.
  4. Production build.
  5. `DESIGN.md` validation.
  6. Diff check.
- `DESIGN.md` records the ES/EN × Light/Dark × 320/390/768/1024/1440 matrix and mandatory human visual review.
- The gate does **not** create visual snapshots; snapshots are fixed only after design acceptance.

## Current public records

### WORK

- ImportadorDB — detailed ES/EN case.
- Cosecha en Cope — detailed ES/EN case with approved evidence.

### PROD

- Águilas FC — index record only.
- La Ola Art Gallery — index record only, with live-site link.
- Quinta Bella — index record and detailed ES/EN dossier.
- Fincas Victoria is not yet published as a record: its local source repository is still unavailable for audit.

## Relevant files

- `src/components/SiteHeader.astro` — invariant territorial navigation.
- `src/components/TerritoryIndex.astro` — shared visual record shell and media-slot styling.
- `src/components/WorkIndex.astro` — WORK index semantics.
- `src/components/ProductionIndex.astro` and `src/components/ProductionDossier.astro` — PROD index semantics.
- `src/components/ProductionCase.astro` — documentary PROD case structure.
- `src/components/QuintaBellaCase.astro` and `src/data/quinta-bella-case.ts` — Quinta Bella dossier.
- `src/data/selected-work.ts` — approved index records and actions.
- `DESIGN.md` — design doctrine and U8 gate.
- `scripts/verify-green.mjs` — automated post-GREEN gate.
- `tests/production-dossier.spec.ts` — Quinta Bella contract.
- `tests/green-gate-contract.spec.ts` — U8 workflow contract.

## Working tree — preserve and exclude

- `.atl/skill-registry.md` — automatic registry update.
- `.codex/` — local runtime state.
- `debug.log` — local runtime log.

## Recommended next step

1. Complete and record the mandatory **human visual review** of the current design matrix.
2. Then select the next PROD dossier only after confirming equivalent factual, role, source, and authorized-media evidence. Águilas FC and La Ola Art Gallery are candidates; Fincas Victoria remains blocked until its repository is available.
