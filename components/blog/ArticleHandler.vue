<template>
  <v-dialog v-model="modelDialog">
    <v-card>
      <v-icon
        class="content-pointer"
        style="float: left"
        @click="modelDialog = false"
        >close</v-icon
      >
      <div class="content-center title-section text--baseColor pt-1">
        {{ dialogTitle }}
      </div>
      <v-form
        v-model="formValid"
        lazy-validation
        ref="newPostForm"
        @submit.prevent="save"
      >
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex xs10 offset-xs1>
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

            <v-flex offset-xs1 xs10>
              <key-words v-model="fields.keywords"></key-words>
            </v-flex>

            <v-flex
              v-if="!youtubeVideoEnabled"
              align-self-center
              offset-xs1
              xs2
              key="0"
            >
              <v-btn
                @click="toggleYoutubleVideo"
                fab
                large
                outline
                color="red darken-4"
              >
                <v-icon large color="red darken-4">fab fa-youtube</v-icon>
              </v-btn>
            </v-flex>
            <template v-else>
              <v-flex xs10 offset-xs1 key="1">
                <v-text-field
                  @change="getVideoId"
                  :value="fields.youtubeVideoId"
                  placeholder="Url de la vidéo ou id de la vidéo"
                  box
                  clearable
                  flat
                  hint="Ex: l0R6l6vN-uc ou https://www.youtube.com/watch?v=l0R6l6vN-uc"
                  :rules="$constraints.required"
                ></v-text-field>
              </v-flex>
              <v-flex v-show="showLoader" xs6 offset-xs3 key="2">
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
                v-show="fields.youtubeVideoId && youtubeCover"
                key="3"
              >
                <div class="title-section-small text--baseColor pa-2">
                  Photo de couverture :
                </div>
                <v-img
                  :src="youtubeCover.high_quality"
                  :lazy-src="youtubeCover.low_quality"
                  aspect-ratio="1.3"
                ></v-img>
              </v-flex>
              <v-flex xs8 offset-xs2 class="content-center" key="4">
                <v-slide-y-transition>
                  <youtube
                    v-show="!showLoader"
                    v-if="fields.youtubeVideoId"
                    :video-id="fields.youtubeVideoId"
                    ref="youtube"
                    fitParent
                    resize
                    :player-vars="{ autoplay: 1 }"
                  ></youtube>
                </v-slide-y-transition>
              </v-flex>
            </template>

            <v-slide-y-transition>
              <v-flex v-if="!imageEnabled" xs2 offset-xs2>
                <v-btn
                  fab
                  large
                  outline
                  color="default-green darken-2"
                  @click="$refs.articleImage.click()"
                  ><v-icon large color="default-green darken-2"
                    >fas fa-image</v-icon
                  ></v-btn
                >
                <input
                  v-show="false"
                  type="file"
                  ref="articleImage"
                  accept="image/*"
                  tabindex="-1"
                  @change="handleImage"
                />
              </v-flex>
              <template v-else>
                <v-flex v-if="imagePreview" offset-xs1 xs10>
                  <div class="title-section-small text--baseColor pa-2">
                    Photo de couverture :
                  </div>
                  <v-img
                    :src="imagePreview"
                    aspect-ratio="3.3"
                    lazy-src="/images/empty.jpg"
                    alt="cover image"
                  ></v-img>
                </v-flex>
              </template>
            </v-slide-y-transition>

            <v-slide-y-transition group>
              <v-flex
                v-show="!textEnabled"
                xs2
                offset-xs2
                align-self-center
                :key="'text1'"
              >
                <v-btn
                  fab
                  outline
                  large
                  color="default-grey darken-1"
                  @click="textEnabled = true"
                >
                  <v-icon>fas fa-font</v-icon>
                </v-btn>
              </v-flex>

              <v-flex v-show="textEnabled" xs10 offset-xs1 :key="'text2'">
                <div
                  class="quill-editor"
                  v-model="fields.content"
                  v-quill:myQuillEditor="editorOption"
                ></div>
              </v-flex>
            </v-slide-y-transition>

            <v-flex offset-xs2 xs8>
              <v-btn
                type="submit"
                block
                depressed
                color="default-grey"
                :dark="formValid"
                :disabled="!formValid"
                :loading="isLoading"
                >Sauvegarder</v-btn
              >
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <alert
        v-model="showDialog"
        :text="'La taille des images ne doit pas excéder 2mo'"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import { isUrl, getYoutubeCoverImage, FILE_MAXIMUM_SIZE } from "~/helpers";
