import { expect, test } from "@playwright/test";

const home = "/web-site/";

const expectSharpIbmPlex = async (locator: Parameters<typeof expect>[0]) => {
  await expect(locator).toHaveCSS("font-family", /IBM Plex Sans/i);
  await expect(locator).toHaveCSS("border-top-left-radius", "0px");
};

test("uses native anchor hierarchy for home navigation CTAs", async ({ page }) => {
  await page.goto(home);

  const projects = page.getByRole("link", { name: "Ver proyectos", exact: true });
  const cv = page.getByRole("link", { name: "Descargar CV", exact: true }).first();

  await expect(projects).toHaveAttribute("href", "#proyectos");
  await expect(projects).toHaveCSS("border-top-left-radius", "0px");
  await expectSharpIbmPlex(projects);
  await expect(projects).toHaveCSS("background-color", "rgb(17, 19, 21)");
  await expect(cv).toHaveAttribute("download", "");
  await expect(cv).toHaveAttribute("href", /lopez-plana-rafael-2026\.pdf$/);
  await expect(cv).toHaveCSS("background-color", "rgb(242, 240, 234)");
});

test("keeps CTA navigation as anchors and contact submission as a button", async ({ page }) => {
  await page.goto(home);

  await expect(page.getByRole("link", { name: "Leer caso técnico", exact: true }).first()).toBeVisible();
  const submit = page.getByRole("button", { name: "Enviar mensaje", exact: true });
  await expect(submit).toHaveAttribute("type", "submit");
  await expectSharpIbmPlex(submit);
  await expect(submit).toHaveCSS("background-color", "rgb(17, 19, 21)");
});

test("gives framed actions a visible cyan focus treatment", async ({ page }) => {
  await page.goto(home);

  for (const locator of [
    page.getByRole("link", { name: "Ver proyectos", exact: true }),
    page.getByRole("button", { name: "Enviar mensaje", exact: true }),
  ]) {
    await locator.focus();
    await expect(locator).toBeFocused();
    await expect(locator).toHaveCSS("outline-color", "rgb(5, 154, 175)");
    await expect(locator).toHaveCSS("outline-width", "2px");
  }
});

test("keeps home actions usable without horizontal overflow at target widths", async ({ page }) => {
  for (const width of [390, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(home);

    expect(await page.locator("html").evaluate(
      (element) => element.scrollWidth <= window.innerWidth,
    )).toBe(true);
    await expect(page.getByRole("link", { name: "Ver proyectos", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Enviar mensaje", exact: true })).toBeVisible();
  }
});
