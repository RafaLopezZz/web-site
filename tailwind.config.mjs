/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        accent: "#00E5FF",
        ink: "#0B0C10"
      },
      fontFamily: {
        body: ["'DM Sans'", "sans-serif"],
        display: ["'Syne'", "sans-serif"]
      }
    }
  },
  plugins: []
};
