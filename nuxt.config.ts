// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: [
    './assets/css/main.css',
  ],

  typescript: {
    typeCheck: true
  },

  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,

      contentful: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        environmentId: process.env.CONTENTFUL_ENVIRONMENT_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },

      wsrvBaseUrl: process.env.WESERV_BASE_URL,
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils/module',
  ],

  compatibilityDate: '2024-07-10',
})