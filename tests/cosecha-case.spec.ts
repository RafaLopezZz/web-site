import { expect, test, type Locator } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const root = "/web-site";
const repositoryRoot = resolve(import.meta.dirname, "..");
const authorityPacket = "docs/audit-packet-authority/CosechaEnCope_Authority_Packet_Audit.md";

const locales = [
  {
    casePath: `${root}/work/cosecha-en-cope/`,
    indexPath: `${root}/work/`,
    context: "Qué es",
    role: "Diseñé y desarrollé Cosecha en Cope desde cero.",
    hybrid: ["Thymeleaf", "páginas públicas", "/app"],
    orders: "órdenes específicas por productor",
    s3: "AWS S3",
    manualS3: ["validé manualmente", "operaciones reales", "subida", "borrado"],
    articleLink: "Artículo técnico · ES →",
    articleCaseLink: "Ver el caso de Cosecha en Cope →",
    altCover: "Portada del proyecto Cosecha en Cope, un marketplace agrícola",
    altArchitecture: "Arquitectura híbrida de Cosecha en Cope",
  },
  {
    casePath: `${root}/en/work/cosecha-en-cope/`,
    indexPath: `${root}/en/work/`,
    context: "What it is",
    role: "I designed and developed Cosecha en Cope from scratch.",
    hybrid: ["Thymeleaf", "public pages", "/app"],
    orders: "producer-specific sales orders",
    s3: "AWS S3",
    manualS3: ["manually validated", "real upload", "delete"],
    articleLink: "Technical article · ES →",
    articleCaseLink: "Ver el caso de Cosecha en Cope →",
    altCover: "Cosecha en Cope project cover, an agricultural marketplace",
    altArchitecture: "Cosecha en Cope hybrid architecture",
  },
] as const;

const forbiddenPublicClaims = [
  /distribuidor|distributor/i,
  /despliegue|deployed|deployment|production/i,
  /seo|indexación|search ranking|scalab|escalab/i,
  /métricas|metrics|kpi|usuarios|users|sales (?:growth|impact|increased)|ventas (?:y|o|del|de)/i,
  /nota\s*6|grade\s*6|calificación|live demo|demo incident|incidente.*demo/i,
  /gpt[- ]?3|copilot|openai|ai assistance|asistencia.*ia|\bIA\b/i,
  /(?:es|is)\s+(?:una|a|an)?\s*(?:aplicaci[oó]n\s+(?:segura|protegida)|(?:secure|safe)\s+(?:application|app)|(?:aplicaci[oó]n|application)\s+con\s+(?:seguridad|security)\s+(?:robusta|fuerte|robust|strong))/i,
  /(?:cuenta\s+con|tiene|incluye|has|provides|includes)\s+(?:una\s+)?(?:autorizaci[oó]n|seguridad)\s+(?:robusta|fuerte|completa|total)|(?:has|provides|includes)\s+(?:robust|strong|complete|full)\s+(?:role\s+)?(?:authorization|security)/i,
];

const expectApprovedSurface = async (surface: Locator) => {
  for (const claim of forbiddenPublicClaims) await expect(surface).not.toContainText(claim);
};

test("keeps the Cosecha case structure aligned across ES and EN", async ({ page }) => {
  const structures = [];

  for (const locale of locales) {
    await page.goto(locale.casePath);
    const caseStudy = page.locator('[data-cosecha-case][data-surface="artifact"]');
    structures.push(await caseStudy.evaluate((root) => ({
      sections: Array.from(root.querySelectorAll("section"), (section) => ({
        headings: section.querySelectorAll(":scope > h2").length,
        paragraphs: section.querySelectorAll(":scope > p").length,
      })),
      media: root.querySelectorAll(".case__media > figure").length,
      actions: root.querySelectorAll(".case__actions > a").length,
    })));
  }

  expect(structures[0]).toEqual(structures[1]);
});

