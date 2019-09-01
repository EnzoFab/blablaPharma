<template>
  <v-app light>
    <app-nav-bar />
    <snack-bar />
    <v-content>
      <nuxt />
    </v-content>
    <login-dialog />
    <no-ssr>
      <fresh-chat />
    </no-ssr>
    <floating-conversations />
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from "~/components/layout/AppFooter";
import AppNavBar from "../components/layout/AppNavBar";
import LoginDialog from "../components/messaging/LoginDialog";
import FreshChat from "../components/layout/FreshChat";
import FloatingConversations from "../components/layout/FloatingConversations";
import SnackBar from "../components/layout/SnackBar";
export default {
  components: {
    SnackBar,
    FloatingConversations,
    FreshChat,
    LoginDialog,
    AppNavBar,
    AppFooter
  }
};
</script>
