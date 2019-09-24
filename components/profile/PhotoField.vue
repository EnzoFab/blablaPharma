<template>
  <div>
    <v-hover :disabled="$vuetify.breakpoint.smAndDown">
      <v-avatar
        slot-scope="{ hover }"
        :color="avatarColor"
        :size="$vuetify.breakpoint.smAndDown ? 120 : 300"
        :tile="!$vuetify.breakpoint.smAndDown && !imageSrc"
        class="content-pointer"
        @click="$refs.photoField.click()"
      >
        <v-fade-transition hide-on-leave>
          <template v-if="hover">
            <v-icon
              :dark="!$vuetify.breakpoint.smAndDown"
              :size="$vuetify.breakpoint.smAndDown ? 50 : 160"
              >fas fa-images</v-icon
            >
          </template>
        </v-fade-transition>

        <v-fade-transition mode="in-out" hide-on-leave>
          <template v-if="!hover">
            <v-img
              v-if="imageSrc"
              :src="imageSrc"
              alt="profile image"
              aspect-ratio="1.75"
            ></v-img>
            <v-icon
              v-else
              :size="$vuetify.breakpoint.smAndDown ? 50 : 260"
              :dark="!$vuetify.breakpoint.smAndDown"
              >{{
                $vuetify.breakpoint.smAndDown ? "photo_camera" : "person"
              }}</v-icon
            >
          </template>
        </v-fade-transition>
      </v-avatar>
    </v-hover>
    <input
      v-show="false"
      type="file"
      ref="photoField"
      accept="image/*"
      @input="handleImageInput"
    />
  </div>
</template>

<script>
export default {
  name: "PhotoField",
  props: {
    value: { type: String | Object },
    isPharmacist: Boolean,
    previewImageUrl: null
  },

  computed: {
    avatarColor() {
      return !this.$vuetify.breakpoint.smAndDown
        ? this.isPharmacist
          ? "green"
          : "grey"
        : "grey lighten-5";
    },

    imageSrc: {
      get() {
        const filePreview =
          this.value && typeof this.value === "object"
            ? URL.createObjectURL(value)
            : null;
        const src = this.value ? this.value : null;
        return filePreview || src;
      },
      set(e) {
        const file = e.target.files[0];
        if (file.type.includes("image/")) {
          // only accept image
          this.$emit("inputon", URL.createObjectURL(file));
        }
      }
    }
  },

  methods: {
    handleImageInput(e) {
      this.imageSrc = e;
    }
  }
};
</script>
