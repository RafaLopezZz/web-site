import { expect, test } from "@playwright/test";

const routes = [
  { path: "/web-site/production/", heading: "Producción", action: "Ver Quinta Bella ↗", aguilasAction: "Ver Águilas FC ↗", casePath: "/web-site/production/quinta-bella/", aguilasCasePath: "/web-site/production/aguilas-fc/" },
  { path: "/web-site/en/production/", heading: "Production", action: "View Quinta Bella ↗", aguilasAction: "View Águilas FC ↗", casePath: "/web-site/en/production/quinta-bella/", aguilasCasePath: "/web-site/en/production/aguilas-fc/" },
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
        await expect(records.locator("[data-territory-media-slot]")).toHaveCount(3);
        await expect(index.locator('[data-production-featured], picture, video')).toHaveCount(0);
        await expect(index.locator("img")).toHaveCount(3);
        for (const image of await index.locator("img").all()) {
          await expect(image).toHaveAttribute("src", /\/_astro\/[^/]+\.webp$/);
          await expect(image).toHaveAttribute("srcset", /640w/);
          await expect(image).toHaveAttribute("srcset", /1280w/);
          await expect(image).toHaveAttribute("sizes", "(min-width: 1024px) 50vw, 100vw");
          await expect(image).toHaveAttribute("loading", "lazy");
          await expect(image).toHaveAttribute("width", /\d+/);
          await expect(image).toHaveAttribute("height", /\d+/);
          await expect(image).toHaveCSS("object-fit", "cover");
          await expect(image).toHaveCSS("object-position", "50% 0%");
        }
        const aguilasRecord = records.nth(0);
        await expect(aguilasRecord.locator("img")).toHaveAttribute("alt", /Águilas FC/);
        const aguilas = index.getByRole("link", { name: route.aguilasAction, exact: true });
        await expect(aguilas).toHaveAttribute("href", route.aguilasCasePath);
        await expect(aguilas).not.toHaveAttribute("target");
        await expect(aguilas).not.toHaveAttribute("rel");
        const laOla = index.getByRole("link", { name: /La Ola Art Gallery.*↗/ });
        await expect(laOla).toHaveAttribute("target", "_blank");
        await expect(laOla).toHaveAttribute("rel", "noopener noreferrer");
        const quinta = index.getByRole("link", { name: route.action, exact: true });
        await expect(quinta).not.toHaveAttribute("target");
        await expect(index.locator("a[href*='fincas'], a[href*='victoriafincas']")).toHaveCount(0);
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
