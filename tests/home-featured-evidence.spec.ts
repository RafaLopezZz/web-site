import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const homes = ["/web-site/", "/web-site/en/"];

test("presents pure selected-work category carousels with verified records", async ({ page }) => {
  for (const home of homes) {
    await page.goto(home);

    const evidence = page.locator("#featured-evidence");
    await expect(evidence).toHaveAttribute("aria-labelledby", "featured-evidence-title");
    await expect(evidence.getByRole("heading", { name: home.endsWith("/en/") ? "Selected Work" : "Trabajo seleccionado", exact: true })).toBeVisible();

    const work = evidence.locator('[data-evidence-category="work"]');
    const production = evidence.locator('[data-evidence-category="production"]');
    await expect(work).toHaveCount(1);
    await expect(production).toHaveCount(1);
    await expect(work).toHaveAccessibleName(home.endsWith("/en/") ? "Work" : "Trabajo");
    await expect(production).toHaveAccessibleName(home.endsWith("/en/") ? "Production" : "Producción");
    await expect(work.getByRole("heading", { name: home.endsWith("/en/") ? "Work" : "Trabajo", exact: true })).toHaveCount(0);
    await expect(production.getByRole("heading", { name: home.endsWith("/en/") ? "Production" : "Producción", exact: true })).toHaveCount(0);
    await expect(work.locator('[data-evidence-track] article[data-surface="artifact"]')).toHaveCount(2);
    await expect(work.getByText("RLP / WORK / 001", { exact: true })).toBeVisible();
    await expect(work.getByText("RLP / WORK / 002", { exact: true })).toBeVisible();
    await expect(work.getByRole("heading", { name: "ImportadorDB", exact: true })).toBeVisible();
    await expect(work.getByRole("heading", { name: "Cosecha en Cope", exact: true })).toBeVisible();
    await expect(work.getByRole("link", { name: /(?:Leer|Read) (?:el caso|the Spanish case) →/ }).last()).toHaveAttribute("href", /\/blog\/desarrollo-cosecha-en-cope\/$/);
    await expect(work.getByRole("heading", { name: /Glea Nexo/i })).toHaveCount(0);
    await expect(work.getByText(/RLP \/ PROD \/ 002/)).toHaveCount(0);
    await expect(work.getByRole("button")).toHaveCount(2);
    await expect(work.locator("[data-evidence-footer]")).toHaveCount(1);
    await expect(work.locator('[data-surface="dossier"]')).toHaveCount(0);

    await expect(production.locator('[data-evidence-track] article[data-surface="dossier"]')).toHaveCount(2);
    await expect(production.getByRole("heading", { name: "Cosecha en Cope", exact: true })).toHaveCount(0);
    await expect(production.getByText("RLP / PROD / 001", { exact: true })).toBeVisible();
    await expect(production.getByText("RLP / PROD / 002", { exact: true })).toBeVisible();
    await expect(production.getByRole("heading", { name: "Águilas FC", exact: true })).toBeVisible();
    await expect(production.getByRole("heading", { name: "La Ola", exact: true })).toBeVisible();
    await expect(production.getByRole("link", { name: /La Ola.*↗/ })).toHaveAttribute("href", "https://www.laolaart.com/");
    await expect(production.getByRole("link", { name: /La Ola.*↗/ })).toHaveAttribute("target", "_blank");
    await expect(production.getByRole("link", { name: /La Ola.*↗/ })).toHaveAttribute("rel", "noreferrer");
    const previous = production.getByRole("button", { name: home.endsWith("/en/") ? "Previous" : "Caso anterior" });
    const next = production.getByRole("button", { name: home.endsWith("/en/") ? "Next" : "Caso siguiente" });
    await expect(production.getByRole("button")).toHaveCount(2);
    await expect(previous).toHaveText("←");
    await expect(next).toHaveText("→");
    await expect(production.locator("[data-evidence-footer]")).toHaveCount(1);
    await expect(production.locator("[data-evidence-position]")).toHaveText("01 / 02");
    await expect(production.locator('[data-surface="artifact"]')).toHaveCount(0);
    await expect(evidence.locator('[data-surface="artifact"] [data-surface="dossier"], [data-surface="dossier"] [data-surface="artifact"]')).toHaveCount(0);
    expect(await evidence.locator("a").evaluateAll((links) => links.some((link) => link.getAttribute("href") === "#"))).toBe(false);
    await expect(evidence.locator('article a article, a article')).toHaveCount(0);
  }
});

