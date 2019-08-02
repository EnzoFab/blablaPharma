<template>
  <div style="z-index: 10">
    <toolbar-mobile :display-toolbar="$vuetify.breakpoint.xs" :items="items" />
    <toolbar-computer v-show="!$vuetify.breakpoint.xs" :items="items" />
    <v-dialog
      :value="connectionDialog"
      fullscreen
      full-width
      transition
      persistent
    >
      <login-form @login-form:close="connectionDialog = false" :padded="true" />
    </v-dialog>
  </div>
</template>

<script>
import LoginForm from "../forms/LoginForm";
// allow to know in which case the toolbar item will be displayed
const display_cases = {
  EVERY: "all",
  NOT_LOGGED: "not_logged",
  LOGGED: "logged"
};

import { LOGOUT } from "../../store/modules/types";
import ToolbarComputer from "./ToolbarComputer";
import ToolbarMobile from "./ToolbarMobile";

export default {
  name: "AppNavBar",
  components: { ToolbarMobile, ToolbarComputer, LoginForm },
  data() {
    return {
      connectionDialog: false,
      toolbarItems: [
        {
          // title is a function because it might change
          title: () => "Accueil",
          display_case: display_cases.EVERY,
          isLink: true,
          nuxtLink: "/",
          spacerBefore: false
        },
        {
          title: () => "Contacter un pharmacien",
          display_case: display_cases.EVERY,
          isLink: true,
          nuxtLink: "/contacter-un-pharmacien",
          spacerBefore: false
        },
        {
          title: () => "Blog",
          display_case: display_cases.EVERY,
          isLink: true,
          nuxtLink: "/blog",
          spacerBefore: false
        },
        {
          title: () => "S'inscrire",
          display_case: display_cases.NOT_LOGGED,
          isLink: true,
          nuxtLink: "/sign-in",
          spacerBefore: false
        },
        {
          title: () =>
            this.$store.getters.isLoggedIn
              ? this.$store.getters.connectedUser.name
              : "",
          display_case: display_cases.LOGGED,
          spacerBefore: false,
          //
          childs: [
            {
              title: "Profil",
              action: () => {
                this.$router.push({ path: "/profile" });
              }
            },
            {
              title: "Deconnexion",
              action: () => {
                this.$store.dispatch(LOGOUT);
              }
            }
          ]
        },
        {
          title: () => "Connexion",
          display_case: display_cases.NOT_LOGGED,
          spacerBefore: false,
          action: () => {
            // show the connection dialog
            this.connectionDialog = true;
          }
        }
      ]
    };
  },
  computed: {
    items() {
      // if the user is connected display only logged items
      // otherwise display not_logged
      // items with display_case = EVERY are always displayed

      return this.$store.getters.isLoggedIn
        ? this.toolbarItems.filter(
            item =>
              item.display_case === display_cases.EVERY ||
              item.display_case === display_cases.LOGGED
          )
        : this.toolbarItems.filter(
            item =>
              item.display_case === display_cases.EVERY ||
              item.display_case === display_cases.NOT_LOGGED
          );
    },
    smallScreen() {
      return this.$vuetify.breakpoint.xs;
    }
  }
};
</script>

<style scoped></style>
