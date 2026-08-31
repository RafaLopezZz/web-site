import { expect, test } from "@playwright/test";

const workRoutes = [
  { route: "/web-site/work/", title: "Trabajo", workLabel: "Trabajo", action: "Ver caso →" },
  { route: "/web-site/en/work/", title: "Work", workLabel: "Work", action: "View case →" },
];

test("renders a bilingual Work index with two factual records and only established case actions", async ({ page }) => {
  for (const entry of workRoutes) {
    await page.goto(entry.route);
    const index = page.locator('main [data-territory-index="work"]');
    await expect(index.getByRole("heading", { name: entry.title, exact: true })).toBeVisible();
    await expect(index.getByText("RLP / WORK", { exact: true })).toBeVisible();
    await expect(index.locator("article")).toHaveCount(2);
    await expect(index.locator('[data-surface="artifact"]')).toHaveCount(2);
    await expect(index.getByRole("heading", { name: "ImportadorDB", exact: true })).toBeVisible();
    await expect(index.getByRole("heading", { name: "Cosecha en Cope", exact: true })).toBeVisible();
    await expect(index.getByRole("link", { name: entry.action, exact: true })).toHaveAttribute("href", entry.title === "Work" ? "/web-site/en/work/importador-db/" : "/web-site/work/importador-db/");
    await expect(index.getByRole("link", { name: entry.title === "Work" ? "Read the Spanish case →" : "Leer el caso →", exact: true })).toHaveAttribute("href", "/web-site/blog/desarrollo-cosecha-en-cope/");

    await expect(index.locator(".territory-index__facts")).toHaveCount(0);
    await expect(index).not.toContainText("Java 21");
    await expect(index).not.toContainText("Java 25");
    await expect(index).not.toContainText("Spring Security");
    await expect(index).not.toContainText("Swagger");

    const navigation = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(navigation.getByRole("link", { name: entry.workLabel, exact: true })).toHaveAttribute("aria-current", "page");
    await expect(navigation.locator('#site-navigation [aria-current="page"]')).toHaveCount(1);
    await expect(navigation.getByRole("link", { name: entry.title === "Work" ? "Home" : "Inicio", exact: true })).not.toHaveAttribute("aria-current", "page");
  }
});

test("keeps the Work index free of horizontal overflow across themes and canonical widths", async ({ page }) => {
  for (const route of workRoutes) {
    for (const theme of ["light", "dark"]) {
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route.route);
        await page.locator("html").evaluate((element, value) => {
          element.dataset.theme = value;
          element.style.colorScheme = value;
        }, theme);
        await expect(page.locator("html")).toHaveJSProperty("scrollWidth", width);
      }
    }
  }
});

test("keeps Production public indexes within the approved factual boundary", async ({ page }) => {
  for (const entry of [
    { route: "/web-site/production/", heading: "Producción", action: "Ver La Ola ↗" },
    { route: "/web-site/en/production/", heading: "Production", action: "View La Ola ↗" },
  ]) {
    await page.goto(entry.route);
    const index = page.locator('main [data-territory-index="production"]');

    await expect(index.getByRole("heading", { name: entry.heading, exact: true })).toBeVisible();
    await expect(index.getByRole("heading", { name: "Águilas FC", exact: true })).toBeVisible();
    await expect(index.getByRole("heading", { name: "La Ola", exact: true })).toBeVisible();
    await expect(index.locator('[data-surface="dossier"]')).toHaveCount(2);
    await expect(index.getByRole("link", { name: entry.action, exact: true })).toHaveAttribute("href", "https://www.laolaart.com/");

    await expect(index.locator(".territory-index__facts")).toHaveCount(0);
    await expect(index).not.toContainText("HeroSlideResolverTest");
    await expect(index).not.toContainText("lockForUpdate");
    await expect(index).not.toContainText("callbacks");
    await expect(index).not.toContainText("regression");
    await expect(index).not.toContainText("regresión");
  }
});

test("renders the bilingual ImportadorDB engineering case with sourced claims", async ({ page }) => {
  for (const entry of [{ route: "/web-site/work/importador-db/", heading: "Contexto", evidence: "Evidencia" }, { route: "/web-site/en/work/importador-db/", heading: "Context", evidence: "Evidence" }]) {
    await page.goto(entry.route);
    const caseStudy = page.locator("[data-importador-case]");
    await expect(caseStudy.getByRole("heading", { name: "ImportadorDB", exact: true })).toBeVisible();
    await expect(caseStudy.getByRole("heading", { name: entry.heading, exact: true })).toBeVisible();
    await expect(caseStudy.getByRole("heading", { name: entry.evidence, exact: true })).toBeVisible();
    await expect(caseStudy).toContainText("Java 25");
    await expect(caseStudy.getByRole("link", { name: /repositorio|repository/i })).toHaveAttribute("href", "https://github.com/RafaLopezZz/importador-db");
  }
});
