<template>
  <nuxt-link to="/">
    <no-ssr>
      <img
        v-if="!mobileScreen"
        :src="src"
        :alt="alt"
        :class="{
          'blabla-logo--large': smallScreen,
          'blabla-logo--medium': largeScreen
        }"
      />
      <img v-else :alt="alt" :src="srcMobile" class="blabla-logo--large" />
    </no-ssr>
  </nuxt-link>
</template>

<script>
export default {
  name: "BlablapharmaLogo",
  data() {
    return {
      src: "/images/logo-navbar.png",
      alt: "BlablaPharma logo",
      srcMobile: "/images/logo-navbar.png"
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
