<template>
  <client-only>
    <v-toolbar v-if="$vuetify.breakpoint.mdAndUp" app fixed flat>
      <v-toolbar-title>Blabla admin</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat nuxt to="/bo/manage-pharmacists"
          >Gestion des pharmaciens</v-btn
        >
        <v-btn flat nuxt to="/bo/manage-blog">Gestion du blog</v-btn>
        <v-btn block flat nuxt to="/bo/manage-research"
          >Recherche utilisateurs</v-btn
        >
      </v-toolbar-items>
    </v-toolbar>

    <v-toolbar v-else app prominent fixed extended flat extension-height="150">
      <v-toolbar-title>Blabla admin</v-toolbar-title>
      <v-layout slot="extension" row wrap>
        <v-flex xs12>
          <v-btn block flat nuxt to="/bo/manage-pharmacists"
            >Gestion des pharmaciens</v-btn
          >
        </v-flex>
        <v-flex xs12>
          <v-btn block flat nuxt to="/bo/manage-blog">Gestion du blog</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn block flat nuxt to="/bo/manage-research"
            >Recherche utilisateurs</v-btn
          >
        </v-flex>
      </v-layout>
    </v-toolbar>
  </client-only>
</template>

<script>
export default {
  name: "AdminNavBar"
};
</script>
