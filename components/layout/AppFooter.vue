<template>
  <div>
    <cookie-banner />
    <v-footer dark height="auto">
      <div class="footer">
        <v-container grid-list-xl align-center>
          <v-layout row wrap align-center class="my-3 mx-3">
            <v-flex offset-sm1 sm2 xs12>mec</v-flex>
            <v-flex sm6 xs12>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center">
                    [BlaBlaPHARMA image]
                  </div>
                </v-card-title>
                <v-card-text class="justify-center text-xs-center"
                  >La plateforme qui vous permet de discuter directement avec un
                  pharmacien proche de chez vous !</v-card-text
                >
              </v-card>
              <v-card-text class="text-xs-center">
                <hr class="divider" />
                <div class="pt-2">+33 (0)6 37 39 85 43</div>
                <div>contact@blablapharma.fr</div>
                <div class="pt-3">
                  <span v-for="icon in icons" :key="icon.name" class="pr-3">
                    <v-icon large>fab fa-{{ icon.name }}</v-icon>
                  </span>
                </div>
              </v-card-text>
            </v-flex>
            <v-flex sm2 xs12
              ><span class="text--titlesection">Title</span>ok</v-flex
            >
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
        { name: "linkedin-in", href: "" },
        { name: "youtube", href: "" }
      ]
    };
  }
};
</script>
