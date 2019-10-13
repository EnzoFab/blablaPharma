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
const AppFooter = () => import("~/components/layout/AppFooter");
//import AppFooter from "~/components/layout/AppFooter";
const AppNavBar = () => import("~/components/layout/AppNavBar");
// import AppNavBar from "~/components/layout/AppNavBar";
const LoginDialog = () => import("~/components/forms/LoginDialog");
//import LoginDialog from "~/components/forms/LoginDialog";

const FreshChat = () => import("~/components/layout/FreshChat");
//import FreshChat from "~/components/layout/FreshChat";
//import FloatingConversations from "~/components/layout/FloatingConversations";

const FloatingConversations = () =>
  import("~/components/layout/FloatingConversations");

const SnackBar = () => import("~/components/layout/SnackBar");
//import SnackBar from "../components/layout/SnackBar";

const AdminButton = () => import("~/components/layout/AdminButton");
//import AdminButton from "../components/layout/AdminButton";
export default {
  components: {
    AdminButton,
    SnackBar,
    FloatingConversations,
    FreshChat,
    LoginDialog,
    AppNavBar,
    AppFooter
  }
};
</script>
