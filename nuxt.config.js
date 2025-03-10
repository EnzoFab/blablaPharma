const colors = require("vuetify/es5/util/colors").default;
import VuetifyLoaderPlugin from "vuetify-loader/lib/plugin";
//const env = require("dotenv").config();

module.exports = {
  mode: "universal",
  env: {
    DOMAIN: process.env.DOMAIN
  },
  //env: env.parsed,
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "Chat, pharmaciens, contacter, blablapharma, blablaPharma questions"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      },
      { name: "msapplication-TileColor", content: "#868788" },

      {
        name: "msapplication-TileImage",
        content: "/favicons/ms-icon-144x144.png"
      },
      { name: "theme-color", content: "#BED469" },
      { hid: "og:type", name: "og:type", content: "website" },
      { hid: "og:url", name: "og:url", content: process.env.DOMAIN },
      { hid: "og:title", name: "og:title", content: "Blablapharma" },
      { hid: "og:site_name", name: "og:site_name", content: "Blablapharma" },
      { hid: "og:locale", name: "og:locale", content: "fr" },
      {
        hid: "og:image",
        name: "og:image",
        content: `${process.env.DOMAIN}/images/logo-fav.png`
      }
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "57x57",
        href: "/favicons/apple-icon-57x57.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "60x60",
        href: "/favicons/apple-icon-60x60.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "72x72",
        href: "/favicons/apple-icon-72x72.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "76x76",
        href: "/favicons/apple-icon-76x76.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "114x114",
        href: "/favicons/apple-icon-114x114.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "120x120",
        href: "/favicons/apple-icon-120x120.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "144x144",
        href: "/favicons/apple-icon-144x144.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "152x152",
        href: "/favicons/apple-icon-152x152.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicons/apple-icon-180x180.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/favicons/android-icon-192x192.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicons/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicons/favicon-96x96.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicons/favicon-16x16.png"
      },
      { rel: "manifest", href: "/favicons/manifest.json" },

      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.0.13/css/all.css"
      },
      {
        rel: "text/css",
        href:
          "https://fonts.googleapis.com/css?family=Anton:n,b,i,bi|Basic:n,b,i,bi|Caudex:n,b,i,bi|Chelsea+Market:n,b,i,bi|Corben:n,b,i,bi|EB+Garamond:n,b,i,bi|Enriqueta:n,b,i,bi|Forum:n,b,i,bi|Fredericka+the+Great:n,b,i,bi|Jockey+One:n,b,i,bi|Josefin+Slab:n,b,i,bi|Jura:n,b,i,bi|Kelly+Slab:n,b,i,bi|Marck+Script:n,b,i,bi|Lobster:n,b,i,bi|Mr+De+Haviland:n,b,i,bi|Niconne:n,b,i,bi|Noticia+Text:n,b,i,bi|Overlock:n,b,i,bi|Patrick+Hand:n,b,i,bi|Play:n,b,i,bi|Sarina:n,b,i,bi|Signika:n,b,i,bi|Spinnaker:n,b,i,bi|Monoton:n,b,i,bi|Sacramento:n,b,i,bi|Cookie:n,b,i,bi|Raleway:n,b,i,bi|Open+Sans+Condensed:300:n,b,i,bi|Amatic+SC:n,b,i,bi|Cinzel:n,b,i,bi|Sail:n,b,i,bi|Playfair+Display:n,b,i,bi|Libre+Baskerville:n,b,i,bi|Roboto:n,b,i,bi|Roboto:n,b,i,bi|Roboto:n,b,i,bi|Work+Sans:n,b,i,bi|Work+Sans:n,b,i,bi|Poppins:n,b,i,bi|Poppins:n,b,i,bi|Barlow:n,b,i,bi|Barlow:n,b,i,bi|Oswald:n,b,i,bi|Oswald:n,b,i,bi|Oswald:n,b,i,bi|Cormorant+Garamond:n,b,i,bi|Cormorant+Garamond:n,b,i,bi|Cormorant+Garamond:n,b,i,bi|Playfair+Display:n,b,i,bi|Dancing+Script:n,b,i,bi|Damion:n,b,i,bi|Suez+One:n,b,i,bi|Rozha+One:n,b,i,bi|Raleway:n,b,i,bi|Lato:n,b,i,bi|Questrial:n,b,i,bi|Montserrat:n,b,i,bi|&subset=hebrew,arabic,latin"
      }
    ],
    script: [{ src: "https://wchat.freshchat.com/js/widget.js" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [
    "@assets/scss/main.scss",
    "quill/dist/quill.snow.css",
    "quill/dist/quill.bubble.css",
    "quill/dist/quill.core.css"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/axios",
    "~/plugins/commons",
    "~/plugins/api",
    { src: "~/plugins/vue-cookie-law.js", ssr: false },
    { src: "~/plugins/smoothScroll", ssr: false },
    { src: "~plugins/quill-plugin.js", ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/vuetify",
    "cookie-universal-nuxt",
    ["@nuxtjs/moment", { locales: ["fr"] }],
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/proxy",

    "@nuxtjs/pwa",
    ["vue-scrollto/nuxt", { duration: 150 }],
    "@nuxtjs/dotenv",
    "nuxt-polyfill",
    "@nuxtjs/redirect-module",
    "@nuxtjs/robots",

    [
      "nuxt-social-meta",
      {
        url: process.env.DOMAIN || "127.0.0.1",
        title: "BlablaPharma",
        description:
          "BlablaPharma vous permet d'échanger directement avec un pharmacien ou que vous soyez",
        img: "/images/logo-fav.png",
        locale: "fr-Fr",
        twitter: "@blablapharma",
        themeColor: "#BED469"
      }
    ],
    "@nuxtjs/sitemap",
    "nuxt-maintenance-mode"
    //"@bazzite/nuxt-optimized-images"
  ],

  /*
    beforeach route calls cookie setter middleware
   */
  router: {
    middleware: ["cookieSetter"]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    prefix: "/api/",
    https: process.env.NODE_ENV !== "production"
  },

  proxy: {
    "/api/": {
      target: process.env.API_URL || "http://localhost:1337/",
      pathRewrite: { "^/api/": "/" },
      changeOrigin: true,
      secure: true
    }
  },

  sitemap: {
    hostname: process.env.DOMAIN || "127.0.0.1",
    gzip: true,
    path: "/sitemap.xml",
    exclude: ["/bo/**, /profile/**"]
  },

  robots: {
    Disallow: ["/bo", "/profile"],
    Sitemap: `${process.env.DOMAIN}/sitemap.xml`
  },

  maintenance: {
    enabled: process.env.MAINTENANCE_MODE === "on", // If given truthy value, activate maintenance mode on startup
    path: "/maintenance" // maintenance fallback content routing
    // matcher: /^\/admin/ // Path to be in maintenance mode (regex)
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      primary: colors.blue.darken2,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3,
      "default-green": "#BED469",
      "default-grey": "#868788"
    },
    treeShake: true
  },

  polyfill: {
    features: [
      /*
              Feature with detect:

              Detection is better because the polyfill will not be
              loaded, parsed and executed if it's not necessary.
          */
      {
        require: "intersection-observer",
        detect: () => "IntersectionObserver" in window
      },
      /*
              Feature with detect & install:

              Some polyfills require a installation step
              Hence you could supply a install function which accepts the require result
          */
      {
        require: "smoothscroll-polyfill",

        // Detection found in source: https://github.com/iamdustan/smoothscroll/blob/master/src/smoothscroll.js
        detect: () =>
          "scrollBehavior" in document.documentElement.style &&
          window.__forceSmoothScrollPolyfill__ !== true,

        // Optional install function called client side after the package is required:
        install: smoothScroll => smoothScroll.polyfill(),
        include: true
      }
    ]
  },

  serverMiddleware: [
    // Will register redirect-ssl npm package
    "redirect-ssl"
  ],

  /*
   ** Build configuration
   */
  build: {
    //analyze: true,
    extractCSS: true,
    transpile: ["vuetify", "vue-youtube-embed"],
    optimization: { minimize: true },
    terser: { cache: true, parallel: false },
    // optimizeCSS: true,
    filenames: {
      app: ({ isDev }) => (isDev ? "[name].[hash].js" : "[chunkhash].js"),
      chunk: ({ isDev }) => (isDev ? "[name].[hash].js" : "[chunkhash].js")
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient }) {}
  }
  /* optimizedImages: {
    optimizeImages: true
  }*/
};
