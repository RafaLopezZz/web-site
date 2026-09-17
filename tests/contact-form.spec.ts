import { expect, test } from "@playwright/test";

const routes = [
  {
    path: "/web-site/contact/",
    lang: "es",
    heading: "Contacto",
    intro: "Si quieres hablar sobre software, proyectos, automatización o alguna idea en la que pueda ayudar, estaré encantado de leerte.",
    contextTitle: "Hablemos",
    context: "¿Tienes un proyecto, una idea o una pregunta? Escríbeme y cuéntame un poco. No hace falta preparar nada especial.",
    directTitle: "También puedes encontrarme aquí",
    directCopy: "Si prefieres escribirme directamente o conectar por otra vía:",
    formTitle: "Escríbeme",
    formIntro: "Cuéntame lo que necesites.",
    labels: ["Nombre", "Email", "Asunto", "Mensaje"],
    footerLink: "Contacto",
    mainNavLink: "Contacto",
    navHref: "/web-site/contact/",
  },
  {
    path: "/web-site/en/contact/",
    lang: "en",
    heading: "Contact",
    intro: "If you want to talk about software, projects, automation, or an idea I could contribute to, I would be glad to hear from you.",
    contextTitle: "Let's talk",
    context: "Do you have a project, an idea, or a question? Write to me and tell me a little about it. No special preparation is needed.",
    directTitle: "You can also find me here",
    directCopy: "If you prefer to write directly or connect another way:",
    formTitle: "Write to me",
    formIntro: "Tell me what you need.",
    labels: ["Name", "Email", "Subject", "Message"],
    footerLink: "Contact",
    mainNavLink: "Contact",
    navHref: "/web-site/en/contact/",
  },
] as const;

const validValues = {
  es: {
    name: "Ada Lovelace",
    email: "ada@example.com",
    subject: "A concrete question",
    message: "I would like to discuss a backend project.",
  },
  en: {
    name: "Ada Lovelace",
    email: "ada@example.com",
    subject: "A concrete question",
    message: "I would like to discuss a backend project.",
  },
} as const;

async function fillContactForm(page: import("@playwright/test").Page, locale: "es" | "en") {
  const values = validValues[locale];
  await page.getByLabel(locale === "en" ? "Name" : "Nombre", { exact: true }).fill(values.name);
  await page.getByLabel("Email", { exact: true }).fill(values.email);
  await page.getByLabel(locale === "en" ? "Subject" : "Asunto", { exact: true }).fill(values.subject);
  await page.getByLabel(locale === "en" ? "Message" : "Mensaje", { exact: true }).fill(values.message);
}

async function verifyCaptcha(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    const captcha = document.querySelector<HTMLElement>("#contact-hcaptcha");
    if (!captcha) throw new Error("CAPTCHA seam target is missing");
    captcha.dispatchEvent(new CustomEvent("verified", {
      detail: { token: "deterministic-captcha-token" },
    }));
  });
}

async function isolateExternalCaptcha(page: import("@playwright/test").Page) {
  await page.route(/https:\/\/(?:js|newassets)\.hcaptcha\.com\//, (route) => route.abort());
}

async function installDeterministicCaptcha(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    const captcha = document.querySelector<HTMLElement>("#contact-hcaptcha");
    if (!captcha) throw new Error("CAPTCHA seam target is missing");
    Object.defineProperty(captcha, "reset", { configurable: true, value: () => undefined });
  });
}

