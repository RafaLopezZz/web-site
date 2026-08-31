import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("documents and exposes the complete post-GREEN validation gate", async () => {
  const [design, packageJson, gate] = await Promise.all([
    readFile("DESIGN.md", "utf8"),
    readFile("package.json", "utf8"),
    readFile("scripts/verify-green.mjs", "utf8"),
  ]);

  for (const requirement of [
    "Focused test",
    "Header, Surface, Action, Locale, and Theme",
    "Full E2E",
    "Production build",
    "DESIGN.md",
    "Diff check",
    "ES/EN × Light/Dark × 320, 390, 768, 1024, and 1440px",
    "Human visual review",
    "Visual snapshots are fixed only after design acceptance",
  ]) expect(design).toContain(requirement);

  expect(packageJson).toContain('"verify:green"');
  expect(gate).toContain("tests/site-header.spec.ts");
  expect(gate).toContain("tests/surface-foundation.spec.ts");
  expect(gate).toContain("tests/action-system.spec.ts");
  expect(gate).toContain("tests/locale-system.spec.ts");
  expect(gate).toContain("tests/theme-system.spec.ts");
  expect(gate).toContain('"diff", "--check"');
  expect(gate).not.toContain("toHaveScreenshot");
});
