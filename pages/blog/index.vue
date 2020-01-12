<template>
  <div>
    <v-img
      :src="require('~/assets/images/contact.jpg')"
      aspect-ratio="3.15"
      gradient="to top right, rgba(255,255,255,0.25), rgba(220,230,255,.30)"
      alt="Blog"
    >
      <v-container pt-5 fill-height>
        <v-layout align-center wrap>
          <v-flex xs12>
            <div class="content-center title-main">
              <span class="title-section-huge text--baseColor ">BLOG</span>
              <hr class="divider  mt-3 default-grey" />
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-container>
      <v-layout row justify-center>
        <v-flex offset-xs6 xs5>
          <v-text-field box hide-details label="rechercher">
            <v-btn slot="append" icon flat>
              <v-icon medium color="default-grey">search</v-icon>
            </v-btn>
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <client-only>
      <div style="padding-left: 15%; padding-right: 15%">
        <v-container fluid grid-list-xl>
          <v-layout row wrap>
            <v-flex v-for="article in articles" :key="article.id" md4 sm6 xs12>
              <article-preview
                :article-id="article.id"
                :creation-date="article.date"
                :image="article.image"
                :is-like="article.like"
                :text="article.text"
                :title="article.title"
                :video-id="article.videoId"
                @articlePreview::like="value => handleLike(article, value)"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </client-only>
  </div>
</template>

<script>
import ArticlePreview from "~/components/blog/ArticlePreview";
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
    ArticlePreview
  },

  methods: {
    handleLike(article, value) {
      if (article) {
        article.like = value;
      }
    }
  },
  asyncData() {
    const articles = [
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
    ];

    return {
      articles
    };
  }
};
</script>
