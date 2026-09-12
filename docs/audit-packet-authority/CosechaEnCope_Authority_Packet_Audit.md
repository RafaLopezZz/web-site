# Cosecha en Cope — Authority Packet v2

**Status:** canonical candidate for maintainer review
**Settlement date:** 11 September 2026
**Evidence baseline:** `CosechaEnCope_Authority_Packet_Audit.md` plus direct maintainer settlement
**Mutation boundary:** no repository, branch, issue, PR or portfolio content was modified

## Authority legend

| Type | Meaning |
|---|---|
| FACT | Directly observable in code, Git, tests or an inspectable artifact. |
| INFERENCE | Reasoned conclusion that must not be presented as direct proof. |
| MAINTAINER_ATTESTED | Rafael's direct authority about authorship, history or real-world events; not independent Git evidence. |
| MAINTAINER_INPUT_REQUIRED | A remaining question that only Rafael or unavailable evidence can settle. |

Defense levels: **A** direct demonstration; **B** strong evidence and/or maintainer authority; **C** mainly memory/self-report; **D** conflicting; **E** do not publish.

## 1. Executive verdict

**YES WITH SPECIFIC GAPS.** Cosecha en Cope is defensible as Rafael's formally presented and approved final DAM project: an academic full-stack agricultural marketplace prototype designed and developed by him from scratch with technical documentation, Stack Overflow and GPT-3 as support.

The surviving repository directly demonstrates Java 17, Spring Boot 3.5.2, JPA/Hibernate, PostgreSQL, Thymeleaf, Angular 20, JWT authentication, a multi-producer order model, AWS S3 integration, OpenAPI/Actuator and tests. Rafael's settlement additionally establishes an earlier Angular 19 phase, manual S3 validation, academic approval and authorship.

It must not be framed as Production, externally deployed, commercially used, demonstrably scalable, securely authorized in every path or proven to have improved SEO.

## 2. Changes from v1

| v1 position | v2 settlement |
|---|---|
| Academic completion required confirmation | **CLOSED:** final DAM project, formally presented and approved; grade 6. |
| Full authorship required confirmation | **CLOSED:** Rafael designed and developed it from scratch; GPT-3/support sources do not remove authorship. |
| Angular 19 vs 20 classified as conflict | **CLOSED:** Angular 19 was historical; Angular 20 is current in surviving Git; history was reconstructed. |
| Real S3 validation unknown | **CLOSED:** numerous real manual upload/delete operations; not Production. |
| External use unknown | **CLOSED:** academic demo, not public and not accessible to third parties. |
| Distributor role unresolved | **CLOSED:** no distinct Distributor actor; the relevant actor is Productor. |
| Media data sensitivity unknown | **CLOSED for data:** screenshots/diagrams use demo data; ownership/licensing review remains. |
| Personal learning inferred only | **CLOSED:** three learning areas are directly maintainer-attested. |

## 3. Identity

| Field | Canonical authority |
|---|---|
| Name | Cosecha en Cope — FACT, VERIFIED_CURRENT, A. |
| Nature | Academic full-stack agricultural marketplace prototype — FACT + MAINTAINER_ATTESTED, A/B. |
| Academic status | Rafael's final DAM project, formally presented and approved — MAINTAINER_ATTESTED, B. |
| Grade | 6 — MAINTAINER_ATTESTED, B; INTERNAL/HISTORICAL context by default. |
| Portfolio territory | WORK / academic case, not Production — SUPPORTED, B. |
| Repository authority | Surviving `main` at `68097dd…` (17 January 2026) — VERIFIED_CURRENT, A.[^C1] |

The attempted live demo and its negative effect on the grade are historical interview context, not normal public copy.

## 4. What

The application implements an agricultural marketplace prototype in which producers publish products and customers browse, add products to a cart and create orders. A customer order is decomposed into producer-specific sales orders.

- **FACT:** customers, producers, products, cart, order and producer-order concepts exist in code.[^C2]
- **FACT:** public server-rendered pages and an authenticated SPA/API exist.[^C3]
- **MAINTAINER_ATTESTED:** it was an academic project/demo without third-party access.
- **MAINTAINER_ATTESTED:** no separate Distributor actor was implemented.
- **UNKNOWN:** external validation of the problem through interviews or users; do not infer it.

## 5. Role

Rafael designed and developed the project from scratch. His direct work covered flow diagrams, architecture, design patterns, use cases, business logic and implementation. Development support came from technical documentation, Stack Overflow and GPT-3.

