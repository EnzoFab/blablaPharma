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
      tabindex="-1"
      @input="handleImageInput"
    />
    <alert
      v-model="showDialog"
      text="La taille des images ne doit pas excéder 2mo"
    />
  </div>
</template>

<script>
import { FILE_MAXIMUM_SIZE, toBase64 } from "../../helpers";

const Alert = () => import("../dialogs/Alert");
export default {
  name: "PhotoField",
  components: { Alert },
  props: {
    value: { type: String | Object },
    isPharmacist: Boolean
  },

  data() {
    return { showDialog: false };
  },
  computed: {
    avatarColor() {
      return !this.$vuetify.breakpoint.smAndDown
        ? this.isPharmacist
          ? "default-green"
          : "default-grey"
        : "default-grey";
    },

    imageSrc: {
      get() {
        return this.imagePreview;
        /*try {
          return URL.createObjectURL(this.value);
        } catch (e) {
          return this.value;
        } */

        /* const filePreview =
            this.value && typeof this.value === "object"
              ? URL.createObjectURL(this.value)
              : null;
          const src = this.value ? this.value : null;
          return filePreview ? filePreview : src; */
      },
      set(e) {
        const file = e.target.files[0];
        console.log("upload file", file);

        if (file.type.includes("image/")) {
          return;
        }

        const overSized = file.size >= FILE_MAXIMUM_SIZE;
        if (overSized) {
          this.showDialog = overSized;
          return;
        }

        // only accept image
        this.$emit("input", file);
      }
    }
  },

  asyncComputed: {
    async imagePreview() {
      try {
        const preview = await toBase64(this.value);
        console.log(preview);
        return preview;
      } catch (e) {
        console.error("base64", e);
        return this.value;
      }
    }
  },

  methods: {
    handleImageInput(e) {
      console.log("handle files", e);
      this.imageSrc = e;
    }
  }
};
</script>
