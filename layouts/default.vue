<template>
  <v-app light>
    <app-nav-bar />
    <v-content>
      <nuxt />
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from "~/components/layout/AppFooter";
import AppNavBar from "../components/layout/AppNavBar";
export default {
  components: {
    AppNavBar,
    AppFooter
  },
  data() {
    return {};
  }
};
</script>
