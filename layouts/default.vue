<template>
  <v-app light>
    <app-nav-bar />
    <snack-bar />
    <v-content>
      <v-container fluid ma-0 pa-0 class="white">
        <nuxt />
      </v-container>
    </v-content>
    <login-dialog />
    <client-only>
      <fresh-chat />
    </client-only>
    <floating-conversations />
    <admin-button />
    <app-footer />
  </v-app>
</template>

<script>
import { requestPermission } from "../helpers";
const AppFooter = () => import("~/components/layout/AppFooter");
const AppNavBar = () => import("~/components/layout/AppNavBar");
const LoginDialog = () => import("~/components/forms/LoginDialog");

const FreshChat = () => import("~/components/layout/FreshChat");

const FloatingConversations = () =>
  import("~/components/layout/FloatingConversations");

const SnackBar = () => import("~/components/layout/SnackBar");

const AdminButton = () => import("~/components/layout/AdminButton");
export default {
  head() {
    const connectedUserId = this.$store.getters.isLoggedIn
      ? this.$store.getters.connectedUser.id
      : null;
    const hasNewMessage =
      connectedUserId &&
      this.$store.getters["chat/hasNewMessages"](connectedUserId);

    const titleTemplate = hasNewMessage
      ? `Nouveau(x) messages - %s`
      : "%s | Blablapharma";
    return {
      titleTemplate
    };
  },
  components: {
    AdminButton,
    SnackBar,
    FloatingConversations,
    FreshChat,
    LoginDialog,
    AppNavBar,
    AppFooter
  },
  mounted() {
    try {
      requestPermission();
    } catch (e) {
      console.warn(e);
    }
  }
};
</script>