**Classification:** `MAINTAINER_ATTESTED / B`, strengthened by code and commits attributed to Rafael's account.

| Area | Authorship authority |
|---|---|
| Architecture, diagrams and patterns | DESIGNED/CREATED BY RAFAEL — MAINTAINER_ATTESTED, B. |
| Use cases and business logic | BUILT BY RAFAEL — MAINTAINER_ATTESTED + SUPPORTED, B. |
| Spring/JPA/REST implementation | BUILT BY RAFAEL — MAINTAINER_ATTESTED + Git/code, A/B. |
| Thymeleaf + Angular integration | BUILT BY RAFAEL — MAINTAINER_ATTESTED + code, A/B. |
| JWT/Spring Security | BUILT BY RAFAEL — MAINTAINER_ATTESTED + code, A/B. |
| AWS S3 integration | BUILT AND MANUALLY VALIDATED BY RAFAEL — B. |
| Tests | BUILT BY RAFAEL; presence verified, current full execution not verified — A/B. |
| Assistance | Documentation, Stack Overflow, GPT-3 — AI-ASSISTED / MAINTAINER_ATTESTED. |

GPT-3 assistance is not evidence against human authorship. Rafael owns the engineering decisions and must be able to explain their rationale and limits.

## 6. Context

- Final DAM project, presented and approved — MAINTAINER_ATTESTED, B.
- Grade 6; live-demo attempt negatively affected grading — MAINTAINER_ATTESTED, historical/internal by default.
- Public surviving history spans September 2025 to January 2026.[^C1][^C4]
- Not publicly deployed and not used by third parties — MAINTAINER_ATTESTED, B.
- Possible future revival — FUTURE INTENT only.

## 7. Constraints

| Constraint | Authority | Design effect |
|---|---|---|
| Academic delivery and presentation | MAINTAINER_ATTESTED | Bounded scope and MVP-style completion. |
| Public discoverability plus application UX | FACT/INFERENCE | Thymeleaf public pages + Angular SPA. |
| Orders containing products from multiple producers | FACT | Separate producer-specific sales orders. |
| External image storage | FACT + MAINTAINER_ATTESTED | AWS SDK integration and manual cloud operations. |
| Profile-based security | FACT as intention | JWT/roles/guards, but authorization is incomplete. |
| Single deployable web origin | FACT | Angular build served under Spring's `/app`. |

Budget, team constraints, formal non-functional requirements and data-protection requirements remain UNKNOWN.

## 8. Key decisions

| Decision | Status | Evidence |
|---|---|---|
| Layered Spring Boot REST backend | CURRENT / VERIFIED, A | Controllers, services and repositories.[^C5] |
| JPA/Hibernate with PostgreSQL | CURRENT / VERIFIED, A | Build configuration and entities.[^C2][^C6] |
| Customer order plus producer-specific sales orders | CURRENT / VERIFIED, A/B | `Pedido`, `OrdenVentaProductor` and detail entities.[^C2] |
| Thymeleaf SSR for public pages + Angular SPA under `/app` | CURRENT / VERIFIED, A | Backend resources and Angular build configuration.[^C3] |
| Stateless JWT authentication | CURRENT / VERIFIED, A | JWT filter/utilities and security configuration.[^C7] |
| AWS S3 for image lifecycle | IMPLEMENTED + MANUALLY VALIDATED, B | SDK/config/service + maintainer settlement.[^C8] |
| OpenAPI/Swagger and Actuator | CURRENT / VERIFIED, A | Maven dependencies/configuration.[^C6] |
| Backend, Angular and Cypress test layers | PRESENT / VERIFIED, A | Test artifacts; full current green run UNKNOWN. |

## 9. Trade-offs

| Decision | Benefit | Cost / accepted risk |
|---|---|---|
| Thymeleaf + Angular | Indexable public HTML and richer application UX | Two rendering models, routing/build complexity and duplicated UI concerns. |
| Angular packaged under Spring | Same-origin delivery and one deployable unit | Coupled builds, base-path/fallback/caching complexity. |
| JPA/Hibernate | Fast relational modelling and repository productivity | Lazy loading, N+1, circular serialization and schema-control risks. |
| JWT | Stateless API authentication | Revocation, secret management and fine-grained authorization complexity. |
| S3 | Keeps binary content outside the application server | Credentials, permissions, object/DB consistency and failure recovery. |
| Producer-specific sales orders | Clear operational view per producer | Coordinated transaction/state complexity. |
| Multi-layer testing | Unit/component/E2E viewpoints | File counts do not prove coverage, quality or a green current build. |