test("keeps both Cosecha records on the bilingual Work indexes", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(locale.indexPath);
    const index = page.locator('[data-territory-index="work"]');
    const record = index.locator(".territory-index__record", { hasText: "Cosecha en Cope" });

    await expect(record.getByRole("heading", { name: "Cosecha en Cope", exact: true })).toBeVisible();
    await expect(record.getByRole("link", { name: /caso|case/ })).toHaveAttribute("href", locale.casePath);
    await expectApprovedSurface(record);
  }
});

test("renders the approved first-person Cosecha meaning in ES and EN", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(locale.casePath);
    const caseStudy = page.locator('[data-cosecha-case][data-surface="artifact"]');

    await expect(caseStudy.getByRole("heading", { name: "Cosecha en Cope", exact: true })).toBeVisible();
    await expect(caseStudy.getByRole("heading", { name: locale.context, exact: true })).toBeVisible();
    await expect(caseStudy).toContainText(locale.role);
    await expect(caseStudy).toContainText("Java 17");
    await expect(caseStudy).toContainText("Spring Boot 3.5.2");
    await expect(caseStudy).toContainText("JPA/Hibernate");
    await expect(caseStudy).toContainText("PostgreSQL");
    await expect(caseStudy).toContainText("Angular 20");
    for (const concept of locale.hybrid) await expect(caseStudy).toContainText(concept);
    await expect(caseStudy).toContainText(locale.orders);
    await expect(caseStudy).toContainText(locale.s3);
    for (const concept of locale.manualS3) await expect(caseStudy).toContainText(concept);
    await expect(caseStudy).toContainText("JWT");
    await expectApprovedSurface(caseStudy);
  }
});

test("keeps Cosecha detail and article routes reciprocal", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(locale.casePath);
    const caseStudy = page.locator('[data-cosecha-case][data-surface="artifact"]');
    await expect(caseStudy.getByRole("link", { name: locale.articleLink, exact: true })).toHaveAttribute(
      "href",
      `${root}/blog/desarrollo-cosecha-en-cope/`,
    );

    await page.goto(`${root}/blog/desarrollo-cosecha-en-cope/`);
    const article = page.getByRole("article");
    await expect(article.getByRole("link", { name: locale.articleCaseLink, exact: true })).toHaveAttribute(
      "href",
      `${root}/work/cosecha-en-cope/`,
    );
    await expectApprovedSurface(article);
  }
});

test("renders only the approved Cosecha media with accessible alternatives", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(locale.casePath);
    const caseStudy = page.locator('[data-cosecha-case][data-surface="artifact"]');
    await expect(caseStudy.locator("img")).toHaveCount(2);
    await expect(caseStudy.getByAltText(locale.altCover, { exact: true })).toBeVisible();
    await expect(caseStudy.getByAltText(locale.altArchitecture, { exact: true })).toBeVisible();

    await page.goto(`${root}/blog/desarrollo-cosecha-en-cope/`);
    const article = page.getByRole("article");
    await expect(article.locator("img")).toHaveCount(2);
    await expect(article.locator("img[alt]")).toHaveCount(2);
    expect(await article.locator("img").evaluateAll((images) => images.every((image) => image.alt.trim().length > 0))).toBe(true);
  }
});

test("keeps every public Cosecha surface inside the authority boundary", async ({ page }) => {
  for (const path of [
    `${root}/work/`,
    `${root}/en/work/`,
    `${root}/work/cosecha-en-cope/`,
    `${root}/en/work/cosecha-en-cope/`,
    `${root}/blog/desarrollo-cosecha-en-cope/`,
  ]) {
    await page.goto(path);
    await expectApprovedSurface(path.includes("blog/") ? page.getByRole("article") : page.locator("main"));
  }
});

test("leaves the Cosecha authority packet untouched", () => {
  expect(() => execFileSync("git", ["diff", "--quiet", "--", authorityPacket], {
    cwd: repositoryRoot,
    stdio: "ignore",
  })).not.toThrow();
});
