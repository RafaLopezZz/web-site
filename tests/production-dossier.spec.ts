import { expect, test } from "@playwright/test";

const routes = [
  {
    path: "/web-site/production/quinta-bella/",
    title: "Quinta Bella",
    headings: ["Contexto", "Reto", "Ingeniería", "Resultado", "Aprendizaje", "Hablemos", "Evidencia"],
    source: "Repositorio público ↗",
  },
  {
    path: "/web-site/en/production/quinta-bella/",
    title: "Quinta Bella",
    headings: ["Context", "Challenge", "Engineering", "Outcome", "Learning", "Discuss", "Evidence"],
    source: "Public repository ↗",
  },
] as const;

const prohibited = ["customers", "client data", "Redsys", "revenue", "conversion", "HeroSlideResolverTest"];

test("documents Quinta Bella with verified sources and the required reading order", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path);

    const dossier = page.locator('[data-production-case="quinta-bella"][data-surface="dossier"]');
    await expect(dossier.getByRole("heading", { name: route.title, exact: true })).toBeVisible();
    expect(await dossier.locator("h2").allTextContents()).toEqual(route.headings);
    await expect(dossier.getByRole("link", { name: route.source, exact: true })).toHaveAttribute("href", "https://github.com/RafaLopezZz/camping-quintabella");
    await expect(dossier.getByRole("link", { name: /Sitio público|Public site/ })).toHaveAttribute("href", "https://quintabella.com/");
    await expect(dossier.locator("video, iframe")).toHaveCount(0);
    for (const claim of prohibited) await expect(dossier).not.toContainText(claim);
  }
});

test("keeps source actions responsive, themed, and keyboard reachable", async ({ page }) => {
  for (const route of routes) {
    for (const theme of ["light", "dark"]) {
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route.path);
        await page.locator("html").evaluate((element, value) => {
          element.dataset.theme = value;
          element.style.colorScheme = value;
        }, theme);

        const dossier = page.locator('[data-production-case="quinta-bella"]');
        await expect(page.locator("html")).toHaveJSProperty("scrollWidth", width);
        await dossier.getByRole("link", { name: route.source, exact: true }).focus();
        await expect(dossier.getByRole("link", { name: route.source, exact: true })).toBeFocused();
      }
    }
  }
});
