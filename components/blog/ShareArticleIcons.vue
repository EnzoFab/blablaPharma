<template>
  <v-container py-0 my-0 grid-list-xs>
    <v-layout justify-center row py-0 my-0>
      <v-flex py-0 my-0 v-for="media in medias" xs2 :key="media.name">
        <a target="popup" @click="() => openWindow(media.name)">
          <v-icon :size="iconSize" :color="media.color">{{
            media.icon
          }}</v-icon>
        </a>
      </v-flex>
    </v-layout>

    <v-dialog v-model="showClipboard" width="500">
      <v-card class="pa-3">
        <v-icon medium @click="showClipboard = false">close</v-icon>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex offset-xs2 xs8>
              <v-text-field
                box
                label="Lien de l'article"
                readonly
                :value="getArticleUrl()"
              >
                <v-btn slot="append" icon @click="copyClipboard"
                  ><v-icon>fas fa-copy</v-icon></v-btn
                >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getShareUrl } from "../../helpers";
import { TOGGLE_SNACKBAR } from "../../store/types";

export default {
  name: "ShareArticleIcons",
  props: {
    articleId: String | Number,
    articleTitle: String,
    iconSize: { type: Number, default: 15 }
  },
  data: () => ({
    medias: [
      { icon: "fab fa-facebook-f", name: "facebook", color: "blue darken-4" },
      { icon: "fab fa-twitter", name: "twitter", color: "cyan lighten-1" },
      {
        icon: "fab fa-linkedin-in",
        name: "linkedIn",
        color: "light-blue darken-4"
      },
      {
        icon: "fas fa-link",
        color: "orange"
      }
    ],
    showClipboard: false
  }),
  methods: {
    getArticleUrl() {
      return `${process.env.DOMAIN}/blog/${this.articleId}`;
    },
    getUrl(media) {
      return getShareUrl[media](this.getArticleUrl(), this.articleTitle);
    },
    openWindow(media) {
      if (media) {
        window.open(this.getUrl(media), media, "width=600,height=400");
        return;
      }

      this.showClipboard = !this.showClipboard;
    },
    async copyClipboard() {
      try {
        await navigator.clipboard.writeText(this.getArticleUrl());
        this.$store.commit(TOGGLE_SNACKBAR, "Copié");
      } catch (e) {}
    }
  }
};
</script>
