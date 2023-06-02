import { defineNuxtConfig } from "nuxt";
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Global page headers: https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
  meta: {
    meta: [
      // <meta name="viewport" content="width=device-width, initial-scale=1">
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    script: [
      // { src: '' }
    ],
    link: [
      // { rel: 'stylesheet', href: '' }
      { rel: "icon", type: "image/x-icon", href: "/static/favicon.ico" },
    ],
    // please note that this is an area that is likely to change
    style: [
      //   // <style type="text/css">:root { color: red }</style>
      //   { children: ':root { color: red }', type: 'text/css' }
    ],
  },
  css: [
    "@@/node_modules/bootstrap/dist/css/bootstrap.min.css",
    "@@/node_modules/bootstrap-vue-3/dist/bootstrap-vue-3.css",
    "@/assets/scss/main.scss",
    "@/assets/css/tailwind.css",
    "@/assets/scss/common.scss",
    // "@/assets/styles/tailwind.css"
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  plugins: [
    { src: "~/plugins/bootstrap-vue", mode: "server" },
    "@/plugins/axios.ts",
    "@/plugins/toast.ts",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // With options
    [
      "@nuxtjs/moment",
      {
        /* module options */
      },
    ],
    "@nuxtjs/style-resources",
    "@pinia/nuxt",
    "@nuxtjs/dotenv",
  ],
  router: {
    middleware: ["auth", "middleware"],
  },
  // pwa: { icon: { source: '~/static/favicon.ico' } },
  moment: {
    defaultTimezone: "Asia/Tokyo",
  },
  srcDir: "client/",
  vite: {
    server: {
      hmr: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_variables.scss";',
        },
      },
    },
  },

  env: {
    BASE_URL: process.env.BASE_URL,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "@nuxtjs/dotenv",
    ["@nuxtjs/axios", { proxyHeaders: false }],
  ],

  publicRuntimeConfig: {
    axios: {
      baseURL: "https://api.subsq.jp",
      proxy: true,
      credentials: false,
    },
  },

  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  // nitro: {
  //   preset: 'node-server'
  // }
});
