<template>
  <div class="mt-0 pt-0">
    <section>
      <responsive-parallax
        src="/images/banner.jpg"
        :min-height="370"
        :max-height="500"
        user-overlay
      >
        <v-container fluid fill-height>
          <v-layout row wrap align-center>
            <v-flex hidden-xs-only xs12></v-flex>
            <v-flex offset-sm6 sm6 xs12>
              <v-card class=" pl-2 pt-1 pb-3" flat>
                <v-card-title class="pa-2">
                  <h1 class="text--baseColor title-main pt-2 ">
                    <span class="title-main-rail">Votre pharmacien<br /></span>
                    <span class="title-main-rail">en ligne<br /> </span>
                    <span class="title-main-rail">et à votre écoute</span>
                    <br />
                  </h1>
                </v-card-title>
                <v-card-text>
                  <span class="text-content text--baseColor"
                    >Une réponse fiable et immédiate</span
                  >
                  <v-container pt-2 pb-0 px-0 ma-0 fluid grid-list-md>
                    <v-layout row wrap align-center>
                      <v-flex md5 sm12 offset-md1>
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
                      <v-flex md5 sm12>
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
      <responsive-parallax
        src="/images/engagement.jpg"
        :max-height="400"
        :min-height="350"
        class="mt-0 pt-0"
        user-overlay
      >
        <v-container grid-list-xl fluid class="px-5 pt-2" fill-height>
          <v-layout row wrap align-center class="scroll-y content-commonHeight">
            <v-flex
              v-for="engagement in engagements"
              sm10
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
    </section>
    <section>
      <blog-home-section />
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
    <video-dialog v-model="showDialog" />
  </div>
</template>

<script>
import VideoDialog from "../components/VideoDialog";
const BlogHomeSection = () => import("~/components/BlogHomeSection");
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
  components: { VideoDialog, BlogHomeSection, Contact, ResponsiveParallax },
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
