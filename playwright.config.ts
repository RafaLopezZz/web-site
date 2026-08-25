import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  webServer: {
    command: "npm run build && npm run preview -- --host 127.0.0.1",
    url: "http://127.0.0.1:4321/web-site/",
    reuseExistingServer: false,
    env: {
      PUBLIC_WEB3FORMS_KEY: "playwright-web3forms-key",
      PUBLIC_HCAPTCHA_SITEKEY: "playwright-hcaptcha-sitekey",
    },
  },
  projects: [{
    name: "chromium",
    use: {
      baseURL: "http://127.0.0.1:4321/web-site/",
      browserName: "chromium",
    },
  }],
});
