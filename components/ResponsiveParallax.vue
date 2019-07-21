<template>
  <div>
    <v-parallax class="hidden-xs-only" :src="src" :height="maxHeight">
      <div :class="{ 'overlay-white': userOverlay, overlay: userOverlay }">
        <slot name="default"></slot>
      </div>
    </v-parallax>
    <v-parallax class="hidden-sm-and-up" :src="src" :height="minHeight">
      <div :class="{ 'overlay-white': userOverlay, overlay: userOverlay }">
        <slot name="default"></slot>
      </div>
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: "ResponsiveParallax",
  props: {
    src: String,
    maxHeight: Number,
    minHeight: Number,
    userOverlay: { type: Boolean, default: false }
  }
};
</script>

<style scoped></style>
