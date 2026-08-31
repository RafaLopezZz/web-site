import { expect, test } from "@playwright/test";

const routes = [
  { path: "/web-site/work/cosecha-en-cope/", context: "Contexto", source: "Ver repositorio ↗", article: "Leer el artículo legado →" },
  { path: "/web-site/en/work/cosecha-en-cope/", context: "Context", source: "View repository ↗", article: "Read the Spanish legacy article →" },
] as const;

const forbiddenClaims = ["JWT", "AWS S3", "despliegue", "métricas", "usuarios", "ventas"];

test("renders the bilingual Cosecha case with approved evidence only", async ({ page }) => {
  for (const route of routes) {
    for (const theme of ["light", "dark"]) {
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route.path);
        await page.locator("html").evaluate((element, value) => {
          element.dataset.theme = value;
          element.style.colorScheme = value;
        }, theme);

        const caseStudy = page.locator('[data-cosecha-case][data-surface="artifact"]');
        await expect(caseStudy).toBeVisible();
        await expect(caseStudy.getByRole("heading", { name: "Cosecha en Cope", exact: true })).toBeVisible();
        await expect(caseStudy.getByRole("heading", { name: route.context, exact: true })).toBeVisible();
        await expect(caseStudy.locator("img")).toHaveCount(2);
        await expect(caseStudy.getByAltText("Portada del proyecto Cosecha en Cope, un marketplace agrícola")).toBeVisible();
        await expect(caseStudy.getByAltText("Arquitectura híbrida de Cosecha en Cope")).toBeVisible();
        await expect(caseStudy.getByRole("link", { name: route.source, exact: true })).toHaveAttribute("href", "https://github.com/RafaLopezZz/CosechaEnCope");
        await expect(caseStudy.getByRole("link", { name: route.article, exact: true })).toHaveAttribute("href", "/web-site/blog/desarrollo-cosecha-en-cope/");
        for (const claim of forbiddenClaims) await expect(caseStudy).not.toContainText(claim);
        await expect(page.locator("html")).toHaveJSProperty("scrollWidth", width);
      }
    }
  }
});

test("keeps Cosecha semantic order and source focus visible", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/web-site/work/cosecha-en-cope/");

  const caseStudy = page.locator('[data-cosecha-case][data-surface="artifact"]');
  expect(await caseStudy.getByRole("heading").allTextContents()).toEqual([
    "Cosecha en Cope",
    "Contexto",
    "Ingeniería",
    "Arquitectura híbrida",
    "Modelo relacional",
    "Evidencia",
    "Alcance verificado",
  ]);

  const source = caseStudy.getByRole("link", { name: "Ver repositorio ↗", exact: true });
  await source.focus();
  await expect(source).toBeFocused();
  await expect(source).toHaveCSS("outline-style", "solid");
});