## 10. Version history

| Milestone | Authority |
|---|---|
| Spring Boot base, Java 17 | 01-09-2025 commit — VERIFIED_HISTORICAL, A.[^C4] |
| JPA domain | 03-09-2025 commit — VERIFIED_HISTORICAL, A.[^C9] |
| JWT security | 06-09-2025 commit — VERIFIED_HISTORICAL, A.[^C7] |
| Transactional services and REST | Sep–Oct 2025 commits — VERIFIED_HISTORICAL, A.[^C5] |
| Thymeleaf public/SEO-oriented landing | 10-10-2025 commit — VERIFIED_HISTORICAL, A.[^C10] |
| Angular 19 phase | Before reconstructed surviving history — MAINTAINER_ATTESTED / HISTORICAL, B. |
| Angular 20 surviving state | Present in the surviving scaffolding commit and current build — VERIFIED_CURRENT, A.[^C3][^C11] |
| MVP v1 label | 29-10-2025 commit — VERIFIED_HISTORICAL for the label. |
| S3 integration | Nov 2025 code/commit; manually validated — A/B.[^C8] |
| Checkout, panels and producer orders | 18-11-2025 commits — VERIFIED_HISTORICAL, A.[^C12] |
| MVP v2/testing/memory | 08-12-2025 commit — VERIFIED_HISTORICAL, A/B.[^C13] |
| Current public state | README update 17-01-2026 — VERIFIED_CURRENT, A.[^C1] |

**Version authority:** Java 17, Spring Boot 3.5.2 and Angular 20.3 are CURRENT. Angular 19 is a genuine earlier state established by maintainer authority. The missing Git evidence is explained by Rafael rebuilding the repository before the presentation; it is not an unresolved contradiction.

## 11. Evidence

| Evidence | Supports | Does not establish |
|---|---|---|
| Surviving Git history | Technical milestones and changes | The removed Angular 19 history. |
| Build files | Current declared stack | Current successful build/deployment. |
| Domain/services/controllers | Implemented capability | External use, performance or correctness everywhere. |
| Security code | JWT authentication path | Robust authorization for all operations. |
| S3 code + settlement | Implementation and real manual operations | Production use or failure-proof lifecycle. |
| Tests | Encoded scenarios | Complete current execution, coverage or overall quality. |
| Maintainer settlement | Academic status, authorship, history and real operations | Independent institutional/Git corroboration. |
| README/CV/portfolio | Maintainer narrative | Independent corroboration when they repeat the same claim. |

Security note: the audited repository contains a versioned JWT secret. Do not reproduce it. It weakens any general “secure application” claim.

## 12. Outcome

### Capability

- Full-stack marketplace workflow with producer and customer perspectives.
- Relational multi-producer order model.
- Hybrid Thymeleaf/Angular application.
- JWT authentication capability with known authorization limits.
- AWS S3 image upload/delete implementation, manually validated.
- OpenAPI/Actuator and test artifacts.

### Qualitative result

- Formally presented and approved as Rafael's final DAM project.
- Reached repository milestones labelled MVP v1 and v2.
- Demonstrates integration of domain modelling, backend, two frontend rendering approaches and external object storage.

### Measured result

No product KPI is verified. There are no defensible metrics for users, sales, SEO, conversion, latency, load, availability or test coverage. Grade 6 is an academic result, not a software-quality metric.

## 13. Learning

`MAINTAINER_ATTESTED / B` personal learning:

- Hybrid Thymeleaf + Angular architecture.
- Multi-producer order modelling.
- JWT / Spring Security, including authorization limits.

Additional code-supported learning areas include JPA transaction boundaries, S3/DB consistency and distinguishing test presence from test evidence.

## 14. Media

Rafael confirms that existing screenshots and diagrams use demo data. This resolves data sensitivity, but not ownership/licensing of every auxiliary logo, photo, icon or asset.

| Media family | What it can prove | Version/public boundary |
|---|---|---|
| Architecture/context/sequence diagrams | Intended structure and flows | Check against current code; remove any separate Distributor claim. |
| ER diagrams | Relational/domain design | Reconcile with 11 current `@Entity` classes and the separate “13 tables” claim. |
| Hero/dashboard captures | Implemented UI | Demo data confirmed; review logos/assets and version. |
| SEO configuration capture | Presence of SEO configuration | Does not prove ranking/indexing improvement. |
| Backend/frontend code captures | Implementation detail | Crop secrets, local paths and irrelevant editor data. |
| Test capture | A specific execution only if command/SHA/result are visible | Does not prove current full-suite status without provenance. |

