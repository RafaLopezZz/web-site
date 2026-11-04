import { expect, test } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

const sectionHeadings = {
  es: ["Qué es", "El reto", "Mi papel", "Resultado", "Lo que aprendí", "Detalles técnicos"],
  en: ["What it is", "The challenge", "My role", "Outcome", "What I learned", "Technical details"],
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

test("defines the bilingual six-section LAB contract with bounded public claims", () => {
  const data = read("src/data/glea-nexo-case.ts");
  const component = read("src/components/GleaCase.astro");

  for (const heading of [...sectionHeadings.es, ...sectionHeadings.en]) expect(data).toContain(heading);

  expect(data).toContain("Raspberry Pi");
  expect(data).toContain("datos simulados");
  expect(data).toContain("simulated data");
  expect(data).toContain("Quedan por validar varios casos de fallo");
  expect(data).toContain("Several failure cases remain to be validated");
  expect(data).toContain("aún no hay nada implementado");
  expect(data).toContain("nothing is implemented yet");
  expect(data).toContain("deduplicación parcial");
  expect(data).toContain("partial deduplication");
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
    expect(html).toContain("Raspberry Pi");
    expect(html).toContain(route.locale === "en" ? "simulated" : "simulados");
    expect(html).toContain("glea-nexo/pull/5");
    expect(html).toContain("glea-nexo/pull/7");
  }
});

test("uses only Spanish editorial vocabulary on the rendered Spanish Glea surface", async ({ page }) => {
  await page.goto("/web-site/work/glea-nexo/");
  const surface = page.locator('main [data-work-case="glea-nexo"]');
  const text = await surface.innerText();

  for (const forbidden of ["Implemented", "Validated", "Current work", "Planned", "trade-offs", "offline", "replay", "at-least-once", "runtimes"]) {
    expect(text).not.toContain(forbidden);
  }
  for (const required of ["Qué es", "El reto", "entrega al menos una vez", "recuperar la conexión", "Ver prueba: reenvío sin conexión ↗"]) {
    expect(text).toContain(required);
  }

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
