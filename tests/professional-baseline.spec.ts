import { expect, test } from "@playwright/test";

const experience = [
  {
    role: "Desarrollador Fullstack y Técnico de Sistemas",
    company: "Leovinci Consulting S.L.",
    period: "2024 - Actualmente",
    summary:
      "Trabajo entre desarrollo web, automatización y soporte técnico en entorno de consultoría.",
  },
  {
    role: "Técnico en ruta",
    company: "Blázquez Liria S.L.",
    period: "2023 - 2024",
    summary:
      "Puesto centrado en soporte técnico y resolución de incidencias en cliente.",
  },
  {
    role: "Experiencia Transferible",
    company: "Otros cargos en Hostelería",
    period: "2004 - 2023",
    summary:
      "Antes de dedicarme al desarrollo trabajé años en atención al cliente, coordinación y gestión de equipos.",
  },
];

const education = [
  {
    degree:
      "Curso de especialización FP en Inteligencia Artificial y Big Data",
    institution: "iLERNA Online",
    period: "Cursando",
    summary: "Especialización orientada a ampliar base en datos e IA aplicada.",
  },
  {
    degree: "FP Grado Superior en Desarrollo de Aplicaciones Multiplataforma",
    institution: "IES Alfonso X El Sabio - Murcia (A distancia)",
    period: "2023 - 2025",
    marks: "Nota media: 7.93",
    summary:
      "La etapa donde consolidé la parte de programación y desarrollo de aplicaciones.",
  },
  {
    degree: "FP Grado Medio en Sistemas Microinformáticos y Redes",
    institution: "IES Europa - Águilas (Murcia)",
    period: "2021 - 2023",
    marks: "Nota media: 9.6 - Mención Honorífica",
    summary:
      "Formación que me dio base sólida en sistemas, redes y soporte técnico.",
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

test("preserves professional experience facts", async ({ page }) => {
  const response = await page.goto("/web-site/");
  const section = page.getByRole("region", { name: "Experiencia" });

  expect(response?.ok()).toBe(true);
  await expect(section).toBeVisible();

  for (const record of experience) {
    await expect(
      section.getByRole("heading", { name: record.role, exact: true }),
    ).toBeVisible();
    await expect(section.getByText(record.company, { exact: true })).toBeVisible();
    await expect(section.getByText(record.period, { exact: true })).toBeVisible();
    await expect(section.getByText(record.summary, { exact: true })).toBeVisible();
  }
});

test("preserves education facts", async ({ page }) => {
  const response = await page.goto("/web-site/");
  const section = page.getByRole("region", { name: "Formación" });

  expect(response?.ok()).toBe(true);
  await expect(section).toBeVisible();

  for (const record of education) {
    await expect(
      section.getByRole("heading", { name: record.degree, exact: true }),
    ).toBeVisible();
    await expect(
      section.getByText(record.institution, { exact: true }),
    ).toBeVisible();
    await expect(section.getByText(record.period, { exact: true })).toBeVisible();
    await expect(section.getByText(record.summary, { exact: true })).toBeVisible();

    if (record.marks) {
      await expect(section.getByText(record.marks, { exact: true })).toBeVisible();
    }
  }
});
