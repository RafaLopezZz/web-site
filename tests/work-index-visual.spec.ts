import { expect, test } from "@playwright/test";

const workRoutes = [
  { route: "/web-site/work/", heading: "Trabajo" },
  { route: "/web-site/en/work/", heading: "Work" },
] as const;

const widths = [320, 390, 768, 1024, 1440] as const;

test("composes the bilingual Work index as two work and one LAB artifact records", async ({ page }) => {
  for (const { route, heading } of workRoutes) {
    for (const theme of ["light", "dark"]) {
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        await page.locator("html").evaluate((element, value) => {
          element.dataset.theme = value;
          element.style.colorScheme = value;
        }, theme);

        const index = page.locator('[data-territory-index="work"]');
        const records = index.locator(".territory-index__record");
        await expect(index.getByRole("heading", { name: heading, exact: true })).toBeVisible();
        await expect(records).toHaveCount(3);
        await expect(records).toContainText(["ImportadorDB", "Cosecha en Cope", "Glea-Nexo"]);
        await expect(records.filter({ hasText: "Glea-Nexo" })).toContainText(route.includes("/en/") ? "Current work" : "Trabajo actual");
        await expect(records.filter({ hasText: "Glea-Nexo" })).toContainText("RLP / LAB / 001");
        await expect(index.locator(".territory-index__record[data-surface=\"artifact\"]")).toHaveCount(3);
        await expect(records.locator("[data-territory-media-slot]")).toHaveCount(3);
        await expect(records.first()).toContainText("Java 21 · JavaFX · JDBC");
        await expect(index).not.toContainText("Java 25");
        await expect(index.locator("picture, video")).toHaveCount(0);
        await expect(index.locator("img")).toHaveCount(3);
        for (const title of ["ImportadorDB", "Cosecha en Cope", "Glea-Nexo"]) {
          const image = records.filter({ hasText: title }).locator("img");
          await expect(image).toHaveCount(1);
          await expect(image).toHaveAttribute("src", /\/_astro\/[^/]+\.webp$/);
          await expect(image).toHaveAttribute("srcset", /640w/);
          await expect(image).toHaveAttribute("sizes", "(min-width: 1024px) 50vw, 100vw");
          await expect(image).toHaveAttribute("loading", "lazy");
          await expect(image).toHaveAttribute("width", /\d+/);
          await expect(image).toHaveAttribute("height", /\d+/);
        }
        const cosechaImage = index.getByRole("heading", { name: "Cosecha en Cope", exact: true }).locator("..").locator("img");
        await expect(cosechaImage).toHaveAttribute("alt", /Cosecha en Cope/);
        await expect(cosechaImage).toHaveAttribute("src", /\/_astro\/[^/]+\.webp$/);
        await expect(cosechaImage).toHaveAttribute("srcset", /640w/);
        await expect(cosechaImage).toHaveAttribute("srcset", /1280w/);
        await expect(cosechaImage).toHaveAttribute("sizes", "(min-width: 1024px) 50vw, 100vw");
        await expect(cosechaImage).toHaveAttribute("loading", "lazy");
        await expect(cosechaImage).toHaveAttribute("width", /\d+/);
        await expect(cosechaImage).toHaveAttribute("height", /\d+/);
        await expect(cosechaImage).toHaveCSS("object-fit", "cover");
        await expect(cosechaImage).toHaveCSS("object-position", "50% 0%");
        await expect(page.locator("html")).toHaveJSProperty("scrollWidth", width);
      }
    }
  }
});

test("shares the production index composition while preserving Work reading and focus order", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/web-site/work/");

  const work = page.locator('[data-territory-index="work"]');
  const production = page.locator('[data-territory-index="production"]');
  const workRecords = work.locator(".territory-index__records");

  await expect(workRecords).toHaveCSS("grid-template-columns", /.+ .+/);
  expect(await work.locator("h2").allTextContents()).toEqual(["ImportadorDB", "Cosecha en Cope", "Glea-Nexo"]);

  const firstAction = work.getByRole("link", { name: "Ver caso →" }).first();
  await firstAction.focus();
  await expect(firstAction).toBeFocused();
  await expect(firstAction).toHaveCSS("outline-style", "solid");

  const workColumns = await workRecords.evaluate((element) => getComputedStyle(element).gridTemplateColumns);
  await page.goto("/web-site/production/");
  await expect(production.locator(".territory-index__records")).toHaveCSS("grid-template-columns", workColumns);
});


