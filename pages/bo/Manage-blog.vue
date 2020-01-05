<template>
  <v-container fluid pb-5>
    <h1 class="content-center text--baseColor">
      Under construction

      <v-card>
        <v-form v-model="formValid" ref="newPostForm" @submit.prevent="addPost">
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs5 offset-xs1>
                <v-text-field
                  v-model.trim="fields.title"
                  placeholder="Titre"
                  box
                  clearable
                  flat
                  hint="Titre du post"
                  :rules="$constraints.required"
                ></v-text-field>
              </v-flex>

              <v-flex xs5>
                <v-text-field
                  @change="getVideoId"
                  placeholder="Url de la vidéo ou id de la vidéo"
                  box
                  clearable
                  flat
                  hint="Ex: l0R6l6vN-uc ou https://www.youtube.com/watch?v=l0R6l6vN-uc"
                  :rules="$constraints.required"
                ></v-text-field>
              </v-flex>
              <v-flex v-show="showLoader" xs6 offset-xs3>
                <v-progress-circular
                  indeterminate
                  color="default-green"
                  size="80"
                ></v-progress-circular>
              </v-flex>
              <v-flex
                v-if="youtubeCover"
                xs2
                offset-xs5
                v-show="fields.videoId && youtubeCover"
              >
                <v-img
                  :src="youtubeCover.high_quality"
                  :lazy-src="youtubeCover.low_quality"
                  aspect-ratio="1.3"
                ></v-img>
              </v-flex>
              <v-flex xs6 offset-xs3 class="content-center">
                <v-slide-y-transition>
                  <youtube
                    v-show="!showLoader"
                    v-if="fields.videoId"
                    :video-id="fields.videoId"
                    ref="youtube"
                    fitParent
                    resize
                    :player-vars="{ autoplay: 1 }"
                  ></youtube>
                </v-slide-y-transition>
              </v-flex>

              <v-flex offset-xs2 xs8>
                <v-btn
                  type="submit"
                  block
                  depressed
                  color="default-grey"
                  dark
                  :disabled="!formValid"
                  >Sauvegarder</v-btn
                >
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
    </h1>
  </v-container>
</template>

<script>
import { isUrl, getYoutubeCoverImage } from "../../helpers";
import { getIdFromURL } from "vue-youtube-embed";

export default {
  name: "Manage-blog",
  data() {
    return {
      fields: {
        title: null,
        videoId: null
      },
      youtubeCover: null,
      formValid: true,
      youtubeVideo: null,
      showLoader: false
    };
  },
  methods: {
    getVideoId(value) {
      this.showLoader = true;

      setTimeout(() => {
        this.showLoader = false;
      }, 1800);

      if (!value) {
        this.fields.videoId = null;
        return;
      }

      this.fields.videoId = value.trim();

      if (isUrl(value)) {
        this.fields.videoId = getIdFromURL(value);
      }

      this.youtubeCover = getYoutubeCoverImage(this.fields.videoId);
    },

    addPost() {
      // todo send field to the back end
    }
  }
  //layout: "admin"
};
</script>
