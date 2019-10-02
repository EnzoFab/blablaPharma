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
                  :src="file.base64File"
                  :alt="file.base64File"
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
        <v-flex xs1 class="content-center">
          <v-dialog v-model="emojiPickerDialog" full-width width="300">
            <template v-slot:activator="{ on }">
              <v-icon :size="iconSize" v-on="on">far fa-smile</v-icon>
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
          <v-icon color="grey darken-3" :size="iconSize" @click="uploadFile"
            >far fa-image</v-icon
          >
          <input
            multiple
            type="file"
            ref="uploader"
            v-show="false"
            accept="image/*"
            @input="handleFiles"
          />
        </v-flex>
        <v-flex xs10>
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
    </v-container>
  </div>
</template>

<script>
import { toBase64 } from "~/helpers";
import * as Promise from "bluebird";
import emojiSet from "emoji-mart-vue-fast/data/messenger.json";
import { EmojiIndex, Picker } from "emoji-mart-vue-fast";

import "emoji-mart-vue-fast/css/emoji-mart.css";
export default {
  name: "SendBox",
  components: { Picker },
  props: {
    embed: { type: Boolean, default: false }
  },
  data() {
    return {
      text: "",
      emojiPickerDialog: false,
      files: null
    };
  },
  methods: {
    uploadFile() {
      this.$refs.uploader.click();
    },

    async handleFiles(e) {
      const files = Array.from(e.target.files).filter(file =>
        file.type.includes("image")
      );

      this.files = await Promise.map(files, async (file, key) => {
        const base64File = await toBase64(file);
        return { base64File, key };
      });
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

    sendMessage() {
      const connectedUser = this.$store.getters.connectedUser;

      if (this.text && this.text.length > 0) {
        this.$emit("sendbox:messageSent", {
          content: this.text,
          type: "text",
          author: connectedUser.id,
          createdAt: this.$moment().valueOf()
        });
        this.text = "";
      }

      if (this.files && this.files.length > 0) {
        this.files.forEach(file => {
          this.$emit("sendbox:messageSent", {
            content: file.base64File,
            type: "image",
            author: connectedUser.id,
            createdAt: this.$moment().valueOf()
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
      return this.embed ? 20 : 30;
    }
  }
};
</script>
