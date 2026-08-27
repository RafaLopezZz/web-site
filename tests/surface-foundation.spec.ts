import { expect, test } from "@playwright/test";

test("keeps legacy project artifacts out of the short Home", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/web-site/");

  await expect(page.locator('article[data-surface="artifact"]')).toHaveCount(0);
  expect(await page.locator("html").evaluate(
    (element) => element.scrollWidth <= window.innerWidth,
  )).toBe(true);
});
