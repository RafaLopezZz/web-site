# LAB Doctrine — Glea-Nexo

**Decision:** ACCEPTED
**Territory:** LAB
**Routing:** under `/work/`
**Implementation state:** doctrine accepted; public implementation not started

This document defines how Glea-Nexo may be represented as an RLP LAB artifact. It
separates approved public meaning from future implementation. It does not claim
that a route, detail view, media set, or new capability exists.

## Purpose

LAB is the RLP territory for traceable engineering experimentation, laboratory
work, and bounded technical learning. Glea-Nexo belongs here because it explores
edge-to-platform agricultural telemetry, offline continuity, replay,
deduplication, temporal semantics, and reliability boundaries.

The safe public identity is:

> Glea-Nexo is an engineering lab architecturally designed by Rafael to explore
> connected agricultural systems.

The current system is engineering, data-infrastructure, and reliability
groundwork. Its value is in implemented components and bounded validated
experiments, not in Production maturity or an already implemented AI project.

## WORK and LAB

| Territory | Meaning | Public test |
|---|---|---|
| `RLP / WORK` | Selected portfolio work with a finished or clearly bounded professional deliverable. | Can the reader understand what was built, the decisions made, and the evidence for the delivered work? |
| `RLP / LAB` | Experimental or laboratory work whose questions, evidence, limits, and unfinished paths remain visible. | Can the reader distinguish implemented capability, bounded validation, current work, and open limits? |

LAB is not a weaker WORK card and is not a disguised Production case. It may
share the same editorial quality and technical clarity as WORK while using a
different content architecture: questions, experimental boundaries, evidence,
and learning remain first-class. A LAB artifact must not be promoted to
Production merely because it has working software.

## Canonical public states

Use these five public status labels exactly:

| Status | Definition |
|---|---|
| **Implemented** | The capability exists in the inspected repository or documented artifact. This does not prove complete validation, resilience, security, or scale. |
| **Validated** | A bounded, reproducible path has been executed with identified inputs, environment, result, and limits. Validation is not a universal guarantee. |
| **Current work** | The path is actively being investigated or remains unresolved. It must not be described as completed or validated. |
| **Planned** | A future direction has been chosen for consideration, but it is not current capability or approval. |
| **Limit / open question** | Evidence is missing, bounded, contradictory, or insufficient to make a stronger claim; the uncertainty is part of the public record. |

For Glea-Nexo, the authority packet supports implemented edge/platform
components, bounded validated paths, current work around failure/retry/dead
letter/concurrent replay, and planned future AI/Big Data direction. Synthetic
telemetry, absent real sensors and datasets, unmeasured scale, and lab security
boundaries remain limits or open questions.

## Information architecture

### Index

The existing `/work/` index remains the entry point for both WORK and LAB. A LAB
entry must be visibly identified as `RLP / LAB` and use the canonical status
label as text. Work and LAB may share the index shell and navigation, but they
must not be mixed into one undifferentiated category or ranked by color.

The index summary should answer only:

1. What is the experiment or system?
2. Which LAB status applies now?
3. What bounded evidence can the reader inspect?
4. What limitation prevents a stronger claim?

### Detail

A future Glea-Nexo detail surface remains under `/work/`; this doctrine does not
settle a slug or authorize a route by itself. Its reading order is:

1. LAB identity and plain-language purpose.
2. Current status and the boundary of the claim.
3. System context and verified architecture.
4. Experimental question or learning objective.
5. Evidence: protocol, environment, observed result, and source.
6. Current work and open limits.
7. Future AI/Big Data direction and academic qualifier.
8. Media with captions, provenance, and sanitization notes.
9. Truthful links, including the established Spanish article when relevant.

The detail is a readable case record, not a dashboard, tool gallery, image-first
hero, or terminal simulation.

## Experimental evidence requirements

Every public LAB claim must be traceable to an authority source or to a clearly
labelled maintainer attestation. A future implementation must record, where
applicable:

- the exact question, hypothesis, or failure boundary;
- the source, version, commit, or artifact supporting the claim;
- the execution environment and topology, including the Raspberry Pi 3 when it
  is the relevant environment;
