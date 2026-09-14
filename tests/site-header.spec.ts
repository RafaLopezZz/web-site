import { expect, test } from "@playwright/test";

const home = "/web-site/";
const blog = "/web-site/blog";

const territorialRoutes = [
  { route: "/web-site/work/", label: "Trabajo", href: "/web-site/work/" },
  { route: "/web-site/work/importador-db/", label: "Trabajo", href: "/web-site/work/" },
  { route: "/web-site/work/glea-nexo/", label: "Trabajo", href: "/web-site/work/" },
  { route: "/web-site/production/", label: "Producción", href: "/web-site/production/" },
  { route: "/web-site/en/work/", label: "Work", href: "/web-site/en/work/" },
  { route: "/web-site/en/work/importador-db/", label: "Work", href: "/web-site/en/work/" },
  { route: "/web-site/en/work/glea-nexo/", label: "Work", href: "/web-site/en/work/" },
  { route: "/web-site/en/production/", label: "Production", href: "/web-site/en/production/" },
  { route: "/web-site/experience/", label: "Trayectoria", href: "/web-site/experience/" },
  { route: "/web-site/en/experience/", label: "Career", href: "/web-site/en/experience/" },
  { route: "/web-site/skills/", label: "Habilidades", href: "/web-site/skills/" },
  { route: "/web-site/en/skills/", label: "Skills", href: "/web-site/en/skills/" },
] as const;

test("provides the durable home navigation contract", async ({ page }) => {
  await page.goto(home);

  const header = page.locator("header").first();
  const navigation = header.getByRole("navigation", { name: "Primary navigation" });

  await expect(header.getByRole("link", { name: "RLP", exact: true })).toHaveAttribute("href", home);
  await expect(navigation.getByRole("link", { name: "Inicio", exact: true })).toHaveAttribute("href", home);
  await expect(navigation.getByRole("link", { name: "Trabajo", exact: true })).toHaveAttribute("href", "/web-site/work/");
  await expect(navigation.getByRole("link", { name: "Producción", exact: true })).toHaveAttribute("href", "/web-site/production/");
  await expect(navigation.getByRole("link", { name: "Trayectoria", exact: true })).toHaveAttribute("href", "/web-site/experience/");
  await expect(navigation.getByRole("link", { name: "Habilidades", exact: true })).toHaveAttribute("href", "/web-site/skills/");
  await expect(navigation.getByRole("link", { name: "Notas", exact: true })).toHaveAttribute("href", `${blog}/`);
  await expect(navigation.getByRole("link", { name: "Inicio", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(navigation.locator('#site-navigation [aria-current]')).toHaveCount(1);
});

test("exposes one combined Career destination without separate Experience or Education links", async ({ page }) => {
  for (const route of [
    { path: "/web-site/", label: "Trayectoria", href: "/web-site/experience/", count: 6 },
    { path: "/web-site/en/", label: "Career", href: "/web-site/en/experience/", count: 5 },
    { path: "/web-site/education/", label: "Trayectoria", href: "/web-site/experience/", count: 6 },
    { path: "/web-site/en/education/", label: "Career", href: "/web-site/en/experience/", count: 5 },
  ] as const) {
    await page.goto(route.path);
    const links = page.locator("#site-navigation > ul > li > a");
    await expect(links).toHaveCount(route.count);
    await expect(links.filter({ hasText: route.label })).toHaveAttribute("href", route.href);
    await expect(links.filter({ hasText: /^(Experiencia|Experience|Formación|Education)$/ })).toHaveCount(0);
    await expect(links.filter({ hasText: route.label })).toHaveCount(1);
  }
});

test("marks exactly one real territorial destination across index and detail routes", async ({ page }) => {
  for (const { route, label, href } of territorialRoutes) {
    await page.goto(route);

    const navigation = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(navigation.getByRole("link", { name: label, exact: true })).toHaveAttribute("href", href);
    await expect(navigation.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
    await expect(navigation.locator('#site-navigation [aria-current="page"]')).toHaveCount(1);
    await expect(navigation.getByRole("link", { name: /^(Inicio|Home)$/ })).not.toHaveAttribute("aria-current", "page");
  }
});

test("marks Notes as current across the established blog territory", async ({ page }) => {
  await page.goto(blog);

  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(navigation.getByRole("link", { name: "Notas", exact: true })).toHaveAttribute("aria-current", "page");
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
  await expect(menu.getByRole("link", { name: "Habilidades", exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Trayectoria", exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Notas", exact: true })).toBeVisible();
});

test("supports keyboard operation and visible focus in the mobile navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(home);

  const toggle = page.getByRole("button", { name: "Open navigation" });
  const menu = page.locator("#site-navigation");

  await toggle.focus();
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(menu).toBeVisible();
  const workLink = menu.getByRole("link", { name: "Trabajo", exact: true });
  await workLink.focus();
  await expect(workLink).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();
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
      await expect(menu.getByRole("link", { name: "Habilidades", exact: true })).toBeVisible();
      await expect(menu.getByRole("link", { name: "Trayectoria", exact: true })).toBeVisible();
      await expect(menu.getByRole("link", { name: "Notas", exact: true })).toBeVisible();
    } else {
      await expect(toggle).toBeHidden();
      await expect(menu.getByRole("link", { name: "Habilidades", exact: true })).toBeVisible();
      await expect(menu.getByRole("link", { name: "Trayectoria", exact: true })).toBeVisible();
      await expect(menu.getByRole("link", { name: "Notas", exact: true })).toBeVisible();
      const [localeBox, themeBox, notesBox] = await Promise.all([locale.boundingBox(), theme.boundingBox(), menu.getByRole("link", { name: "Notas", exact: true }).boundingBox()]);
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
