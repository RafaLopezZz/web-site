import { expect, test } from "@playwright/test";

const routes = [
  { path: "/web-site/production/", heading: "Producción", action: "Ver Quinta Bella ↗", casePath: "/web-site/production/quinta-bella/" },
  { path: "/web-site/en/production/", heading: "Production", action: "View Quinta Bella ↗", casePath: "/web-site/en/production/quinta-bella/" },
] as const;

const unsupported = ["HeroSlideResolverTest", "lockForUpdate", "callbacks", "RLP / PROD / 004"];

test("renders only approved equal-level Production dossiers", async ({ page }) => {
  for (const route of routes) {
    for (const theme of ["light", "dark"]) {
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route.path);
        await page.locator("html").evaluate((element, value) => {
          element.dataset.theme = value;
          element.style.colorScheme = value;
        }, theme);

        const index = page.locator('[data-territory-index="production"]');
        const records = index.locator('[data-production-record][data-surface="dossier"]');
        await expect(index.getByRole("heading", { name: route.heading, exact: true })).toBeVisible();
        await expect(records).toHaveCount(3);
        await expect(index.getByRole("heading", { name: "Águilas FC", exact: true })).toBeVisible();
        await expect(index.getByRole("heading", { name: "La Ola Art Gallery", exact: true })).toBeVisible();
        await expect(index.getByRole("heading", { name: "Quinta Bella", exact: true })).toBeVisible();
        await expect(index.locator('[data-production-featured], img, picture, video')).toHaveCount(0);
        await expect(index.getByRole("link", { name: route.action, exact: true })).toHaveAttribute("href", route.casePath);
        for (const claim of unsupported) await expect(index).not.toContainText(claim);
        await expect(page.locator("html")).toHaveJSProperty("scrollWidth", width);
      }
    }
  }
});

test("keeps Production dossiers in reading order and one mobile column", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/web-site/production/");

  const index = page.locator('[data-territory-index="production"]');
  expect(await index.locator('[data-production-record] h2').allTextContents()).toEqual(["Águilas FC", "La Ola Art Gallery", "Quinta Bella"]);
  await expect(index.locator('.territory-index__records')).toHaveCSS("grid-template-columns", "358px");
});
