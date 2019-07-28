<template>
  <v-container align-center fluid>
    <v-layout row wrap align-center>
      <v-flex xs12 sm8 offset-sm2>
        <v-card flat>
          <v-card-title class="pt-1">
            <div class="title-main text--baseColor content-center">
              <span class="title-main-rail">Pour aller plus loin</span>
            </div>
          </v-card-title>
          <v-card-text style="height: 85%" class="scroll-y">
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
              <div class="content-center mt-2">
                <a
                  v-for="social in networks"
                  :href="social.href"
                  class="text-no-decoration mr-3"
                >
                  <v-icon color="black" size="20">
                    fab fa-{{ social.icon }}</v-icon
                  >
                </a>
              </div>
            </div>

            <v-container fluid>
              <v-layout row wrap align-center>
                <v-flex xs12 sm8 offset-sm2>
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    @submit.prevent="send"
                  >
                    <v-text-field
                      v-model="name"
                      color="green darken-1"
                      label="Nom"
                      outline
                    ></v-text-field>
                    <v-text-field
                      v-model="mail"
                      color="green darken-1"
                      type="mail"
                      label="Email"
                      :rules="emailRules"
                      outline
                    ></v-text-field>
                    <v-text-field
                      v-model="subject"
                      color="green darken-1"
                      label="Sujet"
                      outline
                      :rules="required"
                    ></v-text-field>
                    <v-textarea
                      v-model="message"
                      :rules="required"
                      color="green darken-1"
                      no-resize
                      flat
                      height="100"
                      label="message"
                      outline
                      required
                    ></v-textarea>
                    <v-btn
                      large
                      style="float: right"
                      dark
                      flat
                      color="light-green lighten-1"
                      class="mt-0"
                      :disabled="!valid"
                      type="submit"
                      >Envoyer</v-btn
                    >
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
      message: "",
      networks: [
        {
          icon: "facebook-f",
          href: ""
        },
        {
          icon: "twitter",
          href: ""
        },
        {
          icon: "instagram",
          href: ""
        }
      ]
    };
  },
  computed: {
    emailRules: () => [v => /.+@.+\..+/.test(v) || "E-mail non valide"],
    required: () => [v => !!v || "Champs requis"]
  },
  methods: {
    send() {
      if (this.$refs.form.validate()) {
        const contact = {
          name: this.name,
          mail: this.mail,
          subject: this.subject,
          message: this.message
        };

        // todo request to backend
      }
    }
  }
};
</script>

<style scoped></style>
