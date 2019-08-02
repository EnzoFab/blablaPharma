<template>
  <div>
    <v-container fluid pa-0 grid-list-xs class="white">
      <v-layout row wrap>
        <div
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
        <v-flex md6>
          <v-img
            src="/signin.jpg"
            :height="imageHeight"
            gradient="to top right, rgba(255,255,255,0.12), rgba(120,120,120,.14)"
          >
            <v-container fill-height fluid>
              <v-layout row wrap align-center>
                <v-flex class="content-center mx-5">
                  <v-btn depressed block large>Je suis client</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-flex>
        <v-flex md6>
          <v-img
            :height="imageHeight"
            src="/banner.jpg"
            gradient="to top right, rgba(200,215,255,0.22), rgba(5,20,120,.14)"
          >
            <v-container fluid fill-height>
              <v-layout row wrap align-center>
                <v-flex class="content-center mx-5">
                  <v-btn depressed block large color="blue-grey lighten-1" dark
                    >Je suis pharmacien
                    <v-icon right>far fa-laptop-medical</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Sign-In",
  data() {
    return {
      errorMessage: null,
      isProcessing: false,
      formValid: true,
      mail: "",
      password: ""
    };
  },

  computed: {
    imageHeight() {
      const isSmallScreen = this.$vuetify.breakpoint.smAndDown;
      return isSmallScreen ? 240 : 600;
    },
    smallScreen() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },
  methods: {
    signIn() {}
  }
};
</script>

<style scoped></style>
