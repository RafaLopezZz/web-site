import { expect, test } from "@playwright/test";

const home = "/web-site/";
const blog = "/web-site/blog";
const article = "/web-site/blog/desarrollo-importador-db";

async function setTheme(page: import("@playwright/test").Page, value?: string) {
  await page.addInitScript((theme) => {
    if (theme) localStorage.setItem("rlp-theme", theme);
    else localStorage.removeItem("rlp-theme");
  }, value);
}

async function expectNoOverflow(page: import("@playwright/test").Page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
}

test("resolves system preference from the OS with no stored choice", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await setTheme(page);
  await page.goto(home);
  await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "system");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.emulateMedia({ colorScheme: "dark" });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("persists explicit choices, rejects invalid storage, and prevents a stored-dark flash", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await setTheme(page, "dark");
  await page.goto(home);
  await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  const invalid = await page.context().newPage();
  await invalid.emulateMedia({ colorScheme: "dark" });
  await setTheme(invalid, "invalid");
  await invalid.goto(home);
  await expect(invalid.locator("html")).toHaveAttribute("data-theme-preference", "system");
  await expect(invalid.locator("html")).toHaveAttribute("data-theme", "dark");
  await invalid.close();
});

test("provides one compact native retro preference range without conflating preference and effective theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await setTheme(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(home);

  const control = page.locator("#theme-control");
  const range = page.getByRole("slider", { name: "Preferencia de tema" });
  await expect(control).toBeVisible();
  await expect(range).toBeVisible();
  await expect(range).toHaveAttribute("min", "0");
  await expect(range).toHaveAttribute("max", "2");
  await expect(range).toHaveAttribute("step", "1");
  await expect(range).toHaveCSS("opacity", "0");
  await expect(range).toHaveValue("0");
  await expect(range).toHaveAttribute("aria-valuetext", "Sistema");
  await expect(page.getByRole("button", { name: /^Tema:/ })).toHaveCount(0);
  await expect(page.getByRole("radiogroup")).toHaveCount(0);
  await expect(page.getByRole("radio")).toHaveCount(0);
  await expect(page.locator("select")).toHaveCount(0);
  await expect(control.locator("svg[aria-hidden='true']")).toHaveCount(1);
  await expect(control).toHaveAttribute("data-theme-preference", "system");

  await range.click({ position: { x: 38, y: 16 } });
  await expect(range).toHaveValue("1");
  await expect(range).toHaveAttribute("aria-valuetext", "Claro");
  await expect(control).toHaveAttribute("data-theme-preference", "light");
  await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "light");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("rlp-theme"))).toBe("light");

  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await range.focus();
  await page.keyboard.press("End");
  await expect(range).toHaveValue("2");
  await expect(range).toHaveAttribute("aria-valuetext", "Oscuro");
  await expect(control).toHaveAttribute("data-theme-preference", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.keyboard.press("ArrowRight");
  await expect(range).toHaveValue("2");
  await expect(control).toHaveAttribute("data-theme-preference", "dark");
  await page.keyboard.press("Home");
  await expect(range).toHaveValue("0");
  await expect(range).toHaveAttribute("aria-valuetext", "Sistema");
  await expect(control).toHaveAttribute("data-theme-preference", "system");
  await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "system");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("rlp-theme"))).toBe("system");
  await page.reload();
  await expect(page.getByRole("slider", { name: "Preferencia de tema" })).toHaveValue("0");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await range.focus();
  await page.keyboard.press("ArrowRight");
  await expect(range).toBeFocused();
  await expect(range).toHaveValue("1");
  await expect(control).toHaveAttribute("data-theme-preference", "light");
  await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "light");
  await page.keyboard.press("ArrowRight");
  await expect(control).toHaveAttribute("data-theme-preference", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "dark");
  await page.keyboard.press("ArrowLeft");
  await expect(control).toHaveAttribute("data-theme-preference", "light");
  await page.keyboard.press("ArrowLeft");
  await expect(control).toHaveAttribute("data-theme-preference", "system");
  await page.keyboard.press("ArrowLeft");
  await expect(control).toHaveAttribute("data-theme-preference", "system");
  await expectNoOverflow(page);
});

test("keeps semantic theme outputs readable and CMD terminal invariant across routes and widths", async ({ page }) => {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await setTheme(page, colorScheme);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(home);
      await expectNoOverflow(page);
       await expect(page.locator("main")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
       await expect(page.locator("body")).toHaveCSS("background-color", colorScheme === "light" ? "rgb(242, 240, 234)" : "rgb(28, 29, 29)");
      await expect(page.locator(".cmd-identity__terminal")).toHaveCSS("background-color", "rgb(12, 12, 12)");
      const terminalRuleColor = await page.evaluate(() => {
        for (const sheet of document.styleSheets) {
          let rules: CSSRuleList;
          try {
            rules = sheet.cssRules;
          } catch {
            continue;
          }
          for (const rule of rules) {
            if (
              rule instanceof CSSStyleRule &&
              rule.selectorText.includes(".cmd-identity__terminal") &&
              rule.style.getPropertyValue("background").includes("var(--color-terminal)")
            ) {
              return rule.style.getPropertyValue("color").trim();
            }
          }
        }
        return "";
      });
      expect(terminalRuleColor).toBe("var(--color-paper)");
    }
    for (const route of [blog, article]) {
      for (const width of [320, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        await expectNoOverflow(page);
        if (route === blog) {
          await expect(page.locator("#blog-list-title").locator("..")).toHaveCSS(
            "flex-direction",
            width === 320 ? "column" : "row",
          );
        }
        await expect(page.locator("body")).toHaveCSS("background-color", colorScheme === "light" ? "rgb(242, 240, 234)" : "rgb(28, 29, 29)");
        await expect(page.locator("main")).toBeVisible();
      }
    }
  }
});
