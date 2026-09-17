import { expect, test } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

const sectionHeadings = {
  es: [
    "Qué estoy probando",
    "Sistema bajo prueba",
    "Decisiones y compensaciones",
    "Evidencia actual",
    "Límites y preguntas abiertas",
    "Evidencia y enlaces",
  ],
  en: [
    "What I’m testing",
    "System under test",
    "Decisions / trade-offs",
    "Current evidence",
    "Limits / open questions",
    "Evidence / links",
  ],
} as const;

const routeFiles = [
  "src/pages/work/glea-nexo/index.astro",
  "src/pages/en/work/glea-nexo/index.astro",
];

test("classifies Glea-Nexo as LAB in Work and selects it through Home data", () => {
  const workIndex = read("src/components/WorkIndex.astro");
  const home = read("src/components/Home.astro");
  const data = read("src/data/glea-nexo-case.ts");
  const selectedWork = read("src/data/selected-work.ts");

  expect(workIndex).toContain("gleaNexoIndex");
  expect(data).toContain("RLP / LAB / 001");
  expect(data).toContain('status: "Trabajo actual"');
  expect(data).toContain('status: "Current work"');
  expect(workIndex).toContain("gleaNexoIndex[locale].status");
  expect(workIndex).toContain('variant="artifact"');
  expect(selectedWork).toContain("Glea-Nexo");
  expect(selectedWork).toContain("RLP / LAB / 001");
  expect(selectedWork).toContain("glea-nexo.png");
  expect(selectedWork).toContain("importador-db_old.png");
  expect(selectedWork).not.toContain("importador-db.png");
  expect(home).toContain("item.eyebrow");
  expect(existsSync(resolve(root, "src/content/projects/glea-nexo.md"))).toBe(false);
  expect(home).not.toContain("gleaNexoIndex");
});

test("defines the bilingual six-section LAB contract and only accepted public states", () => {
  const data = read("src/data/glea-nexo-case.ts");
  const component = read("src/components/GleaCase.astro");
  const acceptedStates = ["Implemented", "Validated", "Current work", "Planned", "Limit / open question"];

  for (const heading of [...sectionHeadings.es, ...sectionHeadings.en]) expect(data).toContain(heading);
  for (const state of acceptedStates) expect(data).toContain(state);

  expect(data).toContain("Raspberry Pi 3");
  expect(data).toContain("synthetic telemetry");
  expect(data).toContain("telemetría sintética");
  expect(data).toContain("MQTT → Node-RED → backend → PostgreSQL → API");
  expect(data).toContain("offline accumulation and successful replay");
  expect(data).toContain("acumulación sin conexión");
  expect(data).toContain("reprocesado exitoso");
  expect(data).toContain("partial key-based deduplication");
  expect(data).toContain("deduplicación parcial por clave");
  expect(data).toContain("event/receive/process time");
  expect(data).toContain("tiempo de evento/recepción/procesamiento");
  expect(data).toContain("FAILED→retry→SENT");
  expect(data).toContain("DEAD_LETTER");
  expect(data).toContain("concurrent replay and new telemetry");
  expect(data).toContain("AI/Big Data is a central future direction");
  expect(data).toContain("no AI/Big Data capability is implemented today");
  expect(data).toContain("not yet approved, submitted, or completed");
  expect(data).toContain("todavía no ha sido aprobada, presentada ni completada");
  expect(data).toContain("I designed");
  expect(data).toContain("Diseñé");

  for (const forbidden of [
    "Production-ready",
    "exactly-once",
    "semantic deduplication",
    "real agricultural sensors",
    "real agricultural dataset",
    "AI model",
    "Big Data pipeline",
    "benchmarks",
    "complete resilience",
  ]) expect(data.toLowerCase()).not.toContain(forbidden.toLowerCase());

  expect(component).toContain("WorkCase");
  expect(component).toContain("glea-nexo.png");
  expect(component).not.toContain("<img");
});

test("provides exactly the two bilingual Glea-Nexo detail routes", () => {
  for (const routeFile of routeFiles) expect(existsSync(resolve(root, routeFile))).toBe(true);
});

test("emits both route documents with LAB identity and accessible section headings", () => {
  const routes = [
    { path: "dist/work/glea-nexo/index.html", locale: "es" as const },
    { path: "dist/en/work/glea-nexo/index.html", locale: "en" as const },
  ];

  for (const route of routes) {
    const html = read(route.path);
    expect(html).toContain("RLP / LAB / 001");
    for (const heading of sectionHeadings[route.locale]) expect(html).toContain(heading);
    expect((html.match(/<section\b/g) ?? []).length).toBe(6);
    expect(html).toContain('data-surface="artifact"');
    expect(html).toContain('aria-label="');
    expect(html).toContain("Raspberry Pi 3");
    expect(html).toContain(route.locale === "en" ? "synthetic" : "sintética");
    expect(html).toContain("PR #5");
    expect(html).toContain("PR #7");

    if (route.locale === "es") {
      for (const forbidden of ["Implemented", "Validated", "Current work", "Planned", "Limit / open question", "trade-offs", "offline", "replay", "at-least-once", "runtimes"]) {
        expect(html).not.toContain(forbidden);
      }
      for (const required of ["Implementado", "Validado", "Trabajo actual", "Planificado", "Límite / pregunta abierta", "compensaciones", "entornos de ejecución", "entrega al menos una vez", "sin conexión", "reprocesado", "recorrido extremo a extremo"]) {
        expect(html).toContain(required);
      }
    }
  }
});

test("uses only Spanish editorial and status vocabulary on the rendered Spanish Glea surface", async ({ page }) => {
  await page.goto("/web-site/work/glea-nexo/");
  const surface = page.locator('main [data-work-case="glea-nexo"]');
  const text = await surface.innerText();

  for (const forbidden of [
    "Implemented",
    "Validated",
    "Current work",
    "Planned",
    "Limit / open question",
    "trade-offs",
    "offline",
    "replay",
    "at-least-once",
    "runtimes",
  ]) expect(text).not.toContain(forbidden);

  for (const required of [
    "Implementado",
    "Validado",
    "Trabajo actual",
    "Planificado",
    "Límite / pregunta abierta",
    "compensaciones",
    "entornos de ejecución",
    "entrega al menos una vez",
    "sin conexión",
    "reprocesado",
    "recorrido extremo a extremo",
  ]) expect(text).toContain(required);

  const image = surface.locator(".case__media img");
  await expect(image).toHaveAttribute("src", /\/_astro\/glea-nexo[^/]+\.webp$/);
  await expect(image).toHaveAttribute("srcset", /640w/);
  await expect(image).toHaveAttribute("alt", /Node-RED/);
  await expect(image).toHaveAttribute("loading", "lazy");
  await expect(surface).not.toContainText(/Production-ready|production claim|listo para producción/i);
});

test("keeps all authority packets unchanged", () => {
  for (const packet of [
    "docs/audit-packet-authority/GleaNexo_Authority_Packet_Audit.md",
    "docs/audit-packet-authority/CosechaEnCope_Authority_Packet_Audit.md",
    "docs/audit-packet-authority/ImportadorDB_Authority_Packet_Audit.md",
  ]) {
    expect(() => execFileSync("git", ["diff", "--quiet", "--", packet], {
      cwd: root,
      stdio: "ignore",
    })).not.toThrow();
  }
});
