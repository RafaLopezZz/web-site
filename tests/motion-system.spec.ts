import { expect, test, type Locator } from "@playwright/test";
import { readFile } from "node:fs/promises";

const root = "/web-site";
const terminalLines = ["C:\\RLP> whoami", "rlp-sys-admin", "C:\\RLP> █"];
const terminalBody = terminalLines.join("\n");

const terminalHasNoOverflow = (element: HTMLElement) => element.scrollWidth <= element.clientWidth;

const pageHasNoOverflow = (element: HTMLElement) => element.scrollWidth <= window.innerWidth;

const expectVisibleAndStatic = async (units: Locator) => {
  expect(await units.count()).toBeGreaterThan(0);
  for (const unit of await units.all()) {
    await expect(unit).toBeVisible();
    expect(await unit.evaluate((element) => {
      const style = getComputedStyle(element);
      return style.opacity === "1"
        && style.transform === "none"
        && element.getAnimations().every((animation) => animation.playState !== "running");
    })).toBe(true);
  }
};

const expectSettled = async (unit: Locator) => {
  await expect.poll(() => unit.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      opacity: style.opacity,
      transform: style.transform,
      hasActiveAnimation: element.getAnimations().some(({ playState }) => playState === "running" || playState === "pending"),
    };
  })).toEqual({ opacity: "1", transform: "none", hasActiveAnimation: false });
};

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
  await expect(page.locator('article[data-surface="artifact"]')).toHaveCount(3);
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

