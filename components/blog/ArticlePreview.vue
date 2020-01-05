<template>
  <v-card hover flat height="350">
    <v-img
      v-show="!playerVisible"
      :src="coverImage.high_quality"
      :lazy-src="coverImage.low_quality"
      :gradient="
        !image
          ? 'to top right, rgba(100,160,255,0.25), rgba(220,230,255,.60)'
          : ''
      "
      :alt="`cover article ${title}`"
      height="120"
    >
      <v-container v-if="!image" fluid fill-height>
        <v-layout row wrap align-center>
          <v-flex xs12 class="content-center">
            <v-icon
              v-show="!loaderVisible"
              class="content-pointer"
              color="default-green"
              size="60"
              @click="showYoutubePlayer"
              >fas fa-play-circle</v-icon
            >
            <v-progress-circular
              v-show="loaderVisible"
              indeterminate
              color="default-green"
              size="60"
            ></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>

    <youtube
      v-show="playerVisible"
      :video-id="videoId"
      ref="youtube"
      fitParent
      player-height="120"
      @ready="playerReady"
    ></youtube>

    <v-container fluid pt-1 mt-0>
      <v-layout row wrap>
        <v-flex pt-3 offset-xs2 xs8 class="content-center">
          <span class="text--normal text--baseColor"
            >{{ formatCreationDate() }} - {{ readingTime() }}</span
          >
        </v-flex>
        <v-flex xs12 pa-2>
          <h1
            class="articlePreview-title content-pointer"
            @click="openFullArticle"
          >
            <span
              style="overflow: hidden;
                    text-overflow: ellipsis;
                    -moz-box-orient: vertical;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;"
              >{{ title }}</span
            >
          </h1>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { getYoutubeCoverImage, getReadingTime } from "../../helpers";

export default {
  name: "ArticlePreview",
  props: {
    articleId: String,
    videoId: String,
    image: String,
    title: String,
    text: String,
    creationDate: Date
  },
  data() {
    return {
      playerVisible: false,
      loaderVisible: false,
      player: null
    };
  },
  computed: {
    coverImage() {
      return this.videoId
        ? getYoutubeCoverImage(this.videoId)
        : { high_quality: this.image, low_quality: "/images/empty.jpg" };
    }
  },

  methods: {
    openFullArticle() {
      this.$router.push(`/blog/${this.articleId}`);
    },

    readingTime() {
      const time = getReadingTime(this.text);
      return `${time} Min`;
    },

    formatCreationDate() {
      return this.$moment(this.creationDate).format("Do MMMM YYYY");
    },

    showYoutubePlayer() {
      this.loaderVisible = true;

      setTimeout(() => {
        this.player.playVideo();
      }, 1500);

      setTimeout(() => {
        this.loaderVisible = false;
        this.playerVisible = true;
      }, 2000);
    },

    playerReady({ target }) {
      this.player = target;
    }
  }
};
</script>