test("keeps Home evidence product-first and compact while retaining approved source facts", async ({ page }) => {
  for (const home of homes) {
    await page.goto(home);
    const evidence = page.locator("#featured-evidence");
    const work = evidence.locator('[data-evidence-category="work"]');
    const production = evidence.locator('[data-evidence-category="production"]');
    const english = home.endsWith("/en/");

    await expect(work).toContainText(english
      ? "Desktop importer: Excel → relational systems, reducing manual import."
      : "Importador de escritorio: Excel → sistemas relacionales, reduciendo la importación manual.");
    await expect(work).toContainText(english
      ? "Marketplace for producers and consumers: catalog, authentication, and purchase."
      : "Marketplace para productores y consumidores: catálogo, autenticación y compra.");
    await expect(work).toContainText("Java · JavaFX");
    await expect(work).toContainText("Java · Angular · PostgreSQL");
    await expect(work).not.toContainText("Maven · .xlsx / .xls · MySQL · PostgreSQL · MariaDB · Firebird");
    await expect(work).not.toContainText("Spring Boot · Spring Security · Hibernate · PostgreSQL · Angular · Thymeleaf · Swagger");

    await expect(production).toContainText(english ? "Official Águilas FC website." : "Web oficial del Águilas FC.");
    await expect(production).toContainText(english ? "Art and décor ecommerce." : "Ecommerce de arte y decoración.");
    await expect(production).toContainText("PHP · Laravel · Blade");
    await expect(production).toContainText("Laravel · Livewire · MySQL");
    await expect(production).not.toContainText(/Contexto\.|Ingeniería\.|Evidencia\.|Context\.|Engineering\.|Evidence\./);
    await expect(production).not.toContainText("HeroSlideResolverTest");
    await expect(production).not.toContainText("Resolver →");
    await expect(production).not.toContainText("lockForUpdate");
    await expect(production).not.toContainText("pagado_sin_stock");

    const identifiers = evidence.locator(".selected-work__id");
    await expect(identifiers).toHaveCount(4);
    expect(await identifiers.evaluateAll((nodes) => nodes.every((node) => {
      const styles = getComputedStyle(node);
      const probe = document.createElement("span");
      probe.style.color = "var(--theme-accent)";
      document.body.append(probe);
      const accent = getComputedStyle(probe).color;
      probe.remove();
      return styles.color === accent;
    }))).toBe(true);
  }

  const selectedWorkSource = await readFile("src/data/selected-work.ts", "utf8");
  expect(selectedWorkSource).toContain("Java 25 · JavaFX 25.0.1 · Maven · .xlsx / .xls · MySQL · PostgreSQL · MariaDB · Firebird");
  expect(selectedWorkSource).toContain("Spring Boot · Spring Security · Hibernate · PostgreSQL · Angular · Thymeleaf · Swagger");
  expect(selectedWorkSource).not.toContain("HeroSlideResolverTest");
  expect(selectedWorkSource).not.toContain("lockForUpdate");
  expect(selectedWorkSource).not.toContain("callbacks");
  expect(selectedWorkSource).not.toContain("regression");
  expect(selectedWorkSource).not.toContain("Regresión");
  expect(selectedWorkSource).not.toContain("context:");
  expect(selectedWorkSource).not.toContain("engineering:");
  expect(selectedWorkSource).not.toContain("evidence:");
});

