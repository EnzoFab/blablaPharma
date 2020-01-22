<template>
  <v-container fluid grid-list-xl px-3>
    <v-layout row wrap px4>
      <v-flex offset-xs3 xs6>
        <article-autocomplete-field
          @articleAutocompletefield::search="handleAutocompleteSearch"
        />
      </v-flex>
      <v-flex xs2>
        <v-btn fab outline color="blue" @click="showDialog = true">
          <v-icon>fas fa-plus</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs8 offset-xs2>
        <v-alert v-model="showError" type="error" dismissible outline
          >{{ errorMessage }} Rééssayez ultérieurement.</v-alert
        >
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
          <v-btn
            icon
            color="green"
            medium
            outline
            @click="updateArticle(article)"
          >
            <v-icon>fas fa-edit</v-icon>
          </v-btn>
          <article-preview
            :article-id="article.id"
            :creation-date="article.createdAt"
            :image="article.picture"
            :is-like="article.like"
            :slug-id="article.slug"
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
    <article-handler
      v-model="showDialog"
      :article-id="selectedArticle ? selectedArticle.id : null"
      :default-content="selectedArticle ? selectedArticle.content : null"
      :default-key-words="selectedArticle ? selectedArticle.keywords : []"
      :default-picture="selectedArticle ? selectedArticle.picture : null"
      :default-title="selectedArticle ? selectedArticle.title : null"
      :default-youtube-video-id="
        selectedArticle ? selectedArticle.youtubeVideoId : null
      "
      @articleHandler::save="handleSave"
    />
  </v-container>
</template>

<script>
import to from "await-to-js";
import { TOGGLE_SNACKBAR } from "../../store/types";

import ArticlePreview from "~/components/blog/ArticlePreview";
import ArticleHandler from "../../components/blog/ArticleHandler";
import ArticleAutocompleteField from "../../components/blog/ArticleAutocompleteField";

export default {
  name: "Manage-blog",
  components: {
    ArticleAutocompleteField,
    ArticleHandler,
    ArticlePreview
  },

  data() {
    return {
      showDialog: false,
      selectedArticle: null,
      showError: false,
      errorMessage: null
    };
  },

  methods: {
    handleAutocompleteSearch({ articles }) {
      this.articles = article;
    },

    updateArticle(article) {
      this.selectedArticle = article;
      this.showDialog = true;
    },

    async handleSave(article) {
      if (!this.selectedArticle) {
        const [err, createdArticle] = await to(
          this.$blog.createArticle(article)
        );

        this.showDialog = false;

        if (err) {
          this.showError = true;
          this.errorMessage =
            "Une erreur est survenue l'article n'a pas pu être créé.";
          return;
        }

        if (!err && createdArticle) {
          this.articles = [createdArticle, ...this.articles];
        }

        this.$store.commit(
          TOGGLE_SNACKBAR,
          `L'article "${createdArticle.title}" a été créé`
        );

        return;
      }

      const [err, updatedArticle] = await to(
        this.$blog.updateArticle(article.id, article)
      );

      this.showDialog = false;

      if (err) {
        this.showError = true;
        this.errorMessage =
          "Une erreur est survenue l'article n'a pas pu être mis à jour";
        return;
      }

      this.$store.commit(
        TOGGLE_SNACKBAR,
        ` L'article ${updatedArticle.title} a été mis à jour avec succès`
      );

      this.articles = this.articles.map(e => {
        if (e.id === updatedArticle.id) {
          return { ...updatedArticle };
        }
        return e;
      });
    },

    async deleteArticle(articleId) {
      const [e] = await to(this.$blog.deleteArticle(articleId));

      if (e) {
        this.showError = true;
        this.errorMessage =
          "Une erreur est survenue l'article n'a pas pu être supprimé.";
        return;
      }

      this.articles = this.articles.filter(article => article.id !== articleId);

      this.$store.commit(
        TOGGLE_SNACKBAR,
        "L'article a été supprimé avec succès"
      );
    }
  },

  watch: {
    showDialog(newVal) {
      if (!newVal) {
        this.selectedArticle = null;
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
