<template>
  <div class="mt-0 pt-0">
    <section>
      <responsive-parallax
        src="/images/banner.jpg"
        :min-height="400"
        :max-height="500"
        user-overlay
      >
        <v-container fluid fill-height>
          <v-layout row wrap align-center>
            <v-flex hidden-xs-only xs12></v-flex>
            <v-flex offset-sm6 sm6 pr-5 xs12>
              <v-card class=" pl-2 pt-1 pb-3" flat>
                <v-card-title class="pa-2">
                  <h1 class="text--baseColor title-main pt-2 ">
                    Votre pharmacien<br />
                    en ligne<br />
                    et à votre écoute
                  </h1>
                </v-card-title>
                <v-card-text>
                  <span class="text-content text--baseColor"
                    >Des réponses fiables et immédiates</span
                  >
                  <v-container pt-2 pb-0 px-0 ma-0 fluid grid-list-md>
                    <v-layout row wrap>
                      <v-flex md6 sm12>
                        <v-btn
                          color="default-green"
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
                          color="default-green"
                          block
                          ripple
                          small
                          depressed
                          dark
                          @click="showDialog = true"
                          >Comment ca marche ?</v-btn
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
      <v-layout class="pt-1 pb-2 white">
        <v-flex xs12>
          <v-container grid-list-xl fluid>
            <v-layout row wrap class="px-2">
              <v-flex
                v-for="presentation in presentations"
                xs12
                md6
                lg4
                :key="presentation.title"
                ><div>
                  <div class="text-xs-center">
                    <v-avatar tile size="130">
                      <v-img
                        :src="presentation.image"
                        :alt="presentation.alt"
                      ></v-img>
                    </v-avatar>
                  </div>
                  <div class="content-center content-padded">
                    <h2 class="title-section text--baseColor">
                      {{ presentation.title }}
                    </h2>
                    <div class="text--baseColor text--section mt-3">
                      {{ presentation.description }}
                    </div>
                  </div>
                </div></v-flex
              >
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
    <section class="mt-0">
      <engagement-section />
    </section>
    <section>
      <blog-home-section />
    </section>

    <how-it-works-dialog v-model="showDialog" />
  </div>
</template>

<script>
import HowItWorksDialog from "../components/homePage/HowItWorksDialog";
import EngagementSection from "../components/homePage/EngagementSection";
const BlogHomeSection = () => import("~/components/homePage/BlogHomeSection");
const ResponsiveParallax = () =>
  import("~/components/homePage/ResponsiveParallax");

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
  components: {
    EngagementSection,
    HowItWorksDialog,
    BlogHomeSection,
    Contact,
    ResponsiveParallax
  },
  data() {
    return {
      showDialog: false,
      presentations: [
        {
          image: "/images/network-icon.png",
          alt: "icone réseau",
          title: "Un réseau de pharmaciens",
          description:
            "Soucieux de votre santé et prêts à vous accompagner sur votre traitement ou vos pathologies."
        },
        {
          image: "/images/fiability-icon.png",
          alt: "icone fiabilité",
          title: "Des réponses fiables",
          description:
            "Et personnalisées à vos questions grâce à un service de messagerie instantanée."
        },
        {
          image: "/images/articles-icon.png",
          alt: "icone articles et vidéos",
          title: "Des articles et des vidéos",
          description:
            "Du contenu ludique et interactif pour mieux comprendre votre traitement."
        }
      ]
    };
  }
};
</script>
