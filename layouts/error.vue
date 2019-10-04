<template>
  <v-container>
    <v-card flat color="transparent">
      <v-card-title class="title-main">
        <div
          class="content-center text--baseColor"
          v-if="error.statusCode === 404"
        >
          {{ error.statusCode }}
          <div class="mt-4">
            {{ pageNotFound }}
          </div>
        </div>

        <div class="content-center text--baseColor" v-else>
          {{ otherError }}
        </div>
      </v-card-title>
    </v-card>

    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-container>
</template>

<script>
export default {
  layout: "default",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? "Oups..." : this.otherError;
    return {
      title
    };
  },
  data() {
    return {
      pageNotFound: "La page demandée n'a pas été trouvée",
      otherError: "Une erreur est intervenue"
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
