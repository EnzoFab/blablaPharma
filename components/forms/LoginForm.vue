<template>
  <v-dialog :value="value" fullscreen full-width transition persistent>
    <v-card class="login">
      <v-card-text>
        <v-flex offset-sm10 sm2 offset-xs5 xs2>
          <v-icon x-large @click="closeDialog">close</v-icon>
        </v-flex>
      </v-card-text>
      <template v-if="!showResetPwd">
        <v-card-title primary>
          <h1 class="title-main title-main-rail content-center text--baseColor">
            Connexion
          </h1>
        </v-card-title>
        <div class="text--section content-center">
          <span class="text--baseColor">Pas encore de compte ?</span>
          <a
            class="text--section text-no-decoration blue-grey--text text--lighten-3"
            @click="gotoSignIn"
            >s'inscrire</a
          >
        </div>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex sm4 offset-sm4 xs9 offset-xs1>
              <v-form
                class="px-5 mt-4"
                ref="login"
                @submit.prevent="connection"
              >
                <v-text-field
                  v-model="mail"
                  label="Email"
                  color="blue-grey lighten-1"
                  type="mail"
                  :rules="[
                    ...$constraints.required,
                    ...$constraints.emailRules
                  ]"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Mot de passe"
                  color="blue-grey lighten-1"
                  class="mt-4"
                  type="password"
                  :rules="$constraints.required"
                ></v-text-field>
                <v-btn
                  large
                  block
                  depressed
                  color="blue-grey lighten-1"
                  dark
                  class="mt-4"
                  type="submit"
                  >Connexion</v-btn
                >
              </v-form>
            </v-flex>
            <v-flex sm4 offset-sm4 xs9 offset-xs1 class="mt-3 content-center">
              <a
                class="text--section text-no-decoration blue-grey--text text--lighten-3"
                @click="showResetPwd = true"
                >Mot de passe oublié ?</a
              >
            </v-flex>
          </v-layout>
        </v-container>
        <div class="content-center"></div>
      </template>
      <template v-else>
        <v-card-title primary>
          <h1 class="title-main title-main-rail content-center text--baseColor">
            Mot de passe oublié
          </h1>
        </v-card-title>
        <div class="text--section content-center">
          <span class="text--baseColor"
            >Entrez l'adresse mail associée à votre compte.<br />
            Vous allez recevoir un mail vous permettant de reinitialiser votre
            mot de passe.</span
          >
        </div>

        <v-container fluid>
          <v-layout row wrap>
            <v-flex sm4 offset-sm4 xs9 offset-xs1>
              <v-form
                class="px-5 mt-4"
                ref="forgotPwd"
                lazy-validation
                @submit.prevent="resetPwd"
              >
                <v-text-field
                  v-model="mail"
                  label="Email"
                  color="blue-grey lighten-1"
                  type="mail"
                  :rules="$constraints.required"
                ></v-text-field>
                <v-btn
                  large
                  block
                  depressed
                  color="blue-grey lighten-1"
                  dark
                  class="mt-4"
                  type="submit"
                  >Reinitialiser</v-btn
                >
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    // display the dialog or not
    value: { type: Boolean, default: false }
  },
  data() {
    return {
      mail: "",
      password: "",
      showResetPwd: false,
      fromValid: true
    };
  },
  methods: {
    closeDialog() {
      this.mail = "";
      this.password = "";
      this.showResetPwd = false;
      this.$emit("input", false);
    },
    gotoSignIn() {
      this.$router.push({ path: "/sign-in" });
      this.closeDialog();
    },
    connection() {
      if (this.$refs.login.validate()) {
        // todo call api login
      }
    }
  },
  resetPwd() {
    if (this.$refs.forgotPwd.validate()) {
      // todo call reset Api
    }
  }
};
</script>

<style scoped></style>
