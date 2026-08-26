# RLP Portfolio v2 — SDD Status

## Change

`refactor-rlp-portfolio-v2`

## Branch

`design/rlp-v2-m1-foundation`

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

### B-002

Navbar emits `aria-current="page"` while legacy CSS targets
`aria-current="true"`.

Not fixed during M0.

### B-003

ImportadorDB Java/JavaFX version differs between project metadata and
long-form article.

Authoritative value not established.

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
