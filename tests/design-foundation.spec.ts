import { expect, test } from "@playwright/test";

test("exposes the M1.3.1 color and typography contracts", async ({ page }) => {
  await page.goto("/web-site/");

  const foundation = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const body = getComputedStyle(document.body);
    const normalizeColor = (value: string) => {
      const element = document.createElement("span");
      element.style.color = value;
      document.body.append(element);
      const normalized = getComputedStyle(element).color;
      element.remove();
      return normalized;
    };

    return {
      colors: Object.fromEntries(
        [
          "--color-paper",
          "--color-ink",
          "--color-terminal",
          "--color-rlp-cyan",
          "--color-graphite",
        ].map((name) => [name, normalizeColor(root.getPropertyValue(name).trim())]),
      ),
      bodyFont: body.fontFamily,
      monoFont: root.getPropertyValue("--font-mono").trim(),
    };
  });

  expect(foundation.colors).toEqual({
    "--color-paper": "rgb(242, 240, 234)",
    "--color-ink": "rgb(17, 19, 21)",
    "--color-terminal": "rgb(12, 12, 12)",
    "--color-rlp-cyan": "rgb(5, 154, 175)",
    "--color-graphite": "rgb(96, 101, 104)",
  });
  expect(foundation.bodyFont).toMatch(/^"?IBM Plex Sans"?/);
  expect(foundation.monoFont).toMatch(/^"?IBM Plex Mono"?/);
});
