<template>
  <v-dialog v-model="showDialog" full-width>
    <v-card flat>
      <v-icon class="pl-2 pt-2" @click="showDialog = false">close</v-icon>
      <v-container align-center fluid>
        <v-layout row wrap align-center>
          <v-flex xs12 sm8 offset-sm2>
            <v-card flat>
              <v-card-title class="pt-1">
                <div class="title-main text--baseColor content-center">
                  Nous contacter
                </div>
              </v-card-title>
              <v-card-text style="height: 85%" class="scroll-y">
                <div class="content-center text--baseColor">
                  <div class="text--section">
                    Des remarques, des améliorations à suggérer,
                  </div>
                  <div class="text--section">
                    votre pharmacien pas encore inscrit ?
                  </div>
                  <div class="text--section">
                    Faites le nous savoir par ici
                  </div>
                  <div class="content-center mt-2">
                    <a
                      v-for="social in networks"
                      :href="social.href"
                      :key="social.icon"
                      class="text-no-decoration mr-3"
                      target="_blank"
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
                          :rules="$constraints.emailRules"
                          outline
                        ></v-text-field>
                        <v-text-field
                          v-model="subject"
                          color="green darken-1"
                          label="Sujet"
                          outline
                          :rules="$constraints.required"
                        ></v-text-field>
                        <v-textarea
                          v-model="message"
                          :rules="$constraints.required"
                          color="green darken-1"
                          no-resize
                          flat
                          height="100"
                          label="Message"
                          outline
                          required
                        ></v-textarea>
                        <v-btn
                          large
                          style="float: right"
                          dark
                          depressed
                          color="default-green"
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
    </v-card>
  </v-dialog>
</template>

<script>
import { TOGGLE_SNACKBAR } from "../../store/types";

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
          href:
            "https://www.facebook.com/Blablapharma-367660467350831/?modal=admin_todo_tour"
        },
        {
          icon: "twitter",
          href: "https://twitter.com/blablapharma"
        },
        {
          icon: "instagram",
          href: "https://www.instagram.com/blablapharma/"
        }
      ]
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    submit() {
      if (this.$vuelidation.valid()) {
        return false;
      }
    },
    send() {
      if (this.$refs.form.validate()) {
        this.$axios
          .post("/contact", {
            email: this.mail,
            subject: this.subject,
            name: this.name,
            message: this.message
          })
          .then(() => {
            this.$store.commit(TOGGLE_SNACKBAR, "Contact envoyé");
            this.$refs.form.reset();
            this.$emit("input", false);
          })
          .catch(e => console.log("FAILED...", e));
      }
    }
  }
};
</script>
