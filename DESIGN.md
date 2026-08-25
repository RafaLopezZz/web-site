---
version: 1
name: RLP Portfolio Design Doctrine
description: A bilingual editorial portfolio system with bounded Windows 95 and CMD references.
colors:
  paper: "#F2F0EA"
  ink: "#111315"
  terminal: "#0C0C0C"
  rlp-cyan: "#059AAF"
  graphite: "#606568"
---

# RLP Design Doctrine

## Overview

The RLP portfolio is a bilingual Spanish/English professional record for evaluating real software work. The primary public identity is **Rafael López**, **Software Developer**; do not publicly label the role Junior, Mid, or Senior. Professional territories are exactly **`Backend · Datos · Sistemas`** in Spanish and **`Backend · Data · Systems`** in English. The Spanish public/editorial principle is **`Software útil. Decisiones explicables. Trabajo verificable.`** RLP is a visual signature, maker mark, and secondary identity device; GitHub is a destination, not the primary brand.

The internal creative principle is **`Engineered, not generated.`** It guides craft and evidence internally only; it must not become a footer slogan, public headline, or oversized marketing slogan.

This is hierarchy, not literal layout: Editorial content is 60%; Windows 95 information structure is 25%; CMD/terminal evidence is 10%; and RLP identity is 5%. Editorial reading leads every screen. Windows 95 supports containment and orientation. CMD proves technical context. RLP identity signs the work without competing with it.

Light mode is the default doctrine: Paper surfaces, Ink reading text, and calm editorial space. Dark is not a site theme. Terminal is reserved for bounded CMD, code, command output, and explicit technical evidence.

Spanish and English are complete public territories. They must preserve meaning, facts, hierarchy, labels, destinations, and action priority. Translation may reflow for readable line length; it must not mirror sentence length or create a weaker locale.

## Colors

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#F2F0EA` | Default editorial canvas and light surfaces |
| Ink | `#111315` | Primary reading text and high-contrast outlines |
| Terminal | `#0C0C0C` | Bounded CMD/code technical surfaces only |
| RLP Cyan | `#059AAF` | Focus, selection, active state, and restrained cursor signal |
| Graphite | `#606568` | Secondary text, quiet rules, and metadata |

The canonical colors express semantic intentions: Paper is the editorial canvas, Ink is readable primary content, Terminal denotes bounded technical evidence, RLP Cyan denotes meaningful focus/selection/activity, and Graphite supports secondary information. The Windows grey classic neutral/bevel family is reserved for chrome, borders, bevels, titlebars, and supporting UI. Legacy `#00E5FF` is explicitly not part of RLP v2 and must not be added as a token.

RLP Cyan never carries meaning alone. Every state also has text, structure, iconography with a label, or another non-color cue. Maintain accessible contrast for text, controls, focus indicators, and borders on their actual surfaces.

## Typography

IBM Plex Sans is the single primary editorial and UI family. Use it for all human reading and interface roles: page and case headings, long-form copy, navigation, controls, labels, human-readable metadata such as `Fecha`, `Estado`, `Rol`, and `Institución`, and captions. Sans means human reading and interface. Use Sans 400 for body copy and captions, 500 for navigation, labels, and compact metadata, 600 for subheadings and control emphasis, and 700 for page and case headings. There is no third display family.

IBM Plex Mono is subordinate semantic technical typography only: CMD text, code, paths, file names, command fragments, system/technical identifiers and values such as `RLP / PROD / 002`, `[career.log]`, `[production.index]`, `C:\RLP\NOTES`, and `lockForUpdate()`, case IDs, and system evidence. Mono means system, evidence, and technical context. Use Mono 400 for technical content and 500 for technical emphasis. Do not make all metadata Mono: Mono must never replace editorial body text, navigation labels, human-readable metadata, or real headings. For example, `EXPERIENCIA [career.log]` is a Sans heading followed by subordinate Mono evidence, not a Mono display title.