test("keeps carousel footers in a bounded flex row without overlap or overflow", async ({ page }) => {
  for (const width of [320, 390, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/web-site/");

    for (const footer of await page.locator("[data-evidence-footer]").all()) {
      const layout = await footer.evaluate((element) => {
        const controls = element.querySelector<HTMLElement>(".evidence-carousel__controls")!;
        const position = element.querySelector<HTMLElement>("[data-evidence-position]")!;
        const footerBox = element.getBoundingClientRect();
        const controlsBox = controls.getBoundingClientRect();
        const positionBox = position.getBoundingClientRect();
        return {
          display: getComputedStyle(element).display,
          wrap: getComputedStyle(element).flexWrap,
          controlsShrink: getComputedStyle(controls).flexShrink,
          controlsWidth: controlsBox.width,
          footerHeight: footerBox.height,
          overflow: element.scrollWidth > element.clientWidth,
          overlap: positionBox.right > controlsBox.left && controlsBox.right > positionBox.left,
        };
      });
      expect(layout.display).toBe("flex");
       expect(layout.wrap).toBe(width >= 1024 ? "nowrap" : "wrap");
      expect(layout.controlsShrink).toBe("0");
      expect(layout.controlsWidth).toBeGreaterThanOrEqual(88);
      expect(layout.footerHeight).toBeGreaterThanOrEqual(44);
      expect(layout.overflow).toBe(false);
      expect(layout.overlap).toBe(false);
    }
  }
});

test("keeps Work and Production carousel navigation bounded and independent", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/web-site/");

  const work = page.locator('[data-evidence-category="work"]');
  const production = page.locator('[data-evidence-category="production"]');
  const workTrack = work.locator("[data-evidence-track]");
  const productionTrack = production.locator("[data-evidence-track]");

  const previousWork = work.getByRole("button", { name: "Trabajo anterior" });
  const nextWork = work.getByRole("button", { name: "Trabajo siguiente" });
  const previousProduction = production.getByRole("button", { name: "Caso anterior" });
  const nextProduction = production.getByRole("button", { name: "Caso siguiente" });
  await expect(previousWork).toBeDisabled();
  await expect(nextWork).toBeEnabled();
  await expect(work.locator("[data-evidence-position]")).toHaveText("01 / 02");
  await expect(previousProduction).toBeDisabled();
  await expect(nextProduction).toBeEnabled();

  await nextWork.click();
  await expect.poll(() => workTrack.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await expect(work.locator("[data-evidence-position]")).toHaveText("02 / 02");
  await expect(nextWork).toBeDisabled();
  await expect(previousWork).toBeEnabled();
  await expect(production.locator("[data-evidence-position]")).toHaveText("01 / 02");
  await previousWork.click();
  await expect(work.locator("[data-evidence-position]")).toHaveText("01 / 02");
  await expect(previousWork).toBeDisabled();

  await nextProduction.click();
  await expect.poll(() => productionTrack.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await expect(production.locator("[data-evidence-position]")).toHaveText("02 / 02");
  await expect(nextProduction).toBeDisabled();
  await expect(previousProduction).toBeEnabled();
  await previousProduction.click();
  await expect(production.locator("[data-evidence-position]")).toHaveText("01 / 02");
  await expect(previousProduction).toBeDisabled();
  await expect(work.locator("[data-evidence-position]")).toHaveText("01 / 02");
});

test("uses bounded native English carousel controls and hides only the scrollbar", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/web-site/en/");

  const work = page.locator('[data-evidence-category="work"]');
  const production = page.locator('[data-evidence-category="production"]');
  const track = production.locator("[data-evidence-track]");
  await expect(work.getByRole("button", { name: "Previous work" })).toBeDisabled();
  await expect(work.getByRole("button", { name: "Next work" })).toBeEnabled();
  await expect(production.getByRole("button", { name: "Previous" })).toBeDisabled();
  await expect(production.getByRole("button", { name: "Next" })).toBeEnabled();
  await expect(production.getByRole("button", { name: "Previous" })).toHaveText("←");
  await expect(production.getByRole("button", { name: "Next" })).toHaveText("→");
  await expect(track).toHaveCSS("overflow-x", "auto");
  await expect(track).toHaveCSS("scroll-snap-type", "x mandatory");
  await expect(track).toHaveCSS("scrollbar-width", "none");
});

test("keeps featured evidence readable across themes and target widths", async ({ page }) => {
  for (const home of homes) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(home);
      expect(await page.locator("html").evaluate((element) => element.scrollWidth <= window.innerWidth)).toBe(true);

      await page.evaluate(() => localStorage.setItem("rlp-theme", "dark"));
      await page.reload();
      await expect(page.locator("#featured-evidence")).toBeVisible();
      expect(await page.locator("html").evaluate((element) => element.scrollWidth <= window.innerWidth)).toBe(true);
    }
  }
});

test("does not autoplay either selected-work carousel", async ({ page }) => {
  await page.goto("/web-site/");

  const positions = page.locator("[data-evidence-position]");
  await expect(positions).toHaveText(["01 / 02", "01 / 02"]);
  await page.waitForTimeout(500);
  await expect(positions).toHaveText(["01 / 02", "01 / 02"]);
});

