<template>
  <div>
    <responsive-parallax
      :src="require('~/assets/images/engagement.jpg')"
      :max-height="400"
      :min-height="350"
      class="mt-0 pt-0 hidden-sm-and-down"
      user-overlay
    >
      <v-container grid-list-xl fluid fill-height>
        <v-layout row wrap align-center class="scroll-y content-commonHeight">
          <v-flex
            v-for="engagement in engagements"
            md6
            lg3
            :key="engagement.title"
          >
            <v-card
              class="pt-5 pb-1"
              flat
              :height="$vuetify.breakpoint.smAndDown ? 280 : 300"
            >
              <v-card-text class="text-xs-center mt-1 pb-1">
                <v-icon medium class="text--baseColor">{{
                  engagement.icon
                }}</v-icon>
              </v-card-text>
              <v-card-title class="mt-0 pt-0 pb-1 layout justify-center">
                <div class="text-xs-center text--black ">
                  <span class="title-section-small">{{
                    engagement.title.toUpperCase()
                  }}</span>
                </div>
              </v-card-title>
              <hr class="divider divider-dark" />
              <v-card-text>
                <div class="text--baseColor text--section">
                  {{ engagement.firstParagraph }}
                </div>
                <div class="mt-3 text--section text--baseColor">
                  {{ engagement.secondParagrah }}
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </responsive-parallax>
    <div class="hidden-md-and-up home--mobile">
      <v-container fluid grid-list-lg fill-height>
        <v-layout row wrap align-center>
          <v-flex
            v-for="engagement in engagements"
            sm10
            offset-sm1
            :key="engagement.title"
          >
            <v-card
              class="pt-5 pb-1"
              flat
              :height="$vuetify.breakpoint.smAndDown ? 280 : 300"
            >
              <v-card-text class="text-xs-center mt-1 pb-1">
                <v-icon medium class="text--baseColor">{{
                  engagement.icon
                }}</v-icon>
              </v-card-text>
              <v-card-title class="mt-0 pt-0 pb-1 layout justify-center">
                <div class="text-xs-center text--black ">
                  <span class="title-section-small">{{
                    engagement.title.toUpperCase()
                  }}</span>
                </div>
              </v-card-title>
              <hr class="divider divider-dark" />
              <v-card-text>
                <div class="text--baseColor text--section">
                  {{ engagement.firstParagraph }}
                </div>
                <div class="mt-3 text--section text--baseColor">
                  {{ engagement.secondParagrah }}
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
const ResponsiveParallax = () => import("./ResponsiveParallax");
export default {
  name: "EngagementSection",
  components: { ResponsiveParallax },
  data() {
    return {
      engagements: [
        {
          icon: "fab fa-creative-commons-nc-eu",
          title: "gratuité",
          firstParagraph: "Votre santé n'a pas de prix !",
          secondParagrah:
            "Nos pharmaciens s’engagent bénévolement pour vous apporter le meilleur conseil."
        },
        {
          icon: "far fa-check-square",
          title: "conformité",
          firstParagraph:
            "Pas toujours facile de trouver des informations fiables et vérifiées.",
          secondParagrah:
            "Ici vos interlocuteurs sont tous détenteurs du diplôme de Docteur en Pharmacie."
        },
        {
          icon: "fa fa-map-marker-alt",
          title: "proximité",
          firstParagraph: "Des pharmaciens proches de vous où que vous soyez.",
          secondParagrah:
            "Chez vous, au travail ou en vacances, vos questions n'attendent pas ! "
        },
        {
          icon: "security",
          title: "sécurité",
          firstParagraph:
            "Chez nous, vos données personnelles sont bien gardées !",
          secondParagrah:
            "BlaBlaPHARMA répond à toutes les exigences de la loi RGPD."
        }
      ]
    };
  }
};
</script>