The conceptual fallback chains are `font-sans` for IBM Plex Sans, then a system sans-serif, and `font-mono` for IBM Plex Mono, then a system monospace. This doctrine does not choose a font-loading mechanism, font metrics, sizes, or line heights; M1.3 resolves implementation metrics. DM Sans and Syne are legacy implementation evidence only and are not approved for new design work.

## Layout

Use a light editorial canvas, clear reading column, deliberate whitespace, and evidence that can be scanned before it is read. Larger screens may pair narrative with evidence; smaller screens preserve one logical reading order with no horizontal scrolling or hidden meaning.

### SiteHeader and Global Navigation

`SiteHeader` is the one invariant visual navigation system on every route: RLP brand, common header height, Paper or Windows-grey surface, bottom line, consistent type hierarchy, active treatment, visible focus, ES/EN locale access, and content-fit responsiveness. Territory grammar begins below this header. Do not introduce `RLP // SYSTEM`, `C:\RLP\ROOT`, or route-specific replacement headers.

Use semantic navigation and `aria-current` for the current destination. Current state uses bounded RLP Cyan plus a visible non-color underline or line; route backgrounds are prohibited. At 320--390px, show a real keyboard-operable menu with RLP, the full navigation, and locale access. At 768px, a truthful `Más`/overflow control is acceptable. At >=1024px, show the complete navigation as space permits. Breakpoints follow content fit, not device labels.

### Home and Route IA

Home is intentionally short: **Header / Hero / Featured Evidence / Explore / Footer**. Featured Evidence contains a small selected set of WORK plus one PROD entry. Home must not reproduce full Experience, Education, Notes, About, or a Contact form.

The dedicated route IA is `/` (short orientation and featured evidence), `/work/` (selected WORK and LAB artifacts), `/production/` (accountable production dossiers), `/experience/` (career record), `/education/` (education and qualifications), `/notes/` (notes index), `/notes/[slug]/` (one readable note), `/about/` (identity and working context), and `/contact/` (contact destinations and form). The English locale provides complete equivalent routes under `/en`: `/en/`, `/en/work/`, `/en/production/`, `/en/experience/`, `/en/education/`, `/en/notes/`, `/en/notes/[slug]/`, `/en/about/`, and `/en/contact/`, with equal meaning, facts, hierarchy, labels, destinations, and action priority. The established public Spanish Blog URLs `/blog/`, `/blog/desarrollo-importador-db/`, `/blog/desarrollo-cosecha-en-cope/`, and `/blog/historia-transición/` remain valid and must never become 404 as a result of the RLP v2 refactor. The new Notes IA does not break established Blog URLs.

### Global Action System

Actions are global primitives, not page-specific styles. Primary actions have Ink background, Paper text, a sharp outline, an explicit hover change, visible non-color `:focus-visible`, and a clear commitment affordance; use them for the primary route or contact action. Secondary actions have Paper background, Ink text, Ink border, sharp geometry, explicit hover change, and the same visible non-color focus; use them for an alternate destination. Text / Action Links have no filled background, recognizable text-link affordance, explicit hover and visible non-color focus; use them for lower-emphasis destinations such as `Ver caso →`.

All interactive actions have a practical 44px-ish target, square or near-square geometry, and no pill treatment. Use a link for navigation and a button only for a real in-page action. Disabled state is allowed only when an action is genuinely unavailable, never as visual decoration. External destinations are distinguished with text or a labelled external indicator such as `Ver sitio ↗`.

### Surface Foundation

All surfaces share the core Paper, line, focus, spacing, and semantic-order systems, but their territory grammar differs. A universal generic Card is prohibited.

- **ArtifactSurface** serves WORK or LAB: it may use `RetroWindow`, grey chrome, a titlebar, and concise evidence without implying a draggable window.
- **DossierSurface** serves PROD: it is documentary, with case ID, factual metadata, screenshots and evidence, and `CONTEXT`, `CHALLENGE`, `ENGINEERING`, `EVIDENCE`; it must not use Windows titlebars.
- **RecordSurface** serves Experience and Education: use rules, aligned chronology, and minimal containment; do not wrap every record in a window or card.
- **ExplorerSurface** serves NOTES: use rows, path context, and semantic navigation; do not simulate a file manager.

