<template>
  <v-dialog :value="value" fullscreen full-width transition persistent>
    <v-card>
      <v-card-text>
        <v-icon x-large @click="$emit('input', false)">close</v-icon>
      </v-card-text>
      <v-card-title primary>
        <h1 class="title-main title-main-rail content-center text--baseColor">
          Connexion
        </h1>
      </v-card-title>
      <div class=" text--section content-center">
        <span class="text--baseColor">Pas encore de compte ?</span>
        <nuxt-link
          tag="a"
          to="/sign-in"
          class="text--section text-no-decoration blue-grey--text text--lighten-3"
          >s'inscrire</nuxt-link
        >
      </div>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs4 offset-xs4>
            <v-form class="px-5 mt-4">
              <v-text-field
                label="Email"
                color="blue-grey lighten-1"
              ></v-text-field>
              <v-text-field
                label="Mot de passe"
                color="blue-grey lighten-1"
                class="mt-4"
                type="password"
              ></v-text-field>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    value: { type: Boolean, default: false }
  },
  data() {
    return {
      visible: this.value
    };
  }
};
</script>

<style scoped></style>