test.describe("U11 Contact", () => {
  test("ships real bilingual routes with equivalent labels and truthful primary navigation", async ({ page }) => {
    await isolateExternalCaptcha(page);
    for (const route of routes) {
      const response = await page.goto(route.path);

      expect(response?.ok()).toBe(true);
      await installDeterministicCaptcha(page);
      await expect(page.locator("html")).toHaveAttribute("lang", route.lang);
      await expect(page.getByRole("heading", { name: route.heading, exact: true })).toBeVisible();
      for (const label of route.labels) {
        await expect(page.getByLabel(label, { exact: true })).toBeVisible();
      }
      await expect(page.locator("#contact-form")).toHaveAttribute("data-contact-state", "IDLE");
      await expect(page.locator("#contact-form")).toHaveAttribute("aria-busy", "false");
      await expect(page.locator("#site-navigation").getByRole("link", { name: route.mainNavLink, exact: true })).toHaveCount(1);
      await expect(page.locator("#site-navigation").getByRole("link", { name: route.mainNavLink, exact: true })).toHaveAttribute("href", route.navHref);
      await expect(page.locator("footer").getByRole("link", { name: route.footerLink, exact: true })).toHaveAttribute(
        "href",
        route.path,
      );
      await expect(page.locator("body")).not.toContainText("playwright-web3forms-key");
      await expect(page.locator("body")).not.toContainText("playwright-hcaptcha-sitekey");
    }
  });

  test("uses the approved editorial Contact copy without CRM or filtering language", async ({ page }) => {
    for (const route of routes) {
      await page.goto(route.path);

      await expect(page.locator(".contact-page__header h1")).toHaveText(route.heading);
      await expect(page.locator(".contact-page__header > p:last-child")).toHaveText(route.intro);
      await expect(page.locator(".contact-page__context h2")).toHaveText(route.contextTitle);
      await expect(page.locator(".contact-page__context > p").first()).toHaveText(route.context);
      await expect(page.locator(".contact-page__direct > p").first()).toHaveText(route.directTitle);
      await expect(page.locator(".contact-page__direct > p").last()).toContainText(route.directCopy);
      await expect(page.locator(".contact-surface__heading h2")).toHaveText(route.formTitle);
      await expect(page.locator(".contact-surface__heading > p:last-child")).toHaveText(route.formIntro);
      await expect(page.locator("main.contact-shell")).not.toContainText(/CRM|workflow|context|contexto|filter|filtro|starting point|punto de partida|four fields|cuatro campos/i);
    }
  });

  test("uses the shared technical background motion contract", async ({ page }) => {
    await page.goto(routes[0].path);

    const contact = page.locator("main.contact-shell");
    await expect(contact).toHaveCSS("background-size", /64px 64px/);
    await expect(contact).toHaveCSS("animation-name", "technical-background-drift");
    await expect(contact).toHaveCSS("animation-duration", "12s");
    await expect(contact).toHaveCSS("animation-timing-function", "linear");
    await expect(contact).toHaveCSS("animation-iteration-count", "infinite");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await expect(contact).toHaveCSS("animation-name", "none");
  });

  test("reports associated validation errors, preserves values, and does not submit invalid data", async ({ page }) => {
    await isolateExternalCaptcha(page);
    let requests = 0;
    await page.route("https://api.web3forms.com/submit", async (route) => {
      requests += 1;
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
    });
    await page.goto(routes[0].path);
    await installDeterministicCaptcha(page);

    await page.getByLabel("Nombre", { exact: true }).fill("Ada");
    await page.getByLabel("Email", { exact: true }).fill("not-an-email");
    await page.getByLabel("Mensaje", { exact: true }).fill("A message");
    await page.getByRole("button", { name: "Enviar mensaje", exact: true }).click();

    await expect(page.locator("#contact-form")).toHaveAttribute("data-contact-state", "ERROR");
    await expect(page.locator("#contact-form")).toHaveAttribute("aria-busy", "false");
    await expect(page.getByLabel("Email", { exact: true })).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel("Email", { exact: true })).toHaveAttribute("aria-describedby", "email-error");
    await expect(page.locator("#email-error")).toHaveText("Introduce un email válido.");
    await expect(page.getByLabel("Email", { exact: true })).toBeFocused();
    await expect(page.getByLabel("Nombre", { exact: true })).toHaveValue("Ada");
    await expect(page.getByLabel("Mensaje", { exact: true })).toHaveValue("A message");
    expect(requests).toBe(0);
  });

  test("exposes deterministic CAPTCHA and transport error recovery without a stuck busy state", async ({ page }) => {
    await isolateExternalCaptcha(page);
    await page.goto(routes[1].path);
    await installDeterministicCaptcha(page);
    await fillContactForm(page, "en");
    await page.getByRole("button", { name: "Send message", exact: true }).click();

    await expect(page.locator("#contact-form")).toHaveAttribute("data-contact-state", "ERROR");
    await expect(page.locator("#contact-captcha-error")).toHaveText("Complete the CAPTCHA before sending the form.");
    await expect(page.getByLabel("Name", { exact: true })).toHaveValue(validValues.en.name);

    await page.locator("#contact-hcaptcha").dispatchEvent("error");
    await expect(page.locator("#contact-form")).toHaveAttribute("data-contact-state", "ERROR");
    await expect(page.locator("#contact-captcha-error")).toHaveText("CAPTCHA validation failed. Try again.");

    await page.route("https://api.web3forms.com/submit", async (route) => {
      await route.fulfill({ status: 503, contentType: "application/json", body: "service unavailable" });
    });
    await page.getByRole("button", { name: "Try again", exact: true }).click();
    await expect(page.locator("#contact-form")).toHaveAttribute("data-contact-state", "CAPTCHA");
    await expect(page.locator("#contact-form")).toHaveAttribute("aria-busy", "true");
    await verifyCaptcha(page);
    await page.getByRole("button", { name: "Send message", exact: true }).click();

    await expect(page.locator("#contact-form")).toHaveAttribute("data-contact-state", "ERROR");
    await expect(page.locator("#contact-form")).toHaveAttribute("aria-busy", "false");
    await expect(page.getByRole("button", { name: "Try again", exact: true })).toBeVisible();
    await expect(page.getByLabel("Message", { exact: true })).toHaveValue(validValues.en.message);
  });

  test("prevents duplicate submissions while busy and accepts only a real provider success", async ({ page }) => {
    await isolateExternalCaptcha(page);
    let requests = 0;
    let release: (() => void) | undefined;
    await page.route("https://api.web3forms.com/submit", async (route) => {
      requests += 1;
      await new Promise<void>((resolve) => {
        release = resolve;
      });
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
    });
    await page.goto(routes[0].path);
    await installDeterministicCaptcha(page);
    await fillContactForm(page, "es");
    await verifyCaptcha(page);
    await page.getByRole("button", { name: "Enviar mensaje", exact: true }).click();

    await expect(page.locator("#contact-form")).toHaveAttribute("data-contact-state", "SUBMITTING");
    await expect(page.locator("#contact-form")).toHaveAttribute("aria-busy", "true");
    await expect(page.getByRole("button", { name: /^Enviando/ })).toBeDisabled();
    await page.evaluate(() => document.querySelector<HTMLFormElement>("#contact-form")?.requestSubmit());
    expect(requests).toBe(1);
    release?.();

    await expect(page.locator("#contact-form")).toHaveAttribute("data-contact-state", "SUCCESS");
    await expect(page.locator("#contact-form")).toHaveAttribute("aria-busy", "false");
    await expect(page.getByRole("status")).toContainText("Mensaje enviado correctamente");
    await expect(page.getByLabel("Nombre", { exact: true })).toHaveValue("");
    await page.evaluate(() => document.querySelector<HTMLFormElement>("#contact-form")?.requestSubmit());
    expect(requests).toBe(1);
  });

  test("keeps network timeout recovery bounded and theme-aware", async ({ page }) => {
    await isolateExternalCaptcha(page);
    await page.route("https://api.web3forms.com/submit", async () => {
      await new Promise(() => undefined);
    });
    await page.addInitScript(() => localStorage.setItem("rlp-theme", "dark"));
    await page.goto(routes[0].path);
    await installDeterministicCaptcha(page);
    await fillContactForm(page, "es");
    await verifyCaptcha(page);
    await page.evaluate(() => document.querySelector<HTMLFormElement>("#contact-form")?.setAttribute("data-contact-timeout-ms", "20"));
    await page.getByRole("button", { name: "Enviar mensaje", exact: true }).click();

    await expect(page.locator("#contact-form")).toHaveAttribute("data-contact-state", "ERROR", { timeout: 1_000 });
    await expect(page.locator("#contact-form")).toHaveAttribute("aria-busy", "false");
    await expect(page.getByLabel("Nombre", { exact: true })).toHaveValue(validValues.es.name);
    await expect(page.locator("main.contact-shell")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(page.getByRole("button", { name: "Reintentar", exact: true })).toBeVisible();
  });
});
