<template>
  <v-card class="lowOpacity">
    <v-card-text>
      <v-flex offset-sm10 sm2 offset-xs5 xs2>
        <v-icon x-large @click="closeDialog">close</v-icon>
      </v-flex>
    </v-card-text>
    <template v-if="resendAccountActivation">
      <v-container class="content-center">
        <v-layout row wrap>
          <v-flex offset-xs2 xs8>
            <resend-activation-mail hide-button with-title />
          </v-flex>
        </v-layout>
      </v-container>
    </template>
    <template v-else-if="!showResetPwd">
      <v-card-title primary>
        <h1 class="title-main content-center text--baseColor">
          {{ loginTitle }}
        </h1>
      </v-card-title>
      <div class="text--section content-center">
        <span class="text--baseColor">Pas encore de compte ?</span>
        <a
          class="text--section text-no-decoration blue-grey--text text--lighten-3"
          @click="gotoSignIn"
          >S'inscrire</a
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
                v-model.trim="mail"
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
                  color="default-grey"
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
    </template>
    <template v-else>
      <v-card-title primary>
        <h1 class="title-main content-center text--baseColor">
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
                :rules="$constraints.emailRules"
                :loading="isProcessing"
              ></v-text-field>
              <v-btn
                large
                block
                color="default-grey"
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
    <v-card-text
      v-show="errorMessage != null && !isProcessing && !resendAccountActivation"
      class="mt-0 pt-0"
    >
      <div class="red--text text--section content-center">
        {{ errorMessage }}
      </div>
      <v-container
        grid-list-xs
        fluid
        fill-height
        pa-0
        ma-0
        v-if="!showResetPwd"
      >
        <v-layout align-center row wrap pa-0 ma-0>
          <v-flex offset-xs4 xs1>
            <v-icon size="30" color="grey darken-2" style="float: right"
              >error_outline</v-icon
            >
          </v-flex>
          <v-flex xs3>
            <span
              class="pl-2 light-green--text text--accent-3 font-weight-bold content-pointer"
              @click="resendAccountActivation = true"
              >Avez-vous pensé à activer votre compte ?</span
            >
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import to from "await-to-js";
import { TOGGLE_SNACKBAR } from "../../store/types";
import ResendActivationMail from "./ResendActivationMail";

export default {
  name: "LoginForm",
  components: { ResendActivationMail },
  props: {
    // add a padding  within the component
    padded: { type: Boolean, default: false },
    // change the title of the form on when there is a login
    customLoginTitle: { type: String, default: null }
  },
  data() {
    return {
      mail: null,
      password: null,
      showResetPwd: false,
      fromValid: true,
      errorMessage: null,
      isProcessing: false,
      formValid: true,
      resendAccountActivation: false
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
      this.$refs.login.reset();
      // reset every fields and close the dialog
      this.mail = "";
      this.password = "";
      this.showResetPwd = false;
      this.errorMessage = null;
      this.formValid = true;
      this.isProcessing = false;
      this.resendAccountActivation = false;
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
          await this.$store.dispatch("login", {
            email: this.mail.toLocaleLowerCase(),
            password: this.password
          });
          this.hideLoader(() => this.closeDialog());

          // if we are on a page which requires a user not connected
          this.handleRouteRedirect();
        } catch (e) {
          this.hideLoader();
          this.errorMessage = "Identifiants non valides";
        }
      }
    },

    handleRouteRedirect() {
      const path = "/" + this.$route.path.split("/")[1];

      if (
        ["/sign-in", "/account-activation", "/forgot-password"].includes(path)
      ) {
        this.$router.push({ path: "/" });
      }

      /* if (
        this.$store.getters.userType === "Pharmacist" &&
        ["/contacter-un-pharmacien", "/profil"].includes(this.$route.path)
      ) {
        this.$router.push({ path: "/" });
      } */
    },

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
    },
    async resetPwd() {
      if (this.$refs.forgotPwd.validate() && !this.isProcessing) {
        this.errorMessage = null;
        this.isProcessing = true;

        const [err] = await to(this.$auth.passwordForgotten(this.mail));

        if (err) {
          this.errorMessage =
            "Une erreur est survenue. Veuillez réessayer plus tard";
          this.hideLoader();
        } else {
          const mail = this.mail;

          const toogleSnackBar = () =>
            this.$store.commit(
              TOGGLE_SNACKBAR,
              `un mail a été envoyé à ${mail}, vous permettant de modifier votre mot de passe`
            );

          this.hideLoader(() => {
            this.closeDialog();
            toogleSnackBar();
          });
        }
      }
    }
  }
};
</script>
