import { expect, test } from "@playwright/test";

const home = "/web-site/";

test("presents the bounded M2.1 Home identity shell", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 844 });
  await page.goto(home);

  const hero = page.locator("#hero");
  const cmd = page.locator("#cmd-identity");

  await expect(hero.getByRole("heading", { name: "Rafael López", exact: true })).toBeVisible();
  await expect(hero.getByText("Software Developer", { exact: true })).toBeVisible();
  await expect(hero.getByText("Backend · Datos · Sistemas", { exact: true })).toBeVisible();
  await expect(hero.getByText(
    "Desarrollo software para resolver problemas reales, con especial interés en backend, datos, automatización y sistemas conectados.",
    { exact: true },
  )).toBeVisible();
  await expect(hero.getByText("Fullstack Developer", { exact: true })).toHaveCount(0);
  await expect(hero.locator("img")).toHaveCount(0);

  const work = hero.getByRole("link", { name: "Ver trabajo", exact: true });
  await expect(work).toHaveAttribute("href", "#featured-evidence");
  await expect(hero.getByRole("link", { name: "Descargar CV", exact: true })).toHaveAttribute("download", "");

  await expect(cmd).toContainText("C:\\RLP\\identity.exe");
  await expect(cmd).toContainText("C:\\RLP> whoami");
  await expect(cmd).toContainText("rlp-sys-admin");
  await expect(cmd).toContainText("C:\\RLP> █");
  await expect(cmd).not.toContainText(/status|initializ|build|network|log/i);

  await expect(page.locator("#proyectos, #sobre-mi, #experiencia, #formacion, #cv, #contacto, [data-home-skills]")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /Glea Nexo/ })).toHaveCount(0);
  await expect(page.getByRole("form")).toHaveCount(0);

  const desktop = await hero.evaluate((element) => {
    const main = element.closest("main");
    const container = element.closest(".rlp-container");
    const heroRect = element.getBoundingClientRect();
    const containerRect = container?.getBoundingClientRect();
    return main?.classList.contains("home-shell")
      && containerRect !== undefined
      && heroRect.left >= containerRect.left
      && heroRect.right <= containerRect.right;
  });
  expect(desktop).toBe(true);
});

test("keeps the M2.1 Home readable and ordered at narrow widths", async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(home);

    expect(await page.locator("html").evaluate(
      (element) => element.scrollWidth <= window.innerWidth,
    )).toBe(true);

    const positions = await page.locator("#hero-identity, #cmd-identity").evaluateAll(
      (elements) => elements.map((element) => element.getBoundingClientRect().top),
    );
    expect(positions[0]).toBeLessThan(positions[1]);
  }
});

test("uses readable two-column Hero composition from 768px", async ({ page }) => {
  for (const width of [768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(home);

    expect(await page.locator("html").evaluate(
      (element) => element.scrollWidth <= window.innerWidth,
    )).toBe(true);

    const [identity, cmd] = await page.locator("#hero-identity, #cmd-identity").evaluateAll(
      (elements) => elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, top: rect.top };
      }),
    );
    expect(cmd.left).toBeGreaterThan(identity.left);
    expect(Math.abs(cmd.top - identity.top)).toBeLessThan(160);
  }
});

test("keeps the 1440px Home canvas Paper while constraining its content", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 844 });
  await page.goto(home);

  const canvas = page.locator("#main-content");
  const content = canvas.locator(":scope > .rlp-container");

  await expect(content).toHaveCount(1);
  const layout = await canvas.evaluate((element) => {
    const contentElement = element.querySelector(":scope > .rlp-container");
    const canvasRect = element.getBoundingClientRect();
    const contentRect = contentElement?.getBoundingClientRect();
    const sampleY = Math.min(canvasRect.bottom - 1, canvasRect.top + 120);
    const leftSide = document.elementFromPoint(1, sampleY);
    const rightSide = document.elementFromPoint(window.innerWidth - 2, sampleY);
    const paper = getComputedStyle(element).backgroundColor;

    return {
      canvasCoversViewport: canvasRect.left <= 0 && canvasRect.right >= window.innerWidth,
      contentWidth: contentRect?.width,
      contentMax: Number.parseFloat(getComputedStyle(contentElement!).maxWidth),
      leftSideIsPaper: getComputedStyle(leftSide!).backgroundColor === paper,
      rightSideIsPaper: getComputedStyle(rightSide!).backgroundColor === paper,
      noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth,
    };
  });

  expect(layout.canvasCoversViewport).toBe(true);
  expect(layout.contentWidth).toBeLessThanOrEqual(layout.contentMax);
  expect(layout.leftSideIsPaper).toBe(true);
  expect(layout.rightSideIsPaper).toBe(true);
  expect(layout.noHorizontalOverflow).toBe(true);
});
