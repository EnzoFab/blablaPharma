<template>
  <v-container fluid px-5 pb-5 style="background-color: white">
    <template v-if="article.id">
      <div class="articleFull">
        <v-container class="articleFull-wrapper">
          <v-layout row wrap align-center>
            <v-flex offset-xs2 xs8 pb-2>
              <div class="text--baseColor text-futura pl-2  pt-3 pb-5">
                <span>
                  {{ formatCreationDate() }} - {{ readingTime() }} de lecture
                </span>
              </div>
              <h1 class="title-section">
                {{ article.title }}
              </h1>
            </v-flex>
            <v-flex
              v-if="!article.youtubeVideoId && !article.picture"
              offset-xs2
            >
              <div
                v-if="article.content"
                class="text-content"
                v-html="article.content"
              ></div>
            </v-flex>
            <v-flex offset-xs2 xs8 pb-3>
              <youtube
                v-if="article.youtubeVideoId"
                :video-id="article.youtubeVideoId"
                ref="youtube"
                fitParent
                resize
                :player-vars="{ autoplay: 1 }"
              ></youtube>
              <v-img
                v-else-if="article.picture"
                :src="article.picture"
                lazy-src="/images/empty.jpg"
              ></v-img>
            </v-flex>
            <v-flex v-if="article.picture" offset-xs2 xs8>
              <div
                v-if="article.content"
                class="text-content"
                v-html="article.content"
              ></div>
            </v-flex>

            <v-flex offset-xs2 xs8>
              <v-icon small color="default-grey">far fa-eye</v-icon>
              <span class="pl-1 text--baseColor text--normal text-futura">
                Vu {{ article.views }} fois
              </span>
            </v-flex>
            <v-flex offset-xs2 xs8>
              <v-icon
                class="content-pointer"
                @click="likeArticle"
                :color="article.userLike ? 'default-green' : 'default-grey'"
                >{{
                  article.userLike ? "fas fa-heart" : "far fa-heart"
                }}</v-icon
              >
            </v-flex>
            <v-flex offset-xs2 xs8>
              <div class="articleFull-iconsWrapper py-3">
                <share-article-icons
                  :slug-id="article.slug"
                  :article-title="article.title"
                />
              </div>
            </v-flex>
          </v-layout>
        </v-container>
        <div style="float: right">
          <v-btn flat color="default-grey" nuxt href="/blog"
            >Voir tous les articles</v-btn
          >
        </div>
      </div>
    </template>
    <div v-else class="content-center">
      <v-icon color="default-grey" size="140">fas fa-capsules</v-icon>
      <div class="text--baseColor title-section-small pb-2">
        Cet article n'existe pas
      </div>
      <div>
        <v-btn flat color="default-grey" nuxt href="/blog"
          >Voir tous les articles</v-btn
        >
      </div>
    </div>

    <v-container v-if="relatedArticles.length > 0" fluid grid-list-xs>
      <span class="text--section text--baseColor">A voir aussi :</span>
      <v-layout row align-center justify-center>
        <v-flex
          xs4
          sm4
          md3
          v-for="relatedArticle in relatedArticles"
          :key="relatedArticle.id"
        >
          <article-preview
            hide-share-icons
            :article-id="relatedArticle.id"
            :creation-date="relatedArticle.createdAt"
            height="280"
            :image="relatedArticle.picture"
            :is-like="relatedArticle.userLike"
            :likes="relatedArticle.likes"
            :slug-id="relatedArticle.slug"
            :text="relatedArticle.content"
            :title="relatedArticle.title"
            :video-id="relatedArticle.youtubeVideoId"
            :views="relatedArticle.views"
            @articlePreview::like="value => handleLike(relatedArticle, value)"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import to from "await-to-js";
import get from "lodash.get";
import take from "lodash.take";

import { getReadingTime } from "~/helpers";
import { TOGGLE_SNACKBAR } from "~/store/types";

const ShareArticleIcons = () => import("~/components/blog/ShareArticleIcons");
const ArticlePreview = () => import("~/components/blog/ArticlePreview");

export default {
  head() {
    return {
      title: this.article.title ? this.article.title : "Article",
      meta: [
        {
          hid: "blog",
          name: "description",
          content: "Du contenu pharmaceutique votre disposition"
        }
      ]
    };
  },
  components: { ArticlePreview, ShareArticleIcons },
  methods: {
    async likeArticle() {
      const [e, article] = await to(this.$blog.likeArticle(this.article.id));

      if (e && !article) {
        return;
      }

      this.article = article;

      if (this.article.userLike) {
        this.$store.commit(
          TOGGLE_SNACKBAR,
          `${this.article.title} a été ajouté à vos favoris`
        );
      }
    },

    formatCreationDate() {
      if (!this.article.createdAt) {
        return "";
      }

      const date =
        typeof this.article.createdAt === "string"
          ? parseInt(this.article.createdAt)
          : this.article.createdAt;

      return this.$moment(new Date(date)).format("Do MMMM YYYY");
    },
    readingTime() {
      const time = this.article.content
        ? getReadingTime(this.article.content)
        : 0;
      return `${time} Min`;
    },

    handleLike() {}
  },
  async asyncData({ app, params, store }) {
    // if the user is connected the visitorId its id
    // otherwise we check if the user has a visitorId else we create one
    const visitorId = store.getters.isLoggedIn
      ? store.getters.connectedUser.id
      : store.state.visitorId
      ? store.state.visitorId
      : (await to(store.dispatch("generateVisitorId")))[1];

    const [e, result] = await to(
      app.$blog.getArticle(params.articleSlugId, visitorId)
    );
    const article = result ? result : {};

    const keywords = get(article, "keywords", null);

    const filters = {
      limit: 4,
      sort: "createdAt",
      order: "ASC"
    };

    // if there the article
    const [err, res] =
      keywords && keywords.length > 0
        ? await to(app.$blog.search({ ...filters, keywords }))
        : await to(app.$blog.search(filters));

    const relatedArticles = res
      ? take(
          res.filter(a => a.id !== article.id),
          3
        )
      : [];

    return { article, relatedArticles };
  }
};
</script>
