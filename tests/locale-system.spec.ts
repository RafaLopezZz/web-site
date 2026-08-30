import { expect, test } from "@playwright/test";

const esHome = "/web-site/";
const enHome = "/web-site/en/";

async function expectNoOverflow(page: import("@playwright/test").Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

test("serves the URL-driven Spanish and English Home counterparts", async ({ page }) => {
  await page.goto(esHome);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { name: "Rafael López", exact: true })).toBeVisible();
  await expect(page.locator("#hero .home-hero__role")).toHaveText("Software Developer");
  await expect(page.locator("#hero .home-hero__territory")).toHaveText("Backend · Datos · Sistemas");
  await expect(page.getByText("Desarrollo software para resolver problemas reales, con especial interés en backend, datos, automatización y sistemas conectados.", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ver trabajo", exact: true })).toHaveAttribute("href", "#featured-evidence");
  await expect(page.getByRole("link", { name: "Descargar CV", exact: true })).toHaveAttribute("download", "");

  await page.goto(enHome);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "Rafael López", exact: true })).toBeVisible();
  await expect(page.locator("#hero .home-hero__role")).toHaveText("Software Developer");
  await expect(page.locator("#hero .home-hero__territory")).toHaveText("Backend · Data · Systems");
  await expect(page.getByText("I build software to solve real-world problems, with a particular interest in backend, data, automation and connected systems.", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "View work", exact: true })).toHaveAttribute("href", "#featured-evidence");
  await expect(page.getByRole("link", { name: "Download CV", exact: true })).toHaveAttribute("download", "");
});

test("uses real bidirectional locale anchors without unimplemented English routes", async ({ page }) => {
  for (const [route, current, alternate] of [[esHome, "ES", "EN"], [enHome, "EN", "ES"]] as const) {
    await page.goto(route);
    const locale = page.getByRole("navigation", { name: "Idioma" });
    const control = page.locator("#locale-control");

    await expect(control).toHaveAttribute("data-retro-locale", current.toLowerCase());
    await expect(control.locator(".site-header__locale-marker")).toHaveAttribute("data-position", current.toLowerCase());
    await expect(locale.getByRole("link", { name: current, exact: true })).toHaveAttribute("aria-current", "page");
    await expect(locale.getByRole("link", { name: alternate, exact: true })).not.toHaveAttribute("aria-current", "page");
    await expect(locale.getByRole("link", { name: "ES", exact: true })).toHaveAttribute("href", esHome);
    await expect(locale.getByRole("link", { name: "EN", exact: true })).toHaveAttribute("href", enHome);
    await expect(locale.locator("svg, img")).toHaveCount(0);
    await expect(locale).toHaveText(/ES\s+EN/);
    await locale.getByRole("link", { name: "ES", exact: true }).focus();
    await page.keyboard.press("Tab");
    await expect(locale.getByRole("link", { name: "EN", exact: true })).toBeFocused();
    await expect(page.locator('a[href^="/web-site/en/blog"], a[href^="/web-site/en/experience"], a[href^="/web-site/en/education"], a[href^="/web-site/en/contact"]')).toHaveCount(0);
    await expect(page.locator(`#explore a[href="${route === enHome ? "/web-site/en/work/" : "/web-site/work/"}"]`)).toHaveCount(1);

    await locale.getByRole("link", { name: alternate, exact: true }).click();
    await expect(page).toHaveURL(alternate === "EN" ? enHome : esHome);
  }
});

test("keeps theme preference independent of locale navigation and compact at canonical widths", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(esHome);
    const locale = page.getByRole("navigation", { name: "Idioma" });
    const control = page.locator("#locale-control");
    const theme = page.getByRole("slider", { name: "Preferencia de tema" });

    await expect(locale).toBeVisible();
    await expect(theme).toBeVisible();
    await expect(control).toHaveCSS("width", "48px");
    await expect(control).toHaveCSS("height", "34px");
    await expectNoOverflow(page);
  }

  await page.goto(esHome);
  const theme = page.getByRole("slider", { name: "Preferencia de tema" });
  await theme.focus();
  await page.keyboard.press("End");
  await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("navigation", { name: "Idioma" }).getByRole("link", { name: "EN", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
