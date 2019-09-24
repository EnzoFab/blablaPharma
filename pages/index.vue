<template>
  <div class="mt-0 pt-0">
    <section>
      <responsive-parallax
        src="/images/banner.jpg"
        :min-height="370"
        :max-height="500"
        user-overlay
      >
        <v-container fluid>
          <v-layout row wrap>
            <v-flex hidden-xs-only xs12 class="pb-5 pt-5"></v-flex>
            <v-flex offset-sm5 sm7 xs12>
              <v-card class=" pl-2 pt-1 pb-3" flat>
                <v-card-title class="pa-3">
                  <h1 class="text--baseColor title-main pt-2 ">
                    <span class="title-main-rail">Votre pharmacien<br /></span>
                    <span class="title-main-rail">en ligne<br /> </span>
                    <span class="title-main-rail">et à votre écoute</span>
                    <br />
                  </h1>
                </v-card-title>
                <v-card-text>
                  <span class="text-content text--baseColor"
                    >Sentez-vous en sécurité avec votre traitement</span
                  >
                  <v-container class="pa-0" fluid grid-list-sm>
                    <v-layout row wrap align-center>
                      <v-flex md6 sm12>
                        <v-btn
                          color="light-green lighten-1"
                          block
                          ripple
                          small
                          depressed
                          dark
                          nuxt
                          to="/contacter-un-pharmacien"
                          >Contacter un pharmacien</v-btn
                        >
                      </v-flex>
                      <v-flex md6 sm12>
                        <v-btn
                          color="light-green lighten-1"
                          block
                          ripple
                          small
                          depressed
                          dark
                          nuxt
                          to="/more"
                          >En savoir plus</v-btn
                        >
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </responsive-parallax>
    </section>
    <section>
      <v-layout class="py-5 white" align-center>
        <v-flex xs12>
          <v-container grid-list-xl fluid>
            <v-layout row wrap align-center class="px-2">
              <v-flex
                v-for="presentation in presentations"
                xs12
                md6
                lg4
                :key="presentation.title"
                ><v-card flat class="transparent">
                  <v-card-text class="text-xs-center">
                    <v-avatar tile size="130">
                      <v-img
                        :src="presentation.image"
                        :alt="presentation.alt"
                      ></v-img>
                    </v-avatar>
                  </v-card-text>
                  <v-card-text
                    class="justify-center content-center content-padded"
                  >
                    <h2 class="title-section text--baseColor">
                      {{ presentation.title }}
                    </h2>
                    <div class="text--baseColor text--section mt-3">
                      {{ presentation.description }}
                    </div></v-card-text
                  >
                </v-card></v-flex
              >
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
    <section class="mt-0">
      <responsive-parallax
        src="/images/engagement.jpg"
        :max-height="550"
        :min-height="500"
        class="mt-0 pt-0"
        user-overlay
      >
        <v-layout hidden-xs-only column align-center class="mt-0 transparent">
          <v-flex xs12 class="white text-xs-center mt-0 px-2">
            <div
              class="text-futura display-2 text-xs-center text--baseColor  px-5 py-2"
            >
              NOS ENGAGEMENTS
            </div>
          </v-flex>
        </v-layout>
        <v-layout hidden-sm-and-up column class="mt-0">
          <v-flex xs12 class="white text-xs-center mt-0">
            <div class="text-futura display-2 text-xs-center text--baseColor ">
              NOS ENGAGEMENTS
            </div>
          </v-flex>
        </v-layout>

        <v-container grid-list-xl fluid class="px-5 mt-2">
          <v-layout row wrap class="scroll-y content-commonHeight">
            <v-flex
              v-for="engagement in engagements"
              xs12
              md6
              lg3
              :key="engagement.title"
            >
              <v-card class="pt-5 pb-3" flat height="350">
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
                  <div class="text--baseColor text-content">
                    {{ engagement.firstParagraph }}
                  </div>
                  <div class="mt-3 text-content text--baseColor">
                    {{ engagement.secondParagrah }}
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </responsive-parallax>
    </section>
    <section>
      <v-container fluid grid-list-xl class="py-1 mb-4 pt-5">
        <v-layout row wrap algin-center class="pt-3">
          <v-flex sm5 xs12>
            <v-img src="/images/contact.jpg" alt="Contact image">
              <div class="overlay">
                <v-container bg fill-height grid-list-md text-xs-center>
                  <v-layout row wrap align-center>
                    <v-flex offset-xs3 xs6>
                      <v-icon
                        size="125"
                        color="lime lighten-1"
                        class="content-pointer"
                        @click="$router.push({ path: '/blog' })"
                        >play_circle_filled</v-icon
                      >
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
            </v-img>
          </v-flex>
          <v-flex sm7 xs12>
            <h2 class="title-main-rail">
              <span
                class="title-main-rail title-main text--baseColor hidden-xs-only"
              >
                Retrouvez des vidéos utiles à votre traitement
              </span>
              <span class="title-section text--baseColor hidden-sm-and-up">
                Retrouvez des vidéos utiles à votre traitement
              </span>
            </h2>

            <v-btn
              color="light-green lighten-1"
              ripple
              depressed
              dark
              class="mt-5"
              nuxt
              to="/blog"
              >visiter le blog</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <section>
      <responsive-parallax
        src="/images/contact.jpg"
        :min-height="700"
        :max-height="700"
        user-overlay
      >
        <contact></contact>
      </responsive-parallax>
    </section>
  </div>
</template>

<script>
const ResponsiveParallax = () => import("~/components/ResponsiveParallax");

const Contact = () => import("~/components/forms/Contact");
export default {
  head() {
    return {
      title: "BlablaPharma",
      meta: [
        {
          hid: "Page d'accueil",
          name: "description",
          content:
            "BlablaPharma permet de mettre en relation des utilisateurs et des pharmaciens"
        }
      ]
    };
  },
  components: { Contact, ResponsiveParallax },
  data() {
    return {
      presentations: [
        {
          image: "/images/network-icon.png",
          alt: "icone réseau",
          title: "Un réseau de pharmaciens",
          description:
            "Soucieux de votre santé et prêt à vous accompagner sur votre traitement ou vos pathologies."
        },
        {
          image: "/images/fiability-icon.png",
          alt: "icone fiabilité",
          title: "Des réponses fiables",
          description:
            "et personnalisées à vos questions grâce à un service de messagerie instantanée."
        },
        {
          image: "/images/articles-icon.png",
          alt: "icone articles et vidéos",
          title: "Des articles et des vidéos",
          description:
            "Du contenu ludique et interactif pour mieux comprendre votre traitement."
        }
      ],
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
