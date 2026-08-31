import { expect, test } from "@playwright/test";

const workRoutes = [
  { route: "/web-site/work/", heading: "Trabajo" },
  { route: "/web-site/en/work/", heading: "Work" },
] as const;

const widths = [320, 390, 768, 1024, 1440] as const;

test("composes the bilingual Work index as two evidence-led artifact records", async ({ page }) => {
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
        await expect(records).toHaveCount(2);
        await expect(records).toContainText(["ImportadorDB", "Cosecha en Cope"]);
        await expect(index.locator(".territory-index__record[data-surface=\"artifact\"]")).toHaveCount(2);
        await expect(records.locator("[data-territory-media-slot]")).toHaveCount(2);
        await expect(index).not.toContainText("Java 25");
        await expect(index.locator("img, picture, video")).toHaveCount(0);
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
  expect(await work.locator("h2").allTextContents()).toEqual(["ImportadorDB", "Cosecha en Cope"]);

  const firstAction = work.getByRole("link", { name: "Ver caso →" }).first();
  await firstAction.focus();
  await expect(firstAction).toBeFocused();
  await expect(firstAction).toHaveCSS("outline-style", "solid");

  const workColumns = await workRecords.evaluate((element) => getComputedStyle(element).gridTemplateColumns);
  await page.goto("/web-site/production/");
  await expect(production.locator(".territory-index__records")).toHaveCSS("grid-template-columns", workColumns);
});


