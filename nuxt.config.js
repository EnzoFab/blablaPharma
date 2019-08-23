const colors = require("vuetify/es5/util/colors").default;
const env = require("dotenv").config();

//const mode = process.env.NODE_ENV === "development" ? "spa" : "universal";

module.exports = {
  mode: "universal",
  env: env.parsed,
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
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
        rel: "stylesheet",
        href:
          "https://db.onlinewebfonts.com/c/9a7e574c3eda05d71d03345d3f9e268e?family=FuturaLTW01-LightOblique"
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
  css: ["@assets/scss/main.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/axios",
    "~/plugins/commons",
    "~/plugins/auth",
    { src: "~plugins/vue-cookie-law.js", ssr: false }
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
    ["vue-scrollto/nuxt", { duration: 300 }]
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
    prefix: "/api/"
  },

  proxy: {
    "/api/": {
      target: env.parsed.API_URL,
      pathRewrite: { "^/api/": "/" }
    }
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
      success: colors.green.accent3
    }
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
        install: smoothscroll => smoothscroll.polyfill()
      }
    ]
  },

  /*
   ** Build configuration
   */
  build: {
    /*  filenames: {
      app: ({ isDev }) => (isDev ? "[name].[hash].js" : "[chunkhash].js"),
      chunk: ({ isDev }) => (isDev ? "[name].[hash].js" : "[chunkhash].js")
    }, */
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
