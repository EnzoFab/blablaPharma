<template>
  <v-container fluid grid-list-xl px-3>
    <v-layout row wrap px4>
      <v-flex offset-xs3 xs6>
        <v-text-field
          placeholder="replace me by the autocomplete"
          box
        ></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-btn fab outline color="blue" @click="showDialog = true">
          <v-icon>fas fa-plus</v-icon>
        </v-btn>
      </v-flex>

      <v-spacer></v-spacer>
      <template v-if="articles.length > 0">
        <v-flex v-for="article in articles" xs6 sm4 md3 :key="article.id">
          <v-btn
            icon
            color="red"
            medium
            outline
            @click="deleteArticle(article.id)"
          >
            <v-icon>fas fa-trash</v-icon>
          </v-btn>
          <v-btn icon color="green" medium outline>
            <v-icon>fas fa-edit</v-icon>
          </v-btn>
          <article-preview
            :article-id="article.id"
            :creation-date="article.createdAt"
            :image="article.picture"
            :is-like="article.like"
            :text="article.content"
            :title="article.title"
            :video-id="article.youtubeVideoId"
            :views="article.views"
          />
        </v-flex>
      </template>
      <v-flex v-else xs12
        ><div class="content-center text--section text--baseColor">
          Aucun articles, penser à en ajouter
        </div></v-flex
      >
    </v-layout>
    <article-handler v-model="showDialog" @articleHandler::save="handleSave" />
  </v-container>
</template>

<script>
import to from "await-to-js";
import { TOGGLE_SNACKBAR } from "../../store/types";

import ArticlePreview from "../../components/blog/ArticlePreview";
import ArticleHandler from "../../components/blog/ArticleHandler";

export default {
  name: "Manage-blog",
  components: {
    ArticleHandler,
    ArticlePreview
  },

  data() {
    return {
      showDialog: false,
      selectedArticle: null
    };
  },

  methods: {
    async handleSave(article) {
      if (!this.selectedArticle) {
        const [err, createdArticle] = await to(
          this.$blog.createArticle(article)
        );

        if (!err && createdArticle) {
          this.articles = [createdArticle, ...this.articles];
          this.showDialog = false;
        }
      }
    },

    async deleteArticle(articleId) {
      const [e] = await to(this.$blog.deleteArticle(articleId));

      if (!e) {
        this.articles = this.articles.filter(
          article => article.id !== articleId
        );

        this.$store.commit(
          TOGGLE_SNACKBAR,
          "L'article a été supprimé avec succès"
        );
      }
    }
  },

  async asyncData({ app }) {
    const [err, result] = await to(
      app.$blog.search({
        limit: 20
      })
    );
    const articles = result ? result : [];

    return {
      articles
    };
  }

  //layout: "admin"
};
</script>
