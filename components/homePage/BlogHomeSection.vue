<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap pb-3 class="content-center">
      <v-flex xs12 class=" text--baseColor" pb-4>
        <h1 class="title-main">BLOG</h1>
        <span class="text-content"
          >bien s'informer grâce à un contenu claire et ludique</span
        >
      </v-flex>
      <template v-if="posts.length > 0">
        <v-flex v-for="post in posts" :key="post.title" md4 sm12 pb-3>
          <v-card
            flat
            :to="post.href"
            raised
            style="border: solid 1px lightgray"
            nuxt
          >
            <v-img
              :src="post.picture.high_quality"
              :lazy-src="post.picture.low_quality"
              :alt="post.title + ' image'"
              aspect-ratio="1.90"
              style="border-bottom: solid 1px lightgray"
            >
              <v-container fluid fill-height>
                <v-layout row wrap align-center>
                  <v-flex xs12 class="content-center">
                    <v-avatar color="default-green" tile size="60">
                      <v-icon color="white" size="40">fas fa-play</v-icon>
                    </v-avatar>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <h3 class="px-3 py-3 text-truncate">{{ post.title }}</h3>
          </v-card>
        </v-flex>
      </template>
      <v-flex v-else>
        <div class="text-content text--baseColor content-center">
          Il n'y a pas encore d'articles disponibles
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import to from "await-to-js";
import { getYoutubeCoverImage } from "~/helpers";

export default {
  name: "BlogHomeSection",
  data() {
    return {
      articles: []
    };
  },
  computed: {
    posts() {
      return this.articles.map(article => {
        const href = `/blog/${article.slug}`;
        const picture = article.picture
          ? { high_quality: article.picture, low_quality: "/images/empty.jpg" }
          : getYoutubeCoverImage(article.youtubeVideoId);
        const title = article.title;
        return { title, picture, href };
      });
    }
  },
  async mounted() {
    const [e, articles] = await to(
      this.$blog.search({ limit: 3, sort: "views" })
    );

    if (e) {
      return;
    }

    this.articles = articles;
  }
};
</script>
