<template>
  <div>
    <cookie-banner />
    <v-footer dark height="auto">
      <div class="footer text--section">
        <v-container grid-list-xs fluid fill-height>
          <v-layout row wrap :mx-3="$vuetify.breakpoint.smAndUp" align-center>
            <v-flex offset-xs2 xs8 class="text-xs-center hidden-xs-only">
              <img
                :src="require('~/assets/images/logo-footer.png')"
                alt="footer icon"
                class="blabla-logo--extra-small"
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
                <span
                  v-else-if="element.action"
                  class="text-no-decoration white--text content-pointer"
                  @click="element.action"
                  >{{ element.text }}</span
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
                  :src="require('~/assets/images/logo-footer.png')"
                  alt="footer icon"
                  class="blabla-logo--small hidden-sm-and-up"
                />

                <div class="text-xs-center  white--text">
                  La plateforme qui vous permet de discuter directement <br />
                  avec un pharmacien où que vous soyez !
                </div>
              </div>
              <div class="text-xs-center">
                <hr class="divider my-2" />
                <a
                  href="mailto:blablapharma@gmail.com"
                  class="white--text text-no-decoration"
                  >blablapharma@gmail.com</a
                >
                <v-container class="pt-3">
                  <a
                    v-for="icon in icons"
                    :href="icon.href"
                    :key="icon.name"
                    class="pr-3 text-no-decoration"
                    target="_blank"
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
              BlaBlaPHARMA.fr
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-footer>

    <contact v-model="showDialog" />
  </div>
</template>

<script>
const Contact = () => import("../forms/Contact");
const CookieBanner = () => import("./CookieBanner");
export default {
  name: "AppFooter",
  components: { Contact, CookieBanner },
  data() {
    return {
      showDialog: false,
      icons: [
        {
          name: "facebook-f",
          href:
            "https://www.facebook.com/Blablapharma-367660467350831/?modal=admin_todo_tour"
        },
        { name: "instagram", href: "https://www.instagram.com/blablapharma/" },
        { name: "twitter", href: "https://twitter.com/blablapharma" }
      ],
      leftSectionElements: [
        {
          text: "Vous êtes pharmacien ?",
          href: "/vous-etes-pharmacien",
          nuxtLink: true
        },
        {
          text: "Blog",
          href: "/blog",
          nuxtLink: true
        },
        { text: "F.A.Q", href: "/faq", nuxtLink: true },
        {
          text: "Contact",
          action: () => {
            this.showDialog = true;
          }
        }
      ],
      rightSectionElements: [
        {
          text: "Protection de vos données",
          href: "/files/data-protection.pdf",
          blank: true
        },
        //  { text: "Mention légales", href: "" },
        //  { text: "Politique de confidentialité", href: "" },
        {
          text: "Conditions générales de services",
          href: "/files/general-terms-of-use.pdf",
          blank: true
        },
        {
          text: "Gestion des cookies",
          href: "/files/cookie-chart.pdf",
          blank: true
        }
      ]
    };
  }
};
</script>
