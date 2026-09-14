import { expect, test } from "@playwright/test";

const workRoutes = [
  { route: "/web-site/work/", title: "Trabajo", workLabel: "Trabajo", action: "Ver caso →" },
  { route: "/web-site/en/work/", title: "Work", workLabel: "Work", action: "View case →" },
];

test("renders a bilingual Work index with two work records, one LAB record, and only established actions", async ({ page }) => {
  for (const entry of workRoutes) {
    await page.goto(entry.route);
    const index = page.locator('main [data-territory-index="work"]');
    await expect(index.getByRole("heading", { name: entry.title, exact: true })).toBeVisible();
    await expect(index.getByText("RLP / WORK", { exact: true })).toBeVisible();
    await expect(index.locator("article")).toHaveCount(3);
    await expect(index.locator('[data-surface="artifact"]')).toHaveCount(3);
    await expect(index.getByRole("heading", { name: "ImportadorDB", exact: true })).toBeVisible();
    await expect(index.getByRole("heading", { name: "Cosecha en Cope", exact: true })).toBeVisible();
    await expect(index.getByRole("heading", { name: "Glea-Nexo", exact: true })).toBeVisible();
    await expect(index.getByText("RLP / LAB / 001", { exact: true })).toBeVisible();
    await expect(index.locator("[data-lab-record]")).toContainText(entry.title === "Work" ? "Current work" : "Trabajo actual");
    await expect(index.getByRole("link", { name: entry.action, exact: true }).first()).toHaveAttribute("href", entry.title === "Work" ? "/web-site/en/work/importador-db/" : "/web-site/work/importador-db/");
    await expect(index.getByRole("link", { name: entry.action, exact: true })).toHaveCount(3);
    await expect(index.getByRole("link", { name: entry.action, exact: true }).nth(1)).toHaveAttribute("href", entry.title === "Work" ? "/web-site/en/work/cosecha-en-cope/" : "/web-site/work/cosecha-en-cope/");

    await expect(index.locator(".territory-index__facts")).toHaveCount(0);
    await expect(index).toContainText("Java 21 · JavaFX · JDBC");
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
    { route: "/web-site/production/", heading: "Producción", action: "Ver Quinta Bella ↗", caseRoute: "/web-site/production/quinta-bella/" },
    { route: "/web-site/en/production/", heading: "Production", action: "View Quinta Bella ↗", caseRoute: "/web-site/en/production/quinta-bella/" },
  ]) {
    await page.goto(entry.route);
    const index = page.locator('main [data-territory-index="production"]');

    await expect(index.getByRole("heading", { name: entry.heading, exact: true })).toBeVisible();
    await expect(index.getByRole("heading", { name: "Águilas FC", exact: true })).toBeVisible();
    await expect(index.getByRole("heading", { name: "La Ola Art Gallery", exact: true })).toBeVisible();
    await expect(index.getByRole("heading", { name: "Quinta Bella", exact: true })).toBeVisible();
    await expect(index.locator('[data-surface="dossier"]')).toHaveCount(3);
    await expect(index.getByRole("link", { name: entry.action, exact: true })).toHaveAttribute("href", entry.caseRoute);

    await expect(index.locator(".territory-index__facts")).toHaveCount(0);
    await expect(index).not.toContainText("HeroSlideResolverTest");
    await expect(index).not.toContainText("lockForUpdate");
    await expect(index).not.toContainText("callbacks");
    await expect(index).not.toContainText("regression");
    await expect(index).not.toContainText("regresión");
  }
});

test("renders the bilingual ImportadorDB case with its professional Java 21 contract", async ({ page }) => {
  for (const entry of [{ route: "/web-site/work/importador-db/", heading: "Qué es", evidence: "Evidencia" }, { route: "/web-site/en/work/importador-db/", heading: "What it is", evidence: "Evidence" }]) {
    await page.goto(entry.route);
    const caseStudy = page.locator("[data-importador-case]");
    await expect(caseStudy.getByRole("heading", { name: "ImportadorDB", exact: true })).toBeVisible();
    await expect(caseStudy.getByRole("heading", { name: entry.heading, exact: true })).toBeVisible();
    await expect(caseStudy.getByRole("heading", { name: entry.evidence, exact: true })).toBeVisible();
    await expect(caseStudy).toContainText("Java 21 · JavaFX · JDBC");
    await expect(caseStudy).not.toContainText("Java 25");
    await expect(caseStudy.locator("figure img")).toHaveCount(1);
    await expect(caseStudy.getByRole("link", { name: /repositorio|repository/i })).toHaveAttribute("href", "https://github.com/RafaLopezZz/importador-db");
  }
});

test("places a focused locale-correct Work backlink before every Work and LAB case identity", async ({ page }) => {
  for (const route of [
    { path: "/web-site/work/importador-db/", href: "/web-site/work/", label: "← Volver a Trabajo" },
    { path: "/web-site/work/cosecha-en-cope/", href: "/web-site/work/", label: "← Volver a Trabajo" },
    { path: "/web-site/work/glea-nexo/", href: "/web-site/work/", label: "← Volver a Trabajo" },
    { path: "/web-site/en/work/importador-db/", href: "/web-site/en/work/", label: "← Back to Work" },
    { path: "/web-site/en/work/cosecha-en-cope/", href: "/web-site/en/work/", label: "← Back to Work" },
    { path: "/web-site/en/work/glea-nexo/", href: "/web-site/en/work/", label: "← Back to Work" },
  ]) {
    await page.goto(route.path);
    const caseStudy = page.locator("[data-work-case]");
    const backlink = caseStudy.locator(":scope > .case-back-link");

    await expect(backlink).toHaveCount(1);
    await expect(backlink).toHaveText(route.label);
    await expect(backlink).toHaveAttribute("href", route.href);
    await expect(caseStudy.locator("a a")).toHaveCount(0);
    expect(await backlink.evaluate((element) => {
      const heading = element.parentElement?.querySelector("h1");
      return Boolean(heading && (element.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING));
    })).toBe(true);

    await backlink.focus();
    await expect(backlink).toBeFocused();
    await expect(backlink).toHaveCSS("outline-style", "solid");
  }
});
