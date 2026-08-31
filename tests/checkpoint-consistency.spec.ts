import { existsSync, readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const m2 = readFileSync("docs/sdd/refactor-rlp-portfolio-v2/M2.md", "utf8");
const status = readFileSync("docs/sdd/refactor-rlp-portfolio-v2/STATUS.md", "utf8");
const playwrightConfig = readFileSync("playwright.config.ts", "utf8");
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const selectedWorkSource = readFileSync("src/data/selected-work.ts", "utf8");
const productionIndexSource = readFileSync("src/components/ProductionIndex.astro", "utf8");

test("records B-003 as resolved by current ImportadorDB source evidence", () => {
  for (const document of [m2, status]) {
    expect(document).toContain("B-003");
    expect(document).toContain("Java 25");
    expect(document).not.toContain("B-003's Java 21/Java 25 conflict remains unresolved");
    expect(document).not.toContain("B-003's Java 25 article conflict is unchanged");
    expect(document).not.toContain("The conflicting Java 25 long-form article remains B-003 and is untouched");
  }

  expect(status).toMatch(/### B-003 — CLOSED[\s\S]*JavaFX 25\.0\.1/);
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
