import { expect, test } from "@playwright/test";

test("preserves the local home semantic baseline", async ({ page }) => {
  await page.route(/^https?:\/\//, async (route) => {
    const url = new URL(route.request().url());

    if (url.hostname === "127.0.0.1" && url.port === "4321") {
      await route.continue();
      return;
    }

    await route.abort();
  });

  const response = await page.goto("/web-site/");

  expect(response?.ok()).toBe(true);
  await expect(page.locator("head > title")).toHaveCount(1);
  await expect(page.title()).resolves.toContain("Rafael López");
  await expect(page.locator('head > meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('head > meta[name="description"]')).toHaveAttribute("content", /\S/);
  await expect(page.getByText("Rafael López", { exact: false }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "ImportadorDB", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cosecha en Cope", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Glea Nexo", exact: true })).toBeVisible();
  expect(await page.locator('a[href="https://github.com/RafaLopezZz"]').count()).toBeGreaterThan(0);
  expect(await page.locator('a[href="https://www.linkedin.com/in/rafalopezzz/"]').count()).toBeGreaterThan(0);
  expect(await page.locator('a[href="/web-site/cv/lopez-plana-rafael-2026.pdf"]').count()).toBeGreaterThan(0);
});
