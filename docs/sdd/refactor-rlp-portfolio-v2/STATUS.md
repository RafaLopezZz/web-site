# RLP Portfolio v2 — SDD Status

## Change

`refactor-rlp-portfolio-v2`

## Branch

`refactor/rlp-v2-m0-baseline`

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

### M0.6 — PR CI

Status: LOCALLY COMPLETE / REMOTE CI PENDING

Evidence:

- CI workflow created: PASS
- PR trigger configured: PASS
- push-to-master trigger configured: PASS
- Node 24: PASS
- npm ci: PASS
- Chromium-only Playwright install: PASS
- unit test gate: PASS
- E2E gate: PASS
- production build gate: PASS
- minimum permissions: PASS
- no production secrets required: PASS
- local regression: PASS
- remote GitHub Actions run: PENDING
