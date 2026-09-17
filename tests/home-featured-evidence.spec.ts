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
    await expect(work).toHaveAccessibleName(home.endsWith("/en/") ? "Selected work" : "Trabajo seleccionado");
    await expect(production).toHaveAccessibleName(home.endsWith("/en/") ? "Production" : "Producción");
    await expect(work.getByRole("heading", { name: home.endsWith("/en/") ? "Work" : "Trabajo", exact: true })).toHaveCount(0);
    await expect(production.getByRole("heading", { name: home.endsWith("/en/") ? "Production" : "Producción", exact: true })).toHaveCount(0);
    await expect(work.locator('[data-evidence-track] article[data-surface="artifact"]')).toHaveCount(3);
     await expect(work.locator("[data-territory-media-slot]")).toHaveCount(3);
    await expect(work.getByText("RLP / WORK / 001", { exact: true })).toBeVisible();
    await expect(work.getByText("RLP / WORK / 002", { exact: true })).toBeVisible();
    await expect(work.getByText("RLP / LAB / 001", { exact: true })).toBeVisible();
    await expect(work.getByRole("heading", { name: "ImportadorDB", exact: true })).toBeVisible();
    await expect(work.getByRole("heading", { name: "Cosecha en Cope", exact: true })).toBeVisible();
    const glea = work.locator("article").filter({ hasText: "Glea-Nexo" });
    await expect(glea).toHaveCount(1);
    await expect(glea.getByRole("heading", { name: "Glea-Nexo", exact: true })).toBeVisible();
     await expect(glea.locator("[data-territory-media-slot]")).toHaveCount(1);
     await expect(glea.locator("img")).toHaveAttribute("src", /\/[_a-z]+\/[^/]+\.webp$/);
     await expect(glea.locator("img")).toHaveAttribute("srcset", /640w/);
     await expect(glea.locator("img")).toHaveAttribute("alt", /Glea-Nexo/);
     const importador = work.locator("article").filter({ hasText: "ImportadorDB" });
     await expect(importador.locator("img")).toHaveAttribute("alt", /ImportadorDB/);
     await expect(importador.locator("img")).toHaveAttribute("src", /importador-db_old[^/]*\.webp$/);
    await expect(glea).toContainText(home.endsWith("/en/")
      ? "Engineering lab for exploring agricultural telemetry, offline continuity, and reliability boundaries."
      : "Laboratorio de ingeniería para explorar telemetría agrícola, continuidad sin conexión y límites de fiabilidad.");
     await expect(glea).not.toContainText(/AI|Big Data|Production|real agricultural sensor|real agricultural dataset/i);
    const workActions = work.getByRole("link", { name: home.endsWith("/en/") ? "View case →" : "Ver caso →", exact: true });
    await expect(workActions).toHaveCount(3);
    await expect(workActions.nth(1)).toHaveAttribute("href", home.endsWith("/en/") ? "/web-site/en/work/cosecha-en-cope/" : "/web-site/work/cosecha-en-cope/");
    await expect(workActions.nth(2)).toHaveAttribute("href", home.endsWith("/en/") ? "/web-site/en/work/glea-nexo/" : "/web-site/work/glea-nexo/");
    await expect(work.getByText(/RLP \/ PROD \/ 002/)).toHaveCount(0);
    await expect(work.getByRole("button")).toHaveCount(2);
    await expect(work.locator("[data-evidence-footer]")).toHaveCount(1);
    await expect(work.locator('[data-surface="dossier"]')).toHaveCount(0);

    await expect(production.locator('[data-evidence-track] article[data-surface="dossier"]')).toHaveCount(3);
    await expect(production.locator("[data-territory-media-slot]")).toHaveCount(3);
    await expect(production.getByRole("heading", { name: "Cosecha en Cope", exact: true })).toHaveCount(0);
    await expect(production.getByText("RLP / PROD / 001", { exact: true })).toBeVisible();
    await expect(production.getByText("RLP / PROD / 002", { exact: true })).toBeVisible();
    await expect(production.getByRole("heading", { name: "Águilas FC", exact: true })).toBeVisible();
    await expect(production.getByRole("heading", { name: "La Ola Art Gallery", exact: true })).toBeVisible();
    await expect(production.getByRole("heading", { name: "Quinta Bella", exact: true })).toBeVisible();
    await expect(production.locator("img")).toHaveCount(3);
    for (const image of await production.locator("img").all()) {
      await expect(image).toHaveAttribute("src", /\/_astro\/[^/]+\.webp$/);
      await expect(image).toHaveAttribute("srcset", /640w/);
      await expect(image).toHaveAttribute("srcset", /1280w/);
      await expect(image).toHaveAttribute("sizes", "(min-width: 1024px) 50vw, 100vw");
    }
    const aguilas = production.getByRole("link", { name: /Águilas FC.*↗/ });
    await expect(aguilas).toHaveAttribute("href", home.endsWith("/en/") ? "/web-site/en/production/aguilas-fc/" : "/web-site/production/aguilas-fc/");
    await expect(aguilas).not.toHaveAttribute("target");
    await expect(aguilas).not.toHaveAttribute("rel");
    await expect(production.getByRole("link", { name: /La Ola Art Gallery.*↗/ })).toHaveAttribute("href", "https://www.laolaart.com/");
    await expect(production.getByRole("link", { name: /La Ola Art Gallery.*↗/ })).toHaveAttribute("target", "_blank");
    await expect(production.getByRole("link", { name: /La Ola Art Gallery.*↗/ })).toHaveAttribute("rel", "noopener noreferrer");
    await expect(production.getByRole("link", { name: home.endsWith("/en/") ? "View Quinta Bella ↗" : "Ver Quinta Bella ↗", exact: true })).not.toHaveAttribute("target");
    const previous = production.getByRole("button", { name: home.endsWith("/en/") ? "Previous" : "Caso anterior" });
    const next = production.getByRole("button", { name: home.endsWith("/en/") ? "Next" : "Caso siguiente" });
    await expect(production.getByRole("button")).toHaveCount(2);
    await expect(previous).toHaveText("←");
    await expect(next).toHaveText("→");
    await expect(production.locator("[data-evidence-footer]")).toHaveCount(1);
    await expect(production.locator("[data-evidence-position]")).toHaveText("01 / 03");
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
      ? "Desktop application for importing Excel data into relational databases through a guided review, mapping, and loading workflow."
      : "Aplicación de escritorio para importar datos desde Excel a bases de datos relacionales mediante un flujo guiado de revisión, mapeo y carga.");
    await expect(work).toContainText(english
      ? "Web application connecting catalog, authentication, purchasing, and persistence through a REST API and an Angular client."
      : "Aplicación web que conecta catálogo, autenticación, compra y persistencia mediante una API REST y un cliente Angular.");
    await expect(work).toContainText("Java 21 · JavaFX · JDBC");
    await expect(work).toContainText("Java · Angular · PostgreSQL");
    await expect(work).toContainText(english ? "Engineering lab for exploring agricultural telemetry, offline continuity, and reliability boundaries." : "Laboratorio de ingeniería para explorar telemetría agrícola, continuidad sin conexión y límites de fiabilidad.");
    await expect(work).not.toContainText("Maven · .xlsx / .xls · MySQL · PostgreSQL · MariaDB · Firebird");
    await expect(work).not.toContainText("Spring Boot · Spring Security · Hibernate · PostgreSQL · Angular · Thymeleaf · Swagger");

    await expect(production).toContainText(english ? "Official Águilas FC website." : "Web oficial del Águilas FC.");
    await expect(production).toContainText(english ? "Art and décor ecommerce." : "Ecommerce de arte y decoración.");
    await expect(production).toContainText(english ? "Public website and booking flow for a rural campsite." : "Web pública y reservas para un camping rural.");
    await expect(production).toContainText("PHP · Laravel · Blade");
    await expect(production).toContainText("Laravel · Livewire · MySQL");
    await expect(production).not.toContainText(/Contexto\.|Ingeniería\.|Evidencia\.|Context\.|Engineering\.|Evidence\./);
    await expect(production).not.toContainText("HeroSlideResolverTest");
    await expect(production).not.toContainText("Resolver →");
    await expect(production).not.toContainText("lockForUpdate");
    await expect(production).not.toContainText("pagado_sin_stock");

    const identifiers = evidence.locator(".selected-work__id");
    await expect(identifiers).toHaveCount(6);
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
  expect(selectedWorkSource).toContain("Java 21 · JavaFX · JDBC · .xlsx / .xls · MySQL · PostgreSQL · MariaDB · Firebird");
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

