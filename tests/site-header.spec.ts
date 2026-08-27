import { expect, test } from "@playwright/test";

const home = "/web-site/";
const blog = "/web-site/blog";

test("provides the durable home navigation contract", async ({ page }) => {
  await page.goto(home);

  const header = page.locator("header").first();
  const navigation = header.getByRole("navigation", { name: "Primary navigation" });

  await expect(header.getByRole("link", { name: "RLP", exact: true })).toHaveAttribute("href", home);
  await expect(navigation.getByRole("link", { name: "Home", exact: true })).toHaveAttribute("href", home);
  await expect(navigation.getByRole("link", { name: "Work", exact: true })).toHaveAttribute("href", `${home}#proyectos`);
  await expect(navigation.getByRole("link", { name: "Experience", exact: true })).toHaveAttribute("href", `${home}#experiencia`);
  await expect(navigation.getByRole("link", { name: "Education", exact: true })).toHaveAttribute("href", `${home}#formacion`);
  await expect(navigation.getByRole("link", { name: "Notes", exact: true })).toHaveAttribute("href", blog);
  await expect(navigation.getByRole("link", { name: "Contact", exact: true })).toHaveAttribute("href", `${home}#contacto`);
  await expect(navigation.getByRole("link", { name: "CV", exact: true })).toHaveAttribute("href", `${home}#cv`);
  await expect(navigation.getByRole("link", { name: "Home", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(navigation.locator('#site-navigation [aria-current]')).toHaveCount(1);

  await expect(header.locator('a[href^="/work"], a[href^="/production"], a[href^="/experience"], a[href^="/education"], a[href^="/notes"], a[href^="/about"], a[href^="/contact"]')).toHaveCount(0);
});

test("marks Notes as current across the established blog territory", async ({ page }) => {
  await page.goto(blog);

  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(navigation.getByRole("link", { name: "Notes", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(navigation.locator('#site-navigation [aria-current]')).toHaveCount(1);
});

test("exposes the complete navigation from a real mobile menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(home);

  const menu = page.locator("#site-navigation");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  const theme = page.getByRole("slider", { name: "Preferencia de tema" });
  const utility = page.locator(".site-header__utility");
  const locale = page.locator("#locale-control");

  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeHidden();
  await expect(theme).toBeVisible();
  await expect(locale).toBeVisible();
  await expect(page.locator("#theme-control svg")).toHaveCount(1);
  await expect(utility.locator("#theme-control")).toHaveCount(1);
  await expect(utility.locator("#site-menu-toggle")).toHaveCount(1);
  await expect.poll(async () => {
    const [header, brand, utilityBox, localeBox, themeBox, menuBox] = await Promise.all([
      page.locator("header").boundingBox(),
      page.getByRole("link", { name: "RLP", exact: true }).boundingBox(),
      utility.boundingBox(),
      locale.boundingBox(),
      theme.boundingBox(),
      toggle.boundingBox(),
    ]);
    return Boolean(header && brand && utilityBox && localeBox && themeBox && menuBox &&
      Math.abs(localeBox.y + localeBox.height / 2 - (themeBox.y + themeBox.height / 2)) < 2 &&
      Math.abs(themeBox.y + themeBox.height / 2 - (menuBox.y + menuBox.height / 2)) < 2 &&
      localeBox.x + localeBox.width <= themeBox.x && themeBox.x + themeBox.width <= menuBox.x &&
      brand.y >= header.y && localeBox.y >= header.y && themeBox.y >= header.y && menuBox.y >= header.y &&
      brand.y + brand.height <= header.y + header.height &&
      localeBox.y + localeBox.height <= header.y + header.height &&
      themeBox.y + themeBox.height <= header.y + header.height &&
      menuBox.y + menuBox.height <= header.y + header.height &&
      header.height < 88);
  }).toBe(true);

  await toggle.click();

  const closeToggle = page.getByRole("button", { name: "Close navigation" });
  await expect(closeToggle).toHaveAttribute("aria-expanded", "true");
  await expect(menu.getByRole("link", { name: "Notes", exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "CV", exact: true })).toBeVisible();
});

test("keeps the closed header compact and usable across canonical widths", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(home);

    const header = page.locator("header").first();
    const theme = page.locator("#theme-control");
    const locale = page.locator("#locale-control");
    const utility = page.locator(".site-header__utility");
    const menu = page.locator("#site-navigation");
    const toggle = page.getByRole("button", { name: "Open navigation" });

    await expect(page.locator("html")).toHaveJSProperty("scrollWidth", width);
    await expect(header.getByRole("link", { name: "RLP", exact: true })).toBeVisible();
    await expect(theme).toBeVisible();
    await expect(locale).toBeVisible();
    await expect(locale).toHaveAttribute("data-retro-locale", "es");
    await expect(utility.locator("#theme-control")).toHaveCount(1);
    await expect(utility.locator("#site-menu-toggle")).toHaveCount(1);
    expect((await header.boundingBox())?.height).toBeLessThan(88);

    if (width < 900) {
      await expect(menu).toBeHidden();
      await expect(toggle).toBeVisible();
      const [localeBox, themeBox, toggleBox] = await Promise.all([locale.boundingBox(), theme.boundingBox(), toggle.boundingBox()]);
      expect(localeBox && themeBox && toggleBox && localeBox.x + localeBox.width <= themeBox.x && themeBox.x + themeBox.width <= toggleBox.x).toBe(true);
      await toggle.click();
      await expect(menu.getByRole("link", { name: "Notes", exact: true })).toBeVisible();
    } else {
      await expect(toggle).toBeHidden();
      await expect(menu.getByRole("link", { name: "Notes", exact: true })).toBeVisible();
      const [localeBox, themeBox, notesBox] = await Promise.all([locale.boundingBox(), theme.boundingBox(), menu.getByRole("link", { name: "Notes", exact: true }).boundingBox()]);
      expect(localeBox && themeBox && notesBox && localeBox.x > notesBox.x && themeBox.x > localeBox.x).toBe(true);
    }
  }
});

test("separates primary navigation from the following utility cluster", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(home);

  const header = page.locator("header").first();
  const primary = header.locator(".site-header__primary");
  const utility = header.locator(".site-header__utility");
  const locale = utility.locator("#locale-control");
  const theme = utility.locator("#theme-control");

  await expect(primary).toHaveCount(1);
  await expect(primary.locator("#site-navigation")).toHaveCount(1);
  await expect(utility).toHaveCount(1);
  await expect(locale).toHaveCount(1);
  await expect(theme).toHaveCount(1);
  await expect(utility.locator("#site-menu-toggle")).toHaveCount(1);
  expect(await utility.evaluate((node, primaryNode) =>
    Boolean(primaryNode) && Boolean(primaryNode.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING),
  await primary.elementHandle())).toBe(true);
  expect(await utility.evaluate((node) =>
    ["locale-control", "theme-control", "site-menu-toggle"].every((id, index, ids) =>
      node.children[index]?.id === ids[index]),
  )).toBe(true);

  const [primaryBox, utilityBox] = await Promise.all([primary.boundingBox(), utility.boundingBox()]);
  expect(primaryBox && utilityBox && primaryBox.x + primaryBox.width < utilityBox.x).toBe(true);
  await expect(header.getByRole("button", { name: "Open navigation" })).toBeHidden();
  await expect(page.locator("html")).toHaveJSProperty("scrollWidth", 1440);
});
