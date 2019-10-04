<template>
  <v-container fluid>
    <v-card flat color="transparent" class="content-center">
      <div v-if="accountActivated">
        <h1 class=" title-main text--baseColor">
          Votre compte a bien été activé
        </h1>
        <h2 class="text-content text--baseColor">
          Vous pouvez désormais vous connecter.
        </h2>
        <v-btn flat color="blue" @click="showLoginDialog">connexion</v-btn>
      </div>
      <div v-else>
        <h1 class=" title-main mb-2 text--baseColor">
          Le compte n'a pas pu être activé
        </h1>
        <br />
        <h2 class="text-content text--baseColor">
          Votre lien est peut-être expirée.
        </h2>
        <resend-activation-mail />
      </div>
    </v-card>
  </v-container>
</template>

<script>
import to from "await-to-js";
const ResendActivationMail = () =>
  import("~/components/forms/ResendActivationMail");
import { TOGGLE_CONNECTION_DIALOG } from "../../store/types";
export default {
  head() {
    return {
      title: "Activation du compte",
      meta: [
        {
          hid: "Sign-in",
          name: "description",
          content: "Valider son inscription sur Blablapharma"
        }
      ]
    };
  },
  components: { ResendActivationMail },
  middleware: "notConnected",
  methods: {
    showLoginDialog() {
      this.$store.commit(TOGGLE_CONNECTION_DIALOG, true);
    }
  },
  async asyncData({ app, params }) {
    // asyncData is called before the component is created
    const [error, result] = await to(app.$auth.activateAccount(params.token));
    const accountActivated = !error && result;

    return { accountActivated };
  }
};
</script>
