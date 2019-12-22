<template>
  <div class="maintenance">
    <v-container fluid fill-height>
      <v-layout align-center row wrap>
        <v-flex class="content-center">
          <h1 class="title-main text--baseColor">{{ message }}</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Maintenance",
  layout: "maintenance",
  data() {
    return {
      message: "Site en maintenance"
    };
  }
};
</script>
