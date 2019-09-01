<template>
  <v-fade-transition>
    <div>
      <h2
        v-show="withTitle"
        class="content-center title-main-rail text--baseColor mb-2"
      >
        Renvoi de mail d'activation
      </h2>
      <v-btn
        v-if="!showForm && !hideButton"
        flat
        color="blue"
        @click="showForm = true"
        >Renvoyer le mail</v-btn
      >
      <v-form
        v-else
        lazy-validation
        ref="accountValidationForm"
        @submit.prevent="resendActivationMail"
      >
        <v-container>
          <v-flex row wrap>
            <v-flex offset-xs2 xs8>
              <v-text-field
                v-model.trim="mail"
                outline
                color="dark grey"
                label="email"
                hint="Email utilisé pour s'inscrire"
                :rules="$constraints.emailRules"
              ></v-text-field>
            </v-flex>
            <v-flex offset-xs2 xs8>
              <v-btn
                dark
                x-large
                type="submit"
                block
                depressed
                color="light-green lighten-1"
                >Renvoyer mail d'activation</v-btn
              >
            </v-flex>
          </v-flex>
        </v-container>
        <v-card-text
          v-show="errorMessage != null"
          class="content-center mt-0 pt-0"
        >
          <span class="red--text text--section">{{ errorMessage }}</span>
        </v-card-text>
      </v-form>
    </div>
  </v-fade-transition>
</template>

<script>
import { TOGGLE_SNACKBAR } from "../../store/types";
import to from "await-to-js";
export default {
  name: "ResendActivationMail",
  props: {
    hideButton: { type: Boolean, default: false },
    withTitle: { type: Boolean, default: false }
  },
  data() {
    return {
      showForm: this.hideButton,
      mail: null,
      errorMessage: null
    };
  },
  methods: {
    async resendActivationMail() {
      this.errorMessage = null;
      if (this.$refs.accountValidationForm.validate()) {
        const [err, result] = await to(
          this.$auth.resendActivationMail(this.mail)
        );
        if (err) {
          this.errorMessage =
            "Une erreur est survenue, le mail n'a pas pu être envoyé. Veuillez réessayer plus tard";
        }

        if (!err && result) {
          this.$store.commit(
            TOGGLE_SNACKBAR,
            `Un mail a été envoyé à l'adresse suivante: ${this.mail}`
          );
        }
      }
    }
  }
};
</script>

<style scoped></style>
