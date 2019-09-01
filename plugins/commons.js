import Vue from "vue";
import AsyncComputed from "vue-async-computed";
import constraints from "../constraints";
import Notifications from "vue-notification/dist/ssr.js";

Vue.prototype.$constraints = constraints;

Vue.use(AsyncComputed);
Vue.use(Notifications);
