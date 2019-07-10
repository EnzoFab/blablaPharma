<template>
  <v-app light>
    <v-toolbar
      :scroll-threshold="150"
      app
      fixed
      flat
      scroll-off-screen
      color="grey lighten-5"
    >
      <v-toolbar-items>
        <v-btn flat>Link One</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <app-footer class="mt-4" />
  </v-app>
</template>

<script>
import AppFooter from "~/components/layout/AppFooter";
export default {
  components: {
    AppFooter
  },
  data() {
    return {};
  }
};
</script>
