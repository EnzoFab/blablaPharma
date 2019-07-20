<template>
  <v-content>
    <section>
      <v-parallax src="/banner.jpg" height="500" dark>
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
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">
                      Des articles et des vidéos
                    </div>
                  </v-card-title>
                </v-card></v-flex
              >
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <section>
      <v-parallax src="/engagement.jpg" dark>
        <div class="overlay overlay-white">
          <v-card flat tile class="content-center content-quarterSize white">
            <div class="headline text-xs-center">
              NOS ENGAGEMENT
            </div>
          </v-card>

          <v-container grid-list-xl fluid class="px-2 mt-2">
            <v-layout row wrap>
              <v-flex
                v-for="engagement in engagements"
                sm3
                :key="engagement.title"
              >
                <v-card class="pt-5 pb-3" flat tile>
                  <v-card-text class="text-xs-center pb-1">
                    <v-icon medium>{{ engagement.icon }}</v-icon>
                  </v-card-text>
                  <v-card-title class="mt-0 pt-0 pb-1 layout justify-center">
                    <div class="text-xs-center">
                      {{ engagement.title.toUpperCase() }}
                    </div>
                  </v-card-title>
                  <hr class="divider divider-dark" />
                  <v-card-text class="">
                    <div>{{ engagement.firstParagraph }}</div>
                    <div class="mt-3">{{ engagement.secondParagrah }}</div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-parallax>
    </section>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      descriptions: [],
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
