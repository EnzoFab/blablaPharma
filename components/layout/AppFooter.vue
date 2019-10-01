<template>
  <div>
    <cookie-banner />
    <v-footer dark height="auto">
      <div class="footer text--section">
        <v-container grid-list-xs fluid fill-height>
          <v-layout row wrap :mx-3="$vuetify.breakpoint.smAndUp" align-center>
            <v-flex
              offset-xs2
              xs8
              v-show="$vuetify.breakpoint.smAndUp"
              class="text-xs-center"
            >
              <img
                src="/images/logo-footer.png"
                alt="footer icon"
                class="blabla-logo--small"
              />
            </v-flex>
            <v-flex sm3 xs12 :pl-5="$vuetify.breakpoint.smAndUp">
              <div
                v-for="element in leftSectionElements"
                :class="{
                  'mb-2': true,
                  'text-xs-center': $vuetify.breakpoint.xs,
                  'text-xs-left': $vuetify.breakpoint.smAndUp
                }"
              >
                <nuxt-link
                  v-if="element.nuxtLink"
                  :to="element.href"
                  class="text-no-decoration white--text"
                  >{{ element.text }}</nuxt-link
                >
                <a
                  v-else
                  :href="element.href"
                  class="text-no-decoration white--text"
                  >{{ element.text }}</a
                >
              </div>
            </v-flex>
            <v-flex
              sm6
              xs12
              :px-4="$vuetify.breakpoint.smAndUp"
              :pt-4="$vuetify.breakpoint.xs"
            >
              <div class="content-center">
                <img
                  v-show="$vuetify.breakpoint.xs"
                  src="/images/logo-footer.png"
                  alt="footer icon"
                  class="blabla-logo--small"
                />

                <div class="text-xs-center  white--text">
                  La plateforme qui vous permet de discuter directement avec un
                  pharmacien proche de chez vous !
                </div>
              </div>
              <div class="text-xs-center">
                <hr class="divider my-2" />
                <a
                  href="mailto:contact@blablapharma.fr"
                  class="white--text text-no-decoration"
                  >contact@blablapharma.fr</a
                >
                <v-container class="pt-3">
                  <a
                    v-for="icon in icons"
                    :key="icon.name"
                    class="pr-3 text-no-decoration"
                    :href="icon.href"
                  >
                    <v-icon size="30">fab fa-{{ icon.name }}</v-icon>
                  </a>
                </v-container>
              </div>
            </v-flex>
            <v-flex
              sm3
              xs12
              :class="{
                'mb-2': true,
                'text-xs-center pt-4': $vuetify.breakpoint.xs,
                'text-xs-right': $vuetify.breakpoint.smAndUp
              }"
              :pr-5="$vuetify.breakpoint.smAndUp"
            >
              <div v-for="element in rightSectionElements" class="mb-2">
                <nuxt-link
                  v-if="element.nuxtLink"
                  :to="element.href"
                  class="text-no-decoration white--text"
                  >{{ element.text }}</nuxt-link
                >

                <a
                  v-else
                  :href="element.href"
                  class="text-no-decoration white--text"
                  :target="element.blank ? '_blank' : ''"
                  >{{ element.text }}</a
                >
              </div>
            </v-flex>
            <v-flex offset-xs2 xs8 class="content-center" mt-4
              >Copyright © BlaBlaPHAMA 2019, Tous droits réservés -
              BlaBlaPHARMA.fr - Montpellier xxxxx
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-footer>
  </div>
</template>

<script>
import CookieBanner from "./CookieBanner";
export default {
  name: "AppFooter",
  components: { CookieBanner },
  data() {
    return {
      icons: [
        { name: "facebook-f", href: "" },
        { name: "instagram", href: "" },
        { name: "youtube", href: "" }
      ],
      leftSectionElements: [
        { text: "Qui sommes nous ?", href: "/more", nuxtLink: true },
        {
          text: "Vous êtes pharmacien ?",
          href: "/vous-etes-pharmacien",
          nuxtLink: true
        },
        { text: "Blog", href: "/blog", nuxtLink: true },
        { text: "F.A.Q", href: "/faq", nuxtLink: true },
        {
          text: "Contact",
          href: "https://blablapharma.wixsite.com/blablapharma/blog"
        }
      ],
      rightSectionElements: [
        { text: "Droits des patients", href: "" },
        { text: "Protection de vos données", href: "" },
        { text: "Mention légales", href: "" },
        { text: "Politique de confidentialité", href: "" },
        {
          text: "Conditions générales de services",
          href: "/files/general_terms_of_use.pdf",
          blank: true
        },
        {
          text: "Gestion des cookies",
          href: "/files/cookie_chart.pdf",
          blank: true
        }
      ]
    };
  }
};
</script>
