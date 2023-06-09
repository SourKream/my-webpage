// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.scss"],
  modules: ["@nuxtjs/eslint-module"],
  eslint: {
    lintOnStart: false,
  },
  ssr: false,
  app: {
    baseURL: "/my-webpage/",
  },
});
