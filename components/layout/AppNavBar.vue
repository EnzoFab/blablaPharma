<template>
  <div style="z-index: 10">
    <toolbar-mobile
      :display-toolbar="$vuetify.breakpoint.smAndDown"
      :items="items"
    />
    <toolbar-computer :items="items" />
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
import { LOGOUT, TOGGLE_SNACKBAR } from "../../store/types";
import ToolbarComputer from "./ToolbarComputer";
import ToolbarMobile from "./ToolbarMobile";
// allow to know in which case the toolbar item will be displayed
const display_cases = {
  EVERY: "all",
  NOT_LOGGED: "not_logged",
  LOGGED: "logged",
  // only display if the user is a patient
  LOGGED_PATIENT_ONLY: "patient_only",

  // only display if the user is a pharmacist
  LOGGED_PHARMACIST_ONLY: "pharmacist_only"
};

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
          display_case: [display_cases.EVERY],
          isLink: true,
          nuxtLink: "/",
          spacerBefore: false
        },
        {
          title: () => "Contacter un pharmacien",
          display_case: [
            display_cases.NOT_LOGGED,
            display_cases.LOGGED_PATIENT_ONLY
          ],
          isLink: true,
          nuxtLink: "/contacter-un-pharmacien",
          spacerBefore: false
        },
        {
          title: () => "Blog",
          display_case: [display_cases.EVERY],
          action: () =>
            location.replace(
              "https://blablapharma.wixsite.com/blablapharma/blog"
            ),
          // isLink: true,
          // nuxtLink: "/blog",
          spacerBefore: false
        },
        {
          title: () => "S'inscrire",
          display_case: [display_cases.NOT_LOGGED],
          isLink: true,
          nuxtLink: "/sign-in",
          spacerBefore: false
        },
        {
          title: () => "Messages",
          display_case: [display_cases.LOGGED],
          isLink: true,
          nuxtLink: "/messages",
          spacerBefore: false
        },
        {
          title: () => {
            if (this.$store.getters.isLoggedIn) {
              const connectedUser = this.$store.getters.connectedUser;
              return `${connectedUser.firstName} ${connectedUser.lastName}`;
            }

            return "";
          },
          display_case: [display_cases.LOGGED],
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
          display_case: [display_cases.NOT_LOGGED],
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
      // if the user is connected display the logged and logged_only items
      // otherwise display not_logged
      // items with display_case = EVERY are always displayed

      return this.$store.getters.isLoggedIn
        ? this.toolbarItems.filter(item => {
            const initialPredicate =
              item.display_case.includes(display_cases.EVERY) ||
              item.display_case.includes(display_cases.LOGGED);

            return this.$store.getters.userType === "Pharmacist"
              ? initialPredicate ||
                  item.display_case.includes(
                    display_cases.LOGGED_PHARMACIST_ONLY
                  )
              : initialPredicate ||
                  item.display_case.includes(display_cases.LOGGED_PATIENT_ONLY);
          })
        : this.toolbarItems.filter(
            item =>
              item.display_case.includes(display_cases.EVERY) ||
              item.display_case.includes(display_cases.NOT_LOGGED)
          );
    },
    smallScreen() {
      return this.$vuetify.breakpoint.xs;
    }
  }
};
</script>
