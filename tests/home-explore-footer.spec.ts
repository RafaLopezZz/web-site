import { expect, test } from "@playwright/test";

const homes = [
  {
    route: "/web-site/",
    labels: ["Ver todo el trabajo", "Ver casos de producción"],
    hrefs: ["/web-site/work/", "/web-site/production/"],
    aboutTitle: "SOBRE MI",
    portraitAlt: "Retrato de Rafael López",
    territory: "Backend · Datos · Sistemas",
  },
  {
    route: "/web-site/en/",
    labels: ["View all work", "View production cases"],
    hrefs: ["/web-site/en/work/", "/web-site/en/production/"],
    aboutTitle: "ABOUT ME",
    portraitAlt: "Portrait of Rafael López",
    territory: "Backend · Data · Systems",
  },
];

test("replaces Home Explore with two bilingual destination links and follows it with About", async ({ page }) => {
  for (const home of homes) {
    await page.goto(home.route);

    const explore = page.locator("#explore");
    await expect(explore).toHaveAttribute("aria-label", /Explore|Explorar/);
    const links = explore.getByRole("link");
    await expect(links).toHaveCount(2);
    for (let index = 0; index < home.labels.length; index += 1) {
      await expect(links.nth(index)).toHaveAccessibleName(home.labels[index], { exact: true });
      await expect(links.nth(index)).toHaveAttribute("href", home.hrefs[index]);
      await expect(links.nth(index).locator('img[data-explore-icon][alt=""]')).toHaveCount(1);
    }

    const about = page.locator("#about");
    await expect(about.getByRole("heading", { name: home.aboutTitle, exact: true })).toBeVisible();
    const portrait = about.locator(".home-about__portrait img");
    await expect(portrait).toHaveCount(1);
    await expect(portrait).toHaveAttribute("alt", home.portraitAlt);
    await expect(portrait).toHaveAttribute("src", /\/_astro\/foto-perfil4\.[^/]+\.webp$/);
    await expect(about.getByText("Rafael López", { exact: true })).toBeVisible();
    await expect(about.getByText("Software Developer", { exact: true })).toBeVisible();
    await expect(about.getByText(home.territory, { exact: true })).toBeVisible();
    await expect(about.locator(".home-about__copy > p")).toHaveCount(2);
    await expect(about.locator("img")).toHaveCount(1);

    const order = await page.locator("body > header, #hero, #featured-evidence, #explore, #about, body > footer").evaluateAll(
      (elements) => elements.map((element) => element.matches("header") ? "header" : element.matches("footer") ? "footer" : element.id),
    );
    expect(order).toEqual(["header", "hero", "featured-evidence", "explore", "about", "footer"]);
  }
});

test("keeps Explore, About, and Footer keyboard-accessible without overflow", async ({ page }) => {
  for (const { route } of homes) {
    for (const width of [320, 390, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      expect(await page.locator("html").evaluate((element) => element.scrollWidth <= window.innerWidth)).toBe(true);

      for (const link of await page.locator("#explore a, footer.site-footer a").all()) {
        await link.focus();
        await expect(link).toBeFocused();
      }
    }
  }
});
