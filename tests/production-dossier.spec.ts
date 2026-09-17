import { expect, test } from "@playwright/test";

const routes = [
  {
    path: "/web-site/production/quinta-bella/",
    title: "Quinta Bella",
    headings: ["Contexto", "Reto", "Ingeniería", "Resultado", "Aprendizaje", "Hablemos", "Evidencia"],
    source: "Sitio público ↗",
    href: "https://quintabella.com/",
  },
  {
    path: "/web-site/en/production/quinta-bella/",
    title: "Quinta Bella",
    headings: ["Context", "Challenge", "Engineering", "Outcome", "Learning", "Discuss", "Evidence"],
    source: "Public site ↗",
    href: "https://quintabella.com/",
  },
] as const;

const prohibited = ["customers", "client data", "Redsys", "revenue", "conversion", "HeroSlideResolverTest"];

test("documents Quinta Bella with verified sources and the required reading order", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path);

    const dossier = page.locator('[data-production-case="quinta-bella"][data-surface="dossier"]');
    await expect(dossier.getByRole("heading", { name: route.title, exact: true })).toBeVisible();
    expect(await dossier.locator("h2").allTextContents()).toEqual(route.headings);
    const publicSite = dossier.getByRole("link", { name: route.source, exact: true });
    await expect(publicSite).toHaveAttribute("href", route.href);
    await expect(publicSite).toHaveAttribute("target", "_blank");
    await expect(publicSite).toHaveAttribute("rel", "noopener noreferrer");
    await expect(dossier.locator(".production-case__actions a")).toHaveCount(1);
    await expect(dossier.locator("a[href*='github.com']")).toHaveCount(0);
    await expect(dossier.locator("video, iframe")).toHaveCount(0);
    for (const claim of prohibited) await expect(dossier).not.toContainText(claim);
  }
});

test("documents the Águilas FC HeroSlideResolver case without unsupported claims", async ({ page }) => {
  const routes = [
    {
      path: "/web-site/production/aguilas-fc/",
      headings: ["Contexto", "Problema real", "Decisión técnica", "Implementación y resultado", "Pruebas", "Trade-off de ingeniería", "Evidencia pública"],
      liveLabel: "Abrir Águilas FC ↗",
      authorship: "Diseñé e implementé",
    },
    {
      path: "/web-site/en/production/aguilas-fc/",
      headings: ["Context", "Real problem", "Technical decision", "Implementation and result", "Tests", "Engineering trade-off", "Public evidence"],
      liveLabel: "Open Águilas FC ↗",
      authorship: "I designed and implemented",
    },
  ] as const;

  for (const route of routes) {
    await page.goto(route.path);

    const dossier = page.locator('[data-production-case="aguilas-fc"][data-surface="dossier"]');
    await expect(dossier.getByRole("heading", { name: "Águilas FC", exact: true })).toBeVisible();
    expect(await dossier.locator("h2").allTextContents()).toEqual(route.headings);
    await expect(dossier).toContainText("HeroSlideResolver");
    await expect(dossier).toContainText("HeroSlideViewData");
    await expect(dossier).toContainText(route.authorship);

    const liveLink = dossier.getByRole("link", { name: route.liveLabel, exact: true });
    await expect(liveLink).toHaveAttribute("href", "https://aguilasfc.es/");
    await expect(liveLink).toHaveAttribute("target", "_blank");
    await expect(liveLink).toHaveAttribute("rel", "noopener noreferrer");
    await expect(dossier.locator(".production-case__actions a")).toHaveCount(1);
    await expect(dossier.locator("a[href*='github.com']")).toHaveCount(0);

    for (const claim of ["Clean Architecture", "DDD", "CQRS", "N+1", "incident", "outage", "customer complaint", "artificial intelligence", "inteligencia artificial"]) {
      await expect(dossier).not.toContainText(claim);
    }
    await expect(dossier).not.toContainText(/\b\d+(?:\.\d+)?\s?(?:ms|%)\b/i);
  }
});

test("keeps source actions responsive, themed, and keyboard reachable", async ({ page }) => {
  for (const route of routes) {
    for (const theme of ["light", "dark"]) {
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route.path);
        await page.locator("html").evaluate((element, value) => {
          element.dataset.theme = value;
          element.style.colorScheme = value;
        }, theme);

        const dossier = page.locator('[data-production-case="quinta-bella"]');
        await expect(page.locator("html")).toHaveJSProperty("scrollWidth", width);
        await dossier.getByRole("link", { name: route.source, exact: true }).focus();
        await expect(dossier.getByRole("link", { name: route.source, exact: true })).toBeFocused();
      }
    }
  }
});

test("keeps Production detail shells on the shared technical background", async ({ page }) => {
  for (const path of [
    "/web-site/production/quinta-bella/",
    "/web-site/en/production/quinta-bella/",
    "/web-site/production/aguilas-fc/",
    "/web-site/en/production/aguilas-fc/",
  ]) {
    await page.goto(path);
    const shell = page.locator("main.production-case-shell");
    await expect(shell).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(shell).toHaveCSS("background-image", /linear-gradient/);
    await expect(shell).toHaveCSS("background-size", /64px 64px/);
    await expect(shell).toHaveCSS("animation-name", "technical-background-drift");
  }
});

test("places a focused locale-correct Production backlink before dossier identity", async ({ page }) => {
  for (const route of [
    { path: "/web-site/production/quinta-bella/", href: "/web-site/production/", label: "← Volver a Producción" },
    { path: "/web-site/en/production/quinta-bella/", href: "/web-site/en/production/", label: "← Back to Production" },
  ]) {
    await page.goto(route.path);
    const dossier = page.locator('[data-production-case="quinta-bella"]');
    const backlink = dossier.locator(":scope > .case-back-link");

    await expect(backlink).toHaveCount(1);
    await expect(backlink).toHaveText(route.label);
    await expect(backlink).toHaveAttribute("href", route.href);
    await expect(dossier.locator("a a")).toHaveCount(0);
    expect(await backlink.evaluate((element) => {
      const heading = element.parentElement?.querySelector("h1");
      return Boolean(heading && (element.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING));
    })).toBe(true);

    await backlink.focus();
    await expect(backlink).toBeFocused();
    await expect(backlink).toHaveCSS("outline-style", "solid");
  }
});
