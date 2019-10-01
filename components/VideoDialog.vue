<template>
  <v-dialog v-model="toggleDialog" :width="size()">
    <v-card flat color="black" class="content-center" tile :width="size()">
      <v-icon
        color="white"
        style="position: absolute; top: 2%; left: 2%; z-index: 40"
        @click="closeVideo"
        >close</v-icon
      >
      <video
        id="presentationVideo"
        autoplay
        loop
        style="object-fit: contain;object-position: 50% 50%;"
        :width="size()"
      >
        <source src="/video.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas les vidéo
      </video>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "VideoDialog",
  props: {
    value: Boolean
  },
  computed: {
    toggleDialog: {
      get() {
        return this.value;
      },
      set(newVal) {
        if (!newVal) {
          this.closeVideo();
          return;
        }

        this.$emit("input", newVal);
      }
    }
  },
  methods: {
    size() {
      return this.$vuetify.breakpoint.smAndDown ? 400 : 900;
    },
    closeVideo() {
      // reset the vidéo and close the dialog
      const video = document.querySelector("#presentationVideo");
      video.load();
      this.$emit("input", false);
    }
  }
};
</script>
