import { expect, test } from "@playwright/test";

const home = "/web-site/";

test("provides canonical responsive editorial layout primitives", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto(home);

  const rootTokens = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return Object.fromEntries(
      [
        "--content-max",
        "--reading-max",
        "--layout-gutter",
        "--space-1",
        "--space-2",
        "--space-3",
        "--space-4",
        "--space-5",
        "--space-6",
        "--space-7",
        "--space-8",
        "--space-9",
      ].map((token) => [token, styles.getPropertyValue(token).trim()]),
    );
  });

  expect(rootTokens).toEqual({
    "--content-max": "80rem",
    "--reading-max": "46rem",
    "--layout-gutter": "1rem",
    "--space-1": ".25rem",
    "--space-2": ".5rem",
    "--space-3": ".75rem",
    "--space-4": "1rem",
    "--space-5": "1.5rem",
    "--space-6": "2rem",
    "--space-7": "3rem",
    "--space-8": "4rem",
    "--space-9": "6rem",
  });

  const main = page.locator("main.rlp-container");
  await expect(main).toHaveCount(1);

  const overflowWidths: number[] = [];
  for (const [width, gutter] of [[320, 16], [390, 16], [768, 24], [1024, 32]]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(home);

    if (!(await page.locator("html").evaluate(
      (element) => element.scrollWidth <= window.innerWidth,
    ))) {
      overflowWidths.push(width);
    }
    await expect(main).toHaveCSS("padding-left", `${gutter}px`);
    await expect(main).toHaveCSS("padding-right", `${gutter}px`);
  }
  expect(overflowWidths).toEqual([]);

  await page.setViewportSize({ width: 1600, height: 844 });
  await page.goto(home);
  expect(await main.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, left: rect.left };
  })).toEqual({ width: 1280, left: 160 });

  const reading = await page.evaluate(() => {
    const element = document.createElement("div");
    element.className = "rlp-reading";
    document.body.append(element);
    const styles = getComputedStyle(element);
    const result = { maxWidth: styles.maxWidth, fontFamily: styles.fontFamily };
    element.remove();
    return result;
  });
  expect(reading.maxWidth).toBe("736px");
  expect(reading.fontFamily).toBe(await page.locator("body").evaluate(
    (element) => getComputedStyle(element).fontFamily,
  ));
});
