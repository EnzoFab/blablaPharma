<template>
  <v-dialog :value="value" fullscreen full-width transition persistent>
    <v-card style="background-color: rgba(255, 255, 255, 0.97);">
      <v-card-text>
        <v-flex offset-sm10 sm2 offset-xs5 xs2>
          <v-icon x-large @click="$emit('input', false)">close</v-icon>
        </v-flex>
      </v-card-text>
      <v-card-title primary>
        <h1 class="title-main title-main-rail content-center text--baseColor">
          Connexion
        </h1>
      </v-card-title>
      <div class=" text--section content-center">
        <span class="text--baseColor">Pas encore de compte ?</span>
        <a
          class="text--section text-no-decoration blue-grey--text text--lighten-3"
          @click="gotoSignIn"
          >s'inscrire</a
        >
      </div>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex sm4 offset-sm4 xs9 offset-xs1>
            <v-form class="px-5 mt-4" ref="login">
              <v-text-field
                v-model="mail"
                label="Email"
                color="blue-grey lighten-1"
                type="mail"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Mot de passe"
                color="blue-grey lighten-1"
                class="mt-4"
                type="password"
              ></v-text-field>
              <v-btn
                large
                block
                depressed
                color="blue-grey lighten-1"
                dark
                class="mt-4"
                @click="connexion"
                >Connexion</v-btn
              >
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
      email: "",
      password: ""
    };
  },
  methods: {
    gotoSignIn() {
      this.$router.push({ path: "/sign-in" });
      this.$emit("input", false);
    },
    connexion() {
      if (this.$refs.login.validate()) {
      }
      // todo call api login
    }
  }
};
</script>

<style scoped></style>
