import { expect, test } from "@playwright/test";

const routes = [
  { path: "/web-site/work/importador-db/", context: "Contexto", repository: "Ver repositorio ↗" },
  { path: "/web-site/en/work/importador-db/", context: "Context", repository: "View repository ↗" },
] as const;

test("presents ImportadorDB as an evidence-led ArtifactSurface in both locales", async ({ page }) => {
  for (const { path, context, repository } of routes) {
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
        await expect(caseStudy.getByRole("heading", { name: context, exact: true })).toBeVisible();
        await expect(caseStudy.locator("img, picture, video")).toHaveCount(0);
        await expect(caseStudy).not.toContainText("Java 21");
        await expect(page.locator("html")).toHaveJSProperty("scrollWidth", width);

        const source = caseStudy.getByRole("link", { name: repository, exact: true });
        await source.focus();
        await expect(source).toBeFocused();
        await expect(source).toHaveCSS("outline-style", "solid");
      }
    }
  }
});

test("keeps the ImportadorDB case in document order with a shared desktop evidence layout", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/web-site/work/importador-db/");

  const caseStudy = page.locator('[data-importador-case][data-surface="artifact"]');
  await expect(caseStudy.locator(".case__body")).toHaveCSS("grid-template-columns", /.+ .+/);
  expect(await caseStudy.getByRole("heading").allTextContents()).toEqual([
    "ImportadorDB",
    "Contexto",
    "Ingeniería",
    "Cuatro motores, una abstracción",
    "Excel con dos formatos",
    "Escritura controlada",
    "Validar antes de persistir",
    "Evidencia",
    "Capacidad demostrada",
  ]);
});
