<template>
  <nuxt-link to="/">
    <client-only>
      <img
        v-if="!mobileScreen"
        :src="src"
        :alt="alt"
        :class="{
          'blabla-logo--large': smallScreen,
          'blabla-logo--medium': largeScreen
        }"
      />
      <img v-else :alt="alt" :src="src" class="blabla-logo--large" />
    </client-only>
  </nuxt-link>
</template>

<script>
export default {
  name: "BlablapharmaLogo",
  data() {
    return {
      src: require("~/assets/images/logo-navbar.png"),
      alt: "BlablaPharma logo"
    };
  },
  computed: {
    smallScreen() {
      return this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.sm;
    },
    largeScreen() {
      return this.$vuetify.breakpoint.lgAndUp;
    },

    mobileScreen() {
      return this.$vuetify.breakpoint.xs;
    }
  }
};
</script>