- whether data is synthetic, real, or a named external dataset;
- the protocol, inputs, observed states, and result;
- the scope of repetition and what was not exercised;
- the applicable canonical status and the reason for it; and
- the limitation or next question that prevents overclaiming.

For Glea-Nexo, the public record may describe the controlled
MQTT → Node-RED → backend → PostgreSQL → API path, bounded offline accumulation
and successful replay, key-based deduplication with its known semantic limit,
and separated event/receive/process time. FAILED→retry→SENT, DEAD_LETTER, and
replay concurrent with new telemetry remain **Current work**, not validated
results.

## Media strategy

Media is documentary evidence, never a substitute for explanation. Existing
README content, diagrams, runbooks, text evidence, tests, and code excerpts may
be referenced only with their source and current/future boundary. Planned
photos or captures—such as the Raspberry Pi 3, Node-RED flow, MQTT/runtime,
SQLite outbox states, API/UI, or an offline/replay record—are not approved media
until created, reviewed, and authorized.

Before publication:

- use synthetic/demo data unless real data has a separately established legal
  and technical basis;
- provide a caption and meaningful alternative text or a nearby text
  alternative;
- include source, context, and what the image proves;
- sanitize IP addresses, usernames, hostnames, identifiers, secrets, and local
  paths; and
- never imply that a planned artifact already exists.

## Future AI/Big Data and academic qualifiers

AI/Big Data is a central future direction, not a current capability. The current
foundation may support future AI/Big Data experiments, but no AI/ML component,
training or inference pipeline, governed real agricultural dataset, or
distributed Big Data pipeline is demonstrated today.

The academic framing is maintainer-intended and **Planned**: Rafael intends to
evolve this foundation toward the final project for his vocational
specialization course in Artificial Intelligence and Big Data. It is not
academically approved, accepted, submitted, or completed. Until an institution
confirms the exact title, use “final project for the FP specialization course in
Artificial Intelligence and Big Data”; do not use TFG, master's thesis,
bachelor thesis, or equivalent completed-academic labels.

## Visual, surface, and status pattern

LAB reuses the existing RLP system. It is not a new aesthetic or a second theme.

- Keep the established editorial system: IBM Plex Sans for human reading, IBM
  Plex Mono for technical identifiers/evidence, Paper/Ink editorial surfaces,
  bounded Terminal surfaces, restrained RLP Cyan, and visible non-color state
  cues.
- Reuse the existing WorkCase/shared Surface foundation and
  `ArtifactSurface` grammar for LAB. Do not introduce a generic card, a new
  LAB-only surface family, or a Production `DossierSurface`.
- Use Windows 95 references only as restrained information chrome. They must
  clarify containment or context, never imply a draggable application.
- Render status as text using the five canonical labels above. Color, motion,
  media, or a maker mark may support status but may never carry it alone.
- Preserve semantic headings, logical reading order, keyboard focus, readable
  measure, and responsive behavior at the existing RLP targets.

## Routing and Home boundary

LAB is routed under `/work/`, alongside selected WORK artifacts. The existing
Home remains excluded: it must not acquire a Glea-Nexo LAB card, LAB carousel
entry, new Home section, or LAB-specific navigation shortcut as part of this
doctrine.

This documentation change does not add or alter routes. A future implementation
must preserve established Spanish Blog URLs and may link to the relevant
Spanish article with an honest destination label until an equivalent English
case exists.

## Bilingual semantic examples

Spanish and English must preserve meaning, facts, hierarchy, destinations, and
action priority. Translation may reflow for readability but may not create a
stronger claim in one locale.

| Meaning | Spanish example | English example |
|---|---|---|
| LAB identity | `Glea-Nexo es un laboratorio de ingeniería para explorar sistemas agrícolas conectados.` | `Glea-Nexo is an engineering lab for exploring connected agricultural systems.` |
| Data boundary | `La telemetría actual es sintética y la produce un simulador en una Raspberry Pi 3.` | `Current telemetry is synthetic and produced by a simulator on a Raspberry Pi 3.` |
| Bounded validation | `Validated — Se validó un camino controlado de MQTT a la API y una recuperación offline acotada.` | `Validated — A controlled MQTT-to-API path and a bounded offline recovery path were validated.` |
| Future direction | `AI/Big Data es una dirección futura central, no una capacidad actual.` | `AI/Big Data is a central future direction, not a current capability.` |
| Academic boundary | `La dirección del proyecto final está Planned y todavía no ha sido aprobada.` | `The final-project direction is Planned and has not yet been approved.` |

