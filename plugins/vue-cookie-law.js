import Vue from "vue";
//import CookieLaw from "vue-cookie-law";
const CookieLaw = () => import("vue-cookie-law");
Vue.component("cookie-law", CookieLaw);
