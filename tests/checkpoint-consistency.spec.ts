import { existsSync, readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const status = readFileSync("docs/sdd/refactor-rlp-portfolio-v2/STATUS.md", "utf8");
const playwrightConfig = readFileSync("playwright.config.ts", "utf8");
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const selectedWorkSource = readFileSync("src/data/selected-work.ts", "utf8");
const productionIndexSource = readFileSync("src/components/ProductionIndex.astro", "utf8");

test("records U10 ImportadorDB professional authority", () => {
  expect(status).toContain("B-003");
  expect(status).toMatch(/Java 21 is\s+the professional version/);
  expect(status).toMatch(/MariaDB and PostgreSQL are\s+limited to manual test-database validation/);
  expect(status).toContain("U10 — ImportadorDB public-content integration");
});

test("uses an owned preview process for portable Playwright teardown", () => {
  expect(playwrightConfig).not.toContain("npm run build && npm run preview");
  expect(playwrightConfig).toContain("webServer: undefined");
  expect(packageJson.scripts["test:e2e"]).toBe("node scripts/run-e2e.mjs");
  expect(existsSync("scripts/run-e2e.mjs")).toBe(true);
});

test("keeps unproven Production facts out of canonical data and index rendering", () => {
  const productionItemType = selectedWorkSource.match(/type ProductionItem = \{([\s\S]*?)\};/)?.[1];
  expect(productionItemType).toBeDefined();
  expect(productionItemType).not.toContain("facts:");

  for (const source of [selectedWorkSource, productionIndexSource]) {
    expect(source).not.toContain("HeroSlideResolverTest");
    expect(source).not.toContain("lockForUpdate");
    expect(source).not.toContain("callbacks");
    expect(source).not.toContain("regression");
    expect(source).not.toContain("Regresión");
  }

  expect(productionIndexSource).not.toContain(".territory-index__facts");
  expect(productionIndexSource).not.toContain("item.facts");
});
