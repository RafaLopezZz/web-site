import { expect, test } from "@playwright/test";

const homes = [
  { route: "/web-site/", labels: ["Ver todo el trabajo", "Ver casos de producción"] },
  { route: "/web-site/en/", labels: ["View all work", "View production cases"] },
];

for (const home of homes) {
  test(`M2.6 RED: ${home.route} exposes external Explore icons and responsive Explore/About geometry`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(home.route);

    const explore = page.locator("#explore");
    await expect(explore.locator("svg")).toHaveCount(0);
    const links = explore.getByRole("link");
    await expect(links).toHaveCount(2);

    for (let index = 0; index < home.labels.length; index += 1) {
      await expect(links.nth(index)).toHaveAccessibleName(home.labels[index], { exact: true });
      const icon = links.nth(index).locator('img[data-explore-icon]');
      await expect(icon).toHaveCount(1);
      await expect(icon).toHaveAttribute("src", /^\/web-site\/icons\//);
      await expect(icon).toHaveAttribute("alt", "");
      const box = await icon.boundingBox();
      expect(box?.width).toBeGreaterThanOrEqual(20);
      expect(box?.width).toBeLessThanOrEqual(24);
      expect(box?.height).toBeGreaterThanOrEqual(20);
      expect(box?.height).toBeLessThanOrEqual(24);
    }

    const desktop = await page.locator(".home-explore__navigation").evaluate((element) => {
      const styles = getComputedStyle(element);
      const second = element.querySelector("a + a");
      return {
        columns: styles.gridTemplateColumns.split(" ").length,
        divider: second ? getComputedStyle(second).borderLeftWidth : "0px",
      };
    });
    expect(desktop).toEqual({ columns: 2, divider: "1px" });

    const aboutDesktop = await page.locator(".home-about__content").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
    expect(aboutDesktop).toBe(2);
    await expect(page.locator("#about-title")).toBeVisible();
    await expect(page.locator(".home-about__header").getByText("[profile.txt]", { exact: true })).toBeVisible();
    await expect(page.locator(".home-about__portrait")).toHaveCount(0);

    await page.setViewportSize({ width: 320, height: 900 });
    const mobile = await page.locator(".home-explore__navigation").evaluate((element) => {
      const styles = getComputedStyle(element);
      const second = element.querySelector("a + a");
      return {
        columns: styles.gridTemplateColumns.split(" ").length,
        divider: second ? getComputedStyle(second).borderTopWidth : "0px",
      };
    });
    expect(mobile).toEqual({ columns: 1, divider: "1px" });
    const aboutMobile = await page.locator(".home-about__content").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
    expect(aboutMobile).toBe(1);
    expect(await page.locator("html").evaluate((element) => element.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