test("normalizes every Home carousel card to the shared surface interaction contract", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  const css = await readFile("src/styles/global.css", "utf8");
  expect(css.match(/\.selected-work \.surface:hover:not\(:focus-within\)/g)).toHaveLength(2);
  expect(css).not.toContain(".selected-work .surface--dossier:hover");

  const cards = page.locator("#featured-evidence [data-evidence-track] [data-surface]");

  for (const theme of ["light", "dark"]) {
    await page.addInitScript((value) => localStorage.setItem("rlp-theme", value), theme);
    await page.goto("/web-site/");
    await expect(cards).toHaveCount(6);
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);

    const colors = await page.evaluate(() => {
      const probe = document.createElement("span");
      probe.style.border = "1px solid var(--theme-line)";
      probe.style.borderLeftColor = "var(--theme-accent)";
      document.body.append(probe);
      const style = getComputedStyle(probe);
      const values = { line: style.borderTopColor, accent: style.borderLeftColor };
      probe.remove();
      return values;
    });
    const baseBoxes = await cards.evaluateAll((elements) => elements.map((element) => {
      const style = getComputedStyle(element);
      return {
        borderWidths: [style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth],
        borderStyles: [style.borderTopStyle, style.borderRightStyle, style.borderBottomStyle, style.borderLeftStyle],
        borderColors: [style.borderTopColor, style.borderRightColor, style.borderBottomColor, style.borderLeftColor],
        borderRadius: style.borderRadius,
        transitionProperty: style.transitionProperty,
        transitionDuration: style.transitionDuration,
        transitionTimingFunction: style.transitionTimingFunction,
        boxShadow: style.boxShadow,
        width: element.getBoundingClientRect().width,
        height: element.getBoundingClientRect().height,
      };
    }));

    const sharedBaseStyles = baseBoxes.map(({ width: _width, height: _height, ...styles }) => styles);
    expect(sharedBaseStyles.every((styles) => JSON.stringify(styles) === JSON.stringify(sharedBaseStyles[0]))).toBe(true);
    expect(baseBoxes[0]).toMatchObject({
      borderWidths: ["1px", "1px", "1px", "1px"],
      borderStyles: ["solid", "solid", "solid", "solid"],
      borderColors: [colors.line, colors.line, colors.line, colors.accent],
      borderRadius: "0px",
      transitionProperty: "transform, border-color",
      transitionDuration: "0.2s, 0.15s",
      transitionTimingFunction: "ease-out, ease-out",
      boxShadow: "none",
    });

    const transparent = await page.evaluate(() => {
      const probe = document.createElement("span");
      probe.style.border = "1px solid transparent";
      document.body.append(probe);
      const value = getComputedStyle(probe).borderTopColor;
      probe.remove();
      return value;
    });
    const hoverStyles = [];
    for (const card of await cards.all()) {
      await card.hover();
      await page.waitForTimeout(250);
      hoverStyles.push(await card.evaluate((element) => {
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        return {
          borderWidths: [style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth],
          borderStyles: [style.borderTopStyle, style.borderRightStyle, style.borderBottomStyle, style.borderLeftStyle],
          borderColors: [style.borderTopColor, style.borderRightColor, style.borderBottomColor, style.borderLeftColor],
          transform: style.transform,
          boxShadow: style.boxShadow,
          width: box.width,
          height: box.height,
        };
      }));
    }

    const sharedHoverStyles = hoverStyles.map(({ width: _width, height: _height, ...styles }) => styles);
    expect(sharedHoverStyles.every((styles) => JSON.stringify(styles) === JSON.stringify(sharedHoverStyles[0]))).toBe(true);
    expect(hoverStyles.every((styles, index) => styles.width === baseBoxes[index].width && styles.height === baseBoxes[index].height)).toBe(true);
    expect(hoverStyles[0]).toMatchObject({
      borderWidths: baseBoxes[0].borderWidths,
      borderStyles: baseBoxes[0].borderStyles,
      borderColors: [transparent, transparent, transparent, transparent],
      transform: "matrix(1, 0, 0, 1, 0, -1)",
      boxShadow: "none",
      width: baseBoxes[0].width,
      height: baseBoxes[0].height,
    });

    const titleLinks = page.locator("#featured-evidence .selected-work__title-link");
    await expect(titleLinks).toHaveCount(5);
    for (const title of await titleLinks.all()) {
      await title.focus();
      await expect(title).toBeFocused();
      await expect(title).toHaveCSS("outline-style", "solid");
    }

    await titleLinks.first().focus();
    await expect(cards.first()).toHaveCSS("border-top-color", colors.accent);
  }
});

