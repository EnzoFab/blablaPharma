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
            'title-main title-main-rail content-align-top': !smallScreen,
            'headline text-futura content-align-middle': smallScreen,
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
            src="/signin.jpg"
            :height="imageHeight"
            gradient="to top right, rgba(255,255,255,0.12), rgba(120,120,120,.14)"
          >
            <v-container fill-height fluid>
              <v-layout row wrap align-center>
                <v-flex class="content-center mx-5">
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
                    class="title-section-small text-futura white text--baseColor"
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
            src="/banner.jpg"
            gradient="to top right, rgba(200,215,255,0.22), rgba(5,20,120,.14)"
          >
            <v-container fluid fill-height>
              <v-layout row wrap align-center>
                <v-flex class="content-center mx-5">
                  <v-btn
                    v-show="!isPharmacist"
                    depressed
                    block
                    large
                    color="blue-grey lighten-1"
                    dark
                    @click="signInType = 'PHARMACIST'"
                    >Je suis pharmacien
                  </v-btn>
                  <div
                    v-show="isPharmacist"
                    class="title-section-small text-futura white text--baseColor"
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
              :loading="loading"
            />
          </v-flex>
        </v-expand-transition>
        <v-expand-transition>
          <v-flex v-show="isPharmacist" md9>
            <sign-in-pharmacist
              @signin-pharmacist::register="signIn"
              :loading="loading"
            />
          </v-flex>
        </v-expand-transition>
      </v-layout>
    </v-container>
    <div v-else class="content-center">
      <span class="title-main title-main-rail text--baseColor">
        Inscription complète
      </span>
      <div class="text--section text--baseColor mt-3">
        Un mail a été envoyé sur votre boîte mail pour finaliser votre
        inscription.
      </div>
    </div>
  </div>
</template>

<script>
import SignInClient from "../components/forms/SignInClient";
import SignInPharmacist from "../components/forms/SignInPharmacist";
export default {
  name: "Sign-In",
  components: { SignInPharmacist, SignInClient },
  data() {
    return {
      errorMessage: null,
      isProcessing: false,
      formValid: true,
      // possible values PATIENT | PHARMACIST
      signInType: null,
      signInFinished: false,
      loading: false
    };
  },

  computed: {
    imageHeight() {
      const isSmallScreen = this.$vuetify.breakpoint.smAndDown;
      return isSmallScreen ? 240 : 600;
    },
    smallScreen() {
      return this.$vuetify.breakpoint.smAndDown;
    },

    isClient() {
      return this.signInType === "PATIENT";
    },

    isPharmacist() {
      return this.signInType === "PHARMACIST";
    }
  },
  methods: {
    signIn(data) {
      this.loading = true;

      // todo axios request to save data

      setTimeout(() => {
        this.loading = false;
        this.signInFinished = true;
      }, 1500);
      console.log(data);
    }
  }
};
</script>
