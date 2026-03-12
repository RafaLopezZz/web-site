import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site : "https://rafalopezzz.github.io/website",
  base : "/web-site",
  output: "static",
  integrations: [tailwind()]
});
