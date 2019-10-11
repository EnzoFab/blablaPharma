<template>
  <div>
    <v-container
      v-if="files && files.length > 0"
      grid-list-xs
      fluid
      class="scroll-y grey lighten-4"
      style="max-height: 15vh; min-height: 5vh"
    >
      <v-layout row wrap>
        <template v-if="files && files.length > 0">
          <v-flex v-for="(file, key) in files" sm3 xs6 :key="key">
            <v-badge overlap color="red">
              <template v-slot:badge
                ><v-icon
                  class="content-pointer"
                  dark
                  @click="deleteFile(file.key)"
                  >close</v-icon
                ></template
              >
              <v-avatar color="grey" tile :size="embed ? 20 : 90">
                <v-img
                  class="ma-1"
                  :src="file.filePreview"
                  :alt="file.filePreview"
                  height="85"
                  width="85"
                ></v-img>
              </v-avatar>
            </v-badge>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-xs pa-0 ma-0>
      <v-layout row wrap>
        <v-flex xs1 class="text-xs-left">
          <v-dialog v-model="emojiPickerDialog" full-width width="300">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon :size="iconSize">far fa-smile</v-icon>
              </v-btn>
            </template>
            <no-ssr>
              <picker
                :data="emojiIndex"
                set="messenger"
                title="Smiley"
                style="width: 100%"
                @select="addEmoji"
                :i18n="{
                  search: 'Recherche',
                  categories: {
                    search: 'Résultats de recherche',
                    recent: 'Récents'
                  }
                }"
                emoji="smile"
                :sheet-size="16"
                :skin="3"
              />
            </no-ssr>
          </v-dialog>
        </v-flex>
        <v-flex xs1 class="content-center">
          <v-btn
            icon
            @click="uploadFile"
            :disabled="files && files.length >= 4"
            :size="iconSize"
          >
            <v-icon :size="iconSize" color="grey darken-3">far fa-image</v-icon>
          </v-btn>

          <input
            multiple
            type="file"
            ref="uploader"
            v-show="false"
            accept="image/*"
            @input="handleFiles"
          />
        </v-flex>
        <v-flex :xs9="embed" :xs10="!embed">
          <v-textarea
            ref="sendbox"
            v-model="text"
            :row-height="12"
            :rows="2"
            autofocus
            full-width
            no-resize
            flat
            height="25"
            hide-details
            hide-no-data
            single-line
            color="success"
            background-color="white"
            placeholder="Écrire votre message"
            class="sendBox"
            @keydown.enter.exact.prevent="sendMessage"
          >
            <v-icon
              slot="append"
              :size="iconSize"
              class="ml-3"
              color="grey darken-3"
              @click="sendMessage"
              >send</v-icon
            >
          </v-textarea>
        </v-flex>
      </v-layout>
      <alert v-model="showDialog" :text="alertMessage" />
    </v-container>
  </div>
</template>

<script>
import take from "lodash.take";
import { FILE_SIZE_MESSAGE, toBase64 } from "../../helpers";
import emojiSet from "emoji-mart-vue-fast/data/messenger.json";
import { EmojiIndex, Picker } from "emoji-mart-vue-fast";

import "emoji-mart-vue-fast/css/emoji-mart.css";
const Alert = () => import("../dialogs/Alert");
export default {
  name: "SendBox",
  components: { Alert, Picker },
  props: {
    embed: { type: Boolean, default: false }
  },
  data() {
    return {
      text: "",
      emojiPickerDialog: false,
      files: null,
      alertMessage: null,
      showDialog: false
    };
  },
  methods: {
    uploadFile() {
      this.$refs.uploader.click();
    },

    async handleFiles(e) {
      const uploadedFiles = Array.from(e.target.files)
        .filter(file => file.type.includes("image"))
        .map((file, key) => ({
          file,
          key,
          filePreview: URL.createObjectURL(file)
        }));

      const bigFiles = uploadedFiles.filter(
        element => element.file.size >= FILE_SIZE_MESSAGE
      );

      if (bigFiles.length > 0) {
        this.alertMessage = bigFiles.reduce(
          (accumulator, element) => `${accumulator}; ${element.file.name}`,
          "Les fichiers suivants dépassent la tailles limites de 1 mo"
        );

        this.showDialog = true;
      }

      const files = uploadedFiles.filter(
        element => element.file.size < FILE_SIZE_MESSAGE
      );

      if (this.files) {
        this.files = take(this.files.concat(files), 4);
        return;
      }

      this.files = take(files, 4);
    },

    deleteFile(element) {
      this.files = this.files.filter(file => file.key !== element);
    },

    addEmoji({ native }) {
      const textArea = this.$refs.sendbox;
      const cursorPosition = textArea.selectionEnd;
      this.text += native;

      setTimeout(() => textArea.focus());

      this.$nextTick(() => {
        textArea.selectionEnd = cursorPosition + native.length;
        this.emojiPickerDialog = false;
      });
    },

    async sendMessage() {
      const connectedUser = this.$store.getters.connectedUser;

      if (this.text && this.text.trim().length > 0) {
        this.$emit("sendbox:messageSent", {
          content: this.text.trim(),
          type: "text",
          author: connectedUser.id,
          createdAt: this.$moment().valueOf()
        });
        this.text = "";
      }

      if (this.files && this.files.length > 0) {
        this.files.forEach(async file => {
          const base64File = await toBase64(file.file);
          this.$emit("sendbox:messageSent", {
            type: "image",
            author: connectedUser.id,
            createdAt: this.$moment().valueOf(),
            content: base64File,
            image: file.file
          });
        });

        this.files = null;
      }
    }
  },
  computed: {
    emojiIndex() {
      return new EmojiIndex(emojiSet);
    },
    iconSize() {
      return this.embed || this.$vuetify.breakpoint.smAndDown ? 15 : 30;
    }
  }
};
</script>