The canonical status labels remain exactly `Implemented`, `Validated`, `Current
work`, `Planned`, and `Limit / open question`; translated explanatory copy
must not replace or redefine them.

## Semantic contract for a future implementation

The future LAB surface is acceptable only if it satisfies all of the following:

- identifies the artifact as `RLP / LAB` and provides a plain-language heading;
- exposes exactly one current canonical status per claim or capability;
- separates implemented capability, validated evidence, current work, planned
  direction, and limits/open questions;
- uses verified sources for every promoted factual statement;
- preserves the synthetic-data, Raspberry Pi 3, and no-real-sensor boundary;
- keeps AI/Big Data and academic language qualified as future and unapproved;
- provides equivalent ES/EN meaning, hierarchy, labels, destinations, and action
  priority;
- stays under `/work/` and does not add the artifact to Home;
- reuses the existing WorkCase/shared Surface foundation and RLP visual system;
- uses documentary media only when provenance, alternative text, caption, and
  sanitization are satisfied; and
- leaves unsupported claims visible as **Limit / open question** or omits them.

## Explicit non-goals and preserved non-claims

This doctrine does not authorize or claim:

- a Production territory or Production maturity;
- exactly-once delivery;
- complete offline resilience, complete security, or complete observability;
- semantic deduplication or guaranteed absence of duplicates;
- real agricultural sensors, real farm deployment, or a real agricultural
  dataset;
- an AI/ML implementation, model, training/inference result, or Big Data
  pipeline;
- academic approval, acceptance, submission, or completion;
- throughput, latency, loss, availability, drain-time, energy, scale, model
  metrics, benchmarks, or Production KPIs that have not been verified;
- fabricated media, screenshots, commits, outcomes, or collaborators; or
- a new aesthetic, dependency, route, source change, test change, media asset,
  Home change, or authority-packet change.

## Bounded next implementation slice

The next implementation slice, separately from this documentation change, is
one Glea-Nexo LAB detail surface under the existing `/work/` territory. It is
bounded to:

1. reconcile legacy Glea content against the authority packet and the current
   repository before promotion;
2. create an auditable evidence inventory and omit any statement without
   adequate provenance;
3. add the minimum ES/EN detail content using the semantic contract above;
4. reuse the existing index, WorkCase/shared Surface foundation,
   `ArtifactSurface`, actions, layout, theme, and accessibility patterns;
5. render only approved or already-authoritative documentary media; and
6. verify route compatibility, semantic status boundaries, bilingual parity,
   evidence limits, and responsive/accessibility behavior before acceptance.

No broader LAB catalog, Home integration, new visual language, AI/Big Data
implementation, academic claim, or media-production program belongs in that
slice.

## Legacy-content reconciliation requirement

Legacy Glea content must be reconciled only within the implementation slice. Do
not copy the existing README, article, route, data, or diagram language forward
as if it were current authority. For every promoted statement, identify whether
it is supported by the authority packet, current source, executable evidence,
or maintainer attestation. Correct, qualify, or omit it in that slice; do not
perform unrelated legacy cleanup.

The reconciliation must preserve the established Spanish article URL and its
truthful relationship to the future LAB detail. It must not silently convert
historical wording into a current capability, especially for security,
resilience, deduplication, deployment, sensors, AI/Big Data, academic status,
metrics, or benchmarks.

## Authority

- [Glea-Nexo Authority Packet Audit](../audit-packet-authority/GleaNexo_Authority_Packet_Audit.md)
- [RLP Portfolio v2 status](./STATUS.md)
- [M2 Home and Work implementation record](./M2.md)
- [RLP Design Doctrine](../../../DESIGN.md)
