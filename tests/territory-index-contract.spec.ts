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
    const count = route.territory === "production" ? 3 : 2;
    await expect(records).toHaveCount(count);
    await expect(index.locator(`.territory-index__record[data-surface="${route.surface}"]`)).toHaveCount(count);
    await expect(index.locator(`.territory-index__record${route.surface === "artifact" ? '[data-surface="dossier"]' : '[data-surface="artifact"]'}`)).toHaveCount(0);

    for (const record of await records.all()) {
      await expect(record.locator(":scope > .territory-index__id")).toHaveCount(1);
      await expect(record.locator(":scope > [data-territory-media-slot][aria-hidden=\"true\"]")).toHaveCount(1);
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

test("keeps shared horizontal breathing around territory record content", async ({ page }) => {
  for (const { path } of routes) {
    for (const [width, minimumInset] of [[320, 16], [375, 16], [390, 16], [768, 16], [1024, 24], [1440, 24]] as const) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);

      const records = page.locator(".territory-index__record");
      for (const record of await records.all()) {
        const geometry = await record.evaluate((element) => {
          const box = element.getBoundingClientRect();
          const inset = (selector: string) => {
            const child = element.querySelector<HTMLElement>(selector)!.getBoundingClientRect();
            return { left: child.left - box.left, right: box.right - child.right };
          };
          return {
            id: inset(":scope > .territory-index__id"),
            media: inset(":scope > [data-territory-media-slot]"),
            title: inset(":scope > h2"),
          };
        });

        expect(geometry.id.left).toBeGreaterThanOrEqual(minimumInset - 1);
        expect(geometry.media.left).toBeGreaterThanOrEqual(minimumInset - 1);
        expect(geometry.media.right).toBeGreaterThanOrEqual(minimumInset - 1);
        if (width <= 390) {
          expect(Math.abs(geometry.id.left - geometry.media.left)).toBeLessThanOrEqual(1);
          expect(Math.abs(geometry.title.left - geometry.media.left)).toBeLessThanOrEqual(1);
        }
      }
      expect(await page.locator("html").evaluate((element) => element.scrollWidth <= window.innerWidth)).toBe(true);
    }
  }
});
