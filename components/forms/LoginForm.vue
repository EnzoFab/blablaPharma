<template>
  <v-card class="lowOpacity">
    <v-card-text>
      <v-flex offset-sm10 sm2 offset-xs5 xs2>
        <v-icon x-large @click="closeDialog">close</v-icon>
      </v-flex>
    </v-card-text>
    <template v-if="!showResetPwd">
      <v-card-title primary>
        <h1 class="title-main title-main-rail content-center text--baseColor">
          {{ loginTitle }}
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
          <v-flex :sm4="padded" :offset-sm4="padded" xs8 offset-xs2>
            <v-form
              :class="{ 'px-5': padded, 'mt-4': padded }"
              ref="login"
              v-model="formValid"
              lazy-validation
              @submit.prevent="connection"
            >
              <v-text-field
                v-model="mail"
                label="Email"
                color="blue-grey lighten-1"
                type="mail"
                :loading="isProcessing"
                :rules="[...$constraints.required, ...$constraints.emailRules]"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Mot de passe"
                color="blue-grey lighten-1"
                :class="{ 'mt-4': padded, 'mt-1': !padded }"
                type="password"
                :loading="isProcessing"
                :rules="$constraints.required"
              ></v-text-field>
              <div
                :class="{
                  'mt-4': padded,
                  'mt-1': !padded,
                  'content-center': true
                }"
              >
                <v-btn
                  large
                  :block="padded"
                  depressed
                  color="blue-grey lighten-1"
                  dark
                  type="submit"
                  :disabled="!formValid"
                  :loading="isProcessing"
                  >Connexion</v-btn
                >
              </div>
            </v-form>
          </v-flex>
          <v-flex
            :sm4="padded"
            :offset-sm4="padded"
            xs9
            offset-xs1
            class="mt-3 content-center"
          >
            <a
              class="text--section text-no-decoration blue-grey--text text--lighten-3"
              @click="displayForgottenPwd"
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
          Vous allez recevoir un mail vous permettant de reinitialiser votre mot
          de passe.</span
        >
      </div>

      <v-container fluid>
        <v-layout row wrap>
          <v-flex :sm4="padded" :offset-sm4="padded" xs9 offset-xs1>
            <v-form
              :class="{ 'px-5': padded, 'mt-4': true }"
              ref="forgotPwd"
              lazy-validation
              @submit.prevent="resetPwd"
              v-model="formValid"
            >
              <v-text-field
                v-model="mail"
                label="Email"
                color="blue-grey lighten-1"
                type="mail"
                :rules="$constraints.required"
                :loading="isProcessing"
              ></v-text-field>
              <v-btn
                large
                block
                color="blue-grey lighten-1"
                dark
                depressed
                class="mt-4"
                type="submit"
                :loading="isProcessing"
                :disabled="!formValid"
                >Reinitialiser</v-btn
              >
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
    <v-card-text v-show="errorMessage != null" class="content-center mt-0 pt-0">
      <span class="red--text text--section">{{ errorMessage }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
import { SET_JWT_TOKEN } from "../../store/types";

export default {
  name: "LoginForm",
  props: {
    padded: { type: Boolean, default: false },
    // change the title of the form on when there is a login
    customLoginTitle: { type: String, default: null }
  },
  data() {
    return {
      mail: "",
      password: "",
      showResetPwd: false,
      fromValid: true,
      errorMessage: null,
      isProcessing: false,
      formValid: true
    };
  },
  computed: {
    loginTitle() {
      return this.customLoginTitle && this.customLoginTitle.length > 0
        ? this.customLoginTitle
        : "Connexion";
    }
  },
  methods: {
    closeDialog() {
      // reset every
      this.mail = "";
      this.password = "";
      this.showResetPwd = false;
      this.errorMessage = null;
      this.formValid = true;
      this.isProcessing = false;
      this.$emit("login-form:close", false);
    },
    displayForgottenPwd() {
      this.errorMessage = null;
      this.isProcessing = false;
      this.showResetPwd = true;
      this.formValid = true;
    },
    gotoSignIn() {
      this.$router.push({ path: "/sign-in" });
      this.closeDialog();
    },
    async connection() {
      if (this.$refs.login.validate() && !this.isProcessing) {
        this.errorMessage = null;
        this.isProcessing = true;
        try {
          // dispatch an action to try to connect
          await this.$store.dispatch("login");
          this.hideLoader(() => this.closeDialog());

          // if we are on a page that require a none connected user
          if (["/sign-in"].includes(this.$route.path)) {
            this.$router.push({ path: "/" });
          }
        } catch (e) {
          await this.hideLoader();
          this.errorMessage = "Identifiants non valides";
        }
      }
    },

    async resetPwd() {},

    /**
     *
     * @param {function }callback
     */
    hideLoader(callback = null) {
      setTimeout(() => {
        this.isProcessing = false;
        if (callback) {
          callback();
        }
      }, 1500);
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
