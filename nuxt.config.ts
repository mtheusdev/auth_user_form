export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["assets/css/main.css"],
  modules: ["@nuxt/ui", "@nuxt/image"],
  ui: {
    colorMode: false,
  },
});
