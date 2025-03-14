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
import { LOGOUT } from "../../store/types";
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
          spacerBefore: false,
          widthBadge: false
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
          title: () => "Blog ETP",
          display_case: [display_cases.EVERY],
          isLink: true,
          nuxtLink: "/blog",
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
          widthBadge: () => {
            if (!this.$store.getters.isLoggedIn) {
              return false;
            }
            const connectedUserId = this.$store.getters.connectedUser.id;
            return this.$store.getters["chat/hasNewMessages"](connectedUserId);
          }
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
              nuxtLink: "/profile/",
              action: () => {
                this.$router.push({ path: "/profile/" });
              }
            },
            {
              title: "Paramètres",
              nuxtLink: "/profile/parameters",
              action: () => {
                this.$router.push({ path: "/profile/parameters" });
              }
            },
            {
              title: "Mes articles sauvegardés",
              nuxtLink: "/profile/mes-articles",
              action: () => {
                this.$router.push({ path: "/profile/mes-articles" });
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
