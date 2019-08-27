<template>
  <v-card flat :href="url" target="_blank" color="white">
    <v-card-title primary class="text-truncate">
      <span class="text-uppercase font-weight-bold body-1 mb-0 text-truncate">
        {{ title }}
      </span></v-card-title
    >
    <v-img v-if="preview" :src="preview" aspect-ratio="2.75"></v-img>
    <v-card-text class="grey--text caption text-truncate">
      <v-tooltip top dark>
        <template v-slot:activator="{ on }">
          <span v-on="on">{{ description }}</span>
        </template>
        <span> {{ description }}</span>
      </v-tooltip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "UrlPreview",
  props: {
    url: String,
    title: String,
    preview: String,
    description: String
  },
  data() {
    return {
      src: null
    };
  },
  methods: {
    truncateText(text, maxLength) {
      return text.length > maxLength
        ? text.substring(0, maxLength - 1) + "..."
        : text;
    }
  },
  mounted() {
    /* this.$axios.post("/messages/send").then(result => {
      this.src = result.data.image;
    });*/
  }
};
</script>

<style scoped></style>
