import { expect, test, type Page } from "@playwright/test";

async function fillValidContactForm(page: Page) {
  await page.getByLabel("Nombre*").fill("Rafael López");
  await page.getByLabel("Email*").fill("rafael@example.com");
  await page.getByLabel("Asunto").fill("Consulta");
  await page.getByLabel("Mensaje*").fill("Mensaje de prueba válido.");
}

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

test("preserves contact availability", async ({ page }) => {
  const response = await page.goto("/web-site/");
  const section = page.getByRole("region", { name: "Contacto" });

  expect(response?.ok()).toBe(true);
  await expect(section).toBeVisible();
  expect(
    await section.locator('a[href="mailto:rlp.murcia@gmail.com"]').count(),
  ).toBeGreaterThan(0);
  await expect(page.getByLabel("Nombre*")).toBeVisible();
  await expect(page.getByLabel("Email*")).toBeVisible();
  await expect(page.getByLabel("Asunto")).toBeVisible();
  await expect(page.getByLabel("Mensaje*")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Enviar mensaje" }),
  ).toBeVisible();
});

test("preserves local required-field and email validation", async ({ page }) => {
  let submissions = 0;
  await page.route("https://api.web3forms.com/submit", async (route) => {
    submissions += 1;
    await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
  });
  await page.goto("/web-site/");

  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(
    page.getByText("Completa los campos obligatorios.", { exact: true }),
  ).toBeVisible();

  await page.getByLabel("Nombre*").fill("Rafael López");
  await page.getByLabel("Email*").fill("email-invalido");
  await page.getByLabel("Mensaje*").fill("Mensaje de prueba válido.");
  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(
    page.getByText("Introduce un email válido.", { exact: true }),
  ).toBeVisible();
  expect(submissions).toBe(0);
});

test("preserves the captcha-before-submit gate", async ({ page }) => {
  let submissions = 0;
  await page.route("https://api.web3forms.com/submit", async (route) => {
    submissions += 1;
    await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
  });
  await page.goto("/web-site/");

  await fillValidContactForm(page);
  await page.getByRole("button", { name: "Enviar mensaje" }).click();

  await expect(
    page.getByText("Debes completar el captcha para continuar.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Completa el captcha antes de enviar el formulario.", {
      exact: true,
    }),
  ).toBeVisible();
  expect(submissions).toBe(0);
});

test("preserves successful local contact submission", async ({ page }) => {
  let submissions = 0;
  await page.route("https://api.web3forms.com/submit", async (route) => {
    submissions += 1;
    expect(route.request().method()).toBe("POST");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
  await page.goto("/web-site/");
  await page.locator("#contact-hcaptcha").evaluate((element) => {
    (element as any).reset = () => {};
  });

  await fillValidContactForm(page);
  await page.locator("#contact-form").evaluate((form) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "h-captcha-response";
    input.value = "playwright-captcha-token";
    form.appendChild(input);
  });
  await page.getByRole("button", { name: "Enviar mensaje" }).click();

  await expect(
    page.getByText("¡Mensaje enviado con éxito! Gracias por contactarme.", {
      exact: true,
    }),
  ).toBeVisible();
  expect(submissions).toBe(1);
  await expect(page.getByLabel("Nombre*")).toHaveValue("");
  await expect(
    page.getByRole("button", { name: "Enviar mensaje" }),
  ).toBeEnabled();
});

test("preserves failed contact submission recovery", async ({ page }) => {
  let submissions = 0;
  await page.route("https://api.web3forms.com/submit", async (route) => {
    submissions += 1;
    expect(route.request().method()).toBe("POST");
    await route.fulfill({ status: 500, body: "Provider unavailable" });
  });
  await page.goto("/web-site/");
  await page.locator("#contact-hcaptcha").evaluate((element) => {
    (element as any).reset = () => {};
  });

  await fillValidContactForm(page);
  await page.locator("#contact-form").evaluate((form) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "h-captcha-response";
    input.value = "playwright-captcha-token";
    form.appendChild(input);
  });
  await page.getByRole("button", { name: "Enviar mensaje" }).click();

  await expect(page.getByText(/No se pudo enviar\./)).toBeVisible();
  expect(submissions).toBe(1);
  await expect(
    page.getByRole("button", { name: "Enviar mensaje" }),
  ).toBeEnabled();
});
