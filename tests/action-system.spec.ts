import { expect, test } from "@playwright/test";

const home = "/web-site/";

const expectSharpIbmPlex = async (locator: Parameters<typeof expect>[0]) => {
  await expect(locator).toHaveCSS("font-family", /IBM Plex Sans/i);
  await expect(locator).toHaveCSS("border-top-left-radius", "0px");
};

test("uses native anchor hierarchy for Hero navigation", async ({ page }) => {
  await page.goto(home);

  const work = page.getByRole("link", { name: "Ver trabajo", exact: true });
  const cv = page.getByRole("link", { name: "Descargar CV", exact: true }).first();

  await expect(work).toHaveAttribute("href", "#featured-evidence");
  await expectSharpIbmPlex(work);
  await expect(work).toHaveCSS("background-color", "rgb(17, 19, 21)");
  await expect(cv).toHaveAttribute("download", "");
  await expect(cv).toHaveAttribute("href", /lopez-plana-rafael-2026\.pdf$/);
  await expect(cv).toHaveCSS("background-color", "rgb(242, 240, 234)");
});

test("gives framed Hero actions a visible cyan focus treatment", async ({ page }) => {
  await page.goto(home);

  for (const locator of [
    page.getByRole("link", { name: "Ver trabajo", exact: true }),
    page.getByRole("link", { name: "Descargar CV", exact: true }).first(),
  ]) {
    await locator.focus();
    await expect(locator).toBeFocused();
    await expect(locator).toHaveCSS("outline-color", "rgb(5, 154, 175)");
    await expect(locator).toHaveCSS("outline-width", "2px");
  }
});

test("keeps Hero actions usable without horizontal overflow at target widths", async ({ page }) => {
  for (const width of [320, 390, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(home);

    expect(await page.locator("html").evaluate(
      (element) => element.scrollWidth <= window.innerWidth,
    )).toBe(true);
    await expect(page.getByRole("link", { name: "Ver trabajo", exact: true })).toBeVisible();
  }
});
