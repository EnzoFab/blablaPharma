<template>
  <div>
    <v-textarea
      ref="sendbox"
      v-model="text"
      :row-height="12"
      :rows="2"
      single-line
      autofocus
      full-width
      no-resize
      flat
      height="25"
      single-line
      color="success"
      background-color="white"
      placeholder="Écrire votre message"
      class="sendBox"
      @keydown.enter.exact.prevent="sendMessage"
    >
      <div slot="append">
        <template v-if="textEmppty(text)">
          <v-icon class="ml-3" color="grey darken-3" medium @click="uploadfile"
            >attach_file</v-icon
          >
          <input
            type="file"
            ref="uploader"
            v-show="false"
            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf, image/*"
          />
        </template>

        <v-icon
          v-else
          class="ml-3"
          color="grey darken-3"
          medium
          @click="sendMessage"
          >send</v-icon
        >
      </div>
      <div slot="prepend-inner">
        <v-dialog v-model="emojiPickerDialog" full-width width="300">
          <template v-slot:activator="{ on }">
            <v-icon class="mr-3" small v-on="on">far fa-smile</v-icon>
          </template>
          <no-ssr>
            <picker
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
              :skin="3"
            />
          </no-ssr>
        </v-dialog>
      </div>
    </v-textarea>
  </div>
</template>

<script>
import { Picker } from "emoji-mart-vue";

export default {
  name: "SendBox",
  components: { Picker },
  data() {
    return {
      text: "",
      emojiPickerDialog: false
    };
  },
  methods: {
    textEmppty(text) {
      return text == null || text === "";
    },

    uploadfile() {
      this.$refs.uploader.click();
    },

    addEmoji({ native }) {
      const textArea = this.$refs.sendbox;
      const cursorPosition = textArea.selectionEnd;
      this.text += native;

      //this.text += native;
      setTimeout(() => textArea.focus());

      this.$nextTick(() => {
        textArea.selectionEnd = cursorPosition + native.length;
        this.emojiPickerDialog = false;
      });
    },

    sendMessage() {
      const connectedUser = this.$store.getters.connectedUser;
      this.$emit("sendbox:messageSent", {
        content: { type: "text", message: this.text },
        ...connectedUser,
        date: new Date()
      });

      this.text = "";
    }
  }
};
</script>

<style scoped></style>