test("keeps route units readable without enhancement and settles Home About once", async ({ browser, page }) => {
  const ssrContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const reducedContext = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });

  try {
    for (const context of [ssrContext, reducedContext]) {
      const routePage = await context.newPage();

      await routePage.goto(`${root}/`);
      const homeUnits = routePage.locator("#featured-evidence, #explore, #about");
      await expect(homeUnits).toHaveCount(3);
      await expectVisibleAndStatic(homeUnits);

      for (const route of ["work", "production"]) {
        await routePage.goto(`${root}/${route}/`);
        await expectVisibleAndStatic(routePage.locator("article.territory-index__record"));
      }
    }
  } finally {
    await ssrContext.close();
    await reducedContext.close();
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${root}/`);
  const about = page.locator("#about");

  expect(await about.evaluate((element) => element.getBoundingClientRect().top > window.innerHeight)).toBe(true);
  expect(await about.evaluate((element) => {
    const style = getComputedStyle(element);
    return style.opacity !== "1" || style.transform !== "none";
  })).toBe(true);

  await about.scrollIntoViewIfNeeded();
  await expectSettled(about);
  await page.locator("#featured-evidence").scrollIntoViewIfNeeded();
  await about.scrollIntoViewIfNeeded();
  await expectSettled(about);
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

test("keeps bilingual themed routes overflow-safe at canonical widths", async ({ page }) => {
  for (const route of [`${root}/work/`, `${root}/en/production/`]) {
    for (const theme of ["light", "dark"]) {
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.addInitScript((value) => localStorage.setItem("rlp-theme", value), theme);
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        expect(await page.locator("html").evaluate((element) => element.scrollWidth <= window.innerWidth)).toBe(true);
        await expect(page.locator('[data-surface="artifact"], [data-surface="dossier"]').first()).toBeVisible();
      }
    }
  }
});

test("shares an active technical background across Home, Work, and Production", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  let sharedContract: Record<string, string> | undefined;
  for (const { route, shell } of [
    { route: `${root}/`, shell: "main.home-shell" },
    { route: `${root}/work/`, shell: "main.territory-index-shell" },
    { route: `${root}/production/`, shell: "main.territory-index-shell" },
    { route: `${root}/work/importador-db/`, shell: "main.case-shell" },
  ]) {
    await page.goto(route);
    const owner = page.locator(shell);
    await expect(owner.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.locator("html").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);

    const before = await owner.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        backgroundImage: style.backgroundImage,
        backgroundPosition: style.backgroundPosition,
        backgroundSize: style.backgroundSize,
        animationDuration: style.animationDuration,
        animationTimingFunction: style.animationTimingFunction,
        hasActiveAnimation: element.getAnimations().some((animation) => animation.playState === "running"),
        hasNonZeroDuration: style.animationDuration.split(",").some((duration) => Number.parseFloat(duration) > 0),
      };
    });
    await page.waitForTimeout(100);
    const afterPosition = await owner.evaluate((element) => getComputedStyle(element).backgroundPosition);

    expect(before.backgroundImage).not.toBe("none");
    expect(before.hasActiveAnimation).toBe(true);
    expect(before.hasNonZeroDuration).toBe(true);
    expect(afterPosition).not.toBe(before.backgroundPosition);

    const { backgroundImage: _backgroundImage, backgroundPosition: _backgroundPosition, hasActiveAnimation: _hasActiveAnimation, hasNonZeroDuration: _hasNonZeroDuration, ...geometry } = before;
    if (sharedContract) expect(geometry).toEqual(sharedContract);
    else sharedContract = geometry;
  }
});

test("keeps technical backgrounds inactive and stable for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const { route, shell } of [
    { route: `${root}/`, shell: "main.home-shell" },
    { route: `${root}/work/`, shell: "main.territory-index-shell" },
    { route: `${root}/production/`, shell: "main.territory-index-shell" },
    { route: `${root}/work/importador-db/`, shell: "main.case-shell" },
  ]) {
    await page.goto(route);
    const owner = page.locator(shell);
    const beforePosition = await owner.evaluate((element) => getComputedStyle(element).backgroundPosition);
    await page.waitForTimeout(100);

    expect(await owner.evaluate((element) => element.getAnimations().some((animation) => animation.playState === "running"))).toBe(false);
    await expect(owner).toHaveCSS("background-position", beforePosition);
  }
});

test("progresses the CMD identity body without moving its title bar or layout", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${root}/`);

  const identity = page.locator("#cmd-identity");
  const title = page.locator(".cmd-identity__titlebar");
  const terminal = page.locator(".cmd-identity__terminal");

  expect(await title.isVisible()).toBe(true);
  await expect(terminal.locator(".cmd-identity__titlebar")).toHaveCount(0);

  const initialBox = await identity.evaluate((element) => {
    const { height, width, x, y } = element.getBoundingClientRect();
    return { height, width, x, y };
  });
  const observedStates = await terminal.evaluate(async (element, finalBody) => {
    const states: string[] = [];
    const capture = () => {
      const state = element.innerText.split("\n").map((line) => line.trim()).filter(Boolean).join("\n");
      if (states.at(-1) !== state) states.push(state);
      return state;
    };

    return new Promise<string[]>((resolve) => {
      const observer = new MutationObserver(capture);
      observer.observe(element, { childList: true, characterData: true, subtree: true });

      const observe = () => {
        if (capture() === finalBody) {
          observer.disconnect();
          resolve(states);
          return;
        }
        requestAnimationFrame(observe);
      };

      observe();
    });
  }, terminalBody);

  await expect(terminal).toHaveText(terminalBody);
  await expect(terminal.locator(":scope > p")).toHaveText(terminalLines);
  expect(observedStates.filter(Boolean).every((state) => terminalBody.startsWith(state))).toBe(true);
  expect(observedStates.indexOf(terminalLines[0])).toBeGreaterThanOrEqual(0);
  expect(observedStates.indexOf(terminalLines.slice(0, 2).join("\n"))).toBeGreaterThan(observedStates.indexOf(terminalLines[0]));
  expect(observedStates.indexOf(terminalBody)).toBeGreaterThan(observedStates.indexOf(terminalLines.slice(0, 2).join("\n")));
  expect(await terminal.evaluate(terminalHasNoOverflow)).toBe(true);
  expect(await page.locator("html").evaluate(pageHasNoOverflow)).toBe(true);
  expect(await identity.evaluate((element) => {
    const { height, width, x, y } = element.getBoundingClientRect();
    return { height, width, x, y };
  })).toEqual(initialBox);
});

test("resolves the CMD identity immediately without terminal animation for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const route of [`${root}/`, `${root}/en/`]) {
    for (const theme of ["light", "dark"]) {
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.addInitScript((value) => localStorage.setItem("rlp-theme", value), theme);
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);

        const terminal = page.locator(".cmd-identity__terminal");
        const lines = terminal.locator(":scope > p");
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        await expect(terminal).toBeVisible();
        expect((await terminal.innerText()).split("\n").map((line) => line.trim()).filter(Boolean).join("\n")).toBe(terminalBody);
        await expect(lines).toHaveText(terminalLines);
        for (const line of await lines.all()) await expect(line).toBeVisible();
        expect(await terminal.evaluate((element) => element.getAnimations({ subtree: true }).some((animation) => animation.playState === "running"))).toBe(false);
        expect(await terminal.evaluate(terminalHasNoOverflow)).toBe(true);
        expect(await page.locator("html").evaluate(pageHasNoOverflow)).toBe(true);
      }
    }
  }
});
