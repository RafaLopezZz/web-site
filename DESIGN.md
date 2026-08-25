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

The internal creative principle is **`Engineered, not generated.`** It guides craft and evidence internally and must not become an oversized marketing slogan.

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

Typography roles are display for page and case titles, editorial for long-form reading, interface for navigation and controls, metadata for compact facts, and monospace for CMD, paths, files, commands, and code evidence.

The final family is unresolved. The current DM Sans/Syne implementation is implementation evidence only, not an approved final family, fallback stack, scale, or metric. Monospace never replaces editorial body text. Use hierarchy, weight, measure, and whitespace to make reading order clear.

## Layout

Use a light editorial canvas, clear reading column, deliberate whitespace, and evidence that can be scanned before it is read. Larger screens may pair narrative with evidence; smaller screens preserve one logical reading order with no horizontal scrolling or hidden meaning.

The hero contains the exact bounded CMD concept: `C:\RLP> whoami`, a focus/status line, and a restrained RLP Cyan cursor. It introduces the developer and work context, then yields to the editorial thesis and primary action. It is not an interactive terminal requirement, a terminal simulator, or a dark full-page hero.

Windows 95 is allowed only as restrained information chrome: a window edge, title bar, window controls as non-essential decoration or real labeled controls, explorer tree containment, a status cue, or an image-viewer/notepad frame around matching content. Allowed metaphors are explorer/workspace containment for Selected Work, a chronological system log for Experience, `education.log` for Education, `C:\RLP\NOTES` as a Notes index, NotepadChrome for a long-form article, and ImageViewerChrome for gallery/diagrams. Production cases remain separate from personal and lab work. It is banned as a full-page operating-system clone, fake desktop, draggable-window requirement, tiny inaccessible controls, nostalgic decoration without information purpose, or a replacement for responsive editorial layout.

Use content metaphors consistently: `RLP / WORK` identifies selected portfolio work, `RLP / LAB` identifies experimental and laboratory work, `RLP / PROD` identifies real production cases and professional production evidence, and `C:\RLP\NOTES` identifies long-form notes and technical articles. These labels aid orientation; they do not replace plain-language headings or navigation labels.

Production cases use this reading order: `CONTEXT`, `CHALLENGE`, `ENGINEERING`, `OUTCOME`, `LEARNING`, `DISCUSS`, `EVIDENCE`. Include Rafael's role, constraints, decisions, implementation proof, and current status where relevant. Do not present a case as a tool gallery, logo wall, generic feature list, or image-first marketing card.

Future IA is exactly: Hero / identity, Selected Work, Production, Experience, Education, Notes, About, Contact, Footer. Each section must extend the same territories with meaningful labels and explicit destinations. Do not introduce a generic `Cómo trabajo` section; describe the relevant role, process, or evidence where it belongs.

Responsive targets are 320px, 390px, 768px, and >=1024px. At every target, preserve content, labels, destinations, primary-action priority, landmarks, readable measure, visible focus, and practical 44px-ish touch targets where interaction exists. Support readable zoom and reflow. Use real links and buttons only when interactive, and ensure no interaction depends on hover. Navigation may collapse, grids may stack, and evidence may follow its explanation.

## Elevation & Depth

The editorial canvas is flat. A border, divider, or quiet shadow may clarify navigation, a case boundary, evidence containment, or a bounded terminal surface. Depth is semantic, restrained, and never decoration by default.

Do not stack shadows, use glass as a default surface, build floating-card dashboards, or add depth just to look technical. Terminal depth belongs only to terminal semantics; Windows 95 depth remains a minor accent.

## Shapes

Use square or near-square editorial bounds, simple rules, and clear outlines. Corners, borders, and separators clarify grouping and interaction. Pills are limited to compact metadata or tags; they never replace buttons, navigation, or case structure.

Do not use rounded decorative cards, excessive badges, ornamental blobs, or generic SaaS-card geometry.

## Components

Each primitive has one bounded responsibility. It must preserve semantic HTML, keyboard operation, visible focus, logical DOM order, accessible names, and a non-color state cue. Motion is optional and non-essential; honor `prefers-reduced-motion: reduce` by removing cursor blink, transitions, auto-typing, and decorative movement. Allowed motion is a subtle cursor blink, small hover/focus transitions, and restrained content reveal. Avoid boot animations, window flying, CRT distortion, fake loading, constant terminal typing, and intrusive parallax.

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
- Do not invent color-token values, a final font family or stack, type metrics, or visual effects before their M1 decisions exist.
- Do not hide essential destinations behind hover, icons alone, or explorer-tree interaction.
- Do not use vague generic IA such as `Cómo trabajo`, unsupported outcome claims, feature-only marketing copy, or tool-logo mosaics.
- Do not use a `passionate`, `innovative`, or `expert` visual marketing tone, or invent proof or production claims.
- Do not skip heading levels, rely on placeholder-only form labels, use color-only errors, or make users depend on animation to read content.
