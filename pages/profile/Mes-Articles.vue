<template>
  <div>
    <v-container>
      <v-layout row wrap pa-0>
        <v-flex xs12>
          <h2 class="content-center title-section-huge text--baseColor">
            Mes articles sauvegardés
          </h2>
        </v-flex>
        <v-flex xs2>
          <v-select
            :items="orders"
            :loading="loadingSelect"
            label="Trier par"
            flat
            solo
            hide-details
            @change="sortArticle"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <v-alert v-model="alert" dismissible type="error">{{
      errorMessage
    }}</v-alert>
    <client-only>
      <v-container pt-0 mt-0 fluid grid-list-xl>
        <v-layout row wrap>
          <template v-if="articles.length > 0">
            <v-flex
              v-for="(article, i) in articlesWithImages"
              :key="article.id"
              xs12
              :style="
                i < articles.length - 1
                  ? 'border-bottom: inset 1px #ada9a8'
                  : ''
              "
            >
              <v-container ma-0 fluid fill-height>
                <v-layout row wrap align-center>
                  <v-flex xs5>
                    <v-img
                      :src="article.high_quality"
                      :lazy-src="article.low_quality"
                    ></v-img>
                  </v-flex>
                  <v-flex pl-3 xs5 class="text--baseColor" align-self-start>
                    <h2
                      class="title-section-huge content-pointer pb-5"
                      @click="openArticle(article.slug)"
                    >
                      {{ article.title }}
                    </h2>
                    <span class="text-content pt-5"
                      >Ajouté le : {{ formatDate(article.likedAt) }}</span
                    ></v-flex
                  >
                  <v-flex
                    xs2
                    class="content-center"
                    @click="deleteArticleFromFavorite(article)"
                  >
                    <v-icon class="content-pointer" size="45" color="red"
                      >fas fa-minus-circle</v-icon
                    >
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </template>
          <v-flex v-else xs12
            ><div class="content-center text--section text--baseColor">
              Vous n'avez encore aucun articles en favoris
            </div></v-flex
          >
        </v-layout>
      </v-container>
    </client-only>
  </div>
</template>

<script>
import to from "await-to-js";
import get from "lodash.get";
import { TOGGLE_SNACKBAR } from "../../store/types";

import { getYoutubeCoverImage } from "../../helpers";

import ArticlePreview from "~/components/blog/ArticlePreview";

export default {
  name: "Mes-Articles",
  middleware: "connected",
  head() {
    return {
      title: "Mes articles sauvegardés",
      meta: [
        {
          hid: "my-articles",
          name: "description",
          content: "Mes articles"
        }
      ]
    };
  },

  components: {
    ArticlePreview
  },
  data: () => ({
    alert: false,
    errorMessage: null,
    orders: [
      { text: "Les plus récents", value: { sort: "createdAt", order: "DESC" } },
      { text: "Les plus anciens", value: { sort: "createdAt", order: "ASC" } },
      { text: "Les plus vue", value: { sort: "views", order: "DESC" } },
      { text: "Les moins vue", value: { sort: "views", order: "ASC" } },
      { text: "Sauvegarde récente", value: { sort: "likedAt", order: "ASC" } },
      { text: "Sauvegarde ancienne", value: { sort: "likedAt", order: "DESC" } }
    ],
    loadingSelect: false
  }),

  computed: {
    articlesWithImages() {
      return this.articles.map(article => ({
        ...article,
        ...this.getCoverImage(article)
      }));
    }
  },

  methods: {
    openArticle(slugId) {
      this.$router.push(`/blog/${slugId}`);
    },

    getCoverImage(article) {
      return article.picture
        ? { high_quality: article.picture, low_quality: "/images/empty.jpg" }
        : getYoutubeCoverImage(article.youtubeVideoId);
    },

    formatDate(articleDate) {
      if (!articleDate) {
        return "";
      }

      const date =
        typeof articleDate === "string" ? parseInt(articleDate) : articleDate;

      return this.$moment(new Date(date)).format("Do MMMM YYYY");
    },

    async sortArticle(value) {
      this.loadingSelect = true;
      const filters = { ...this.$route.query, ...value, onlyLiked: true };
      const [e, articles] = await to(this.$blog.search(filters));

      setTimeout(() => {
        this.loadingSelect = false;
        if (articles) {
          this.articles = articles;
          this.$router.push({
            path: "/profile/mes-articles",
            query: { ...this.$route.query, ...value }
          });
        }
      }, 1500);
    },

    handleLike(article, value) {
      if (article) {
        article.like = value;
      }
    },
    handleAutocompleteSearch({ articles, q }) {
      this.articles = articles;

      this.$router.push({
        path: "/profile/mes-articles",
        query: { ...this.$route.query, q }
      });
    },
    async deleteArticleFromFavorite(article) {
      const [e] = await to(this.$blog.unlikeArticle(article.id));

      if (e) {
        this.errorMessage =
          "Une erreur est survenue veuillez réessayer ultérieurement";
        this.alert = true;
        return;
      }

      this.articles = this.articles.filter(a => article.id !== a.id);

      this.$store.commit(
        TOGGLE_SNACKBAR,
        `l'article ${article.title} a été retiré de vos favoris`
      );
    }
  },
  async asyncData({ app, query }) {
    const sort = get(query, "sort", "likedAt");

    const filters = {
      limit: 15,
      sort,
      order: "DESC",
      onlyLiked: true,
      ...query
    };
    const [e, res] = await to(app.$blog.search(filters));

    const articles = res ? res : [];

    return {
      articles,
      filters
    };
  }
};
</script>
