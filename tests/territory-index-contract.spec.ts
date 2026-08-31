import { expect, test } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");

const routes = [
  { path: "/web-site/work/", territory: "work", surface: "artifact" },
  { path: "/web-site/en/work/", territory: "work", surface: "artifact" },
  { path: "/web-site/production/", territory: "production", surface: "dossier" },
  { path: "/web-site/en/production/", territory: "production", surface: "dossier" },
] as const;

test("keeps one visual record composition with territory-specific semantic surfaces", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path);

    const index = page.locator(`[data-territory-index="${route.territory}"]`);
    const records = index.locator(".territory-index__record");

    await expect(index).toBeVisible();
    await expect(records).toHaveCount(2);
    await expect(index.locator(`.territory-index__record[data-surface="${route.surface}"]`)).toHaveCount(2);
    await expect(index.locator(`.territory-index__record${route.surface === "artifact" ? '[data-surface="dossier"]' : '[data-surface="artifact"]'}`)).toHaveCount(0);

    for (const record of await records.all()) {
      await expect(record.locator(":scope > .territory-index__id")).toHaveCount(1);
      await expect(record.locator(":scope > h2")).toHaveCount(1);
      await expect(record.locator(":scope > .territory-index__summary")).toHaveCount(1);
      await expect(record.locator(":scope > .territory-index__tech")).toHaveCount(1);
    }
  }
});

test("keeps Work and Production semantics outside the shared visual shell", () => {
  const sharedPath = resolve(repositoryRoot, "src/components/TerritoryIndex.astro");
  const workPath = resolve(repositoryRoot, "src/components/WorkIndex.astro");
  const productionPath = resolve(repositoryRoot, "src/components/ProductionIndex.astro");
  const dossierPath = resolve(repositoryRoot, "src/components/ProductionDossier.astro");

  expect(existsSync(sharedPath)).toBe(true);
  expect(existsSync(workPath)).toBe(true);
  expect(existsSync(productionPath)).toBe(true);
  expect(existsSync(dossierPath)).toBe(true);
  expect(existsSync(resolve(repositoryRoot, "src/components/SelectedWorkIndex.astro"))).toBe(false);

  const shared = readFileSync(sharedPath, "utf8");
  const work = readFileSync(workPath, "utf8");
  const production = readFileSync(productionPath, "utf8");
  const dossier = readFileSync(dossierPath, "utf8");

  expect(shared).not.toContain("selectedWork");
  expect(shared).not.toContain("<Surface");
  expect(work).toContain('variant="artifact"');
  expect(work).not.toContain('variant="dossier"');
  expect(production).toContain("<ProductionDossier");
  expect(dossier).toContain('variant="dossier"');
  expect(production).not.toContain('variant="artifact"');
});