test("keeps Home carousel card motion explicit under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/web-site/");

  const card = page.locator("#featured-evidence [data-evidence-track] [data-surface]").first();
  await card.hover();
  await expect(card).toHaveCSS("transform", "none");
  expect(await card.evaluate((element) => getComputedStyle(element).transitionDuration.split(",").every((duration) => Number.parseFloat(duration) === 0))).toBe(true);
});

test("links only routable Home project titles without fake or nested anchors", async ({ page }) => {
  for (const home of ["/web-site/", "/web-site/en/"]) {
    await page.goto(home);
    const evidence = page.locator("#featured-evidence");
    const titleLinks = evidence.locator(".selected-work__title-link");
    const english = home.endsWith("/en/");

    await expect(titleLinks).toHaveCount(5);
    await expect(titleLinks.nth(0)).toHaveAttribute("href", english ? "/web-site/en/work/importador-db/" : "/web-site/work/importador-db/");
    await expect(titleLinks.nth(1)).toHaveAttribute("href", english ? "/web-site/en/work/cosecha-en-cope/" : "/web-site/work/cosecha-en-cope/");
    await expect(titleLinks.nth(2)).toHaveAttribute("href", english ? "/web-site/en/work/glea-nexo/" : "/web-site/work/glea-nexo/");
    await expect(titleLinks.nth(3)).toHaveAttribute("href", english ? "/web-site/en/production/aguilas-fc/" : "/web-site/production/aguilas-fc/");
    await expect(titleLinks.nth(4)).toHaveAttribute("href", english ? "/web-site/en/production/quinta-bella/" : "/web-site/production/quinta-bella/");
    await expect(evidence.locator('[data-evidence-category="production"] .selected-work__title-link')).toHaveCount(2);
    await expect(evidence.locator("a[href='#'], a[href='']")).toHaveCount(0);
    await expect(evidence.locator("a a, article a article")).toHaveCount(0);

    for (const title of ["La Ola Art Gallery"]) {
      const heading = evidence.getByRole("heading", { name: title, exact: true });
      expect(await heading.evaluate((element) => element.closest("a") === null)).toBe(true);
    }

    await titleLinks.first().focus();
    await expect(titleLinks.first()).toBeFocused();
    await expect(titleLinks.first()).toHaveCSS("outline-style", "solid");
    await expect(titleLinks.first()).not.toHaveCSS("color", "rgb(0, 0, 238)");
  }
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

test("aligns selected Production media breathing with selected Work", async ({ page }) => {
  for (const width of [320, 375, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/web-site/");

    const inset = async (category: "work" | "production") => page.locator(`[data-evidence-category="${category}"] [data-territory-media-slot]`).first().evaluate((element) => {
      const record = element.closest<HTMLElement>("[data-surface]")!.getBoundingClientRect();
      const media = element.getBoundingClientRect();
      return { left: media.left - record.left, right: record.right - media.right };
    });
    const [work, production] = await Promise.all([inset("work"), inset("production")]);

    expect(Math.abs(work.left - production.left)).toBeLessThanOrEqual(2);
    expect(Math.abs(work.right - production.right)).toBeLessThanOrEqual(2);
  }
});

test("keeps Work and Production carousel navigation bounded and independent", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/web-site/");

  const work = page.locator('[data-evidence-category="work"]');
  const production = page.locator('[data-evidence-category="production"]');
  const workTrack = work.locator("[data-evidence-track]");
  const productionTrack = production.locator("[data-evidence-track]");

   const previousWork = work.getByRole("button", { name: "Trabajo seleccionado anterior" });
   const nextWork = work.getByRole("button", { name: "Trabajo seleccionado siguiente" });
  const previousProduction = production.getByRole("button", { name: "Caso anterior" });
  const nextProduction = production.getByRole("button", { name: "Caso siguiente" });
  await expect(previousWork).toBeDisabled();
  await expect(nextWork).toBeEnabled();
   await expect(work.locator("[data-evidence-position]")).toHaveText("01 / 03");
  await expect(previousProduction).toBeDisabled();
  await expect(nextProduction).toBeEnabled();

  await nextWork.click();
  await expect.poll(() => workTrack.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await expect.poll(() => workTrack.evaluate((element) => Math.abs(element.scrollLeft - element.clientWidth) <= 1)).toBe(true);
   await expect(work.locator("[data-evidence-position]")).toHaveText("02 / 03");
   await expect(nextWork).toBeEnabled();
   await expect(previousWork).toBeEnabled();
   await expect(production.locator("[data-evidence-position]")).toHaveText("01 / 03");
    await nextWork.click();
    await expect.poll(() => workTrack.evaluate((element) => Math.abs(element.scrollLeft - element.clientWidth * 2) <= 1)).toBe(true);
   await expect(work.locator("[data-evidence-position]")).toHaveText("03 / 03");
   await expect(nextWork).toBeDisabled();
   await expect(previousWork).toBeEnabled();
    await previousWork.click();
    await expect.poll(() => workTrack.evaluate((element) => Math.abs(element.scrollLeft - element.clientWidth) <= 1)).toBe(true);
   await expect(work.locator("[data-evidence-position]")).toHaveText("02 / 03");
   await expect(previousWork).toBeEnabled();

  await nextProduction.click();
  await expect.poll(() => productionTrack.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await expect(production.locator("[data-evidence-position]")).toHaveText("02 / 03");
  await expect(nextProduction).toBeEnabled();
  await expect(previousProduction).toBeEnabled();
  await nextProduction.click();
  await expect(production.locator("[data-evidence-position]")).toHaveText("03 / 03");
  await expect(nextProduction).toBeDisabled();
  await previousProduction.click();
  await expect(production.locator("[data-evidence-position]")).toHaveText("02 / 03");
   await expect(work.locator("[data-evidence-position]")).toHaveText("02 / 03");
});

test("uses bounded native English carousel controls and hides only the scrollbar", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/web-site/en/");

  const work = page.locator('[data-evidence-category="work"]');
  const production = page.locator('[data-evidence-category="production"]');
  const track = production.locator("[data-evidence-track]");
   await expect(work.getByRole("button", { name: "Previous selected work" })).toBeDisabled();
   await expect(work.getByRole("button", { name: "Next selected work" })).toBeEnabled();
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
   await expect(positions).toHaveText(["01 / 03", "01 / 03"]);
   await page.waitForTimeout(500);
   await expect(positions).toHaveText(["01 / 03", "01 / 03"]);
});

test("keeps Production controls in its footer after its dossier body", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/web-site/");

  const production = page.locator('[data-evidence-category="production"]');
  const footer = production.locator("[data-evidence-footer]");
  const lastDossier = production.locator('[data-surface="dossier"]').last();
  await expect(footer).toContainText("01 / 03");
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

    const evidence = page.locator("#featured-evidence");
    await evidence.scrollIntoViewIfNeeded();
    await expect.poll(() => evidence.evaluate((element) => {
      const styles = getComputedStyle(element);
      const hasActiveMotion = element.getAnimations({ subtree: true })
        .some((animation) => animation.playState === "running" || animation.playState === "pending");
      return { opacity: styles.opacity, transform: styles.transform, hasActiveMotion };
    })).toEqual({ opacity: "1", transform: "none", hasActiveMotion: false });

    const before = await geometry();
    expect(Math.abs(before[0].footerTop - before[1].footerTop)).toBeLessThanOrEqual(2);
    for (const item of before) {
      expect(item.controlsAndCounterShareRow).toBe(true);
      expect(item.footerOverflow).toBe(false);
      expect(item.footerBeforeStageEnd).toBe(false);
      expect(item.activeClipped).toBe(false);
    }

    await page.locator('[data-evidence-category="work"] [data-evidence-next]').click();
    await expect(page.locator('[data-evidence-category="work"] [data-evidence-position]')).toHaveText("02 / 03");
    await expect(page.locator('[data-evidence-category="work"] [data-evidence-next]')).toBeEnabled();
    await expect(page.locator('[data-evidence-category="production"] [data-evidence-position]')).toHaveText("01 / 03");
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
