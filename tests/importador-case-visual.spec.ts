import { expect, test } from "@playwright/test";

const routes = [
  { path: "/web-site/work/importador-db/", what: "Qué es", role: "Mi papel", roleText: "Diseñé y desarrollé ImportadorDB desde cero.", repository: "Ver repositorio ↗", article: "Artículo técnico · ES →" },
  { path: "/web-site/en/work/importador-db/", what: "What it is", role: "My role", roleText: "I designed and developed ImportadorDB from scratch.", repository: "View repository ↗", article: "Technical article · ES →" },
] as const;

test("presents the U10 evidence contract for ImportadorDB in both locales", async ({ page }) => {
  for (const { path, what, role, roleText, repository, article } of routes) {
    for (const theme of ["light", "dark"]) {
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        await page.locator("html").evaluate((element, value) => {
          element.dataset.theme = value;
          element.style.colorScheme = value;
        }, theme);

        const caseStudy = page.locator('[data-importador-case][data-surface="artifact"]');
        await expect(caseStudy).toBeVisible();
        await expect(caseStudy.getByRole("heading", { name: "ImportadorDB", exact: true })).toBeVisible();
        await expect(caseStudy.getByRole("heading", { name: what, exact: true })).toBeVisible();
        await expect(caseStudy.getByRole("heading", { name: role, exact: true })).toBeVisible();
        await expect(caseStudy).toContainText(roleText);
        await expect(caseStudy).not.toContainText("agente de IA");
        await expect(caseStudy).not.toContainText("AI agent");
        await expect(caseStudy).not.toContainText("GPT");
        await expect(caseStudy).not.toContainText("Copilot");
        await expect(caseStudy).not.toContainText("generative");
        await expect(caseStudy).not.toContainText("Rafael diseñó");
        await expect(caseStudy).not.toContainText("Rafael designed");
        await expect(caseStudy).toContainText("Java 21 · JavaFX · JDBC");
        await expect(caseStudy).not.toContainText("Java 25");
        await expect(caseStudy).not.toContainText("AES-256");
        await expect(caseStudy).not.toContainText("SXSSFWorkbook");
        await expect(caseStudy.locator("figure img")).toHaveCount(1);
        await expect(caseStudy.getByRole("link", { name: article, exact: true })).toHaveAttribute("href", "/web-site/blog/desarrollo-importador-db/");
        await expect(page.locator("html")).toHaveJSProperty("scrollWidth", width);

        const source = caseStudy.getByRole("link", { name: repository, exact: true });
        await source.focus();
        await expect(source).toBeFocused();
        await expect(source).toHaveCSS("outline-style", "solid");
      }
    }
  }
});

test("keeps ImportadorDB content in the required hiring-facing order", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/web-site/work/importador-db/");

  const caseStudy = page.locator('[data-importador-case][data-surface="artifact"]');
  await expect(caseStudy.locator(".case__body")).toHaveCSS("grid-template-columns", /.+ .+/);
  expect(await caseStudy.getByRole("heading").allTextContents()).toEqual([
    "ImportadorDB",
    "Qué es",
    "Mi papel",
    "Restricciones",
    "Decisión",
    "Trade-off",
    "Evidencia",
    "Resultado",
    "Aprendizajes",
  ]);
});
