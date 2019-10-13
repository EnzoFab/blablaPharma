<template>
  <v-container fluid>
    <v-card flat>
      <h1 class="text-xs-center title-main text--baseColor">
        En construction
      </h1>
      <div class="text--baseColor text-xs-center text-content pt-2">
        Le blog n'est pas encore disponible, il le sera très prochainement
      </div>
      <div class="pt-3 content-center">
        <v-icon :size="150">fas fa-wrench</v-icon>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "index",
  head() {
    return {
      title: "Blog",
      meta: [
        {
          hid: "blog",
          name: "description",
          content: "Visualizez du contenu pharmaceutique"
        }
      ]
    };
  }
};
</script>
