<template>
  <v-dialog v-model="showDialog" full-width>
    <v-card flat color="white" class="pa-1">
      <v-icon color="black" @click="$emit('input', false)">close</v-icon>
      <v-img v-if="imageSrc" :src="imageSrc" :alt="altSrc"></v-img>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FullImage",
  props: {
    value: Boolean,
    imageSrc: String,
    altSrc: String
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit("input", newVal);
      }
    }
  }
};
</script>