**Public-safe status:** candidates after asset licensing/provenance and version review. No automatic blanket approval.

## 15. Public links

- [Repository](https://github.com/RafaLopezZz/CosechaEnCope)
- [Current README](https://github.com/RafaLopezZz/CosechaEnCope/blob/68097dd3d68595b2037b57072988184de4a3717c/README.MD)
- [Backend build](https://github.com/RafaLopezZz/CosechaEnCope/blob/68097dd3d68595b2037b57072988184de4a3717c/backend/cosechaencope/pom.xml)
- [Frontend package](https://github.com/RafaLopezZz/CosechaEnCope/blob/68097dd3d68595b2037b57072988184de4a3717c/frontend/cosecha-en-cope/package.json)
- [Portfolio project source](https://github.com/RafaLopezZz/web-site/blob/main/src/content/projects/cosecha-en-cope.md)
- [Portfolio article source](https://github.com/RafaLopezZz/web-site/blob/main/src/content/blog/desarrollo-cosecha-en-cope.md)

No verified live demo link exists.

## 16. SAFE PUBLIC CLAIMS

| Candidate semantic claim | Classification | Defense |
|---|---|---|
| Cosecha en Cope was Rafael's final DAM project, formally presented and approved. | MAINTAINER_ATTESTED | B |
| Rafael designed and developed it from scratch with documentation, Stack Overflow and GPT-3 as support. | MAINTAINER_ATTESTED / AI-ASSISTED | B |
| It is an academic full-stack agricultural marketplace prototype. | VERIFIED_CURRENT + MAINTAINER_ATTESTED | A/B |
| Current stack: Java 17, Spring Boot 3.5.2, JPA/Hibernate, PostgreSQL and Angular 20. | VERIFIED_CURRENT | A |
| It combines public Thymeleaf pages with an Angular SPA under `/app`. | VERIFIED_CURRENT | A |
| It models a customer order and producer-specific sales orders. | VERIFIED_CURRENT | A/B |
| It implements JWT authentication, with acknowledged authorization limitations. | VERIFIED_CURRENT | A/B |
| It implements AWS S3 image upload/delete, manually validated through real operations. | IMPLEMENTED + MANUALLY VALIDATED | B |
| It includes OpenAPI/Swagger, Actuator and tests at several layers. | VERIFIED_CURRENT | A; presence only |
| Angular 19 existed historically; Angular 20 is current in surviving Git. | MAINTAINER_ATTESTED / HISTORICAL + VERIFIED_CURRENT | B/A |
| It remained an academic demo without public deployment or third-party access. | MAINTAINER_ATTESTED | B |

Every sentence above is defensible in 60–90 seconds if Rafael identifies whether the authority is Git/code or maintainer testimony and states the listed limit.

## 17. DO NOT CLAIM

- Angular 19 as current or directly verifiable in surviving Git.
- A separate implemented Distributor actor.
- Production use, public deployment, external users, sales or business impact.
- S3 production use; only implementation and manual validation are established.
- Robust role authorization or a generally “secure application”.
- Measured SEO improvement, scalability, high availability or cloud-native maturity.
- “13 entities”; 11 current `@Entity` classes are directly visible. Do not claim 13 tables until reconciled.
- All tests passing, homogeneous “115 tests” or any coverage percentage.
- No AI/help: GPT-3, documentation and Stack Overflow were acknowledged support.
- Grade 6 or the live-demo incident as a quality claim. Use only as optional historical/interview context.

## 18. ES CANONICAL MEANING

Cosecha en Cope fue el proyecto final de DAM de Rafael, presentado y aprobado. Rafael lo diseñó y desarrolló desde cero con apoyo de documentación técnica, Stack Overflow y GPT-3. Su estado actual combina Java 17, Spring Boot 3.5.2, JPA/Hibernate y PostgreSQL con páginas públicas Thymeleaf y una aplicación Angular 20 bajo `/app`. Existió una fase anterior con Angular 19 que no quedó conservada al reconstruirse el historial Git. El dominio implementa clientes, productores, artículos, carrito, pedidos y órdenes específicas por productor; no existe un actor Distribuidor separado. La integración AWS S3 fue implementada y validada manualmente mediante operaciones reales. Fue un proyecto académico/demo sin acceso de terceros y no acredita producción, escalabilidad ni resultados SEO medidos.

## 19. EN CANONICAL MEANING

Cosecha en Cope was Rafael's final DAM project; it was formally presented and approved. Rafael designed and developed it from scratch with support from technical documentation, Stack Overflow and GPT-3. Its current state combines Java 17, Spring Boot 3.5.2, JPA/Hibernate and PostgreSQL with public Thymeleaf pages and an Angular 20 application under `/app`. An earlier Angular 19 phase existed but was not retained when the Git history was rebuilt. The domain implements customers, producers, products, carts, orders and producer-specific sales orders; there is no separate Distributor actor. The AWS S3 integration was implemented and manually validated through real operations. It remained an academic/demo project without third-party access and does not establish production use, scalability or measured SEO outcomes.

## 20. Revised DEFENSE GAPS

### C1 — JWT authentication versus authorization

- **TOPIC:** filter chain, HTTP matchers, method security and least privilege.
- **WHY:** JWT exists, but current rules do not support a broad role-security claim.
- **PROJECT EVIDENCE:** `SecurityConfig`, JWT filter/utilities, Angular guards.[^C7]
- **MUST EXPLAIN:** authentication vs authorization; client guards vs server enforcement; effective public routes.
- **TRADE-OFF QUESTION:** URL rules versus method-level security.
- **INTERVIEW QUESTION:** “How did you prevent one producer from operating on another producer's data?”
- **EXPECTED ANSWER ELEMENTS:** current evidence, known gaps and a concrete hardening approach.
- **15–30 MIN PRACTICE:** map each sensitive endpoint/method to its current and desired role rule.

### C2 — Hybrid Thymeleaf + Angular architecture

- **TOPIC:** SSR/SPA routing, base path, build and SEO boundaries.
- **WHY:** this is a strong differentiator and a real complexity trade-off.
- **PROJECT EVIDENCE:** templates/controllers, Angular output to `static/app`, `/app` base.[^C3]
- **MUST EXPLAIN:** who renders each URL, deep-link fallback, build coupling and why configuration is not SEO outcome.
- **TRADE-OFF QUESTION:** hybrid versus Angular-only, Thymeleaf-only or Angular SSR.
- **INTERVIEW QUESTION:** “Why did you use both Thymeleaf and Angular?”
- **EXPECTED ANSWER ELEMENTS:** discoverability goal, application UX, operational cost and no invented metrics.
- **15–30 MIN PRACTICE:** classify five project URLs by renderer, router and API dependency.

### C3 — Multi-producer order transaction

- **TOPIC:** aggregates, transaction boundaries, invariants and state transitions.
- **WHY:** this supports the most important domain claim.
- **PROJECT EVIDENCE:** order/OVP entities and services.[^C2]
- **MUST EXPLAIN:** creation sequence, grouping by producer, rollback and failure behavior.
- **TRADE-OFF QUESTION:** one global order versus seller sub-orders.
- **INTERVIEW QUESTION:** “What happens if one producer-order fails after the customer order is created?”
- **EXPECTED ANSWER ELEMENTS:** actual `@Transactional` scope, invariants, limits and improvement path.
- **15–30 MIN PRACTICE:** trace a cart with three products from two producers through every insert/state.

### C4 — Test evidence

- **TOPIC:** test layers, semantic coverage and reproducibility.
- **WHY:** tests exist, but a full current green execution is not evidenced.
- **PROJECT EVIDENCE:** backend, Angular and Cypress tests.[^C13]
- **MUST EXPLAIN:** what each layer proves and why generated/skipped tests are weaker evidence.
- **TRADE-OFF QUESTION:** mocked unit tests versus PostgreSQL/Testcontainers integration.
- **INTERVIEW QUESTION:** “What evidence tells you that checkout works?”
- **EXPECTED ANSWER ELEMENTS:** distinguish test code, execution result, coverage and E2E scope.
- **15–30 MIN PRACTICE:** map the five highest-risk behaviors to existing tests and gaps.

### C5 — S3 lifecycle and failure modes

- **TOPIC:** credentials, IAM, upload/delete flow and DB/object consistency.
- **WHY:** manual validation is closed, but reliability and production suitability are not.
- **PROJECT EVIDENCE:** S3 config/service/controller and maintainer settlement.[^C8]
- **MUST EXPLAIN:** observed manual flow, partial failures, orphan objects and secret handling.
- **TRADE-OFF QUESTION:** backend-proxied upload versus presigned URLs.
- **INTERVIEW QUESTION:** “How would you prevent orphaned objects if the database transaction fails?”
- **EXPECTED ANSWER ELEMENTS:** non-distributed transaction, compensation, IAM and validation limits.
- **15–30 MIN PRACTICE:** write five failure scenarios with expected detection and compensation.

## 21. Revised TRAINING PLAN

| Order | Session | Deliverable |
|---|---|---|
| 1 | 25 min — effective security map | Endpoint/method/current access/desired role table. |
| 2 | 20 min — hybrid request flow | Request→Thymeleaf or `/app`→Angular→API diagram. |
| 3 | 25 min — multi-producer checkout | Transaction/state trace for two producers. |
| 4 | 20 min — test authority | Risk→test→execution evidence→remaining gap matrix. |
| 5 | 25 min — S3 failure analysis | Upload/delete/DB failure and compensation table. |
| 6 | 15 min — mock defense | Three claims answered with evidence, decision, trade-off and limit. |

## 22. Remaining maintainer questions only

1. Which auxiliary logos, photographs, icons or other assets are owned or licensed for public use?
2. Does a reproducible final backend/frontend/Cypress run exist for a specific commit SHA?
3. What accounts for the README's “13 tables” statement when 11 current `@Entity` classes are visible?
4. Editorial choice only: should “final DAM project, presented and approved” be public, or remain internal authority? Grade/live-demo context stays private by default.

## 23. V1 blockers now CLOSED

- Academic status and approval.
- Grade and live-demo incident classified as historical/internal context.
- Architectural and implementation authorship.
- GPT-3/help boundary.
- Angular 19 historical state and Angular 20 current state.
- Reason the original Angular 19 Git evidence is absent.
- AWS S3 manual validation.
- Absence of public/third-party use.
- Absence of a distinct Distributor actor.
- Demo-data status of screenshots/diagrams.
- Personal learning authority for hybrid architecture, multi-producer orders and JWT/Spring Security.

---

## Evidence references

[^C1]: [Current public commit `68097dd`](https://github.com/RafaLopezZz/CosechaEnCope/commit/68097dd3d68595b2037b57072988184de4a3717c).
[^C2]: [Current JPA model](https://github.com/RafaLopezZz/CosechaEnCope/tree/68097dd3d68595b2037b57072988184de4a3717c/backend/cosechaencope/src/main/java/com/rlp/cosechaencope/model).
[^C3]: [Angular configuration](https://github.com/RafaLopezZz/CosechaEnCope/blob/68097dd3d68595b2037b57072988184de4a3717c/frontend/cosecha-en-cope/angular.json) and [frontend package](https://github.com/RafaLopezZz/CosechaEnCope/blob/68097dd3d68595b2037b57072988184de4a3717c/frontend/cosecha-en-cope/package.json).
[^C4]: [Initial surviving commit `ef140486`](https://github.com/RafaLopezZz/CosechaEnCope/commit/ef1404862bcddf09321f18f0eebe73648adb9e65).
[^C5]: [Transactional services commit](https://github.com/RafaLopezZz/CosechaEnCope/commit/f70b798e) and [REST controllers commit](https://github.com/RafaLopezZz/CosechaEnCope/commit/eacd28b5).
[^C6]: [Backend `pom.xml`](https://github.com/RafaLopezZz/CosechaEnCope/blob/68097dd3d68595b2037b57072988184de4a3717c/backend/cosechaencope/pom.xml).
[^C7]: [JWT commit](https://github.com/RafaLopezZz/CosechaEnCope/commit/de09b817) and [current security code](https://github.com/RafaLopezZz/CosechaEnCope/tree/68097dd3d68595b2037b57072988184de4a3717c/backend/cosechaencope/src/main/java/com/rlp/cosechaencope/security).
[^C8]: [S3 integration commit](https://github.com/RafaLopezZz/CosechaEnCope/commit/b7c4d9bf).
[^C9]: [JPA entity milestone](https://github.com/RafaLopezZz/CosechaEnCope/commit/7571acb5).
[^C10]: [Thymeleaf landing milestone](https://github.com/RafaLopezZz/CosechaEnCope/commit/8e519104).
[^C11]: [Surviving Angular scaffolding commit](https://github.com/RafaLopezZz/CosechaEnCope/commit/a3c31909).
[^C12]: [Purchase flow commit](https://github.com/RafaLopezZz/CosechaEnCope/commit/6b20be5b) and [completion commit](https://github.com/RafaLopezZz/CosechaEnCope/commit/3b3651d1).
[^C13]: [MVP v2/testing milestone](https://github.com/RafaLopezZz/CosechaEnCope/commit/8d2984b5).
