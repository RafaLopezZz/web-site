import { expect, test } from "@playwright/test";

const home = "/web-site/";
const projectCount = 3;

test("preserves Home projects as square semantic artifacts", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(home);

  const artifacts = page.locator('article[data-surface="artifact"]');

  await expect(artifacts).toHaveCount(projectCount);
  await expect(artifacts.first()).toHaveCSS("border-top-left-radius", "0px");
  await expect(artifacts.first()).toHaveCSS("font-family", /IBM Plex Sans/i);
  await expect(artifacts.getByRole("link")).toHaveCount(5);
  await expect(artifacts.locator("a").first()).toHaveAttribute("href", /.+/);

  expect(await page.locator("html").evaluate(
    (element) => element.scrollWidth <= window.innerWidth,
  )).toBe(true);
});
