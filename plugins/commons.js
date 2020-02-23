import Vue from "vue";
import AsyncComputed from "vue-async-computed";
import constraints from "../constraints";
//import VueYoutube from "vue-youtube";
import VueYouTubeEmbed from "vue-youtube-embed";

Vue.prototype.$constraints = constraints;

Vue.use(AsyncComputed);
//Vue.use(VueYoutube);

Vue.use(VueYouTubeEmbed);