### CMD Identity Panel

`CmdPrompt` is the canonical RLP-specific bounded identity panel: classic grey chrome, a dark terminal interior, sharp edges, decorative controls, and a restrained cyan cursor. Its permitted content is identity and technical context only, including `C:\RLP\identity.exe`, `C:\RLP> whoami`, `rlp-sys-admin`, and `C:\RLP> █`. Do not show `C:\WINDOWS\system32\cmd.exe`, fake runtime output, status theater, loading, activity logs, or simulated interaction. Identity is not activity.

Windows 95 is allowed only as restrained information chrome: a window edge, title bar, window controls as non-essential decoration or real labeled controls, explorer tree containment, a status cue, or an image-viewer/notepad frame around matching content. Allowed metaphors are explorer/workspace containment for Selected Work, a chronological system log for Experience, `education.log` for Education, `C:\RLP\NOTES` as a Notes index, NotepadChrome for a long-form article, and ImageViewerChrome for gallery/diagrams. Production cases remain separate from personal and lab work. It is banned as a full-page operating-system clone, fake desktop, draggable-window requirement, tiny inaccessible controls, nostalgic decoration without information purpose, or a replacement for responsive editorial layout.

Use content metaphors consistently: `RLP / WORK` identifies selected portfolio work, `RLP / LAB` identifies experimental and laboratory work, `RLP / PROD` identifies real production cases and professional production evidence, and `C:\RLP\NOTES` identifies long-form notes and technical articles. These labels aid orientation; they do not replace plain-language headings or navigation labels.

Production cases use this reading order: `CONTEXT`, `CHALLENGE`, `ENGINEERING`, `OUTCOME`, `LEARNING`, `DISCUSS`, `EVIDENCE`. Include Rafael's role, constraints, decisions, implementation proof, and current status where relevant. Do not present a case as a tool gallery, logo wall, generic feature list, or image-first marketing card.

Production cases have equal editorial dignity by default: `RLP / PROD / 001 — Águilas FC`, `RLP / PROD / 002 — La Ola Art Gallery`, `RLP / PROD / 003 — Quinta Bella`, and `RLP / PROD / 004 — Fincas Victoria`. Documentation order or available evidence does not create a primary or secondary hierarchy. Cases may have different lengths or screenshot counts, but no case may dominate the production index without an explicit future editorial decision.

### Territory Grammar and Evidence

**HOME** orients with the short Home sequence and routes readers to fuller territories. **WORK** presents selected WORK and LAB artifacts with context, status, and concise real evidence. **PRODUCTION** presents accountable dossiers with case ID, role, constraints, decisions, production screenshots, `Ver sitio ↗` only when a real live destination exists, and `Ver caso →`. **EXPERIENCE** presents a chronological career record with responsibility and factual context. **EDUCATION** presents qualifications and relevant factual evidence. **NOTES** presents a navigable index and readable technical articles. **ABOUT** explains Rafael's identity and working context without generic marketing claims. **CONTACT** provides direct contact destinations and a truthful accessible form where available.

Use screenshots, code, tests, diagrams, commits, and live links only when they are real. Never fabricate evidence, runtime claims, commits, outcomes, screenshots, or production status. Screenshots are documentary evidence with source and explanation, not marketing heroes.

### Responsive Home

Responsive targets are 320px, 390px, 768px, and >=1024px. At 320--390px, Home is one column: CMD follows the hero, featured evidence stacks, navigation remains usable, and WORK and PROD remain distinct. At 768px, the hero may become two columns with CMD on the right, featured evidence remains stacked when that protects readability, and the header may use a truthful `Más` overflow. At >=1024px, hero and featured evidence may each use two columns and the complete navigation appears as space permits. Preserve semantic content, labels, destinations, primary-action priority, landmarks, readable measure, visible focus, and practical touch targets at every target. Remove decorative chrome before content; do not hide meaning, require hover, or create horizontal scrolling.

