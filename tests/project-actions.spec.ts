import { expect, test } from "@playwright/test";

const pages = [
  "/web-site/",
  "/web-site/en/",
  "/web-site/work/",
  "/web-site/en/work/",
  "/web-site/production/",
  "/web-site/en/production/",
  "/web-site/work/importador-db/",
  "/web-site/en/work/importador-db/",
  "/web-site/work/cosecha-en-cope/",
  "/web-site/en/work/cosecha-en-cope/",
  "/web-site/work/glea-nexo/",
  "/web-site/en/work/glea-nexo/",
  "/web-site/production/aguilas-fc/",
  "/web-site/en/production/aguilas-fc/",
  "/web-site/production/la-ola-art-gallery/",
  "/web-site/en/production/la-ola-art-gallery/",
  "/web-site/production/quinta-bella/",
  "/web-site/en/production/quinta-bella/",
  "/web-site/production/fincas-victoria/",
  "/web-site/en/production/fincas-victoria/",
  "/web-site/experience/",
  "/web-site/en/experience/",
] as const;

const selector = [
  ".territory-index__record a.action",
  "#featured-evidence a.action",
  ".case__actions a",
  ".production-case__actions a",
  ".career-record__links a",
].join(", ");

test("marks internal actions with → and external actions with ↗", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    const links = await page.locator(selector).evaluateAll((elements) => elements.map((element) => ({
      text: element.textContent?.trim() ?? "",
      href: element.getAttribute("href") ?? "",
      target: element.getAttribute("target"),
      rel: element.getAttribute("rel"),
    })));

    expect(links.length, path).toBeGreaterThan(0);
    for (const link of links) {
      if (link.href.startsWith("http")) {
        expect(link.text, `${path} ${link.href}`).toMatch(/↗$/);
        expect(link.target, `${path} ${link.href}`).toBe("_blank");
        expect(link.rel, `${path} ${link.href}`).toBe("noopener noreferrer");
      } else {
        expect(link.text, `${path} ${link.href}`).toMatch(/→$/);
        expect(link.text, `${path} ${link.href}`).not.toContain("↗");
        expect(link.target, `${path} ${link.href}`).toBeNull();
      }
    }
  }
});

test("names every live-site and code action with the shared verbs", async ({ page }) => {
  for (const { path, labels } of [
    { path: "/web-site/work/importador-db/", labels: ["Ver código ↗", "Leer artículo →"] },
    { path: "/web-site/en/work/importador-db/", labels: ["View code ↗", "Read article (Spanish) →"] },
    { path: "/web-site/work/glea-nexo/", labels: ["Ver código ↗", "Ver prueba: recorrido completo ↗", "Ver prueba: reenvío sin conexión ↗", "Ver prueba: duplicados ↗"] },
    { path: "/web-site/en/work/glea-nexo/", labels: ["View code ↗", "View proof: full journey ↗", "View proof: offline resend ↗", "View proof: duplicates ↗"] },
    { path: "/web-site/production/quinta-bella/", labels: ["Visitar Quinta Bella ↗"] },
    { path: "/web-site/en/production/quinta-bella/", labels: ["Visit Quinta Bella ↗"] },
  ]) {
    await page.goto(path);
    await expect(page.locator(".case__actions a, .production-case__actions a")).toHaveText(labels);
  }
});
