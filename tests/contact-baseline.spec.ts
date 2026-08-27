import { expect, test } from "@playwright/test";

test("keeps the legacy contact form out of the short Home", async ({ page }) => {
  const response = await page.goto("/web-site/");

  expect(response?.ok()).toBe(true);
  await expect(page.locator("#contacto, #contact-form")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Enviar mensaje" })).toHaveCount(0);
});