test("keeps Production controls in its footer after its dossier body", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/web-site/");

  const production = page.locator('[data-evidence-category="production"]');
  const footer = production.locator("[data-evidence-footer]");
  const lastDossier = production.locator('[data-surface="dossier"]').last();
  await expect(footer).toContainText("01 / 02");
  expect(await footer.evaluate((element) => element.compareDocumentPosition(element.closest("[data-evidence-carousel]")!.querySelector('[data-surface="dossier"]:last-child')!) & Node.DOCUMENT_POSITION_PRECEDING)).toBeTruthy();
  expect(await footer.evaluate((element) => {
    const control = element.querySelector("button");
    return Boolean(control && element.contains(control));
  })).toBe(true);
  expect(await lastDossier.evaluate((element) => element.getBoundingClientRect().width <= window.innerWidth)).toBe(true);
  expect(await page.locator("html").evaluate((element) => element.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.locator('[data-evidence-category="work"] [data-evidence-footer]')).toHaveCount(1);
  await expect(page.locator('[data-evidence-category="work"] [data-surface="dossier"]')).toHaveCount(0);
});

test("stabilizes desktop carousel stages while preserving natural mobile content", async ({ page }) => {
  const geometry = async () => page.locator("[data-evidence-category]").evaluateAll((categories) => categories.map((category) => {
    const carousel = category.querySelector<HTMLElement>("[data-evidence-carousel]")!;
    const track = category.querySelector<HTMLElement>("[data-evidence-track]")!;
    const footer = category.querySelector<HTMLElement>("[data-evidence-footer]")!;
    const position = category.querySelector<HTMLElement>("[data-evidence-position]")!;
    const controls = category.querySelector<HTMLElement>(".evidence-carousel__controls")!;
    const active = track.querySelectorAll<HTMLElement>(".evidence-carousel__item")[Math.round(track.scrollLeft / track.clientWidth)];
    const carouselBox = carousel.getBoundingClientRect();
    const trackBox = track.getBoundingClientRect();
    const footerBox = footer.getBoundingClientRect();
    const positionBox = position.getBoundingClientRect();
    const controlsBox = controls.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    return {
      carouselHeight: carouselBox.height,
      footerTop: footerBox.top + window.scrollY,
      footerBottom: footerBox.bottom + window.scrollY,
      footerOverflow: footer.scrollWidth > footer.clientWidth,
      footerBeforeStageEnd: footerBox.top < trackBox.bottom,
      controlsAndCounterShareRow: Math.abs((positionBox.top + positionBox.height / 2) - (controlsBox.top + controlsBox.height / 2)) <= 1,
      activeClipped: activeBox.top < trackBox.top - 1 || activeBox.bottom > trackBox.bottom + 1,
      stageExceedsContent: trackBox.height > Math.max(...Array.from(track.querySelectorAll<HTMLElement>(".evidence-carousel__item"), (item) => item.getBoundingClientRect().height)) + 1,
    };
  }));

  for (const width of [1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/web-site/");

    const before = await geometry();
    expect(Math.abs(before[0].footerTop - before[1].footerTop)).toBeLessThanOrEqual(2);
    for (const item of before) {
      expect(item.controlsAndCounterShareRow).toBe(true);
      expect(item.footerOverflow).toBe(false);
      expect(item.footerBeforeStageEnd).toBe(false);
      expect(item.activeClipped).toBe(false);
    }

    await page.locator('[data-evidence-category="work"] [data-evidence-next]').click();
    await expect(page.locator('[data-evidence-category="work"] [data-evidence-position]')).toHaveText("02 / 02");
    await expect(page.locator('[data-evidence-category="production"] [data-evidence-position]')).toHaveText("01 / 02");
    await page.locator('[data-evidence-category="production"] [data-evidence-next]').click();
    const after = await geometry();
    expect(Math.abs(after[0].footerTop - after[1].footerTop)).toBeLessThanOrEqual(2);
    expect(Math.abs(after[0].footerTop - before[0].footerTop)).toBeLessThanOrEqual(2);
    expect(Math.abs(after[1].footerTop - before[1].footerTop)).toBeLessThanOrEqual(2);
    for (const item of after) {
      expect(item.carouselHeight).toBeGreaterThan(0);
      expect(item.footerOverflow).toBe(false);
      expect(item.footerBeforeStageEnd).toBe(false);
      expect(item.activeClipped).toBe(false);
    }
  }

  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/web-site/");
    for (const item of await geometry()) {
      expect(item.stageExceedsContent).toBe(false);
      expect(item.activeClipped).toBe(false);
      expect(item.footerOverflow).toBe(false);
    }
  }
});
