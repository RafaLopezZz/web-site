import { expect, test } from "@playwright/test";

test("keeps legacy professional records out of the short Home", async ({ page }) => {
  const response = await page.goto("/web-site/");

  expect(response?.ok()).toBe(true);
  await expect(page.locator("#experiencia, #formacion")).toHaveCount(0);
  await expect(page.getByRole("heading", {
    name: /Desarrollador Fullstack y Técnico de Sistemas|Curso de especialización FP en Inteligencia Artificial y Big Data/,
  })).toHaveCount(0);
});
