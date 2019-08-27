<template>
  <v-fade-transition>
    <v-btn v-if="!showForm" flat color="blue" @click="showForm = true"
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
  </v-fade-transition>
</template>

<script>
import to from "await-to-js";
export default {
  name: "ResendActivationMail",
  data() {
    return {
      showForm: false,
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
        // todo trigger notification
      }
    }
  }
};
</script>

<style scoped></style>
