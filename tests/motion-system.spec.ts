import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const root = "/web-site";

test("defines a centralized restrained CSS-first interaction contract", async () => {
  const [css, header, territoryIndex, packageJson] = await Promise.all([
    readFile("src/styles/global.css", "utf8"),
    readFile("src/components/SiteHeader.astro", "utf8"),
    readFile("src/components/TerritoryIndex.astro", "utf8"),
    readFile("package.json", "utf8"),
  ]);

  expect(css).toContain("--motion-fast:");
  expect(css).toContain("--motion-base:");
  expect(css).toContain("--ease-standard:");
  expect(css).toContain("@media (hover: hover) and (pointer: fine)");
  expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  expect(css).toContain(".site-header .site-header__link");
  expect(css).toContain(".territory-index__records .surface.surface--dossier:hover");
  expect(header).not.toContain("var(--motion-");
  expect(territoryIndex).not.toContain("surface--dossier:hover");
  expect(css).not.toMatch(/transition\s*:\s*all\b/);
  expect(packageJson).not.toMatch(/gsap|framer-motion|anime(?:js)?|motion-one|swiper|aos/i);
});

test("keeps actions and territory surfaces natively semantic", async ({ page }) => {
  await page.goto(`${root}/`);

  await expect(page.getByRole("link", { name: "Ver trabajo", exact: true })).toHaveCSS("outline-style", "none");
  await expect(page.locator('article[data-surface="artifact"]')).toHaveCount(2);
  expect(await page.locator('article[data-surface="dossier"]').count()).toBeGreaterThan(0);
  await expect(page.locator('a[data-surface], button[data-surface]')).toHaveCount(0);

  const action = page.getByRole("link", { name: "Ver trabajo", exact: true });
  await action.focus();
  await expect(action).toHaveCSS("outline-style", "solid");
});

test("gives WORK a physical micro-response and PROD a documentary response", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto(`${root}/work/`);
  const artifact = page.locator('.territory-index__record[data-surface="artifact"]').first();
  await artifact.hover();
  await expect(artifact).not.toHaveCSS("transform", "none");

  await page.goto(`${root}/production/`);
  const dossier = page.locator('.territory-index__record[data-surface="dossier"]').first();
  await dossier.hover();
  await expect(dossier).toHaveCSS("transform", "none");
  await expect(dossier).toHaveCSS("border-bottom-color", /rgb\(5, 154, 175\)|rgb\(92, 182, 195\)/);
});

test("removes non-essential movement for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${root}/work/`);

  const artifact = page.locator('.territory-index__record[data-surface="artifact"]').first();
  await artifact.hover();
  await expect(artifact).toHaveCSS("transform", "none");
  await expect(artifact).toHaveCSS("transition-duration", "0s");
  await expect(page.locator("[data-territory-media-slot]").first()).toHaveCSS("animation-name", "none");
});

test("uses CSS carousel continuity and makes reduced motion instant", async ({ page }) => {
  const carousel = await readFile("src/components/EvidenceCarousel.astro", "utf8");
  expect(carousel).toContain('window.matchMedia("(prefers-reduced-motion: reduce)")');
  expect(carousel).toMatch(/\?\s*"instant"\s*:\s*"smooth"/);

  await page.goto(`${root}/`);
  const track = page.locator("[data-evidence-track]").first();
  await expect(track).toHaveCSS("scroll-behavior", "smooth");

  const observedIntermediateMovement = await track.evaluate(async (element) => {
    const next = element.closest("[data-evidence-carousel]")!.querySelector<HTMLButtonElement>("[data-evidence-next]")!;
    const destination = element.clientWidth;
    return new Promise<boolean>((resolve) => {
      const timeout = window.setTimeout(() => {
        element.removeEventListener("scroll", onScroll);
        resolve(false);
      }, 1000);
      const onScroll = () => {
        if (element.scrollLeft <= 0 || element.scrollLeft >= destination) return;
        window.clearTimeout(timeout);
        element.removeEventListener("scroll", onScroll);
        resolve(true);
      };
      element.addEventListener("scroll", onScroll);
      next.click();
    });
  });
  expect(observedIntermediateMovement).toBe(true);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  const reducedTrack = page.locator("[data-evidence-track]").first();
  await expect(reducedTrack).toHaveCSS("scroll-behavior", "auto");
  const reducedPosition = await reducedTrack.evaluate((element) => {
    element.closest("[data-evidence-carousel]")!.querySelector<HTMLButtonElement>("[data-evidence-next]")!.click();
    return { left: element.scrollLeft, destination: element.clientWidth };
  });
  expect(reducedPosition.left).toBe(reducedPosition.destination);
});
