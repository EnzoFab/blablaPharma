<template>
  <v-card
    color="default-grey lighten-4"
    hover
    flat
    :height="height"
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
          <template v-show="!hideShareIcons">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-show="!hideShareIcons"
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
          </template>
          <v-slide-y-transition>
            <share-article-icons
              v-show="showShareIcons && !hideShareIcons"
              :slug-id="slugId"
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
          <v-icon size="20">far fa-eye</v-icon> {{ views }}
        </span>
        <span
          v-show="$store.getters.isLoggedIn"
          class="articlePreview-buttonLike pa-1"
        >
          <v-icon
            class="content-pointer"
            @click="likeArticle"
            :color="like ? 'default-green' : 'default-grey'"
            >{{ like ? "fas fa-heart" : "far fa-heart" }}</v-icon
          >
        </span>
      </div>
    </div>
  </v-card>
</template>

<script>
import to from "await-to-js";
import { getYoutubeCoverImage, getReadingTime } from "~/helpers";
import { TOGGLE_SNACKBAR } from "~/store/types";

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
    creationDate: Date | String,
    //likes: Number | String,
    isLike: Boolean,
    views: Number | String,
    height: { type: String | Number, default: 370 },
    slugId: String,
    hideShareIcons: { type: Boolean, default: false }
  },
  data() {
    return {
      playerVisible: false,
      loaderVisible: false,
      player: null,
      showShareIcons: false,
      like: this.isLike
    };
  },
  computed: {
    coverImage() {
      const high_quality = this.image ? this.image : "/images/empty.jpg";

      return this.videoId
        ? getYoutubeCoverImage(this.videoId)
        : { high_quality, low_quality: "/images/empty.jpg" };
    }
  },

  methods: {
    async likeArticle() {
      const [e, res] = await to(this.$blog.likeArticle(this.articleId));

      if (e && !res) {
        return;
      }

      this.like = !this.like;

      if (this.like) {
        this.$store.commit(
          TOGGLE_SNACKBAR,
          `${this.getTroncateTitle(this.title, 20)} a été ajouté à vos favoris`
        );
      }
    },

    openFullArticle() {
      this.$router.push(`/blog/${this.slugId}`);
    },

    readingTime() {
      const time = getReadingTime(this.text);
      return `${time} Min`;
    },

    formatCreationDate() {
      const date =
        typeof this.creationDate === "string"
          ? parseInt(this.creationDate)
          : this.creationDate;

      return this.$moment(new Date(date)).format("Do MMMM YYYY");
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

    getTroncateTitle(title, size = TITLE_MAX_LENGTH) {
      if (title && title.length > size) {
        return `${title.substring(0, size)}...`;
      }
      return title;
    }
  }
};
</script>