### Token Intent

Token families describe intent without fixed metrics: `font-sans` and `font-mono`; `line-subtle`, `line-default`, and `line-strong`; `chrome-surface`, `chrome-highlight`, and `chrome-shadow`; `focus-color` and `focus-width`; `content-max` and `reading-max`; and one consistent spacing scale. M1.3 resolves concrete code values and typography metrics.

## Elevation & Depth

The editorial canvas is flat. A border, divider, or quiet shadow may clarify navigation, a case boundary, evidence containment, or a bounded terminal surface. Depth is semantic, restrained, and never decoration by default.

Do not stack shadows, use glass as a default surface, build floating-card dashboards, or add depth just to look technical. Terminal depth belongs only to terminal semantics; Windows 95 depth remains a minor accent.

## Shapes

Use square or near-square editorial bounds, simple rules, and clear outlines. Corners, borders, and separators clarify grouping and interaction. Pills are limited to compact metadata or tags; they never replace buttons, navigation, or case structure.

Do not use rounded decorative cards, excessive badges, ornamental blobs, or generic SaaS-card geometry.

## Components

Each primitive has one bounded responsibility. Add a component only when a repeated semantic contract requires it; do not create premature components. Every component must preserve semantic HTML, keyboard operation, visible focus, logical DOM order, accessible names, and a non-color state cue. Motion is optional and non-essential; honor `prefers-reduced-motion: reduce` by removing cursor blink, transitions, auto-typing, and decorative movement. Allowed motion is a subtle cursor blink, small hover/focus transitions, and restrained content reveal. Avoid boot animations, window flying, CRT distortion, fake loading, constant terminal typing, and intrusive parallax.

### SiteHeader

- Semantic purpose: provide the site's single primary identity and navigation landmark.
- Visual responsibility: keep the invariant RLP brand, common height, Paper or grey surface, bottom line, type hierarchy, locale access, and bounded cyan-plus-line current state above every territory.
- Accessibility rule: use semantic navigation and `aria-current`; current and focus states have visible non-color cues; the 320--390 menu exposes full navigation and locale access by keyboard; `Más` is truthful when used.
- Prohibited behavior: `RLP // SYSTEM` or `C:\RLP\ROOT` variants, route-specific replacements or backgrounds, hover-only navigation, or decorative hiding of essential destinations.

### Action

- Semantic purpose: perform a real in-page action.
- Visual responsibility: render a Primary Ink/Paper action or Secondary Paper/Ink/border action with sharp geometry, explicit hover, and no territory-specific styling.
- Accessibility rule: use a native button only for an in-page action, with an accessible name, keyboard operation, 44px-ish target, visible non-color focus, and a genuine disabled state only when unavailable.
- Prohibited behavior: navigating by button when a link is correct, pills, fake disabled states, unlabeled icons, or decorative controls presented as actionable.

### ActionLink

- Semantic purpose: navigate to a real destination.
- Visual responsibility: render Primary, Secondary, or unfilled Text / Action Link hierarchy with recognizable link affordance, sharp geometry where framed, and an explicit external distinction.
- Accessibility rule: use a real link with descriptive destination text, 44px-ish target where it is a control, visible non-color focus, keyboard operation, and a non-color state cue.
- Prohibited behavior: using a link for an in-page action, vague link text, pills, page-specific variants, or unlabeled external destinations.

### Surface

- Semantic purpose: contain related content with shared editorial semantics.
- Visual responsibility: provide shared Paper, line, focus, spacing, and restrained semantic chrome while allowing territory-specific grammar.
- Accessibility rule: preserve logical document order; use a section, article, or named region when required; surface treatment never hides heading or evidence relationships.
- Prohibited behavior: acting as a universal generic Card, introducing glass or decorative rounding, obscuring hierarchy, or forcing one territory's chrome onto another.

