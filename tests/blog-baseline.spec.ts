import { expect, test } from "@playwright/test";

const articles = [
  {
    slug: "desarrollo-importador-db",
    title: "ImportadorDB: documentando una herramienta real para pasar de Excel a SQL",
    deepHeading:
      "El problema real: Excel sigue estando en medio de muchos flujos de trabajo",
    coverAlt:
      "Portada del proyecto ImportadorDB, una herramienta para importar datos de Excel a SQL",
  },
  {
    slug: "desarrollo-cosecha-en-cope",
    title: "Cosecha en Cope: Documentando el proceso",
    deepHeading:
      "La decisión más importante: una arquitectura híbrida SSR + SPA",
    coverAlt: "Portada del proyecto Cosecha en Cope, un marketplace agrícola",
    additionalImageAlt: "Arquitectura híbrida de Cosecha en Cope",
  },
  {
    slug: "historia-transición",
    title:
      "De la hostelería a la tecnología: Historia de una transición profesional",
    deepHeading:
      "Volver a estudiar con 34 años: el inicio de mi cambio profesional",
    coverAlt:
      "Portada del artículo sobre transición profesional de la hostelería a la informática",
    additionalImageAlt:
      "Proceso de cambio profesional y aprendizaje en informática",
  },
];

test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\//, async (route) => {
    const url = new URL(route.request().url());

    if (url.hostname === "127.0.0.1" && url.port === "4321") {
      await route.continue();
      return;
    }

    await route.abort();
  });
});

test("preserves the local blog index semantic baseline", async ({ page }) => {
  const response = await page.goto("/web-site/blog/");

  expect(response?.ok()).toBe(true);
  await expect(page.title()).resolves.toContain("Rafael López");

  for (const article of articles) {
    await expect(
      page.locator(`a[href="/web-site/blog/${article.slug}/"]`),
    ).not.toHaveCount(0);
  }
});

for (const article of articles) {
  test(`preserves ${article.slug} article content`, async ({ page }) => {
    const response = await page.goto(`/web-site/blog/${article.slug}/`);

    expect(response?.ok()).toBe(true);
    await expect(
      page.getByRole("heading", { level: 1, name: article.title }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: article.deepHeading }),
    ).toBeVisible();
    await expect(page.getByAltText(article.coverAlt)).toBeVisible();

    if (article.additionalImageAlt) {
      await expect(page.getByAltText(article.additionalImageAlt)).toBeVisible();
    }

    await expect(page.getByRole("article")).toContainText(article.deepHeading);
    expect((await page.getByRole("article").innerText()).length).toBeGreaterThan(
      1000,
    );
  });
}
