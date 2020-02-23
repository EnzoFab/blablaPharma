<template>
  <div>
    <v-img
      :src="require('~/assets/images/blog-cover.png')"
      ::lazy-src="require('~/assets/images/blog-cover-lazy.png')"
      aspect-ratio="3.15"
      gradient="to top right, rgba(255,255,255,0.25), rgba(220,230,255,.30)"
      alt="Blog"
    >
    </v-img>
    <v-container pa-0>
      <v-layout row justify-center pt-4 pb-0>
        <v-flex offset-xs6 xs5>
          <article-autocomplete-field
            @articleAutocompletefield::search="handleAutocompleteSearch"
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap py-0 pl-3 pr-0>
        <v-flex xs6 sm6 md2>
          <v-select
            :items="orders"
            :loading="loadingSelect"
            label="Trier par"
            flat
            solo
            hide-details
            color="default-grey"
            @change="sortArticle"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <client-only>
      <div style="padding-left: 15%; padding-right: 15%">
        <v-container fluid grid-list-xl>
          <v-layout row wrap>
            <template v-if="articles.length > 0">
              <v-flex
                v-for="article in articles"
                :key="article.id"
                md4
                sm6
                xs12
              >
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
                Aucun articles pour le moment
              </div></v-flex
            >
          </v-layout>
        </v-container>
      </div>
    </client-only>
  </div>
</template>

<script>
import to from "await-to-js";
import get from "lodash.get";

const ArticlePreview = () => import("~/components/blog/ArticlePreview");
const ArticleAutocompleteField = () =>
  import("~/components/blog/ArticleAutocompleteField");
export default {
  name: "index",
  head() {
    return {
      title: "Blog",
      meta: [
        {
          hid: "blog",
          name: "description",
          content: "Visualizez du contenu pharmaceutique"
        }
      ]
    };
  },
  components: {
    ArticleAutocompleteField,
    ArticlePreview
  },

  data: () => ({
    orders: [
      { text: "Les plus récents", value: { sort: "createdAt", order: "DESC" } },
      { text: "Les plus anciens", value: { sort: "createdAt", order: "ASC" } },
      { text: "Les plus vus", value: { sort: "views", order: "DESC" } },
      { text: "Les moins vus", value: { sort: "views", order: "ASC" } }
    ],
    loadingSelect: false
  }),

  methods: {
    async sortArticle(value) {
      this.loadingSelect = true;
      const filters = { ...this.$route.query, ...value };
      const [, articles] = await to(this.$blog.search(filters));

      setTimeout(() => {
        this.loadingSelect = false;
        if (articles) {
          this.articles = articles;
          this.$router.push({
            path: "/blog",
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
        path: "/blog",
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

    /*const articles = [
      {
        id: 1,
        title: "Mon premier article",
        videoId: "ZVgdQHA_IH4",
        text: null,
        date: new Date(),
        like: false
      },
      {
        id: 2,
        title:
          "Another for me   eeerer  njenrejnrk tnejtnektrn  rjtnrtjnt (ytjnjertnrj tyrjntjrn ynrjy",
        videoId: "OSmSNK7Rano",
        text: null,
        date: new Date(),
        like: true
      },
      {
        id: 4,
        title: "Another one",
        videoId: "OSmSNK7Rano",
        text: "A simple texte for you to understand something young guy",
        date: new Date(),
        like: true
      },
      {
        id: 3,
        title: "Another one",
        image:
          "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
        text: null,
        date: new Date(),
        like: false
      }
    ]; */

    return {
      articles,
      filters
    };
  }
};
</script>
