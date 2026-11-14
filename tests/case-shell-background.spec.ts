import { expect, test } from "@playwright/test";

const targetRoutes = [
  { path: "production/aguilas-fc/", name: "production case (es)" },
  { path: "en/production/aguilas-fc/", name: "production case (en)" },
  { path: "work/cosecha-en-cope/", name: "work case (es)" },
  { path: "en/work/cosecha-en-cope/", name: "work case (en)" },
] as const;

const viewports = [
  { width: 1280, height: 800, name: "desktop", expectedGap: 96 },
  { width: 390, height: 844, name: "mobile", expectedGap: 64 },
] as const;

test.describe("case shell background coverage", () => {
  for (const route of targetRoutes) {
    for (const vp of viewports) {
      test(`verifies background shell covers card margins on ${route.name} (${vp.name})`, async ({
        page,
      }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(route.path);

        const metrics = await page.evaluate(() => {
          const header = document.querySelector("header.site-header");
          const shell = document.querySelector("main#main-content");
          const card = shell?.querySelector(":scope > article");
          const footer = document.querySelector("footer.site-footer");

          if (!header || !shell || !card || !footer) {
            throw new Error("Missing essential layout elements");
          }

          const headerRect = header.getBoundingClientRect();
          const shellRect = shell.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          const footerRect = footer.getBoundingClientRect();
          const cardStyle = window.getComputedStyle(card);

          return {
            headerHeight: headerRect.height,
            shellTop: shellRect.top,
            shellBottom: shellRect.bottom,
            cardTop: cardRect.top,
            cardBottom: cardRect.bottom,
            cardHeight: cardRect.height,
            cardMarginTop: parseFloat(cardStyle.marginTop),
            cardMarginBottom: parseFloat(cardStyle.marginBottom),
            footerHeight: footerRect.height,
            documentScrollHeight: document.documentElement.scrollHeight,
          };
        });

        // 1. Spacing integrity: card's computed margin-block must match token constant (±1px)
        expect.soft(
          metrics.cardMarginTop,
          `Card marginTop must equal ${vp.expectedGap}px on ${route.path} (${vp.name})`,
        ).toBeGreaterThanOrEqual(vp.expectedGap - 1);
        expect.soft(
          metrics.cardMarginTop,
          `Card marginTop must not exceed ${vp.expectedGap}px on ${route.path} (${vp.name})`,
        ).toBeLessThanOrEqual(vp.expectedGap + 1);

        expect.soft(
          metrics.cardMarginBottom,
          `Card marginBottom must equal ${vp.expectedGap}px on ${route.path} (${vp.name})`,
        ).toBeGreaterThanOrEqual(vp.expectedGap - 1);
        expect.soft(
          metrics.cardMarginBottom,
          `Card marginBottom must not exceed ${vp.expectedGap}px on ${route.path} (${vp.name})`,
        ).toBeLessThanOrEqual(vp.expectedGap + 1);

        // 2. Deterministic height regression: document height matches flow sum with constant expectedGap (±2px)
        const expectedDocHeight = Math.round(
          metrics.headerHeight +
            vp.expectedGap +
            metrics.cardHeight +
            vp.expectedGap +
            metrics.footerHeight,
        );
        expect(
          Math.abs(metrics.documentScrollHeight - expectedDocHeight),
          `Document scroll height should match unpadded content flow on ${route.path} (${vp.name})`,
        ).toBeLessThanOrEqual(2);

        // 3. Geometric coverage: shell top must start above card top by expectedGap (±1px)
        const topGap = metrics.cardTop - metrics.shellTop;
        expect.soft(
          topGap,
          `Expected shell top to start above card top by ${vp.expectedGap}px (±1px) on ${route.path} (${vp.name})`,
        ).toBeGreaterThanOrEqual(vp.expectedGap - 1);
        expect.soft(
          topGap,
          `Expected shell top distance to not exceed ${vp.expectedGap}px (±1px) on ${route.path} (${vp.name})`,
        ).toBeLessThanOrEqual(vp.expectedGap + 1);

        // 4. Geometric coverage: shell bottom must extend below card bottom by expectedGap (±1px)
        const bottomGap = metrics.shellBottom - metrics.cardBottom;
        expect.soft(
          bottomGap,
          `Expected shell bottom to extend below card bottom by ${vp.expectedGap}px (±1px) on ${route.path} (${vp.name})`,
        ).toBeGreaterThanOrEqual(vp.expectedGap - 1);
        expect.soft(
          bottomGap,
          `Expected shell bottom distance to not exceed ${vp.expectedGap}px (±1px) on ${route.path} (${vp.name})`,
        ).toBeLessThanOrEqual(vp.expectedGap + 1);
      });
    }
  }
});
