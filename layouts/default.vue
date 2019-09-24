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
    <admin-button />
    <app-footer />
  </v-app>
</template>

<script>
import smoothscroll from "smoothscroll-polyfill";

// kick off the polyfill!
smoothscroll.polyfill();

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
