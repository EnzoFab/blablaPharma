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
      <v-container fluid grid-list-xl>
        <v-layout row wrap>
          <template v-if="articles.length > 0">
            <v-flex v-for="article in articles" :key="article.id" md3 sm4 xs4>
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
                @articlePreview::like="value => handleLike(article, value)"
              />
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
      { text: "Les moins vue", value: { sort: "views", order: "ASC" } }
    ],
    loadingSelect: false
  }),

  methods: {
    async sortArticle(value) {
      this.loadingSelect = true;
      const filters = { ...this.$route.query, ...value };
      const [e, articles] = await to(this.$blog.search(filters));

      setTimeout(() => {
        this.loadingSelect = false;
        if (articles) {
          this.articles = articles;
          this.$router.push({
            path: "/mes-articles",
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
        path: "/mes-articles",
        query: { ...this.$route.query, q }
      });
    }
  },
  async asyncData({ app, query }) {
    const sort = get(query, "sort", "createdAt");

    const filters = {
      limit: 15,
      sort,
      order: "DESC",
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
