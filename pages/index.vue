<template>
  <v-content>
    <section>
      <v-parallax src="/banner.jpg" height="450" dark>
        <div class="overlay overlay-white"></div>
      </v-parallax>
    </section>
    <section>
      <v-layout class="my-5" align-center>
        <v-flex xs12>
          <v-container grid-list-xl align-center>
            <v-layout row wrap align-center class="px-2">
              <v-flex xs12 md4
                ><v-card flat class="transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >color_lens</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">
                      Un réseau de pharmaciens
                    </div>
                  </v-card-title>
                </v-card></v-flex
              >
              <v-flex xs12 md4
                ><v-card flat class="transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >color_lens</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">
                      Des réponses fiables
                    </div>
                  </v-card-title>
                </v-card></v-flex
              >
              <v-flex xs12 md4
                ><v-card flat class="transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >color_lens</v-icon
                    >
                  </v-card-text>
                </v-card></v-flex
              >
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <v-section>
      <v-parallax src="/engagement.jpg" dark>
        <div class="overlay"></div>
      </v-parallax>
    </v-section>
  </v-content>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo
  }
};
</script>
