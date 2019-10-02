<template>
  <div>
    <v-container
      v-if="!signInFinished"
      fluid
      pa-0
      grid-list-xs
      class="white"
      fill-height
    >
      <v-layout row wrap align-center>
        <div
          v-show="!signInType"
          :class="{
            'title-main title-main-rail content-align-top': !smallScreen(),
            'headline text-futura content-align-middle': smallScreen(),
            'text--baseColor mt-2 content-align content-align-center white': true
          }"
        >
          <div class="pa-2 content-center">
            Rejoignez nous
          </div>
        </div>
        <v-flex
          v-show="!signInType || isClient"
          :md6="!isClient"
          :md3="isClient"
        >
          <v-img
            src="/images/sign-in.jpg"
            :height="imageHeight"
            gradient="to top right, rgba(255,255,255,0.12), rgba(120,120,120,.14)"
            alt="Sign-in patient image"
          >
            <v-container fill-height>
              <v-layout row wrap align-center>
                <v-flex mx-2>
                  <v-btn
                    v-show="!signInType"
                    depressed
                    block
                    large
                    @click="signInType = 'PATIENT'"
                    >Je suis patient</v-btn
                  >
                  <div
                    v-show="isClient"
                    class="text-xs-center text--section white text--baseColor"
                  >
                    Patient
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-flex>
        <v-flex
          v-show="!signInType || isPharmacist"
          :md6="!isPharmacist"
          :md3="isPharmacist"
        >
          <v-img
            :height="imageHeight"
            src="/images/sign-in-pharmacist.png"
            gradient="to top right, rgba(200,215,255,0.22), rgba(5,20,120,.14)"
            alt="Sign-in Pharmacist"
          >
            <v-container fill-height>
              <v-layout row wrap align-center>
                <v-flex mx-2>
                  <v-btn
                    v-if="!isPharmacist"
                    depressed
                    block
                    large
                    color="blue-grey lighten-1"
                    dark
                    @click="signInType = 'PHARMACIST'"
                    >Je suis pharmacien
                  </v-btn>
                  <div
                    v-else
                    class="text-xs-center text--section white text--baseColor"
                  >
                    Pharmacien
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-flex>
        <v-expand-transition>
          <v-flex v-show="isClient" md9>
            <sign-in-client
              @signin-client::submit="signIn"
              :error-message="errorMessage"
              :loading="loading"
            />
          </v-flex>
        </v-expand-transition>
        <v-expand-transition>
          <v-flex v-show="isPharmacist" md9>
            <sign-in-pharmacist
              @signin-pharmacist::register="signIn"
              :error-message="errorMessage"
              :loading="loading"
            />
          </v-flex>
        </v-expand-transition>
      </v-layout>
    </v-container>
    <v-container v-else class="content-center">
      <span class="title-main title-main-rail text--baseColor">
        Inscription complète
      </span>
      <div class="text--section text--baseColor mt-3">
        Un mail a été envoyé sur votre boîte mail pour finaliser votre
        inscription.
      </div>
      <div class="content-center text--section text--baseColor mt-3">
        Je n'ai pas reçu le mail d'activation ?
        <resend-activation-mail />
      </div>
    </v-container>
  </div>
</template>

<script>
import to from "await-to-js";
import get from "lodash.get";
import flatMap from "lodash.flatmap";
import merge from "lodash.merge";
import { TOGGLE_SNACKBAR } from "../store/types";

const SignInClient = () => import("~/components/forms/SignInClient");
const SignInPharmacist = () => import("~/components/forms/SignInPharmacist");
const ResendActivationMail = () =>
  import("~/components/forms/ResendActivationMail");
export default {
  name: "Sign-In",
  head() {
    return {
      title: "Inscription",
      meta: [
        {
          hid: "Sign-in",
          name: "description",
          content: "S'inscrire sur blablapharma"
        }
      ]
    };
  },
  components: { ResendActivationMail, SignInPharmacist, SignInClient },
  data() {
    return {
      errorMessage: null,
      isProcessing: false,
      formValid: true,
      // possible values PATIENT | PHARMACIST
      // if PATIENT toggle PATIENT sign in otherwise PHARMACIST sign in
      signInType: null,
      signInFinished: false,
      loading: false
    };
  },
  computed: {
    imageHeight() {
      if (this.$vuetify.breakpoint.xs) {
        return 240;
      }

      if (this.$vuetify.breakpoint.mdAndDown) {
        return 450;
      }
      return 600;
    },

    isClient() {
      return this.signInType === "PATIENT";
    },

    isPharmacist() {
      return this.signInType === "PHARMACIST";
    }
  },
  methods: {
    smallScreen() {
      return this.$vuetify.breakpoint.smAndDown;
    },

    async signIn(data) {
      this.loading = true;
      this.errorMessage = null;

      const flatData = merge(...flatMap(data));

      const [e, result] = data.professionalData
        ? await to(this.$auth.registerPharmacist(flatData))
        : await to(this.$auth.registerPatient(flatData));

      if (e) {
        this.errorMessage =
          get(e, "error.error") === "E_UNIQUE_EMAIL"
            ? "L'adresse mail est déjà utilisé pour un autre compte"
            : get(e, "error.error") === "E_UNIQUE_PROFESSIONAL_ID"
            ? "Le RPPS ou numéro étudiant est déjà utilisé"
            : "Une erreur est survenue, veuillez réessayer plus tard";
      }

      if (!e && result) {
        // the register is made with success
        this.signInFinished = true;
        this.$store.commit(
          TOGGLE_SNACKBAR,
          `Votre inscription est complète, un mail de confirmation vous a été envoyé`
        );
      }

      setTimeout(() => {
        this.loading = false;
      }, 1500);
    }
  },
  middleware: "notConnected"
};
</script>
