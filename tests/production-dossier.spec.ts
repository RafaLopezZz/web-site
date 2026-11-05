import { expect, test } from "@playwright/test";
import { technicalBackgroundLayer } from "./helpers/technical-background";

const routes = [
  {
    path: "/web-site/production/quinta-bella/",
    title: "Quinta Bella",
    headings: ["Qué es", "El reto", "Mi papel", "Resultado", "Lo que aprendí", "Detalles técnicos"],
    source: "Visitar Quinta Bella ↗",
    href: "https://www.quintabella.com/",
  },
  {
    path: "/web-site/en/production/quinta-bella/",
    title: "Quinta Bella",
    headings: ["What it is", "The challenge", "My role", "Outcome", "What I learned", "Technical details"],
    source: "Visit Quinta Bella ↗",
    href: "https://www.quintabella.com/",
  },
] as const;

const prohibited = ["customers", "client data", "revenue", "conversion", "HeroSlideResolverTest", "Repositorio público", "Public repository", "Livewire"];

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
      headings: ["Qué es", "El reto", "Mi papel", "Resultado", "Lo que aprendí", "Detalles técnicos"],
      liveLabel: "Visitar Águilas FC ↗",
      authorship: "Desarrollé la nueva web.",
    },
    {
      path: "/web-site/en/production/aguilas-fc/",
      headings: ["What it is", "The challenge", "My role", "Outcome", "What I learned", "Technical details"],
      liveLabel: "Visit Águilas FC ↗",
      authorship: "I developed the new website.",
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
    await expect(liveLink).toHaveAttribute("href", "https://www.aguilasfc.es/");
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

test("states La Ola Art Gallery facts with its live site action", async ({ page }) => {
  for (const route of [
    { path: "/web-site/production/la-ola-art-gallery/", headings: ["Qué es", "El reto", "Mi papel", "Resultado", "Lo que aprendí", "Detalles técnicos"], live: "Visitar La Ola Art Gallery ↗", role: "Desarrollé la web, la tienda, las reservas y el pago." },
    { path: "/web-site/en/production/la-ola-art-gallery/", headings: ["What it is", "The challenge", "My role", "Outcome", "What I learned", "Technical details"], live: "Visit La Ola Art Gallery ↗", role: "I developed the website, shop, bookings, and payment." },
  ]) {
    await page.goto(route.path);
    const dossier = page.locator('[data-production-case="la-ola-art-gallery"][data-surface="dossier"]');
    expect(await dossier.locator("h2").allTextContents()).toEqual(route.headings);
    await expect(dossier.getByRole("heading", { name: "La Ola Art Gallery", exact: true })).toBeVisible();
    await expect(dossier).toContainText("RLP / PROD / 002");
    await expect(dossier).toContainText(route.role);
    const live = dossier.getByRole("link", { name: route.live, exact: true });
    await expect(live).toHaveAttribute("href", "https://www.laolaart.com/");
    await expect(live).toHaveAttribute("target", "_blank");
    await expect(dossier.locator("a[href*='github.com']")).toHaveCount(0);
  }
});

test("presents Fincas Victoria as a production case without a CMS or code claim", async ({ page }) => {
  for (const route of [
    { path: "/web-site/production/fincas-victoria/", headings: ["Qué es", "El reto", "Mi papel", "Resultado", "Lo que aprendí", "Detalles técnicos"], live: "Visitar Fincas Victoria ↗", role: "Desarrollé toda la web, incluida la importación de inmuebles." },
    { path: "/web-site/en/production/fincas-victoria/", headings: ["What it is", "The challenge", "My role", "Outcome", "What I learned", "Technical details"], live: "Visit Fincas Victoria ↗", role: "I developed the whole website, including the property import." },
  ]) {
    await page.goto(route.path);
    const dossier = page.locator('[data-production-case="fincas-victoria"][data-surface="dossier"]');
    expect(await dossier.locator("h2").allTextContents()).toEqual(route.headings);
    await expect(dossier).toContainText("RLP / PROD / 004");
    await expect(dossier).toContainText("PHP 8.3 · MariaDB · XML Kyero");
    await expect(dossier).toContainText(route.role);
    await expect(dossier).not.toContainText(/CMS|Laravel|gestor de contenidos|content manager/);
    const live = dossier.getByRole("link", { name: route.live, exact: true });
    await expect(live).toHaveAttribute("href", "https://www.victoriafincas.es/");
    await expect(live).toHaveAttribute("target", "_blank");
    await expect(dossier.locator("a[href*='github.com']")).toHaveCount(0);
  }
});

test("states that Quinta Bella does not charge online yet", async ({ page }) => {
  await page.goto("/web-site/production/quinta-bella/");
  await expect(page.locator('[data-production-case="quinta-bella"]')).toContainText("El cobro online todavía no está activo.");
  await page.goto("/web-site/en/production/quinta-bella/");
  await expect(page.locator('[data-production-case="quinta-bella"]')).toContainText("Online payment is not active yet.");
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
    const layer = await technicalBackgroundLayer(shell);
    expect(layer.backgroundImage).toMatch(/linear-gradient/);
    expect(layer.backgroundSize).toMatch(/64px 64px/);
    expect(layer.animationName).toBe("technical-background-drift");
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
