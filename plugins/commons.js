import Vue from "vue";
import AsyncComputed from "vue-async-computed";
import constraints from "../constraints";

Vue.prototype.$constraints = constraints;

Vue.use(AsyncComputed);
