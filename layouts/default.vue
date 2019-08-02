<template>
  <v-app light>
    <app-nav-bar />
    <v-content>
      <nuxt />
    </v-content>
    <login-dialog />
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from "~/components/layout/AppFooter";
import AppNavBar from "../components/layout/AppNavBar";
import LoginDialog from "../components/messaging/LoginDialog";
export default {
  components: {
    LoginDialog,
    AppNavBar,
    AppFooter
  },
  data() {
    return {};
  }
};
</script>
