<template>
  <v-card
    color="default-grey lighten-4"
    hover
    flat
    height="370"
    class="articlePreview-card"
  >
    <div>
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
        height="130"
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
    </div>

    <v-container pt-1 mt-0>
      <v-layout row wrap>
        <v-flex pt-2 pb-0 mb-0 offset-xs1 xs9 class="content-center">
          <span class="text--normal text--baseColor text-futura pb-0 mb-0"
            >{{ formatCreationDate() }} - {{ readingTime() }}</span
          >
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                size="17"
                v-on="on"
                @click="showShareIcons = !showShareIcons"
                ><v-icon color="default-grey lighten-1" size="15"
                  >fas fa-share-square</v-icon
                ></v-btn
              >
            </template>
            <span>Partager</span>
          </v-tooltip>
          <v-slide-y-transition>
            <share-article-icons
              v-show="showShareIcons"
              :article-id="articleId"
              :article-title="title"
            />
          </v-slide-y-transition>
        </v-flex>
        <v-flex v-show="!showShareIcons" xs12 pt-1></v-flex>

        <v-flex xs12 px-2 pt-0 mt-0>
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
              >{{ getTroncateTitle(title) }}</span
            >
          </h1>
        </v-flex>
        <v-flex xs12 align-self-end> </v-flex>
      </v-layout>
    </v-container>

    <div class="articlePreview-buttonsHolder pt-1">
      <div>
        <span class="articlePreview-buttonEye pa-1 text-futura text--baseColor">
          <v-icon size="20">far fa-eye</v-icon> 18
        </span>
        <span class="articlePreview-buttonLike pa-1">
          <v-icon
            class="content-pointer"
            @click="like = !like"
            :color="like ? 'default-green' : 'default-grey'"
            >{{ like ? "fas fa-heart" : "far fa-heart" }}</v-icon
          >
        </span>
      </div>
    </div>
  </v-card>
</template>

<script>
import { getYoutubeCoverImage, getReadingTime } from "../../helpers";
const ShareArticleIcons = () => import("./ShareArticleIcons");

const TITLE_MAX_LENGTH = 50;
export default {
  name: "ArticlePreview",
  components: { ShareArticleIcons },
  props: {
    articleId: String | Number,
    videoId: String,
    image: String,
    title: String,
    text: String,
    creationDate: Date,
    isLike: Boolean
  },
  data() {
    return {
      playerVisible: false,
      loaderVisible: false,
      player: null,
      showShareIcons: false
    };
  },
  computed: {
    coverImage() {
      return this.videoId
        ? getYoutubeCoverImage(this.videoId)
        : { high_quality: this.image, low_quality: "/images/empty.jpg" };
    },
    like: {
      get() {
        return this.isLike;
      },
      set(value) {
        this.$emit("articlePreview::like", value);
      }
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
    },

    getTroncateTitle(title) {
      if (title && title.length > TITLE_MAX_LENGTH) {
        return `${title.substring(0, TITLE_MAX_LENGTH)}...`;
      }
      return title;
    }
  }
};
</script>