### ArtifactSurface

- Semantic purpose: contain a WORK or LAB artifact and its evidence.
- Visual responsibility: support concise context, status, evidence, and destinations; `RetroWindow`, grey chrome, and a titlebar are permitted only as contained artifact grammar.
- Accessibility rule: retain real headings, textual status, descriptive evidence links, and document-order reading without a drag interaction.
- Prohibited behavior: claiming production status, becoming a logo wall, replacing narrative with technology tags, or implying a draggable window.

### DossierSurface

- Semantic purpose: contain a PROD case as an accountable production dossier.
- Visual responsibility: support case ID, factual metadata, screenshots, evidence, and `CONTEXT`, `CHALLENGE`, `ENGINEERING`, `EVIDENCE` in documentary reading order.
- Accessibility rule: preserve heading order, factual labels, captions or alternatives for screenshots, and accessible evidence destinations.
- Prohibited behavior: Windows titlebars, marketing-card framing, unsupported outcomes, fabricated proof, or image-only evidence.

### RecordSurface

- Semantic purpose: contain an Experience or Education record.
- Visual responsibility: use rules, aligned chronology, role or qualification, and factual metadata with minimal containment.
- Accessibility rule: keep chronology and values in logical text order with explicit labels and readable alignment at narrow widths.
- Prohibited behavior: per-record windows or cards, dashboard-tile treatment, vague credential claims, or using metadata as a substitute for responsibility or qualification.

### RetroWindow

- Semantic purpose: contain a related editorial, evidence, or utility region.
- Visual responsibility: provide the limited Windows 95 boundary and title context.
- Accessibility rule: use a named region or section with a real heading; reading order remains document order.
- Prohibited behavior: draggable desktops, modal behavior without dialog semantics, or wrapping unrelated page content as nostalgia chrome.

### RetroTitleBar

- Semantic purpose: identify the contained region.
- Visual responsibility: show a concise title within `RetroWindow`.
- Accessibility rule: expose the same title as a heading or accessible name; decorative title treatment is ignored by assistive technology.
- Prohibited behavior: replacing the page heading, carrying critical state by color, or becoming a fake application menu.

### RetroWindowControls

- Semantic purpose: offer only real, optional window-level actions when needed.
- Visual responsibility: render restrained Windows 95 control affordances.
- Accessibility rule: every enabled control is a keyboard-operable button with an accessible name and visible focus; decorative controls are hidden from assistive technology.
- Prohibited behavior: unlabeled icon-only actions, fake minimize/maximize/close controls, or controls smaller than usable touch targets.

### CmdPrompt

- Semantic purpose: present short command or system evidence, including `C:\RLP> whoami` in the hero.
- Visual responsibility: provide the bounded Terminal surface, focus/status text, and restrained RLP Cyan cursor.
- Accessibility rule: expose command and output as selectable text; cursor animation is non-essential and disabled for reduced motion.
- Prohibited behavior: requiring input, auto-typing that delays reading, command-only navigation, or a full-page dark theme.

### RetroTree

- Semantic purpose: show a small, meaningful hierarchy of RLP territories or evidence files.
- Visual responsibility: suggest explorer structure without replacing navigation.
- Accessibility rule: use a semantic list, or the full tree keyboard pattern when interactive; current location is programmatic.
- Prohibited behavior: arbitrary nested decoration, inaccessible arrow-only interaction, or hiding essential destinations in the tree.

### ExplorerChrome

- Semantic purpose: frame work or notes with an explorer-context cue.
- Visual responsibility: provide limited path and containment around `RLP / WORK`, `RLP / LAB`, `RLP / PROD`, or `C:\RLP\NOTES`.
- Accessibility rule: path text remains readable and does not replace a real heading, landmark, or navigation label.
- Prohibited behavior: a fake file manager, desktop simulation, or path labels as the only way to understand content.

### NotepadChrome