import { getIdFromURL } from "vue-youtube-embed";

const KeyWords = () => import("~/components/blog/KeyWords");
const Alert = () => import("~/components/dialogs/Alert");

export default {
  name: "ArticleHandler",
  components: {
    KeyWords,
    Alert
  },
  props: {
    articleId: String | Number,
    value: Boolean,
    defaultContent: { type: String, default: "" },
    defaultKeyWords: { type: Array, default: () => [] },
    defaultTitle: { type: String, default: "" },
    defaultPicture: { type: String | Object, default: "" },
    defaultYoutubeVideoId: { type: String, default: "" },
    dialogTitle: { type: String, default: "Nouveau article" }
  },

  data() {
    return {
      // respect the key order
      fields: {
        content: this.defaultContent,
        title: this.defaultTitle,
        picture: this.defaultPicture,
        keywords: this.defaultKeyWords,
        youtubeVideoId: this.defaultYoutubeVideoId
      },
      youtubeCover: null,
      formValid: true,
      youtubeVideo: null,
      youtubeVideoEnabled: false,
      imageEnabled: false,
      textEnabled: false,
      showLoader: false,

      showDialog: false,

      isLoading: false,

      // quill editor
      editorOption: {
        placeholder: "De quoi parle cet article ?",
        theme: "snow",
        modules: {
          toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ header: 1 }, { header: 2 }, { header: 3 }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],

            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
            [{ script: "sub" }, { script: "super" }],

            [{ direction: "rtl" }],

            ["link", "blockquote", "video"]
          ]
        }
      }
    };
  },
  computed: {
    imagePreview() {
      if (this.fields.picture && typeof this.fields.picture === "string") {
        return this.fields.picture;
      }

      return this.fields.picture
        ? URL.createObjectURL(this.fields.picture)
        : null;
    },
    modelDialog: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit("input", newVal);
      }
    }
  },

  methods: {
    /**
     * reset the dialog to its original state
     */
    resetDialog() {
      const fields = {
        content: this.defaultContent,
        title: this.defaultTitle,
        picture: this.defaultPicture,
        keywords: this.defaultKeyWords,
        youtubeVideoId: this.defaultYoutubeVideoId
      };

      this.fields = { ...fields };

      this.imageEnabled = !!this.defaultPicture;
      this.textEnabled = false;
      this.showLoader = false;

      this.youtubeCover = this.defaultYoutubeVideoId
        ? getYoutubeCoverImage(this.defaultYoutubeVideoId)
        : null;
      this.youtubeVideoEnabled = !!this.defaultYoutubeVideoId;

      this.isLoading = false;
    },

    getVideoId(value) {
      this.showLoader = true;

      setTimeout(() => {
        this.showLoader = false;
      }, 1800);

      if (!value) {
        this.fields.youtubeVideoId = null;
        return;
      }

      this.fields.youtubeVideoId = value.trim();

      if (isUrl(value)) {
        this.fields.youtubeVideoId = getIdFromURL(value);
      }

      this.youtubeCover = getYoutubeCoverImage(this.fields.youtubeVideoId);
    },

    save() {
      if (!this.$refs.newPostForm.validate()) {
        return;
      }

      this.isLoading = true;

      const youtubeVideoId = this.youtubeVideoEnabled
        ? this.fields.youtubeVideoId
        : null;
      const picture = this.imageEnabled ? this.fields.picture : null;
      const keywords = this.fields.keywords.map(keyword => {
        if (typeof keyword === "object" && keyword.text) {
          return keyword.text;
        }

        return keyword;
      });

      const content = this.fields.content || "";

      const fields = {
        ...this.fields,
        id: this.articleId,
        youtubeVideoId,
        keywords: JSON.stringify(keywords),
        content,
        picture
      };

      this.$emit("articleHandler::save", fields);
    },

    toggleYoutubleVideo() {
      this.youtubeVideoEnabled = true;
      this.imageEnabled = false;
    },

    handleImage(e) {
      const file = e.target.files[0];

      if (!file.type.includes("image/")) {
        return;
      }

      if (file.size > FILE_MAXIMUM_SIZE) {
        this.showDialog = true;
        return;
      }

      // only accept image
      this.fields.picture = file;

      this.youtubeVideoEnabled = false;
      this.imageEnabled = true;
    }
  },
  watch: {
    value() {
      this.resetDialog();
    }
  }
};
</script>
