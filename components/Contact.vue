<template>
  <v-container align-center fluid>
    <v-layout row wrap align-center>
      <v-flex offset-xs2 xs8>
        <v-card flat>
          <v-card-title class="pt-1">
            <div class="title-main text--baseColor content-center">
              <span class="title-main-rail">Pour aller plus loin</span>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="content-center text--baseColor">
              <div class="text--section">
                Vous voulez en savoir plus sur l'aventure
              </div>
              <div class="text--section">
                BlaBlaPHARMA N'hésitez pas à vous abonnés à la
              </div>
              <div class="text--section">
                newsletter pour être informé xxxxx
              </div>
            </div>
            <v-container fluid>
              <v-layout row wrap align-center>
                <v-flex xs8 offset-xs2>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      background-color="lime lighten-5"
                      v-model="name"
                      label="Nom"
                      color="green darken-1"
                    ></v-text-field>
                    <v-text-field
                      background-color="lime lighten-5"
                      v-model="mail"
                      label="Email"
                      color="green darken-1"
                    ></v-text-field>
                    <v-text-field
                      background-color="lime lighten-5"
                      v-model="subject"
                      label="Sujet"
                      color="green darken-1"
                    ></v-text-field>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      valid: true,
      name: "",
      subject: "",
      mail: "",
      message: ""
    };
  }
};
</script>

<style scoped></style>
