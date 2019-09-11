<template>
  <v-container fluid>
    <v-card flat color="transparent" class="content-center pt-2">
      <template v-if="isValidated">
        <h1 class=" title-main title-main-rail text--baseColor mb-2">
          Votre email a bien été activé
        </h1>
        <h2 class="text-content text--baseColor">
          Vous pouvez désormais vous connecter avec votre nouvelle adresse mail.
        </h2>
        <v-btn flat color="blue" @click="showLoginDialog">connexion</v-btn>
      </template>
      <template v-else>
        <h1 class=" title-main title-main-rail text--baseColor mb-2">
          Votre adresse mail n'a pas pu être validé.
        </h1>
        <h2 class="text-content text--baseColor">
          Votre ancienne adresse mail vous servira encore à vous connecter.
        </h2>
      </template>
    </v-card>
  </v-container>
</template>

<script>
import to from "await-to-js";
import { TOGGLE_CONNECTION_DIALOG } from "../../store/types";

export default {
  name: "ConfirmNewEmailToken",
  methods: {
    showLoginDialog() {
      this.$store.commit(TOGGLE_CONNECTION_DIALOG, true);
    }
  },
  asyncComputed: {
    // asyncComputed to execute async code in a computed property
    async isValidated() {
      if (this.emailValidated) {
        return this.emailValidated;
      }
      const isLoggedIn = this.$store.getters.isLoggedIn;
      const confirmNewEmailToken = this.$route.params.confirmNewEmailToken;

      if (isLoggedIn) {
        const accountId = this.$store.getters.connectedUser.id;
        const [error, result] = await to(
          this.$account.validateNewEmail(accountId, confirmNewEmailToken)
        );

        return !error && result;
      }

      // if the user isn't connected we ask him to connect
      this.$store.commit(TOGGLE_CONNECTION_DIALOG, true);
      return false;
    }
  },
  async asyncData({ app, params, store }) {
    // asyncData is called before the component is created
    const confirmNewEmailToken = params.confirmNewEmailToken;

    let emailValidated = null;
    if (store.getters.isLoggedIn) {
      const accountId = store.getters.connectedUser.id;
      const [error, result] = await to(
        app.$account.validateNewEmail(accountId, confirmNewEmailToken)
      );
      emailValidated = !error && result;
      return { emailValidated };
    }

    // if we are not connected show the login dialog
    store.commit(TOGGLE_CONNECTION_DIALOG, true);
    return { emailValidated };
  }
};
</script>