- Semantic purpose: frame note-like technical writing.
- Visual responsibility: distinguish `C:\RLP\NOTES` content from production cases without changing its editorial reading role.
- Accessibility rule: content remains normal selectable document text with headings, links, and readable contrast.
- Prohibited behavior: faux editable text, handwriting styling that harms readability, or scrollable text traps.

### ImageViewerChrome

- Semantic purpose: contain image evidence with its source and explanation.
- Visual responsibility: separate media evidence from adjacent narrative without overpowering it.
- Accessibility rule: provide meaningful alt text or a nearby text alternative and a caption; no essential fact exists only in pixels.
- Prohibited behavior: image-first marketing cards, unreadable screenshots as sole proof, or mandatory lightbox interaction.

### RlpLabel

- Semantic purpose: identify an RLP territory or compact system context.
- Visual responsibility: render canonical labels such as `RLP / WORK`, `RLP / LAB`, and `RLP / PROD`.
- Accessibility rule: label text is present, legible, and never conveyed only by color or maker mark.
- Prohibited behavior: replacing headings, becoming a tag cloud, or serving as unlabeled navigation.

### MetadataRow

- Semantic purpose: expose compact case facts such as role, status, date, and technical context.
- Visual responsibility: support scanning without becoming the narrative.
- Accessibility rule: each value has an explicit text label; status has a non-color cue and maintains logical reading order.
- Prohibited behavior: replacing responsibilities with technology tags, hiding factual qualifiers, or using pills as unlabeled controls.

## Do's and Don'ts

### Do

- Do let content and evidence lead.
- Do lead with Rafael López's work, role, constraints, decisions, and evidence.
- Do keep Spanish and English semantically equivalent while allowing intentional reflow.
- Do keep light editorial reading as the default and dark Terminal surfaces bounded to terminal meaning.
- Do use Windows 95 references only to clarify structure, status, or containment.
- Do use cyan only when it is meaningful.
- Do use `RLP / WORK`, `RLP / LAB`, `RLP / PROD`, and `C:\RLP\NOTES` consistently alongside plain-language labels.
- Do use the production-case order `CONTEXT`, `CHALLENGE`, `ENGINEERING`, `OUTCOME`, `LEARNING`, `DISCUSS`, `EVIDENCE`.
- Do preserve the same content and action priority at 320px, 390px, 768px, and >=1024px.
- Do provide landmarks, semantic headings, visible keyboard focus, descriptive links, readable text, practical 44px-ish touch targets where interaction exists, readable zoom/reflow, real links and buttons only when interactive, and meaningful text alternatives.
- Do make interactive-looking elements truthful.
- Do maintain strong readability.
- Do use system metaphors consistently.
- Do make motion short, optional, non-essential, and disabled or reduced for `prefers-reduced-motion`.
- Do preserve plain language alongside technical detail.

### Don't

- Do not turn the portfolio into a dark SaaS dashboard, cyberpunk landing page, retro Windows 95 clone, terminal simulator, logo wall, or generic rounded-card gallery.
- Do not use generic AI gradients, glassmorphism, fake accessible controls, fake terminal navigation, meaningless retro decoration, or large generic SaaS card grids.
- Do not use a dark alternate site theme, a fake desktop, draggable windows, or interactive terminal behavior as a requirement.
- Do not use motion, color, iconography, device width, screenshots, or the maker mark as the sole carrier of meaning.
- Do not use cyan as body text, a large decorative field, or the only indicator of focus, status, or selection.
- Do not invent unapproved token values, type metrics, effects, or new font families beyond established design decisions.
- Do not hide essential destinations behind hover, icons alone, or explorer-tree interaction.
- Do not use vague generic IA such as `Cómo trabajo`, unsupported outcome claims, feature-only marketing copy, or tool-logo mosaics.
- Do not use a `passionate`, `innovative`, or `expert` visual marketing tone, or invent proof or production claims.
- Do not skip heading levels, rely on placeholder-only form labels, use color-only errors, or make users depend on animation to read content.
