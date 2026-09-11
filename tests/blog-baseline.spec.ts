import { expect, test } from "@playwright/test";

const articles = [
  {
    slug: "desarrollo-importador-db",
    title: "ImportadorDB: documentando una herramienta real para pasar de Excel a SQL",
    deepHeading:
      "El problema: los datos no llegan con un esquema perfecto",
    coverAlt:
      "Captura de ImportadorDB con selección de MySQL, opciones de importación y datos de demostración",
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

    if (url.hostname === "127.0.0.1") {
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

test("keeps the ImportadorDB article connected to its case route without overstated stack claims", async ({ page }) => {
  await page.goto("/web-site/blog/desarrollo-importador-db/");

  const article = page.getByRole("article");
  await expect(article.getByRole("link", { name: "Ver el caso de ImportadorDB →", exact: true })).toHaveAttribute("href", "/web-site/work/importador-db/");
  await expect(article).toContainText("Diseñé y desarrollé la aplicación desde cero.");
  await expect(article).not.toContainText("agente de IA");
  await expect(article).not.toContainText("AI agent");
  await expect(article).not.toContainText("GPT");
  await expect(article).not.toContainText("Copilot");
  await expect(article).not.toContainText("generative");
  await expect(article).not.toContainText("Java 25");
  await expect(article).not.toContainText("AES-256");
  await expect(article).not.toContainText("SXSSFWorkbook");
});
