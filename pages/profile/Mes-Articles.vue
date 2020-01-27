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
    <client-only>
      <v-container pt-0 mt-0 fluid grid-list-xl>
        <v-layout row wrap>
          <template v-if="articles.length > 0">
            <v-flex
              v-for="(article, i) in articles"
              :key="article.id"
              xs12
              :style="
                i < articles.length - 1 ? 'border-bottom: inset 1px black' : ''
              "
            >
              <v-container ma-0 fluid fill-height>
                <v-layout row wrap align-center>
                  <v-flex offset-x1 xs4>
                    <article-preview
                      :article-id="article.id"
                      :creation-date="article.createdAt"
                      :image="article.picture"
                      :is-like="article.userLike"
                      :likes="article.likes"
                      :slug-id="article.slug"
                      :text="article.content"
                      :title="article.title"
                      :video-id="article.youtubeVideoId"
                      :views="article.views"
                    />
                  </v-flex>
                  <v-flex offset-xs1 xs3 class="text--baseColor title-section">
                    Ajouté le : {{ formatDate(article.likedAt) }}</v-flex
                  >
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

// todo change the request

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

  methods: {
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
