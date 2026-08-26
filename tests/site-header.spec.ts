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
  await expect(navigation.locator('[aria-current]')).toHaveCount(1);

  await expect(header.locator('a[href^="/work"], a[href^="/production"], a[href^="/experience"], a[href^="/education"], a[href^="/notes"], a[href^="/about"], a[href^="/contact"]')).toHaveCount(0);
});

test("marks Notes as current across the established blog territory", async ({ page }) => {
  await page.goto(blog);

  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(navigation.getByRole("link", { name: "Notes", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(navigation.locator('[aria-current]')).toHaveCount(1);
});

test("exposes the complete navigation from a real mobile menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(home);

  const menu = page.locator("#site-navigation");
  const toggle = page.getByRole("button", { name: "Open navigation" });

  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeHidden();

  await toggle.click();

  const closeToggle = page.getByRole("button", { name: "Close navigation" });
  await expect(closeToggle).toHaveAttribute("aria-expanded", "true");
  await expect(menu.getByRole("link", { name: "Notes", exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "CV", exact: true })).toBeVisible();
});
