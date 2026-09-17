import { expect, test } from "@playwright/test";

test("keeps only selected artifacts in Featured Evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/web-site/");

  await expect(page.locator('article[data-surface="artifact"]')).toHaveCount(3);
  await expect(page.locator('#featured-evidence article[data-surface="artifact"]')).toHaveCount(3);
  expect(await page.locator("html").evaluate(
    (element) => element.scrollWidth <= window.innerWidth,
  )).toBe(true);
});
