import { expect, test } from "@playwright/test";

test("preserves the M2.1 Home semantic shell", async ({ page }) => {
  const response = await page.goto("/web-site/");

  expect(response?.ok()).toBe(true);
  await expect(page.locator("head > title")).toHaveCount(1);
  await expect(page.title()).resolves.toContain("Rafael López");
  await expect(page.locator('head > meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('head > meta[name="description"]')).toHaveAttribute("content", /\S/);
  await expect(page.locator("#hero")).toBeVisible();
  await expect(page.locator("#cmd-identity")).toBeVisible();
});
